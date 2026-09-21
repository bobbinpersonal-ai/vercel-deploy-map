import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Map, MoveRight } from "lucide-react";
import { useNavigate } from "react-router";

const regions = [
  { name: "North Reach", x: "22%", y: "28%", color: "bg-[#c88762]" },
  { name: "East Field", x: "72%", y: "34%", color: "bg-[#7e9b8d]" },
  { name: "The Lowlands", x: "48%", y: "69%", color: "bg-[#d2ae70]" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f3f0e9] text-[#252523]">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-7 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase">
          <span className="flex size-8 items-center justify-center rounded-full border border-[#252523]/25">
            <Compass className="size-4" strokeWidth={1.5} />
          </span>
          Atlas / Studio
        </div>
        <button
          onClick={() => navigate("/auth")}
          className="group flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#6d6c67] transition-colors hover:text-[#252523]"
        >
          Enter atlas <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </nav>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-20 pt-10 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-14 lg:pb-28 lg:pt-20">
        <div className="flex flex-col justify-center">
          <p className="mb-7 flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] text-[#9b6b50] uppercase">
            <span className="h-px w-8 bg-[#9b6b50]" />
            A living map for your work
          </p>
          <h1 className="max-w-xl font-serif text-6xl leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-[7.5rem]">
            Know your <em className="font-normal text-[#9b6b50]">territory.</em>
          </h1>
          <p className="mt-9 max-w-md text-base leading-7 text-[#6d6c67]">
            A quiet, considered space to see where your projects live, what is moving, and what is ready to ship.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              onClick={() => navigate("/auth")}
              className="group flex items-center gap-6 rounded-full bg-[#252523] px-6 py-3.5 text-sm font-medium text-[#f3f0e9] transition-transform hover:-translate-y-0.5"
            >
              Open your map <MoveRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <span className="text-xs tracking-[0.12em] text-[#9b9990] uppercase">Private by design</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative min-h-[460px] overflow-hidden border border-[#252523]/15 bg-[#e7e3d9] shadow-[10px_12px_0_#d7d1c5] sm:min-h-[560px]"
        >
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#73756d_1px,transparent_1px),linear-gradient(90deg,#73756d_1px,transparent_1px)] [background-size:44px_44px]" />
          <svg className="absolute inset-0 size-full" viewBox="0 0 700 620" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-20 188 C105 112 177 153 260 101 S420 60 510 128 S612 206 730 170 L730 400 C635 423 596 367 499 411 S296 465 206 397 S67 442 -20 402Z" fill="#b9c6b7" stroke="#64766c" strokeWidth="2" />
            <path d="M-20 430 C78 378 130 474 231 441 S383 394 480 454 S616 505 730 431 L730 660 L-20 660Z" fill="#d7bd84" stroke="#a18a5d" strokeWidth="2" />
            <path d="M82 0 C112 90 88 173 137 244 S220 354 185 620 M370 0 C330 119 400 192 354 288 S350 468 402 620 M548 0 C509 109 573 184 529 289 S585 438 566 620" fill="none" stroke="#9b8e7b" strokeDasharray="7 9" strokeWidth="2" opacity=".8" />
          </svg>
          {regions.map((region) => (
            <div key={region.name} className="absolute flex items-center gap-2 text-[10px] font-semibold tracking-[0.16em] text-[#343631] uppercase" style={{ left: region.x, top: region.y }}>
              <span className={`size-2.5 rounded-full ${region.color} ring-4 ring-[#f3f0e9]/60`} />
              {region.name}
            </div>
          ))}
          <div className="absolute bottom-6 left-6 border-l border-[#252523]/30 pl-3 text-[10px] leading-4 tracking-[0.14em] text-[#6d6c67] uppercase">
            01 — Field notes<br />Your territory, at a glance
          </div>
          <div className="absolute right-6 top-6 text-right font-mono text-[10px] leading-4 text-[#6d6c67]">
            43° 18' N<br />70° 41' W
          </div>
          <div className="absolute bottom-6 right-6 flex items-center gap-2 text-xs text-[#6d6c67]
          "><Map className="size-4" strokeWidth={1.5} /> Atlas view</div>
        </motion.div>
      </section>
    </main>
  );
}
