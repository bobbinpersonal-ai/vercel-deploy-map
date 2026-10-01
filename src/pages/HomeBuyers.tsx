import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CircleDollarSign, ClipboardCheck, Hammer, House, LoaderCircle, MapPin, Trees } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { usePageMeta } from "@/components/PageMeta";
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { db, trackEvent } from "@/lib/firebase";
import { px } from "@/data/photos";

type BuyerKind = "house" | "land";

const STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
] as const;

const FIELD_PHOTOS = [
  { label: "Roofing installation", image: 32050399, trade: "Roofing" },
  { label: "Framing and carpentry", image: 32357250, trade: "Carpentry" },
  { label: "Crew reviewing a jobsite", image: 8070723, trade: "Field planning" },
  { label: "Site preparation and excavation", image: 37393680, trade: "Site work" },
];

const PAGE_COPY = {
  house: {
    title: "A more thoughtful way to sell a house.",
    intro: "Tell us about the home and what you need next. We’ll review the location and details, then let you know whether a direct purchase conversation makes sense.",
    eyebrow: "LoveMeAfter Home Buyers · Homes",
    propertyLabel: "Home type",
    propertyOptions: ["Single-family home", "Condo or townhome", "Multi-family property", "Manufactured home", "Other / not sure"],
    image: 4913326,
    icon: House,
  },
  land: {
    title: "Have land you’re ready to let go of?",
    intro: "Vacant lots, infill parcels, inherited land, and acreage each have different details. Share the basics and we’ll review whether the location fits.",
    eyebrow: "LoveMeAfter Home Buyers · Land",
    propertyLabel: "Land type",
    propertyOptions: ["Vacant residential lot", "Infill parcel", "Acreage", "Inherited land", "Other / not sure"],
    image: 37393680,
    icon: Trees,
  },
} satisfies Record<BuyerKind, { title: string; intro: string; eyebrow: string; propertyLabel: string; propertyOptions: string[]; image: number; icon: typeof House }>;

const controlClass = "h-12 w-full rounded-sm border border-[#252923]/15 bg-[#fbf9f3] px-4 text-sm text-[#252923] outline-none transition placeholder:text-[#89877b] focus:border-[#65735b] focus:ring-2 focus:ring-[#65735b]/15";

