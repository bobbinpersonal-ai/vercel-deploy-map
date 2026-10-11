type LeadPhoto = {
  name?: unknown;
  data?: unknown;
};

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  zip?: unknown;
  service?: unknown;
  preferredDay?: unknown;
  notes?: unknown;
  smsConsent?: unknown;
  photos?: unknown;
  website?: unknown;
};

type ApiRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: LeadPayload;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: Record<string, unknown>): void;
};

const SERVICES = ["Mow", "Fertilization", "Weed control", "Mow + fertilization combo", "Not sure"] as const;

const asText = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);

/** Small base64 JPEG payloads only, so a full mailbox or hostile payload can't blow up the function. */
function collectPhotos(value: unknown): { name: string; base64: string }[] {
  if (!Array.isArray(value)) return [];
  const photos: { name: string; base64: string }[] = [];
  for (const entry of value.slice(0, 6) as LeadPhoto[]) {
    const data = asText(entry?.data, 1_600_000);
    const match = data.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/);
    if (!match) continue;
    const extension = match[1] === "jpeg" ? "jpg" : match[1];
    const index = photos.length + 1;
    photos.push({ name: asText(entry?.name, 80) || `yard-photo-${index}.${extension}`, base64: match[2] });
  }
  return photos;
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "method_not_allowed" });
  }

  const origin = request.headers.origin;
  const host = request.headers.host;
  if (typeof origin === "string" && typeof host === "string") {
    try {
      if (new URL(origin).host !== host) {
        return response.status(403).json({ error: "invalid_origin" });
      }
    } catch {
      return response.status(403).json({ error: "invalid_origin" });
    }
  }

  const payload = request.body ?? {};
  // Ignore automated form spam caught by the off-screen honeypot.
  if (asText(payload.website, 200)) return response.status(200).json({ ok: true });

  const name = asText(payload.name, 120);
  const phone = asText(payload.phone, 60);
  const zip = asText(payload.zip, 10);
  const service = asText(payload.service, 120) || "Not sure";
  const preferredDay = asText(payload.preferredDay, 60);
  const notes = asText(payload.notes, 2000);
  const smsConsent = payload.smsConsent === true || payload.smsConsent === "true";

  if (!name || !phone || !zip) {
    return response.status(400).json({ error: "name_phone_and_zip_required" });
  }
  if (!/^\d{5}(-\d{4})?$/.test(zip)) {
    return response.status(400).json({ error: "invalid_zip" });
  }
  const serviceLabel = (SERVICES as readonly string[]).includes(service) ? service : "Not sure";
  const photos = collectPhotos(payload.photos);

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ESTIMATE_NOTIFICATION_TO;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    console.error("[Lead email] Missing RESEND_API_KEY, ESTIMATE_NOTIFICATION_TO, or RESEND_FROM_EMAIL.");
    return response.status(503).json({ error: "email_not_configured" });
  }

  const fields: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["ZIP", zip],
    ["Service", serviceLabel],
    ["Preferred day", preferredDay || "Any day"],
    ["Text-message consent", smsConsent ? "Yes — agreed to be contacted by text" : "No"],
    ["Notes", notes || "None"],
    ["Yard photos", photos.length ? `${photos.length} attached` : "None attached"],
  ];

  const html = `<h1>New lawn quote request</h1><table>${fields.map(([label, value]) => `<tr><th align="left" style="padding:8px 16px 8px 0">${escapeHtml(label)}</th><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`).join("")}</table>`;
  const text = `New lawn quote request\n\n${fields.map(([label, value]) => `${label}: ${value}`).join("\n")}`;

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        subject: `New Lawn Quote — ${serviceLabel} — ${zip}`,
        html,
        text,
        ...(photos.length
          ? {
              attachments: photos.map((photo) => ({
                filename: photo.name.replace(/[^A-Za-z0-9._-]/g, "-"),
                content: photo.base64,
              })),
            }
          : {}),
      }),
    });

    if (!emailResponse.ok) {
      const details = await emailResponse.text();
      console.error("[Lead email] Resend rejected the message:", emailResponse.status, details);
      return response.status(502).json({ error: "email_delivery_failed" });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("[Lead email] Could not reach Resend:", error);
    return response.status(502).json({ error: "email_delivery_failed" });
  }
}
