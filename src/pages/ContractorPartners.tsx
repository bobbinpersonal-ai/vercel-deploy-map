import { Button } from "@/components/ui/button";
import { createFirestoreRecord } from "@/lib/firestore-data";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check, CheckCircle2, ClipboardCheck, HardHat, Loader2, MapPin, Phone, ShieldCheck, Sparkles, Users, Wrench } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ExpertTopic } from "@/components/ExpertTopic";
import { usePageMeta } from "@/components/PageMeta";

const BENEFITS = [
  [CalendarDays, "A steadier calendar", "Get matched with residential opportunities that fit your trade, geography, crew size, and actual capacity."],
  [ClipboardCheck, "A cleaner handoff", "See the homeowner context, project scope, photos, access notes, and schedule expectations before you commit."],
  [ShieldCheck, "A partner that protects the standard", "We care about communication, jobsite respect, workmanship, and the final walkthrough—not just getting a job started."],
  [Users, "A network worth belonging to", "Build relationships with a team that wants dependable local pros, not a revolving door of anonymous crews."],
] as const;

const STEPS = [
  ["01", "Tell us where you shine", "Share your trades, coverage area, crew capacity, and the kind of residential work you do best."],
  ["02", "Meet the people behind the work", "We talk through your experience, insurance, communication style, and what a good partnership looks like to you."],
  ["03", "Review the opportunity", "When a project fits, you get the information needed to make a confident yes—or an honest no."],
  ["04", "Do work homeowners remember", "Deliver a clean install, communicate clearly, and keep the final detail as important as the first impression."],
];

const STANDARDS = [
  "Current general liability insurance and required credentials",
  "A dependable crew with the capacity you say you have",
  "Respectful jobsites, clean communication, and documented completion",
  "A willingness to flag scope or site conditions early",
  "Ownership of the punch list and final walkthrough",
];

