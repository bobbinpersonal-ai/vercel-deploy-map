import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, trackEvent } from "@/lib/firebase";
import { usePageMeta } from "@/components/PageMeta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  CalendarDays,
  Fence,
  House,
  MapPin,
  Menu,
  Paintbrush,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ExpertTopic } from "@/components/ExpertTopic";
import { Logo } from "@/components/Logo";
import { DAMAGE_PHOTOS, JOBSITE_PHOTOS, WORKER_PHOTOS, px } from "@/data/photos";
import { PROJECT_INDEX_COUNT } from "@/data/project-index";
import { RoiBarChart } from "@/components/GeneratedGraphics";
import { InteractiveHouseMap } from "@/components/InteractiveHouseMap";
import { FinancingShowcase } from "@/components/FinancingShowcase";
import { LeadershipSchedule } from "@/components/LeadershipSchedule";
import { HomeImprovementProcess } from "@/components/HomeImprovementProcess";
import { ManufacturerShowcase } from "@/components/ManufacturerShowcase";
import { BrandPillsShowcase } from "@/components/BrandPillsShowcase";

/** Real product photography shown on the homepage, grouped by the trade. */
const PRODUCT_STRIP: [string, string, number][] = [
  ["Kitchen", "Cabinetry", 8146322],
  ["Kitchen", "Sink & faucet", 19836790],
  ["Kitchen", "Countertop", 18285887],
  ["Kitchen", "Tile backsplash", 7173661],
  ["Bath", "Vanity & mirror", 27629440],
  ["Bath", "Shower", 30629679],
  ["Bath", "Wall tile", 10486084],
  ["Interior", "Interior door", 11231039],
  ["Interior", "Baseboard & casing", 9036949],
  ["Interior", "Hardwood flooring", 326862],
  ["Interior", "Painted wall", 5583052],
  ["Interior", "Closet system", 36730419],
  ["Exterior", "Roof shingles", 4334097],
  ["Exterior", "Siding", 7475555],
  ["Exterior", "Entry door", 16254509],
  ["Exterior", "Window frame", 2290609],
  ["Exterior", "Garage door", 34711989],
  ["Property", "Fence & gate", 30573147],
  ["Property", "Decking", 33017851],
  ["Property", "Paver patio", 10855255],
  ["Property", "Paving", 6333640],
  ["Property", "Lawn & edging", 7031581],
  ["Systems", "Condenser unit", 18725613],
  ["Systems", "Furnace", 36788832],
  ["Systems", "Water heater", 34593293],
  ["Systems", "Breaker panel", 5767595],
  ["Systems", "Attic insulation", 8082327],
  ["Systems", "Solar array", 38021376],
];


const PHONE_DISPLAY = "424 426 0760";
const PHONE_HREF = "tel:+14244260760";
/** Look up a verified photo id from the curated library by its label. */
const photoId = (library: [string, number][], label: string) =>
  library.find(([name]) => name === label)?.[1] ?? 12314551;

/** Financing partners: [lender, brand tone, one-line detail]. */
const LENDERS: [string, string, string][] = [
  ["LightStream", "text-[#1d5d8f]", "Fixed-rate home improvement loans"],
  ["SoFi", "text-[#151515]", "Financing for larger projects"],
  ["LendingPoint", "text-[#167b68]", "Flexible credit options"],
  ["Best Egg", "text-[#d26c2e]", "Home improvement financing"],
  ["Upgrade", "text-[#5b3a94]", "One fixed monthly payment"],
  ["Prosper", "text-[#007c83]", "Personal loans for projects"],
  ["OneMain Financial", "text-[#1f4d7a]", "Branch-supported loan options"],
  ["Axos Bank", "text-[#23677c]", "Home improvement loans"],
];

const SERVICES = [
  { title: "Roofing", slug: "roofing", detail: "Repair, replacement, ventilation & storm damage", icon: House },
  { title: "Windows & doors", slug: "windows", detail: "Comfort, security, glass, entry & garage doors", icon: Sparkles },
  { title: "Siding & exterior", slug: "siding", detail: "Vinyl, fiber cement, trim, fascia & soffit", icon: ShieldCheck },
  { title: "Gutters & drainage", slug: "gutters", detail: "Seamless gutters, downspouts, grading & runoff", icon: Fence },
  { title: "Exterior painting", slug: "exterior-paint", detail: "Prep, repair, prime and finish coats", icon: Paintbrush },
  { title: "Fencing & gates", slug: "fencing", detail: "Privacy, picket, chain link, wood & access gates", icon: Fence },
  { title: "Driveways & paving", slug: "paving", detail: "Concrete, asphalt, pavers, walkways & repair", icon: Wrench },
  { title: "Concrete & masonry", slug: "concrete", detail: "Flatwork, patios, retaining walls & masonry", icon: House },
  { title: "Decks & porches", slug: "decks", detail: "Build, repair, stain, railings & outdoor living", icon: House },
  { title: "Kitchens", slug: "kitchens", detail: "Cabinets, counters, backsplashes, flooring & layout", icon: House },
  { title: "Bathrooms", slug: "bathrooms", detail: "Showers, tile, vanities, accessibility & finishes", icon: Sparkles },
  { title: "Basements & interiors", slug: "basements", detail: "Finishing, drywall, flooring, trim & storage", icon: House },
  { title: "Flooring & tile", slug: "flooring", detail: "Hardwood, LVP, carpet, tile and transitions", icon: Wrench },
  { title: "HVAC & comfort", slug: "hvac", detail: "Heating, cooling, ventilation and air quality", icon: Sparkles },
  { title: "Plumbing", slug: "plumbing", detail: "Repair, fixtures, water heaters and repipes", icon: Wrench },
  { title: "Electrical", slug: "electrical", detail: "Panels, outlets, generators, safety and upgrades", icon: Sparkles },
  { title: "Lighting", slug: "lighting", detail: "Interior, exterior, landscape, security and smart lighting", icon: Sparkles },
  { title: "Insulation & weatherization", slug: "insulation", detail: "Attic, crawlspace, air sealing and efficiency", icon: ShieldCheck },
  { title: "Landscaping & drainage", slug: "landscaping", detail: "Planting, grading, irrigation and water control", icon: Fence },
  { title: "Solar & backup power", slug: "solar", detail: "Solar coordination, batteries and generators", icon: Sparkles },
  { title: "Accessibility & aging-in-place", slug: "accessibility", detail: "Safer entries, bathrooms, rails and mobility", icon: ShieldCheck },
  { title: "Multi-trade renovations", slug: "multi-trade", detail: "One coordinated plan for complex home projects", icon: ClipboardCheck },
];

