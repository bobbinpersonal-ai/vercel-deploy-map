import { Logo } from "@/components/Logo";
import { AlertTriangle, ArrowUpRight, HardHat, House, MapPin, Phone, Wallet, Wrench } from "lucide-react";
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

/** Routes where the public bottom bar would get in the way. */
const HIDDEN_PREFIXES = ["/admin", "/auth", "/login", "/dashboard"];

export function BottomNav() {
  const { pathname } = useLocation();
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 backdrop-blur-md">
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
  );
}
