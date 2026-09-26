import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LoaderCircle, MapPin, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { db, trackEvent } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { ESTIMATE_REQUEST_EVENT, openEstimateRequest, type RequestedVisit } from "@/lib/estimate-request";

const PROJECTS = [
  "Roofing", "Windows & doors", "Siding & exterior", "Gutters & drainage", "Kitchen", "Bathroom", "HVAC & comfort", "Electrical", "Plumbing", "Deck, patio & fence", "Driveway & concrete", "Painting & finishes", "Insulation & weatherization", "Landscaping & drainage", "Solar & backup power", "Other / not sure",
];

const PROJECT_ALIASES: Record<string, string> = {
  roof: "Roofing", roofing: "Roofing", window: "Windows & doors", windows: "Windows & doors", door: "Windows & doors", doors: "Windows & doors", siding: "Siding & exterior", exterior: "Siding & exterior", gutter: "Gutters & drainage", gutters: "Gutters & drainage", kitchen: "Kitchen", kitchens: "Kitchen", bathroom: "Bathroom", bathrooms: "Bathroom", hvac: "HVAC & comfort", heating: "HVAC & comfort", cooling: "HVAC & comfort", electrical: "Electrical", electrician: "Electrical", plumbing: "Plumbing", plumber: "Plumbing", deck: "Deck, patio & fence", patio: "Deck, patio & fence", fence: "Deck, patio & fence", fencing: "Deck, patio & fence", concrete: "Driveway & concrete", paving: "Driveway & concrete", driveway: "Driveway & concrete", painting: "Painting & finishes", paint: "Painting & finishes", insulation: "Insulation & weatherization", weatherization: "Insulation & weatherization", landscaping: "Landscaping & drainage", drainage: "Landscaping & drainage", solar: "Solar & backup power", backup: "Solar & backup power",
};

function matchProject(service?: string) {
  if (!service) return "";
  const normalized = service.toLowerCase().trim();
  return PROJECT_ALIASES[normalized] ?? PROJECTS.find((item) => item.toLowerCase().includes(normalized) || normalized.includes(item.toLowerCase())) ?? Object.entries(PROJECT_ALIASES).find(([alias]) => normalized.includes(alias))?.[1] ?? "Other / not sure";
}

const TIMING = ["As soon as practical", "Within 30 days", "1–3 months", "Just exploring"];

