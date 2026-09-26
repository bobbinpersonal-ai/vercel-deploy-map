import { ArrowLeft, ArrowUpRight, BadgeCheck, Heart, HardHat, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { usePageMeta } from "@/components/PageMeta";
import { CareerArtwork } from "@/components/CareerArtwork";
import { JOB_OPENINGS } from "@/data/job-openings";

export default function Careers() {
  const navigate = useNavigate();
  usePageMeta(
    "Construction & Operations Jobs | LoveMeAfter",
    "Join LoveMeAfter’s growing in-house construction team: field trades at $22–$28/hour, a residential construction manager targeting $90,000, plus project, permitting, billing, marketing, and B2B roles.",
  );

  const groups = ["Field team", "Project operations", "Growth & partnerships"] as const;

  return (
    <main className="min-h-screen bg-[#1b141d] text-white">
      <header className="border-b border-white/10 bg-[#171119]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3 font-semibold"><span className="flex size-10 items-center justify-center rounded-full border border-[#ef8eb4]/30 bg-[#ef8eb4]/10 text-[#ffc6dc]"><Heart className="size-5 fill-current" /></span>LoveMeAfter</Link>
          <div className="flex items-center gap-3"><a href="tel:+14244260760" className="hidden items-center gap-2 text-sm text-white/75 sm:flex"><Phone className="size-4" /> 424 426 0760</a><button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"><ArrowLeft className="size-4" /> Back home</button></div>
        </nav>
      </header>

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_76%_18%,rgba(239,142,180,.17),transparent_38%),linear-gradient(130deg,#211824_0%,#1b141d_60%,#2d202e_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-10 lg:py-28">
          <div><p className="text-xs font-bold tracking-[.2em] text-[#ffc6dc] uppercase">Join the team building better home projects</p><h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[.94] tracking-[-.055em] sm:text-7xl">Good work should have a place to grow.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">We’re actively hiring builders and construction leadership to bring more field skill, project ownership, and homeowner care into one accountable LoveMeAfter team.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#openings" className="inline-flex h-12 items-center rounded-full bg-[#ef8eb4] px-6 py-3 text-sm font-bold text-[#24131d] transition hover:bg-[#f6b0ca]">Explore current openings <ArrowUpRight className="ml-2 size-4" /></a><a href="mailto:hello@lovemeafter.com?subject=LoveMeAfter career question" className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10">Ask about a role</a></div><div className="mt-8 flex flex-wrap gap-2">{["Field roles · $22–$28/hour", "Construction Manager · $90k target", "Growing in-house project capacity"].map((item) => <span key={item} className="rounded-full border border-white/15 bg-white/[.04] px-3 py-1.5 text-xs font-medium text-white/75">{item}</span>)}</div></div>
          <div className="overflow-hidden rounded-3xl border border-white/10"><CareerArtwork title="Craft that homeowners can feel." label="Built by the people who care" icon={HardHat} /><div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/[.04] text-center"><div className="p-4"><p className="text-lg font-semibold">Field</p><p className="mt-1 text-[11px] text-white/60">craft + care</p></div><div className="p-4"><p className="text-lg font-semibold">Systems</p><p className="mt-1 text-[11px] text-white/60">clear ownership</p></div><div className="p-4"><p className="text-lg font-semibold">Growth</p><p className="mt-1 text-[11px] text-white/60">lasting team</p></div></div></div></div></section>

      <section id="openings" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-3xl"><p className="text-xs font-bold tracking-[.18em] text-[#ffc6dc] uppercase">Current opportunities</p><h2 className="mt-4 font-serif text-4xl tracking-[-.045em] sm:text-6xl">Build the team behind the promise.</h2><p className="mt-5 text-base leading-7 text-white/70">Listed compensation is a target for the role, not a guaranteed offer. Final pay depends on experience, market, role scope, and any written incentive terms.</p></div>
        <div className="mt-12 space-y-16">
          {groups.map((group) => (
            <div key={group}>
              <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4"><h3 className="text-sm font-bold tracking-[.16em] text-[#ffc6dc] uppercase">{group}</h3><span className="text-xs text-white/55">{JOB_OPENINGS.filter((job) => job.group === group).length} openings</span></div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {JOB_OPENINGS.filter((job) => job.group === group).map((job) => {
                  const Icon = job.icon;
                  return <Link key={job.slug} to={`/careers/roles/${job.slug}`} className="group grid overflow-hidden rounded-3xl border border-white/10 bg-[#241c27] transition hover:-translate-y-1 hover:border-[#ef8eb4]/40 hover:shadow-[0_24px_70px_rgba(0,0,0,.28)] sm:grid-cols-[.75fr_1.25fr]"><CareerArtwork compact title={job.title} label={job.group} icon={Icon} /><div className="flex flex-col justify-between p-6 sm:p-8"><div><div className="flex items-start justify-between gap-3"><span className="rounded-full border border-[#ef8eb4]/30 bg-[#ef8eb4]/10 px-3 py-1 text-[10px] font-bold tracking-[.1em] text-[#ffc6dc] uppercase">{job.employment}</span><span className="text-right text-sm font-bold text-white">{job.pay}</span></div><h4 className="mt-6 text-2xl font-semibold leading-tight tracking-[-.03em]">{job.title}</h4><p className="mt-3 text-sm leading-6 text-white/70">{job.summary}</p></div><span className="mt-7 inline-flex items-center text-sm font-semibold text-[#ffc6dc]">Role details &amp; how to apply <ArrowUpRight className="ml-2 size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></div></Link>;
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-3xl border border-[#ef8eb4]/20 bg-[#ef8eb4]/[.07] p-6 sm:p-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold tracking-[.15em] text-[#ffc6dc] uppercase">The standard we’re building</p><h3 className="mt-2 text-2xl font-semibold">Careful work. Clear ownership. Respect for the home.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">We’re building the team homeowners want to see: skilled tradespeople, a construction manager, and the project operations that keep a home improvement accountable. Field roles target $22–$28/hour; the Residential Construction Manager targets $90,000 annually. Listed pay is a target, not a guaranteed offer, and depends on experience, scope, market, and written terms. Required credentials are matched to the work and local requirements.</p></div><BadgeCheck className="hidden size-10 shrink-0 text-[#ffc6dc] sm:block" /></div></div>
      </section>

      <footer className="border-t border-white/10 bg-[#171119] py-9"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><Link to="/" className="font-semibold text-white">LoveMeAfter</Link><span>Field · operations · growth</span><a href="mailto:careers@lovemeafter.com" className="text-[#ffc6dc]">careers@lovemeafter.com</a></div></footer>
    </main>
  );
}
