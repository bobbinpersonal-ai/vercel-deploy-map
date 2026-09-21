import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, Compass, GitBranch, Layers3, LogOut, MapPin, Minus, Plus, Rocket, Search, Settings2 } from "lucide-react";
import { useAction } from "convex/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const places = [
  { name: "North Reach", type: "Production", detail: "Main site · live", x: "22%", y: "25%", color: "#ba7657" },
  { name: "East Field", type: "Preview", detail: "Staging · 2 changes", x: "72%", y: "35%", color: "#759386" },
  { name: "The Lowlands", type: "Branch", detail: "Design system", x: "49%", y: "70%", color: "#c49b60" },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(places[0]);
  const [deployed, setDeployed] = useState(false);
  const deploy = useAction(api.vercel.deploy);

  const handleDeploy = async () => {
    setDeployed(true);
    try {
      await deploy({});
      toast.success("Deployment queued", { description: "North Reach will update when the build is ready." });
    } catch (error) {
      toast.error("Deployment could not start", {
        description: error instanceof Error ? error.message : "Check your Vercel connection.",
      });
    } finally {
      setDeployed(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-[#f3f0e9] text-[#252523]">
      <header className="flex h-[76px] items-center justify-between border-b border-[#252523]/10 px-5 sm:px-8">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase">
          <span className="flex size-8 items-center justify-center rounded-full border border-[#252523]/25"><Compass className="size-4" strokeWidth={1.5} /></span>
          Atlas <span className="font-normal text-[#9b9990]">/ Studio</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[#9b9990] sm:block">{user?.email || "Your workspace"}</span>
          <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-[#6d6c67] hover:bg-[#e7e3d9] hover:text-[#252523]" aria-label="Sign out"><LogOut className="size-4" /></Button>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-76px)] lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-[#252523]/10 p-6 lg:flex lg:flex-col">
          <div className="mb-12">
            <p className="mb-4 text-[10px] font-semibold tracking-[0.2em] text-[#9b9990] uppercase">Workspace</p>
            <div className="flex items-center justify-between border-b border-[#252523]/15 pb-3 text-sm"><span>My territory</span><ChevronDown className="size-3.5 text-[#9b9990]" /></div>
          </div>
          <nav className="space-y-1 text-sm text-[#6d6c67]">
            <a className="flex items-center gap-3 rounded-sm bg-[#e7e3d9] px-3 py-2.5 text-[#252523]" href="#map"><MapPin className="size-4" strokeWidth={1.5} /> Map overview</a>
            <a className="flex items-center gap-3 px-3 py-2.5 hover:text-[#252523]" href="#layers"><Layers3 className="size-4" strokeWidth={1.5} /> Layers</a>
            <a className="flex items-center gap-3 px-3 py-2.5 hover:text-[#252523]" href="#settings"><Settings2 className="size-4" strokeWidth={1.5} /> Settings</a>
          </nav>
          <div className="mt-auto border-t border-[#252523]/10 pt-5 text-[11px] leading-5 text-[#9b9990]">Atlas is your calm center for shipping work that matters.</div>
        </aside>

        <section className="min-w-0 p-5 sm:p-8 lg:p-12" id="map">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-[#9b6b50] uppercase">Monday, 21 September 2026</p><h1 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">Your territory</h1></div>
            <div className="flex items-center gap-3"><div className="hidden items-center gap-2 border border-[#252523]/15 px-3 py-2 text-xs text-[#6d6c67] sm:flex"><Search className="size-3.5" /> Search places</div><Button onClick={handleDeploy} className="rounded-full bg-[#252523] px-5 text-xs font-medium tracking-[0.08em] text-[#f3f0e9] uppercase hover:bg-[#454541]">{deployed ? <><Check className="mr-2 size-3.5" />Queued</> : <><Rocket className="mr-2 size-3.5" />Deploy changes</>}</Button></div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_285px]">
            <div className="relative min-h-[560px] overflow-hidden border border-[#252523]/15 bg-[#e7e3d9] sm:min-h-[650px]">
              <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(#73756d_1px,transparent_1px),linear-gradient(90deg,#73756d_1px,transparent_1px)] [background-size:48px_48px]" />
              <svg className="absolute inset-0 size-full" viewBox="0 0 900 700" preserveAspectRatio="none" aria-hidden="true">
                <path d="M-30 183 C129 93 211 170 325 103 S545 71 654 145 S767 206 930 145 L930 435 C793 475 732 390 613 448 S369 506 238 412 S78 478 -30 400Z" fill="#b6c4b4" stroke="#62776b" strokeWidth="2" />
                <path d="M-30 480 C96 403 179 530 297 473 S502 425 627 496 S798 554 930 456 L930 730 L-30 730Z" fill="#d6bd87" stroke="#a48a5c" strokeWidth="2" />
                <path d="M100 0 C147 106 111 199 176 286 S278 411 236 700 M439 0 C379 149 463 223 404 343 S407 529 470 700 M686 0 C627 118 707 210 648 329 S717 533 685 700" fill="none" stroke="#8d8b7d" strokeDasharray="8 10" strokeWidth="2" opacity=".8" />
                <path d="M0 361 C150 322 223 373 336 345 S556 309 702 363 S814 382 900 352" fill="none" stroke="#f3f0e9" strokeWidth="8" opacity=".5" />
              </svg>
              <div className="absolute left-5 top-5 flex items-center gap-2 border border-[#252523]/15 bg-[#f3f0e9]/75 px-3 py-2 text-[10px] font-semibold tracking-[0.17em] text-[#6d6c67] uppercase backdrop-blur-sm"><MapPin className="size-3.5" /> Live map</div>
              {places.map((place) => <button key={place.name} onClick={() => setSelected(place)} className="absolute -translate-x-1/2 -translate-y-1/2 text-left" style={{ left: place.x, top: place.y }}><span className="block size-4 rounded-full border-2 border-[#f3f0e9] shadow-[0_0_0_5px_#f3f0e966] transition-transform hover:scale-125" style={{ backgroundColor: place.color }} /><span className="mt-3 block whitespace-nowrap text-[10px] font-semibold tracking-[0.15em] text-[#343631] uppercase">{place.name}</span></button>)}
              <div className="absolute bottom-5 left-5 text-[10px] leading-5 tracking-[0.14em] text-[#6d6c67] uppercase">43° 18' N<br />70° 41' W</div>
              <div className="absolute bottom-5 right-5 flex flex-col border border-[#252523]/15 bg-[#f3f0e9]/75 backdrop-blur-sm"><button className="p-2.5 hover:bg-[#e7e3d9]" aria-label="Zoom in"><Plus className="size-4" /></button><span className="h-px bg-[#252523]/15" /><button className="p-2.5 hover:bg-[#e7e3d9]" aria-label="Zoom out"><Minus className="size-4" /></button></div>
            </div>

            <AnimatePresence mode="wait"><motion.aside key={selected.name} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} className="border border-[#252523]/15 bg-[#ebe7de] p-6">
              <div className="mb-12 flex items-start justify-between"><span className="flex size-9 items-center justify-center rounded-full" style={{ backgroundColor: `${selected.color}33`, color: selected.color }}><MapPin className="size-4" /></span><span className="text-[10px] font-semibold tracking-[0.17em] text-[#9b9990] uppercase">Selected place</span></div>
              <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#9b6b50] uppercase">{selected.type}</p><h2 className="font-serif text-3xl tracking-[-0.03em]">{selected.name}</h2><p className="mt-3 text-sm text-[#6d6c67]">{selected.detail}</p>
              <div className="my-8 border-t border-[#252523]/15" /><div className="space-y-5 text-xs"><div className="flex justify-between"><span className="text-[#9b9990]">Last deployment</span><span>Today, 09:42</span></div><div className="flex justify-between"><span className="text-[#9b9990]">Branch</span><span className="flex items-center gap-1.5"><GitBranch className="size-3" /> main</span></div></div>
              <a href="#activity" className="mt-10 flex items-center justify-between border-t border-[#252523]/15 pt-4 text-xs font-medium hover:text-[#9b6b50]">View activity <ArrowUpRight className="size-4" /></a>
            </motion.aside></AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
