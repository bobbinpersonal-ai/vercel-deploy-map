import { ArrowUpRight, CalendarDays, Mail } from "lucide-react";

const OPTIONS = [
  ["15-minute trust review", "Questions about legitimacy, scope, insurance, process, or how we coordinate the work."],
  ["Project strategy conversation", "A complex renovation, multi-trade plan, property portfolio, or financing decision."],
  ["Market or partnership conversation", "A referral relationship, contractor partnership, or local market opportunity."],
] as const;

const scheduleLink = (subject: string, detail: string) =>
  `mailto:hello@lovemeafter.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hello LoveMeAfter team,\n\nI would like to request a ${subject.toLowerCase()}.\n\nWhat I would like to discuss: ${detail}\n\nPreferred days/times:\n\nName:\nPhone:\nCity/state:\n\nThank you.`)}`;

export function LeadershipSchedule({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`rounded-[1.75rem] border p-6 sm:p-8 ${dark ? "border-white/15 bg-[#202a20] text-white" : "border-[#1d211d]/10 bg-white text-[#1d211d]"}`}>
      <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div>
          <div className={`flex items-center gap-2 text-xs font-semibold tracking-[.16em] uppercase ${dark ? "text-[#d5ec77]" : "text-[#71803d]"}`}>
            <CalendarDays className="size-4" /> Talk with senior management
          </div>
          <h2 className="mt-4 text-3xl font-semibold leading-[.98] tracking-[-.045em] sm:text-4xl">Have a question that deserves a decision-maker?</h2>
          <p className={`mt-4 text-sm leading-6 ${dark ? "text-white/72" : "text-[#62695f]"}`}>
            Request a conversation with the LoveMeAfter leadership team about a project, partnership, market, or concern. This sends a scheduling request to <strong className={dark ? "text-white" : "text-[#1d211d]"}>hello@lovemeafter.com</strong>; the team will reply with a confirmed time.
          </p>
          <p className={`mt-4 text-xs leading-5 ${dark ? "text-white/48" : "text-[#7a8377]"}`}>This is a request form by email, not a claimed real-time calendar slot.</p>
        </div>
        <div className="grid gap-2">
          {OPTIONS.map(([title, detail]) => (
            <a key={title} href={scheduleLink(title, detail)} className={`group flex items-center justify-between gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5 ${dark ? "border-white/15 bg-white/[.04] hover:border-[#d5ec77]/60" : "border-[#1d211d]/10 bg-[#f7f5f0] hover:border-[#71803d]/60"}`}>
              <span className="flex min-w-0 items-start gap-3"><span className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${dark ? "bg-[#d5ec77] text-[#182019]" : "bg-[#eaf0d0] text-[#71803d]"}`}><Mail className="size-4" /></span><span><span className="block text-sm font-semibold">{title}</span><span className={`mt-1 block text-xs leading-5 ${dark ? "text-white/55" : "text-[#697568]"}`}>{detail}</span></span></span><ArrowUpRight className={`size-4 shrink-0 ${dark ? "text-[#d5ec77]" : "text-[#71803d]"} transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
