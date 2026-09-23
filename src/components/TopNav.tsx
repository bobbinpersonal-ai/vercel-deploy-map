import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Logo } from "@/components/Logo";

const PHONE_DISPLAY = "424 426 0760";
const PHONE_HREF = "tel:+14244260760";
const HIDDEN_PREFIXES = ["/admin", "/auth", "/login", "/dashboard"];

export function TopNav() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setVisible(window.scrollY / maxScroll < 0.3);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  if (pathname === "/" || HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  const links = [
    ["/services", "Services"],
    ["/areas", "Service areas"],
    ["/insights", "Expert guides"],
    ["/conditions", "Field conditions"],
    ["/trades", "Trade network"],
    ["/financing", "Financing"],
  ] as const;

  return (
    <header className={`fixed inset-x-0 top-0 z-[45] text-white transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}>
      <div className="absolute inset-0 -z-10 border-b border-white/10 bg-[#182019]/82 shadow-[0_8px_32px_rgba(0,0,0,.24)] backdrop-blur-md" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <Logo tone="light" compact={false} className="gap-2" />
        </Link>
        <div className="hidden items-center gap-6 text-sm text-white/75 lg:flex">
          {links.map(([to, label]) => <Link key={to} to={to} className="transition hover:text-white">{label}</Link>)}
          <Link to="/contractors" className="transition hover:text-white">Work with us</Link>
          <a href={PHONE_HREF} className="flex items-center gap-2 text-white"><Phone className="size-4" />{PHONE_DISPLAY}</a>
          <Link to="/#estimate-form" className="flex items-center gap-1.5 rounded-full bg-[#d5ec77] px-4 py-2 font-semibold text-[#1d211d] hover:bg-[#e1f895]">Estimate <ArrowUpRight className="size-3.5" /></Link>
        </div>
        <button type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)} className="rounded-full p-2 hover:bg-white/10 lg:hidden">
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {menuOpen && <div className="mx-4 mb-3 rounded-2xl border border-white/10 bg-[#182019] p-5 shadow-2xl lg:hidden"><div className="flex flex-col gap-4 text-sm">{links.map(([to, label]) => <Link key={to} to={to} onClick={() => setMenuOpen(false)}>{label}</Link>)}<Link to="/contractors" onClick={() => setMenuOpen(false)}>Work with us</Link><a href={PHONE_HREF}>Call {PHONE_DISPLAY}</a><Link to="/#estimate-form" onClick={() => setMenuOpen(false)} className="rounded-full bg-[#d5ec77] px-4 py-3 text-center font-semibold text-[#1d211d]">Get an estimate</Link></div></div>}
    </header>
  );
}