export default function ContractorPartners() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePageMeta(
    "Contractor & Installation Partners | LoveMeAfter",
    "Join the LoveMeAfter network: homeowner demand in 17 states, clear written scopes, protected jobsites and paid milestones for vetted residential crews.",
  );

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const form = new FormData(event.currentTarget);
      await createFirestoreRecord("contractorApplications", {
        name: form.get("name"),
        company: form.get("company"),
        email: form.get("email"),
        phone: form.get("phone"),
        city: form.get("city"),
        trade: form.get("trade"),
        capacity: form.get("capacity"),
        website: form.get("website"),
        notes: form.get("notes"),
        status: "new",
        source: "contractor_partner_page",
      });
      setSubmitted(true);
    } catch {
      setError("We could not send this application. Please call us at 424 426 0760.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#1d211d]">
      <header className="absolute inset-x-0 top-0 z-20 text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3 font-semibold tracking-[-.02em]"><span className="flex size-10 items-center justify-center rounded-full bg-[#d5ec77] text-[#1d211d]"><LogoMark className="size-5" /></span>LoveMeAfter</Link>
          <div className="flex items-center gap-4"><a href="tel:+14244260760" className="hidden items-center gap-2 text-sm text-white/75 sm:flex"><Phone className="size-4" /> 424 426 0760</a><Button onClick={() => navigate("/")} variant="ghost" className="text-white hover:bg-white/10"><ArrowLeft className="mr-2 size-4" /> Back home</Button></div>
        </nav>
      </header>

      <section className="relative isolate min-h-[720px] overflow-hidden bg-[#182019] text-white">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,22,16,.96)_0%,rgba(15,22,16,.72)_45%,rgba(15,22,16,.18)_100%),url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2400&q=90')] bg-cover bg-center" />
        <div className="mx-auto flex min-h-[720px] max-w-7xl items-end px-5 pb-20 pt-36 sm:px-8 lg:px-10 lg:pb-28"><div className="max-w-4xl"><p className="flex items-center gap-2 text-xs font-semibold tracking-[.2em] text-[#d5ec77] uppercase"><span className="size-2 rounded-full bg-[#d5ec77]" /> Work with LoveMeAfter</p><h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[.9] tracking-[-.07em] sm:text-7xl lg:text-[6.8rem]">Bring the craft.<br /><span className="text-[#d5ec77]">We’ll bring the opportunity.</span></h1><p className="mt-8 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">We are building a trusted network of residential installation partners who care about the work, the homeowner, and the details that happen after the contract is signed.</p><div className="mt-10 flex flex-wrap gap-3"><a href="#application" className="flex h-14 items-center rounded-full bg-[#d5ec77] px-7 font-semibold text-[#1d211d] hover:bg-[#e1f895]">Start a partner conversation <ArrowUpRight className="ml-2 size-5" /></a><a href="#how-it-works" className="flex h-14 items-center rounded-full border border-white/25 px-6 text-sm font-medium hover:bg-white/10">See how it works <ArrowRight className="ml-2 size-4" /></a></div></div></div>
      </section>

      <section className="border-b border-[#1d211d]/10 bg-[#d5ec77]"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-3 lg:px-10"><div><p className="text-xs font-semibold tracking-[.16em] text-[#657035] uppercase">The opportunity</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">More of the work you do best.</p></div><div><p className="text-xs font-semibold tracking-[.16em] text-[#657035] uppercase">The standard</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">Clear scopes. Clean jobsites.</p></div><div><p className="text-xs font-semibold tracking-[.16em] text-[#657035] uppercase">The relationship</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em]">Built for the long game.</p></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Not just another lead source</p><h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl">Good work deserves a better handoff.</h2></div><p className="max-w-xl text-lg leading-8 text-[#62695f]">A project is easier to deliver when everyone knows what was promised, what the homeowner expects, what the property needs, and what success looks like. That is the kind of operating relationship we are building.</p></div><div className="mt-14 grid gap-4 sm:grid-cols-2">{BENEFITS.map(([Icon, title, description]) => <article key={title} className="group border border-[#1d211d]/12 bg-white p-7 transition hover:-translate-y-1 hover:border-[#71803d]"><Icon className="size-6 text-[#71803d]" /><h3 className="mt-10 text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[#62695f]">{description}</p><ArrowUpRight className="mt-8 size-4 text-[#71803d] transition group-hover:translate-x-1 group-hover:-translate-y-1" /></article>)}</div></section>

      <section id="how-it-works" className="border-y border-[#1d211d]/10 bg-[#ece9e0]"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">A thoughtful beginning</p><h2 className="mt-4 max-w-md text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl">A partnership should feel clear from day one.</h2><p className="mt-6 max-w-md text-base leading-7 text-[#62695f]">We are not interested in wasting your time with vague promises. We learn how you work, share what we know, and only move forward when the fit makes sense.</p></div><div className="grid gap-8 sm:grid-cols-2">{STEPS.map(([number, title, description]) => <article key={number} className="border-t-2 border-[#1d211d]/15 pt-5"><span className="text-sm font-semibold text-[#71803d]">{number}</span><h3 className="mt-6 text-xl font-semibold tracking-[-.03em]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#62695f]">{description}</p></article>)}</div></div></div></section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:py-32"><div className="min-h-[540px] rounded-[2rem] bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=90')] bg-cover bg-center" /><div className="flex flex-col justify-center"><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">The kind of partner we want</p><h2 className="mt-4 text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl">Professional is a way of working.</h2><p className="mt-6 text-lg leading-8 text-[#62695f]">Credentials matter. So do the things a homeowner feels: a call returned, a floor protected, a question answered, a promise kept.</p><ul className="mt-8 space-y-4">{STANDARDS.map((standard) => <li key={standard} className="flex gap-3 text-sm leading-6 text-[#4f5a4d]"><Check className="mt-0.5 size-5 shrink-0 text-[#71803d]" />{standard}</li>)}</ul><a href="#application" className="mt-9 flex h-14 w-fit items-center rounded-full bg-[#1d211d] px-7 font-semibold text-white hover:bg-[#30382f]">See if we’re a fit <ArrowUpRight className="ml-2 size-5" /></a></div></section>

      <section className="relative overflow-hidden bg-[#1d211d] text-white"><div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[url('https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1600&q=90')] bg-cover bg-center opacity-60 lg:block" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#1d211d_0%,#1d211d_54%,rgba(29,33,29,.55)_100%)] lg:bg-[linear-gradient(90deg,#1d211d_0%,#1d211d_48%,rgba(29,33,29,.15)_100%)]" /><div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="max-w-xl"><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">Bring your best work</p><h2 className="mt-4 text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl">Let’s make the next install one you’re proud to put your name on.</h2><p className="mt-6 text-lg leading-8 text-white/70">Tell us about your crew, your coverage, and the work you want more of. We’ll take it from there.</p><a href="#application" className="mt-9 inline-flex h-14 items-center rounded-full bg-[#d5ec77] px-7 font-semibold text-[#1d211d] hover:bg-[#e1f895]">Open the application <ArrowUpRight className="ml-2 size-5" /></a></div></div></section>

      <ExpertTopic compact />

      <section id="application" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-start"><div className="lg:sticky lg:top-10"><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Partner application</p><h2 className="mt-4 text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl">Tell us where you work best.</h2><p className="mt-6 max-w-md text-base leading-7 text-[#62695f]">No polished pitch required. Give us the real picture and we’ll follow up if there is a strong fit.</p><div className="mt-10 space-y-4 text-sm text-[#62695f]"><p className="flex gap-3"><MapPin className="size-5 shrink-0 text-[#71803d]" />Serving residential markets with room to grow.</p><p className="flex gap-3"><HardHat className="size-5 shrink-0 text-[#71803d]" />Roofing, windows, siding, gutters, and related trades.</p><p className="flex gap-3"><Sparkles className="size-5 shrink-0 text-[#71803d]" />A high bar for craft, communication, and care.</p></div></div><div className="border border-[#1d211d]/12 bg-white p-6 sm:p-10">{submitted ? <div className="flex min-h-[440px] flex-col items-center justify-center text-center"><span className="flex size-16 items-center justify-center rounded-full bg-[#eaf0d0] text-[#71803d]"><CheckCircle2 className="size-8" /></span><h3 className="mt-7 text-3xl font-semibold tracking-[-.04em]">Thanks for raising your hand.</h3><p className="mt-4 max-w-md text-sm leading-6 text-[#62695f]">Your application is in our review queue. A LoveMeAfter partner coordinator will reach out if the next conversation is a fit.</p><Link to="/" className="mt-8 inline-flex h-12 items-center rounded-full bg-[#1d211d] px-6 text-sm font-semibold text-white">Back to LoveMeAfter <ArrowUpRight className="ml-2 size-4" /></Link></div> : <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="name" className="text-xs font-semibold tracking-[.12em] uppercase">Your name</label><input id="name" name="name" required placeholder="Your name" className="mt-2 h-12 w-full rounded-xl border border-[#cfd7c2] bg-[#f7f5f0] px-4 text-sm outline-none transition focus:border-[#71803d] focus:ring-2 focus:ring-[#d5ec77]" /></div><div><label htmlFor="company" className="text-xs font-semibold tracking-[.12em] uppercase">Company</label><input id="company" name="company" required placeholder="Company name" className="mt-2 h-12 w-full rounded-xl border border-[#cfd7c2] bg-[#f7f5f0] px-4 text-sm outline-none transition focus:border-[#71803d] focus:ring-2 focus:ring-[#d5ec77]" /></div><div><label htmlFor="email" className="text-xs font-semibold tracking-[.12em] uppercase">Email</label><input id="email" name="email" required type="email" placeholder="you@company.com" className="mt-2 h-12 w-full rounded-xl border border-[#cfd7c2] bg-[#f7f5f0] px-4 text-sm outline-none transition focus:border-[#71803d] focus:ring-2 focus:ring-[#d5ec77]" /></div><div><label htmlFor="phone" className="text-xs font-semibold tracking-[.12em] uppercase">Phone</label><input id="phone" name="phone" required type="tel" placeholder="(555) 555-5555" className="mt-2 h-12 w-full rounded-xl border border-[#cfd7c2] bg-[#f7f5f0] px-4 text-sm outline-none transition focus:border-[#71803d] focus:ring-2 focus:ring-[#d5ec77]" /></div><div><label htmlFor="city" className="text-xs font-semibold tracking-[.12em] uppercase">Primary service area</label><input id="city" name="city" required placeholder="City, state / region" className="mt-2 h-12 w-full rounded-xl border border-[#cfd7c2] bg-[#f7f5f0] px-4 text-sm outline-none transition focus:border-[#71803d] focus:ring-2 focus:ring-[#d5ec77]" /></div><div><label htmlFor="trade" className="text-xs font-semibold tracking-[.12em] uppercase">Trade / specialties</label><input id="trade" name="trade" required placeholder="Roofing, siding, windows..." className="mt-2 h-12 w-full rounded-xl border border-[#cfd7c2] bg-[#f7f5f0] px-4 text-sm outline-none transition focus:border-[#71803d] focus:ring-2 focus:ring-[#d5ec77]" /></div><div><label htmlFor="capacity" className="text-xs font-semibold tracking-[.12em] uppercase">Current capacity</label><select id="capacity" name="capacity" defaultValue="" className="mt-2 h-12 w-full rounded-xl border border-[#cfd7c2] bg-[#f7f5f0] px-4 text-sm outline-none transition focus:border-[#71803d] focus:ring-2 focus:ring-[#d5ec77]"><option value="" disabled>Choose one</option><option>1 install per week</option><option>2–3 installs per week</option><option>4+ installs per week</option><option>Seasonal / project-based</option></select></div><div><label htmlFor="website" className="text-xs font-semibold tracking-[.12em] uppercase">Website or portfolio <span className="font-normal normal-case text-[#9b9990]">(optional)</span></label><input id="website" name="website" type="url" placeholder="https://" className="mt-2 h-12 w-full rounded-xl border border-[#cfd7c2] bg-[#f7f5f0] px-4 text-sm outline-none transition focus:border-[#71803d] focus:ring-2 focus:ring-[#d5ec77]" /></div><div className="sm:col-span-2"><label htmlFor="notes" className="text-xs font-semibold tracking-[.12em] uppercase">Tell us about the work you want more of</label><textarea id="notes" name="notes" placeholder="What kind of projects, neighborhoods, or partnership would be a great fit?" className="mt-2 min-h-32 w-full rounded-xl border border-[#cfd7c2] bg-[#f7f5f0] px-4 py-3 text-sm outline-none transition focus:border-[#71803d] focus:ring-2 focus:ring-[#d5ec77]" /></div>{error && <p className="text-sm text-red-700 sm:col-span-2">{error}</p>}<Button disabled={saving} type="submit" className="h-14 rounded-full bg-[#1d211d] text-white hover:bg-[#30382f] sm:col-span-2">{saving ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Wrench className="mr-2 size-4" />}Submit partner application</Button><p className="text-center text-xs leading-5 text-[#9b9990] sm:col-span-2">By submitting, you are asking LoveMeAfter to contact you about potential partnership opportunities. There is no obligation.</p></form>}</div></div></section>

      <footer className="border-t border-[#1d211d]/10 bg-[#ece9e0]"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 text-sm sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"><Link to="/" className="flex items-center gap-3 font-semibold"><span className="flex size-8 items-center justify-center rounded-full bg-[#1d211d] text-[#d5ec77]"><LogoMark className="size-4" /></span>LoveMeAfter</Link><p className="text-[#62695f]">A better standard for the people who build the home.</p><a href="tel:+14244260760" className="font-semibold text-[#71803d]">424 426 0760</a></div></footer>
    </main>
  );
}
