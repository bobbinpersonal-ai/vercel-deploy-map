import { useState } from "react";
import { ArrowUpRight, BadgeCheck, Check, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PRODUCT_FAMILIES, type ProductOption } from "@/data/product-options";

const TIER_LOGOS = [
  {
    id: "value",
    title: "Value-conscious",
    note: "Practical starting points",
    accent: "border-[#d9e2c0] bg-[#f2f5e8] text-[#42502e]",
    brands: [
      ["GAF", "Roofing", "gaf.com"],
      ["Alside", "Siding", "alside.com"],
      ["JELD-WEN", "Windows", "jeld-wen.com"],
      ["Masonite", "Entry doors", "masonite.com"],
      ["Spectra", "Gutters", "spectraguttersystems.com"],
      ["PPG", "Paint & coatings", "ppgpaints.com"],
      ["Fiberon", "Decking", "fiberondecking.com"],
      ["QUIKRETE", "Concrete & masonry", "quikrete.com"],
      ["SAKRETE", "Concrete & repair", "sakrete.com"],
      ["Pavestone", "Pavers & retaining walls", "pavestone.com"],
      ["NDS", "Drainage systems", "ndspro.com"],
      ["MSI", "Pavers & surfaces", "msisurfaces.com"],
      ["Mohawk", "Flooring", "mohawkflooring.com"],
      ["Rheem", "Heating & cooling", "rheem.com"],
      ["Moen", "Plumbing", "moen.com"],
      ["Leviton", "Electrical", "leviton.com"],
      ["Progress Lighting", "Lighting", "progresslighting.com"],
      ["Rain Bird", "Landscape & irrigation", "rainbird.com"],
      ["Daltile", "Tile & bath", "daltile.com"],
    ],
  },
  {
    id: "balanced",
    title: "Popular mid-range",
    note: "A balance of features and finish",
    accent: "border-[#d5dfc4] bg-[#eaf0e5] text-[#354b3d]",
    brands: [
      ["Owens Corning", "Roofing", "owenscorning.com"],
      ["LP SmartSide", "Siding", "lpcorp.com"],
      ["Pella", "Windows", "pella.com"],
      ["Therma-Tru", "Entry doors", "thermatru.com"],
      ["Englert", "Roofing & gutters", "englertinc.com"],
      ["Sherwin-Williams", "Paint & coatings", "sherwin-williams.com"],
      ["Trex", "Decking & fencing", "trex.com"],
      ["Belgard", "Pavers & retaining walls", "belgard.com"],
      ["Shaw", "Flooring", "shawfloors.com"],
      ["Delta", "Plumbing", "deltafaucet.com"],
      ["Carrier", "Heating & cooling", "carrier.com"],
      ["Eaton", "Electrical", "eaton.com"],
      ["Kichler", "Landscape lighting", "kichler.com"],
      ["Hunter", "Landscape & irrigation", "hunterindustries.com"],
      ["Nicolock", "Pavers & walls", "nicolock.com"],
      ["Enphase", "Solar & backup", "enphase.com"],
      ["CertainTeed", "Fencing & roofing", "certainteed.com"],
    ],
  },
  {
    id: "premium",
    title: "Premium & design-forward",
    note: "Elevated materials and finishes",
    accent: "border-[#e5d5b3] bg-[#f6f0e3] text-[#624a2b]",
    brands: [
      ["CertainTeed", "Roofing systems", "certainteed.com"],
      ["James Hardie", "Fiber-cement siding", "jameshardie.com"],
      ["Marvin", "Architectural windows", "marvin.com"],
      ["ProVia", "Custom entry doors", "provia.com"],
      ["LeafFilter", "Gutter protection", "leaffilter.com"],
      ["Benjamin Moore", "Paint & coatings", "benjaminmoore.com"],
      ["TimberTech", "Composite decking", "timbertech.com"],
      ["Unilock", "Pavers & retaining walls", "unilock.com"],
      ["Anchor Wall", "Retaining-wall systems", "anchorwall.com"],
      ["Eldorado Stone", "Stone veneer & walls", "eldoradostone.com"],
      ["Cambria", "Quartz countertops", "cambriausa.com"],
      ["Caesarstone", "Quartz surfaces", "caesarstoneus.com"],
      ["Mitsubishi Electric", "Heat pumps", "mitsubishicomfort.com"],
      ["Lutron", "Lighting controls", "lutron.com"],
      ["WAC Lighting", "Architectural lighting", "waclighting.com"],
      ["FX Luminaire", "Landscape lighting", "fxl.com"],
      ["Rain Bird", "Irrigation systems", "rainbird.com"],
      ["Generac", "Backup power", "generac.com"],
      ["REC", "Solar panels", "recgroup.com"],
    ],
  },
] as const;

type BrandCardProps = {
  brand: string;
  category: string;
  domain: string;
  index: number;
  onSelect: (brand: { brand: string; category: string; domain: string }) => void;
};

