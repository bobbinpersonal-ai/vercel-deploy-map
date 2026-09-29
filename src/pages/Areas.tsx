import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { openEstimateRequest } from "@/lib/estimate-request";
import { usePageMeta } from "@/components/PageMeta";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import usaMap from "@svg-maps/usa";
import { MARKETS } from "@/data/markets";

const STATE_BY_ID: Record<string, string> = {
  id: "idaho", il: "illinois", in: "indiana", ks: "kansas", ky: "kentucky", me: "maine", mo: "missouri", ne: "nebraska", nh: "new-hampshire", ny: "new-york", oh: "ohio", ok: "oklahoma", pa: "pennsylvania", sd: "south-dakota", tx: "texas", vt: "vermont", wy: "wyoming",
};

export default function Areas() {
  const [selectedSlug, setSelectedSlug] = useState(MARKETS[0].slug);
  const selectedMarket = useMemo(() => MARKETS.find((market) => market.slug === selectedSlug) ?? MARKETS[0], [selectedSlug]);
  usePageMeta(
    "Service Areas | LoveMeAfter",
    "Residential project coordination across 17 states and 68 cities — with qualified professionals matched to the work and location.",
  );

  return (
    <main className="min-h-screen bg-[#1d211d] text-white">
      <section className="border-b border-white/10 bg-[#1d211d] text-white">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[.18em] text-[#d7b880] uppercase">Interactive coverage map</p>
              <h1 className="mt-4 text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl">Find your state. Then find your community.</h1>
              <p className="mt-6 max-w-md text-base leading-7 text-white/70">Highlighted states are where our current service-area pages are built. Click any highlighted state to view its primary market, nearby communities, weather profile, and project examples.</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/60"><span className="flex items-center gap-3"><span className="size-3 rounded-full bg-[#d5ec77]" /> Active LoveMeAfter service area</span><span className="flex items-center gap-3"><span className="size-3 rounded-full bg-white/15" /> Coming soon</span></div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[#263227] p-4 sm:p-8">
              <svg viewBox={usaMap.viewBox} role="img" aria-label="Interactive map of LoveMeAfter service areas" className="h-auto w-full overflow-visible"><title>LoveMeAfter service areas</title>{usaMap.locations.map((location: (typeof usaMap.locations)[number]) => { const slug = STATE_BY_ID[location.id]; const market = slug ? MARKETS.find((item) => item.slug === slug) : undefined; const active = Boolean(market); const selected = slug === selectedSlug; return <path key={location.id} d={location.path} role="button" tabIndex={active ? 0 : -1} aria-label={market ? `${market.state} service area` : location.name} onClick={() => market && setSelectedSlug(market.slug)} onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && market) setSelectedSlug(market.slug); }} className={`cursor-${active ? "pointer" : "default"} stroke-[#1d211d] stroke-[1.4] transition-colors ${selected ? "fill-[#f4f8bc]" : active ? "fill-[#d5ec77] hover:fill-[#f4f8bc]" : "fill-white/10"}`} />; })}</svg>
              <div className="mt-5 flex flex-col justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold tracking-[.15em] text-[#d7b880] uppercase">Selected area</p><p className="mt-1 text-2xl font-semibold">{selectedMarket.state}</p></div><Link to={`/areas/${selectedMarket.slug}`} className="inline-flex h-11 items-center justify-center rounded-full bg-[#93442e] px-5 text-sm font-semibold text-white hover:bg-[#793923]">Open {selectedMarket.city} page <ArrowUpRight className="ml-2 size-4" /></Link></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Every market has a local story</p><h2 className="mt-4 max-w-md text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl">Meet the places behind the map.</h2></div><p className="max-w-xl text-lg leading-8 text-[#62695f]">Choose a state below to see the primary city, nearby communities, climate considerations, local services, project examples, and the best next step for your home.</p></div><div className="mt-14 grid gap-4 md:grid-cols-2">{MARKETS.map((area) => <article key={area.slug} className={`overflow-hidden border bg-white transition ${selectedSlug === area.slug ? "border-[#71803d]" : "border-[#1d211d]/10"}`}><div className="h-56 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(0deg,rgba(15,22,16,.55),transparent 60%),url(${area.image})` }} /><div className="p-7"><div className="flex items-center justify-between gap-4"><p className="flex items-center gap-2 text-xs font-semibold tracking-[.15em] text-[#71803d] uppercase"><MapPin className="size-4" /> {area.state}</p><button onClick={() => setSelectedSlug(area.slug)} className="text-xs font-semibold text-[#71803d]">Focus map</button></div><h2 className="mt-4 text-3xl font-semibold tracking-[-.04em]">{area.city}</h2><p className="mt-2 text-sm font-medium text-[#4f5a4d]">{area.cities.join(" · ")}</p><p className="mt-4 text-sm leading-6 text-[#62695f]">{area.tagline}</p><div className="mt-6 flex flex-wrap gap-2">{area.services.map((service) => <span key={service} className="rounded-full bg-[#eaf0d0] px-3 py-1.5 text-xs text-[#4f5a4d]">{service}</span>)}</div><div className="mt-7 flex flex-wrap gap-x-5 gap-y-3"><Link to={`/areas/${area.slug}`} className="inline-flex items-center text-sm font-semibold text-[#71803d]">View area <ArrowUpRight className="ml-1 size-4" /></Link><Link to={`/careers/${area.slug}`} className="inline-flex items-center text-sm font-semibold text-[#71803d]">Sales roles <ArrowUpRight className="ml-1 size-4" /></Link><Link to={`/contractors/${area.slug}`} className="inline-flex items-center text-sm font-semibold text-[#71803d]">Partner network <ArrowUpRight className="ml-1 size-4" /></Link></div></div></article>)}</div></section>

      <section className="border-y border-[#1d211d]/10 bg-[#eaf0d0]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-28"><div><p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Coverage standard</p><h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">Local enough to care. Organized enough to deliver.</h2></div><div className="grid gap-4 sm:grid-cols-2"><div className="bg-white/75 p-6"><Check className="size-5 text-[#71803d]" /><h3 className="mt-6 text-lg font-semibold">Crew checks</h3><p className="mt-2 text-sm leading-6 text-[#62695f]">Insurance, registration, references, and credentials required for the scope and local jurisdiction.</p></div><div className="bg-white/75 p-6"><Check className="size-5 text-[#71803d]" /><h3 className="mt-6 text-lg font-semibold">Written scopes</h3><p className="mt-2 text-sm leading-6 text-[#62695f]">Homeowners and project professionals see the same scope, expectations, and next step before work begins.</p></div></div></div></section><section className="bg-[#d5ec77]"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-10"><div><p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Not sure if we cover you?</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.055em] sm:text-5xl">Send your ZIP. We’ll tell you.</h2></div><Button onClick={() => openEstimateRequest()} className="h-14 rounded-full bg-[#1d211d] px-7 text-white hover:bg-[#30382f]">Check availability <ArrowUpRight className="ml-2 size-5" /></Button></div></section>
    </main>
  );
}
