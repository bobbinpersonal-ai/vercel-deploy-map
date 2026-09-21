import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Clock,
  HardHat,
  MapPin,
  Phone,
  Radar,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router";

const PILLARS = [
  {
    icon: Radar,
    title: "Demand capture",
    copy: "Geofenced home improvement search campaigns plus outbound to property managers, brokers and estate planners. Run from HQ — no local storefront required.",
  },
  {
    icon: Phone,
    title: "24/7 live intake",
    copy: "A trained remote team answers every ad call and form fill in seconds, capturing scope, photos and access notes before the lead cools.",
  },
  {
    icon: ClipboardList,
    title: "Sales & contracts",
    copy: "One CRM pipeline for stage tracking, automated follow-up, digital estimates and e-signed agreements with financing built in.",
  },
  {
    icon: HardHat,
    title: "Crew dispatch",
    copy: "Vetted, licensed local contractors get the job order, address, photos and schedule window straight to their phone.",
  },
  {
    icon: Wallet,
    title: "Payments & payouts",
    copy: "Card deposits, ACH on larger balances, milestone crew payouts and consumer lending — with the dealer fee priced into the estimate.",
  },
];

const WORKFLOW = [
  { step: "01", title: "Demand trigger", copy: "A homeowner searches “roof repair near me” at 9pm and calls the ad." },
  { step: "02", title: "Intake in seconds", copy: "Our agent answers live, qualifies the scope and pulls photos by text." },
  { step: "03", title: "Quote & signature", copy: "Sales issues a scope-based estimate and collects an e-signed agreement." },
  { step: "04", title: "Crew dispatched", copy: "The matched trade partner receives the job order and schedule window." },
  { step: "05", title: "Work completed", copy: "Crew submits completion proof; we collect the final balance." },
  { step: "06", title: "Payout released", copy: "Automated milestone payout fires the moment the job clears." },
];

const SERVICES = [
  "Roofing",
  "Kitchen Remodel",
  "Bath Remodel",
  "Flooring",
  "Windows & Doors",
  "Exterior Painting",
  "Decks & Fencing",
  "Drywall & Repairs",
  "Basement Finishing",
  "Gutters & Siding",
];

const MARKETS = [
  { city: "Portland, OR", jobs: 128, accent: "#b9764f" },
  { city: "Vancouver, WA", jobs: 74, accent: "#7d9483" },
  { city: "Salem, OR", jobs: 41, accent: "#c39a5f" },
];

const PROOF = [
  { service: "Roofing", detail: "Storm damage · tear-off and re-deck", value: "$22,100", city: "Portland, OR" },
  { service: "Kitchen Remodel", detail: "Full gut, island retained", value: "$46,300", city: "Oregon City, OR" },
  { service: "Bath Remodel", detail: "Curbless shower conversion", value: "$21,800", city: "Vancouver, WA" },
];

