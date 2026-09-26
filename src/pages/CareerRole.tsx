import { ArrowLeft, ArrowUpRight, BadgeCheck, Check, Phone } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { clip, usePageMeta } from "@/components/PageMeta";
import { CareerArtwork } from "@/components/CareerArtwork";
import { JOB_OPENINGS } from "@/data/job-openings";

const OTHER_ROLES: Record<string, { title: string; summary: string; icon: typeof BadgeCheck }> = {
  "outside-sales": { title: "Outside Sales", summary: "Build respectful neighborhood and referral relationships, qualify homeowner needs, and create a clear next step for the right team member.", icon: BadgeCheck },
  "inside-sales-dispatch": { title: "Inside Sales & Dispatch", summary: "Listen to homeowners, qualify the project, schedule a useful visit, and keep details connected between the customer and field team.", icon: Phone },
  "design-consultants": { title: "Design Consultant", summary: "Translate how a homeowner lives in the space into a design direction that can be built, budgeted, and clearly scoped.", icon: BadgeCheck },
  partnerships: { title: "B2B Partnerships", summary: "Develop transparent referral and relationship channels with businesses that already serve homeowners.", icon: BadgeCheck },
};

export default function CareerRole() {
  const { role } = useParams();
  const navigate = useNavigate();
  const opening = role ? JOB_OPENINGS.find((item) => item.slug === role) : undefined;
  const otherRole = role ? OTHER_ROLES[role] : undefined;
  const title = opening?.title ?? otherRole?.title;
  const summary = opening?.summary ?? otherRole?.summary;
  const Icon = opening?.icon ?? otherRole?.icon ?? BadgeCheck;

  usePageMeta(title ? `${title} | LoveMeAfter Careers` : "Career opportunity | LoveMeAfter", summary ? clip(summary) : undefined);

  if (!title || !summary) {
    return <main className="flex min-h-screen items-center justify-center bg-[#1b141d] p-6 text-center text-white"><div><p className="font-serif text-3xl">Role not found</p><Link to="/careers" className="mt-5 inline-flex rounded-full bg-[#ef8eb4] px-5 py-3 text-sm font-semibold text-[#24131d]">View current openings</Link></div></main>;
  }

  const applicationSubject = encodeURIComponent(`Application: ${title}`);
  const applicationBody = encodeURIComponent(`Role: ${title}\nName:\nPhone:\nEmail:\nLocation:\nRelevant experience:\n\nPlease attach a resume or portfolio if available.`);
  const applyLink = `mailto:hello@lovemeafter.com?subject=${applicationSubject}&body=${applicationBody}`;

  return (
    <main className="min-h-screen bg-[#1b141d] text-white">
      <header className="border-b border-white/10 bg-[#171119]"><nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10"><Link to="/careers" className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"><ArrowLeft className="size-4" /> All openings</Link><a href="tel:+14244260760" className="hidden items-center gap-2 text-sm text-white/70 sm:flex"><Phone className="size-4" /> 424 426 0760</a></nav></header>
      <section className="border-b border-white/10 bg-[#211824]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_.85fr] lg:items-center lg:px-10 lg:py-20"><div><p className="text-xs font-bold tracking-[.18em] text-[#ffc6dc] uppercase">{opening?.group ?? "Career opportunity"} · {opening?.employment ?? "Team role"}</p><h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[.96] tracking-[-.05em] sm:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">{summary}</p>{opening && <div className="mt-7 inline-flex flex-col rounded-2xl border border-[#ef8eb4]/25 bg-[#ef8eb4]/[.08] px-5 py-4"><span className="text-2xl font-bold tracking-[-.03em] text-white">{opening.pay}</span><span className="mt-1 max-w-lg text-xs leading-5 text-white/65">{opening.payNote}</span></div>}<a href={applyLink} className="mt-7 inline-flex h-12 items-center rounded-full bg-[#ef8eb4] px-6 text-sm font-bold text-[#24131d] transition hover:bg-[#f6b0ca]">Apply for this role <ArrowUpRight className="ml-2 size-4" /></a></div><div className="overflow-hidden rounded-3xl border border-white/10"><CareerArtwork title={title} label={opening?.group ?? "Career path"} icon={Icon} /></div></div></section>
      {opening ? (
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:py-20">
          <div><p className="text-xs font-bold tracking-[.16em] text-[#ffc6dc] uppercase">What you’ll own</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Build a better project, one clear handoff at a time.</h2><ul className="mt-7 space-y-4">{opening.outcomes.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/80"><Check className="mt-0.5 size-4 shrink-0 text-[#ffc6dc]" />{item}</li>)}</ul><div className="mt-10 rounded-2xl border border-white/10 bg-white/[.04] p-5"><p className="text-xs font-bold tracking-[.14em] text-[#ffc6dc] uppercase">Pay transparency</p><p className="mt-2 text-sm leading-6 text-white/75">{opening.payNote} Any commissions, bonuses, benefits, schedule, or work-location details will be explained and confirmed separately in writing.</p></div></div>
          <aside className="rounded-3xl border border-white/10 bg-[#241c27] p-6 sm:p-8"><p className="text-xs font-bold tracking-[.16em] text-[#ffc6dc] uppercase">What will help you thrive</p><ul className="mt-6 space-y-4">{opening.qualifications.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/75"><BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#ffc6dc]" />{item}</li>)}</ul><a href={applyLink} className="mt-8 flex h-12 items-center justify-center rounded-full border border-white/20 text-sm font-semibold text-white transition hover:bg-white/10">Apply by email <ArrowUpRight className="ml-2 size-4" /></a></aside>
        </section>
      ) : (
        <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8"><p className="text-sm leading-7 text-white/75">We’ll share the compensation, location, schedule, and role expectations before an application moves forward. No income or advancement outcome is guaranteed.</p><a href={applyLink} className="mt-7 inline-flex items-center rounded-full bg-[#ef8eb4] px-6 py-3 text-sm font-bold text-[#24131d]">Ask about this role <ArrowUpRight className="ml-2 size-4" /></a></section>
      )}
      <section className="border-t border-white/10 bg-[#171119]"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-8 sm:flex-row sm:items-center sm:px-8 lg:px-10"><p className="text-sm text-white/70">Ready to help build a team homeowners can count on?</p><a href={applyLink} className="inline-flex items-center text-sm font-semibold text-[#ffc6dc]">Start your application <ArrowUpRight className="ml-1 size-4" /></a><button type="button" onClick={() => navigate("/careers")} className="text-sm text-white/65 hover:text-white">Back to all roles</button></div></section>
    </main>
  );
}
