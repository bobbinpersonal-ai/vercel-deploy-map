import { Phone } from "lucide-react";
import { Link } from "react-router";
import { LogoMark } from "@/components/Logo";
import { PHONE_DISPLAY, PHONE_HREF } from "@/components/TopNav";

const CITIES = [
  ["dallas", "Dallas"],
  ["fort-worth", "Fort Worth"],
  ["arlington", "Arlington"],
  ["plano", "Plano"],
  ["garland", "Garland"],
  ["irving", "Irving"],
] as const;

export function SiteFooter({ spanish = false }: { spanish?: boolean }) {
  return (
    <footer className="border-t border-white/10 bg-[#14372a] pb-24 text-white lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link to={spanish ? "/es" : "/"} className="flex items-center gap-2.5">
            <LogoMark className="size-9" />
            <span className="text-base font-extrabold tracking-[-.02em]">LoveMeAfter Lawn Care</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
            {spanish
              ? "Cortamos, fertilizamos y controlamos malezas en Dallas–Fort Worth. Trabajos puntuales a precios claros."
              : "Mowing, fertilization, and weed control across Dallas–Fort Worth. One-time jobs at clear, firm prices."}
          </p>
          <a href={PHONE_HREF} className="mt-4 inline-flex items-center gap-2 text-lg font-bold">
            <Phone className="size-4" />{PHONE_DISPLAY}
          </a>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-[.18em] text-white/55 uppercase">{spanish ? "Servicios" : "Services"}</p>
          <ul className="mt-4 space-y-2.5 text-sm font-medium">
            <li><Link to={spanish ? "/es/corte-de-cesped" : "/services/mowing"} className="text-white/85 hover:text-white">{spanish ? "Corte de césped" : "Mowing"}</Link></li>
            <li><Link to={spanish ? "/es/fertilizacion" : "/services/fertilization"} className="text-white/85 hover:text-white">{spanish ? "Fertilización" : "Fertilization"}</Link></li>
            <li><Link to={spanish ? "/es/control-de-malezas" : "/services/weed-control"} className="text-white/85 hover:text-white">{spanish ? "Control de malezas" : "Weed control"}</Link></li>
            <li><Link to="/get-quote" className="text-white/85 hover:text-white">{spanish ? "Pedir precio" : "Get My Price"}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-[.18em] text-white/55 uppercase">{spanish ? "Áreas de servicio" : "Service areas"}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm font-medium">
            {CITIES.map(([slug, name]) => (
              <li key={slug}><Link to={`/areas/texas/${slug}`} className="text-white/85 hover:text-white">{name}</Link></li>
            ))}
          </ul>
          <div className="mt-5 flex gap-4 text-sm">
            <Link to="/privacy" className="text-white/70 underline underline-offset-4 hover:text-white">{spanish ? "Privacidad" : "Privacy"}</Link>
            <Link to="/terms" className="text-white/70 underline underline-offset-4 hover:text-white">{spanish ? "Términos" : "Terms"}</Link>
            <Link to={spanish ? "/" : "/es"} className="text-white/70 underline underline-offset-4 hover:text-white">{spanish ? "English" : "Español"}</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 pb-6 text-center text-xs text-white/55">
        © {new Date().getFullYear()} LoveMeAfter Lawn Care · {spanish ? "Dallas–Fort Worth, Texas" : "Dallas–Fort Worth, Texas"}
      </div>
    </footer>
  );
}
