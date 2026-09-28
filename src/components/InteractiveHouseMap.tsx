import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { px } from "@/data/photos";

type Zone = {
  id: string;
  label: string;
  kicker: string;
  description: string;
  slug: string;
  view: "front" | "back";
  image: number;
};

const ZONES: Zone[] = [
  { id: "roof", label: "Roof & gutters", kicker: "Roofing", description: "We inspect shingles, flashing, ventilation, and gutters; photograph damage; then scope repair or replacement and water management.", slug: "roofing", view: "front", image: 237907 },
  { id: "entry", label: "Front door & windows", kicker: "Doors & windows", description: "We measure openings, review frames and weather seals, compare door or window options, and include trim and finish work in the scope.", slug: "doors", view: "front", image: 16254509 },
  { id: "garage", label: "Garage & driveway", kicker: "Access & hardscape", description: "We check garage-door operation, concrete, paving, slopes, and drainage before planning repair or replacement.", slug: "garage-doors", view: "front", image: 34711989 },
  { id: "exterior", label: "Siding & exterior", kicker: "Siding & trim", description: "We document siding, paint, fascia, soffit, and trim conditions, then specify preparation, materials, and cleanup.", slug: "siding", view: "front", image: 39281193 },
  { id: "patio", label: "Patio & hardscape", kicker: "Patios & paving", description: "We assess pavers, concrete, base, grading, and water flow; the written plan covers preparation through final cleanup.", slug: "patios", view: "back", image: 10855255 },
  { id: "deck", label: "Deck & porch", kicker: "Decks & railings", description: "We review the frame, footings, stairs, rails, and boards, then scope repairs or a new deck with materials and finish details.", slug: "decks", view: "back", image: 33017851 },
  { id: "landscape", label: "Landscape & drainage", kicker: "Grounds & drainage", description: "We evaluate grading, runoff, irrigation, planting, and fencing so the plan addresses the property—not just the surface.", slug: "landscaping", view: "back", image: 13871294 },
  { id: "systems", label: "HVAC & home systems", kicker: "Systems & comfort", description: "We coordinate HVAC, electrical, plumbing, insulation, air quality, solar, and backup-power work with the right specialist.", slug: "hvac", view: "back", image: 18725613 },
];

const VIEWS = {
  front: { label: "Front of the home", image: 11842541 },
  back: { label: "Backyard & patio", image: 10855255 },
} as const;

export function InteractiveHouseMap() {
  const [view, setView] = useState<"front" | "back">("front");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const detailRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!selectedId || !detailRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedId]);

  const chooseZone = (zone: Zone) => {
    setView(zone.view);
    setSelectedId(zone.id);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-start">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#1d211d]/12 bg-[#dfe8d2] p-2 shadow-[0_24px_70px_rgba(29,33,29,.12)] sm:p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#d8e2d0]">
          <img
            src={px(VIEWS[view].image, 1600)}
            alt={VIEWS[view].label}
            className="absolute inset-0 size-full object-cover transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101610]/60 via-transparent to-transparent" />
          <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col gap-3 sm:inset-x-6 sm:bottom-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-sm text-xs leading-5 text-white/90">Roofing, siding, doors, windows, and outdoor projects—inspected, scoped, and coordinated around the right qualified professionals.</p>
            <div className="flex shrink-0 rounded-full border border-white/20 bg-[#182019]/75 p-1 backdrop-blur-md">
              {(Object.keys(VIEWS) as (keyof typeof VIEWS)[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setView(key); setSelectedId(null); }}
                  className={`rounded-full px-3 py-2 text-[10px] font-semibold transition sm:px-4 ${view === key ? "bg-[#d5ec77] text-[#1d211d]" : "text-white/80 hover:text-white"}`}
                >
                  {VIEWS[key].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:pt-2">
        <p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">Home improvement, handled end to end</p>
        <h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] text-[#1d211d] sm:text-5xl">Tell us what needs work.</h2>
        <p className="mt-5 text-base leading-7 text-[#62695f]">From roof repairs and replacement windows to drainage, decks, and home systems, we inspect the work, write the scope, coordinate the crew, and leave the site clean.</p>

        <div className="mt-7 grid gap-2 sm:grid-cols-2">
          {ZONES.map((zone) => (
            <div key={zone.id} className={`min-w-0 ${selectedId === zone.id ? "sm:col-span-2" : ""}`}>
              <button
                type="button"
                onClick={() => chooseZone(zone)}
                aria-expanded={selectedId === zone.id}
                className={`group flex w-full items-center justify-between rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${selectedId === zone.id ? "border-[#71803d]/45 bg-white" : "border-[#1d211d]/10 bg-white/65 hover:border-[#71803d]/40"}`}
              >
                <span className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-[#92b477]" />
                  <span><span className="block text-sm font-semibold text-[#1d211d]">{zone.label}</span><span className="block text-[10px] font-semibold tracking-[.12em] text-[#879078] uppercase">{zone.kicker} · {zone.view === "front" ? "Front" : "Back"}</span></span>
                </span>
                <ArrowUpRight className="size-4 text-[#71803d] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              {selectedId === zone.id && (
                <article ref={detailRef} className="mt-2 scroll-mt-32 scroll-mb-40 overflow-hidden rounded-2xl border border-[#71803d]/30 bg-[#1d211d] text-white shadow-xl">
                  <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url(${px(zone.image, 900)})` }} />
                  <div className="p-5">
                    <p className="text-xs font-semibold tracking-[.16em] text-[#d5ec77] uppercase">{zone.kicker}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-.03em]">{zone.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/72">{zone.description}</p>
                    <Link to={`/services/${zone.slug}`} className="mt-5 inline-flex items-center rounded-full bg-[#d5ec77] px-4 py-2.5 text-xs font-semibold text-[#1d211d] transition hover:bg-[#e5f795]">
                      View {zone.kicker.toLowerCase()} project guide <ArrowUpRight className="ml-1 size-3.5" />
                    </Link>
                  </div>
                </article>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
