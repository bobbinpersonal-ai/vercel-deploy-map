type EstimatePayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  address?: unknown;
  city?: unknown;
  service?: unknown;
  consultationDateLabel?: unknown;
  consultationTime?: unknown;
  website?: unknown;
};

type ApiRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: EstimatePayload;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: Record<string, unknown>): void;
};

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
  const email = asText(payload.email, 254);
  const address = asText(payload.address, 240);
  const city = asText(payload.city, 160);
  const service = asText(payload.service, 120);
  const consultationDateLabel = asText(payload.consultationDateLabel, 80);
  const consultationTime = asText(payload.consultationTime, 80);

  if (!name || !phone) {
    return response.status(400).json({ error: "name_and_phone_required" });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ error: "invalid_email" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ESTIMATE_NOTIFICATION_TO;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    console.error("[Estimate email] Missing RESEND_API_KEY, ESTIMATE_NOTIFICATION_TO, or RESEND_FROM_EMAIL.");
    return response.status(503).json({ error: "email_not_configured" });
  }

  const fields: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "Not provided"],
    ["Project", service || "Not sure yet"],
    ["Street address", address || "Not provided"],
    ["City / state / ZIP", city || "Not provided"],
  ];
  if (consultationDateLabel || consultationTime) {
    fields.push(["Requested in-home visit", [consultationDateLabel, consultationTime].filter(Boolean).join(" · ")]);
  }

  const html = `<h1>New estimate request</h1><table>${fields.map(([label, value]) => `<tr><th align="left" style="padding:8px 16px 8px 0">${escapeHtml(label)}</th><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`).join("")}</table>`;
  const text = `New estimate request\n\n${fields.map(([label, value]) => `${label}: ${value}`).join("\n")}`;

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
        ...(email ? { reply_to: email } : {}),
        subject: `New estimate request — ${name}`,
        html,
        text,
      }),
    });

    if (!emailResponse.ok) {
      const details = await emailResponse.text();
      console.error("[Estimate email] Resend rejected the message:", emailResponse.status, details);
      return response.status(502).json({ error: "email_delivery_failed" });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("[Estimate email] Could not reach Resend:", error);
    return response.status(502).json({ error: "email_delivery_failed" });
  }
}