function BrandCard({ brand, category, domain, index, onSelect }: BrandCardProps) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect({ brand, category, domain })}
      aria-label={`See ${brand} ${category} product benefits`}
      className="group flex min-h-[66px] w-full min-w-0 items-center gap-2.5 rounded-xl border border-[#1d211d]/[.08] bg-white/90 px-2.5 py-2 text-left shadow-[0_2px_8px_rgba(29,33,29,.035)] transition hover:-translate-y-0.5 hover:border-[#71803d]/40 hover:bg-white hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#71803d] sm:gap-3 sm:px-3"
    >
      <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#1d211d]/[.07] bg-[#fafaf7] sm:size-10">
        {!logoFailed ? (
          <img
            src={`https://logo.clearbit.com/${domain}`}
            alt=""
            aria-hidden="true"
            loading={index < 8 ? "eager" : "lazy"}
            decoding="async"
            className="size-6 object-contain sm:size-7"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span aria-hidden="true" className="text-[10px] font-bold tracking-tight text-[#71803d]">
            {brand.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11px] font-bold leading-4 text-[#252a24] sm:text-xs">{brand}</span>
        <span className="mt-0.5 block truncate text-[9px] leading-3.5 text-[#788074] sm:text-[10px]">{category}</span>
      </span>
      <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0 text-[#a0a89d] transition group-hover:text-[#71803d]" />
    </button>
  );
}

function familyForCategory(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("roof")) return "roofing";
  if (normalized.includes("siding")) return "siding";
  if (normalized.includes("window")) return "windows";
  if (normalized.includes("door")) return "doors";
  if (normalized.includes("gutter")) return "gutters";
  if (normalized.includes("paint")) return "paint";
  if (normalized.includes("deck")) return "decks";
  if (normalized.includes("fenc")) return "fencing";
  if (normalized.includes("paver") || normalized.includes("concrete") || normalized.includes("wall") || normalized.includes("masonry")) return "hardscape";
  if (normalized.includes("counter")) return "countertops";
  if (normalized.includes("tile") || normalized.includes("bath")) return "baths";
  if (normalized.includes("floor")) return "flooring";
  if (normalized.includes("hvac") || normalized.includes("heating") || normalized.includes("cooling") || normalized.includes("heat pump")) return "hvac";
  if (normalized.includes("plumbing")) return "plumbing";
  if (normalized.includes("electrical") || normalized.includes("panel")) return "electrical";
  if (normalized.includes("lighting")) return "lighting";
  if (normalized.includes("insulation")) return "insulation";
  if (normalized.includes("solar")) return "solar";
  return undefined;
}

function findProductDetails(domain: string, category: string): ProductOption | undefined {
  const families = Object.entries(PRODUCT_FAMILIES);
  const preferredFamily = familyForCategory(category);
  const orderedFamilies = preferredFamily
    ? [...families].sort(([key]) => Number(key !== preferredFamily))
    : families;
  return orderedFamilies.flatMap(([, family]) => family.options).find((option) => option.domain === domain);
}

function generalBenefit(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("paver") || normalized.includes("concrete") || normalized.includes("wall") || normalized.includes("masonry")) return "Compare colors, patterns, surface texture, and compatible edging or wall components. The base, drainage, and installation details matter as much as the surface product.";
  if (normalized.includes("landscape") || normalized.includes("irrigation") || normalized.includes("drainage")) return "Compare coverage, controls, water management, and serviceability to the property layout and local conditions.";
  if (normalized.includes("roof")) return "Compare shingle profiles, color options, underlayment, ventilation, and which parts of the roof system are covered by product warranties.";
  if (normalized.includes("siding")) return "Compare exterior profiles, finish choices, trim coordination, maintenance expectations, and moisture-management details.";
  if (normalized.includes("window")) return "Compare frame and glass options, operation, comfort, appearance, and fit for the existing opening.";
  if (normalized.includes("door")) return "Compare style, material, glass, weather sealing, hardware, and fit for the existing entry.";
  if (normalized.includes("light")) return "Compare fixture style, light output, controls, and indoor or outdoor suitability for the intended space.";
  return `Compare product features, finish options, installation requirements, and availability for your ${category.toLowerCase()} project.`;
}

const DISPLAY_TIERS = [TIER_LOGOS[2], TIER_LOGOS[1], TIER_LOGOS[0]] as const;

function mixedOrder<T extends readonly (readonly [string, string, string])[]>(brands: T) {
  // Stable hash sorting gives each tier a mixed, NASCAR-style logo wall without
  // changing positions during React renders or causing flicker on mobile.
  return [...brands].sort(([nameA, categoryA], [nameB, categoryB]) => {
    const score = (text: string) => Array.from(text).reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7);
    return score(`${nameA}-${categoryA}`) - score(`${nameB}-${categoryB}`);
  });
}

