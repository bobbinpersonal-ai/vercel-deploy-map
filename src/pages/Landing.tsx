import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AppWindow,
  ArrowRight,
  CloudHail,
  CloudRain,
  DoorOpen,
  Fence,
  Home,
  Layers,
  Paintbrush,
  Phone,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const PHONE_DISPLAY = "4244260760";
const PHONE_HREF = "tel:+14244260760";

const TRUST = [
  { label: "Callback", value: "Same day" },
  { label: "Every crew", value: "Insured & checked" },
  { label: "Workmanship", value: "10-year warranty" },
];

const SERVICES = [
  { icon: Home, title: "Roof replacement", copy: "Tear-off to final nail in a day, most houses." },
  { icon: Layers, title: "Siding", copy: "Hardie board that ignores hail and holds paint for fifteen years." },
  { icon: AppWindow, title: "Windows", copy: "The reason your August electric bill is what it is." },
  { icon: CloudRain, title: "Gutters", copy: "Seamless, run on site, colour-matched to the trim." },
  { icon: Fence, title: "Fence", copy: "Cedar with steel posts. Outlives the house." },
  { icon: DoorOpen, title: "Garage doors", copy: "The biggest moving object on the house, and the loudest." },
  { icon: Paintbrush, title: "Exterior paint", copy: "Wash, scrape, caulk, prime, two coats. Not one." },
  { icon: CloudHail, title: "Hail & wind", copy: "Start with the inspection, not the claim." },
];

const STEPS = [
  {
    step: "01",
    title: "Tell us what needs doing",
    copy: "Thirty seconds and a ZIP code. We check we're already working near you before we take anything else.",
  },
  {
    step: "02",
    title: "A free estimate, booked",
    copy: "We walk the house, photograph everything we find, and give you a written scope and a real number — whether it's one window or the whole exterior.",
  },
  {
    step: "03",
    title: "We send a vetted crew",
    copy: "Local, insured, and checked against whatever your state and county require. You get the crew lead's name before they turn up.",
  },
  {
    step: "04",
    title: "You decide, or you don't",
    copy: "We quote, you choose. No obligation, no fee to you either way, and nobody chases you if the answer is no.",
  },
];

