import { ArrowLeft, ArrowUpRight, MapPin, Phone, Sprout } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { Link, useNavigate } from "react-router";
import { usePageMeta } from "@/components/PageMeta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/components/TopNav";

const DESTINATIONS = [
  [Sprout, "Book a mow", "One-time mow, edge, and blowout from $59.", "/services/mowing"],
  [MapPin, "Check your city", "Dallas, Fort Worth, Arlington, Plano, Garland, and Irving.", "/areas/texas/dallas"],
  [ArrowUpRight, "Get My Price", "Send yard photos and get a firm price in minutes.", "/get-quote"],
] as const;

export default function NotFound() {
  const navigate = useNavigate();
  usePageMeta(
    "Page not found | LoveMeAfter Lawn Care",
    "That page isn’t part of the current yard. Call (424) 426-0760 or get a firm lawn care price from your yard photos.",
    "/404",
  );
  return (
    <main className="min-h-screen bg-white text-[#1c2620]">
      <header className="border-b border-[#1c2620]/10 bg-[#14372a] text-white">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5 font-extrabold">
            <LogoMark className="size-9" />LoveMeAfter Lawn Care
          </Link>
          <a href={PHONE_HREF} className="flex items-center gap-2 text-sm text-white/85"><Phone className="size-4" />{PHONE_DISPLAY}</a>
        </nav>
      </header>
      <section className="relative overflow-hidden bg-[#14372a] text-white">
        <div aria-hidden="true" className="photo-placeholder--dark absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[.18em] text-[#8fd6ac] uppercase">404 · A small detour</p>
          <h1 className="mt-5 max-w-[16ch] text-4xl leading-[1.03] sm:text-6xl">This page missed the cut.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80">The address you followed isn’t part of the current yard. No problem—we can still get you a price.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => navigate(-1)} className="inline-flex min-h-12 items-center rounded-md border border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 size-4" />Go back
            </button>
            <Link to="/" className="inline-flex min-h-12 items-center rounded-md bg-white px-6 py-3 text-sm font-bold text-[#14502f] hover:bg-[#eaf2ed]">Start at home</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {DESTINATIONS.map(([Icon, title, copy, href]) => (
            <Link key={title} to={href} className="group rounded-xl border border-[#1c2620]/12 bg-[#f9fbf9] p-7 transition hover:-translate-y-1 hover:border-[#175a3b]/40">
              <Icon className="size-6 text-[#2f8f5b]" />
              <h2 className="mt-8 text-2xl text-[#14372a]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#5c6b62]">{copy}</p>
              <span className="mt-6 inline-flex items-center text-sm font-bold text-[#175a3b]">Open<ArrowUpRight className="ml-2 size-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-y border-[#1c2620]/10 bg-[#eaf2ed]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-5 py-12 sm:px-8 lg:flex-row lg:items-center">
          <h2 className="max-w-[22ch] text-3xl leading-[1.05] text-[#14372a] sm:text-4xl">Still not sure what your yard needs? Just call.</h2>
          <a href={PHONE_HREF} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#175a3b] px-7 text-sm font-bold text-white hover:bg-[#14502f]">
            <Phone className="size-4" />{PHONE_DISPLAY}
          </a>
        </div>
      </section>
    </main>
  );
}
