import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleDollarSign, Phone, ShieldCheck } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { clip, usePageMeta } from "@/components/PageMeta";
import { Link, useNavigate, useParams } from "react-router";
import { getGuide, relatedGuides } from "@/data/project-guides";
import { CATEGORY_PHOTOS } from "@/data/photos";
import { PhaseTimeline, SeverityMeter } from "@/components/GeneratedGraphics";
import { FinancingShowcase } from "@/components/FinancingShowcase";
import { ProjectVideo } from "@/components/ProjectVideo";
import { ManufacturerShowcase } from "@/components/ManufacturerShowcase";
import { openEstimateRequest } from "@/lib/estimate-request";

/** Per-category field risk and phasing, so guides read differently by trade. */
const CATEGORY_INSIGHT: Record<
  string,
  { severity: number; severityLabel: string; severityCaption: string; phases: { label: string; start: number; duration: number }[] }
> = {
  "Exterior & protection": {
    severity: 74,
    severityLabel: "Moisture exposure risk if deferred",
    severityCaption: "Envelope work protects everything inside it. A missed flashing detail can undo an entire interior remodel.",
    phases: [
      { label: "Inspect & document", start: 0, duration: 2 },
      { label: "Permits & material", start: 2, duration: 5 },
      { label: "Remove existing", start: 7, duration: 3 },
      { label: "Repair substrate", start: 10, duration: 4 },
      { label: "Install new material", start: 14, duration: 6 },
      { label: "Flashing & detail", start: 20, duration: 3 },
      { label: "Cleanup & walkthrough", start: 23, duration: 2 },
    ],
  },
  "Kitchens, baths & interiors": {
    severity: 58,
    severityLabel: "Disruption and rework risk",
    severityCaption: "Interior work is mostly sequencing. Trade order and material lead times decide the finish quality.",
    phases: [
      { label: "Design & permits", start: 0, duration: 14 },
      { label: "Demolition", start: 14, duration: 3 },
      { label: "Rough-in (MEP)", start: 17, duration: 6 },
      { label: "Inspection", start: 23, duration: 2 },
      { label: "Drywall & paint", start: 25, duration: 6 },
      { label: "Cabinets & counters", start: 31, duration: 10 },
      { label: "Tile & trim", start: 41, duration: 6 },
      { label: "Punch list", start: 47, duration: 4 },
    ],
  },
  "Systems & comfort": {
    severity: 66,
    severityLabel: "Safety and performance risk",
    severityCaption: "Mechanical work is permitted, tested, and inspected. Sizing errors show up as comfort complaints within a season.",
    phases: [
      { label: "Diagnose & size", start: 0, duration: 2 },
      { label: "Permits", start: 2, duration: 5 },
      { label: "Equipment lead time", start: 7, duration: 8 },
      { label: "Install", start: 15, duration: 3 },
      { label: "Commission & test", start: 18, duration: 2 },
      { label: "Seasonal follow-up", start: 20, duration: 14 },
    ],
  },
  "Outdoor spaces & property": {
    severity: 52,
    severityLabel: "Water and ground movement risk",
    severityCaption: "Ground work fails from the bottom up. Base preparation and drainage decide whether the finish lasts.",
    phases: [
      { label: "Layout & permits", start: 0, duration: 5 },
      { label: "Excavate & prepare", start: 5, duration: 4 },
      { label: "Base & drainage", start: 9, duration: 5 },
      { label: "Install or pour", start: 14, duration: 4 },
      { label: "Cure or finish", start: 18, duration: 7 },
      { label: "Restore & clean", start: 25, duration: 3 },
    ],
  },
  "Specialty projects": {
    severity: 45,
    severityLabel: "Documentation and compliance risk",
    severityCaption: "Specialty work lives or dies on paperwork, evidence, and inspection. Get it in writing before work starts.",
    phases: [
      { label: "Assess & document", start: 0, duration: 3 },
      { label: "Scope & approve", start: 3, duration: 4 },
      { label: "Schedule crews", start: 7, duration: 5 },
      { label: "Execute work", start: 12, duration: 10 },
      { label: "Inspect & close out", start: 22, duration: 3 },
    ],
  },
};

const DEFAULT_INSIGHT = {
  severity: 55,
  severityLabel: "Rework risk when scoped loosely",
  severityCaption: "Every trade has a failure mode. Documenting the existing condition is what prevents a surprise change order.",
  phases: [
    { label: "Assess", start: 0, duration: 2 },
    { label: "Scope & approve", start: 2, duration: 3 },
    { label: "Schedule crews", start: 5, duration: 3 },
    { label: "Execute", start: 8, duration: 8 },
    { label: "Close out", start: 16, duration: 3 },
  ],
};

