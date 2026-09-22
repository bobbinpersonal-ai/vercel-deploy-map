import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
  Fence,
  House,
  Heart,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";


const PHONE_DISPLAY = "424 426 0760";
const PHONE_HREF = "tel:+14244260760";

const SERVICES = [
  { title: "Roofing", detail: "Repair, replacement & storm damage", icon: House },
  { title: "Windows", detail: "Energy-efficient comfort, installed right", icon: Sparkles },
  { title: "Siding", detail: "Durable protection with a clean finish", icon: ShieldCheck },
  { title: "Gutters", detail: "Seamless drainage that protects your home", icon: Fence },
];

const SERVICE_ESTIMATES: Record<string, number> = {
  Roofing: 15000,
  Windows: 20000,
  Siding: 25000,
  Gutters: 5000,
};

const FAQS = [
  ["Is the estimate really free?", "Yes. We provide a no-obligation inspection, a written scope, and a clear price before you decide to move forward."],
  ["How quickly can someone come out?", "We offer same-day callbacks in our active markets and work hard to schedule inspections around your calendar."],
  ["Are your crews insured?", "Every crew is checked for current insurance, registration, references, and the local requirements that apply to your project."],
  ["Do you work with insurance claims?", "We document storm damage and can meet your adjuster. We are not public insurance adjusters and will never promise to waive your deductible."],
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [cityStateZip, setCityStateZip] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const scrollToEstimate = () => document.getElementById("estimate-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  const goToEstimate = () => scrollToEstimate();
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

  useEffect(() => {
    const previous = document.title;
    document.title = "LoveMeAfter | Home improvement, without the runaround";
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-[#1d211d]">
      <header className="absolute inset-x-0 top-0 z-50 text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-black text-white"><Heart className="size-5 fill-current" strokeWidth={2.5} /></span>
            <span className="text-lg font-semibold tracking-[-0.03em]">LoveMeAfter</span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-white/75 md:flex">
            <Link to="/services" className="transition-colors hover:text-white">Services</Link>
            <Link to="/areas" className="transition-colors hover:text-white">Service areas</Link>
            <Link to="/insights" className="transition-colors hover:text-white">Expert guides</Link>
            <Link to="/financing" className="transition-colors hover:text-white">Financing</Link>
            <Link to="/contractors" className="transition-colors hover:text-white">Work with us</Link>
            <a href={PHONE_HREF} className="flex items-center gap-2 text-white"><Phone className="size-4" /> {PHONE_DISPLAY}</a>
            <Button onClick={goToEstimate} className="rounded-full bg-[#d5ec77] px-5 text-[#1d211d] hover:bg-[#e1f895]">Get an estimate <ArrowUpRight className="ml-1 size-4" /></Button>
          </div>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="md:hidden"><Menu className="size-6" /></button>
        </nav>
        {menuOpen && (
          <div className="absolute inset-x-4 top-20 rounded-2xl bg-[#182019] p-5 shadow-2xl md:hidden">
            <button onClick={() => setMenuOpen(false)} className="absolute right-4 top-4"><X className="size-5" /></button>
            <div className="flex flex-col gap-5 pt-4 text-sm"><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link><Link to="/areas" onClick={() => setMenuOpen(false)}>Service areas</Link><Link to="/insights" onClick={() => setMenuOpen(false)}>Expert guides</Link><Link to="/financing" onClick={() => setMenuOpen(false)}>Financing</Link><Link to="/contractors" onClick={() => setMenuOpen(false)}>Work with us</Link><a href={PHONE_HREF}>Call {PHONE_DISPLAY}</a><Button onClick={goToEstimate} className="rounded-full bg-[#d5ec77] text-[#1d211d]">Get an estimate</Button></div>
          </div>
        )}
      </header>

      <section id="top" className="relative isolate min-h-[730px] bg-transparent text-white">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,22,16,.95)_0%,rgba(15,22,16,.73)_46%,rgba(15,22,16,.15)_100%),url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-[center_65%]" />
        <div className={`fixed inset-0 z-0 overflow-hidden bg-[#182019] pointer-events-none transition-opacity duration-500 ${videoPlaying ? "opacity-100" : "opacity-0"}`}>
          <video
            className="pointer-events-none size-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            poster="https://images.unsplash.com/photo-1503387762-59230de8b0d6?auto=format&fit=crop&w=1800&q=90"
            disablePictureInPicture
            aria-label="LoveMeAfter home improvement project video"
            onCanPlay={(event) => {
              event.currentTarget.muted = true;
              void event.currentTarget.play().catch(() => undefined);
            }}
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
          >
            <source src="/copy_5E397E73-24D9-4597-8204-60EA4CE89EDD.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,22,16,.64)_0%,rgba(15,22,16,.34)_46%,rgba(15,22,16,.06)_100%)]" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:pb-28 lg:pt-48">
          <div className="max-w-2xl">
            <div className="mb-7 flex items-center gap-2 text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase"><span className="size-2 rounded-full bg-[#d5ec77]" /> Free estimates · same-day callback</div>
            <h1 className="text-5xl leading-[.96] font-semibold tracking-[-.06em] sm:text-7xl lg:text-[6.4rem]">Make home feel <span className="text-[#d5ec77]">right again.</span></h1>
            <p className="mt-8 max-w-lg text-lg leading-8 text-white/72">Roofing, windows, siding, gutters and more — clearly explained, carefully scoped, and built around the way you want your home to feel.</p>
            <div className="mt-10 flex flex-wrap gap-3"><Button onClick={goToEstimate} className="h-14 rounded-full bg-[#d5ec77] px-7 text-base font-semibold text-[#1d211d] hover:bg-[#e1f895]">Start with a free estimate <ArrowUpRight className="ml-2 size-5" /></Button><a href={PHONE_HREF} className="flex h-14 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-medium hover:bg-white/10"><Phone className="size-4" /> Talk to a human</a></div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/75"><span className="flex items-center gap-2"><Check className="size-4 text-[#d5ec77]" /> No obligation</span><span className="flex items-center gap-2"><Check className="size-4 text-[#d5ec77]" /> Written scope</span><span className="flex items-center gap-2"><Check className="size-4 text-[#d5ec77]" /> 10-year workmanship warranty</span></div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .15 }} className="self-end rounded-3xl border border-white/40 bg-[#182019]/22 p-6 text-white shadow-2xl backdrop-blur-[3px] sm:p-8 lg:mb-1">
            <div className="flex items-start justify-between"><div><p className="text-xs font-semibold tracking-[.16em] text-[#d5ec77] uppercase">YOUR FIRST STEP · 30 SECONDS</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.05em]">Tell us what needs doing.</h2></div><span className="flex size-11 items-center justify-center rounded-full bg-[#d5ec77] text-[#1d211d]"><ArrowUpRight className="size-5" /></span></div>
            <p className="mt-4 text-sm leading-6 text-white/78">A few details helps us make your callback useful — not a sales pitch.</p>
            {submitted ? (
              <div className="mt-7 rounded-2xl border border-[#d5ec77]/45 bg-[#d5ec77]/14 p-5 text-sm leading-6 text-white backdrop-blur-[2px]">
                <p className="font-semibold text-white">Thanks — your estimate request is in.</p>
                <p className="mt-1">A LoveMeAfter coordinator will call you back the same day in active markets.</p>
              </div>
            ) : (
              <form id="estimate-form" onSubmit={async (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); try { await addDoc(collection(db, "leads"), { name: String(data.get("name") ?? ""), phone: String(data.get("phone") ?? ""), address: String(data.get("address") ?? ""), city: String(data.get("cityStateZip") ?? ""), service: String(data.get("service") ?? "Not sure yet"), estimatedValue: SERVICE_ESTIMATES[String(data.get("service"))] ?? 15000, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), stage: "new", source: "inbound_web" }); setSubmitted(true); } catch { setLocationStatus("We couldn't submit your request. Please call us at 424 426 0760."); } }} className="mt-7 space-y-3">
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
                  <select name="service" aria-label="Service needed" className="h-14 w-full rounded-xl border border-white/55 bg-white/28 px-4 text-sm font-medium text-white outline-none backdrop-blur-[2px] transition focus:border-[#d5ec77] focus:bg-white/38 focus:ring-2 focus:ring-[#d5ec77]/35">{SERVICES.map((service) => <option key={service.title}>{service.title}</option>)}<option>Not sure yet</option></select>
                </div>
                {locationStatus && <p className="flex items-start gap-2 text-xs leading-5 text-[#d5ec77]"><MapPin className="mt-0.5 size-3.5 shrink-0" />{locationStatus}</p>}
                <Button type="submit" className="h-14 w-full rounded-xl bg-[#1d211d] text-sm font-semibold text-white hover:bg-[#30382f]">Request my callback <ChevronRight className="ml-1 size-4" /></Button>
              </form>
            )}
            <p className="mt-4 text-center text-xs text-white/65">Free estimate · no obligation · same-day callback in active markets</p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-b border-[#1d211d]/10 bg-[#eaf0d0]/62 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:px-10"><div><p className="text-3xl font-semibold tracking-[-.05em]">4 services</p><p className="mt-1 text-sm text-[#65705e]">Roofing · siding · windows · gutters</p></div><div><p className="text-3xl font-semibold tracking-[-.05em]">Same-day</p><p className="mt-1 text-sm text-[#65705e]">Callback in active markets</p></div><div><p className="text-3xl font-semibold tracking-[-.05em]">10 years</p><p className="mt-1 text-sm text-[#65705e]">Minimum workmanship warranty</p></div></div>
      </section>

      <section className="relative z-10 border-b border-[#1d211d]/10 bg-white/68 backdrop-blur-sm"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold tracking-[.18em] text-[#71803d] uppercase">Financing available</p><p className="mt-2 text-base text-[#596357]">Compare competitive APR options from recognized lending partners.</p></div><Link to="/financing" className="inline-flex items-center text-sm font-semibold text-[#71803d]">View financing options <ArrowUpRight className="ml-1 size-4" /></Link></div><div className="flex flex-wrap items-center gap-x-8 gap-y-5 text-xl font-bold tracking-[-.03em] sm:text-2xl"><span className="text-[#1d5d8f]">LightStream</span><span className="bg-gradient-to-r from-[#183a8c] via-[#d64545] to-[#183a8c] bg-clip-text font-extrabold text-transparent">DONALD TRUMP</span><span className="text-[#151515]">SoFi</span><span className="text-[#167b68]">LendingPoint</span><span className="text-[#d26c2e]">Best Egg</span><span className="text-[#5b3a94]">Upgrade</span><span className="text-[#007c83]">Prosper</span><span className="text-[#1f4d7a]">OneMain Financial</span><span className="text-[#23677c]">Axos Bank</span></div></div></section>

      <section className="relative z-10 bg-[#f7f5f0]/64 backdrop-blur-sm"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Built for the real world</p><h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">From first inspection to final detail.</h2></div><p className="max-w-xl text-lg leading-8 text-[#62695f]">See the kind of work we help homeowners plan: durable materials, careful prep, and a finish that makes the whole property feel looked after.</p></div><div className="mt-14 grid gap-4 md:grid-cols-3"><div className="group overflow-hidden rounded-2xl bg-[#1d211d] text-white"><div className="h-64 bg-[url('https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1000&q=85')] bg-cover bg-center transition duration-500 group-hover:scale-105" /><div className="p-6"><p className="text-xs font-semibold tracking-[.15em] text-[#d5ec77] uppercase">01 · Roofline</p><h3 className="mt-3 text-xl font-semibold">Protection that starts overhead.</h3></div></div><div className="group overflow-hidden rounded-2xl bg-[#1d211d] text-white"><div className="h-64 bg-[url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85')] bg-cover bg-center transition duration-500 group-hover:scale-105" /><div className="p-6"><p className="text-xs font-semibold tracking-[.15em] text-[#d5ec77] uppercase">02 · Exterior</p><h3 className="mt-3 text-xl font-semibold">A better envelope for every season.</h3></div></div><div className="group overflow-hidden rounded-2xl bg-[#1d211d] text-white"><div className="h-64 bg-[url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85')] bg-cover bg-center transition duration-500 group-hover:scale-105" /><div className="p-6"><p className="text-xs font-semibold tracking-[.15em] text-[#d5ec77] uppercase">03 · Finish</p><h3 className="mt-3 text-xl font-semibold">Details that hold up close.</h3></div></div></div></div></section>

      <section id="process" className="relative z-10 bg-[#1d211d]/78 text-white backdrop-blur-sm"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">How it works</p><h2 className="mt-4 max-w-md text-4xl font-semibold leading-[1] tracking-[-.055em] sm:text-6xl">No runaround. Just a clear next step.</h2></div><div className="grid gap-8 sm:grid-cols-2">{[["01", "Tell us what needs doing", "Thirty seconds and a ZIP code. We check we're working near you before we take anything else."], ["02", "Get a real number", "We walk the house, photograph what we find, and give you a written scope — not a vague range."], ["03", "Meet your crew", "Local, insured and checked against the requirements that apply to your county and project."], ["04", "Choose with confidence", "You decide, or you don't. No obligation, no pressure, and nobody chases you if the answer is no."]].map(([number, title, text]) => <div key={number} className="border-t border-white/20 pt-5"><span className="text-sm font-semibold text-[#d5ec77]">{number}</span><h3 className="mt-5 text-xl font-semibold tracking-[-.03em]">{title}</h3><p className="mt-3 text-sm leading-6 text-white/75">{text}</p></div>)}</div></div></div></section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 bg-[#f7f5f0]/68 px-5 py-24 text-[#1d211d] backdrop-blur-sm sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-32"><div><p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">A better standard</p><h2 className="mt-4 text-4xl font-semibold leading-[1] tracking-[-.055em] sm:text-6xl">The details are the difference.</h2><p className="mt-6 max-w-md text-lg leading-8 text-[#596357]">We built LoveMeAfter around the parts homeowners usually have to chase: a callback, a real scope, proof of insurance, and someone accountable when the work is done.</p><Button onClick={goToEstimate} className="mt-8 rounded-full bg-[#1d211d] px-6 text-white hover:bg-[#30382f]">Start with a free estimate <ArrowUpRight className="ml-1 size-4" /></Button></div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#eaf0d0] p-7"><BadgeCheck className="size-6 text-[#71803d]" /><h3 className="mt-10 text-xl font-semibold">Crews we actually check</h3><p className="mt-2 text-sm leading-6 text-[#65705e]">Insurance, registration, references, and the local requirements that apply.</p></div><div className="rounded-2xl bg-[#ece9e0] p-7"><ClipboardCheck className="size-6 text-[#71803d]" /><h3 className="mt-10 text-xl font-semibold">A written scope</h3><p className="mt-2 text-sm leading-6 text-[#65705e]">Know what is included, what can wait, and what the work will actually cost.</p></div><div className="rounded-2xl bg-[#1d211d] p-7 text-white sm:col-span-2"><CircleDollarSign className="size-6 text-[#d5ec77]" /><h3 className="mt-10 text-xl font-semibold">No surprise fees, no pressure</h3><p className="mt-2 max-w-lg text-sm leading-6 text-white/75">The estimate is free. The decision stays yours. We earn the job by being clear enough to trust.</p></div></div></section>

      <section id="questions" className="relative z-10 border-y border-[#1d211d]/10 bg-[#ece9e0]/64 backdrop-blur-sm"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-32"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Good questions</p><h2 className="mt-4 text-4xl font-semibold leading-[1] tracking-[-.055em] sm:text-6xl">Before you invite us over.</h2></div><Accordion type="single" collapsible>{FAQS.map(([question, answer]) => <AccordionItem key={question} value={question} className="border-[#1d211d]/15"><AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">{question}</AccordionTrigger><AccordionContent className="max-w-xl pb-6 text-base leading-7 text-[#62695f]">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <section className="relative z-10 bg-[#d5ec77]/76 backdrop-blur-sm"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-10 lg:py-20"><div><p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Ready when you are</p><h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">Find out what it actually costs.</h2></div><div className="flex flex-wrap gap-3"><Button onClick={goToEstimate} className="h-14 rounded-full bg-[#1d211d] px-7 text-base text-white hover:bg-[#30382f]">Get my free estimate <ArrowUpRight className="ml-2 size-5" /></Button><a href={PHONE_HREF} className="flex h-14 items-center gap-2 rounded-full border border-[#1d211d]/25 px-6 text-sm font-semibold hover:bg-white/20"><Phone className="size-4" /> {PHONE_DISPLAY}</a></div></div></section>

      <footer className="relative z-10 bg-[#1d211d]/88 text-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 text-sm sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"><a href="#top" className="flex items-center gap-3 font-semibold"><span className="flex size-8 items-center justify-center rounded-full bg-black text-white"><Heart className="size-4 fill-current" /></span>LoveMeAfter</a><div className="flex flex-wrap gap-4 text-white/45"><p>Free estimates · same-day callback · clear scopes · built for clarity</p><Link to="/careers" className="text-[#d5ec77]">Careers</Link><Link to="/contractors" className="text-[#d5ec77]">Contractor partners</Link></div><a href={PHONE_HREF} className="font-medium text-[#d5ec77]">{PHONE_DISPLAY}</a></div></footer>
    </main>
  );
}
