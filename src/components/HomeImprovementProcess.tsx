import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, CalendarCheck, Check, ClipboardCheck, Compass, Hammer, Home, Palette, PhoneCall, Sparkles, Users } from "lucide-react";
import { Link, useLocation } from "react-router";
import { twMerge } from "tailwind-merge";
import { px } from "@/data/photos";

type ProcessItem = {
  badge: string;
  title: string;
  description: ReactNode;
  image?: string;
  imageAlt?: string;
  icon: typeof CalendarCheck;
};

const PROCESS_ITEMS: ProcessItem[] = [
  {
    badge: "01 · Request",
    title: "Tell us what needs attention.",
    description: "Share your project, address, and timing. We check service-area fit and confirm what you want to accomplish before scheduling the visit.",
    icon: CalendarCheck,
  },
  {
    badge: "02 · Inspect",
    title: "We look at the home and document the work.",
    description: "A project specialist reviews the affected area, takes photos and measurements, checks related conditions, and asks what matters to you. We separate required repairs from optional upgrades.",
    image: px(8293635, 1000),
    imageAlt: "Project inspection checklist and field notes",
    icon: ClipboardCheck,
  },
  {
    badge: "03 · Scope & price",
    title: "You get the work in writing before you decide.",
    description: "Your scope describes preparation, materials, installation, exclusions, cleanup, schedule assumptions, and price. We explain repair and replacement options where they apply; there is no pressure to proceed.",
    icon: Compass,
  },
  {
    badge: "04 · Select",
    title: "Choose the materials and finish that fit your home.",
    description: "We review product lines, colors, performance, availability, and warranty documents. Final choices and any changes are recorded in the approved scope before ordering.",
    image: px(9242911, 1000),
    imageAlt: "Project plans and product selections",
    icon: Palette,
  },
  {
    badge: "05 · Prepare",
    title: "We coordinate the crew, materials, and arrival details.",
    description: "Before work starts, the crew receives the approved scope, access notes, site-protection needs, schedule, and homeowner expectations. We confirm the work window and prepare the property.",
    icon: Users,
  },
  {
    badge: "06 · Complete & clean",
    title: "The crew completes the scope and leaves the site tidy.",
    description: "We protect the home and surrounding areas, complete the agreed work, remove project debris, and clean the work zone. If a hidden condition changes the scope, we document it and agree on next steps before proceeding.",
    image: px(4442490, 1000),
    imageAlt: "Residential crew completing home-improvement work",
    icon: Hammer,
  },
  {
    badge: "07 · Walkthrough",
    title: "Review the finished work together.",
    description: "We walk the completed project with you, test or review the finished details, photograph the result, and record any punch-list item so it has a clear owner.",
    image: px(8811446, 1000),
    imageAlt: "Clean residential project site after work is complete",
    icon: Check,
  },
  {
    badge: "08 · Follow up",
    title: "Know what was done and who to call next.",
    description: "You receive closeout details and the relevant product and workmanship warranty information. We follow up on open items and remain available for project questions after the crew leaves.",
    icon: Sparkles,
  },
];

