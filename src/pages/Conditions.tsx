import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, AlertTriangle, House, Phone, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { CostDonut, DecisionFlow, PhaseTimeline, RoiBarChart, SeverityMeter, TradeShareChart } from "@/components/GeneratedGraphics";
import { DAMAGE_PHOTOS, JOBSITE_PHOTOS, PHOTO_CREDIT, PHOTO_CREDIT_URL, WORKER_PHOTOS, px, pxPage } from "@/data/photos";

const PHONE_HREF = "tel:+14244260760";

const CONDITIONS: {
  slug: string;
  name: string;
  severity: number;
  photo: number;
  symptom: string;
  cause: string;
  waiting: string;
  action: string;
  href: string;
}[] = [
  {
    slug: "roof-leak",
    name: "Active roof leak",
    severity: 88,
    photo: 30499666,
    symptom: "A brown ring on the ceiling, a stain that grows after rain, or daylight visible in the attic.",
    cause: "Usually failed flashing, a lifted shingle field, or an ice-dam backup — not the shingle you can see from the driveway.",
    waiting: "Insulation soaks, decking rots, and mold colonizes the attic within a single wet season.",
    action: "Tarp or stabilize, then diagnose the actual entry point before quoting a repair.",
    href: "/services/roofing",
  },
  {
    slug: "water-intrusion",
    name: "Water intrusion at grade",
    severity: 79,
    photo: 17537662,
    symptom: "Damp basement walls, efflorescence, a musty smell, or water pooling against the foundation.",
    cause: "Negative grade, missing downspout extensions, or a failed footing drain.",
    waiting: "Hydrostatic pressure eventually cracks the slab and destabilizes the foundation.",
    action: "Correct grading and discharge first. Interior repairs without drainage work usually fail.",
    href: "/services/drainage",
  },
  {
    slug: "rot",
    name: "Hidden rot in the envelope",
    severity: 74,
    photo: 34041325,
    symptom: "Soft trim, a spongy sill, crumbling paint that returns every year, or insect frass.",
    cause: "Long-term moisture from failed caulk, flashing, or a leaking gutter seam.",
    waiting: "Rot travels along the grain into framing. A trim repair becomes a structural repair.",
    action: "Open and inspect to sound wood, treat the moisture source, then rebuild.",
    href: "/services/siding",
  },
  {
    slug: "mold",
    name: "Mold and poor indoor air",
    severity: 66,
    photo: 6141203,
    symptom: "Musty odor, allergic symptoms that improve when you leave, or visible dark spotting.",
    cause: "Moisture that never dried. Mold is a symptom of a water problem, not the problem itself.",
    waiting: "Remediation costs climb, and occupants keep getting sick in a home that looks fine.",
    action: "Find and stop the moisture, dry the assembly, then remediate.",
    href: "/services/air-quality",
  },
  {
    slug: "foundation-crack",
    name: "Foundation movement",
    severity: 91,
    photo: 10682524,
    symptom: "Stair-step cracks in brick, doors that stick seasonally, or a floor that has gone out of level.",
    cause: "Soil movement, poor drainage, or a footing that was never adequate for the soil.",
    waiting: "Small movement becomes structural. Repair cost scales with how long it is ignored.",
    action: "Engineer-led assessment, then drainage correction before any structural repair.",
    href: "/services/concrete",
  },
  {
    slug: "hail",
    name: "Hail and wind damage",
    severity: 71,
    photo: 16860477,
    symptom: "Bruised or granule-bare shingles, dented vents and gutters, cracked sealant.",
    cause: "A single storm event, often not obvious from the ground.",
    waiting: "Insurance windows close. Undocumented damage becomes your cost.",
    action: "Document with dated photos and measurements, then scope the repair.",
    href: "/services/insurance-claims",
  },
  {
    slug: "clogged-drainage",
    name: "Failed roof drainage",
    severity: 58,
    photo: 2663254,
    symptom: "Water sheeting off the roof edge, stained fascia, or soil washed out below a downspout.",
    cause: "Undersized gutters, wrong pitch, missing extensions, or debris that was never cleared.",
    waiting: "Water finds the foundation, and fascia rot follows the gutter line.",
    action: "Re-slope and size the system, then discharge water away from the house.",
    href: "/services/gutters",
  },
  {
    slug: "failed-work",
    name: "Failed previous work",
    severity: 62,
    photo: 37062270,
    symptom: "Leaks at a recent repair, loose tile, bubbling paint, or a deck that moves underfoot.",
    cause: "Skipped prep, missing flashing, wrong fastener, or no permit or inspection.",
    waiting: "You pay twice — once for the bad work and again to remove and redo it correctly.",
    action: "Document what exists, price the correct scope, and photograph the correction.",
    href: "/services/punch-list",
  },
];

