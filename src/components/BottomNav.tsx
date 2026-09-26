import { Logo } from "@/components/Logo";
import { PROJECT_INDEX } from "@/data/project-index";
import { OfficialBrandLogo } from "@/components/OfficialBrandLogo";
import { BRAND_PILLS } from "@/data/brand-pills";
import { AlertTriangle, ArrowLeft, ArrowRight, ArrowUpRight, HardHat, House, MapPin, Phone, Wallet, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

const PHONE_DISPLAY = "424 426 0760";
const PHONE_HREF = "tel:+14244260760";

const RAIL_LENDERS = [
  { name: "LightStream", domain: "lightstream.com", detail: "Review fixed-rate offers" },
  { name: "SoFi", domain: "sofi.com", detail: "Compare payment options" },
  { name: "Upgrade", domain: "upgrade.com", detail: "Explore project financing" },
  { name: "Best Egg", domain: "bestegg.com", detail: "See current loan options" },
] as const;

const LINKS = [
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/conditions", label: "Conditions", icon: AlertTriangle },
  { to: "/trades", label: "Trades", icon: HardHat },
  { to: "/areas", label: "Areas", icon: MapPin },
  { to: "/insights", label: "Guides", icon: House },
  { to: "/financing", label: "Financing", icon: Wallet },
];

/** One complete pass through the catalog; no animation or duplicated loop. */
const PROJECT_RAIL = PROJECT_INDEX.map((project) => ({
  project,
  brands: BRAND_PILLS.filter((brand, index, brands) =>
    brand.slug === project.slug &&
    brands.findIndex((item) => item.slug === brand.slug && item.domain === brand.domain && item.brand === brand.brand) === index,
  ),
}));

const HIDDEN_PREFIXES = ["/admin", "/auth", "/login", "/dashboard"];

export function BottomNav() {
  const { pathname } = useLocation();
  const railRef = useRef<HTMLDivElement>(null);
  const quickNavRef = useRef<HTMLDivElement>(null);
  const pointerDrag = useRef<{ startX: number; startScrollLeft: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const isHidden = HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  useEffect(() => {
    const scroller = railRef.current;
    if (!scroller || isHidden) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let resumeTimer: number | undefined;
    let pausedByInteraction = false;
    let lastFrameTime = 0;
    let direction = 1;
    let edgePauseUntil = 0;

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      lastFrameTime = 0;
    };
    const animate = (time: number) => {
      if (reducedMotion.matches || document.visibilityState !== "visible") {
        stop();
        return;
      }

      if (!pausedByInteraction && !scroller.contains(document.activeElement)) {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        if (maxScroll > 4 && time >= edgePauseUntil) {
          const elapsed = lastFrameTime ? Math.min(time - lastFrameTime, 40) : 0;
          scroller.scrollLeft = Math.max(0, Math.min(maxScroll, scroller.scrollLeft + direction * elapsed * 0.03));
          if (scroller.scrollLeft >= maxScroll - 1) {
            direction = -1;
            edgePauseUntil = time + 900;
          } else if (scroller.scrollLeft <= 1) {
            direction = 1;
            edgePauseUntil = time + 900;
          }
        }
      }
      lastFrameTime = time;
      frame = window.requestAnimationFrame(animate);
    };
    const start = () => {
      if (!frame && !reducedMotion.matches) frame = window.requestAnimationFrame(animate);
    };
    const pauseTemporarily = () => {
      pausedByInteraction = true;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        pausedByInteraction = false;
        lastFrameTime = 0;
      }, 2200);
    };
    const onFocusIn = () => {
      pausedByInteraction = true;
      window.clearTimeout(resumeTimer);
    };
    const onFocusOut = () => pauseTemporarily();
    const onMotionChange = () => {
      if (reducedMotion.matches) stop();
      else start();
    };

    scroller.addEventListener("pointerdown", pauseTemporarily);
    scroller.addEventListener("touchstart", pauseTemporarily, { passive: true });
    scroller.addEventListener("wheel", pauseTemporarily, { passive: true });
    scroller.addEventListener("focusin", onFocusIn);
    scroller.addEventListener("focusout", onFocusOut);
    reducedMotion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onMotionChange);
    start();

    return () => {
      stop();
      window.clearTimeout(resumeTimer);
      scroller.removeEventListener("pointerdown", pauseTemporarily);
      scroller.removeEventListener("touchstart", pauseTemporarily);
      scroller.removeEventListener("wheel", pauseTemporarily);
      scroller.removeEventListener("focusin", onFocusIn);
      scroller.removeEventListener("focusout", onFocusOut);
      reducedMotion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onMotionChange);
    };
  }, [isHidden, pathname]);

  if (isHidden) return null;

  const activeService = pathname.startsWith("/services/")
    ? pathname.replace("/services/", "").split("/")[0]
    : null;
  const moveRail = (direction: -1 | 1) => {
    railRef.current?.scrollBy({ left: direction * Math.max(220, railRef.current.clientWidth * 0.72), behavior: "smooth" });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="border-t border-white/10 bg-[#211824]/95 backdrop-blur-md">
        <div className="flex items-center gap-1 px-1.5 sm:px-2">
          <button type="button" onClick={() => moveRail(-1)} className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[.05] text-white/70 transition hover:border-[#d5ec77]/60 hover:text-[#d5ec77]" aria-label="Scroll service and brand pills left">
            <ArrowLeft className="size-4" />
          </button>
          <div
            ref={railRef}
            className={`project-pill-scroller min-w-0 flex-1 overflow-x-auto overscroll-x-contain py-2 touch-pan-x ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
            aria-label="Browse every project, product manufacturer, and financing option"
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              suppressClick.current = false;
              pointerDrag.current = { startX: event.clientX, startScrollLeft: event.currentTarget.scrollLeft, moved: false };
              if (event.pointerType === "mouse") {
                event.currentTarget.setPointerCapture(event.pointerId);
                setDragging(true);
              }
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
            onClickCapture={(event) => {
              if (suppressClick.current) {
                suppressClick.current = false;
                event.preventDefault();
                event.stopPropagation();
              }
            }}
            onWheel={(event) => {
              const rail = railRef.current;
              if (rail && Math.abs(event.deltaY) > Math.abs(event.deltaX)) rail.scrollLeft += event.deltaY;
            }}
          >
            <div className="flex w-max items-center gap-2 pr-2">
              {PROJECT_RAIL.map(({ project, brands }, projectIndex) => (
                <div key={project.slug} className="flex shrink-0 items-center gap-2">
                  <Link
                    to={`/services/${project.slug}`}
                    aria-current={activeService === project.slug ? "page" : undefined}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-medium whitespace-nowrap transition ${
                      activeService === project.slug
                        ? "border-[#d5ec77] bg-[#d5ec77] text-[#1d211d]"
                        : "border-white/20 bg-white/10 text-white/80 hover:border-[#d5ec77] hover:bg-[#d5ec77] hover:text-[#1d211d]"
                    }`}
                  >
                    {project.label}
                  </Link>
                  {brands.map((brand) => (
                    <Link
                      key={`${brand.domain}-${brand.brand}`}
                      to={`/services/${project.slug}`}
                      aria-label={`${brand.brand}, manufacturer for ${project.label}`}
                      className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#d5ec77]/40 bg-[#d5ec77]/10 px-2.5 py-1.5 text-[10px] font-semibold whitespace-nowrap text-[#e6f4ae] transition hover:border-[#d5ec77] hover:bg-[#d5ec77]/20"
                    >
                      <OfficialBrandLogo brand={brand.brand} domain={brand.domain} className="size-4 rounded-full bg-white" />
                      {brand.brand}
                    </Link>
                  ))}
                  {project.slug === "lighting" && (
                    <Link to="/services/lighting" className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#e9b66a]/45 bg-[#e9b66a]/10 px-3 py-1.5 text-[10px] font-semibold whitespace-nowrap text-[#ffdfb0] transition hover:border-[#e9b66a] hover:bg-[#e9b66a]/20">
                      <span aria-hidden="true">✦</span> Holiday lighting
                    </Link>
                  )}
                  {(projectIndex + 1) % 10 === 0 && RAIL_LENDERS[(projectIndex + 1) / 10 - 1] && (() => {
                    const lender = RAIL_LENDERS[(projectIndex + 1) / 10 - 1];
                    return (
                      <span key={`lender-${projectIndex}`} className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#9dc8dc]/30 bg-[#9dc8dc]/10 px-2.5 py-1.5 text-[10px] font-semibold whitespace-nowrap text-[#c7e6f2]" title="Lender approval, rates, promotions, and terms vary by offer.">
                        <OfficialBrandLogo brand={lender.name} domain={lender.domain} className="size-4 rounded-full bg-white" />
                        <Link to="/financing" aria-label={`${lender.name}: ${lender.detail}`}>{lender.name}</Link>
                        <span className="font-normal text-white/60">· {lender.detail}</span>
                      </span>
                    );
                  })()}
                </div>
              ))}
              <Link to="/financing" title="Promotions and deferred-payment offers vary by lender, applicant eligibility, and current terms." className="flex shrink-0 items-center rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-[10px] font-medium whitespace-nowrap text-white/65 transition hover:border-white/35 hover:text-white/85">
                Promo or deferred options vary
              </Link>
            </div>
          </div>
          <button type="button" onClick={() => moveRail(1)} className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[.05] text-white/70 transition hover:border-[#d5ec77]/60 hover:text-[#d5ec77]" aria-label="Scroll service and brand pills right">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>        <div className="border-t border-white/10 bg-[#171119]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-2.5 sm:px-5 lg:px-8">
          <Link to="/" aria-label="LoveMeAfter home" className="shrink-0 pl-1 pr-2"><Logo tone="light" /></Link>
          <div ref={quickNavRef} className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <nav aria-label="Quick navigation" className="flex w-max items-center gap-1.5">
              {LINKS.map(({ to, label, icon: Icon }) => {
                const active = pathname === to || pathname.startsWith(`${to}/`);
                return (
                  <Link key={to} to={to} aria-current={active ? "page" : undefined} className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${active ? "border-[#ef8eb4] bg-[#ef8eb4] text-[#24131d]" : "border-white/15 bg-white/[.06] text-white/75 hover:border-[#ef8eb4]/70 hover:text-[#ffd8e7]"}`}>
                    <Icon className="size-3.5" />{label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <a href={PHONE_HREF} className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/10"><Phone className="size-3.5" /> {PHONE_DISPLAY}</a>
            <Link to="/#estimate-form" className="flex items-center gap-1.5 rounded-full bg-[#ef8eb4] px-4 py-2 text-xs font-semibold text-[#24131d] hover:bg-[#f6b0ca]">Free estimate <ArrowUpRight className="size-3.5" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
