import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleDollarSign, House, Phone, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getProjectGuide, relatedGuides } from "@/data/projects";

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
  const project = getProjectGuide(service);
  const navigate = useNavigate();

  useEffect(() => {
    if (project) document.title = `${project.title} | LoveMeAfter`;
    return () => {
      document.title = "LoveMeAfter";
    };
  }, [project]);

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

  const related = relatedGuides(project);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#1d211d]">
      <header className="bg-[#182019] text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#d5ec77] text-[#1d211d]">
              <House className="size-5" />
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
            <span className="text-[11px] font-semibold tracking-[.16em] text-white/50 uppercase">{project.eyebrow}</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">{project.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              onClick={() => navigate("/#estimate-form")}
              className="h-14 rounded-full bg-[#d5ec77] px-7 text-[#1d211d] hover:bg-[#e1f895]"
            >
              Start with a free estimate <ArrowUpRight className="ml-2 size-5" />
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

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="h-72 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${project.gallery[0]})` }} />
          <div className="h-72 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${project.gallery[1]})` }} />
        </div>
        <p className="mt-3 text-xs leading-5 text-[#7c8579]">
          Free-to-use reference photography via Unsplash and Pexels. These images illustrate the type of work, not a
          claim that LoveMeAfter completed the pictured project.
        </p>
        <div className="mt-12 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#87964b] uppercase">What good looks like</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">
              A clear job, not a moving target.
            </h2>
          </div>
          <p className="text-lg leading-8 text-[#62695f]">{project.detail}</p>
        </div>
      </section>

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
            {project.faqs.map(([question, answer], index) => (
              <details
                key={question}
                open={index === 0}
                className="group rounded-2xl border border-[#1d211d]/10 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
                  <span className="text-base font-semibold">{question}</span>
                  <span className="shrink-0 rounded-full border border-[#1d211d]/15 px-3 py-1 text-xs font-semibold text-[#71803d] transition group-open:rotate-90">
                    →
                  </span>
                </summary>
                <p className="border-t border-[#1d211d]/10 px-5 pb-6 pt-5 text-sm leading-6 text-[#62695f] sm:px-6">
                  {answer}
                </p>
              </details>
            ))}
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
              onClick={() => navigate("/#estimate-form")}
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