function escapeHtml(value: string) {
  return value.replace(/[&<>\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[character] ?? character);
}

export function EstimateRequestDialog() {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [requestedVisit, setRequestedVisit] = useState<RequestedVisit | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as CustomEvent<{ service?: string; requestedVisit?: RequestedVisit }>).detail;
      setRequestedVisit(detail?.requestedVisit ?? null);
      setProject(matchProject(detail?.service));
      setSubmitted(false);
      setError("");
      setOpen(true);
    };
    window.addEventListener(ESTIMATE_REQUEST_EVENT, handleOpen);
    return () => window.removeEventListener(ESTIMATE_REQUEST_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => firstInputRef.current?.focus(), 80);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const selectedProject = String(formData.get("project") ?? "Other / not sure");
    try {
      const lead = {
        name: String(formData.get("name") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        address: String(formData.get("address") ?? "").trim(),
        city: String(formData.get("city") ?? "").trim(),
        service: selectedProject,
        timing: String(formData.get("timing") ?? ""),
        notes: String(formData.get("priorities") ?? "").trim(),
        consultationSlot: requestedVisit,
        estimatedValue: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        stage: requestedVisit ? "appointment_requested" : "new",
        source: "sitewide_free_assessment_dialog",
      };
      const leadRef = await addDoc(collection(db, "leads"), lead);
      const details = [
        ["Name", lead.name], ["Phone", lead.phone], ["Email", lead.email || "Not provided"],
        ["Project", lead.service], ["Timing", lead.timing || "Not specified"],
        ["Address", [lead.address, lead.city].filter(Boolean).join(", ") || "Not provided"],
        ["Priorities", lead.notes || "Not provided"],
        ["Requested visit", requestedVisit ? `${requestedVisit.dateLabel} · ${requestedVisit.time}` : "Not requested"],
        ["Lead record", leadRef.id],
      ] as const;
      const text = ["New LoveMeAfter free assessment request", "", ...details.map(([label, value]) => `${label}: ${value}`)].join("\n");
      const html = `<div style="font-family:Arial,sans-serif;color:#211824;max-width:640px"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8c4b69">New free assessment request</p><h1 style="font-size:24px">A homeowner is ready to talk.</h1><table style="width:100%;border-collapse:collapse">${details.map(([label, value]) => `<tr><th style="padding:10px 12px;text-align:left;border-top:1px solid #eee;vertical-align:top">${escapeHtml(label)}</th><td style="padding:10px 12px;border-top:1px solid #eee">${escapeHtml(value)}</td></tr>`).join("")}</table></div>`;
      await addDoc(collection(db, "mail"), {
        to: ["hello@lovemeafter.com"],
        from: "LoveMeAfter <hello@lovemeafter.com>",
        ...(lead.email ? { replyTo: lead.email } : {}),
        message: { subject: `New home assessment · ${lead.service || "Project to be determined"}`, text, html },
        source: "sitewide_free_assessment_dialog",
        leadId: leadRef.id,
        createdAt: serverTimestamp(),
      });
      void trackEvent("estimate_request_submitted", { service: selectedProject, source: "sitewide_assessment_dialog" });
      setSubmitted(true);
    } catch {
      setError("We couldn’t send this just now. Please try again or call us at 424 426 0760.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#0c0810]/78 px-3 py-5 backdrop-blur-md sm:px-6 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="estimate-dialog-title"
            aria-describedby="estimate-dialog-description"
            className="relative my-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#1d1722]/95 text-white shadow-[0_32px_120px_rgba(0,0,0,.7)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[#ef8eb4]/[.12] blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 -left-24 size-72 rounded-full bg-[#7a8a45]/[.12] blur-3xl" />
            <div className="relative border-b border-white/10 px-5 py-6 sm:px-9 sm:py-8">
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assessment form" className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[.05] text-white/75 transition hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"><X className="size-4" /></button>
              <p className="text-[10px] font-bold tracking-[.2em] text-[#ffc6dc] uppercase">Free · no-pressure home assessment</p>
              <h2 id="estimate-dialog-title" className="mt-3 max-w-xl font-serif text-3xl leading-[.98] tracking-[-.05em] sm:text-5xl">Let’s make the next step feel clear.</h2>
              <p id="estimate-dialog-description" className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">Tell us what would make your home work better. We’ll use your details to prepare a useful conversation—not a generic pitch.</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/75"><span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-[#ffc6dc]" /> Written scope before you decide</span><span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-[#ffc6dc]" /> Optional financing to compare</span><span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-[#ffc6dc]" /> Required credentials checked for scope</span></div>
            </div>

            {submitted ? (
              <div className="relative flex min-h-[350px] flex-col items-center justify-center px-6 py-12 text-center sm:px-12">
                <span className="flex size-16 items-center justify-center rounded-full border border-[#ef8eb4]/40 bg-[#ef8eb4]/10 text-[#ffc6dc]"><CheckCircle2 className="size-8" /></span>
                <p className="mt-6 text-[10px] font-bold tracking-[.2em] text-[#ffc6dc] uppercase">Request received</p>
                <h3 className="mt-3 font-serif text-3xl tracking-[-.04em] sm:text-4xl">We’ll take it from here.</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/75">A coordinator will review what you shared and follow up. No obligation to move forward.</p>
                <Button type="button" onClick={() => setOpen(false)} className="mt-7 rounded-full bg-[#ef8eb4] px-6 font-semibold text-[#24131d] hover:bg-[#f6b0ca]">Done</Button>
              </div>
            ) : (
              <form onSubmit={submitRequest} className="relative px-5 py-6 sm:px-9 sm:py-8" aria-busy={isSubmitting}>
                <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                  <label className="block"><span className="mb-2 block text-xs font-semibold text-white/85">What should we call you? <span className="text-[#ffc6dc]">*</span></span><input ref={firstInputRef} name="name" required autoComplete="name" placeholder="Your name" className="h-12 w-full rounded-xl border border-white/15 bg-white/[.06] px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#ef8eb4]/80 focus:bg-white/[.09] focus:ring-2 focus:ring-[#ef8eb4]/20" /></label>
                  <label className="block"><span className="mb-2 block text-xs font-semibold text-white/85">Best number to reach you <span className="text-[#ffc6dc]">*</span></span><input name="phone" required type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555" className="h-12 w-full rounded-xl border border-white/15 bg-white/[.06] px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#ef8eb4]/80 focus:bg-white/[.09] focus:ring-2 focus:ring-[#ef8eb4]/20" /></label>
                  <label className="block"><span className="mb-2 block text-xs font-semibold text-white/85">Email <span className="font-normal text-white/50">(optional)</span></span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="h-12 w-full rounded-xl border border-white/15 bg-white/[.06] px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#ef8eb4]/80 focus:bg-white/[.09] focus:ring-2 focus:ring-[#ef8eb4]/20" /></label>
                  <label className="block"><span className="mb-2 block text-xs font-semibold text-white/85">Project you’re thinking about</span><select name="project" value={project} onChange={(event) => setProject(event.target.value)} className="h-12 w-full rounded-xl border border-white/15 bg-[#302733] px-4 text-sm text-white outline-none transition focus:border-[#ef8eb4]/80 focus:ring-2 focus:ring-[#ef8eb4]/20"><option value="">Choose a project</option>{PROJECTS.map((item) => <option key={item}>{item}</option>)}</select></label>
                  <label className="block"><span className="mb-2 block text-xs font-semibold text-white/85">When are you hoping to start?</span><select name="timing" defaultValue="" className="h-12 w-full rounded-xl border border-white/15 bg-[#302733] px-4 text-sm text-white outline-none transition focus:border-[#ef8eb4]/80 focus:ring-2 focus:ring-[#ef8eb4]/20"><option value="">Choose timing</option>{TIMING.map((item) => <option key={item}>{item}</option>)}</select></label>
                  <label className="block"><span className="mb-2 block text-xs font-semibold text-white/85">Where is the home? <span className="font-normal text-white/50">(optional)</span></span><div className="relative"><MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/45" /><input name="address" autoComplete="street-address" placeholder="Street address" className="h-12 w-full rounded-xl border border-white/15 bg-white/[.06] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#ef8eb4]/80 focus:ring-2 focus:ring-[#ef8eb4]/20" /></div></label>
                  <label className="block"><span className="mb-2 block text-xs font-semibold text-white/85">City, state &amp; ZIP <span className="font-normal text-white/50">(optional)</span></span><input name="city" autoComplete="address-level2" placeholder="City, state & ZIP" className="h-12 w-full rounded-xl border border-white/15 bg-white/[.06] px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#ef8eb4]/80 focus:ring-2 focus:ring-[#ef8eb4]/20" /></label>
                  {requestedVisit && <div className="rounded-xl border border-[#ef8eb4]/30 bg-[#ef8eb4]/[.08] px-4 py-3 text-sm text-white/85 sm:col-span-2"><span className="font-semibold text-[#ffc6dc]">Requested in-home visit:</span> {requestedVisit.dateLabel} · {requestedVisit.time} (45 minutes). The team will follow up to confirm availability.</div>}
                  <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold text-white/85">What matters most? <span className="font-normal text-white/50">(optional)</span></span><textarea name="priorities" rows={3} placeholder="Comfort, protection, less maintenance, resale, budget, timing…" className="w-full resize-y rounded-xl border border-white/15 bg-white/[.06] px-4 py-3 text-sm leading-5 text-white outline-none transition placeholder:text-white/40 focus:border-[#ef8eb4]/80 focus:ring-2 focus:ring-[#ef8eb4]/20" /></label>
                </div>
                {error && <p role="alert" className="mt-4 rounded-xl border border-red-300/25 bg-red-950/35 px-4 py-3 text-sm leading-5 text-red-100">{error}</p>}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-sm text-[11px] leading-5 text-white/55">Your information is used to respond to this request. Submitting doesn’t commit you to a project.</p><Button type="submit" disabled={isSubmitting} className="h-12 shrink-0 rounded-full bg-[#ef8eb4] px-6 text-sm font-bold text-[#24131d] shadow-[0_10px_30px_rgba(239,142,180,.18)] transition hover:-translate-y-0.5 hover:bg-[#f6b0ca] disabled:opacity-60">{isSubmitting ? <><LoaderCircle className="mr-2 size-4 animate-spin" /> Sending request…</> : <>Request my free assessment <ArrowRight className="ml-2 size-4" /></>}</Button></div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
