import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { CheckCircle2, LoaderCircle, Phone, Upload, X } from "lucide-react";
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { db, trackEvent } from "@/lib/firebase";
import { usePageMeta } from "@/components/PageMeta";
import { TopNav, PHONE_DISPLAY, PHONE_HREF } from "@/components/TopNav";
import { SiteFooter } from "@/components/SiteFooter";

const SERVICES = ["Mow", "Fertilization", "Weed control", "Mow + fertilization combo", "Not sure"] as const;
const DAYS = ["Any day", "As soon as possible", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
const MAX_PHOTOS = 6;

type Photo = { name: string; data: string };

const inputClass = "h-12 w-full rounded-md border border-[#1c2620]/18 bg-white px-4 text-sm text-[#1c2620] outline-none transition placeholder:text-[#8a978d] focus:border-[#175a3b] focus:ring-2 focus:ring-[#175a3b]/20";

/** Downscale on the phone/laptop before upload so the email stays under service limits. */
function fileToDataUrl(file: File, maxEdge = 1024, quality = 0.72): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      const context = canvas.getContext("2d");
      if (!context) { reject(new Error("canvas_unavailable")); return; }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    image.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("image_read_failed")); };
    image.src = objectUrl;
  });
}

export default function GetQuote() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [service, setService] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  usePageMeta(
    "Get My Lawn Price | LoveMeAfter Lawn Care — Dallas–Fort Worth",
    "Send a few yard photos and get a firm one-time price for mowing, fertilization, or weed control. We’ll call you within 5 minutes. Or call (424) 426-0760.",
    "/get-quote",
  );

  async function addPhotos(files: FileList | null) {
    if (!files?.length) return;
    setPhotoBusy(true);
    setError("");
    try {
      const room = MAX_PHOTOS - photos.length;
      const chosen = Array.from(files).slice(0, room);
      const loaded = await Promise.all(chosen.map(async (file) => ({ name: file.name || "yard-photo.jpg", data: await fileToDataUrl(file) })));
      setPhotos((current) => [...current, ...loaded].slice(0, MAX_PHOTOS));
    } catch {
      setError("One of those photos couldn’t be read. Please try a different image.");
    } finally {
      setPhotoBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      zip: String(data.get("zip") ?? "").trim(),
      service: String(data.get("service") ?? "Not sure"),
      preferredDay: String(data.get("preferredDay") ?? "Any day"),
      notes: String(data.get("notes") ?? "").trim(),
      smsConsent: data.get("smsConsent") === "on",
      photos,
      website: String(data.get("website") ?? ""),
    };
    try {
      const response = await fetch("/api/lead-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("lead_notify_failed");
      void trackEvent("lawn_quote_submitted", { service: payload.service, zip: payload.zip });
      setSubmitted(true);
    } catch {
      // Backup: keep the proven Firestore lead + mail queue if the email endpoint is unreachable.
      try {
        const leadRef = doc(collection(db, "leads"));
        const mailRef = doc(collection(db, "mail"));
        const details = [
          ["Name", payload.name], ["Phone", payload.phone], ["ZIP", payload.zip],
          ["Service", payload.service], ["Preferred day", payload.preferredDay],
          ["Text consent", payload.smsConsent ? "Yes" : "No"], ["Notes", payload.notes || "None"],
          ["Yard photos", photos.length ? `${photos.length} attached to the email request` : "None"],
        ] as const;
        const batch = writeBatch(db);
        batch.set(leadRef, {
          name: payload.name, phone: payload.phone, zip: payload.zip, service: payload.service,
          preferredDay: payload.preferredDay, notes: payload.notes, smsConsent: payload.smsConsent,
          photoCount: photos.length, source: "lawn_get_quote", stage: "new",
          createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
        });
        batch.set(mailRef, {
          to: ["hello@lovemeafter.com"],
          from: "LoveMeAfter Lawn Care <hello@lovemeafter.com>",
          message: {
            subject: `New Lawn Quote — ${payload.service} — ${payload.zip}`,
            text: `New lawn quote request\n\n${details.map(([label, value]) => `${label}: ${value}`).join("\n")}`,
          },
          source: "lawn_get_quote", leadId: leadRef.id, createdAt: serverTimestamp(),
        });
        await batch.commit();
        setSubmitted(true);
      } catch (backupError) {
        console.error("Quote could not be sent or backed up", backupError);
        setError(`We couldn’t submit this just now, so nothing was saved. Please try again or call us at ${PHONE_DISPLAY}.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f6f3]">
      <TopNav />
      <main className="flex-1">
        <section className="bg-[#14372a] text-white">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
            <p className="text-[11px] font-bold tracking-[.18em] text-[#8fd6ac] uppercase">Get My Price</p>
            <h1 className="mt-3 max-w-[16ch] text-4xl leading-[1.03] sm:text-5xl">Firm price in minutes. Booked today.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
              Send your yard photos and we’ll call you within 5 minutes with your firm one-time price—priced from your photos, confirmed before we book.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-xl border border-[#1c2620]/12 bg-white p-6 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-[#eaf2ed] text-[#175a3b]"><CheckCircle2 className="size-8" /></span>
                  <h2 className="mt-6 text-3xl text-[#14372a]">Request received.</h2>
                  <p className="mt-3 max-w-md text-base leading-7 text-[#3d4c43]">
                    We’ll call you within 5 minutes with your firm price. Have your photos ready.
                  </p>
                  <a href={PHONE_HREF} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#175a3b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#14502f]">
                    <Phone className="size-4" />Call {PHONE_DISPLAY}
                  </a>
                  <Link to="/" className="mt-4 text-sm font-semibold text-[#175a3b] underline underline-offset-4">Back to home</Link>
                </div>
              ) : (
                <form onSubmit={submit} aria-busy={isSubmitting}>
                  <h2 className="text-2xl text-[#14372a]">Tell us about your yard</h2>
                  <p className="mt-2 text-sm leading-6 text-[#5c6b62]">All fields marked * are required. It takes about a minute.</p>
                  <div className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold text-[#26332b]">Your name *</span>
                      <input name="name" required autoComplete="name" placeholder="First and last name" className={inputClass} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold text-[#26332b]">Best number to reach you *</span>
                      <input name="phone" required type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555" className={inputClass} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold text-[#26332b]">ZIP code *</span>
                      <input name="zip" required inputMode="numeric" autoComplete="postal-code" pattern="\d{5}(-\d{4})?" title="5-digit ZIP code" placeholder="75201" className={inputClass} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold text-[#26332b]">Service *</span>
                      <select name="service" required value={service} onChange={(event) => setService(event.target.value)} className={inputClass}>
                        <option value="" disabled>Choose a service</option>
                        {SERVICES.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold text-[#26332b]">Preferred day</span>
                      <select name="preferredDay" defaultValue="Any day" className={inputClass}>
                        {DAYS.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-xs font-bold text-[#26332b]">Anything we should know? <span className="font-normal text-[#5c6b62]">(optional)</span></span>
                      <textarea name="notes" rows={3} placeholder="Gate codes, pets, the spot that bothers you most…" className="w-full resize-y rounded-md border border-[#1c2620]/18 bg-white px-4 py-3 text-sm leading-5 text-[#1c2620] outline-none transition placeholder:text-[#8a978d] focus:border-[#175a3b] focus:ring-2 focus:ring-[#175a3b]/20" />
                    </label>
                  </div>

                  <div className="mt-6">
                    <span className="block text-xs font-bold text-[#26332b]">Yard photos — front yard, back yard, and the worst spot</span>
                    <p className="mt-1 text-xs text-[#5c6b62]">Up to 6 photos. Your price is based on these, so make sure the worst spot is in there.</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <label className={`inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-md border border-dashed border-[#175a3b]/40 bg-[#eaf2ed] px-5 text-sm font-bold text-[#14502f] transition hover:bg-[#dcebe2] ${photoBusy ? "opacity-60" : ""}`}>
                        <Upload className="size-4" />{photoBusy ? "Reading photos…" : photos.length ? "Add more photos" : "Add photos"}
                        <input ref={fileRef} type="file" accept="image/*" multiple className="sr-only" disabled={photoBusy || photos.length >= MAX_PHOTOS} onChange={(event) => void addPhotos(event.target.files)} />
                      </label>
                      <span className="text-xs text-[#5c6b62]">{photos.length}/{MAX_PHOTOS} added</span>
                    </div>
                    {photos.length > 0 && (
                      <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {photos.map((photo, index) => (
                          <li key={`${photo.name}-${index}`} className="relative overflow-hidden rounded-md border border-[#1c2620]/12">
                            <img src={photo.data} alt={`Yard photo ${index + 1}`} className="aspect-square w-full object-cover" />
                            <button type="button" aria-label={`Remove photo ${index + 1}`} onClick={() => setPhotos((current) => current.filter((_, i) => i !== index))} className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white">
                              <X className="size-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <label className="mt-6 flex items-start gap-3 rounded-md border border-[#1c2620]/12 bg-[#f9fbf9] p-4">
                    <input type="checkbox" name="smsConsent" className="mt-1 size-4 accent-[#175a3b]" />
                    <span className="text-xs leading-5 text-[#4c5b52]">
                      I agree to receive phone calls and text messages from LoveMeAfter Lawn Care at the number provided, including about my quote and scheduling. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out.
                    </span>
                  </label>

                  {/* Honeypot — hidden from people, tempting for bots */}
                  <label className="sr-only" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" className="h-0 w-0 opacity-0" /></label>

                  {error && <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800">{error}</p>}

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-sm text-[11px] leading-5 text-[#5c6b62]">Your information is used to send your price and schedule the job. Submitting doesn’t commit you to anything.</p>
                    <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#175a3b] px-7 text-sm font-bold text-white transition hover:bg-[#14502f] disabled:opacity-60">
                      {isSubmitting ? <><LoaderCircle className="size-4 animate-spin" /> Sending…</> : "Get My Price"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <aside className="h-fit rounded-xl border border-[#1c2620]/12 bg-[#14372a] p-6 text-white sm:p-8">
              <h2 className="text-2xl">Prefer to talk?</h2>
              <p className="mt-3 text-sm leading-6 text-white/80">Call and tell us about your yard. We’ll quote it on the spot.</p>
              <a href={PHONE_HREF} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#14502f] transition hover:bg-[#eaf2ed]">
                <Phone className="size-4" />{PHONE_DISPLAY}
              </a>
              <div className="mt-7 space-y-3 border-t border-white/15 pt-6 text-sm text-white/85">
                <p className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#8fd6ac]" />One-time jobs at firm prices</p>
                <p className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#8fd6ac]" />Mow from $59 · Fertilization from $99 · Weed control from $79</p>
                <p className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#8fd6ac]" />Mow + fertilization combo: 15% off the second service</p>
                <p className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#8fd6ac]" />Dallas–Fort Worth: Dallas, Fort Worth, Arlington, Plano, Garland, Irving</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
