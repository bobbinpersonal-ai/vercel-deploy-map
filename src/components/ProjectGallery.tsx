import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export function ProjectGallery({ service, city, images }: { service: string; city: string; images: string[] }) {
  const before = images[0];
  const after = images[1] ?? images[0];
  return <Link to={`/services/${service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="group rounded-2xl border border-[#1d211d]/10 bg-white p-3 transition hover:-translate-y-1"><div className="grid grid-cols-2 gap-2"><div><div className="h-36 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${before})` }} /><p className="mt-2 px-1 text-[10px] font-semibold tracking-[.12em] text-[#9aa095] uppercase">Scope context</p></div><div><div className="h-36 rounded-xl bg-cover bg-center transition group-hover:scale-[1.01]" style={{ backgroundImage: `url(${after})` }} /><p className="mt-2 px-1 text-[10px] font-semibold tracking-[.12em] text-[#71803d] uppercase">Finish direction</p></div></div><div className="px-2 pb-2 pt-4"><p className="text-xs font-semibold tracking-[.12em] text-[#87964b] uppercase">{city} · {service}</p><p className="mt-2 text-sm leading-5 text-[#62695f]">A visual starting point for discussing a {service.toLowerCase()} scope. The final recommendation is based on your home.</p><span className="mt-4 inline-flex items-center text-xs font-semibold text-[#71803d]">View process <ArrowUpRight className="ml-1 size-3.5" /></span></div></Link>;
}
