import { useState } from "react";
import { ArrowUpRight, BadgeDollarSign, ClipboardCheck, HardHat, Home, Phone, ShieldCheck, Target } from "lucide-react";
import { Link } from "react-router";

type Audience = "homeowner" | "installer" | "sales" | "appointments";

const AUDIENCES: { id: Audience; label: string; icon: typeof Home }[] = [
  { id: "homeowner", label: "For homeowners", icon: Home },
  { id: "installer", label: "For installers", icon: HardHat },
  { id: "sales", label: "For sales teams", icon: Target },
  { id: "appointments", label: "For appointment teams", icon: Phone },
];

const TOPICS: Record<Audience, { eyebrow: string; title: string; summary: string; points: [typeof ShieldCheck, string, string][]; action: string; href: string }> = {
  homeowner: {
    eyebrow: "Topic of the moment · exterior upgrades",
    title: "The best upgrade protects, performs, and makes the home feel better.",
    summary: "A smart project starts with the problem behind the project. Roofing, siding, windows, gutters, shade, and insulation often work as one system—not separate purchases.",
    points: [[ShieldCheck, "Start with water and safety", "Solve leaks, rot, unsafe access, and active damage before choosing colors or finishes."], [ClipboardCheck, "Compare the whole scope", "Ask about prep, flashing, disposal, permits, warranty, cleanup, and what happens if the crew finds a hidden condition."], [BadgeDollarSign, "Think in total value", "Comfort, lower maintenance, reduced damage risk, curb appeal, and useful life all matter alongside the invoice."]],
    action: "Plan a project with an advisor",
    href: "/#estimate-form",
  },
  installer: {
    eyebrow: "Topic of the moment · profitable installs",
    title: "Profit is won before the first tool comes out of the truck.",
    summary: "The highest-performing crews protect margin through accurate scope review, material readiness, access planning, clean communication, and a closeout the homeowner can feel.",
    points: [[HardHat, "Scope before schedule", "Clarify quantities, substrate, flashing, access, disposal, permits, and change-order rules before accepting the calendar slot."], [BadgeDollarSign, "Measure the real job", "A productive install is not only labor hours. Track mobilization, protection, callbacks, punch-list time, and material waste."], [ShieldCheck, "Earn the next job", "Completion photos, a clean site, and a confident walkthrough turn a single install into repeat opportunity and referrals."]],
    action: "Explore partner opportunities",
    href: "/contractors",
  },
  sales: {
    eyebrow: "Topic of the moment · consultative selling",
    title: "The fastest close is usually the clearest conversation.",
    summary: "Homeowners do not need a performance. They need someone who can translate a complicated project into a prioritized recommendation, a written scope, and a decision they can defend.",
    points: [[Target, "Diagnose before presenting", "Ask what changed, what worries them, what outcome matters, and what timing or budget constraint is real."], [ClipboardCheck, "Sell the scope, not the fear", "Show the evidence, separate urgent work from optional work, and explain what is included in plain language."], [BadgeDollarSign, "Protect the handoff", "A deal is not healthy if the crew is surprised. Accurate notes, photos, expectations, and financing disclosures protect close rate and margin."]],
    action: "See sales and career paths",
    href: "/careers",
  },
  appointments: {
    eyebrow: "Topic of the moment · appointment quality",
    title: "A great appointment starts with a great question.",
    summary: "The job of an appointment team is not to fill a calendar at any cost. It is to find the right homeowner, the right project, the right timing, and the right next step.",
    points: [[Phone, "Qualify for fit", "Confirm address, project type, decision makers, urgency, service area, and what the homeowner wants to accomplish."], [ClipboardCheck, "Give the field team context", "A concise note with photos, concerns, access information, and expectations makes the appointment feel professional before arrival."], [ShieldCheck, "Respect the no", "Trust compounds. Honest qualification creates better show rates, better conversations, and a brand homeowners recommend."]],
    action: "Explore appointment careers",
    href: "/careers/roles/inside-sales-dispatch",
  },
};

export function ExpertTopic({ compact = false }: { compact?: boolean }) {
  const [audience, setAudience] = useState<Audience>("homeowner");
  const topic = TOPICS[audience];

  return <section className={`border-y border-[#1d211d]/10 bg-[#eaf0d0] ${compact ? "py-14" : "py-20 sm:py-28"}`}><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start"><div><p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">{topic.eyebrow}</p><h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl">{topic.title}</h2><p className="mt-6 max-w-xl text-base leading-7 text-[#596357]">{topic.summary}</p><Link to={topic.href} className="mt-8 inline-flex items-center text-sm font-semibold text-[#71803d]">{topic.action} <ArrowUpRight className="ml-2 size-4" /></Link></div><div><div className="flex flex-wrap gap-2 border-b border-[#1d211d]/15 pb-5">{AUDIENCES.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setAudience(id)} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${audience === id ? "border-[#1d211d] bg-[#1d211d] text-white" : "border-[#1d211d]/15 bg-white/60 text-[#596357] hover:border-[#71803d]"}`}><Icon className="size-3.5" />{label}</button>)}</div><div className="mt-6 grid gap-4 md:grid-cols-3">{topic.points.map(([Icon, title, copy]) => <article key={title} className="bg-white/80 p-6"><Icon className="size-5 text-[#71803d]" /><h3 className="mt-8 text-lg font-semibold tracking-[-.02em]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#62695f]">{copy}</p></article>)}</div></div></div></div></section>;
}
