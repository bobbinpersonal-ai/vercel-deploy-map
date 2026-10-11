import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { LogoMark } from "@/components/Logo";

export const PHONE_DISPLAY = "(424) 426-0760";
export const PHONE_HREF = "tel:+14244260760";

const LINKS = [
  ["/services/mowing", "Mowing"],
  ["/services/fertilization", "Fertilization"],
  ["/services/weed-control", "Weed control"],
  ["/areas/texas/dallas", "Service areas"],
] as const;

export function TopNav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const quotePath = pathname.startsWith("/es") ? "/get-quote" : "/get-quote";

  return (
    <header className="sticky top-0 z-40 border-b border-[#1c2620]/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link to={pathname.startsWith("/es") ? "/es" : "/"} className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <LogoMark className="size-9 shrink-0" />
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-[-.02em] text-[#14372a]">LoveMeAfter</span>
            <span className="block text-[10px] font-semibold tracking-[.16em] text-[#2f8f5b] uppercase">Lawn Care · Texas</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-semibold text-[#1c2620] lg:flex">
          {LINKS.map(([to, label]) => (
            <Link key={to} to={to} className="transition hover:text-[#175a3b]">{label}</Link>
          ))}
          <Link to={quotePath} className="rounded-md bg-[#175a3b] px-4 py-2 text-white transition hover:bg-[#14502f]">Get My Price</Link>
          <a href={PHONE_HREF} className="flex items-center gap-2 text-[#175a3b]">
            <Phone className="size-4" />{PHONE_DISPLAY}
          </a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={PHONE_HREF} className="flex items-center gap-1.5 rounded-md bg-[#175a3b] px-3 py-2 text-sm font-semibold text-white">
            <Phone className="size-4" />Call
          </a>
          <button type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)} className="rounded-md p-2 text-[#14372a] hover:bg-[#eaf2ed]">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-[#1c2620]/10 bg-white px-5 pb-5 pt-3 lg:hidden">
          <div className="flex flex-col gap-1 text-sm font-semibold text-[#1c2620]">
            {LINKS.map(([to, label]) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="rounded-md px-2 py-2.5 hover:bg-[#eaf2ed]">{label}</Link>
            ))}
            <Link to={quotePath} onClick={() => setMenuOpen(false)} className="mt-2 rounded-md bg-[#175a3b] px-4 py-3 text-center text-white">Get My Price</Link>
            <a href={PHONE_HREF} onClick={() => setMenuOpen(false)} className="rounded-md px-2 py-2.5 text-[#175a3b] hover:bg-[#eaf2ed]">Call {PHONE_DISPLAY}</a>
          </div>
        </div>
      )}
    </header>
  );
}
