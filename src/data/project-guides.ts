import { getProjectGuide, PROJECT_LIBRARY, type ProjectGuide } from "./projects";
import { projectGallery, projectHero, projectProducts } from "./photos";

/**
 * The project library draws its imagery from the verified Pexels photo library
 * so every project renders subject-matched photographs rather than a shared
 * pool of generic stock.
 */
export function enrichGuide(guide: ProjectGuide): ProjectGuide {
  return {
    ...guide,
    heroImage: projectHero(guide.slug),
    gallery: projectGallery(guide.slug),
    products: projectProducts(guide.slug),
  };
}

/** Full guide for a service slug, with matched photography. */
export function getGuide(slug: string | undefined) {
  const guide = getProjectGuide(slug);
  return guide ? enrichGuide(guide) : undefined;
}

/** Related projects, also enriched with matched photography. */
export function relatedGuides(guide: ProjectGuide, count = 3): ProjectGuide[] {
  const picks = guide.related
    .map((slug) => PROJECT_LIBRARY.find((project) => project.slug === slug))
    .filter((project): project is ProjectGuide => Boolean(project))
    .slice(0, count)
    .map(enrichGuide);

  if (picks.length >= count) return picks;

  const filler = PROJECT_LIBRARY.filter(
    (project) => project.slug !== guide.slug && !guide.related.includes(project.slug),
  )
    .slice(0, count - picks.length)
    .map(enrichGuide);

  return [...picks, ...filler];
}
