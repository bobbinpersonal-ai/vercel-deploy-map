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
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";


const PHONE_DISPLAY = "424 426 0760";
const PHONE_HREF = "tel:+14244260760";

const SERVICES = [
  { title: "Roofing", detail: "Repair, replacement & storm damage", icon: House },
  { title: "Windows", detail: "Energy-efficient comfort, installed right", icon: Sparkles },
  { title: "Siding", detail: "Durable protection with a clean finish", icon: ShieldCheck },
  { title: "Gutters", detail: "Seamless drainage that protects your home", icon: Fence },
];

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
            <span className="flex size-10 items-center justify-center rounded-full bg-[#d5ec77] text-[#1d211d]"><House className="size-5" strokeWidth={2.5} /></span>
            <span className="text-lg font-semibold tracking-[-0.03em]">LoveMeAfter</span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-white/75 md:flex">
            <a href="#services" className="transition-colors hover:text-white">What we do</a>
            <a href="#process" className="transition-colors hover:text-white">How it works</a>
            <a href="#questions" className="transition-colors hover:text-white">Questions</a>
            <a href="/careers" className="transition-colors hover:text-white">Sell with us</a>
            <a href={PHONE_HREF} className="flex items-center gap-2 text-white"><Phone className="size-4" /> {PHONE_DISPLAY}</a>
            <Button onClick={goToEstimate} className="rounded-full bg-[#d5ec77] px-5 text-[#1d211d] hover:bg-[#e1f895]">Get an estimate <ArrowUpRight className="ml-1 size-4" /></Button>
          </div>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="md:hidden"><Menu className="size-6" /></button>
        </nav>
        {menuOpen && (
          <div className="absolute inset-x-4 top-20 rounded-2xl bg-[#182019] p-5 shadow-2xl md:hidden">
            <button onClick={() => setMenuOpen(false)} className="absolute right-4 top-4"><X className="size-5" /></button>
            <div className="flex flex-col gap-5 pt-4 text-sm"><a href="#services" onClick={() => setMenuOpen(false)}>What we do</a><a href="#process" onClick={() => setMenuOpen(false)}>How it works</a><a href="#questions" onClick={() => setMenuOpen(false)}>Questions</a><a href="/careers" onClick={() => setMenuOpen(false)}>Sell with us</a><a href={PHONE_HREF}>Call {PHONE_DISPLAY}</a><Button onClick={goToEstimate} className="rounded-full bg-[#d5ec77] text-[#1d211d]">Get an estimate</Button></div>
          </div>
        )}
      </header>

      <section id="top" className="relative isolate min-h-[730px] bg-transparent text-white">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,22,16,.95)_0%,rgba(15,22,16,.73)_46%,rgba(15,22,16,.15)_100%),url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-[center_65%]" />
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#182019] pointer-events-none">
          <iframe
            title="LoveMeAfter home improvement video"
            src="https://drive.google.com/file/d/1rWNC8tGHEFP9cH9z2_kug3k87cuasV2k/preview?autoplay=1&mute=1"
            className="pointer-events-none size-full scale-[1.35] border-0 object-cover"
            allow="autoplay; fullscreen"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,22,16,.95)_0%,rgba(15,22,16,.73)_46%,rgba(15,22,16,.2)_100%)]" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:pb-28 lg:pt-48">
          <div className="max-w-2xl">
            <div className="mb-7 flex items-center gap-2 text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase"><span className="size-2 rounded-full bg-[#d5ec77]" /> Free estimates · same-day callback</div>
            <h1 className="text-5xl leading-[.96] font-semibold tracking-[-.06em] sm:text-7xl lg:text-[6.4rem]">Make home feel <span className="text-[#d5ec77]">right again.</span></h1>
            <p className="mt-8 max-w-lg text-lg leading-8 text-white/72">Roofing, windows, siding, gutters and more — priced clearly, installed by crews we actually check.</p>
            <div className="mt-10 flex flex-wrap gap-3"><Button onClick={goToEstimate} className="h-14 rounded-full bg-[#d5ec77] px-7 text-base font-semibold text-[#1d211d] hover:bg-[#e1f895]">Start with a free estimate <ArrowUpRight className="ml-2 size-5" /></Button><a href={PHONE_HREF} className="flex h-14 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-medium hover:bg-white/10"><Phone className="size-4" /> Talk to a human</a></div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/60"><span className="flex items-center gap-2"><Check className="size-4 text-[#d5ec77]" /> No obligation</span><span className="flex items-center gap-2"><Check className="size-4 text-[#d5ec77]" /> Written scope</span><span className="flex items-center gap-2"><Check className="size-4 text-[#d5ec77]" /> 10-year workmanship warranty</span></div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .15 }} className="self-end rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md sm:p-8 lg:mb-1">
            <div className="flex items-start justify-between"><div><p className="text-xs font-semibold tracking-[.16em] text-[#78834e] uppercase">Your first step</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.05em]">Tell us what needs doing.</h2></div><span className="flex size-11 items-center justify-center rounded-full bg-[#e8efc7]"><ArrowUpRight className="size-5" /></span></div>
            <p className="mt-4 text-sm leading-6 text-[#5f655d]">A few details helps us make your callback useful — not a sales pitch.</p>
            {submitted ? (
              <div className="mt-7 rounded-2xl bg-[#eaf0d0] p-5 text-sm leading-6 text-[#4f5d3b]">
                <p className="font-semibold text-[#1d211d]">Thanks — your estimate request is in.</p>
                <p className="mt-1">A LoveMeAfter coordinator will call you back the same day in active markets.</p>
              </div>
            ) : (
              <form id="estimate-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="mt-7 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="name" required placeholder="Full name" aria-label="Full name" className="h-14 w-full rounded-xl border border-white/25 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-[#d5ec77]" />
                  <input name="phone" required type="tel" placeholder="Phone number" aria-label="Phone number" className="h-14 w-full rounded-xl border border-white/25 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-[#d5ec77]" />
                </div>
                <div className="flex gap-2">
                  <input name="address" required value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street address" aria-label="Street address" className="h-14 min-w-0 flex-1 rounded-xl border border-[#d9ddd2] bg-white px-4 text-sm outline-none transition focus:border-[#8da044]" />
                  <button type="button" onClick={locateMe} aria-label="Locate me" className="flex h-14 shrink-0 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 text-xs font-semibold text-[#d5ec77] transition hover:border-[#d5ec77]" title="Use my location"><MapPin className="size-4" /> <span className="hidden sm:inline">Locate me</span></button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="cityStateZip" required value={cityStateZip} onChange={(event) => setCityStateZip(event.target.value)} placeholder="City, state & ZIP" aria-label="City, state and ZIP" className="h-14 w-full rounded-xl border border-white/25 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-[#d5ec77]" />
                  <select name="service" aria-label="Service needed" className="h-14 w-full rounded-xl border border-white/25 bg-white/10 px-4 text-sm text-white outline-none focus:border-[#d5ec77]">{SERVICES.map((service) => <option key={service.title}>{service.title}</option>)}<option>Not sure yet</option></select>
                </div>
                {locationStatus && <p className="flex items-start gap-2 text-xs leading-5 text-[#657035]"><MapPin className="mt-0.5 size-3.5 shrink-0" />{locationStatus}</p>}
                <Button type="submit" className="h-14 w-full rounded-xl bg-[#1d211d] text-sm font-semibold text-white hover:bg-[#30382f]">Request my callback <ChevronRight className="ml-1 size-4" /></Button>
              </form>
            )}
            <p className="mt-4 text-center text-xs text-[#7a8076]">Free estimate · no obligation · same-day callback in active markets</p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-b border-[#1d211d]/10 bg-[#eaf0d0]/88 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:px-10"><div><p className="text-3xl font-semibold tracking-[-.05em]">5 states</p><p className="mt-1 text-sm text-[#65705e]">Colorado, Missouri, Kansas, Indiana & Wyoming</p></div><div><p className="text-3xl font-semibold tracking-[-.05em]">Same-day</p><p className="mt-1 text-sm text-[#65705e]">Callback in active markets</p></div><div><p className="text-3xl font-semibold tracking-[-.05em]">10 years</p><p className="mt-1 text-sm text-[#65705e]">Minimum workmanship warranty</p></div></div>
      </section>

      <section id="services" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">The outside of your home</p><h2 className="mt-4 max-w-lg text-4xl font-semibold leading-[1] tracking-[-.055em] sm:text-6xl">Good work should feel simple.</h2></div><p className="max-w-xl text-lg leading-8 text-[#62695f]">One job or the whole exterior. We would rather price the lot, explain what matters, and tell you honestly what can wait.</p></div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{SERVICES.map((service, index) => { const Icon = service.icon; return <motion.div key={service.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="group rounded-2xl border border-[#1d211d]/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#9aaa55] hover:shadow-xl"><div className="flex items-start justify-between"><span className="flex size-12 items-center justify-center rounded-xl bg-[#edf2d7] text-[#71803d]"><Icon className="size-5" /></span><span className="text-xs text-[#a2a99e]">0{index + 1}</span></div><h3 className="mt-12 text-xl font-semibold tracking-[-.03em]">{service.title}</h3><p className="mt-2 text-sm leading-6 text-[#697068]">{service.detail}</p><ArrowUpRight className="mt-7 size-4 text-[#9aaa55] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></motion.div>; })}</div>
      </section>

      <section id="process" className="relative z-10 bg-[#1d211d]/92 text-white backdrop-blur-sm"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">How it works</p><h2 className="mt-4 max-w-md text-4xl font-semibold leading-[1] tracking-[-.055em] sm:text-6xl">No runaround. Just a clear next step.</h2></div><div className="grid gap-8 sm:grid-cols-2">{[["01", "Tell us what needs doing", "Thirty seconds and a ZIP code. We check we're working near you before we take anything else."], ["02", "Get a real number", "We walk the house, photograph what we find, and give you a written scope — not a vague range."], ["03", "Meet your crew", "Local, insured and checked against the requirements that apply to your county and project."], ["04", "Choose with confidence", "You decide, or you don't. No obligation, no pressure, and nobody chases you if the answer is no."]].map(([number, title, text]) => <div key={number} className="border-t border-white/20 pt-5"><span className="text-sm font-semibold text-[#d5ec77]">{number}</span><h3 className="mt-5 text-xl font-semibold tracking-[-.03em]">{title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{text}</p></div>)}</div></div></div></section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-32"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">A better standard</p><h2 className="mt-4 text-4xl font-semibold leading-[1] tracking-[-.055em] sm:text-6xl">The details are the difference.</h2><p className="mt-6 max-w-md text-lg leading-8 text-[#62695f]">We built LoveMeAfter around the parts homeowners usually have to chase: a callback, a real scope, proof of insurance, and someone accountable when the work is done.</p><Button onClick={goToEstimate} className="mt-8 rounded-full bg-[#1d211d] px-6 text-white hover:bg-[#30382f]">Start with a free estimate <ArrowUpRight className="ml-1 size-4" /></Button></div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#eaf0d0] p-7"><BadgeCheck className="size-6 text-[#71803d]" /><h3 className="mt-10 text-xl font-semibold">Crews we actually check</h3><p className="mt-2 text-sm leading-6 text-[#65705e]">Insurance, registration, references, and the local requirements that apply.</p></div><div className="rounded-2xl bg-[#ece9e0] p-7"><ClipboardCheck className="size-6 text-[#71803d]" /><h3 className="mt-10 text-xl font-semibold">A written scope</h3><p className="mt-2 text-sm leading-6 text-[#65705e]">Know what is included, what can wait, and what the work will actually cost.</p></div><div className="rounded-2xl bg-[#1d211d] p-7 text-white sm:col-span-2"><CircleDollarSign className="size-6 text-[#d5ec77]" /><h3 className="mt-10 text-xl font-semibold">No surprise fees, no pressure</h3><p className="mt-2 max-w-lg text-sm leading-6 text-white/60">The estimate is free. The decision stays yours. We earn the job by being clear enough to trust.</p></div></div></section>

      <section id="questions" className="relative z-10 border-y border-[#1d211d]/10 bg-[#ece9e0]/88 backdrop-blur-sm"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-32"><div><p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Good questions</p><h2 className="mt-4 text-4xl font-semibold leading-[1] tracking-[-.055em] sm:text-6xl">Before you invite us over.</h2></div><Accordion type="single" collapsible>{FAQS.map(([question, answer]) => <AccordionItem key={question} value={question} className="border-[#1d211d]/15"><AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">{question}</AccordionTrigger><AccordionContent className="max-w-xl pb-6 text-base leading-7 text-[#62695f]">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <section className="relative z-10 bg-[#d5ec77]/92 backdrop-blur-sm"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-10 lg:py-20"><div><p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Ready when you are</p><h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">Find out what it actually costs.</h2></div><div className="flex flex-wrap gap-3"><Button onClick={goToEstimate} className="h-14 rounded-full bg-[#1d211d] px-7 text-base text-white hover:bg-[#30382f]">Get my free estimate <ArrowUpRight className="ml-2 size-5" /></Button><a href={PHONE_HREF} className="flex h-14 items-center gap-2 rounded-full border border-[#1d211d]/25 px-6 text-sm font-semibold hover:bg-white/20"><Phone className="size-4" /> {PHONE_DISPLAY}</a></div></div></section>

      <footer className="relative z-10 bg-[#1d211d]/95 text-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 text-sm sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"><a href="#top" className="flex items-center gap-3 font-semibold"><span className="flex size-8 items-center justify-center rounded-full bg-[#d5ec77] text-[#1d211d]"><House className="size-4" /></span>LoveMeAfter</a><div className="flex flex-wrap gap-4 text-white/45"><p>Free estimates · same-day callback · CO · MO · KS · IN · WY</p><a href="/careers" className="text-[#d5ec77]">Sales careers</a></div><a href={PHONE_HREF} className="font-medium text-[#d5ec77]">{PHONE_DISPLAY}</a></div></footer>
    </main>
  );
}
