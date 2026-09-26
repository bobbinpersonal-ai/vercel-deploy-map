import { useId } from "react";

type BrandProductExampleProps = {
  slug: string;
  label: string;
  brand: string;
  productLine?: string;
};

export function BrandProductExample({ slug, label, brand, productLine }: BrandProductExampleProps) {
  const gradientId = useId().replace(/:/g, "");
  const isWindow = slug === "windows";
  const isDoor = slug === "doors" || slug === "garage-doors";
  const isRoof = slug === "roofing";
  const isSolar = slug === "solar";
  const isHvac = slug === "hvac" || slug === "air-quality";
  const isLighting = slug === "lighting";
  const isPlumbing = slug === "plumbing" || slug === "bathrooms";
  const isSiding = slug === "siding";
  const isFence = slug === "fencing";
  const isDeck = slug === "decks" || slug === "patios";
  const isElectrical = slug === "electrical" || slug === "panel-upgrades" || slug === "backup-power";
  const isInsulation = slug === "insulation";
  const isCabinetry = slug === "cabinetry" || slug === "kitchens" || slug === "closets";
  const isSurface = ["flooring", "tile", "countertops", "masonry", "concrete", "paving"].includes(slug);

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#302733]">
      <div className="relative h-48 overflow-hidden bg-[#292431] sm:h-56">
        <svg viewBox="0 0 1200 480" role="img" aria-label={`Illustration of ${label.toLowerCase()}`} className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ef8eb4" stopOpacity=".78" /><stop offset="1" stopColor="#a56d89" stopOpacity=".28" /></linearGradient>
            <linearGradient id={`${gradientId}-wall`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#493b48" /><stop offset="1" stopColor="#292431" /></linearGradient>
          </defs>
          <rect width="1200" height="480" fill="#292431" />
          <path d="M0 330 310 95l280 235v150H0z" fill={`url(#${gradientId}-wall)`} />
          <path d="M740 70h460v410H740z" fill="#342d38" />
          {!isWindow && !isDoor && !isRoof && !isSolar && !isHvac && !isLighting && !isPlumbing && !isFence && !isDeck && !isElectrical && !isInsulation && !isCabinetry && !isSurface && <path d="M760 110h350M760 155h350M760 200h350M760 245h350M760 290h350M760 335h350" stroke="#f5d8e5" strokeWidth="5" opacity=".35" />}
          <path d="M0 405h1200v75H0z" fill="#211d27" />
          <circle cx="1000" cy="92" r="180" fill="#ef8eb4" opacity=".08" />
          {isWindow ? (
            <g fill={`url(#${gradientId})`} stroke="#f5d8e5" strokeWidth="12" strokeLinejoin="round">
              <rect x="430" y="86" width="350" height="300" rx="10" />
              <path d="M605 94v284M438 232h334" fill="none" />
              <path d="M450 105h145v115H450zM615 105h145v115H615zM450 248h145v125H450zM615 248h145v125H615z" fill="#ef8eb4" fillOpacity=".18" stroke="none" />
            </g>
          ) : isDoor ? (
            <g fill={`url(#${gradientId})`} stroke="#f5d8e5" strokeWidth="12" strokeLinejoin="round">
              <rect x="480" y="55" width="240" height="360" rx="12" />
              <rect x="525" y="100" width="150" height="112" rx="8" fill="#ef8eb4" fillOpacity=".2" />
              <path d="M525 250h150v120H525z" fill="none" />
              <circle cx="675" cy="270" r="8" fill="#f5d8e5" stroke="none" />
            </g>
          ) : isRoof || isSolar ? (
            <g fill={`url(#${gradientId})`} stroke="#f5d8e5" strokeWidth="10" strokeLinejoin="round">
              <path d="m290 250 310-205 310 205" />
              <path d="M390 235 600 96l210 139" fill="none" />
              {isSolar ? <g strokeWidth="5"><path d="m435 229 170-112 170 112-35 87H470z" /><path d="m520 172 40 126M625 173l-38 125M475 204h258" /></g> : <g strokeWidth="5"><path d="m400 185 58 40m18-72 59 41m20-74 56 42m18-74 60 42m22-74 60 42M372 244h455" /></g>}
              <path d="M390 245v165h420V245" fill="#342d38" />
            </g>
          ) : isHvac ? (
            <g fill={`url(#${gradientId})`} stroke="#f5d8e5" strokeWidth="10" strokeLinejoin="round">
              <rect x="425" y="95" width="350" height="300" rx="28" />
              <circle cx="600" cy="245" r="86" fill="none" />
              <path d="M600 165v160M520 245h160M544 189l112 112m0-112L544 301" strokeWidth="6" />
              <path d="M470 355h260" />
            </g>
          ) : isLighting ? (
            <g fill="none" stroke="#f5d8e5" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
              <path d="M600 30v110M510 140h180l-35 140h-110z" fill={`url(#${gradientId})`} />
              <path d="M570 300h60m-45 30h30M510 320l-55 65m235-65 55 65" opacity=".65" />
            </g>
          ) : isPlumbing ? (
            <g fill="none" stroke="#f5d8e5" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
              <path d="M490 165v-45q0-55 55-55h90q55 0 55 55v28" />
              <path d="M690 145h70v60H590v-40h100z" fill={`url(#${gradientId})`} />
              <path d="M530 245v80q0 55 70 55h160q65 0 65-55v-70M680 205v38m0 28v16" opacity=".85" />
            </g>
          ) : isFence ? (
            <g fill={`url(#${gradientId})`} stroke="#f5d8e5" strokeWidth="8" strokeLinejoin="round">
              <path d="M330 190h540v205H330z" />
              <path d="M355 190v205m60-205v205m60-205v205m60-205v205m60-205v205m60-205v205m60-205v205m60-205v205m60-205v205" />
              <path d="M300 185h600v25H300zm0 180h600v25H300z" />
            </g>
          ) : isDeck ? (
            <g fill="none" stroke="#f5d8e5" strokeWidth="9" strokeLinejoin="round">
              <path d="m320 230 280-105 280 105v155H320z" fill={`url(#${gradientId})`} />
              <path d="M365 250v-95m75 67v-90m75 61V103m370 147v-95m-75 67v-90m-75 61v-90M345 230h510M350 275h500M355 320h490M410 385v-70m145 70v-70m145 70v-70m145 70v-70" />
            </g>
          ) : isElectrical ? (
            <g fill={`url(#${gradientId})`} stroke="#f5d8e5" strokeWidth="10" strokeLinejoin="round">
              <rect x="455" y="55" width="290" height="360" rx="24" />
              <path d="M600 110 535 245h65l-20 105 85-150h-65z" fill="#f5d8e5" stroke="none" />
              <path d="M485 95h35m160 0h35" strokeWidth="6" />
            </g>
          ) : isInsulation ? (
            <g fill="none" stroke="#f5d8e5" strokeWidth="10" strokeLinejoin="round">
              <path d="M385 80h430v320H385z" fill="#342d38" />
              <path d="M430 80v320m340-320v320" />
              <path d="M430 125q40-55 80 0t80 0 80 0 80 0M430 205q40-55 80 0t80 0 80 0 80 0M430 285q40-55 80 0t80 0 80 0 80 0M430 365q40-55 80 0t80 0 80 0 80 0" fill={`url(#${gradientId})`} strokeWidth="6" />
            </g>
          ) : isCabinetry ? (
            <g fill={`url(#${gradientId})`} stroke="#f5d8e5" strokeWidth="10" strokeLinejoin="round">
              <rect x="370" y="85" width="460" height="315" rx="10" />
              <path d="M600 95v295M385 245h430" />
              <rect x="410" y="125" width="145" height="90" rx="8" fill="#342d38" />
              <rect x="645" y="125" width="145" height="90" rx="8" fill="#342d38" />
              <rect x="410" y="275" width="145" height="95" rx="8" fill="#342d38" />
              <rect x="645" y="275" width="145" height="95" rx="8" fill="#342d38" />
              <path d="M575 167h0m50 150h0" strokeWidth="12" />
            </g>
          ) : isSurface ? (
            <g fill={`url(#${gradientId})`} stroke="#f5d8e5" strokeWidth="8" strokeLinejoin="round">
              <path d="M330 120h540v280H330z" />
              <path d="M510 120v280m180-280v280M330 260h540" />
              <path d="m365 155 105 75m85-80 115 88m82-74 96 70M365 300l95 70m105-92 105 81m120-85 75 54" opacity=".55" />
            </g>
          ) : (
            <g fill={`url(#${gradientId})`} stroke="#f5d8e5" strokeWidth="9" strokeLinejoin="round">
              <path d="M430 205 600 75l170 130v190H430z" />
              <path d="M535 395V260h130v135" fill="#292431" />
              <rect x="465" y="235" width="85" height="75" fill="#292431" />
              <rect x="650" y="235" width="85" height="75" fill="#292431" />
            </g>
          )}
          {isSiding && <path d="M760 100h410M760 145h410M760 190h410M760 235h410M760 280h410M760 325h410M760 370h410" stroke="#f5d8e5" strokeWidth="5" opacity=".48" />}
          <path d="M90 420h220" stroke="#ef8eb4" strokeWidth="5" opacity=".8" />
          <circle cx="1040" cy="420" r="7" fill="#ef8eb4" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#211824]/90 to-transparent px-5 pb-4 pt-12">
          <p className="text-[10px] font-bold tracking-[.16em] text-[#ffc6dc] uppercase">{brand} · product category</p>
          <p className="mt-1 text-sm font-semibold text-white">{productLine ?? label}</p>
        </div>
      </div>
      <figcaption className="px-4 py-3 text-xs leading-5 text-white/80">Original category illustration, not a product photo or a depiction of a specific manufacturer model. Confirm exact product and specifications for your project.</figcaption>
    </figure>
  );
}
