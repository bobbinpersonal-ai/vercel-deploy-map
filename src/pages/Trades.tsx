import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, Handshake, Phone } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { usePageMeta } from "@/components/PageMeta";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { CostDonut, PhaseTimeline, RoiBarChart, TradeShareChart } from "@/components/GeneratedGraphics";
import { JOBSITE_PHOTOS, PHOTO_CREDIT, WORKER_PHOTOS, px } from "@/data/photos";

const PHONE_HREF = "tel:+14244260760";

const TRADES: {
  name: string;
  photo: number;
  licensed: boolean;
  summary: string;
  when: string;
  ask: string;
  href: string;
}[] = [
  {
    name: "Roofing",
    photo: 32050399,
    licensed: true,
    summary: "Tear-off, decking, underlayment, flashing, ventilation, and shingle or metal installation.",
    when: "Active leaks, hail or wind damage, a roof past 15–20 years, or a sale inspection.",
    ask: "What is the underlayment system, and how is ventilation being corrected?",
    href: "/services/roofing",
  },
  {
    name: "Electrical",
    photo: 33694016,
    licensed: true,
    summary: "Circuits, outlets, lighting, grounding, GFCI and AFCI protection, and service work.",
    when: "Tripping breakers, two-prong outlets, EV chargers, heat pumps, or a renovation.",
    ask: "Is this permitted and inspected, and who pulls the permit?",
    href: "/services/electrical",
  },
  {
    name: "Plumbing",
    photo: 33388390,
    licensed: true,
    summary: "Supply and drain lines, fixtures, water heaters, shut-offs, and leak repair.",
    when: "Leaks, low pressure, discolored water, an aging heater, or a bathroom remodel.",
    ask: "What material are the existing lines, and how is the new work tested?",
    href: "/services/plumbing",
  },
  {
    name: "HVAC",
    photo: 6471913,
    licensed: true,
    summary: "Load calculation, equipment sizing, ductwork, ventilation, and commissioning.",
    when: "Uneven rooms, high bills, an aging system, or a comfort complaint you cannot explain.",
    ask: "Did you run a load calculation, and did you inspect the ducts?",
    href: "/services/hvac",
  },
  {
    name: "Painting",
    photo: 5768187,
    licensed: false,
    summary: "Washing, scraping, patching, caulking, priming, and finish coats inside and out.",
    when: "Chalking or peeling paint, a sale, or a color reset after other work.",
    ask: "What preparation is included, and how many finish coats?",
    href: "/services/exterior-paint",
  },
  {
    name: "Tile and stone",
    photo: 12924578,
    licensed: false,
    summary: "Substrate preparation, waterproofing membranes, layout, setting, grout, and sealing.",
    when: "Bathrooms, kitchens, floors, or a failed shower that needs correcting.",
    ask: "What waterproofing system is behind the tile?",
    href: "/services/tile",
  },
  {
    name: "Carpentry and framing",
    photo: 33005110,
    licensed: false,
    summary: "Framing, structural repair, doors, trim, stairs, and custom millwork.",
    when: "Rot repair, layout changes, sagging floors, or finish work that must be exact.",
    ask: "Is the framing inspected before it is closed up?",
    href: "/services/trim",
  },
  {
    name: "Drywall",
    photo: 4981812,
    licensed: false,
    summary: "Hanging, taping, mudding, sanding, texture matching, and repair.",
    when: "Water damage, holes, cracks, or any renovation that opens a wall.",
    ask: "What finish level are you delivering, and can I see it in raking light?",
    href: "/services/drywall",
  },
  {
    name: "Masonry",
    photo: 8586035,
    licensed: false,
    summary: "Brick, block, stone, repointing, chimneys, steps, and retaining walls.",
    when: "Spalling brick, failing mortar, a leaning wall, or historic restoration work.",
    ask: "Will the mortar match in color, hardness, and joint profile?",
    href: "/services/masonry",
  },
  {
    name: "Concrete",
    photo: 37393680,
    licensed: false,
    summary: "Subgrade, forms, reinforcement, pours, finishing, control joints, and curing.",
    when: "Cracked driveways, lifted walks, new slabs, or drainage corrections.",
    ask: "What is the base thickness and how are control joints placed?",
    href: "/services/concrete",
  },
  {
    name: "Flooring",
    photo: 326862,
    licensed: false,
    summary: "Subfloor prep, moisture testing, hardwood, LVP, tile, carpet, and transitions.",
    when: "Worn surfaces, water damage, or a rental turnover on a deadline.",
    ask: "Was the subfloor moisture-tested before installation?",
    href: "/services/flooring",
  },
  {
    name: "Gutters and drainage",
    photo: 2663254,
    licensed: false,
    summary: "Seamless gutter fabrication, hangers, downspouts, extensions, and grading.",
    when: "Overflowing gutters, stained fascia, or water pooling at the foundation.",
    ask: "Where does the water discharge, and how is the grade corrected?",
    href: "/services/gutters",
  },
  {
    name: "Insulation and air sealing",
    photo: 8082327,
    licensed: false,
    summary: "Attic, wall, and crawlspace insulation, air sealing, and ventilation correction.",
    when: "Drafty rooms, high bills, hot upstairs bedrooms, or ice dams.",
    ask: "Is air sealing included, and is ventilation corrected as part of it?",
    href: "/services/insulation",
  },
  {
    name: "Landscaping",
    photo: 27135590,
    licensed: false,
    summary: "Design, soil prep, planting, beds, edging, mulch, irrigation, and lighting.",
    when: "Curb appeal, drainage in beds, mature overgrowth, or a new build.",
    ask: "Are the plant selections appropriate for this exposure and water use?",
    href: "/services/landscaping",
  },
  {
    name: "Fencing",
    photo: 30573147,
    licensed: false,
    summary: "Layout, post setting, panels, gates, hardware, and finish or sealing.",
    when: "Privacy, pets, pool safety, or a failing fence line.",
    ask: "How deep are the posts set, and how do you handle the property line?",
    href: "/services/fencing",
  },
  {
    name: "Solar and backup power",
    photo: 38021376,
    licensed: true,
    summary: "Roof and shading review, interconnection, battery or generator, and monitoring.",
    when: "High utility cost, outage risk, or planned roof replacement.",
    ask: "Is the roof and panel capacity adequate before we commit?",
    href: "/services/solar",
  },
  {
    name: "Garage doors",
    photo: 34711989,
    licensed: false,
    summary: "Door, track, spring, cable, and opener as one tested system.",
    when: "Noisy operation, a failed spring, or dated curb appeal.",
    ask: "Are springs and cables being replaced, and is the safety reverse tested?",
    href: "/services/garage-doors",
  },
  {
    name: "Paving",
    photo: 6333640,
    licensed: false,
    summary: "Excavation, base, compaction, asphalt or pavers, edging, and drainage.",
    when: "Alligatored asphalt, poor drainage, or a widened approach.",
    ask: "How much base is being removed and rebuilt, not just resurfaced?",
    href: "/services/paving",
  },
];