export default function Conditions() {
  const navigate = useNavigate();
  useEffect(() => {
    const previous = document.title;
    document.title = "Field Conditions & Damage Library | LoveMeAfter";
    return () => {
      document.title = previous;
    };
  }, []);

  const mosaic = DAMAGE_PHOTOS.slice(0, 12);
  const hero = DAMAGE_PHOTOS[1];
  const crew = WORKER_PHOTOS.slice(0, 6);
  const site = JOBSITE_PHOTOS.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#1d211d]">
      <header className="border-b border-[#1d211d]/10 bg-[#f7f5f0]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#1d211d] text-[#d5ec77]">
              <House className="size-5" />
            </span>
            LoveMeAfter
          </Link>
          <div className="flex items-center gap-4">
            <a href={PHONE_HREF} className="hidden items-center gap-2 text-sm text-[#4f5a4d] sm:flex">
              <Phone className="size-4" /> 424 426 0760
            </a>
            <Button onClick={() => navigate("/")} variant="ghost" className="text-[#1d211d] hover:bg-[#1d211d]/5">
              <ArrowLeft className="mr-2 size-4" /> Back home
            </Button>
          </div>
        </nav>
      </header>

      {/* Editorial masthead — deliberately different from the homepage hero. */}
      <section className="mx-auto max-w-7xl px-5 pt-14 pb-10 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[.18em] text-[#b4543a] uppercase">
              <AlertTriangle className="size-4" /> Field conditions library
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[.95] tracking-[-.06em] sm:text-6xl lg:text-7xl">
              What damage actually looks like — and what waiting costs.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#596357]">
              Most homeowners find out something is wrong three ways: a stain, a smell, or a rejected
              inspection. This library shows the conditions our crews document in the field, what causes
              them, and the sequence that fixes them for good.
            </p>
          </div>
          <figure className="overflow-hidden rounded-3xl border border-[#1d211d]/10 bg-white">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${px(hero[1], 1000)})` }} />
            <figcaption className="flex items-center justify-between gap-3 p-4">
              <span className="text-sm font-semibold">{hero[0]}</span>
              <span className="text-[10px] font-semibold tracking-[.1em] text-[#9aa095] uppercase">
                Documented condition
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Quick index, so the page reads like a reference rather than a pitch. */}
      <section className="border-y border-[#1d211d]/10 bg-[#ece9e0]">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-5 sm:px-8 lg:px-10">
          <span className="mr-2 text-xs font-semibold tracking-[.14em] text-[#7a8377] uppercase">Jump to</span>
          {CONDITIONS.map((condition) => (
            <a
              key={condition.slug}
              href={`#${condition.slug}`}
              className="rounded-full border border-[#1d211d]/15 bg-white/70 px-3 py-1.5 text-xs transition hover:border-[#71803d] hover:text-[#71803d]"
            >
              {condition.name}
            </a>
          ))}
        </div>
      </section>

      {/* Photo mosaic — irregular sizing so it never reads like a card grid. */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid auto-rows-[110px] grid-cols-2 gap-3 sm:auto-rows-[140px] sm:grid-cols-4 lg:grid-cols-6">
          {mosaic.map(([label, id], index) => {
            const span =
              index === 0 || index === 7
                ? "col-span-2 row-span-2"
                : index === 3
                  ? "col-span-2"
                  : index === 5
                    ? "row-span-2"
                    : "";
            return (
              <figure
                key={label}
                className={`group relative overflow-hidden rounded-2xl bg-[#1d211d] ${span}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${px(id, 900)})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1610]/85 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-[11px] font-semibold text-white">{label}</p>
                  <a
                    href={pxPage(id)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] font-semibold tracking-[.1em] text-[#d5ec77] uppercase"
                  >
                    Pexels
                  </a>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-5 text-[#7c8579]">
          {PHOTO_CREDIT}{" "}
          <a href={PHOTO_CREDIT_URL} target="_blank" rel="noreferrer" className="font-semibold text-[#71803d] underline underline-offset-2">
            Photo license
          </a>
        </p>
      </section>

      {/* Condition deep-dives, laid out as a two-column reference with a sticky rail. */}
      <section className="border-y border-[#1d211d]/10 bg-[#f1f4e7]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">By severity</p>
              <RoiBarChart
                ariaLabel="Severity score by condition"
                unit=""
                max={100}
                data={CONDITIONS.map((condition) => ({ label: condition.name, value: condition.severity }))}
              />
            </aside>
            <div className="min-w-0 space-y-6">
              {CONDITIONS.map((condition) => (
                <article
                  key={condition.slug}
                  id={condition.slug}
                  className="scroll-mt-24 overflow-hidden rounded-3xl border border-[#1d211d]/10 bg-white"
                >
                  <div className="grid md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
                    <div className="h-56 bg-cover bg-center md:h-full" style={{ backgroundImage: `url(${px(condition.photo, 1000)})` }} />
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-2xl font-semibold tracking-[-.03em]">{condition.name}</h2>
                        <span
                          className="rounded-full px-3 py-1 text-[10px] font-semibold tracking-[.12em] uppercase"
                          style={{
                            background: condition.severity >= 80 ? "#f4ded8" : condition.severity >= 65 ? "#f6efd4" : "#eaf0d0",
                            color: condition.severity >= 80 ? "#8f3f27" : condition.severity >= 65 ? "#7c6216" : "#5c6b2f",
                          }}
                        >
                          Severity {condition.severity}/100
                        </span>
                      </div>
                      <dl className="mt-6 space-y-4 text-sm leading-6">
                        <div>
                          <dt className="text-[11px] font-semibold tracking-[.14em] text-[#9aa095] uppercase">What you notice</dt>
                          <dd className="mt-1 text-[#4f5a4d]">{condition.symptom}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] font-semibold tracking-[.14em] text-[#9aa095] uppercase">Usual cause</dt>
                          <dd className="mt-1 text-[#4f5a4d]">{condition.cause}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] font-semibold tracking-[.14em] text-[#b4543a] uppercase">Cost of waiting</dt>
                          <dd className="mt-1 text-[#4f5a4d]">{condition.waiting}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] font-semibold tracking-[.14em] text-[#71803d] uppercase">What we do first</dt>
                          <dd className="mt-1 text-[#4f5a4d]">{condition.action}</dd>
                        </div>
                      </dl>
                      <Link
                        to={condition.href}
                        className="mt-6 inline-flex items-center text-sm font-semibold text-[#71803d]"
                      >
                        See the related project guide <ArrowUpRight className="ml-1 size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Generated data graphics that explain the economics of waiting. */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">The economics of waiting</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[.96] tracking-[-.055em] sm:text-5xl">
            Deferred maintenance is not a savings plan.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#596357]">
            These are illustrative multipliers used for planning conversations, not quotes. They show the
            general shape of how repair cost grows once water or movement is involved. Every home is
            different, and we always price your actual scope.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <RoiBarChart
            title="Typical cost multiplier when a repair is deferred"
            unit="×"
            data={[
              { label: "Flashing repair", value: 1, note: "Caught during inspection" },
              { label: "Decking and insulation", value: 3, note: "One wet season of intrusion" },
              { label: "Interior drywall and paint", value: 6, note: "Water reaches living space" },
              { label: "Framing and mold remediation", value: 11, note: "Structure stays wet" },
              { label: "Structural and foundation", value: 18, note: "Movement is left unaddressed" },
            ]}
          />
          <CostDonut
            title="Where a water-damage claim dollar typically goes"
            centerLabel="$"
            data={[
              { label: "Mitigation, dry-out, and equipment", value: 22 },
              { label: "Demolition and disposal", value: 14 },
              { label: "Structural and framing repair", value: 24 },
              { label: "Drywall, paint, and finishes", value: 18 },
              { label: "Mold remediation and air quality", value: 12 },
              { label: "Contents, temporary costs", value: 10 },
            ]}
          />
          <SeverityMeter
            value={78}
            label="Average risk score of the conditions we document"
            caption="Weighted across the conditions in this library. Anything above 66 means moisture or movement is already active."
          />
          <TradeShareChart
            title="Where the money actually moves in a storm claim"
            data={[
              { label: "Mitigation & dry-out", value: 22 },
              { label: "Structure & framing", value: 24 },
              { label: "Finishes & paint", value: 25 },
              { label: "Roofing & envelope", value: 19 },
              { label: "Permits, engineering, admin", value: 10 },
            ]}
          />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <PhaseTimeline
            title="How a water-damage restoration is sequenced"
            phases={[
              { label: "Stabilize & extract", start: 0, duration: 2 },
              { label: "Dry-out & monitoring", start: 2, duration: 5 },
              { label: "Open & assess", start: 5, duration: 2 },
              { label: "Structural repair", start: 7, duration: 6 },
              { label: "Mold remediation", start: 11, duration: 5 },
              { label: "Drywall & paint", start: 14, duration: 8 },
              { label: "Flooring & trim", start: 20, duration: 7 },
              { label: "Final inspection", start: 26, duration: 3 },
            ]}
          />
          <DecisionFlow
            title="Repair or replace? The sequence we follow"
            steps={[
              {
                question: "Is moisture still active or the source unidentified?",
                yes: "Fix the source and dry the assembly. Never cover wet material.",
                no: "Proceed to assess how far the damage travels.",
              },
              {
                question: "Is the damage localized to a single area?",
                yes: "Targeted repair is usually the responsible spend.",
                no: "Scope a full section or system replacement with photos.",
              },
              {
                question: "Has the assembly already been replaced once?",
                yes: "Replace rather than patch. Repeat failures mean the detail is wrong.",
                no: "Document the repair, then monitor the next rainy season.",
              },
            ]}
          />
        </div>
      </section>

      {/* Crew and jobsite band — the people and equipment behind the work. */}
      <section className="border-y border-[#1d211d]/10 bg-[#182019] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">Who shows up</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[.96] tracking-[-.055em] sm:text-5xl">
                Every trade is a separate, vetted relationship.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
                Roofers, electricians, plumbers, HVAC technicians, painters, tile setters, carpenters,
                drywall crews, masons, and landscapers. We coordinate the sequence and hold the standard.
              </p>
            </div>
            <Link to="/trades" className="inline-flex items-center text-sm font-semibold text-[#d5ec77]">
              See the full trade network <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {crew.map(([label, id]) => (
              <figure key={label} className="group overflow-hidden rounded-2xl border border-white/10">
                <div
                  className="h-40 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${px(id, 700)})` }}
                />
                <figcaption className="bg-white/[.06] p-3 text-[11px] font-medium text-white/80">{label}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {site.map(([label, id]) => (
              <figure key={label} className="group overflow-hidden rounded-2xl border border-white/10">
                <div
                  className="h-32 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${px(id, 700)})` }}
                />
                <figcaption className="bg-white/[.06] p-3 text-[11px] font-medium text-white/70">{label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d5ec77]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-10">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Recognize anything here?</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-.055em] sm:text-5xl">
              Send a photo and a ZIP code. We will tell you what we see.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => navigate("/#estimate-form")}
              className="h-14 rounded-full bg-[#1d211d] px-7 font-semibold text-white hover:bg-[#30382f]"
            >
              Get a free estimate <ArrowUpRight className="ml-2 size-5" />
            </Button>
            <a
              href={PHONE_HREF}
              className="flex h-14 items-center gap-2 rounded-full border border-[#1d211d]/25 px-6 text-sm font-semibold hover:bg-white/40"
            >
              <ShieldCheck className="size-4" /> Call 424 426 0760
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1d211d]/10 bg-[#f7f5f0]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#1d211d] text-[#d5ec77]">
              <House className="size-4" />
            </span>
            LoveMeAfter
          </Link>
          <p className="text-[#62695f]">Conditions library · education, not a diagnosis of your home.</p>
          <Link to="/services" className="font-semibold text-[#71803d]">
            Browse every project type <ArrowUpRight className="ml-1 inline size-4" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
