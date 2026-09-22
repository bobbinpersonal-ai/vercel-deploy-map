import { Logo } from "@/components/Logo";
import { PROJECT_CATEGORY_ORDER, PROJECT_INDEX, PROJECT_INDEX_COUNT } from "@/data/project-index";
import { AlertTriangle, ArrowUpRight, HardHat, House, MapPin, Phone, Wallet, Wrench } from "lucide-react";
import { Link, useLocation } from "react-router";

const PHONE_DISPLAY = "424 426 0760";
const PHONE_HREF = "tel:+14244260760";

const LENDERS = [
  { name: "LightStream", detail: "Home improvement lender · low APR options", tone: "text-[#4ba5dc]", surface: "bg-[#e5f5ff]" },
  { name: "SoFi", detail: "Home improvement lender · fixed-rate loans", tone: "text-[#151515]", surface: "bg-white" },
  { name: "LendingPoint", detail: "Home improvement lender · flexible options", tone: "text-[#168b76]", surface: "bg-[#e5f7f1]" },
  { name: "Best Egg", detail: "Home improvement lender · project financing", tone: "text-[#d26c2e]", surface: "bg-[#fff0e8]" },
  { name: "Upgrade", detail: "Home improvement lender · monthly payments", tone: "text-[#6844a4]", surface: "bg-[#f0eaff]" },
  { name: "Prosper", detail: "Home improvement lender · personal loans", tone: "text-[#007c83]", surface: "bg-[#e3f8f7]" },
  { name: "OneMain Financial", detail: "Home improvement lender · loan options", tone: "text-[#28618e]", surface: "bg-[#e8f2fb]" },
  { name: "Axos Bank", detail: "Home improvement lender · financing options", tone: "text-[#23677c]", surface: "bg-[#e5f5f7]" },
] as const;

const LINKS = [
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/conditions", label: "Conditions", icon: AlertTriangle },
  { to: "/trades", label: "Trades", icon: HardHat },
  { to: "/areas", label: "Areas", icon: MapPin },
  { to: "/insights", label: "Guides", icon: House },
  { to: "/financing", label: "Financing", icon: Wallet },
];

/** Every project type we run, grouped by category — drives the scrolling pill rail. */
const PROJECT_GROUPS = PROJECT_CATEGORY_ORDER.map((category) => ({
  category,
  projects: PROJECT_INDEX.filter((project) => project.category === category),
})).filter((group) => group.projects.length > 0);

/** Routes where the public bottom bar would get in the way. */
const HIDDEN_PREFIXES = ["/admin", "/auth", "/login", "/dashboard"];

export function BottomNav() {
  const { pathname } = useLocation();
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  const activeService = pathname.startsWith("/services/")
    ? pathname.replace("/services/", "").split("/")[0]
    : null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {/* Auto-scrolling pill rail — every project type, locked to the bottom of the viewport. */}
      <div
        className="relative overflow-hidden border-t border-white/10 bg-[#182019]/92 backdrop-blur-md"
        aria-label="All LoveMeAfter project types"
      >
        <div className="flex items-center">
          <span className="z-10 hidden shrink-0 bg-[#182019] px-4 py-2 text-[10px] font-semibold tracking-[.16em] text-[#d5ec77] uppercase sm:block">
            All {PROJECT_INDEX_COUNT} services · V441
          </span>
          <div className="nav-pill-scroller min-w-0 flex-1 overflow-hidden">
            <div className="nav-pill-track flex w-max items-center py-2 pl-3">
              {[0, 1].map((pass) =>
                PROJECT_GROUPS.map(({ category, projects }) => (
                  <div key={`${category}-${pass}`} className="flex items-center">
                    <span className="mr-3 text-[10px] font-semibold tracking-[.14em] whitespace-nowrap text-[#d5ec77] uppercase">
                      {category}
                    </span>
                    {projects.map(({ slug, label }) => {
                      const active = activeService === slug;
                      return (
                        <Link
                          key={`${slug}-${pass}`}
                          to={`/services/${slug}`}
                          className={`mr-2 rounded-full border px-3 py-1.5 text-[11px] font-medium whitespace-nowrap transition ${
                            active
                              ? "border-[#d5ec77] bg-[#d5ec77] text-[#1d211d]"
                              : "border-white/20 bg-white/10 text-white/80 hover:border-[#d5ec77] hover:bg-[#d5ec77] hover:text-[#1d211d]"
                          }`}
                        >
                          {label}
                        </Link>
                      );
                    })}
                    <span
                      aria-hidden="true"
                      className="mr-3 h-4 w-px shrink-0 bg-white/20"
                    />
                  </div>
                )),
              )}
              {[0, 1].map((pass) => (
                <div key={`lenders-${pass}`} className="flex items-center gap-2 pr-3">
                  <span className="mr-1 text-[10px] font-semibold tracking-[.14em] whitespace-nowrap text-[#d5ec77] uppercase">Financing partners</span>
                  {LENDERS.map(({ name, detail, tone, surface }) => (
                    <Link
                      key={`${name}-${pass}`}
                      to="/financing"
                      aria-label={`${name}, ${detail}`}
                      className={`mr-1.5 flex min-h-[43px] shrink-0 flex-col justify-center rounded-2xl border border-white/35 px-3 py-1.5 leading-tight transition hover:-translate-y-0.5 hover:border-[#d5ec77] ${surface}`}
                    >
                      <span className={`text-[11px] font-bold tracking-[-.02em] ${tone}`}>{name}</span>
                      <span className="mt-0.5 max-w-[170px] text-[8px] font-semibold tracking-[.01em] text-[#5d665e]">{detail}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#182019] to-transparent" />
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