/** A scroll-reactive beam that visually connects the homeowner's process steps. */
export function TracingBeam({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const gradientId = `process-gradient-${useId().replace(/:/g, "")}`;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 28%"] });

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const measure = () => setSvgHeight(content.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.78], [40, Math.max(svgHeight - 100, 40)]), { stiffness: 500, damping: 90 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [40, Math.max(svgHeight - 230, 40)]), { stiffness: 500, damping: 90 });

  return (
    <motion.div ref={ref} className={twMerge("relative mx-auto h-full w-full max-w-5xl", className)}>
      <div className="pointer-events-none absolute left-0 top-2 z-0 h-full sm:left-2 md:left-4" aria-hidden="true">
        <motion.div className="ml-[3px] flex size-4 items-center justify-center rounded-full border border-[#71803d]/35 bg-[#f7f5f0] shadow-[0_3px_8px_rgba(29,33,29,.14)]">
          <motion.div className="size-2 rounded-full border border-[#71803d] bg-[#d5ec77]" />
        </motion.div>
        <svg viewBox={`0 0 20 ${Math.max(svgHeight, 1)}`} width="20" height={Math.max(svgHeight, 1)} className="ml-1 block overflow-visible">
          <path d={`M 2 0 V ${Math.max(svgHeight - 4, 1)}`} fill="none" stroke="#71803d" strokeOpacity=".16" strokeWidth="1.5" />
          <motion.path d={`M 2 0 V ${Math.max(svgHeight - 4, 1)}`} fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" className="motion-reduce:hidden" />
          <defs>
            <motion.linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor="#d5ec77" stopOpacity="0" />
              <stop offset=".35" stopColor="#d5ec77" />
              <stop offset=".7" stopColor="#71803d" />
              <stop offset="1" stopColor="#71803d" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="relative z-10 pl-8 sm:pl-10 md:pl-16">{children}</div>
    </motion.div>
  );
}

export function HomeImprovementProcess() {
  const { pathname } = useLocation();
  const scheduleHref = pathname === "/" ? "#schedule" : "/#schedule";

  return (
    <section id="process" className="video-through-section relative z-10 border-y border-[#1d211d]/10 bg-[#eaf0d0]/72 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">Our process · start to finish</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[.96] tracking-[-.055em] sm:text-6xl">A clear scope. Careful work. A clean handoff.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#596357]">From your first request through inspection, written pricing, material selection, crew coordination, cleanup, walkthrough, and follow-up, every step has a clear next action and an owner.</p>
        </div>

        <TracingBeam className="mt-14">
          <div className="max-w-3xl">
            {PROCESS_ITEMS.map(({ badge, title, description, image, imageAlt, icon: Icon }, index) => (
              <article key={badge} className="mb-12 last:mb-0">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#71803d]/25 bg-[#f7f5f0] text-[#71803d] shadow-sm"><Icon className="size-4" /></span>
                  <span className="rounded-full bg-[#1d211d] px-3 py-1.5 text-[10px] font-semibold tracking-[.14em] text-[#d5ec77] uppercase">{badge}</span>
                </div>
                <h3 className="mt-5 max-w-2xl text-2xl font-semibold leading-tight tracking-[-.035em] sm:text-3xl">{title}</h3>
                <div className="mt-4 grid gap-5 md:grid-cols-[1fr_220px] md:items-start">
                  <p className="text-base leading-7 text-[#596357]">{description}</p>
                  {image && <img src={image} alt={imageAlt ?? "LoveMeAfter project process"} loading="lazy" className="h-36 w-full rounded-2xl border border-[#1d211d]/10 object-cover shadow-sm md:h-32" />}
                </div>
                {index === 2 && <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#71803d]/25 bg-white/75 p-4 text-sm leading-6 text-[#4f5a4d]"><Home className="mt-0.5 size-5 shrink-0 text-[#71803d]" /><span><strong className="text-[#1d211d]">You approve the scope before work begins.</strong> If you choose to move ahead, product selections, price, and agreed work are documented first.</span></div>}
              </article>
            ))}
          </div>
        </TracingBeam>

        <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-4 rounded-2xl border border-[#71803d]/25 bg-[#1d211d] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div><p className="text-xs font-semibold tracking-[.16em] text-[#d5ec77] uppercase">Ready for the first step?</p><p className="mt-2 text-lg font-semibold">Schedule the conversation around your home—not around a script.</p></div>
          <Link to={scheduleHref} className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#d5ec77] px-5 py-3 text-sm font-semibold text-[#1d211d] transition hover:bg-[#e5f795]">Schedule an appointment <ArrowUpRight className="ml-2 size-4" /></Link>
        </div>
      </div>
    </section>
  );
}

export default HomeImprovementProcess;
