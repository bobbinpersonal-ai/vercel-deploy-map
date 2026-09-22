/**
 * Lightweight index of every project type LoveMeAfter runs.
 *
 * This intentionally duplicates the slug/title/category of `PROJECT_LIBRARY` in
 * `src/data/projects.ts` so the always-visible bottom pill rail can render all
 * projects without pulling the full guide content into the main bundle.
 *
 * Keep this list in sync with PROJECT_LIBRARY when projects are added.
 */
export type ProjectIndexEntry = { slug: string; label: string; category: string };

export const PROJECT_CATEGORY_ORDER = [
  "Exterior & protection",
  "Outdoor spaces & property",
  "Kitchens, baths & interiors",
  "Systems & comfort",
  "Specialty projects",
] as const;

export const PROJECT_INDEX: ProjectIndexEntry[] = [
  // Exterior & protection
  { slug: "roofing", label: "Roofing", category: "Exterior & protection" },
  { slug: "siding", label: "Siding", category: "Exterior & protection" },
  { slug: "windows", label: "Windows", category: "Exterior & protection" },
  { slug: "gutters", label: "Gutters", category: "Exterior & protection" },
  { slug: "exterior-paint", label: "Exterior paint", category: "Exterior & protection" },
  { slug: "doors", label: "Doors & entry", category: "Exterior & protection" },
  { slug: "garage-doors", label: "Garage doors", category: "Exterior & protection" },

  // Outdoor spaces & property
  { slug: "decks", label: "Decks & porches", category: "Outdoor spaces & property" },
  { slug: "fencing", label: "Fencing & gates", category: "Outdoor spaces & property" },
  { slug: "paving", label: "Driveways & paving", category: "Outdoor spaces & property" },
  { slug: "concrete", label: "Concrete & flatwork", category: "Outdoor spaces & property" },
  { slug: "masonry", label: "Masonry", category: "Outdoor spaces & property" },
  { slug: "patios", label: "Patios & hardscape", category: "Outdoor spaces & property" },
  { slug: "drainage", label: "Drainage & grading", category: "Outdoor spaces & property" },
  { slug: "landscaping", label: "Landscaping", category: "Outdoor spaces & property" },

  // Kitchens, baths & interiors
  { slug: "kitchens", label: "Kitchens", category: "Kitchens, baths & interiors" },
  { slug: "bathrooms", label: "Bathrooms", category: "Kitchens, baths & interiors" },
  { slug: "basements", label: "Basements", category: "Kitchens, baths & interiors" },
  { slug: "flooring", label: "Flooring", category: "Kitchens, baths & interiors" },
  { slug: "tile", label: "Tile & backsplash", category: "Kitchens, baths & interiors" },
  { slug: "cabinetry", label: "Cabinetry", category: "Kitchens, baths & interiors" },
  { slug: "countertops", label: "Countertops", category: "Kitchens, baths & interiors" },
  { slug: "interior-painting", label: "Interior paint", category: "Kitchens, baths & interiors" },
  { slug: "drywall", label: "Drywall", category: "Kitchens, baths & interiors" },
  { slug: "trim", label: "Trim & millwork", category: "Kitchens, baths & interiors" },
  { slug: "closets", label: "Closets & storage", category: "Kitchens, baths & interiors" },

  // Systems & comfort
  { slug: "hvac", label: "HVAC & comfort", category: "Systems & comfort" },
  { slug: "plumbing", label: "Plumbing", category: "Systems & comfort" },
  { slug: "electrical", label: "Electrical", category: "Systems & comfort" },
  { slug: "panel-upgrades", label: "Panel upgrades", category: "Systems & comfort" },
  { slug: "smart-home", label: "Smart home", category: "Systems & comfort" },
  { slug: "backup-power", label: "Backup power", category: "Systems & comfort" },
  { slug: "insulation", label: "Insulation", category: "Systems & comfort" },
  { slug: "air-quality", label: "Air quality", category: "Systems & comfort" },

  // Specialty projects
  { slug: "solar", label: "Solar & battery", category: "Specialty projects" },
  { slug: "accessibility", label: "Aging in place", category: "Specialty projects" },
  { slug: "insurance-claims", label: "Insurance claims", category: "Specialty projects" },
  { slug: "historic-homes", label: "Historic homes", category: "Specialty projects" },
  { slug: "rental-turnover", label: "Rental turnover", category: "Specialty projects" },
  { slug: "property-maintenance", label: "Property maintenance", category: "Specialty projects" },
  { slug: "pre-sale", label: "Pre-sale plans", category: "Specialty projects" },
  { slug: "punch-list", label: "Punch lists", category: "Specialty projects" },
  { slug: "multi-trade", label: "Multi-trade", category: "Specialty projects" },
  { slug: "emergency-repair", label: "Emergency repair", category: "Specialty projects" },
];

export const PROJECT_INDEX_COUNT = PROJECT_INDEX.length;