const STEPS = [
  ["01", "Tell us what needs doing", "A homeowner request, referral, call, or appointment starts the conversation."],
  ["02", "Inspect and document", "We walk the project, photograph the conditions, and listen to the outcome the homeowner wants."],
  ["03", "Build the written scope", "Materials, prep, access, permits, schedule assumptions, and a real number are put in writing."],
  ["04", "Choose the path forward", "The homeowner can compare options, use financing if approved, or decide not to proceed."],
  ["05", "Schedule the checked crew", "The crew lead, work window, scope, access notes, and site expectations are confirmed."],
  ["06", "Complete and follow up", "We review the finish, collect completion photos, close the punch list, and support the warranty."],
] as const;

export default function ProjectProcess() {
  const { service } = useParams();
  const project = getGuide(service);
  const navigate = useNavigate();

  usePageMeta(
    project ? `${project.title} | LoveMeAfter` : "Home improvement project guides | LoveMeAfter",
    project ? clip(project.intro) : undefined,
  );

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0] p-6 text-center">
        <div>
          <p className="font-serif text-3xl">Project guide not found</p>
          <Button onClick={() => navigate("/services")} className="mt-5 rounded-full">
            View services
          </Button>
        </div>
      </div>
    );
  }

  const related = relatedGuides(project, 3);
  const insight = CATEGORY_INSIGHT[project.category] ?? DEFAULT_INSIGHT;
  const fieldPhotos = CATEGORY_PHOTOS[project.category] ?? CATEGORY_PHOTOS["Home improvement"];

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#1d211d]">
      <header className="bg-[#182019] text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex size-10 items-center justify-center rounded-fullbg-[#d5ec77] text-[#1d211d]"><LogoMark className="size-5" />
            </span>
            LoveMeAfter
          </Link>
          <Button
            onClick={() => navigate("/services")}
            variant="ghost"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="mr-2 size-4" /> All services
          </Button>
        </nav>
      </header>

      <section className="relative min-h-[560px] bg-[#182019] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(15,22,16,.94),rgba(15,22,16,.45)),url(${project.heroImage})`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#d5ec77]/40 px-3 py-1 text-[11px] font-semibold tracking-[.16em] text-[#d5ec77] uppercase">
              {project.category}
            </span>
            <span className="text-[11px] font-semibold tracking-[.16em] text-white/75 uppercase">{project.eyebrow}</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">{project.intro}</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/75"><span><strong className="text-white">Benefit-first:</strong> protection, everyday comfort, or a supported ROI case.</span><span><strong className="text-white">Pay your way:</strong> cash or optional lender financing, if approved.</span><span><strong className="text-white">Right-qualified pros:</strong> credentials matched to scope and local rules.</span></div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              onClick={() => openEstimateRequest(project.title)}
              className="h-14 rounded-full bg-[#d5ec77] px-7 text-[#1d211d] hover:bg-[#e1f895]"
            >
              Start with a free assessment <ArrowUpRight className="ml-2 size-5" />
            </Button>
            <a
              href="tel:+14244260760"
              className="flex h-14 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-semibold hover:bg-white/10"
            >
              <Phone className="size-4" /> 424 426 0760
            </a>
          </div>
        </div>
      </section>

      <ProjectVideo category={project.category} />

      <ManufacturerShowcase slug={project.slug} />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#b4543a] uppercase">Before the work looks good</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-5xl">
              What we document in the field.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#62695f]">
              The condition behind the wall, under the shingle, or below the slab is what decides the real
              scope. We photograph it, label it, and put it in the estimate so nothing is a surprise.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {fieldPhotos.map(([, label, id]) => (
                <figure key={label} className="group overflow-hidden rounded-2xl border border-[#1d211d]/10 bg-white">
                  <img
                    src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=700`}
                    alt={label}
                    loading="lazy"
                    className="h-40 w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </figure>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <SeverityMeter
              value={insight.severity}
              label={insight.severityLabel}
              caption={insight.severityCaption}
            />
            <PhaseTimeline title="How this project is phased" phases={insight.phases} />
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">What good looks like</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">
              A clear job, not a moving target.
            </h2>
          </div>
          <p className="text-lg leading-8 text-[#62695f]">{project.detail}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10"><FinancingShowcase project={project.title.toLowerCase()} compact /></section>

      <section className="border-y border-[#1d211d]/10 bg-[#eaf0d0]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-24">
          <div>
            <div className="flex items-center gap-3 text-[#657035]">
              <CircleDollarSign className="size-5" />
              <p className="text-xs font-semibold tracking-[.16em] uppercase">What you actually get back</p>
            </div>
            <h2 className="mt-5 text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-5xl">
              {project.value.headline}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-[#596357]">
              Improvement numbers vary by market, scope, and timing. We use them as direction, never as a promise about
              your specific home.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {project.value.notes.map(([label, copy]) => (
              <div key={label} className="rounded-2xl border border-[#1d211d]/10 bg-white p-6">
                <ShieldCheck className="size-5 text-[#71803d]" />
                <h3 className="mt-6 text-base font-semibold">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-[#62695f]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Included in the scope</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.055em] sm:text-6xl">No mystery line items.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#62695f]">
            Every project we scope lists what is included, what is excluded, and what would trigger a written change
            order.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {project.items.map((item, index) => (
            <div key={item} className="rounded-2xl border border-[#1d211d]/10 bg-white p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#eaf0d0] text-[#71803d]">
                <Check className="size-5" />
              </span>
              <p className="mt-8 text-xs text-[#9aa095]">0{index + 1}</p>
              <p className="mt-2 text-sm font-medium leading-6">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#1d211d]/10 bg-[#ece9e0]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Start to finish</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-.055em] sm:text-6xl">How the project moves.</h2>
            </div>
            <Phone className="hidden size-7 text-[#71803d] sm:block" />
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map(([number, title, copy]) => (
              <div key={number} className="border-t-2 border-[#1d211d]/15 pt-5">
                <span className="text-sm font-semibold text-[#71803d]">{number}</span>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#62695f]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">Common questions</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-5xl">
              Straight answers, before you commit.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-[#62695f]">
              Still unsure about something specific to your home? Ask us and we will give you the honest version.
            </p>
          </div>
          <div className="space-y-3">
            {project.faqs.map(([question, answer], index) => {
              const staffingQuestion = /subcontract|self-perform/i.test(question);
              const displayQuestion = staffingQuestion ? "How are projects staffed?" : question;
              const displayAnswer = staffingQuestion
                ? "We are growing our in-house field team while matching each project to qualified professionals based on trade, scope, and location. Required credentials and insurance are checked as applicable before work begins."
                : answer;
              return (
              <details
                key={displayQuestion}
                open={index === 0}
                className="group rounded-2xl border border-[#1d211d]/10 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
                  <span className="text-base font-semibold">{displayQuestion}</span>
                  <span className="shrink-0 rounded-full border border-[#1d211d]/15 px-3 py-1 text-xs font-semibold text-[#71803d] transition group-open:rotate-90">
                    →
                  </span>
                </summary>
                <p className="border-t border-[#1d211d]/10 px-5 pb-6 pt-5 text-sm leading-6 text-[#62695f] sm:px-6">
                  {displayAnswer}
                </p>
              </details>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#1d211d]/10 bg-[#182019] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">One scope, many trades</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.05em] sm:text-4xl">
              This project is coordinated, not handed off.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
              LoveMeAfter coordinates each phase under one written scope. Specialists are matched to the trade and location, with required credentials, permits, and insurance verified as applicable. See the full network or explore field conditions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/trades"
              className="flex h-12 items-center rounded-full bg-[#d5ec77] px-6 text-sm font-semibold text-[#182019] hover:bg-[#e1f895]"
            >
              Trade network <ArrowUpRight className="ml-2 size-4" />
            </Link>
            <Link
              to="/conditions"
              className="flex h-12 items-center rounded-full border border-white/25 px-6 text-sm font-semibold hover:bg-white/10"
            >
              Field conditions
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[#1d211d]/10 bg-[#f1f4e7]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">Keep exploring</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-.055em] sm:text-5xl">Related projects.</h2>
            </div>
            <Link to="/services" className="inline-flex items-center text-sm font-semibold text-[#71803d]">
              See all project types <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((guide) => (
              <Link
                key={guide.slug}
                to={`/services/${guide.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#1d211d]/10 bg-white transition hover:-translate-y-1"
              >
                <div
                  className="h-44 bg-cover bg-center transition duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${guide.heroImage})` }}
                />
                <div className="p-5">
                  <p className="text-[10px] font-semibold tracking-[.14em] text-[#71803d] uppercase">{guide.category}</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-.02em]">{guide.title.split(",")[0]}</h3>
                  <span className="mt-4 inline-flex items-center text-xs font-semibold text-[#71803d]">
                    View the guide <ArrowRight className="ml-1 size-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d5ec77]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-10">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Ready to talk through your project?</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-.055em] sm:text-5xl">Get the first number in writing.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => openEstimateRequest(project.title)}
              className="h-14 rounded-full bg-[#1d211d] px-7 font-semibold text-white hover:bg-[#30382f]"
            >
              Request a free estimate <ArrowUpRight className="ml-2 size-5" />
            </Button>
            <a
              href="tel:+14244260760"
              className="flex h-14 items-center justify-center rounded-full border border-[#1d211d]/25 px-7 font-semibold hover:bg-white/40"
            >
              Call 424 426 0760 <Phone className="ml-2 size-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