export default function HomeBuyers({ kind }: { kind: BuyerKind }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const page = PAGE_COPY[kind];
  const PropertyIcon = page.icon;

  usePageMeta(
    kind === "house" ? "Sell a House | LoveMeAfter Home Buyers" : "Sell Land | LoveMeAfter Home Buyers",
    kind === "house"
      ? "Share details about a house you may want to sell. LoveMeAfter Home Buyers reviews property location and details before discussing a possible direct purchase."
      : "Share details about land you may want to sell. LoveMeAfter Home Buyers reviews location and property details before discussing a possible direct purchase.",
    kind === "house" ? "/sell-your-house" : "/sell-your-land",
  );

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const state = String(data.get("state") ?? "");
    const stateName = STATES.find(([code]) => code === state)?.[1] ?? "";
    const smsConsent = data.get("smsConsent") === "on";
    try {
      const lead = {
        name: String(data.get("name") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        address: String(data.get("address") ?? "").trim(),
        city: String(data.get("city") ?? "").trim(),
        state,
        stateName,
        zip: String(data.get("zip") ?? "").trim(),
        propertyType: String(data.get("propertyType") ?? ""),
        service: kind === "house" ? "Sell a house" : "Sell land",
        situation: String(data.get("situation") ?? ""),
        timing: String(data.get("timing") ?? ""),
        notes: String(data.get("notes") ?? "").trim(),
        preferredPath: String(data.get("preferredPath") ?? "").trim(),
        smsConsent,
        smsConsentTextVersion: smsConsent ? "home-buyer-sms-v1" : "",
        smsConsentAt: smsConsent ? new Date().toISOString() : "",
        source: kind === "house" ? "national_sell_house_page" : "national_sell_land_page",
        stage: "new",
        estimatedValue: 0,
      };
      const leadRef = doc(collection(db, "leads"));
      const mailRef = doc(collection(db, "mail"));
      const fields = [
        ["Name", lead.name], ["Phone", lead.phone], ["Email", lead.email || "Not provided"],
        ["Property", [lead.address, lead.city, lead.state, lead.zip].filter(Boolean).join(", ")],
        ["Property type", lead.propertyType], ["Situation", lead.situation || "Not provided"],
        ["Timeline", lead.timing || "Not provided"], ["Preferred path", lead.preferredPath || "Not specified"],
        ["SMS consent", smsConsent ? `Yes · ${lead.smsConsentAt}` : "No"],
        ["Notes", lead.notes || "Not provided"], ["Lead record", leadRef.id],
      ] as const;
      const escapeHtml = (value: string) => value.replace(/[&<>\u0022]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\\"": "&quot;" })[character] ?? character);
      const text = [`New LoveMeAfter Home Buyers ${kind} inquiry`, "", ...fields.map(([label, value]) => `${label}: ${value}`)].join("\n");
      const html = `<div style="font-family:Arial,sans-serif;color:#252923"><h2>New Home Buyers ${kind} inquiry</h2><table>${fields.map(([label, value]) => `<tr><th style="padding:8px;text-align:left">${escapeHtml(label)}</th><td style="padding:8px">${escapeHtml(value)}</td></tr>`).join("")}</table></div>`;
      const batch = writeBatch(db);
      batch.set(leadRef, { ...lead, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      batch.set(mailRef, {
        to: ["hello@lovemeafter.com"],
        from: "LoveMeAfter <hello@lovemeafter.com>",
        ...(lead.email ? { replyTo: lead.email } : {}),
        message: { subject: `Home Buyers ${kind} inquiry · ${lead.city}, ${lead.state}`, text, html },
        source: lead.source,
        leadId: leadRef.id,
        createdAt: serverTimestamp(),
      });
      await batch.commit();
      void trackEvent("home_buyer_inquiry_submitted", { propertyType: kind, state, smsConsent });
      setSubmitted(true);
      form.reset();
    } catch (cause) {
      console.error("Could not save home buyer inquiry", cause);
      setError("We couldn’t submit this right now. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#252923]">
      <div role="banner" className="border-b border-[#252923]/10 bg-[#fbf9f3]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" aria-label="LoveMeAfter home" className="flex items-center gap-3">
            <LogoMark className="size-10" />
            <span className="text-sm font-extrabold tracking-[.02em] sm:text-base">LoveMeAfter <span className="font-medium text-[#65735b]">Home Buyers</span></span>
          </Link>
          <div role="navigation" aria-label="Home buyer pages" className="flex items-center gap-3 text-xs font-semibold sm:gap-6 sm:text-sm">
            <Link to="/sell-your-house" className={kind === "house" ? "text-[#93442e]" : "text-[#696a60] hover:text-[#252923]"}>Houses</Link>
            <Link to="/sell-your-land" className={kind === "land" ? "text-[#93442e]" : "text-[#696a60] hover:text-[#252923]"}>Land</Link>
            <Link to="/" className="hidden text-[#696a60] hover:text-[#252923] sm:inline">Construction services</Link>
          </div>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-b border-[#252923]/10">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${px(page.image, 1800)})` }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f3f0e8] via-[#f3f0e8]/95 to-[#f3f0e8]/70" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:py-28">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold tracking-[.19em] text-[#65735b] uppercase"><MapPin className="size-3.5" />{page.eyebrow}</p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[.91] tracking-[-.055em] sm:text-7xl">{page.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#62695f] sm:text-lg sm:leading-8">{page.intro}</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#62695f]">We review properties in markets where we’re prepared to operate. Share the property’s state and we’ll confirm whether we can consider it.</p>
            <a href="#property-form" className="mt-8 inline-flex h-12 items-center gap-2 bg-[#93442e] px-5 text-sm font-semibold text-white transition hover:bg-[#793923]">Tell us about the property <ArrowDown className="size-4" /></a>
          </div>
          <div className="relative min-h-[330px] sm:min-h-[450px]">
            <div className="absolute inset-x-8 top-3 h-[72%] overflow-hidden rounded-sm shadow-xl sm:inset-x-12">
              <img src={px(page.image, 1300)} alt={kind === "house" ? "Residential home exterior" : "Site preparation and land work"} fetchPriority="high" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#182019]/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 text-xs font-semibold text-white"><PropertyIcon className="size-4" /> {kind === "house" ? "Homes" : "Land and property"} · inquiry by location</span>
            </div>
            <div className="absolute bottom-1 left-0 w-[44%] overflow-hidden border-4 border-[#f3f0e8] shadow-xl sm:bottom-0 sm:left-2">
              <img src={px(32050399, 750)} alt="Roofing construction work" loading="lazy" className="h-36 w-full object-cover sm:h-48" />
            </div>
            <div className="absolute bottom-0 right-0 max-w-[58%] border border-[#252923]/10 bg-[#fbf9f3] p-4 shadow-xl sm:p-5">
              <span className="flex size-9 items-center justify-center bg-[#e9e5db] text-[#65735b]"><Hammer className="size-4" /></span>
              <p className="mt-3 text-sm font-semibold">A construction-informed conversation.</p>
              <p className="mt-1 text-xs leading-5 text-[#696a60]">We understand how condition and repair scope can shape the options worth discussing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#252923]/10 bg-[#252923] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[.65fr_1.35fr] lg:items-center lg:px-10">
          <div><p className="text-[10px] font-bold tracking-[.18em] text-[#d7b880] uppercase">Construction in the field</p><h2 className="mt-3 text-4xl leading-[.97] tracking-[-.045em] sm:text-5xl">A practical eye for the work behind a property.</h2><p className="mt-5 text-sm leading-6 text-white/70">Watch the existing LoveMeAfter project film. Supporting photos below show representative construction trades and site work.</p></div>
          <video className="aspect-video w-full border border-white/15 bg-black object-cover" src="/copy_5E397E73-24D9-4597-8204-60EA4CE89EDD.mp4" controls playsInline preload="metadata" poster={px(32050399, 1200)} aria-label="LoveMeAfter construction project film" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="border border-[#252923]/10 bg-[#fbf9f3] p-6 sm:p-7"><CircleDollarSign className="size-5 text-[#93442e]" /><h2 className="mt-5 text-2xl">As-is purchase</h2><p className="mt-2 text-sm leading-6 text-[#62695f]">Ask about a possible cash purchase without first completing repairs. Any offer depends on location, review, and written terms.</p></article>
          <article className="border border-[#252923]/10 bg-[#fbf9f3] p-6 sm:p-7"><Hammer className="size-5 text-[#93442e]" /><h2 className="mt-5 text-2xl">Renovation conversation</h2><p className="mt-2 text-sm leading-6 text-[#62695f]">For some homes, construction experience may help us evaluate a purchase and renovation path. Availability and fit vary.</p></article>
          <article className="border border-[#252923]/10 bg-[#fbf9f3] p-6 sm:p-7"><ClipboardCheck className="size-5 text-[#93442e]" /><h2 className="mt-5 text-2xl">Clear next steps</h2><p className="mt-2 text-sm leading-6 text-[#62695f]">Start with property details. We’ll review them and explain whether a conversation makes sense—no obligation to accept an offer.</p></article>
        </div>
      </section>

      <section className="bg-[#252923] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div><p className="text-[10px] font-bold tracking-[.18em] text-[#d7b880] uppercase">Built around real property work</p><h2 className="mt-3 max-w-md text-4xl leading-[.97] tracking-[-.045em] sm:text-5xl">We look past the listing photos.</h2></div>
            <p className="max-w-2xl text-sm leading-6 text-white/70">LoveMeAfter’s construction background gives us a practical lens on condition, repairs, and project scope. These construction and fieldwork images illustrate the trades and site work we know; they are not claims that each pictured project was completed by LoveMeAfter.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{FIELD_PHOTOS.map((photo) => <figure key={photo.label} className="group relative min-h-36 overflow-hidden bg-[#383d36] sm:min-h-52"><img src={px(photo.image, 800)} alt={photo.label} loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><figcaption className="absolute inset-x-0 bottom-0 p-3"><span className="text-[9px] font-bold tracking-[.12em] text-[#d7b880] uppercase">{photo.trade}</span><p className="mt-1 text-xs font-semibold text-white sm:text-sm">{photo.label}</p></figcaption></figure>)}</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.7fr_1.3fr] lg:px-10">
        <div><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">A straightforward process</p><h2 className="mt-4 text-4xl leading-[.97] tracking-[-.045em] sm:text-5xl">First, we learn what matters to you.</h2><div className="mt-8 space-y-6">{[["01", "Share the basics", "Tell us who to contact, where the property is, and what you’d like to do."], ["02", "We review the details", "Our team checks the information and whether the property is in a market we can serve."], ["03", "Discuss possible options", "If there’s a fit, Bobbin or an authorized representative can discuss possible written terms. Submitting a form is not an offer or contract."]].map(([number, title, copy]) => <div key={number} className="flex gap-4 border-t border-[#252923]/12 pt-5"><span className="text-xs font-bold text-[#93442e]">{number}</span><div><h3 className="text-xl">{title}</h3><p className="mt-1 text-sm leading-6 text-[#62695f]">{copy}</p></div></div>)}</div></div>
        <div id="property-form" className="scroll-mt-8 border border-[#252923]/12 bg-[#e9e5db] p-5 sm:p-8">
          {submitted ? <div className="flex min-h-[420px] flex-col items-start justify-center"><span className="flex size-12 items-center justify-center bg-[#dce4cf] text-[#526047]"><Check className="size-5" /></span><p className="mt-6 text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">Inquiry received</p><h2 className="mt-3 text-4xl">Thanks for sharing the details.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-[#62695f]">Your property inquiry has been submitted for review. A member of the team may follow up using the contact information you provided. No purchase offer or appointment has been made.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-[#93442e]">Submit another property <ArrowRight className="ml-1 inline size-4" /></button></div> : <>
            <p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">Property inquiry · no obligation</p><h2 className="mt-3 text-4xl leading-[.98] tracking-[-.045em]">Tell us about your {kind === "house" ? "house" : "land"}.</h2><p className="mt-3 text-sm leading-6 text-[#62695f]">Fields marked * are required. We’ll use these details to review your inquiry.</p>
            <form className="mt-7 space-y-5" onSubmit={submitLead}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold">Your name *<input className={`${controlClass} mt-2`} name="name" required autoComplete="name" placeholder="Full name" /></label>
                <label className="text-xs font-semibold">Best phone number *<input className={`${controlClass} mt-2`} name="phone" required type="tel" autoComplete="tel" placeholder="(555) 555-5555" /></label>
                <label className="text-xs font-semibold">Email address<input className={`${controlClass} mt-2`} name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
                <label className="text-xs font-semibold">{page.propertyLabel} *<select className={`${controlClass} mt-2`} name="propertyType" required defaultValue=""><option value="" disabled>Select one</option>{page.propertyOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="text-xs font-semibold sm:col-span-2">Property street address *<input className={`${controlClass} mt-2`} name="address" required autoComplete="street-address" placeholder="Street address or parcel location" /></label>
                <label className="text-xs font-semibold">City *<input className={`${controlClass} mt-2`} name="city" required autoComplete="address-level2" placeholder="City" /></label>
                <label className="text-xs font-semibold">State *<select className={`${controlClass} mt-2`} name="state" required defaultValue=""><option value="" disabled>Select state</option>{STATES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select></label>
                <label className="text-xs font-semibold">ZIP code<input className={`${controlClass} mt-2`} name="zip" autoComplete="postal-code" inputMode="numeric" placeholder="ZIP" /></label>
                <label className="text-xs font-semibold">When would you like to sell?<select className={`${controlClass} mt-2`} name="timing" defaultValue=""><option value="">Choose timing</option>{["As soon as practical", "Within 30 days", "1–3 months", "Just exploring"].map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="text-xs font-semibold">Your situation<select className={`${controlClass} mt-2`} name="situation" defaultValue=""><option value="">Choose if helpful</option>{["Inherited property", "Repairs needed", "Vacant property", "Relocating", "Managing a rental", "Other / prefer not to say"].map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="text-xs font-semibold">What would you like to explore?<select className={`${controlClass} mt-2`} name="preferredPath" defaultValue=""><option value="">Not sure yet</option><option>As-is cash purchase</option>{kind === "house" && <option>Renovation purchase conversation</option>}<option>Help understanding possible options</option></select></label>
                <label className="text-xs font-semibold sm:col-span-2">Anything else we should know?<textarea className="mt-2 min-h-28 w-full resize-y rounded-sm border border-[#252923]/15 bg-[#fbf9f3] px-4 py-3 text-sm outline-none placeholder:text-[#89877b] focus:border-[#65735b] focus:ring-2 focus:ring-[#65735b]/15" name="notes" placeholder="Condition, ownership, liens, tenants, access, or questions" /></label>
              </div>
              <label className="flex items-start gap-3 border-t border-[#252923]/10 pt-5 text-xs leading-5 text-[#62695f]"><input name="smsConsent" type="checkbox" className="mt-1 size-4 shrink-0 accent-[#93442e]" /><span>Optional: I agree to receive text messages from LoveMeAfter Home Buyers about this property inquiry at the number I provided. Message frequency varies; message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of a purchase or sale.</span></label>
              <p className="text-[11px] leading-5 text-[#696a60]">We use the information to review and respond to this request. Checking the optional box records text-message consent; it does not mean a text will be sent automatically.</p>
              {error && <p role="alert" className="border border-red-800/20 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</p>}
              <button type="submit" disabled={submitting} className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#93442e] px-5 text-sm font-semibold text-white transition hover:bg-[#793923] disabled:cursor-wait disabled:opacity-60 sm:w-auto">{submitting ? <><LoaderCircle className="size-4 animate-spin" /> Sending…</> : <>Send property details <ArrowUpRight className="size-4" /></>}</button>
            </form>
          </>}
        </div>
      </section>

      <section className="border-y border-[#252923]/10 bg-[#fbf9f3]"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 text-xs leading-5 text-[#696a60] sm:grid-cols-2 sm:px-8 lg:px-10"><p>LoveMeAfter Home Buyers is a home-buying inquiry page, not an offer to represent a property owner as an agent or broker. Coverage and purchase availability vary by state and location. Submitting this form does not create a contract or guarantee an offer.</p><p>Any purchase, assignment of contract rights, disclosures, timelines, deposits, and other terms depend on a written agreement and applicable law. Where assignment is contemplated, it will be disclosed in writing as required before signing. Please seek independent legal, tax, and financial advice as needed.</p></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#696a60] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><Link to="/" className="font-semibold text-[#252923]">LoveMeAfter.com</Link><span>LoveMeAfter Home Buyers · House and land inquiries</span><Link to={kind === "house" ? "/sell-your-land" : "/sell-your-house"} className="inline-flex items-center font-semibold text-[#93442e]">{kind === "house" ? "Selling land instead?" : "Selling a house instead?"} <ArrowUpRight className="ml-1 size-3.5" /></Link></footer>
    </main>
  );
}

export function SellYourHouse() {
  return <HomeBuyers kind="house" />;
}

export function SellYourLand() {
  return <HomeBuyers kind="land" />;
}
