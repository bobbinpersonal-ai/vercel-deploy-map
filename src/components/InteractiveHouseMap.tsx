import { useMemo, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { Link } from "react-router";

type Zone = {
  id: string;
  label: string;
  kicker: string;
  description: string;
  slug: string;
  color: string;
  shape: "roof" | "house" | "window" | "door" | "yard" | "driveway" | "system";
  focus: string;
};

const ZONES: Zone[] = [
  { id: "roof", label: "Roof & gutters", kicker: "Protection", description: "Roofing, shingles, ventilation, gutters, drainage and storm-damage documentation.", slug: "roofing", color: "#d5ec77", shape: "roof", focus: "100 35 800 330" },
  { id: "exterior", label: "Exterior envelope", kicker: "Curb appeal", description: "Siding, exterior paint, windows, doors, trim, fascia and soffit.", slug: "siding", color: "#b7d0a0", shape: "house", focus: "160 170 680 380" },
  { id: "kitchen", label: "Kitchen & cabinets", kicker: "Inside the home", description: "Cabinetry, sinks, counters, backsplash tile, flooring and layout improvements.", slug: "kitchens", color: "#e8c58b", shape: "window", focus: "350 235 310 265" },
  { id: "bathroom", label: "Bath & tile", kicker: "Daily quality", description: "Showers, vanities, wall tile, plumbing fixtures, accessibility and finishes.", slug: "bathrooms", color: "#a9cee0", shape: "door", focus: "500 240 210 270" },
  { id: "yard", label: "Backyard & deck", kicker: "Outdoor living", description: "Decks, patios, fencing, landscaping, drainage, masonry and outdoor spaces.", slug: "decks", color: "#9ac38b", shape: "yard", focus: "575 320 390 280" },
  { id: "driveway", label: "Driveway & concrete", kicker: "Approach", description: "Paving, asphalt, concrete, walkways, retaining walls and masonry.", slug: "paving", color: "#c6b9a8", shape: "driveway", focus: "30 405 400 220" },
  { id: "systems", label: "Comfort & systems", kicker: "Behind the walls", description: "HVAC, electrical, plumbing, insulation, air quality, solar and backup power.", slug: "hvac", color: "#d9a4a4", shape: "system", focus: "270 260 460 280" },
];

const DEFAULT_VIEWBOX = "0 0 1000 650";

export function InteractiveHouseMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(() => ZONES.find((zone) => zone.id === selectedId) ?? null, [selectedId]);
  const viewBox = selected?.focus ?? DEFAULT_VIEWBOX;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#1d211d]/12 bg-[#dfe8d2] p-2 shadow-[0_24px_70px_rgba(29,33,29,.12)] sm:p-4">
        <div className="pointer-events-none absolute left-5 top-5 z-10 rounded-full border border-[#1d211d]/10 bg-[#f7f5f0]/85 px-3 py-2 text-[10px] font-semibold tracking-[.16em] text-[#71803d] uppercase backdrop-blur sm:left-7 sm:top-7">
          {selected ? `Zoomed in · ${selected.label}` : "Tap the part of the home"}
        </div>
        {selected && (
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#1d211d]/15 bg-[#f7f5f0]/90 px-3 py-2 text-[10px] font-semibold text-[#1d211d] backdrop-blur transition hover:bg-white sm:right-7 sm:top-7"
          >
            <RotateCcw className="size-3" /> Whole house
          </button>
        )}
        <svg
          viewBox={viewBox}
          role="img"
          aria-label="Interactive illustration of a home and its improvement projects"
          className="block aspect-[1.5] w-full rounded-[1.5rem] transition-[viewBox] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
        >
          <defs>
            <linearGradient id="house-sky" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#b7d4db" />
              <stop offset="1" stopColor="#e7edcf" />
            </linearGradient>
            <linearGradient id="house-wall" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#f8f2e7" />
              <stop offset="1" stopColor="#ded5c6" />
            </linearGradient>
            <filter id="house-shadow" x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#263326" floodOpacity=".18" />
            </filter>
          </defs>

          <rect width="1000" height="650" fill="url(#house-sky)" />
          <circle cx="820" cy="100" r="48" fill="#f6dda0" opacity=".85" />
          <path d="M0 475 C170 415 255 455 405 435 C570 412 710 445 1000 385 V650 H0Z" fill="#9fbe8a" />
          <path d="M0 530 C230 495 370 540 525 510 C680 480 810 520 1000 475 V650 H0Z" fill="#88aa78" opacity=".8" />

          <g filter="url(#house-shadow)">
            <path d="M160 320 L500 92 L840 320 L800 345 L500 145 L200 345Z" fill="#253228" />
            <path d="M205 330 L500 145 L795 330 V515 H205Z" fill="url(#house-wall)" />
            <path d="M500 145 V515 H795" fill="#d4c7b7" opacity=".8" />
            <path d="M205 330 L500 145 L795 330" fill="none" stroke="#d5ec77" strokeWidth="8" />
            <path d="M230 345 H770" stroke="#9e8c78" strokeWidth="7" />
            <rect x="462" y="352" width="76" height="163" rx="3" fill="#5b4939" />
            <circle cx="522" cy="438" r="5" fill="#d5ec77" />
            <rect x="270" y="350" width="118" height="94" rx="4" fill="#8db9c0" stroke="#253228" strokeWidth="8" />
            <path d="M329 350 V444 M270 397 H388" stroke="#253228" strokeWidth="6" />
            <rect x="610" y="350" width="118" height="94" rx="4" fill="#8db9c0" stroke="#253228" strokeWidth="8" />
            <path d="M669 350 V444 M610 397 H728" stroke="#253228" strokeWidth="6" />
            <rect x="270" y="462" width="118" height="42" rx="3" fill="#d4b68d" stroke="#253228" strokeWidth="6" />
            <path d="M270 476 H388 M270 490 H388" stroke="#8c6748" strokeWidth="4" />
            <path d="M685 500 C720 455 750 430 780 400" stroke="#88a67e" strokeWidth="14" fill="none" />
            <path d="M684 500 C740 470 770 450 810 435" stroke="#88a67e" strokeWidth="14" fill="none" />
          </g>

          <g aria-label="Clickable home project areas">
            {ZONES.map((zone) => {
              const active = selectedId === zone.id;
              const common = {
                tabIndex: 0,
                role: "button" as const,
                onClick: () => setSelectedId(zone.id),
                onKeyDown: (event: KeyboardEvent<SVGGElement>) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedId(zone.id);
                  }
                },
                "aria-label": `Explore ${zone.label}`,
              };
              return (
                <g key={zone.id} {...common} className="cursor-pointer outline-none">
                  {zone.shape === "roof" && <path d="M155 320 L500 82 L845 320 L800 350 L500 145 L200 350Z" fill={zone.color} opacity={active ? ".78" : ".01"} stroke={active ? zone.color : "transparent"} strokeWidth="14" className="transition-all duration-300 hover:opacity-60" />}
                  {zone.shape === "house" && <path d="M200 340 L500 150 L800 340 V520 H200Z" fill={zone.color} opacity={active ? ".55" : ".01"} stroke={active ? zone.color : "transparent"} strokeWidth="12" className="transition-all duration-300 hover:opacity-40" />}
                  {zone.shape === "window" && <rect x="255" y="330" width="150" height="130" rx="14" fill={zone.color} opacity={active ? ".6" : ".01"} stroke={active ? zone.color : "transparent"} strokeWidth="12" className="transition-all duration-300 hover:opacity-45" />}
                  {zone.shape === "door" && <rect x="440" y="335" width="120" height="190" rx="12" fill={zone.color} opacity={active ? ".6" : ".01"} stroke={active ? zone.color : "transparent"} strokeWidth="12" className="transition-all duration-300 hover:opacity-45" />}
                  {zone.shape === "yard" && <path d="M560 335 H1000 V650 H560 C650 550 650 445 560 335Z" fill={zone.color} opacity={active ? ".48" : ".01"} stroke={active ? zone.color : "transparent"} strokeWidth="12" className="transition-all duration-300 hover:opacity-40" />}
                  {zone.shape === "driveway" && <path d="M250 650 L430 650 L475 510 H415 L330 510Z" fill={zone.color} opacity={active ? ".65" : ".01"} stroke={active ? zone.color : "transparent"} strokeWidth="12" className="transition-all duration-300 hover:opacity-45" />}
                  {zone.shape === "system" && <path d="M400 260 H620 V520 H400Z" fill={zone.color} opacity={active ? ".38" : ".01"} stroke={active ? zone.color : "transparent"} strokeWidth="12" strokeDasharray="18 12" className="transition-all duration-300 hover:opacity-35" />}
                </g>
              );
            })}
          </g>
        </svg>
        <p className="px-3 pb-2 pt-3 text-center text-xs text-[#65705e] sm:px-5">Every highlighted area opens a project guide with materials, scope, value, timing and FAQs.</p>
      </div>

      <div className="lg:pl-4">
        <p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">Explore the whole property</p>
        <h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] text-[#1d211d] sm:text-5xl">From first inspection to final detail.</h2>
        <p className="mt-5 text-base leading-7 text-[#62695f]">See the work spatially. Tap the roof, walls, rooms, yard or driveway to zoom in and understand what can change there.</p>

        <div className="mt-7 grid gap-2 sm:grid-cols-2">
          {ZONES.map((zone) => (
            <button
              type="button"
              key={zone.id}
              onClick={() => setSelectedId(zone.id)}
              className={`group flex items-center justify-between rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${selectedId === zone.id ? "border-[#71803d] bg-[#eaf0d0]" : "border-[#1d211d]/10 bg-white/65 hover:border-[#71803d]/60"}`}
            >
              <span className="flex items-center gap-3">
                <span className="size-3 rounded-full" style={{ backgroundColor: zone.color }} />
                <span><span className="block text-sm font-semibold text-[#1d211d]">{zone.label}</span><span className="block text-[10px] font-semibold tracking-[.12em] text-[#879078] uppercase">{zone.kicker}</span></span>
              </span>
              <ArrowUpRight className="size-4 text-[#71803d] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ))}
        </div>

        {selected && (
          <div className="mt-6 rounded-2xl bg-[#1d211d] p-5 text-white shadow-xl transition-all duration-500">
            <p className="text-xs font-semibold tracking-[.16em] text-[#d5ec77] uppercase">{selected.kicker}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-.03em]">{selected.label}</h3>
            <p className="mt-2 text-sm leading-6 text-white/72">{selected.description}</p>
            <Link to={`/services/${selected.slug}`} className="mt-5 inline-flex items-center rounded-full bg-[#d5ec77] px-4 py-2.5 text-xs font-semibold text-[#1d211d] transition hover:bg-[#e5f795]">
              Open the {selected.label.toLowerCase()} guide <ArrowUpRight className="ml-1 size-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
