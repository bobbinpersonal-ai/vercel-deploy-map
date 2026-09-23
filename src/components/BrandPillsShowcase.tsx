"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { BRAND_PILLS } from "@/data/brand-pills";

const ROW_LABELS: Record<string, string> = {
  fencing: "Fencing by manufacturer",
  roofing: "Roofing by manufacturer",
  hvac: "HVAC by manufacturer",
  windows: "Windows & doors by manufacturer",
  siding: "Siding by manufacturer",
  doors: "Entry & patio doors by manufacturer",
  plumbing: "Plumbing by manufacturer",
  electrical: "Electrical by manufacturer",
  lighting: "Lighting by manufacturer",
  solar: "Solar & backup power by manufacturer",
  insulation: "Insulation by manufacturer",
  countertops: "Countertops by manufacturer",
  decks: "Decking by manufacturer",
  baths: "Bath, tile & waterproofing by manufacturer",
};

export function BrandPillsShowcase() {
  return (
    <section className="video-through-section relative z-10 border-y border-[#1d211d]/10 bg-[#182019]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-[#71803d] uppercase">What we specify</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-5xl">
              Real brands. Real project types.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#c8d1b6]">
              From fencing to roofing, HVAC, windows, and plumbing — see the brands we match to each project type, with the kind of product we specify.
            </p>
          </div>
        </div>

        {Object.entries(groupBrandRows())
          .map(([category, brands], categoryIndex) => (
            <div key={category} className="mt-16">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold tracking-[.16em] uppercase text-[#d5ec77]">
                  {ROW_LABELS[category] ?? category}
                </h3>
                <span className="flex size-1.5 rounded-full bg-[#d5ec77]/60" />
              </div>
              <div className="mt-4 overflow-hidden">
                <ScrollRow brands={brands} category={category} />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

function ScrollRow({ brands, category }: { brands: { brand: string; slug: string; imageId: number }[], category: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const maxScroll = (() => {
    if (!trackRef.current) return 0;
    return trackRef.current.scrollWidth - trackRef.current.clientWidth;
  })();

  useEffect(() => {
    if (!trackRef.current) return;
    const handleScroll = () => setScrollOffset(trackRef.current!.scrollLeft);
    trackRef.current.addEventListener("scroll", handleScroll, { passive: true });
    return () => trackRef.current!.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (maxScroll === 0) return;
    const interval = setInterval(() => {
      const next = scrollOffset >= maxScroll ? 0 : scrollOffset + 1;
      setScrollOffset(next);
    }, 20);
    return () => clearInterval(interval);
  }, [maxScroll, scrollOffset]);

  return (
    <div ref={trackRef} className="landscape-carousel pip-scroll">
      <ul className="pip-scroll__rails pip-list">
        {brands.map(({ brand, imageId }) => (
          <li key={`${category}-${brand}`} className="pip-scroll__item pip-card">
            <a
              href={`/services/${slugToHref(imageId)}`}
              className="pip-card__inner"
              onClick={(event) => event.preventDefault()}
            >
              <span className="pip-card__label">{categoryLabel(category)} {brand}</span>
              <span className="pip-card__photo" style={{ backgroundImage: `url(${brandImage(imageId)})` }} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function groupBrandRows() {
  const grouped: Record<string, { brand: string; slug: string; imageId: number }[]> = {};
  for (const entry of BRAND_PILLS) {
    grouped[entry.slug] ??= [];
    grouped[entry.slug].push({ brand: entry.brand, slug: entry.slug, imageId: entry.imageId });
  }
  return grouped;
}

function categoryLabel(category: string) {
  const map: Record<string, string> = {
    fencing: "Fencing by",
    roofing: "Roofing by",
    hvac: "HVAC by",
    windows: "Windows by",
    siding: "Siding by",
    doors: "Doors by",
    plumbing: "Plumbing by",
    electrical: "Electrical by",
    lighting: "Lighting by",
    solar: "Solar by",
    insulation: "Insulation by",
    countertops: "Countertops by",
    decks: "Decking by",
    baths: "Bath & tile by",
  };
  return map[category] ?? `${category} by`;
}

function slugToHref(imageId: number) {
  return `#${imageId}`;
}

function brandImage(id: number, w = 720) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}
