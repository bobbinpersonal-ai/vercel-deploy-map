import { Logo } from "@/components/Logo";
import { PROJECT_INDEX } from "@/data/project-index";
import { BRAND_PILLS } from "@/data/brand-pills";
import { AlertTriangle, ArrowUpRight, HardHat, House, MapPin, Pause, Phone, Play, Wallet, Wrench } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const PHONE_DISPLAY = "424 426 0760";
const PHONE_HREF = "tel:+14244260760";

const LINKS = [
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/conditions", label: "Conditions", icon: AlertTriangle },
  { to: "/trades", label: "Trades", icon: HardHat },
  { to: "/areas", label: "Areas", icon: MapPin },
  { to: "/insights", label: "Guides", icon: House },
  { to: "/financing", label: "Financing", icon: Wallet },
];

/** Services and their matching manufacturers for the bottom scrolling pill rail. */
const PROJECT_RAIL = PROJECT_INDEX.map((project) => ({
  project,
  brands: BRAND_PILLS.filter((brand) => brand.slug === project.slug),
}));

/** Routes where the public bottom bar would get in the way. */
const HIDDEN_PREFIXES = ["/admin", "/auth", "/login", "/dashboard"];

export function BottomNav() {
  const { pathname } = useLocation();
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  const activeService = pathname.startsWith("/services/")
    ? pathname.replace("/services/", "").split("/")[0]
    : null;
  const [railPaused, setRailPaused] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {/* Auto-scrolling pill rail — every project type, locked to the bottom of the viewport. */}
      <div
        className="relative overflow-hidden border-t border-white/10 bg-[#182019]/92 backdrop-blur-md"
        aria-label="All LoveMeAfter project types"
      >
        <div className="flex items-center">
          <div
            className="nav-pill-scroller min-w-0 flex-1 overflow-x-auto touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onTouchStart={() => setRailPaused(true)}
            onPointerDown={() => setRailPaused(true)}
            aria-label="Scrollable project and financing pill rail"
          >
            <div className={`nav-pill-track flex w-max items-center gap-2 py-2 pl-3 ${railPaused ? "[animation-play-state:paused]" : ""}`}>
              {[0, 1].map((pass) => (
                <div key={`projects-${pass}`} className="flex items-center gap-2 pr-2">
                  {PROJECT_RAIL.map(({ project, brands }) => (
                    <div key={`${project.slug}-${pass}`} className="flex items-center gap-2">
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
                          key={`${brand.domain}-${brand.brand}-${pass}`}
                          to={`/services/${project.slug}`}
                          aria-label={`${brand.brand}, manufacturer for ${project.label}`}
                          className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#d5ec77]/45 bg-[#d5ec77]/10 px-2.5 py-1.5 text-[10px] font-semibold whitespace-nowrap text-[#e6f4ae] transition hover:border-[#d5ec77] hover:bg-[#d5ec77]/20"
                        >
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=64`}
                            alt=""
                            aria-hidden="true"
                            className="size-4 rounded-full bg-white object-contain"
                            loading="lazy"
                          />
                          {brand.brand}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRailPaused((paused) => !paused)}
            className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#182019] text-[#d5ec77] shadow-lg transition hover:border-[#d5ec77]"
            aria-label={railPaused ? "Resume automatic pill scrolling" : "Pause automatic pill scrolling and drag the pill rail"}
            title={railPaused ? "Resume automatic scrolling" : "Pause and drag the rail"}
          >
            {railPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </button>
          <span className="pointer-events-none absolute inset-y-0 right-9 w-14 bg-gradient-to-l from-[#182019] to-transparent" />
        </div>
      </div>

      {/* Quick nav bar */}
      <div className="border-t border-black/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-2.5 sm:px-5 lg:px-8">
          <Link to="/" aria-label="LoveMeAfter home" className="shrink-0 pl-1 pr-2">
            <Logo tone="black" />
          </Link>

          <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <nav aria-label="Quick navigation" className="flex w-max items-center gap-1.5">
              {LINKS.map(({ to, label, icon: Icon }) => {
                const active = pathname === to || pathname.startsWith(`${to}/`);
                return (
                  <Link
                    key={to}
                    to={to}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${
                      active
                        ? "border-black bg-black text-white"
                        : "border-black/12 bg-white text-[#3f463d] hover:border-black/40 hover:text-black"
                    }`}
                  >
                    <Icon className="size-3.5" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 rounded-full border border-black/15 px-3 py-2 text-xs font-semibold text-black hover:bg-black/5"
            >
              <Phone className="size-3.5" /> {PHONE_DISPLAY}
            </a>
            <Link
              to="/#estimate-form"
              className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-[#2a2f28]"
            >
              Free estimate <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