export default function Trades() {
  const navigate = useNavigate();
  usePageMeta(
    "The Trades We Coordinate | LoveMeAfter",
    "The 18 trades behind a home improvement project: what each one does, when you need them, and the question to ask before you hire.",
  );

  const siteBand = JOBSITE_PHOTOS.slice(12, 20);
  const crewBand = WORKER_PHOTOS.slice(52, 58);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#1d211d]">
      <header className="sticky top-0 z-30 border-b border-[#1d211d]/10 bg-[#f7f5f0]/92 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#1d211d] text-[#d5ec77]">
              <LogoMark className="size-4" />
            </span>
            LoveMeAfter
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/services" className="hidden text-sm text-[#4f5a4d] hover:text-[#1d211d] sm:block">
              All services
            </Link>
            <Link to="/conditions" className="hidden text-sm text-[#4f5a4d] hover:text-[#1d211d] sm:block">
              Field conditions
            </Link>
            <a href={PHONE_HREF} className="hidden items-center gap-2 text-sm text-[#4f5a4d] md:flex">
              <Phone className="size-4" /> 424 426 0760
            </a>
            <Button onClick={() => navigate("/")} variant="ghost" className="text-[#1d211d] hover:bg-[#1d211d]/5">
              <ArrowLeft className="mr-2 size-4" /> Home
            </Button>
          </div>
        </nav>
      </header>

      {/* Directory masthead: data first, not a photo hero. */}
      <section className="border-b border-[#1d211d]/10 bg-[#182019] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">Trade network</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[.95] tracking-[-.06em] sm:text-6xl">
              We coordinate every trade. You get one accountable scope.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              LoveMeAfter coordinates residential projects under one accountable process. We’re growing our in-house field team while matching each scope with qualified trade professionals. Required credentials, permits, and insurance are checked as applicable to the work and location.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["18", "Trades coordinated"],
                ["1", "Written scope"],
                ["1", "Point of accountability"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/12 bg-white/[.04] p-5">
                  <p className="text-3xl font-semibold tracking-[-.05em] text-[#d5ec77]">{value}</p>
                  <p className="mt-1 text-xs text-white/65">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 self-start">
            <TradeShareChart
              title="How a multi-trade renovation splits across crews"
              ariaLabel="Share of a renovation across trades"
              data={[
                { label: "Interior trades", value: 28 },
                { label: "Mechanical (HVAC, plumbing, electrical)", value: 24 },
                { label: "Finishes (paint, tile, trim, flooring)", value: 23 },
                { label: "Exterior & envelope", value: 15 },
                { label: "Site, concrete, landscaping", value: 10 },
              ]}
            />
            <CostDonut
              title="Where a typical kitchen dollar goes"
              centerLabel="$"
              data={[
                { label: "Cabinetry and hardware", value: 29 },
                { label: "Labor and installation", value: 22 },
                { label: "Countertops", value: 14 },
                { label: "Appliances", value: 13 },
                { label: "Electrical and plumbing", value: 12 },
                { label: "Flooring, tile, paint", value: 10 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* The directory itself. */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">The directory</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.055em] sm:text-5xl">
              Who does what, and what to ask them.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#62695f]">
            A licensed trade is noted where state or local law requires a license for the scope. Required credentials and insurance are checked for the professionals assigned to a project, as applicable to its location and work.
          </p>
        </div>

        <div className="mt-10 divide-y divide-[#1d211d]/10 border-y border-[#1d211d]/10">
          {TRADES.map((trade, index) => (
            <article key={trade.name} className="group grid gap-5 py-6 sm:grid-cols-[120px_minmax(0,1fr)_minmax(0,.85fr)] sm:items-start">
              <div className="flex items-center gap-3">
                <span className="w-6 text-xs font-semibold text-[#9aa095] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div
                  className="size-20 shrink-0 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${px(trade.photo, 400)})` }}
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold tracking-[-.02em]">{trade.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[.1em] uppercase ${
                      trade.licensed ? "bg-[#eaf0d0] text-[#5c6b2f]" : "bg-[#ece9e0] text-[#7a8377]"
                    }`}
                  >
                    {trade.licensed ? "Licensed scope" : "Trade scope"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#4f5a4d]">{trade.summary}</p>
                <p className="mt-2 text-sm leading-6 text-[#62695f]">
                  <span className="font-semibold text-[#1d211d]">You need this when: </span>
                  {trade.when}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[.14em] text-[#9aa095] uppercase">Ask this</p>
                <p className="mt-1 text-sm leading-6 text-[#4f5a4d]">{trade.ask}</p>
                <Link to={trade.href} className="mt-3 inline-flex items-center text-xs font-semibold text-[#71803d]">
                  Project guide <ArrowUpRight className="ml-1 size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-[#7c8579]">{PHOTO_CREDIT} Your project is matched to the trade and crew your written scope requires.</p>
      </section>

      {/* Sequencing education with a generated timeline. */}
      <section className="border-y border-[#1d211d]/10 bg-[#eaf0d0]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Sequencing</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[.96] tracking-[-.055em] sm:text-5xl">
                Most renovation problems are sequencing problems.
              </h2>
              <p className="mt-5 text-base leading-7 text-[#4f5a4d]">
                Trades cannot run in any order. Rough-in has to be inspected before walls close. Cabinets
                before counters. Counters before tile. Tile before the plumber sets the trim. When that order
                breaks, homeowners pay for it twice.
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4f5a4d]">
                {[
                  "One scope, one schedule, one point of contact",
                  "Rough-in inspections documented before closure",
                  "Material lead times planned backwards from the start date",
                  "Change orders written and approved before work continues",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#71803d]" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              <PhaseTimeline
                title="A typical full kitchen renovation, week by week"
                phases={[
                  { label: "Design & permits", start: 0, duration: 14 },
                  { label: "Demo", start: 14, duration: 4 },
                  { label: "Rough-in (MEP)", start: 18, duration: 7 },
                  { label: "Inspection", start: 25, duration: 2 },
                  { label: "Drywall & paint", start: 27, duration: 6 },
                  { label: "Cabinets", start: 33, duration: 4 },
                  { label: "Template & counters", start: 37, duration: 10 },
                  { label: "Tile & backsplash", start: 47, duration: 5 },
                  { label: "Trim & punch list", start: 52, duration: 6 },
                ]}
              />
              <RoiBarChart
                title="What delays cost on a $60,000 renovation"
                unit=" days"
                data={[
                  { label: "Material lead time missed", value: 7, note: "Cabinets and counters reordered" },
                  { label: "Inspection failed, rework", value: 5, note: "Rough-in opened back up" },
                  { label: "Out-of-order trade", value: 4, note: "Finished surface protected or redone" },
                  { label: "Undocumented change order", value: 9, note: "Dispute holds the schedule" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f0]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">On the job</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-.055em] sm:text-5xl">
            Equipment, documentation, and the crews who run it.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[...siteBand, ...crewBand].map(([label, id]) => (
              <figure key={label} className="group overflow-hidden rounded-2xl border border-[#1d211d]/10 bg-white">
                <div
                  className="h-36 bg-cover bg-center transition duration-700 group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url(${px(id, 600)})` }}
                />
                <figcaption className="p-3 text-[11px] font-medium text-[#4f5a4d]">{label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#1d211d]/10 bg-[#ece9e0]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">
              <Handshake className="size-4" /> For crews and partners
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.055em] sm:text-5xl">
              Run your trade. We handle the homeowner relationship.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#596357]">
              Qualified scopes, clear expectations, and payment on agreed terms. Project opportunities depend on market demand and capacity. If you run a clean operation, we’d like to hear from you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contractors"
              className="flex h-14 items-center rounded-full bg-[#1d211d] px-7 font-semibold text-white hover:bg-[#30382f]"
            >
              Become a partner <ArrowUpRight className="ml-2 size-5" />
            </Link>
            <a
              href={PHONE_HREF}
              className="flex h-14 items-center gap-2 rounded-full border border-[#1d211d]/25 px-6 text-sm font-semibold hover:bg-white/60"
            >
              <Phone className="size-4" /> 424 426 0760
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1d211d]/10 bg-[#f7f5f0]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#1d211d] text-[#d5ec77]">
              <LogoMark className="size-4" />
            </span>
            LoveMeAfter
          </Link>
          <div className="flex flex-wrap gap-4 text-[#62695f]">
            <Link to="/services" className="hover:text-[#1d211d]">Services</Link>
            <Link to="/conditions" className="hover:text-[#1d211d]">Field conditions</Link>
            <Link to="/insights" className="hover:text-[#1d211d]">Insights</Link>
            <Link to="/areas" className="hover:text-[#1d211d]">Service areas</Link>
            <Link to="/financing" className="hover:text-[#1d211d]">Financing</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
