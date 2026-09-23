import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const PROJECT_VIDEO = "/copy_5E397E73-24D9-4597-8204-60EA4CE89EDD.mp4";

const CATEGORY_LABELS: Record<string, { eyebrow: string; title: string; description: string }> = {
  "Exterior & protection": {
    eyebrow: "Exterior project film",
    title: "Protection starts with seeing the whole property.",
    description: "A short field film for roofing, siding, windows, doors, gutters, paint, and the exterior details that work together.",
  },
  "Outdoor spaces & property": {
    eyebrow: "Property project film",
    title: "The work continues beyond the walls.",
    description: "A general project film for decks, paving, concrete, fencing, drainage, landscaping, and outdoor spaces.",
  },
  "Kitchens, baths & interiors": {
    eyebrow: "Interior project film",
    title: "Good work is a sequence of details.",
    description: "A general project film for kitchens, baths, flooring, cabinetry, tile, paint, trim, and finished living spaces.",
  },
  "Systems & comfort": {
    eyebrow: "Systems project film",
    title: "Comfort is built behind the finish.",
    description: "A general project film for HVAC, plumbing, electrical, lighting, insulation, solar, and the systems that make a home work.",
  },
  "Specialty projects": {
    eyebrow: "Coordinated project film",
    title: "Complex work needs one clear plan.",
    description: "A general project film for specialty, multi-trade, accessibility, pre-sale, and property coordination work.",
  },
};

const DEFAULT_LABEL = {
  eyebrow: "LoveMeAfter project film",
  title: "See the work before you plan it.",
  description: "A general project film showing the kind of home improvement work we help homeowners organize.",
};

export function ProjectVideo({ category }: { category: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const copy = CATEGORY_LABELS[category] ?? DEFAULT_LABEL;

  const startVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  return (
    <section className="border-y border-[#1d211d]/10 bg-[#182019] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:px-10 lg:py-20">
        <div>
          <p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">{copy.eyebrow}</p>
          <h2 className="mt-4 max-w-md text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-5xl">{copy.title}</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/70">{copy.description}</p>
          <p className="mt-5 text-xs leading-5 text-white/45">This category film is a quick visual overview. The inspection, scope, and final materials are specific to your home.</p>
        </div>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#101510] shadow-2xl">
          <video
            ref={videoRef}
            className="aspect-video w-full object-cover sm:aspect-[16/8]"
            src={PROJECT_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
            aria-label={`${copy.eyebrow} showing general home improvement work`}
            onLoadedMetadata={startVideo}
            onLoadedData={startVideo}
            onCanPlay={startVideo}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setPlaying(false)}
          />
          {!playing && (
            <button
              type="button"
              onClick={startVideo}
              className="absolute inset-x-4 bottom-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-[#182019]/90 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-[#263326]"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-[#d5ec77] text-[#182019]"><Play className="ml-0.5 size-3.5 fill-current" /></span>
              Play project film
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