export default function Landing() {
  const navigate = useNavigate();
  const toConsole = () => navigate("/auth?returnTo=%2Fdashboard");

  return (
    <main className="min-h-screen bg-[#f3f0e9] text-[#252523]">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-7 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase">
          <span className="flex size-8 items-center justify-center rounded-full border border-[#252523]/25">
            <HardHat className="size-4" strokeWidth={1.6} />
          </span>
          Ridgeline
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#how"
            className="hidden text-xs font-semibold tracking-[0.14em] text-[#6d6c67] uppercase transition-colors hover:text-[#252523] sm:block"
          >
            How it runs
          </a>
          <a
            href="#services"
            className="hidden text-xs font-semibold tracking-[0.14em] text-[#6d6c67] uppercase transition-colors hover:text-[#252523] sm:block"
          >
            Services
          </a>
          <button
            onClick={toConsole}
            className="group flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#252523] uppercase"
          >
            Ops console
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-20 pt-8 sm:px-10 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-14 lg:pb-28 lg:pt-14">
        <div className="flex flex-col justify-center">
          <p className="mb-7 flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] text-[#9b6b50] uppercase">
            <span className="h-px w-8 bg-[#9b6b50]" />
            Home improvement dispatch
          </p>
          <h1 className="max-w-xl font-serif text-5xl leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-[6.5rem]">
            Sell the scope.
            <br />
            <em className="font-normal text-[#9b6b50]">Dispatch</em> the trade.
          </h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#6d6c67]">
            Ridgeline captures high-intent homeowners around the clock, quotes the work, and routes it to licensed local
            crews — a sales and dispatch platform with no storefronts and no fleet.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button
              onClick={toConsole}
              className="group h-auto rounded-full bg-[#252523] px-6 py-3.5 text-sm font-medium text-[#f3f0e9] hover:bg-[#35352f]"
            >
              Open the ops console
              <ArrowRight className="ml-4 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <a href="#how" className="text-xs tracking-[0.12em] text-[#9b9990] uppercase hover:text-[#252523]">
              See the workflow
            </a>
          </div>

          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-[#252523]/12 pt-7">
            {[
              { icon: Clock, value: "38s", label: "Avg. speed to lead" },
              { icon: ShieldCheck, value: "24/7", label: "Live human intake" },
              { icon: Users, value: "100%", label: "Licensed crews" },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.icon className="size-4 text-[#9b6b50]" strokeWidth={1.6} />
                <p className="mt-3 font-serif text-2xl tracking-[-0.03em]">{stat.value}</p>
                <p className="mt-1 text-[11px] leading-4 text-[#6d6c67]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live dispatch panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative min-h-[520px] overflow-hidden border border-[#252523]/15 bg-[#e7e3d9] shadow-[10px_12px_0_#d7d1c5]"
        >
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#73756d_1px,transparent_1px),linear-gradient(90deg,#73756d_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative flex items-center justify-between border-b border-[#252523]/12 px-6 py-4">
            <span className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.17em] text-[#6d6c67] uppercase">
              <span className="size-2 animate-pulse rounded-full bg-[#4f7a5c]" />
              Live intake board
            </span>
            <span className="font-mono text-[10px] text-[#6d6c67]">45.52° N / 122.68° W</span>
          </div>

          <div className="relative space-y-3 p-5 sm:p-6">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="border border-[#252523]/12 bg-[#f3f0e9]/85 p-4 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-[#9b6b50] uppercase">
                    Inbound call · 21:14
                  </p>
                  <p className="mt-1.5 font-serif text-lg leading-tight">Roof damage, three missing shingle fields</p>
                  <p className="mt-1 text-[11px] text-[#6d6c67]">Portland, OR · Google Search Ad</p>
                </div>
                <span className="border border-[#4f7a5c]/40 bg-[#4f7a5c]/10 px-2 py-1 font-mono text-[10px] text-[#3f6349]">
                  32s
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="border border-[#252523]/12 bg-[#f3f0e9]/85 p-4 backdrop-blur-sm"
            >
              <p className="text-[10px] font-semibold tracking-[0.16em] text-[#9b6b50] uppercase">
                Crew matched by trade
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Meridian Roofing Co.</p>
                  <p className="mt-0.5 text-[11px] text-[#6d6c67]">
                    Licensed · 68 jobs completed · Portland, OR
                  </p>
                </div>
                <span className="flex items-center gap-1 font-mono text-xs">
                  <Star className="size-3 text-[#c39a5f]" /> 4.9
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="border border-[#252523]/12 bg-[#f3f0e9]/85 p-4 backdrop-blur-sm"
            >
              <p className="text-[10px] font-semibold tracking-[0.16em] text-[#9b6b50] uppercase">
                Agreement & deposit
              </p>
              <div className="mt-2 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-[10px] tracking-[0.12em] text-[#9b9990] uppercase">Contract</p>
                  <p className="mt-1 font-mono">$22,100</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.12em] text-[#9b9990] uppercase">Deposit</p>
                  <p className="mt-1 font-mono">$6,630</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.12em] text-[#9b9990] uppercase">Crew payout</p>
                  <p className="mt-1 font-mono">$13,500</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.6 }}
              className="flex items-center justify-between border border-[#4f7a5c]/35 bg-[#4f7a5c]/12 px-4 py-3"
            >
              <span className="text-[10px] font-semibold tracking-[0.16em] text-[#3f6349] uppercase">
                Dispatched to crew phone · window Thu 08:00
              </span>
              <ArrowRight className="size-4 text-[#3f6349]" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Pillars */}
      <section className="border-y border-[#252523]/12 bg-[#ebe7de]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
              Five pillars, one operating system
            </h2>
            <p className="max-w-sm text-sm leading-6 text-[#6d6c67]">
              Acquisition and sales stay centralized at headquarters. Field labor is subcontracted market by market, so
              we scale geography without scaling overhead.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="border border-[#252523]/12 bg-[#f3f0e9] p-6"
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-full border border-[#252523]/20">
                    <pillar.icon className="size-4" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[10px] text-[#9b9990]">0{index + 1}</span>
                </div>
                <h3 className="font-serif text-2xl tracking-[-0.03em]">{pillar.title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-[#6d6c67]">{pillar.copy}</p>
              </motion.div>
            ))}
            <div className="flex flex-col justify-between border border-[#252523] bg-[#252523] p-6 text-[#f3f0e9]">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#c9bfa8] uppercase">The margin story</p>
              <div className="mt-8">
                <p className="font-serif text-3xl leading-snug tracking-[-0.03em]">
                  No storefronts. No fleet. No local licensing in every market.
                </p>
                <Button
                  onClick={toConsole}
                  className="mt-8 w-full rounded-full bg-[#f3f0e9] text-xs font-medium tracking-[0.08em] text-[#252523] uppercase hover:bg-[#dcd6c8]"
                >
                  Enter the console
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="how" className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
            From a 9pm search to a paid crew
          </h2>
          <p className="max-w-sm text-sm leading-6 text-[#6d6c67]">
            Every lead follows the same six-stage rail, which is why a 24/7 operation can run without a local office.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {WORKFLOW.map((step, index) => (
            <div key={step.step} className="border-t border-[#252523]/20 pt-5">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-3xl text-[#b9764f]">{step.step}</span>
                <div>
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="mt-1.5 text-[13px] leading-6 text-[#6d6c67]">{step.copy}</p>
                </div>
              </div>
              {index < WORKFLOW.length - 1 && (
                <ArrowRight className="mt-4 size-4 text-[#9b9990]/60" strokeWidth={1.5} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Services + markets */}
      <section id="services" className="border-y border-[#252523]/12 bg-[#ebe7de]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-14 lg:py-24">
          <div>
            <p className="mb-6 text-[11px] font-semibold tracking-[0.24em] text-[#9b6b50] uppercase">
              Service lines we sell
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-[#252523]/15 bg-[#f3f0e9] px-4 py-2 text-xs font-medium transition-colors hover:border-[#252523]/40"
                >
                  {service}
                </span>
              ))}
            </div>
            <p className="mt-8 max-w-xl text-sm leading-6 text-[#6d6c67]">
              Each line maps to a vetted crew bench per market, so a new city can be live before we ever hire a local
              employee there.
            </p>
          </div>

          <div>
            <p className="mb-6 text-[11px] font-semibold tracking-[0.24em] text-[#9b6b50] uppercase">
              Markets dispatched
            </p>
            <div className="space-y-3">
              {MARKETS.map((market) => (
                <div
                  key={market.city}
                  className="flex items-center justify-between border border-[#252523]/12 bg-[#f3f0e9] px-4 py-3.5"
                >
                  <span className="flex items-center gap-3 text-sm">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: market.accent }} />
                    {market.city}
                  </span>
                  <span className="font-mono text-[11px] text-[#6d6c67]">{market.jobs} jobs</span>
                </div>
              ))}
            </div>
            <div className="mt-6 border border-[#252523]/12 p-5">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9b9990] uppercase">Recent work</p>
              <div className="mt-4 space-y-4">
                {PROOF.map((item) => (
                  <div key={item.detail} className="flex items-start justify-between gap-4 border-b border-[#252523]/10 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium">{item.service}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#6d6c67]">
                        <MapPin className="size-3" />
                        {item.detail} · {item.city}
                      </p>
                    </div>
                    <span className="font-mono text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <div className="relative overflow-hidden border border-[#252523]/15 bg-[#252523] px-8 py-16 text-[#f3f0e9] sm:px-14 lg:px-20 lg:py-24">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#f3f0e9_1px,transparent_1px),linear-gradient(90deg,#f3f0e9_1px,transparent_1px)] [background-size:52px_52px]" />
          <div className="relative max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-[#c9bfa8] uppercase">
              Sign in to the operation
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Run the pipeline, the crews and the payouts in one place.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-6 text-[#c9bfa8]">
              The ops console shows live lead capture, qualification, dispatch lanes, crew coverage and pending
              payouts — the same blueprint this business runs on.
            </p>
            <Button
              onClick={toConsole}
              className="group mt-10 h-auto rounded-full bg-[#f3f0e9] px-6 py-3.5 text-sm font-medium text-[#252523] hover:bg-[#dcd6c8]"
            >
              Open the ops console
              <ArrowRight className="ml-4 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#252523]/12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center sm:px-10 lg:px-14">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase">
            <span className="flex size-7 items-center justify-center rounded-full border border-[#252523]/25">
              <HardHat className="size-3.5" strokeWidth={1.6} />
            </span>
            Ridgeline
          </div>
          <p className="text-[11px] tracking-[0.1em] text-[#9b9990] uppercase">
            Home improvement sales & dispatch · 24/7 intake
          </p>
        </div>
      </footer>
    </main>
  );
}
