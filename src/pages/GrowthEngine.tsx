import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  DollarSign,
  FileText,
  HardHat,
  Megaphone,
  Phone,
  PlayCircle,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const LANES = [
  { title: "Marketing & content", owner: "Marketing lead", icon: Megaphone, color: "#d5ec77", job: "Create useful attention every day.", actions: ["Publish homeowner education, damage explainers, project visuals, and team stories.", "Turn every completed job into a documented before/after, short video, review request, and guide.", "Track source, market, topic, and call-to-action on every post."], metrics: "Posts published · qualified visits · estimate starts · cost per lead" },
  { title: "Inside sales", owner: "Appointment lead", icon: Phone, color: "#b7d0a0", job: "Turn interest into a kept appointment.", actions: ["Call new leads immediately during coverage hours and make the first conversation useful.", "Confirm project, address, timing, decision makers, service area, and appointment expectations.", "Log every call, outcome, objection, and next step in the CRM before moving on."], metrics: "Speed to lead · contact rate · booked rate · show rate" },
  { title: "Outside sales", owner: "Market sales lead", icon: Target, color: "#e8c58b", job: "Turn a real need into a clear decision.", actions: ["Inspect conditions, photograph evidence, measure accurately, and separate urgent from optional work.", "Present good/better/best options with scope, timeline, exclusions, financing path, and next owner.", "Never promise insurance coverage, waive deductibles, or hide a change order."], metrics: "Held appointments · close rate · average sold value · gross margin" },
  { title: "Operations & dispatch", owner: "Operations lead", icon: ClipboardCheck, color: "#a9cee0", job: "Make the promise executable.", actions: ["Confirm materials, permits, crew fit, access, schedule, homeowner expectations, and weather risk.", "Own the handoff from signed scope to production and escalate issues before the homeowner discovers them.", "Close every job with photos, punch list, final walkthrough, warranty record, and review request."], metrics: "Time to schedule · on-time start · change orders · callback rate" },
  { title: "Installers & partners", owner: "Partner network lead", icon: HardHat, color: "#d9a4a4", job: "Deliver the work and protect the reputation.", actions: ["Use the written scope, protect the property, communicate daily, and document hidden conditions.", "Price labor and capacity honestly; do not accept work that cannot meet the quality standard.", "Earn more responsibility through clean closeouts, low callbacks, and consistent customer communication."], metrics: "Production days · labor variance · defects · reviews · partner retention" },
  { title: "B2B partnerships", owner: "Partnerships lead", icon: Users, color: "#c9b8df", job: "Build repeatable referral channels.", actions: ["Create referral agreements and handoff rules for realtors, property managers, adjusters, suppliers, and local businesses.", "Give partners a clear service menu, market coverage, response promise, and status update path.", "Review partner-sourced opportunities monthly and reward quality, not just volume."], metrics: "Active partners · referred leads · partner close rate · repeat referrals" },
];

const CONTENT_PILLARS = [
  ["Homeowner education", "Repair vs. replace, project economics, resale value, maintenance, financing, and what good work looks like.", "Homeowner", "Guide → estimate"],
  ["Field proof", "Real workers, real conditions, real materials, progress photos, damage documentation, and clean closeouts.", "Homeowner + partner", "Project guide → call"],
  ["Project visualizer", "Interactive house zones, product close-ups, before/after stories, cost ranges, timelines, and scope diagrams.", "Visual learner", "Explore → service page"],
  ["Career pathway", "Inside sales, outside sales, installers, partner economics, day-in-the-life stories, and road-to-$100k planning.", "Team candidate", "Role page → apply"],
  ["Trust & standards", "Insurance questions, warranties, permits, change orders, inspection checklists, and how we handle problems.", "Skeptical buyer", "Conditions → estimate"],
  ["Market presence", "State and city coverage, local weather risks, neighborhood project patterns, and partner spotlights.", "Local buyer + B2B", "Area page → contact"],
];

const WEEK = [
  ["Monday", "Market intelligence", "Publish one homeowner guide tied to weather, season, or a common repair question. Sales reviews last week’s objections."],
  ["Tuesday", "Field proof", "Post a real condition, worker, material, or jobsite story. Ask the crew for three photos and one lesson."],
  ["Wednesday", "Project visual", "Publish an interactive zone, product carousel, cost/timeline graphic, or before/after with a clear disclaimer."],
  ["Thursday", "Career & partner", "Post a team story, contractor opportunity, referral partner education, or role-specific day in the life."],
  ["Friday", "Trust signal", "Share a review, closeout, warranty explanation, safety practice, or ‘what we would never do’ standard."],
  ["Saturday", "Local proof", "Feature a market, neighborhood project type, seasonal checklist, or community relationship."],
  ["Sunday", "Measure & reset", "Review source, calls, shows, sales, margin, content saves, and next week’s production queue."],
];

