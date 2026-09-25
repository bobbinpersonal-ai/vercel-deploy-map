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
    badge: "01 · Start with a time",
    title: "You schedule. We make the appointment useful.",
    description: "Choose the kind of conversation you need and tell us when you are available. A coordinator checks the address, project type, service area, and what you want the visit to accomplish before putting anything on a representative’s calendar.",
    icon: CalendarCheck,
  },
  {
    badge: "02 · Before we arrive",
    title: "We confirm the person, the time, and the point of the visit.",
    description: "You receive a confirmation before anyone comes out—not a mystery knock. We share who is coming, what they can evaluate, how long to expect, and anything useful to have ready: prior quotes, photos, plans, or questions.",
    icon: PhoneCall,
  },
  {
    badge: "03 · The right conversation",
    title: "You are matched with a field representative who can see the whole project.",
    description: "Your representative listens first, walks the property, documents conditions, and separates the urgent from the optional. You do not need to diagnose the trade yourself; you only need to explain what is not working and what you want life at home to feel like.",
    image: px(8293635, 1000),
    imageAlt: "A project inspection checklist and field notes",
    icon: Users,
  },
  {
    badge: "04 · Options in the market",
    title: "We bring a real comparison—not a take-it-or-leave-it pitch.",
    description: "Because we coordinate a national network, we can recognize the available product, installation, and pricing paths in the marketplace. We build competitive options around the actual scope, explain what changes between them, and give you room to make the final decision.",
    icon: Compass,
  },
  {
    badge: "05 · Design begins",
    title: "Your project becomes a design conversation, not just an order.",
    description: "Once you choose a direction, the process can combine an in-person design consultant with our national design team. Use local eyes for how the home lives and national architectural and styling perspective for materials, proportion, flow, and the details that make the finished work feel intentional.",
    image: px(9242911, 1000),
    imageAlt: "Plans and project documents laid out for review",
    icon: Palette,
  },
  {
    badge: "06 · One point of contact",
    title: "Your consultant stays with you when the crew starts.",
    description: "The handoff does not end at the signature. Your consultant helps manage crew expectations, access, schedule questions, material decisions, and the difference between the written scope and a hidden condition discovered in the field.",
    image: px(4442490, 1000),
    imageAlt: "A construction worker building a home project on site",
    icon: Hammer,
  },
  {
    badge: "07 · Finish with care",
    title: "The job closes with a walkthrough, not a wave from the driveway.",
    description: "The crew protects the property, cleans up the work area, completes the agreed scope, and walks the result with you. We document the finish, surface any punch-list items, and make sure you understand what was done and how to care for it.",
    image: px(8811446, 1000),
    imageAlt: "A clean jobsite after project work is complete",
    icon: Check,
  },
  {
    badge: "08 · After the install",
    title: "We keep showing up after the exciting part is over.",
    description: "Post-install follow-up gives you a clear place to ask questions, report a punch-list item, understand warranty support, or plan the next phase. A roof, window, kitchen, lighting, or outdoor project should leave you with more confidence—not another phone tree to navigate.",
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
          <p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">From first click to final follow-up</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[.96] tracking-[-.055em] sm:text-6xl">You are not handed off halfway through.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#596357]">A home project has a lot of moments where the homeowner can feel forgotten: after the form, after the sale, when the crew arrives, or when the dust settles. Our process is designed to keep one accountable thread running through all of them.</p>
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
                {index === 3 && <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#71803d]/25 bg-white/75 p-4 text-sm leading-6 text-[#4f5a4d]"><Home className="mt-0.5 size-5 shrink-0 text-[#71803d]" /><span><strong className="text-[#1d211d]">Your choice remains yours.</strong> We can explain the options, compare the scope, and make a recommendation. You decide what to do, when to do it, and whether to do it at all.</span></div>}
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
