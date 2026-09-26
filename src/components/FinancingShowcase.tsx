import { ArrowUpRight, CircleDollarSign, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { FINANCING_LENDERS } from "../data/financing-lenders";

const PREQUALIFY_URL = "https://www.acornfinance.com/pre-qualify/?d=NBUNH&utm_medium=web_pre_qual_link";

type FinancingShowcaseProps = {
  project?: string;
  dark?: boolean;
  compact?: boolean;
};

export function FinancingShowcase({ project = "your home project", dark = false, compact = false }: FinancingShowcaseProps) {
  return (
    <section className={`rounded-[1.75rem] border p-6 sm:p-8 ${dark ? "border-[#d5ec77]/25 bg-[#1d211d] text-white" : "border-[#1d211d]/10 bg-[#eaf0d0] text-[#1d211d]"}`}>
      <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className={`flex items-center gap-2 text-xs font-semibold tracking-[.16em] uppercase ${dark ? "text-[#d5ec77]" : "text-[#71803d]"}`}>
            <CircleDollarSign className="size-4" /> Flexible ways to move forward
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-[.98] tracking-[-.045em] sm:text-4xl">
            Improve {project} now while keeping more cash available for life.
          </h2>
          <p className={`mt-4 max-w-2xl text-sm leading-6 ${dark ? "text-white/72" : "text-[#596357]"}`}>
            A project does not have to compete with every other priority in the month it starts. Qualified homeowners can compare financing options, preserve cash reserves, and choose a payment and term that fits their situation.
          </p>
          {!compact && (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Protect the home", "Address damage before a small issue becomes a larger interruption."],
                ["Enjoy it sooner", "Use the kitchen, bath, lighting, roof, or outdoor space while it matters to you."],
                ["Keep options open", "Compare APR, term, payment, fees, and total cost before accepting anything."],
              ].map(([title, copy]) => (
                <div key={title} className={`border-t pt-3 ${dark ? "border-white/15" : "border-[#1d211d]/15"}`}>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className={`mt-1 text-xs leading-5 ${dark ? "text-white/58" : "text-[#697568]"}`}>{copy}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-3 lg:min-w-[220px]">
          <a href={PREQUALIFY_URL} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center rounded-full bg-[#d5ec77] px-5 text-sm font-semibold text-[#1d211d] transition hover:bg-[#e5f795]">
            Compare financing options <ArrowUpRight className="ml-2 size-4" />
          </a>
          <Link to="/financing" className={`inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-semibold transition ${dark ? "border-white/25 text-white hover:bg-white/10" : "border-[#1d211d]/20 text-[#1d211d] hover:bg-white/60"}`}>
            See lender details
          </Link>
        </div>
      </div>
      <div className={`mt-7 border-t pt-5 ${dark ? "border-white/15" : "border-[#1d211d]/12"}`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className={`size-4 ${dark ? "text-[#d5ec77]" : "text-[#71803d]"}`} />
            <p className={`text-xs ${dark ? "text-white/62" : "text-[#697568]"}`}>Recognized lending partners · subject to lender approval</p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Lending partners">
            {FINANCING_LENDERS.map((lender) => <span key={lender.name} className="rounded-full border border-white/15 bg-white/[.06] px-2.5 py-1 text-[11px] font-bold tracking-[-.02em] text-[#ffc6dc]">{lender.name}</span>)}
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FINANCING_LENDERS.slice(0, compact ? 4 : FINANCING_LENDERS.length).map((lender) => (
            <article key={lender.name} className={`rounded-xl border p-4 ${dark ? "border-white/10 bg-white/[.04]" : "border-[#1d211d]/10 bg-white/65"}`}>
              <h3 className="text-base font-bold text-[#ffc6dc]">{lender.name}</h3>
              <p className={`mt-1 text-[11px] font-semibold ${dark ? "text-white/70" : "text-[#596357]"}`}>{lender.note}</p>
              <p className={`mt-3 text-xs leading-5 ${dark ? "text-white/62" : "text-[#697568]"}`}>{lender.fit}</p>
              <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-5 text-white/70"><strong className="font-semibold text-white">Compare:</strong> {lender.compare}</p>
              <p className="mt-2 text-[11px] leading-5 text-white/70">{lender.reminder}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-[11px] leading-5 text-white/70">
          Financing is optional. APR, term, payment, fees, funding, availability, and approval vary by lender and applicant. Examples and prequalification are not a promise of approval, terms, savings, or project value.
        </p>
      </div>
    </section>
  );
}