const PIPELINE = [
  ["New", "Every inbound lead is visible, sourced, assigned, and timestamped.", "Marketing / intake", "Same business hour"],
  ["Contacted", "The team attempted contact and recorded the outcome, not just a status click.", "Inside sales", "Same day"],
  ["Qualified", "Service area, project, timing, decision makers, and fit are confirmed.", "Inside sales", "Before booking"],
  ["Appointment set", "The homeowner knows who is coming, why, when, and what to prepare.", "Appointment desk", "24h confirmation"],
  ["Held / inspected", "Evidence, measurements, photos, needs, risks, and options are documented.", "Outside sales", "Visit day"],
  ["Quoted", "Written scope, price, exclusions, financing path, and next step are delivered.", "Outside sales", "48h target"],
  ["Won / scheduled", "Signed scope is handed to operations with no missing context.", "Sales + operations", "Same day"],
  ["Completed / referred", "Closeout, warranty, review, referral, and content capture are complete.", "Crew + customer care", "7 days after"],
];

const LAUNCH = [
  ["Foundation", "Domain, Cloudflare deployment, forms, phone routing, analytics, legal disclaimers, service areas, and team access."],
  ["Offer", "Define the free assessment promise, realistic follow-up expectations, service boundaries, warranty language, and financing disclosure."],
  ["People", "Assign one owner and backup for marketing, intake, sales, operations, installer network, partnerships, and customer care."],
  ["Proof", "Collect permissioned project photos, worker stories, reviews, licenses/insurance process, and five market-specific examples."],
  ["Process", "Publish the lead SLA, call script, inspection checklist, estimate template, sales handoff, production handoff, and closeout checklist."],
  ["Measurement", "Create one scoreboard for source, lead speed, contact, show, close, sold value, margin, cycle time, reviews, and referrals."],
  ["Launch rhythm", "Start with one market and one repeatable offer, review every Friday, then expand only when the handoff is stable."],
];

