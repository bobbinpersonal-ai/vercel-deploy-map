import { useMemo, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
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
  position: string;
  size: string;
};

const ZONES: Zone[] = [
  { id: "roof", label: "Roof & gutters", kicker: "Protection", description: "Roofing, shingles, ventilation, gutters, drainage and storm-damage documentation.", slug: "roofing", view: "front", image: 237907, position: "left-[38%] top-[9%]", size: "h-[28%] w-[34%]" },
  { id: "entry", label: "Front door & windows", kicker: "First impression", description: "Entry doors, windows, siding, exterior paint, trim and the details that make the front of the home feel cared for.", slug: "doors", view: "front", image: 16254509, position: "left-[45%] top-[43%]", size: "h-[32%] w-[24%]" },
  { id: "garage", label: "Garage & driveway", kicker: "Approach", description: "Garage doors, concrete, paving, walkways, drainage and the approach that frames the property.", slug: "garage-doors", view: "front", image: 34711989, position: "left-[7%] top-[48%]", size: "h-[31%] w-[30%]" },
  { id: "exterior", label: "Exterior envelope", kicker: "Curb appeal", description: "Siding, exterior paint, windows, doors, trim, fascia, soffit and weatherproofing.", slug: "siding", view: "front", image: 39281193, position: "right-[8%] top-[35%]", size: "h-[34%] w-[26%]" },
  { id: "patio", label: "Patio & hardscape", kicker: "Outdoor living", description: "Patios, pavers, concrete, outdoor rooms and the surfaces that make the backyard useful.", slug: "patios", view: "back", image: 10855255, position: "left-[38%] top-[43%]", size: "h-[32%] w-[38%]" },
  { id: "deck", label: "Deck & porch", kicker: "Outdoor living", description: "Decks, porches, railings, stairs, shade structures and outdoor living spaces.", slug: "decks", view: "back", image: 33017851, position: "left-[8%] top-[34%]", size: "h-[35%] w-[28%]" },
  { id: "landscape", label: "Landscape & drainage", kicker: "The property", description: "Planting, grading, irrigation, drainage, fencing and the ground around the home.", slug: "landscaping", view: "back", image: 13871294, position: "right-[5%] top-[32%]", size: "h-[42%] w-[28%]" },
  { id: "systems", label: "HVAC & systems", kicker: "Behind the walls", description: "HVAC, electrical, plumbing, insulation, air quality, solar and backup power.", slug: "hvac", view: "back", image: 18725613, position: "right-[31%] bottom-[9%]", size: "h-[22%] w-[24%]" },
];

const VIEWS = {
  front: { label: "Front of the home", image: 11842541, description: "Tap the roof, entry, garage, or exterior to explore the work homeowners see first." },
  back: { label: "Backyard & patio", image: 10855255, description: "Tap the patio, deck, landscape, or systems to explore the work that makes the property work harder." },
} as const;

export function InteractiveHouseMap() {
  const [view, setView] = useState<"front" | "back">("front");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(() => ZONES.find((zone) => zone.id === selectedId) ?? null, [selectedId]);
  const visibleZones = ZONES.filter((zone) => zone.view === view);

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
            alt={`${VIEWS[view].label} reference photo`}
            className="absolute inset-0 size-full object-cover transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101610]/65 via-transparent to-[#101610]/20" />
          <div className="absolute inset-x-4 top-4 z-10 flex items-start justify-between gap-3 sm:inset-x-6 sm:top-6">
            <span className="rounded-full border border-white/30 bg-[#182019]/78 px-3 py-2 text-[10px] font-semibold tracking-[.16em] text-white uppercase backdrop-blur-md">
              {selected ? `Selected · ${selected.label}` : "Tap a part of the home"}
            </span>
            {selected && (
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-[#f7f5f0]/90 px-3 py-2 text-[10px] font-semibold text-[#1d211d] backdrop-blur-md transition hover:bg-white"
              >
                <RotateCcw className="size-3" /> Clear
              </button>
            )}
          </div>
          {visibleZones.map((zone) => (
            <button
              type="button"
              key={zone.id}
              aria-label={`Explore ${zone.label}`}
              onClick={() => chooseZone(zone)}
              onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  chooseZone(zone);
                }
              }}
              className={`group absolute z-10 rounded-2xl border-2 transition duration-300 ${zone.position} ${zone.size} ${selectedId === zone.id ? "border-[#d5ec77] bg-[#d5ec77]/25 shadow-[0_0_0_4px_rgba(213,236,119,.25)]" : "border-white/0 bg-white/0 hover:border-[#d5ec77]/90 hover:bg-[#d5ec77]/20"}`}
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-[#182019]/80 px-2.5 py-1.5 text-[9px] font-bold tracking-[.1em] whitespace-nowrap text-white uppercase opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-[10px]">
                {zone.label}
              </span>
            </button>
          ))}
          <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col gap-3 sm:inset-x-6 sm:bottom-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-sm text-xs leading-5 text-white/85">Reference photography via Pexels. Images show the type of home and project, not a completed LoveMeAfter job.</p>
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
        <p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">Explore the whole property</p>
        <h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] text-[#1d211d] sm:text-5xl">See the project where it lives.</h2>
        <p className="mt-5 text-base leading-7 text-[#62695f]">Choose a photo view, then tap a generous highlighted area. The project preview opens directly below the list so the next step is always in reach.</p>

        <div className="mt-7 grid gap-2 sm:grid-cols-2">
          {ZONES.map((zone) => (
            <button
              type="button"
              key={zone.id}
              onClick={() => chooseZone(zone)}
              className={`group flex items-center justify-between rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${selectedId === zone.id ? "border-[#71803d] bg-[#eaf0d0]" : "border-[#1d211d]/10 bg-white/65 hover:border-[#71803d]/60"}`}
            >
              <span className="flex items-center gap-3">
                <span className={`size-3 rounded-full ${zone.view === "front" ? "bg-[#d5ec77]" : "bg-[#9ac38b]"}`} />
                <span><span className="block text-sm font-semibold text-[#1d211d]">{zone.label}</span><span className="block text-[10px] font-semibold tracking-[.12em] text-[#879078] uppercase">{zone.kicker} · {zone.view === "front" ? "Front" : "Back"}</span></span>
              </span>
              <ArrowUpRight className="size-4 text-[#71803d] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ))}
        </div>

        {selected && (
          <article className="mt-4 overflow-hidden rounded-2xl border border-[#71803d]/30 bg-[#1d211d] text-white shadow-xl">
            <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url(${px(selected.image, 900)})` }} />
            <div className="p-5">
              <p className="text-xs font-semibold tracking-[.16em] text-[#d5ec77] uppercase">{selected.kicker}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-.03em]">{selected.label}</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">{selected.description}</p>
              <Link to={`/services/${selected.slug}`} className="mt-5 inline-flex items-center rounded-full bg-[#d5ec77] px-4 py-2.5 text-xs font-semibold text-[#1d211d] transition hover:bg-[#e5f795]">
                Open the {selected.label.toLowerCase()} guide <ArrowUpRight className="ml-1 size-3.5" />
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
