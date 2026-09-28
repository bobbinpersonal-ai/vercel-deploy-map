import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowUpRight, BadgeCheck, Check, CircleDollarSign, Handshake, House, Phone, Users, Wrench } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { usePageMeta } from "@/components/PageMeta";
import { createFirestoreRecord } from "@/lib/firestore-data";
import { px } from "@/data/photos";

const PROJECTS: [string, string, number][] = [
  ["Roofing & exterior", "Roof repairs, siding, windows, doors, gutters", 237907],
  ["Kitchens & baths", "Cabinetry, counters, tile, plumbing, finishes", 4030055],
  ["Outdoor living", "Decks, patios, fencing, paving, drainage", 33017851],
  ["Home systems", "Heating, cooling, electrical, insulation", 18725613],
];

const STEPS = [
  ["01", "Make a warm introduction", "Connect a homeowner who has a project in mind with our team."],
  ["02", "We take it from there", "We learn what the homeowner needs, arrange the next step, and prepare a clear written scope and price."],
  ["03", "The homeowner chooses", "They can review the project, ask questions, and decide whether to move forward."],
  ["04", "Earn when the project is complete", "The partner commission is calculated from project gross profit and paid after completion as customer or lender payments are received."],
] as const;

export default function PartnershipNetwork() {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePageMeta(
    "Home Services Referral Partner Network | LoveMeAfter Builders",
    "Partner with LoveMeAfter Builders. Earn 25% of project gross profit on eligible completed referrals, with payout as homeowner or lender payments are received.",
  );

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const form = new FormData(event.currentTarget);
      await createFirestoreRecord("partnershipInquiries", {
        name: form.get("name"),
        organization: form.get("organization"),
        email: form.get("email"),
        phone: form.get("phone"),
        relationship: form.get("relationship"),
        markets: form.get("markets"),
        notes: form.get("notes"),
        status: "new",
        source: "partnership_network_page",
      });
      setSubmitted(true);
    } catch {
      setError("We couldn't send your inquiry. Please call us at 424 426 0760.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#252923]">
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" aria-label="LoveMeAfter Builders home"><Logo tone="light" /></Link>
          <a href="tel:+14244260760" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white"><Phone className="size-4" /> <span className="hidden sm:inline">424 426 0760</span></a>
        </nav>
      </header>

      <section className="relative isolate overflow-hidden bg-[#252923] text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(23,29,23,.9),rgba(23,29,23,.42)),url('https://images.pexels.com/photos/4913326/pexels-photo-4913326.jpeg?auto=compress&cs=tinysrgb&w=2200')] bg-cover bg-center" />
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-end gap-10 px-5 pb-14 pt-32 sm:px-8 sm:pb-20 lg:grid-cols-[1fr_.72fr] lg:items-center lg:px-10 lg:py-36">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[.18em] text-[#d7b880] uppercase"><Handshake className="size-4" /> LoveMeAfter Builders · Partner network</p>
            <h1 className="mt-6 text-5xl leading-[.94] tracking-[-.06em] sm:text-7xl lg:text-8xl">Good connections.<br /><span className="text-[#d7b880]">Better home projects.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Bring homeowners and our team together. We help them plan quality home services with clear pricing and optional financing pathways.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#partner-inquiry" className="inline-flex h-12 items-center bg-[#93442e] px-5 text-sm font-semibold text-white transition hover:bg-[#7d3928]">Become a referral partner <ArrowUpRight className="ml-2 size-4" /></a>
              <a href="#how-it-works" className="inline-flex h-12 items-center border border-white/35 px-5 text-sm font-semibold text-white transition hover:bg-white/10">How it works <ArrowDown className="ml-2 size-4" /></a>
            </div>
          </div>
          <aside className="border border-white/20 bg-[#252923]/85 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <p className="text-xs font-bold tracking-[.16em] text-[#d7b880] uppercase">Partner commission</p>
            <p className="mt-3 font-serif text-7xl leading-none tracking-[-.06em]">25<span className="text-5xl">%</span></p>
            <p className="mt-3 text-lg font-semibold">of project gross profit</p>
            <div className="mt-6 border-t border-white/15 pt-5 text-sm leading-6 text-white/75">
              <p>On eligible referred projects after completion.</p>
              <p className="mt-2">Paid as customer or lender payments are received.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-[#252923]/10 bg-[#e9e5db]">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3"><CircleDollarSign className="size-5 shrink-0 text-[#93442e]" /><p className="text-sm font-semibold">25% of project gross profit</p></div>
          <div className="flex items-center gap-3"><BadgeCheck className="size-5 shrink-0 text-[#65735b]" /><p className="text-sm font-semibold">Payout follows completed work and collected payments</p></div>
          <div className="flex items-center gap-3"><House className="size-5 shrink-0 text-[#65735b]" /><p className="text-sm font-semibold">A wide range of homeowner projects</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-xs font-bold tracking-[.16em] text-[#65735b] uppercase">One connection can make a difference</p><h2 className="mt-3 max-w-2xl text-4xl leading-[.98] tracking-[-.05em] sm:text-6xl">Help homeowners find the right next step.</h2></div>
          <p className="max-w-md text-sm leading-6 text-[#696a60]">From a roof that needs attention to a kitchen ready for a refresh, our team can help turn a homeowner’s idea into a practical plan.</p>
        </div>
        <div className="mt-9 grid auto-rows-[190px] grid-cols-2 gap-2 sm:auto-rows-[250px] sm:grid-cols-4 sm:gap-3">
          {PROJECTS.map(([title, detail, id]) => <article key={title} className="group relative overflow-hidden bg-[#e9e5db]">
            <img src={px(id, 900)} alt={title} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5"><h3 className="text-lg font-semibold text-white">{title}</h3><p className="mt-1 text-xs leading-5 text-white/80">{detail}</p></div>
          </article>)}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-[#252923]/10 bg-[#e9e5db]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div><p className="text-xs font-bold tracking-[.16em] text-[#65735b] uppercase">Clear from introduction to payout</p><h2 className="mt-3 text-4xl leading-[.98] tracking-[-.05em] sm:text-5xl">A straightforward way to partner.</h2></div>
            <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {STEPS.map(([number, title, description]) => <article key={number} className="border-t border-[#252923]/20 pt-4"><p className="text-xs font-bold tracking-[.13em] text-[#93442e]">{number}</p><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#696a60]">{description}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_.85fr] lg:px-10 lg:py-24">
        <div className="bg-[#252923] p-7 text-white sm:p-9">
          <Users className="size-6 text-[#d7b880]" />
          <p className="mt-7 text-xs font-bold tracking-[.16em] text-[#d7b880] uppercase">A better homeowner experience</p>
          <h2 className="mt-3 text-3xl leading-tight">Great service, transparent choices.</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-white/75">
            {["Residential projects across exterior, interior, and home systems", "A clear assessment and written scope before the homeowner decides", "Flexible ways to pay, including optional lender financing", "One team to help guide the conversation and next steps"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-[#d7b880]" />{item}</li>)}
          </ul>
          <Link to="/services" className="mt-7 inline-flex items-center text-sm font-semibold text-[#d7b880]">Explore home services <ArrowUpRight className="ml-1 size-4" /></Link>
        </div>
        <div className="border border-[#252923]/12 bg-[#fbf9f3] p-7 sm:p-9">
          <Wrench className="size-6 text-[#93442e]" />
          <p className="mt-7 text-xs font-bold tracking-[.16em] text-[#65735b] uppercase">Optional financing</p>
          <h2 className="mt-3 text-3xl leading-tight">More ways to make a needed project manageable.</h2>
          <p className="mt-4 text-sm leading-6 text-[#696a60]">Homeowners can explore optional financing through Acorn Finance, a loan marketplace where eligible applicants may review offers from participating lenders. Financing is subject to lender approval and terms.</p>
          <Link to="/financing" className="mt-6 inline-flex items-center text-sm font-semibold text-[#93442e]">See how financing works <ArrowUpRight className="ml-1 size-4" /></Link>
          <p className="mt-5 border-t border-[#252923]/10 pt-4 text-xs leading-5 text-[#77796e]">Lenders determine eligibility, rates, terms, and approval. Financing is optional and is not a condition of receiving an estimate.</p>
        </div>
      </section>

      <section className="border-y border-[#252923]/10 bg-[#fbf9f3]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div><p className="text-xs font-bold tracking-[.16em] text-[#65735b] uppercase">The referral structure</p><h2 className="mt-3 text-4xl leading-[.98] tracking-[-.05em] sm:text-5xl">A real share in the work you help create.</h2><p className="mt-5 text-sm leading-6 text-[#696a60]">Referral compensation is based on project gross profit, not the total project price. The partner agreement sets out eligible referrals, attribution, calculation details, and payout terms in writing.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="border border-[#252923]/10 bg-[#f3f0e8] p-6"><CircleDollarSign className="size-5 text-[#93442e]" /><p className="mt-5 text-3xl font-semibold">25%</p><p className="mt-2 text-sm font-semibold">of eligible project gross profit</p><p className="mt-2 text-xs leading-5 text-[#696a60]">The written agreement defines how project gross profit is calculated.</p></article>
              <article className="border border-[#252923]/10 bg-[#f3f0e8] p-6"><Check className="size-5 text-[#65735b]" /><p className="mt-5 text-xl font-semibold">After completion</p><p className="mt-2 text-sm font-semibold">Payout follows collected payments</p><p className="mt-2 text-xs leading-5 text-[#696a60]">As payment is received from the homeowner or lender.</p></article>
            </div>
          </div>
          <p className="mt-8 max-w-5xl border-t border-[#252923]/10 pt-5 text-xs leading-5 text-[#77796e]">Referral arrangements are subject to a written agreement, eligibility requirements, project attribution, and applicable laws and regulations. No project, referral, or commission amount is guaranteed.</p>
        </div>
      </section>

      <section id="partner-inquiry" className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:px-10 lg:py-24">
        <div className="lg:sticky lg:top-10 lg:self-start"><p className="text-xs font-bold tracking-[.16em] text-[#65735b] uppercase">Start a conversation</p><h2 className="mt-3 text-4xl leading-[.98] tracking-[-.05em] sm:text-5xl">Let’s build a useful partnership.</h2><p className="mt-5 text-sm leading-6 text-[#696a60]">Tell us a little about your network and the homeowners you serve. A partnership manager can walk through the referral structure and next steps.</p><a href="tel:+14244260760" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#93442e]"><Phone className="size-4" /> 424 426 0760</a></div>
        <div className="border border-[#252923]/10 bg-[#fbf9f3] p-6 sm:p-9">
          {submitted ? <div className="flex min-h-[360px] flex-col items-center justify-center text-center"><span className="flex size-14 items-center justify-center bg-[#e9e5db] text-[#65735b]"><Check className="size-7" /></span><h3 className="mt-6 text-2xl font-semibold">Thanks for reaching out.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[#696a60]">Your partnership inquiry is in. Our team will follow up to learn more about your network.</p></div> : <form onSubmit={submitInquiry} className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="partner-name" className="text-xs font-semibold tracking-[.1em] uppercase">Your name</label><input id="partner-name" name="name" required autoComplete="name" placeholder="Full name" className="mt-2 h-12 w-full border border-[#252923]/15 bg-[#f3f0e8] px-4 text-sm outline-none focus:border-[#93442e] focus:ring-2 focus:ring-[#93442e]/15" /></div>
            <div><label htmlFor="partner-organization" className="text-xs font-semibold tracking-[.1em] uppercase">Business or organization</label><input id="partner-organization" name="organization" autoComplete="organization" placeholder="Organization name" className="mt-2 h-12 w-full border border-[#252923]/15 bg-[#f3f0e8] px-4 text-sm outline-none focus:border-[#93442e] focus:ring-2 focus:ring-[#93442e]/15" /></div>
            <div><label htmlFor="partner-email" className="text-xs font-semibold tracking-[.1em] uppercase">Email</label><input id="partner-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="mt-2 h-12 w-full border border-[#252923]/15 bg-[#f3f0e8] px-4 text-sm outline-none focus:border-[#93442e] focus:ring-2 focus:ring-[#93442e]/15" /></div>
            <div><label htmlFor="partner-phone" className="text-xs font-semibold tracking-[.1em] uppercase">Phone</label><input id="partner-phone" name="phone" type="tel" required autoComplete="tel" placeholder="(555) 555-5555" className="mt-2 h-12 w-full border border-[#252923]/15 bg-[#f3f0e8] px-4 text-sm outline-none focus:border-[#93442e] focus:ring-2 focus:ring-[#93442e]/15" /></div>
            <div><label htmlFor="partner-relationship" className="text-xs font-semibold tracking-[.1em] uppercase">How do you work with homeowners?</label><input id="partner-relationship" name="relationship" placeholder="Your role or community" className="mt-2 h-12 w-full border border-[#252923]/15 bg-[#f3f0e8] px-4 text-sm outline-none focus:border-[#93442e] focus:ring-2 focus:ring-[#93442e]/15" /></div>
            <div><label htmlFor="partner-markets" className="text-xs font-semibold tracking-[.1em] uppercase">Markets served</label><input id="partner-markets" name="markets" placeholder="City, state / region" className="mt-2 h-12 w-full border border-[#252923]/15 bg-[#f3f0e8] px-4 text-sm outline-none focus:border-[#93442e] focus:ring-2 focus:ring-[#93442e]/15" /></div>
            <div className="sm:col-span-2"><label htmlFor="partner-notes" className="text-xs font-semibold tracking-[.1em] uppercase">What would make this partnership valuable?</label><textarea id="partner-notes" name="notes" rows={4} placeholder="Tell us about your community, network, or questions." className="mt-2 w-full border border-[#252923]/15 bg-[#f3f0e8] px-4 py-3 text-sm outline-none focus:border-[#93442e] focus:ring-2 focus:ring-[#93442e]/15" /></div>
            {error && <p role="alert" className="text-sm text-[#a53c33] sm:col-span-2">{error}</p>}
            <Button disabled={saving} type="submit" className="h-12 rounded-none bg-[#93442e] text-white hover:bg-[#793923] sm:col-span-2">{saving ? "Sending…" : "Send partnership inquiry"}<ArrowUpRight className="size-4" /></Button>
            <p className="text-xs leading-5 text-[#77796e] sm:col-span-2">By submitting, you’re asking LoveMeAfter Builders to contact you about a potential partnership. Referral terms are confirmed separately in writing.</p>
          </form>}
        </div>
      </section>

      <footer className="bg-[#252923] text-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><Link to="/" aria-label="LoveMeAfter Builders home"><Logo tone="light" /></Link><div className="flex flex-wrap gap-4 text-sm text-white/70"><Link to="/services" className="hover:text-white">Home services</Link><Link to="/financing" className="hover:text-white">Financing</Link><Link to="/contractors" className="hover:text-white">Installation partners</Link></div><a href="tel:+14244260760" className="text-sm font-semibold text-[#d7b880]">424 426 0760</a></div></footer>
    </main>
  );
}