export default function GrowthEngine() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#151b16] text-[#f7f5f0] selection:bg-[#d5ec77] selection:text-[#182019]">
      <header className={`sticky top-0 z-20 border-b bg-[#151b16] transition-shadow duration-300 ${scrolled ? "border-[#d5ec77]/30 shadow-[0_12px_40px_rgba(0,0,0,.35)]" : "border-white/10"}`}>
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#d5ec77] text-[#182019]"><BarChart3 className="size-5" /></span>
            <div><p className="text-sm font-semibold tracking-[.14em] uppercase">LoveMeAfter</p><p className="text-[10px] tracking-[.16em] text-white/58 uppercase">Growth engine · internal playbook</p></div>
          </div>
          <Link to="/admin" className="flex items-center gap-2 text-xs text-white/78 hover:text-white"><ArrowLeft className="size-4" /> Admin console</Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">The operating system</p><h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-[.9] tracking-[-.07em] sm:text-7xl">Turn attention into trusted work—and trusted work into a durable company.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-white/78">This is the shared map for the team: what we publish, who responds, how a homeowner moves through the system, how a crew receives the promise, and which numbers tell us whether the engine is healthy.</p></div>
          <div className="border border-[#d5ec77]/25 bg-[#d5ec77] p-7 text-[#182019] sm:p-9"><Target className="size-7" /><p className="mt-8 text-xs font-semibold tracking-[.16em] uppercase">North-star outcome</p><p className="mt-3 text-3xl font-semibold tracking-[-.05em]">A homeowner never wonders what happens next.</p><p className="mt-4 text-sm leading-6 text-[#4b583d]">Every stage has an owner, a response standard, a written record, and a clean handoff.</p></div>
        </section>

        <section className="mt-14"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">One machine · six lanes</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Everyone owns a part of the promise.</h2></div><p className="max-w-md text-sm leading-6 text-white/68">One person may wear multiple hats at first. The ownership still needs to be explicit.</p></div><div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{LANES.map(({ title, owner, icon: Icon, color, job, actions, metrics }) => <article key={title} className="border border-white/10 bg-[#202a20] p-6 transition hover:border-white/25"><div className="flex items-start justify-between gap-4"><span className="flex size-10 items-center justify-center rounded-xl" style={{ backgroundColor: color, color: "#182019" }}><Icon className="size-5" /></span><span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/62">{owner}</span></div><h3 className="mt-6 text-xl font-semibold">{title}</h3><p className="mt-2 text-sm font-medium text-[#d5ec77]">{job}</p><ul className="mt-5 space-y-3 text-sm leading-6 text-white/72">{actions.map((action) => <li key={action} className="flex gap-2"><Check className="mt-1 size-3.5 shrink-0 text-[#d5ec77]" />{action}</li>)}</ul><p className="mt-6 border-t border-white/10 pt-4 text-[10px] font-semibold tracking-[.14em] text-white/52 uppercase">Scoreboard · {metrics}</p></article>)}</div></section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">The content engine</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Never ask, “What should we post?” again.</h2><p className="mt-5 text-base leading-7 text-white/72">Capture from real work, organize it into a pillar, attach one audience and one next action, then measure what happened.</p><div className="mt-7 rounded-2xl border border-[#d5ec77]/25 bg-[#d5ec77] p-6 text-[#182019]"><FileText className="size-6" /><p className="mt-5 text-xl font-semibold">The production rule</p><p className="mt-2 text-sm leading-6 text-[#4b583d]">One job can produce: one guide, three short videos, five photos, one worker story, one homeowner FAQ, one review request, and one partner update.</p></div></div><div className="grid gap-3 sm:grid-cols-2">{CONTENT_PILLARS.map(([title, copy, audience, cta]) => <article key={title} className="border border-white/10 bg-[#202a20] p-5"><p className="text-[10px] font-semibold tracking-[.14em] text-[#d5ec77] uppercase">{audience} · {cta}</p><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/72">{copy}</p></article>)}</div></section>

        <section className="mt-16"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">Posting rhythm</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">A week the team can actually execute.</h2></div><CalendarDays className="hidden size-8 text-[#d5ec77] sm:block" /></div><div className="mt-8 overflow-hidden border border-white/10"><div className="hidden grid-cols-[150px_180px_1fr] border-b border-white/10 bg-[#202a20] px-5 py-3 text-[10px] font-semibold tracking-[.15em] text-white/52 uppercase sm:grid"><span>Day</span><span>Theme</span><span>Execution</span></div>{WEEK.map(([day, theme, copy]) => <div key={day} className="grid gap-2 border-b border-white/10 px-5 py-5 last:border-0 sm:grid-cols-[150px_180px_1fr] sm:gap-4"><span className="font-semibold text-[#d5ec77]">{day}</span><span className="text-sm font-medium">{theme}</span><span className="text-sm leading-6 text-white/72">{copy}</span></div>)}</div></section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-start"><div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">Lead-to-job pipeline</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">The handoff is the product.</h2><div className="mt-8 space-y-2">{PIPELINE.map(([stage, definition, owner, standard], index) => <div key={stage} className="grid gap-3 border border-white/10 bg-[#202a20] p-4 sm:grid-cols-[32px_150px_1fr_145px] sm:items-center"><span className="flex size-7 items-center justify-center rounded-full bg-[#d5ec77] text-xs font-bold text-[#182019]">{index + 1}</span><span className="font-semibold">{stage}</span><span className="text-sm leading-6 text-white/72">{definition}</span><span className="text-xs text-white/58"><strong className="font-medium text-white/65">{owner}</strong><br />{standard}</span></div>)}</div></div><div className="border border-white/10 bg-[#202a20] p-7"><Wrench className="size-6 text-[#d5ec77]" /><p className="mt-6 text-xs font-semibold tracking-[.16em] text-[#d5ec77] uppercase">Non-negotiables</p><ul className="mt-5 space-y-4 text-sm leading-6 text-white/78">{["Every lead has a source and next step.", "Every appointment has an owner and confirmation.", "Every quote has scope, exclusions, timing, and financing disclosure.", "Every job has a photo record before, during, and after.", "Every completed job gets a review and referral ask.", "Every promise that changes gets documented before production changes."].map((item) => <li key={item} className="flex gap-3"><ShieldCheck className="mt-1 size-4 shrink-0 text-[#d5ec77]" />{item}</li>)}</ul></div></section>

        <section className="mt-16 border border-[#d5ec77]/25 bg-[#d5ec77] p-7 text-[#182019] sm:p-10"><div className="flex items-start gap-4"><DollarSign className="mt-1 size-7 shrink-0" /><div><p className="text-xs font-semibold tracking-[.16em] uppercase">Weekly scoreboard</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Measure the chain, not just the revenue.</h2><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[["Demand", "Qualified leads by source and market"], ["Response", "Speed to lead, contact rate, booked rate"], ["Sales", "Show rate, close rate, sold value, margin"], ["Delivery", "On-time start, callbacks, reviews, referrals"]].map(([label, copy]) => <div key={label} className="border-t border-[#182019]/20 pt-3"><p className="font-semibold">{label}</p><p className="mt-1 text-sm leading-5 text-[#4b583d]">{copy}</p></div>)}</div><p className="mt-8 text-sm leading-6 text-[#4b583d]">Set targets only after two weeks of baseline data. Do not optimize for cheap leads if they create missed appointments, low-margin work, or unhappy homeowners.</p></div></div></section>

        <section className="mt-16"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">Launch readiness</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">The checklist before turning up the volume.</h2></div><PlayCircle className="hidden size-8 text-[#d5ec77] sm:block" /></div><div className="mt-8 grid gap-3 md:grid-cols-2">{LAUNCH.map(([title, copy], index) => <article key={title} className="flex gap-4 border border-white/10 bg-[#202a20] p-5"><span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#d5ec77]/50 text-xs font-semibold text-[#d5ec77]">{index + 1}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/72">{copy}</p></div></article>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link to="/admin/workspace" className="inline-flex items-center rounded-full bg-[#d5ec77] px-5 py-3 text-sm font-semibold text-[#182019]">Open workspace <ArrowLeft className="ml-2 size-4 rotate-180" /></Link><Link to="/admin/internal-preview" className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">Open sales playbook <BookOpen className="ml-2 size-4" /></Link></div></section>
      </div>
    </main>
  );
}
