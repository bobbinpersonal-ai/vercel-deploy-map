import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, BadgeCheck, CalendarCheck, Check, ClipboardCheck, Heart, Phone, ShieldCheck, Users, Wrench } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

type Role = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  accent: string;
  stats: [string, string][];
  benefits: [typeof CalendarCheck, string, string][];
  fit: string[];
  steps: [string, string, string][];
  subject: string;
};

const ROLES: Record<string, Role> = {
  installers: {
    eyebrow: "Installers · field opportunity",
    title: "Build great work into the homes that need it.",
    intro: "Join a quality-first installation network for roofing, siding, windows, gutters, and exterior projects. Bring your trade skill; we bring organized scopes and homeowner demand.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=90",
    accent: "Installer partners",
    stats: [["2–3", "potential installs / week"], ["Clear", "job orders"], ["Paid", "by agreed milestones"]],
    benefits: [[Wrench, "Work you know", "Receive project opportunities matched to your trade, market, crew capacity, and schedule."], [ClipboardCheck, "Clear scope", "Review photos, access notes, materials, schedule windows, and completion expectations before you commit."], [ShieldCheck, "Quality network", "Grow your reputation through protected homes, clean jobsites, documented completion, and thoughtful walkthroughs."]],
    fit: ["Current insurance and any license or registration required for your trade and market", "A dependable crew with capacity for residential installations", "Comfort protecting the home, communicating changes, and owning the punch list", "Photos, references, and a track record of finishing the agreed scope"],
    steps: [["01", "Apply", "Tell us your trade, service area, crew size, and weekly capacity."], ["02", "Get verified", "We review credentials, references, portfolio work, and market fit."], ["03", "Review the job", "See the homeowner context, scope, photos, schedule, and payout milestones."], ["04", "Install well", "Complete the work, document it, and earn repeat opportunities through reliability."]],
    subject: "Installer partner application",
  },
  crew: {
    eyebrow: "Crews · grow your calendar",
    title: "A steadier pipeline for crews that finish strong.",
    intro: "LoveMeAfter helps established residential crews spend less time hunting for the next project and more time delivering the work they do best.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1800&q=90",
    accent: "Crew partners",
    stats: [["2–3", "potential installs / week"], ["17", "state coverage framework"], ["One", "organized handoff"]],
    benefits: [[Users, "Build your book", "Consistent, professional delivery can create repeat project opportunities and stronger local coverage."], [CalendarCheck, "Plan ahead", "Match jobs to your crew's capacity instead of taking every project that comes your way."], [BadgeCheck, "Be the trusted crew", "Stand out with communication, protection, completion photos, and a clean final walkthrough."]],
    fit: ["A lead installer or crew manager who can own the job from arrival to closeout", "Reliable transportation, tools, labor, and trade experience", "A commitment to respectful customer service and safe jobsites", "The ability to flag site conditions early instead of surprising the homeowner later"],
    steps: [["01", "Introduce your crew", "Share your project types, coverage area, availability, and capacity."], ["02", "Align on standards", "Review how we scope, schedule, document, and close out residential work."], ["03", "Accept a match", "Take only the projects that fit your people, trade, and calendar."], ["04", "Earn the next call", "Strong completion and communication lead to more trust and more opportunity."]],
    subject: "Crew partner application",
  },
  "door-knockers": {
    eyebrow: "Neighborhood outreach · entry point",
    title: "Open the door to a real sales career.",
    intro: "Start conversations in neighborhoods where homeowners may need help, qualify interest respectfully, and create opportunities for our appointment and sales teams.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90",
    accent: "Door-to-door team",
    stats: [["Paid", "training and coaching"], ["Qualified", "appointments"], ["Clear", "bonus path"]],
    benefits: [[Users, "Learn the craft", "Build confidence with scripts, product education, field coaching, and a team that helps you improve."], [CalendarCheck, "Set real appointments", "Your conversations feed a structured scheduling process, not a mystery handoff."], [BadgeCheck, "Earn on quality", "Bonuses can be tied to qualified appointments and completed outcomes, according to the role plan."]],
    fit: ["You are comfortable starting friendly, brief conversations with homeowners", "You are consistent, coachable, punctual, and respectful of every neighborhood", "You can use a phone or CRM workflow to record interest accurately", "You want a field role that can grow into appointment setting or in-home sales"],
    steps: [["01", "Train", "Learn the conversation, project basics, compliance boundaries, and how to use the lead workflow."], ["02", "Work a territory", "Visit assigned neighborhoods with clear expectations and field support."], ["03", "Qualify interest", "Capture homeowner needs accurately and schedule the right next step."], ["04", "Grow", "Move toward appointment setting, partnership outreach, or sales as you build results."]],
    subject: "Door knocker application",
  },
  "inside-sales-dispatch": {
    eyebrow: "Remote operations · inside sales & dispatch",
    title: "Keep the conversation, calendar, and crew connected.",
    intro: "Help homeowners take the next step, coordinate qualified appointments, and keep field representatives and installation partners informed from a comfortable remote workspace.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1800&q=90",
    accent: "Inside sales & dispatch",
    stats: [["3–4", "quality appointments / day"], ["Human", "calls and follow-up"], ["Remote", "operations role"]],
    benefits: [[Phone, "Human conversations", "Talk with real people, understand what they need, and follow up clearly without pressure or automated cold scripts."], [CalendarCheck, "Own the handoff", "Schedule qualified appointments, confirm the details, and keep the field representative informed before the visit."], [BadgeCheck, "See the outcome", "Our CRM is designed to connect appointment, dispatch, project, and closeout activity so you spend less time on duplicate admin work."]],
    fit: ["You communicate clearly in English and can build trust over the phone", "You are organized enough to manage follow-up, appointment details, and changing schedules", "You can work toward a target of approximately 3–4 quality appointments per day without sacrificing fit", "You are comfortable coordinating across time zones, field reps, installation partners, and homeowners"],
    steps: [["01", "Learn the workflow", "Get familiar with services, qualification standards, appointment notes, and dispatch expectations."], ["02", "Talk with homeowners", "Use a human, respectful approach to understand interest and schedule the right next step."], ["03", "Coordinate the field", "Confirm the visit, share accurate context, and keep field representatives updated."], ["04", "Grow with results", "Compensation may include hourly or project-based pay, appointment incentives, close bonuses, and documented spiffs depending on role and location." ]],
    subject: "Inside sales and dispatch application",
  },
  partnerships: {
    eyebrow: "Partnership specialists · business development",
    title: "Build relationships that keep working.",
    intro: "Create local referral partnerships with businesses that already serve homeowners, while helping our phone team turn inbound opportunities into well-run appointments.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=90",
    accent: "Partnership specialists",
    stats: [["Build", "a referral book"], ["Earn", "on qualified outcomes"], ["Support", "appointment setting"]],
    benefits: [[Users, "Build a book of business", "Develop durable relationships with real estate professionals, property managers, insurance contacts, and complementary local businesses."], [BadgeCheck, "Recurring referral upside", "Eligible referral arrangements may provide a kickback or bonus on qualified, completed business under a documented partner agreement."], [Phone, "Own the follow-through", "Partnership outreach and phone appointment setting work together, so you can develop relationships and help the calendar stay full."]],
    fit: ["You are organized, personable, and comfortable asking a business for an introduction", "You can explain our services honestly without promising outcomes we cannot control", "You will track contacts, follow-ups, referral source, appointment status, and next steps", "You enjoy both relationship-building and structured phone conversations"],
    steps: [["01", "Map your network", "Identify businesses and professionals who already have homeowner trust."], ["02", "Make the introduction", "Present a simple, compliant referral partnership and document the agreed terms."], ["03", "Set and support appointments", "Work phone leads and partner referrals into a clean scheduling process."], ["04", "Grow the book", "Track completed outcomes, nurture partners, and earn eligible bonuses or referral compensation under the partner plan."]],
    subject: "Partnership specialist application",
  },
};

