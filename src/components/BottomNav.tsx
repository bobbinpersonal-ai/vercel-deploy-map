import { PROJECT_INDEX } from "@/data/project-index";
import { OfficialBrandLogo } from "@/components/OfficialBrandLogo";
import { BRAND_PILLS } from "@/data/brand-pills";
import { getProductFamily } from "@/data/product-options";
import { BrandProductExample } from "@/components/BrandProductExample";
import { ArrowLeft, ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { openEstimateRequest } from "@/lib/estimate-request";
import { Logo } from "@/components/Logo";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const RAIL_LENDERS = [
  { slug: "lightstream", name: "LightStream", domain: "lightstream.com" },
  { slug: "sofi", name: "SoFi", domain: "sofi.com" },
  { slug: "upgrade", name: "Upgrade", domain: "upgrade.com" },
  { slug: "best-egg", name: "Best Egg", domain: "bestegg.com" },
] as const;

const PROJECT_RAIL = PROJECT_INDEX.map((project) => ({
  project,
  brands: BRAND_PILLS.filter((brand, index, brands) =>
    brand.slug === project.slug &&
    brands.findIndex((item) => item.slug === brand.slug && item.domain === brand.domain && item.brand === brand.brand) === index,
  ),
}));

const HIDDEN_PREFIXES = ["/admin", "/auth", "/login", "/dashboard"];
const NAV_SCROLL_THRESHOLD = 0.1;
const isPastRailThreshold = () => {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  return window.scrollY / maxScroll >= NAV_SCROLL_THRESHOLD;
};
type BrandPillEntry = (typeof BRAND_PILLS)[number];

export function BottomNav() {
  const { pathname } = useLocation();
  const railRef = useRef<HTMLDivElement>(null);
  const pointerDrag = useRef<{ startX: number; startScrollLeft: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [showRail, setShowRail] = useState(isPastRailThreshold);
  const [selectedBrand, setSelectedBrand] = useState<{ brand: BrandPillEntry; projectLabel: string } | null>(null);
  const isHidden = HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  useEffect(() => {
    const updateVisibility = () => setShowRail(!isHidden && isPastRailThreshold());
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [isHidden, pathname]);

  if (isHidden) return null;

  const activeService = pathname.startsWith("/services/")
    ? pathname.replace("/services/", "").split("/")[0]
    : null;
  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    rail?.scrollBy({ left: direction * Math.max(220, rail.clientWidth * 0.72), behavior: "smooth" });
  };
  const selectedProduct = selectedBrand
    ? getProductFamily(selectedBrand.brand.slug).options.find((option) => option.domain === selectedBrand.brand.domain)
    : undefined;

  return (
    <>
      <div
        aria-hidden={!showRail}
        inert={!showRail}
        className={`fixed inset-x-0 bottom-0 z-50 shadow-[0_-12px_36px_rgba(0,0,0,.2)] transition-all duration-300 ${showRail ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}
      >
        <div className="border-t border-[#252923]/15 bg-[#eeeae0]">
        <div className="flex items-center gap-1 px-1.5 sm:px-2">
          <button type="button" onClick={() => moveRail(-1)} className="flex size-8 shrink-0 items-center justify-center rounded-sm text-[#252923]/65 transition hover:text-[#93442e]" aria-label="Scroll project and manufacturer pills left">
            <ArrowLeft className="size-4" />
          </button>
          <div
            ref={railRef}
            className={`project-pill-scroller min-w-0 flex-1 overflow-x-auto overscroll-x-contain py-2 touch-pan-x ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
            aria-label="Browse projects, manufacturers, and financing options"
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              suppressClick.current = false;
              pointerDrag.current = { startX: event.clientX, startScrollLeft: event.currentTarget.scrollLeft, moved: false };
              if (event.pointerType === "mouse") setDragging(true);
            }}
            onPointerMove={(event) => {
              const drag = pointerDrag.current;
              if (!drag || event.pointerType !== "mouse") return;
              const distance = event.clientX - drag.startX;
              if (Math.abs(distance) > 4) drag.moved = true;
              if (drag.moved) {
                event.preventDefault();
                event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
              }
            }}
            onPointerUp={() => {
              if (pointerDrag.current?.moved) suppressClick.current = true;
              pointerDrag.current = null;
              setDragging(false);
            }}
            onPointerCancel={() => { pointerDrag.current = null; setDragging(false); }}
            onPointerLeave={() => {
              if (pointerDrag.current?.moved) suppressClick.current = true;
              pointerDrag.current = null;
              setDragging(false);
            }}
            onClickCapture={(event) => {
              if (suppressClick.current) {
                suppressClick.current = false;
                event.preventDefault();
                event.stopPropagation();
              }
            }}
            onWheel={(event) => {
              if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) event.currentTarget.scrollLeft += event.deltaY;
            }}
          >
            <div className="flex w-max items-center gap-2.5 px-1">
              {PROJECT_RAIL.map(({ project, brands }, projectIndex) => (
                <div key={project.slug} className="flex shrink-0 items-center gap-2">
                  <Link
                    to={`/services/${project.slug}`}
                    aria-current={activeService === project.slug ? "page" : undefined}
                    className={`project-rail-link px-1 py-2 text-xs font-semibold whitespace-nowrap transition sm:text-[13px] ${activeService === project.slug ? "is-active" : ""}`}
                  >
                    {project.label}
                  </Link>
                  {brands.map((brand) => (
                    <button
                      key={`${brand.domain}-${brand.brand}`}
                      type="button"
                      aria-label={`View ${brand.brand} details for ${project.label}`}
                      onClick={() => setSelectedBrand({ brand, projectLabel: project.label })}
                      className="brand-rail-pill flex shrink-0 items-center gap-2 rounded-sm border px-3 py-2 text-xs font-semibold whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93442e] sm:gap-2.5 sm:px-3.5 sm:py-2.5 sm:text-[13px]"
                    >
                      <OfficialBrandLogo brand={brand.brand} domain={brand.domain} className="size-[23px] rounded-full bg-white sm:size-8" />
                      {brand.brand}
                    </button>
                  ))}
                  {project.slug === "lighting" && (
                    <Link to="/services/lighting" className="flex shrink-0 items-center gap-1.5 rounded-sm border border-[#e9b66a]/45 bg-[#e9b66a]/10 px-3 py-1.5 text-[10px] font-semibold whitespace-nowrap text-[#ffdfb0] transition hover:border-[#e9b66a] hover:bg-[#e9b66a]/20">
                      <span aria-hidden="true">✦</span> Holiday lighting
                    </Link>
                  )}
                  {(projectIndex + 1) % 10 === 0 && RAIL_LENDERS[(projectIndex + 1) / 10 - 1] && (() => {
                    const lender = RAIL_LENDERS[(projectIndex + 1) / 10 - 1];
                    return (
                      <Link
                        key={`lender-${projectIndex}`}
                        to="/financing"
                        title={`${lender.name} financing options; approval, rates, offers, and terms vary.`}
                        className={`finance-rail-pill finance-rail-pill--${lender.slug} flex shrink-0 items-center gap-2 rounded-sm border px-2.5 py-1.5 text-[10px] font-bold whitespace-nowrap transition sm:px-3 sm:text-xs`}
                      >
                        <OfficialBrandLogo brand={lender.name} domain={lender.domain} className="size-[23px] rounded-full bg-white sm:size-8" />
                        <span>{lender.name}</span>
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    );
                  })()}
                </div>
              ))}
              <Link to="/financing" title="Promotions and deferred-payment offers vary by lender, eligibility, and current terms." className="finance-rail-pill finance-rail-pill--options flex shrink-0 items-center rounded-sm border px-3 py-2 text-[10px] font-semibold whitespace-nowrap transition sm:text-xs">
                Finance options
              </Link>
            </div>
          </div>
          <button type="button" onClick={() => moveRail(1)} className="flex size-8 shrink-0 items-center justify-center rounded-sm text-[#252923]/65 transition hover:text-[#93442e]" aria-label="Scroll project and manufacturer pills right">
            <ArrowRight className="size-4" />
          </button>
        </div>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-[#171b17] px-3 py-2 sm:px-5">
          <Link to="/" aria-label="lovemeafter.com home" className="min-w-0 text-white/90 transition hover:text-white">
            <Logo tone="light" compact className="gap-1.5 [&>svg]:size-7 [&_.brand-wordmark]:text-xs sm:[&>svg]:size-8 sm:[&_.brand-wordmark]:text-sm" />
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <a href="tel:+14244260760" aria-label="Call LoveMeAfter at 424 426 0760" className="inline-flex h-10 items-center justify-center gap-1.5 rounded-sm border border-white/25 px-3 text-xs font-semibold text-white transition hover:border-white/50 hover:bg-white/10">
              <Phone className="size-3.5" /><span className="sm:hidden">Call</span><span className="hidden sm:inline">424 426 0760</span>
            </a>
            <button type="button" onClick={() => openEstimateRequest()} className="inline-flex h-10 items-center justify-center gap-1 rounded-sm bg-[#93442e] px-3 text-xs font-semibold text-white transition hover:bg-[#7d3928]">
              Free estimate <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={Boolean(selectedBrand)} onOpenChange={(open) => { if (!open) setSelectedBrand(null); }}>
        <DialogContent className="max-h-[88vh] overflow-y-auto rounded-3xl border-white/15 bg-[#211824] p-0 text-white shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:max-w-xl [&>button]:right-5 [&>button]:top-5 [&>button]:text-white/65 [&>button:hover]:text-white">
          {selectedBrand && (
            <div>
              <div className="border-b border-white/10 bg-white/[.035] px-6 py-6 pr-14">
                <div className="flex items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white p-2">
                    <OfficialBrandLogo brand={selectedBrand.brand.brand} domain={selectedBrand.brand.domain} alt={`${selectedBrand.brand.brand} logo`} className="size-10" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-[.16em] text-[#ffc6dc] uppercase">Manufacturer · {selectedBrand.projectLabel}</p>
                    <DialogTitle className="mt-1 text-2xl font-semibold tracking-[-.04em] text-white">{selectedBrand.brand.brand}</DialogTitle>
                  </div>
                </div>
              </div>
              <div className="space-y-5 px-6 py-6">
                <BrandProductExample
                  key={`${selectedBrand.brand.slug}-${selectedBrand.brand.brand}`}
                  slug={selectedBrand.brand.slug}
                  label={selectedProduct?.line ?? selectedBrand.brand.note}
                  brand={selectedBrand.brand.brand}
                  productLine={selectedProduct?.line}
                  domain={selectedBrand.brand.domain}
                />
                <DialogHeader className="text-left">
                  <DialogDescription className="text-sm leading-6 text-white/85">{selectedBrand.brand.note}. Product availability and specifications vary by project and location.</DialogDescription>
                </DialogHeader>
                <div className="rounded-2xl border border-[#ef8eb4]/20 bg-[#ef8eb4]/[.08] p-4">
                  <p className="text-xs font-semibold text-[#ffc6dc]">What this means for your project</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">We can review this manufacturer’s options alongside the written scope, installation requirements, warranty details, and other products that may suit your home.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link to={`/services/${selectedBrand.brand.slug}`} onClick={() => setSelectedBrand(null)} className="inline-flex items-center rounded-full bg-[#ef8eb4] px-4 py-2.5 text-xs font-semibold text-[#24131d] transition hover:bg-[#f6b0ca]">
                    Explore {selectedBrand.projectLabel} <ArrowUpRight className="ml-1 size-3.5" />
                  </Link>
                  {selectedProduct && (
                    <a href={selectedProduct.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10">
                      Official {selectedProduct.brand} details <ArrowUpRight className="ml-1 size-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