export function BrandPillsShowcase() {
  const [selectedBrand, setSelectedBrand] = useState<{ brand: string; category: string; domain: string } | null>(null);
  const productDetails = selectedBrand ? findProductDetails(selectedBrand.domain, selectedBrand.category) : undefined;
  const benefit = productDetails?.why ?? (selectedBrand ? generalBenefit(selectedBrand.category) : "");

  return (
    <>
    <section
      aria-labelledby="brand-showcase-title"
      className="w-full rounded-3xl border border-[#1d211d]/10 bg-[#f8f7f1] p-4 shadow-[0_18px_50px_-42px_rgba(29,33,29,.5)] sm:p-6 lg:p-7"
    >
      <div className="flex flex-col gap-3 border-b border-[#1d211d]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-bold tracking-[.16em] text-[#71803d] uppercase">
            <BadgeCheck aria-hidden="true" className="size-4" /> Materials we can help compare
          </p>
          <h3 id="brand-showcase-title" className="mt-2 text-xl font-semibold tracking-[-.04em] text-[#1d211d] sm:text-2xl">
            From the driveway to the roofline.
          </h3>
        </div>
        <p className="max-w-lg text-xs leading-5 text-[#687265]">
          A mixed showcase of familiar manufacturers across the home—not an exclusive supplier list. Explore paving, concrete, retaining walls, landscaping, roofing, siding, windows, and home systems; the right product and price tier depend on the scope and local availability.
        </p>
      </div>

      <div className="mt-5 grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {DISPLAY_TIERS.map((tier) => (
          <section key={tier.id} aria-labelledby={`tier-${tier.id}`} className={`min-w-0 rounded-2xl border p-3 sm:p-4 ${tier.accent}`}>
            <div className="mb-3 flex min-h-12 items-center justify-between gap-2 border-b border-current/10 pb-3">
              <div className="min-w-0">
                <h4 id={`tier-${tier.id}`} className="text-sm font-bold tracking-[-.02em]">{tier.title}</h4>
                <p className="mt-0.5 text-[10px] opacity-75">{tier.note}</p>
              </div>
              <span aria-hidden="true" className="flex shrink-0 items-end gap-0.5">
                {[1, 2, 3].map((bar) => <span key={bar} className={`w-1 rounded-full bg-current ${bar === 1 ? "h-2 opacity-40" : bar === 2 ? "h-3 opacity-65" : "h-4"}`} />)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {mixedOrder(tier.brands).map(([brand, category, domain], index) => (
                <BrandCard key={`${brand}-${category}`} brand={brand} category={category} domain={domain} index={index} onSelect={setSelectedBrand} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-4 text-[10px] leading-4 text-[#7a8377]">
        Value-conscious, popular mid-range, and premium are illustrative comparison paths—not guaranteed price bands, endorsements, or brand ratings. Product lines, quotes, warranty terms, and local availability vary by project and address.
      </p>
    </section>
    <Dialog open={Boolean(selectedBrand)} onOpenChange={(open) => { if (!open) setSelectedBrand(null); }}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-3xl border-white/15 bg-[#172019] p-0 text-white shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:max-w-lg [&>button]:right-5 [&>button]:top-5 [&>button]:text-white/65 [&>button:hover]:text-white">
        {selectedBrand && (
          <div>
            <div className="border-b border-white/10 bg-white/[.035] px-6 py-6 pr-14 sm:px-7">
              <div className="flex items-center gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white p-2">
                  <img src={`https://logo.clearbit.com/${selectedBrand.domain}`} alt={`${selectedBrand.brand} logo`} className="max-h-full max-w-full object-contain" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-[.16em] text-[#d5ec77] uppercase">{selectedBrand.category}</p>
                  <DialogTitle className="mt-1 text-2xl font-semibold tracking-[-.04em] text-white">{selectedBrand.brand}</DialogTitle>
                </div>
              </div>
            </div>
            <div className="space-y-5 px-6 py-6 sm:px-7">
              <DialogHeader className="text-left">
                <DialogDescription className="text-sm leading-6 text-white/70">
                  {productDetails?.line ? `Example product line: ${productDetails.line}. ` : ""}{benefit}
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-2xl border border-[#d5ec77]/20 bg-[#d5ec77]/[.07] p-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-[#e6f4ae]"><Check className="size-4" /> Why homeowners compare it</p>
                <p className="mt-2 text-sm leading-6 text-white/75">{benefit}</p>
              </div>
              {productDetails?.warranty && (
                <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#d5ec77]" />
                  <p className="text-xs leading-5 text-white/65"><span className="font-semibold text-white/85">Warranty note: </span>{productDetails.warranty}</p>
                </div>
              )}
              <p className="text-[10px] leading-4 text-white/45">Specific products, warranties, pricing, and local availability are confirmed for your project. This overview is informational, not an endorsement or guarantee.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}
