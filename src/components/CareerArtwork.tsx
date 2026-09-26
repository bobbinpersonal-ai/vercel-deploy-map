import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function CareerArtwork({ title, label, icon: Icon, compact = false }: { title: string; label: string; icon: LucideIcon; compact?: boolean }) {
  return (
    <div className={`relative isolate overflow-hidden bg-[#211824] text-white ${compact ? "min-h-56" : "min-h-64"}`}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(239,142,180,.24),transparent_42%),linear-gradient(140deg,#352a36_0%,#211824_62%,#17121b_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div aria-hidden="true" className="absolute -right-10 -top-16 size-56 rounded-full border border-[#ffc6dc]/20" />
      <div aria-hidden="true" className="absolute -right-1 -top-7 size-40 rounded-full border border-[#ffc6dc]/20" />
      <div className={`relative flex h-full flex-col justify-between ${compact ? "min-h-56 p-6" : "min-h-64 p-7 sm:p-9"}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[.18em] text-[#ffc6dc] uppercase">LoveMeAfter · {label}</p>
            <p className="mt-2 max-w-[19rem] text-lg font-semibold leading-tight tracking-[-.03em] sm:text-xl">{title}</p>
          </div>
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#ffc6dc]/30 bg-[#ef8eb4]/10 text-[#ffc6dc]"><Icon className="size-5" strokeWidth={1.5} /></span>
        </div>
        <div className="mt-8 flex items-end justify-between">
          <div className="flex items-end gap-2" aria-hidden="true"><span className="h-7 w-2 rounded-full bg-[#ef8eb4]/50" /><span className="h-12 w-2 rounded-full bg-[#ef8eb4]/70" /><span className="h-9 w-2 rounded-full bg-[#ffc6dc]/80" /><span className="h-16 w-2 rounded-full bg-[#ef8eb4]" /><span className="h-11 w-2 rounded-full bg-[#ffc6dc]/65" /></div>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-[.12em] text-white/55 uppercase">Craft · care · follow-through <ArrowUpRight className="size-3" /></span>
        </div>
      </div>
    </div>
  );
}