const FAQS = [
  {
    q: "What does it cost me?",
    a: "Nothing to start. The estimate is free and the written scope is free, and you are under no obligation to hire us. You only pay if you decide to go ahead with the work.",
  },
  {
    q: "Can you do more than one thing at once?",
    a: "That's usually the cheaper way to do it. Siding and windows share scaffolding, gutters go on after a roof, and paint goes last — doing them together saves you a mobilisation each time. Ask for a price on everything you're thinking about, even the parts you'd put off; we'll tell you honestly what can wait.",
  },
  {
    q: "Do I need to be home?",
    a: "For the walk-round, no — we can look at the outside and call you. For the appointment where you get the price, yes, and so does anyone else who'd be part of the decision. We'd rather do it once properly than twice.",
  },
  {
    q: "How do you check the crews you send?",
    a: "Current general liability insurance, a W-9, two customers we ring ourselves, and whatever their state or county requires — which varies more than people expect. Kansas roofers have to be registered with the Attorney General. Most Colorado Front Range cities license locally. Indiana dictates what a home improvement contract has to say. We check the one that applies and we re-check it. Ask us for any of it and we will hand it over without being chased.",
  },
  {
    q: "What if my insurance denies the claim?",
    a: "You still have a written scope and a photographed inspection, at no cost, and you decide what to do next. We can quote the work retail if you want it done anyway. In Colorado a denial also gives you a right to rescind a signed roofing contract and get any deposit back.",
  },
  {
    q: "How long does the work take?",
    a: "Most roofs are a single day — tear-off in the morning, dried in by lunch, finished by evening. Windows are usually a day for a houseful. Siding and exterior paint run three to five days depending on the house. Gutters, fencing and a garage door are same-day jobs. You get the real number in writing before you sign, not an optimistic one.",
  },
  {
    q: "Who pulls the permit?",
    a: "We do, where the city or county requires one, and it's in our price rather than added afterwards.",
  },
  {
    q: "What happens if something's wrong afterwards?",
    a: "Call us. Every job carries a minimum 10-year workmanship warranty, and we come back and fix it.",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const toConsole = () => navigate("/auth?returnTo=%2Fdashboard");

  useEffect(() => {
    const previous = document.title;
    document.title = "Free Home Improvement Estimate — Same-Day Callback | LoveMeAfter";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#16140f]">
      {/* Nav */}
      <header className="bg-[#14120e] text-[#f5f2ec]">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center bg-[#d97a2b] text-[#14120e]">
              <Home className="size-4" strokeWidth={2} />
            </span>
            <span className="text-base font-bold tracking-[-0.02em]">LoveMeAfter</span>
          </button>
          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2 text-sm font-semibold text-[#f5f2ec]/80 transition-colors hover:text-[#d97a2b] sm:flex"
            >
              <Phone className="size-4" strokeWidth={2} />
              {PHONE_DISPLAY}
            </a>
            <button
              onClick={toConsole}
              className="text-[11px] font-semibold tracking-[0.14em] text-[#f5f2ec]/55 uppercase transition-colors hover:text-[#f5f2ec]"
            >
              Ops console
            </button>
            <Button
              onClick={toConsole}
              className="h-auto rounded-none bg-[#d97a2b] px-4 py-2.5 text-xs font-bold tracking-[0.06em] text-[#14120e] uppercase hover:bg-[#e88b3c]"
            >
              Get my free estimate
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-[#14120e] text-[#f5f2ec]">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-12 lg:pb-28 lg:pt-20">
          <div>
            <p className="mb-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold tracking-[0.2em] text-[#d97a2b] uppercase">
              Free estimates <span className="text-[#f5f2ec]/30">·</span> CO{" "}
              <span className="text-[#f5f2ec]/30">·</span> MO <span className="text-[#f5f2ec]/30">·</span> KS{" "}
              <span className="text-[#f5f2ec]/30">·</span> IN <span className="text-[#f5f2ec]/30">·</span> WY
            </p>
            <h1 className="max-w-2xl text-5xl leading-[0.98] font-bold tracking-[-0.04em] font-sans sm:text-6xl lg:text-[5.2rem]">
              Free home improvement estimate.{" "}
              <span className="text-[#d97a2b]">We call you back today.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-[#f5f2ec]/70">
              Windows, siding, roofing, garage doors, fencing, gutters and exterior paint. We walk the house, put a real
              number in writing, and send a crew we've actually checked — insurance, registration, and two customers we
              rang ourselves. No obligation either way.
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#f5f2ec]/70">
              Now booking across <strong className="font-semibold text-[#f5f2ec]">Colorado, Missouri, Kansas, Indiana</strong> and{" "}
              <strong className="font-semibold text-[#f5f2ec]">Wyoming</strong>, including the rural counties most
              contractors won't drive to.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                onClick={toConsole}
                className="group h-auto rounded-none bg-[#d97a2b] px-6 py-4 text-sm font-bold tracking-[0.04em] text-[#14120e] uppercase hover:bg-[#e88b3c]"
              >
                Get my free estimate
                <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 border border-[#f5f2ec]/25 px-6 py-4 text-sm font-semibold transition-colors hover:border-[#f5f2ec]/60"
              >
                <Phone className="size-4" strokeWidth={2} /> Call {PHONE_DISPLAY}
              </a>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-[#f5f2ec]/15 pt-8 sm:grid-cols-3">
              {TRUST.map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[#f5f2ec]/45 uppercase">{item.label}</p>
                  <p className="mt-2 text-lg font-bold tracking-[-0.02em]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ZIP capture */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="self-start border border-[#f5f2ec]/15 bg-[#1c1a15] p-6 sm:p-8"
          >
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#d97a2b] uppercase">Step 01</p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em]">Tell us what needs doing</h2>
            <p className="mt-3 text-sm leading-6 text-[#f5f2ec]/60">
              Thirty seconds and a ZIP code. We check we're already working near you before we take anything else.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                toConsole();
              }}
              className="mt-7 space-y-3"
            >
              <input
                name="zip"
                required
                inputMode="numeric"
                pattern="[0-9]{5}"
                placeholder="ZIP code"
                aria-label="ZIP code"
                className="h-12 w-full border border-[#f5f2ec]/20 bg-transparent px-4 text-sm text-[#f5f2ec] placeholder:text-[#f5f2ec]/35 focus:border-[#d97a2b] focus:outline-none"
              />
              <select
                name="service"
                aria-label="What needs doing"
                className="h-12 w-full border border-[#f5f2ec]/20 bg-[#14120e] px-4 text-sm text-[#f5f2ec] focus:border-[#d97a2b] focus:outline-none"
              >
                {SERVICES.map((service) => (
                  <option key={service.title} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet</option>
              </select>
              <Button
                type="submit"
                className="h-12 w-full rounded-none bg-[#d97a2b] text-sm font-bold tracking-[0.04em] text-[#14120e] uppercase hover:bg-[#e88b3c]"
              >
                Request my callback
              </Button>
            </form>
            <p className="mt-4 text-[11px] leading-5 text-[#f5f2ec]/45">
              Free estimate, a written scope, no obligation. Same-day callback, most days within the hour.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="text-4xl font-bold tracking-[-0.04em] font-sans sm:text-5xl">What we do</h2>
          <p className="max-w-xl text-base leading-7 text-[#4a463d]">
            The whole outside of the house, and any part of it on its own. One job or all of them — we'd rather price
            the lot and tell you what can wait.
          </p>
        </div>
        <div className="grid gap-px border border-[#16140f]/12 bg-[#16140f]/12 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (index % 4) * 0.05 }}
              className="group bg-[#f5f2ec] p-6 transition-colors hover:bg-[#efeae0]"
            >
              <div className="mb-8 flex items-start justify-between">
                <service.icon className="size-6 text-[#d97a2b]" strokeWidth={1.8} />
                <span className="font-mono text-[10px] text-[#16140f]/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-bold tracking-[-0.02em]">{service.title}</h3>
              <p className="mt-2.5 text-sm leading-6 text-[#4a463d]">{service.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hail & wind */}
      <section className="border-y border-[#16140f]/12 bg-[#efeae0]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-28">
          <div>
            <p className="mb-6 text-[11px] font-bold tracking-[0.2em] text-[#d97a2b] uppercase">Hail &amp; wind</p>
            <h2 className="text-4xl leading-[1.05] font-bold tracking-[-0.04em] font-sans sm:text-5xl">
              Start with the inspection, not the claim.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-[#4a463d]">
            <p>
              We climb the roof, photograph what we find, and give you a written scope. If there's a claim worth filing
              we'll meet your adjuster up there and show them the same damage we showed you.
            </p>
            <p className="font-semibold text-[#16140f]">
              You pay your deductible. Your carrier is billed for the rest.
            </p>
            <div className="border-l-2 border-[#d97a2b] bg-[#f5f2ec] px-5 py-5 text-sm leading-7">
              We are not a public insurance adjuster and we will not negotiate your claim for you — that is licensed work
              in most states. And anyone who offers to cover, waive or absorb your deductible is offering you something
              Colorado, Kansas, Missouri and Indiana all prohibit. If you hear it, walk away — from us included.
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 className="mb-12 text-4xl font-bold tracking-[-0.04em] font-sans sm:text-5xl">How it works</h2>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.step} className="border-t-2 border-[#16140f]/15 pt-6">
              <span className="font-mono text-sm font-bold text-[#d97a2b]">{step.step}</span>
              <h3 className="mt-4 text-lg leading-snug font-bold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#4a463d]">{step.copy}</p>
              {index < STEPS.length - 1 && (
                <ArrowRight className="mt-5 size-4 text-[#16140f]/20 lg:hidden" strokeWidth={2} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-[#16140f]/12 bg-[#efeae0]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12 lg:py-28">
          <h2 className="text-4xl leading-[1.05] font-bold tracking-[-0.04em] font-sans sm:text-5xl">
            Questions people actually ask
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q} className="border-[#16140f]/12">
                <AccordionTrigger className="py-5 text-left text-base font-bold tracking-[-0.01em] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-7 text-[#4a463d]">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#14120e] text-[#f5f2ec]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="text-4xl leading-[1.02] font-bold tracking-[-0.04em] font-sans sm:text-5xl lg:text-[4.25rem]">
              Find out what it actually costs.
            </h2>
            <p className="mt-7 text-lg leading-7 text-[#f5f2ec]/70">
              Free estimate, a written scope, and a crew we've checked.
            </p>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#d97a2b]">
              We call you back today — most companies in this trade take days, and plenty never call back at all.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                onClick={toConsole}
                className="group h-auto rounded-none bg-[#d97a2b] px-6 py-4 text-sm font-bold tracking-[0.04em] text-[#14120e] uppercase hover:bg-[#e88b3c]"
              >
                Get my free estimate
                <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <a
                href={PHONE_HREF}
                className="border border-[#f5f2ec]/25 px-6 py-4 text-sm font-semibold transition-colors hover:border-[#f5f2ec]/60"
              >
                Or call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#f5f2ec]/10 bg-[#14120e] text-[#f5f2ec]">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-6 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:px-12">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center bg-[#d97a2b] text-[#14120e]">
              <Home className="size-3.5" strokeWidth={2} />
            </span>
            <span className="text-sm font-bold tracking-[-0.02em]">LoveMeAfter</span>
          </div>
          <p className="text-[11px] tracking-[0.14em] text-[#f5f2ec]/45 uppercase">
            CO · MO · KS · IN · WY — free estimates, same-day callback
          </p>
          <a href={PHONE_HREF} className="text-sm font-semibold transition-colors hover:text-[#d97a2b]">
            {PHONE_DISPLAY}
          </a>
        </div>
      </footer>
    </main>
  );
}