const SERVICE_ESTIMATES: Record<string, number> = {
  Roofing: 15000,
  Windows: 20000,
  Siding: 25000,
  Gutters: 5000,
  Lighting: 5000,
};

const FAQS = [
  ["Is the estimate really free?", "Yes. We provide a no-obligation inspection, a written scope, and a clear price before you decide to move forward."],
  ["How quickly can someone come out?", "We offer same-day callbacks in our active markets and work hard to schedule inspections around your calendar."],
  ["Are your crews insured?", "Every crew is checked for current insurance, registration, references, and the local requirements that apply to your project."],
  ["Do you work with insurance claims?", "We document storm damage and can meet your adjuster. We are not public insurance adjusters and will never promise to waive your deductible."],
  ["Do I have to pay for everything upfront?", "No. Many homeowners spread the cost with an optional home improvement loan from a recognized lender such as LightStream, SoFi, LendingPoint, Best Egg, Upgrade, Prosper, OneMain Financial, or Axos Bank. Approval, APR, term, and fees are set by the lender, and you can always pay with cash or your own financing instead."],
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [cityStateZip, setCityStateZip] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showTopNav, setShowTopNav] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Keep the hero video behavior stable: it is shown on mobile and not rendered visually on desktop.

  const [selectedProject, setSelectedProject] = useState("Roofing");
  const [scheduleOpen, setScheduleOpen] = useState(false);

  useEffect(() => {
    const updateTopNav = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setShowTopNav(window.scrollY / maxScroll < 0.3);
    };
    updateTopNav();
    window.addEventListener("scroll", updateTopNav, { passive: true });
    window.addEventListener("resize", updateTopNav);
    return () => {
      window.removeEventListener("scroll", updateTopNav);
      window.removeEventListener("resize", updateTopNav);
    };
  }, []);

  useEffect(() => {
    if (!scheduleOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [scheduleOpen]);

  const playHeroVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
  };

  const scrollToEstimate = () => {
    void trackEvent("estimate_cta_clicked", { placement: "landing_page" });
    document.getElementById("estimate-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const goToEstimate = () => scrollToEstimate();
  const goToSchedule = () => {
    void trackEvent("design_consultation_calendar_opened", { placement: "landing_page" });
    setScheduleOpen(true);
  };
  const locateMe = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is unavailable in this browser. Enter your address manually.");
      return;
    }
    setLocationStatus("Finding your address…");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${coords.latitude}&lon=${coords.longitude}`,
          );
          if (!response.ok) throw new Error("Address lookup failed");
          const result = await response.json() as { display_name?: string; address?: Record<string, string> };
          const parts = result.address ?? {};
          const street = [parts.house_number, parts.road].filter(Boolean).join(" ");
          const city = parts.city ?? parts.town ?? parts.village ?? parts.hamlet ?? "";
          const region = [city, parts.state, parts.postcode].filter(Boolean).join(", ");
          if (street) setAddress(street);
          if (region) setCityStateZip(region);
          setLocationStatus(street || region ? "Address found — please confirm it before submitting." : "We found your location, but not a street address. Please enter it manually.");
        } catch {
          setLocationStatus("We found your location, but couldn't fill the address. Please enter it manually.");
        }
      },
      () => setLocationStatus("We couldn't access your location. You can enter your address manually."),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  };

  usePageMeta(
    "LoveMeAfter | Home improvement, without the runaround",
    "Roofing, siding, windows, gutters, paint, paving, fencing, kitchens and more — one coordinated crew network across 17 states. Free written estimate.",
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-[#1d211d]">
      <header className={`fixed inset-x-0 top-0 z-50 text-white transition-all duration-500 ${showTopNav ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}>
        <div className="absolute inset-0 -z-10 border-b border-white/10 bg-[#182019]/82 shadow-[0_8px_32px_rgba(0,0,0,.24)] backdrop-blur-md" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

          <a href="#top" className="flex items-center gap-3">
            <Logo tone="light" compact={false} className="gap-2" />
          </a>
          <div className="hidden items-center gap-5 text-sm whitespace-nowrap text-white/75 xl:flex">
            <Link to="/services" className="transition-colors hover:text-white">Services</Link>
            <Link to="/areas" className="transition-colors hover:text-white">Service areas</Link>
            <Link to="/insights" className="transition-colors hover:text-white">Expert guides</Link>
            <Link to="/financing" className="transition-colors hover:text-white">Financing</Link>
            <Link to="/contractors" className="transition-colors hover:text-white">Work with us</Link>
            <Link to="/login" className="transition-colors hover:text-white">Team login</Link>
            <a href={PHONE_HREF} className="flex items-center gap-2 text-white"><Phone className="size-4" /> {PHONE_DISPLAY}</a>
            <Button onClick={goToEstimate} className="rounded-full bg-[#d5ec77] px-5 text-[#1d211d] hover:bg-[#e1f895]">Get an estimate <ArrowUpRight className="ml-1 size-4" /></Button>
          </div>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="xl:hidden"><Menu className="size-6" /></button>
        </nav>
        {menuOpen && (
          <div className="absolute inset-x-4 top-20 rounded-2xl bg-[#182019] p-5 shadow-2xl xl:hidden">
            <button onClick={() => setMenuOpen(false)} className="absolute right-4 top-4"><X className="size-5" /></button>
            <div className="flex flex-col gap-5 pt-4 text-sm"><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link><Link to="/areas" onClick={() => setMenuOpen(false)}>Service areas</Link><Link to="/insights" onClick={() => setMenuOpen(false)}>Expert guides</Link><Link to="/conditions" onClick={() => setMenuOpen(false)}>Field conditions</Link><Link to="/trades" onClick={() => setMenuOpen(false)}>Trade network</Link><Link to="/financing" onClick={() => setMenuOpen(false)}>Financing</Link><Link to="/contractors" onClick={() => setMenuOpen(false)}>Work with us</Link><Link to="/login" onClick={() => setMenuOpen(false)}>Team login</Link><a href={PHONE_HREF}>Call {PHONE_DISPLAY}</a><Button onClick={goToEstimate} className="rounded-full bg-[#d5ec77] text-[#1d211d]">Get an estimate</Button></div>
          </div>
        )}
      </header>

      {scheduleOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-[#0f1610]/75 px-4 py-6 backdrop-blur-sm sm:items-center sm:px-6 sm:py-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="design-consultation-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setScheduleOpen(false);
          }}
        >
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setScheduleOpen(false)}
              className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full border border-[#1d211d]/10 bg-white text-[#1d211d] shadow-lg transition hover:bg-[#eaf0d0]"
              aria-label="Close in-person design consultation calendar"
            >
              <X className="size-5" />
            </button>
            <div id="design-consultation-modal-title" className="sr-only">Book an in-person design consultation</div>
            <LeadershipSchedule />
          </div>
        </div>
      )}

      <section id="top" className="relative isolate min-h-[730px] bg-transparent text-white">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,22,16,.95)_0%,rgba(15,22,16,.73)_46%,rgba(15,22,16,.15)_100%),url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-[center_65%]" />
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#182019] pointer-events-none">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4913326/pexels-photo-4913326.jpeg?auto=compress&cs=tinysrgb&w=2200')] bg-cover bg-center"
          />
          <video
            ref={videoRef}
            className="pointer-events-auto size-full object-cover object-center opacity-100 md:hidden"
            autoPlay
            muted
            src="/copy_5E397E73-24D9-4597-8204-60EA4CE89EDD.mp4"
            loop
            playsInline
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
            poster="https://images.pexels.com/photos/4913326/pexels-photo-4913326.jpeg?auto=compress&cs=tinysrgb&w=2200"
            aria-label="LoveMeAfter home improvement project video"
            onLoadedData={(event) => {
              event.currentTarget.muted = true;
              void event.currentTarget.play().then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
            }}
            onCanPlay={(event) => {
              event.currentTarget.muted = true;
              void event.currentTarget.play().then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
            }}
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            onError={() => setVideoPlaying(false)}
          />
          {!videoPlaying && (
            <button
              type="button"
              onClick={playHeroVideo}
              className="pointer-events-auto absolute bottom-24 left-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#182019]/85 px-4 py-3 text-xs font-semibold text-white shadow-xl backdrop-blur-md md:hidden"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-[#d5ec77] text-[#182019]">▶</span>
              Play project video
            </button>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,22,16,.64)_0%,rgba(15,22,16,.34)_46%,rgba(15,22,16,.06)_100%)]" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:pb-28 lg:pt-48">
          <div className="max-w-2xl">
            <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase"><span className="size-2 rounded-full bg-[#d5ec77]" /> Free estimates · same-day callback</div>
            <h1 className="text-5xl leading-[.96] font-semibold tracking-[-.06em] sm:text-7xl lg:text-[6.4rem]">Make home feel <span className="text-[#d5ec77]">right again.</span></h1>
            <p className="mt-8 max-w-lg text-lg leading-8 text-white/72">Roofing, windows, siding, gutters and more — clearly explained, carefully scoped, and built around the way you want your home to feel.</p>
            <div className="mt-10 flex flex-wrap gap-3"><Button onClick={goToEstimate} className="h-14 rounded-full bg-[#d5ec77] px-7 text-base font-semibold text-[#1d211d] hover:bg-[#e1f895]">Start with a free estimate <ArrowUpRight className="ml-2 size-5" /></Button><button onClick={goToSchedule} className="flex h-14 items-center gap-2 rounded-full border border-white/35 px-6 text-sm font-medium hover:bg-white/10"><CalendarDays className="size-4" /> Book an in-person design consultation</button><a href={PHONE_HREF} className="flex h-14 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-medium hover:bg-white/10"><Phone className="size-4" /> Talk to a human</a></div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/75"><span className="flex items-center gap-2"><Check className="size-4 text-[#d5ec77]" /> No obligation</span><span className="flex items-center gap-2"><Check className="size-4 text-[#d5ec77]" /> Written scope</span><span className="flex items-center gap-2"><Check className="size-4 text-[#d5ec77]" /> 10-year workmanship warranty</span></div>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-white/30 bg-[#141b15]/55 px-4 py-3 backdrop-blur-md">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[.16em] text-[#d5ec77] uppercase"><CircleDollarSign className="size-4" /> Financing available</span>
              <span className="max-w-md text-xs leading-5 text-white/85">Spread the cost instead of paying it all at once — compare options from recognized home improvement lenders.</span>
              <Link to="/financing" className="text-xs font-semibold text-[#d5ec77] underline underline-offset-4">See lenders <ArrowUpRight className="ml-0.5 inline size-3.5" /></Link>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .15 }} className="self-end rounded-3xl border border-white/40 bg-[#182019]/22 p-6 text-white shadow-2xl backdrop-blur-[3px] sm:p-8 lg:mb-1">
            <div className="flex items-start justify-between"><div><p className="text-xs font-semibold tracking-[.16em] text-[#d5ec77] uppercase">YOUR FIRST STEP · 30 SECONDS</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.05em]">Tell us what needs doing.</h2></div><span className="flex size-11 items-center justify-center rounded-full bg-[#d5ec77] text-[#1d211d]"><ArrowUpRight className="size-5" /></span></div>
            <p className="mt-4 text-sm leading-6 text-white/78">A few details helps our inside sales team make your scheduled callback useful — not a sales pitch.</p>
            {submitted ? (
              <div className="mt-7 rounded-2xl border border-[#d5ec77]/45 bg-[#d5ec77]/14 p-5 text-sm leading-6 text-white backdrop-blur-[2px]">
                <p className="font-semibold text-white">Thanks — your estimate request is in.</p>
                <p className="mt-1">A LoveMeAfter coordinator will call you back the same day in active markets.</p>
              </div>
            ) : (
              <form id="estimate-form" onSubmit={async (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); try { await addDoc(collection(db, "leads"), { name: String(data.get("name") ?? ""), phone: String(data.get("phone") ?? ""), address: String(data.get("address") ?? ""), city: String(data.get("cityStateZip") ?? ""), service: String(data.get("service") ?? "Not sure yet"), estimatedValue: SERVICE_ESTIMATES[String(data.get("service"))] ?? 15000, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), stage: "new", source: "inbound_scheduled_intake" }); void trackEvent("estimate_request_submitted", { service: String(data.get("service") ?? "Not sure yet"), source: "inbound_scheduled_intake" }); setSubmitted(true); } catch { setLocationStatus("We couldn't submit your request. Please call us at 424 426 0760."); } }} className="mt-7 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="name" required placeholder="Full name" aria-label="Full name" className="h-14 w-full rounded-xl border border-white/55 bg-white/28 px-4 text-sm font-medium text-white outline-none backdrop-blur-[2px] transition placeholder:text-white/80 focus:border-[#d5ec77] focus:bg-white/38 focus:ring-2 focus:ring-[#d5ec77]/35" />
                  <input name="phone" required type="tel" placeholder="Phone number" aria-label="Phone number" className="h-14 w-full rounded-xl border border-white/55 bg-white/28 px-4 text-sm font-medium text-white outline-none backdrop-blur-[2px] transition placeholder:text-white/80 focus:border-[#d5ec77] focus:bg-white/38 focus:ring-2 focus:ring-[#d5ec77]/35" />
                </div>
                <div className="flex gap-2">
                  <input name="address" required value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street address" aria-label="Street address" className="h-14 min-w-0 flex-1 rounded-xl border border-white/55 bg-white/28 px-4 text-sm font-medium text-white outline-none backdrop-blur-[2px] transition placeholder:text-white/80 focus:border-[#d5ec77] focus:bg-white/38 focus:ring-2 focus:ring-[#d5ec77]/35" />
                  <button type="button" onClick={locateMe} aria-label="Locate me" className="flex h-14 shrink-0 items-center gap-2 rounded-xl border border-white/55 bg-white/18 px-3 text-xs font-semibold text-white backdrop-blur-[2px] transition hover:border-[#d5ec77] hover:bg-white/28" title="Use my location"><MapPin className="size-4" /> <span className="hidden sm:inline">Locate me</span></button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="cityStateZip" required value={cityStateZip} onChange={(event) => setCityStateZip(event.target.value)} placeholder="City, state & ZIP" aria-label="City, state and ZIP" className="h-14 w-full rounded-xl border border-white/55 bg-white/28 px-4 text-sm font-medium text-white outline-none backdrop-blur-[2px] transition placeholder:text-white/80 focus:border-[#d5ec77] focus:bg-white/38 focus:ring-2 focus:ring-[#d5ec77]/35" />
                  <select name="service" aria-label="Service needed" value={selectedProject} onChange={(event) => setSelectedProject(event.target.value)} className="h-14 w-full rounded-xl border border-white/55 bg-white/28 px-4 text-sm font-medium text-white outline-none backdrop-blur-[2px] transition focus:border-[#d5ec77] focus:bg-white/38 focus:ring-2 focus:ring-[#d5ec77]/35">{SERVICES.map((service) => <option key={service.title}>{service.title}</option>)}<option>Not sure yet</option></select>
                </div>
                {locationStatus && <p className="flex items-start gap-2 text-xs leading-5 text-[#d5ec77]"><MapPin className="mt-0.5 size-3.5 shrink-0" />{locationStatus}</p>}
                <div className="grid gap-2 sm:grid-cols-2"><Button type="submit" className="h-14 rounded-xl bg-[#1d211d] text-sm font-semibold text-white hover:bg-[#30382f]">Request my inside-sales callback <ChevronRight className="ml-1 size-4" /></Button><button type="button" onClick={goToSchedule} className="flex h-14 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 text-sm font-semibold text-white transition hover:border-[#d5ec77] hover:bg-white/20"><CalendarDays className="size-4" /> Book in-person design consultation</button></div>
              </form>
            )}
            <p className="mt-4 text-center text-xs text-white/65">Free estimate · inbound scheduled intake call · no obligation</p>
          </motion.div>
        </div>
      </section>

      <section className="video-through-section relative z-10 bg-[#f7f5f0]/64 backdrop-blur-sm"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:items-end"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Built for the real world</p><h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">From first inspection to final detail.</h2></div><p className="max-w-xl text-lg leading-8 text-[#62695f]">See the kind of work we help homeowners plan: durable materials, careful prep, and a finish that makes the whole property feel looked after.</p></div><div className="mt-14 grid gap-4 md:grid-cols-3"><div className="group overflow-hidden rounded-2xl bg-[#1d211d] text-white"><div className="h-64 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${px(237907, 1000)})` }} /><div className="p-6"><p className="text-xs font-semibold tracking-[.15em] text-[#d5ec77] uppercase">01 · Roofline</p><h3 className="mt-3 text-xl font-semibold">Protection that starts overhead.</h3></div></div><div className="group overflow-hidden rounded-2xl bg-[#1d211d] text-white"><div className="h-64 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${px(39281193, 1000)})` }} /><div className="p-6"><p className="text-xs font-semibold tracking-[.15em] text-[#d5ec77] uppercase">02 · Exterior</p><h3 className="mt-3 text-xl font-semibold">A better envelope for every season.</h3></div></div><div className="group overflow-hidden rounded-2xl bg-[#1d211d] text-white"><div className="h-64 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${px(9036949, 1000)})` }} /><div className="p-6"><p className="text-xs font-semibold tracking-[.15em] text-[#d5ec77] uppercase">03 · Finish</p><h3 className="mt-3 text-xl font-semibold">Details that hold up close.</h3></div></div></div></div></section>

      <section className="video-through-section relative z-10 border-b border-[#1d211d]/10 bg-[#eaf0d0]/62 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div><p className="text-3xl font-semibold tracking-[-.05em]">{PROJECT_INDEX_COUNT} project types</p><p className="mt-1 text-sm text-[#65705e]">Exterior · interior · systems · property</p></div>
            <div><p className="text-3xl font-semibold tracking-[-.05em]">Same-day</p><p className="mt-1 text-sm text-[#65705e]">Callback in active markets</p></div>
            <div><p className="text-3xl font-semibold tracking-[-.05em]">10 years</p><p className="mt-1 text-sm text-[#65705e]">Minimum workmanship warranty</p></div>
          </div>
          <div className="mt-7 border-t border-[#1d211d]/12 pt-6">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold tracking-[.18em] text-[#71803d] uppercase">Financing available · start now, pay over time</p>
                <p className="mt-1 max-w-2xl text-sm text-[#596357]">A project does not have to drain your savings in a single month. Compare APR, term, and monthly payment options from recognized home improvement lenders — start the work now and pay it down over time.</p>
              </div>
              <Link to="/financing" className="inline-flex shrink-0 items-center text-sm font-semibold text-[#71803d]">View financing options <ArrowUpRight className="ml-1 size-4" /></Link>
            </div>
            <div className="-mx-5 mt-4 sm:-mx-8 lg:-mx-10">
              <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:px-8 lg:px-10 [&::-webkit-scrollbar]:hidden">
                {LENDERS.map(([name, tone, detail]) => (
                  <Link
                    key={name}
                    to="/financing"
                    aria-label={`${name}, home improvement lender`}
                    className="flex min-h-[68px] w-[215px] shrink-0 snap-start flex-col justify-center rounded-2xl border border-[#1d211d]/12 bg-white/85 px-4 py-2.5 transition hover:-translate-y-0.5 hover:border-[#71803d]"
                  >
                    <span className={`text-base font-bold tracking-[-.03em] ${tone}`}>{name}</span>
                    <span className="mt-0.5 text-[10px] font-bold tracking-[.12em] text-[#71803d] uppercase">Home improvement lender</span>
                    <span className="mt-0.5 text-[11px] leading-4 text-[#697568]">{detail}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-3 flex flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                <p className="text-[11px] text-[#7a8377]">Swipe for all partners · financing subject to lender approval</p>
                <Link to="/financing" className="inline-flex shrink-0 items-center text-xs font-semibold text-[#71803d]">Check my financing options <ArrowUpRight className="ml-1 size-3.5" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#f7f5f0] px-5 py-8 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><FinancingShowcase project="the project that matters to you" /></div></section>

      <section className="video-through-section relative z-10 border-y border-[#1d211d]/10 bg-[#f7f5f0]/88 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">The return you notice every day</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">A better home should make ordinary life easier.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#596357]">The best project is not the one with the fanciest finish. It is the one that solves the annoyance you have been tolerating, protects what you own, and still makes sense when you look at the numbers.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Quieter rooms", "Well-specified windows, doors, insulation, and weather sealing can soften street noise, barking dogs, HVAC hum, and the temperature swings that make bedrooms hard to live in."],
                ["Privacy that works", "A properly planned fence, gate, window treatment, or landscape screen gives you a backyard you can actually use without feeling on display."],
                ["A safer envelope", "Roofing, flashing, gutters, siding, and drainage work together to move water away from the structure before a stain becomes rot, mold, or a larger repair."],
                ["Security with less friction", "Solid entry points, working locks, good lighting, clear sightlines, and a garage that closes correctly reduce the small vulnerabilities that keep homeowners uneasy."],
                ["Light where it matters", "Layered interior, exterior, landscape, and security lighting can make stairs, entries, kitchens, patios, and walkways more useful after sunset—not just brighter."],
                ["Less maintenance", "Durable finishes, correct prep, accessible shutoffs, efficient systems, and a clean written scope mean fewer repeat fixes and fewer weekends spent chasing a problem."],
              ].map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-[#1d211d]/10 bg-white/80 p-5">
                  <h3 className="text-lg font-semibold tracking-[-.02em]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#62695f]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-[#71803d]/25 bg-[#eaf0d0] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="max-w-2xl text-sm leading-6 text-[#4f5a4d]"><strong className="text-[#1d211d]">The honest test:</strong> can you explain what changes, why it changes, what it costs, and what happens if you wait? That is what the inspection and written scope are for.</p>
            <button onClick={goToEstimate} className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#1d211d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#30382f]">Talk through my priorities <ArrowUpRight className="ml-2 size-4" /></button>
          </div>
        </div>
      </section>

      <section className="video-through-section relative z-10 border-b border-[#1d211d]/10 bg-[#f7f5f0]/80 backdrop-blur-sm"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10"><div className="grid gap-10 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:items-end"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Your project, clarified</p><h2 className="mt-4 max-w-md text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-5xl">Start with the right next step.</h2><p className="mt-5 max-w-md text-base leading-7 text-[#62695f]">Pick the part of your home you are thinking about. We will use it to shape a more useful first conversation — not a generic sales call.</p></div><div className="relative min-w-0"><div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-color:#71803d_transparent] sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">{SERVICES.map(({ title, slug, detail, icon: Icon }, index) => <div key={title} className={`flex min-h-[210px] w-[245px] shrink-0 snap-start flex-col rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-[#71803d] sm:w-[265px] ${selectedProject === title ? "border-[#71803d] bg-[#eaf0d0]" : "border-[#1d211d]/12 bg-white/60"}`}><button onClick={() => { setSelectedProject(title); void trackEvent("project_interest_selected", { service: title }); scrollToEstimate(); }} className="flex flex-1 flex-col text-left"><div className="flex items-start justify-between gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-[#eaf0d0] text-[#71803d]"><Icon className="size-4" /></span><span className="text-xs font-semibold text-[#a0a89d]">{String(index + 1).padStart(2, "0")}</span></div><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#62695f]">{detail}</p><p className="mt-4 text-[10px] font-semibold tracking-[.12em] text-[#71803d] uppercase">{selectedProject === title ? "Selected · " : "Explore · "}Get a free estimate</p></button><Link to={`/services/${slug}`} className="mt-4 inline-flex items-center border-t border-[#1d211d]/10 pt-4 text-[10px] font-semibold tracking-[.12em] text-[#71803d] uppercase transition hover:text-[#4f5a2f]">Read the full guide <ArrowUpRight className="ml-1 size-3.5" /></Link></div>)}</div><div className="mt-3 flex items-center justify-between text-xs text-[#7b8578]"><span>Swipe or scroll to explore featured project types · all {PROJECT_INDEX_COUNT} services are in the catalog</span><span className="hidden font-semibold text-[#71803d] sm:inline">More projects →</span></div></div></div></div></section>


      <section className="video-through-section relative z-10 border-b border-[#1d211d]/10 bg-[#eaf0d0]/72 backdrop-blur-sm"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">What we actually install</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[.96] tracking-[-.055em] sm:text-5xl">Real products, not a mood board.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-[#596357]">Cabinets, sinks, counters, tile, doors, windows, roofing, siding, paving, fencing, HVAC, and solar. Swipe through the materials and fixtures behind every scope we write.</p></div><Link to="/services" className="inline-flex shrink-0 items-center text-sm font-semibold text-[#71803d]">See every project type <ArrowUpRight className="ml-1 size-4" /></Link></div><div className="-mx-5 mt-10 flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-color:#71803d_transparent] sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">{PRODUCT_STRIP.map(([group, label, id]) => <figure key={label} className="group w-[190px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#1d211d]/10 bg-white sm:w-[210px]"><div className="h-40 bg-cover bg-center transition duration-700 group-hover:scale-[1.05]" style={{ backgroundImage: `url(${px(id, 700)})` }} /><figcaption className="p-4"><p className="text-[10px] font-semibold tracking-[.12em] text-[#9aa095] uppercase">{group}</p><p className="mt-1 text-sm font-semibold">{label}</p></figcaption></figure>)}</div><p className="mt-4 text-xs leading-5 text-[#71803d]">Swipe or scroll for more project materials.</p></div></section>


      <section className="video-through-section relative z-10 border-y border-[#1d211d]/10 bg-[#182019]/88 text-white backdrop-blur-sm"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">What we actually find</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[.96] tracking-[-.055em] sm:text-5xl">Storm damage, rot, mold, and failed work.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/70">Half of this business is seeing what other people missed or covered up. Here is the kind of condition our crews document before anyone writes a scope.</p></div><Link to="/conditions" className="inline-flex shrink-0 items-center text-sm font-semibold text-[#d5ec77]">Open the field conditions library <ArrowUpRight className="ml-1 size-4" /></Link></div><div className="mt-10 grid auto-rows-[96px] grid-cols-2 gap-3 sm:auto-rows-[118px] sm:grid-cols-4">{DAMAGE_PHOTOS.slice(0, 10).map(([label, id], index) => <figure key={label} className={`group relative overflow-hidden rounded-2xl bg-[#101510] ${index === 0 || index === 6 ? "col-span-2 row-span-2" : index === 3 ? "col-span-2" : ""}`}><div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${px(id, 700)})` }} /><div className="absolute inset-0 bg-gradient-to-t from-[#0f1610]/85 via-transparent to-transparent" /><figcaption className="absolute inset-x-0 bottom-0 p-3 text-[11px] font-semibold text-white">{label}</figcaption></figure>)}</div><div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start"><p className="text-xs leading-5 text-white/55">Field condition examples help explain what an inspection may uncover. Your home gets its own photos and written scope.</p><RoiBarChart title="What deferring a repair typically costs" unit="×" data={[{ label: "Caught during inspection", value: 1 }, { label: "One wet season later", value: 3 }, { label: "Once water reaches the interior", value: 6 }, { label: "Structure stays wet", value: 11 }]} /></div></div></section>

      <BrandPillsShowcase />
      <HomeImprovementProcess />

      <section className="video-through-section relative z-10 mx-auto grid max-w-7xl gap-12 bg-[#f7f5f0]/68 px-5 py-24 text-[#1d211d] backdrop-blur-sm sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-32"><div><p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">A better standard</p><h2 className="mt-4 text-4xl font-semibold leading-[1] tracking-[-.055em] sm:text-6xl">The details are the difference.</h2><p className="mt-6 max-w-md text-lg leading-8 text-[#596357]">We built LoveMeAfter around the parts homeowners usually have to chase: a callback, a real scope, proof of insurance, and someone accountable when the work is done.</p><Button onClick={goToEstimate} className="mt-8 rounded-full bg-[#1d211d] px-6 text-white hover:bg-[#30382f]">Start with a free estimate <ArrowUpRight className="ml-1 size-4" /></Button></div><div className="grid gap-3 sm:grid-cols-2"><div className="overflow-hidden rounded-2xl bg-[#eaf0d0]"><div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${px(photoId(WORKER_PHOTOS, "Foreman on site"), 900)})` }} /><div className="p-7"><BadgeCheck className="size-6 text-[#71803d]" /><h3 className="mt-6 text-xl font-semibold">Crews we actually check</h3><p className="mt-2 text-sm leading-6 text-[#65705e]">Before a crew touches your home we verify insurance, registration, references, and the local requirements that apply — and we keep the paperwork on file.</p></div></div><div className="overflow-hidden rounded-2xl bg-[#ece9e0]"><div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${px(photoId(JOBSITE_PHOTOS, "Inspection checklist"), 900)})` }} /><div className="p-7"><ClipboardCheck className="size-6 text-[#71803d]" /><h3 className="mt-6 text-xl font-semibold">A written scope</h3><p className="mt-2 text-sm leading-6 text-[#65705e]">You get the inspection photos, what is included, what can wait, and what the work will actually cost — in writing, before you commit to anything.</p></div></div><div className="rounded-2xl bg-[#1d211d] p-7 text-white sm:col-span-2"><CircleDollarSign className="size-6 text-[#d5ec77]" /><h3 className="mt-10 text-xl font-semibold">No surprise fees, no pressure</h3><p className="mt-2 max-w-lg text-sm leading-6 text-white/75">The estimate is free. The decision stays yours — pay in full, or spread the cost with an optional home improvement loan from a recognized lender. We earn the job by being clear enough to trust.</p><Link to="/financing" className="mt-4 inline-flex items-center text-xs font-semibold text-[#d5ec77]">Compare lender options <ArrowUpRight className="ml-1 size-3.5" /></Link></div></div></section>

      <section id="home-value" className="video-through-section relative z-10 border-y border-[#1d211d]/10 bg-[#f1f4e7] backdrop-blur-sm"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">The homeowner investment brief</p><h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[.96] tracking-[-.055em] sm:text-6xl">Your home is where you live — and one of your biggest assets.</h2><p className="mt-6 max-w-xl text-base leading-7 text-[#596357]">The right improvement can move four dials at once: protection, everyday quality of life, buyer confidence, and long-term wealth. We help you see the trade-offs before you spend.</p></div><div className="rounded-2xl bg-[#1d211d] p-7 text-white sm:p-8"><div className="flex items-center gap-3 text-[#d5ec77]"><CircleDollarSign className="size-5" /><p className="text-xs font-semibold tracking-[.16em] uppercase">National benchmark, not a promise</p></div><p className="mt-5 text-2xl font-semibold tracking-[-.03em]">Exterior work often earns its keep first.</p><p className="mt-3 text-sm leading-6 text-white/68">Zonda’s 2025 Cost vs. Value report compares standardized projects in 119 U.S. markets. Local costs, scope, condition, and timing still decide your result.</p></div></div><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[["Garage door", "268%", "$4,672 typical cost", "Curb appeal + function", "Often the strongest resale benchmark in the 2025 national report."], ["Steel entry door", "216%", "$2,435 typical cost", "First impression + security", "A small, visible upgrade can influence buyer confidence."], ["Vinyl siding", "96.5%", "$17,950 typical cost", "Weather barrier + curb appeal", "Strong resale recovery when the full installation scope is included."], ["Asphalt roof", "68%", "$31,871 typical cost", "Protection + insurability", "The value is also the damage you may prevent by staying ahead of failure."]].map(([title, returnRate, cost, outcome, note]) => <article key={title} className="rounded-2xl border border-[#1d211d]/10 bg-white p-6"><p className="text-xs font-semibold tracking-[.14em] text-[#71803d] uppercase">{title}</p><p className="mt-5 text-4xl font-semibold tracking-[-.06em]">{returnRate}</p><p className="mt-1 text-xs font-medium text-[#7a8377]">cost recouped at resale</p><div className="mt-5 border-t border-[#1d211d]/10 pt-4"><p className="text-sm font-semibold">{cost}</p><p className="mt-1 text-sm text-[#596357]">{outcome}</p><p className="mt-4 text-xs leading-5 text-[#7a8377]">{note}</p></div></article>)}</div><div className="mt-10 grid gap-4 lg:grid-cols-3"><div className="rounded-2xl bg-[#dce8b0] p-6"><ShieldCheck className="size-5 text-[#71803d]" /><h3 className="mt-6 text-xl font-semibold">Protect your equity</h3><p className="mt-2 text-sm leading-6 text-[#596357]">Water, roof, drainage, and envelope work can prevent a small defect from becoming a larger loss.</p></div><div className="rounded-2xl bg-[#ebe8dc] p-6"><Sparkles className="size-5 text-[#71803d]" /><h3 className="mt-6 text-xl font-semibold">Upgrade daily life</h3><p className="mt-2 text-sm leading-6 text-[#596357]">Quiet rooms, steady temperatures, better light, lower maintenance, and a home that feels good to return to are real returns too.</p></div><div className="rounded-2xl bg-[#e5eee7] p-6"><BadgeCheck className="size-5 text-[#71803d]" /><h3 className="mt-6 text-xl font-semibold">Make the sale easier</h3><p className="mt-2 text-sm leading-6 text-[#596357]">A documented, well-maintained exterior gives buyers fewer reasons to discount the home or ask for concessions.</p></div></div><div className="mt-10 flex flex-col gap-4 border-t border-[#1d211d]/10 pt-6 text-xs leading-5 text-[#687265] sm:flex-row sm:items-start sm:justify-between"><p className="max-w-3xl"><strong>How to read this:</strong> the percentages are national averages from Zonda/JLC’s 2025 Cost vs. Value report, based on defined project specifications. They are not an appraisal, quote, guarantee, or promise of resale profit. NAR’s 2025 Remodeling Impact research also measures homeowner satisfaction and cost recovery — proof that value is financial and personal.</p><a className="shrink-0 font-semibold text-[#71803d] underline underline-offset-4" href="https://zondahome.com/2025-cost-vs-value-report/" target="_blank" rel="noreferrer">See the source report <ArrowUpRight className="ml-1 inline size-3.5" /></a></div></div></section>\n\n      <ExpertTopic />

      <section id="questions" className="relative z-10 border-y border-[#1d211d]/10 bg-[#ece9e0]/64 backdrop-blur-sm"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-32"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Good questions</p><h2 className="mt-4 text-4xl font-semibold leading-[1] tracking-[-.055em] sm:text-6xl">Before you invite us over.</h2></div><Accordion type="single" collapsible>{FAQS.map(([question, answer]) => <AccordionItem key={question} value={question} className="border-[#1d211d]/15"><AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">{question}</AccordionTrigger><AccordionContent className="max-w-xl pb-6 text-base leading-7 text-[#62695f]">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <section className="relative z-10 bg-[#f7f5f0] px-5 py-8 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><LeadershipSchedule /></div></section>

      <section className="video-through-section relative z-10 border-y border-[#1d211d]/10 bg-[#eaf0d0]/72 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mb-12 grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">Explore by place</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">See the project where it lives.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#596357]">Tap the roof, front door, garage, patio, backyard or HVAC area. Each hotspot opens a useful project preview, then takes homeowners to the full guide.</p>
          </div>
          <InteractiveHouseMap />
        </div>
      </section>

      <section className="relative z-10 bg-[#d5ec77]/76 backdrop-blur-sm"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-10 lg:py-20"><div><p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Ready when you are</p><h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">Find out what it actually costs.</h2></div><div className="flex flex-wrap gap-3"><Button onClick={goToEstimate} className="h-14 rounded-full bg-[#1d211d] px-7 text-base text-white hover:bg-[#30382f]">Get my free estimate <ArrowUpRight className="ml-2 size-5" /></Button><a href={PHONE_HREF} className="flex h-14 items-center gap-2 rounded-full border border-[#1d211d]/25 px-6 text-sm font-semibold hover:bg-white/20"><Phone className="size-4" /> {PHONE_DISPLAY}</a></div></div></section>

      <footer className="relative z-10 bg-[#1d211d]/88 text-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 text-sm sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"><a href="#top" className="flex items-center"><Logo tone="light" compact={false} className="gap-2" /></a><div className="flex flex-wrap gap-4 text-white/45"><p>Free estimates · same-day callback · clear scopes · built for clarity</p><Link to="/conditions" className="text-[#d5ec77]">Field conditions</Link><Link to="/trades" className="text-[#d5ec77]">Trade network</Link><Link to="/careers" className="text-[#d5ec77]">Careers</Link><Link to="/contractors" className="text-[#d5ec77]">Contractor partners</Link></div><a href={PHONE_HREF} className="font-medium text-[#d5ec77]">{PHONE_DISPLAY}</a></div></footer>
    </main>
  );
}