export default function CareerRole() {
  const { role } = useParams();
  const navigate = useNavigate();
  const content = role ? ROLES[role] : undefined;

  useEffect(() => {
    if (content) document.title = `${content.accent} | LoveMeAfter`;
  }, [content]);

  if (!content) {
    return <main className="flex min-h-screen items-center justify-center bg-[#f7f5f0] p-6 text-center"><div><p className="text-3xl font-semibold">Role not found</p><Button onClick={() => navigate("/careers")} className="mt-5 rounded-full">View all careers</Button></div></main>;
  }

  return <main className="min-h-screen bg-[#f7f5f0] text-[#1d211d]">
    <header className="bg-[#182019] text-white"><nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10"><Link to="/" className="flex items-center gap-3 font-semibold"><span className="flex size-10 items-center justify-center rounded-full bg-black text-white"><Heart className="size-5 fill-current" /></span>LoveMeAfter</Link><div className="flex items-center gap-4"><a href="tel:+14244260760" className="hidden items-center gap-2 text-sm text-white/75 sm:flex"><Phone className="size-4" /> 424 426 0760</a><Button onClick={() => navigate("/careers")} variant="ghost" className="text-white hover:bg-white/10 hover:text-white"><ArrowLeft className="mr-2 size-4" /> All careers</Button></div></nav></header>
    <section className="bg-[#182019] text-white"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_.82fr] lg:items-center lg:px-10 lg:py-28"><div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">{content.eyebrow}</p><h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-7xl">{content.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-white/70">{content.intro}</p><div className="mt-9 flex flex-wrap gap-3"><a href={`mailto:hello@lovemeafter.com?subject=${encodeURIComponent(content.subject)}`} className="flex h-14 items-center rounded-full bg-[#d5ec77] px-7 font-semibold text-[#1d211d] hover:bg-[#e1f895]">Apply for this role <ArrowUpRight className="ml-2 size-5" /></a><Link to="/careers" className="flex h-14 items-center rounded-full border border-white/25 px-6 text-sm hover:bg-white/10">Compare roles</Link></div></div><div className="overflow-hidden rounded-3xl bg-[#263227]"><div className="h-60 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(24,32,25,.55)), url(${content.image})` }} /><div className="grid grid-cols-3 gap-3 p-6 text-center">{content.stats.map(([value, label]) => <div key={label}><p className="text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-white/55">{label}</p></div>)}</div></div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"><div className="mb-12 max-w-2xl"><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">The role in practice</p><h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">Make every handoff feel human.</h2><p className="mt-5 text-lg leading-8 text-[#62695f]">The strongest inside sales and dispatch representatives bring calm follow-through to every conversation: they listen carefully, set the right expectation, and make sure the next person has the information to do their job well.</p></div><div className="grid gap-4 md:grid-cols-3">{content.benefits.map(([Icon, title, copy]) => <div key={title} className="rounded-2xl border border-[#1d211d]/10 bg-white p-7"><Icon className="size-6 text-[#71803d]" /><h2 className="mt-10 text-2xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-[#62695f]">{copy}</p></div>)}</div></section>
    <section className="border-y border-[#1d211d]/10 bg-[#ece9e0]"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-28"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Who succeeds here</p><h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">Good work starts with good judgment.</h2><p className="mt-6 text-lg leading-8 text-[#62695f]">The role and compensation structure vary by position, market, experience, and completed outcomes. We explain the expectations and eligible bonuses before you start.</p></div><ul className="space-y-4">{content.fit.map((item) => <li key={item} className="flex gap-3 border-t border-[#1d211d]/15 pt-4 text-sm leading-6"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-[#71803d]" />{item}</li>)}</ul></div></section>
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"><div className="flex items-end justify-between gap-5"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">The path</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.055em] sm:text-6xl">A clear start, then room to grow.</h2></div><Heart className="hidden size-9 fill-[#d5ec77] text-[#71803d] sm:block" /></div><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{content.steps.map(([number, title, copy]) => <div key={number} className="border-t-2 border-[#1d211d]/15 pt-5"><p className="text-sm font-semibold text-[#71803d]">{number}</p><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#62695f]">{copy}</p></div>)}</div></section>
    <section className="bg-[#d5ec77]"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-10"><div><p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Ready to talk?</p><h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-.055em] sm:text-5xl">Bring your energy. We'll explain the next step.</h2></div><a href={`mailto:hello@lovemeafter.com?subject=${encodeURIComponent(content.subject)}`} className="flex h-14 shrink-0 items-center justify-center rounded-full bg-[#1d211d] px-7 font-semibold text-white hover:bg-[#30382f]">Start an application <ArrowUpRight className="ml-2 size-5" /></a></div></section>
    <footer className="bg-[#182019] py-10 text-white"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm sm:flex-row sm:justify-between sm:px-8 lg:px-10"><Link to="/careers" className="flex items-center gap-2"><Heart className="size-4 fill-[#d5ec77] text-[#d5ec77]" /> Career opportunities</Link><a href="mailto:hello@lovemeafter.com" className="text-[#d5ec77]">hello@lovemeafter.com</a></div></footer>
  </main>;
}
