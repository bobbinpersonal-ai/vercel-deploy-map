/**
 * The LoveMeAfter project library.
 *
 * Every project type a homeowner can pick on the site resolves to an entry
 * here, so no service page is ever empty. Numbers used in value framing are
 * national benchmarks from public industry research (Zonda/JLC Cost vs. Value
 * and NAR Remodeling Impact) and are labelled as benchmarks, not promises.
 */

export type ProjectGuide = {
  slug: string;
  title: string;
  eyebrow: string;
  category: string;
  intro: string;
  detail: string;
  heroImage: string;
  gallery: [string, string];
  /** Close-up, subject-matched photographs of the products involved. */
  products?: { label: string; image: string; id: number; page: string }[];
  items: string[];
  value: { headline: string; notes: [string, string][] };
  faqs: [string, string][];
  related: string[];
};

const img = (id: string, w = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=88`;
const pex = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// Reusable, verified free-to-use photography.
const P = {
  roof: img("1632759145351-1d592919f522"),
  siding: img("1600566753190-17f0baa2a6c3"),
  windows: img("1600607687920-4e2a09cf159d"),
  outdoor: img("1600566753086-00f18fb6b3ea"),
  home: img("1600585154526-990dced4db0d"),
  home2: img("1600585154340-be6161a56a0c"),
  home3: img("1564013799919-ab600027ffc6"),
  home4: img("1494526585095-c41746248156"),
  paint: img("1562259949-e8e7689d7828"),
  build: img("1503387762-59230de8b0d6"),
  crew: img("1541888946425-d81bb19240f5"),
  work: img("1504307651254-35680f356dfd"),
  plan: img("1523413651479-597eb2da0ad6"),
  site: img("1503387762-59230de8b0d6"),
  floor: img("1494526585095-c41746248156"),
  pexHome: pex(11842541),
  pexRoof: pex(33404248),
  pexConcrete: pex(33405139),
  pexPaving: pex(8031952),
  pexSuburb: pex(10628470),
  pexFence: pex(20274219),
};

type Raw = Omit<ProjectGuide, "slug" | "products"> & { slug: string };

const LIBRARY: Raw[] = [
  {
    slug: "roofing",
    title: "Roofing, from inspection to final nail",
    eyebrow: "Roofing project guide",
    category: "Exterior & protection",
    heroImage: P.roof,
    gallery: [P.pexRoof, P.home2],
    intro:
      "A roof is a system, not a line item. We document the condition, explain the options, and coordinate the work so the finished roof has a clear paper trail.",
    detail:
      "A typical replacement includes tear-off, deck inspection, underlayment, flashing, ventilation review, installation, cleanup, and a final walkthrough. Repairs are scoped to the actual failure, not an upsell.",
    items: [
      "Roof and attic-side inspection where accessible",
      "Photo-documented written scope and material options",
      "Permit, delivery, and dumpster coordination",
      "Final cleanup, completion photos, and workmanship follow-up",
    ],
    value: {
      headline: "Protection first — asphalts recover roughly two-thirds of cost at resale.",
      notes: [
        ["Resale benchmark", "Zonda's 2025 Cost vs. Value report puts a standard asphalt shingle replacement near 68% cost recovery nationally."],
        ["Insurance & safety", "A documented roof age and condition history keeps you insurable and avoids emergency tarp costs."],
        ["The hidden value", "The biggest return is the damage you never have to repair because you replaced on your timeline."],
      ],
    },
    faqs: [
      ["Do I need a full replacement or a repair?", "If the failure is localized and the surrounding shingles have useful life left, a repair is often the responsible answer. We photograph both and let you decide."],
      ["How long does a roof take?", "Most residential replacements are one to three days of on-site work, weather permitting, with material delivery the day before."],
      ["Will you work with my insurance?", "We document storm damage with photos and a written scope you can submit. We do not negotiate claims on your behalf, and coverage decisions stay with your carrier."],
    ],
    related: ["gutters", "siding", "windows"],
  },
  {
    slug: "siding",
    title: "Siding, built for the weather around you",
    eyebrow: "Siding project guide",
    category: "Exterior & protection",
    heroImage: P.siding,
    gallery: [P.windows, P.pexSuburb],
    intro:
      "Good siding work starts below the visible finish. We look at moisture, sheathing, flashing, trim, and the details that keep a new exterior performing.",
    detail:
      "We plan the elevations, material transitions, trim, vents, windows, and water-management details before the first panel goes up.",
    items: [
      "Elevation-by-elevation exterior review",
      "Moisture and substrate notes before pricing",
      "Color, profile, trim, and flashing options",
      "Daily site protection, punch list, and finish inspection",
    ],
    value: {
      headline: "Curb appeal plus a real weather barrier — vinyl recovers about 96% nationally.",
      notes: [
        ["Resale benchmark", "Zonda's 2025 report places a full vinyl siding replacement near 96.5% cost recovery in its standardized project."],
        ["Lower upkeep", "Modern siding cuts painting cycles and rot repair compared with neglected wood or failing composite."],
        ["Buyer confidence", "An intact envelope is one of the first things an inspector and a buyer will question."],
      ],
    },
    faqs: [
      ["Can you match my existing siding?", "Often yes for repairs. For full replacements we walk you through profiles, colors, and trim so the home reads intentionally."],
      ["What about hidden rot?", "We open and inspect where moisture collects. If we find damage, you get a change order with photos before anyone continues."],
      ["How long does siding installation take?", "A typical single-family home runs roughly one to two weeks, depending on size, detail, and weather."],
    ],
    related: ["windows", "exterior-paint", "insulation"],
  },
  {
    slug: "windows",
    title: "Windows, measured for the way you live",
    eyebrow: "Window project guide",
    category: "Exterior & protection",
    heroImage: P.windows,
    gallery: [P.outdoor, P.home4],
    intro:
      "The right window project is more than a product choice. It is accurate measurement, correct installation, trim detail, and a clean handoff.",
    detail:
      "We match the window package to the opening, exposure, comfort goals, and finish details that matter once the crew leaves.",
    items: [
      "Opening, trim, access, and condition assessment",
      "Glass, frame, color, and operation options",
      "Measured order review before release",
      "Operation check, interior cleanup, and final walkthrough",
    ],
    value: {
      headline: "Comfort and quiet you feel every day — plus resale recovery that beats most interiors.",
      notes: [
        ["Resale benchmark", "Window replacement recovers a large share of cost nationally in Zonda's 2025 report, varying by material and market."],
        ["Energy & comfort", "Tighter, correctly installed units reduce drafts, street noise, and uneven room temperatures."],
        ["Maintenance", "Modern units stop the painting, sticking, and seal failures of aging wood windows."],
      ],
    },
    faqs: [
      ["Full-frame or insert windows?", "Full-frame replaces the entire unit and allows deeper insulation; inserts are faster and less invasive. The right answer depends on the opening condition."],
      ["How many windows should I do at once?", "Many homeowners phase the project by floor or exposure. We will price the whole house and any phase."],
      ["Do you handle trim and paint?", "Yes. Interior trim, exterior capping, and finish work are scoped up front so nothing is a surprise."],
    ],
    related: ["doors", "siding", "insulation"],
  },
  {
    slug: "gutters",
    title: "Gutters, designed to move water away",
    eyebrow: "Gutter project guide",
    category: "Exterior & protection",
    heroImage: P.home,
    gallery: [P.home2, P.home3],
    intro:
      "Gutters protect more than the roof edge. We look at pitch, fascia, downspout placement, extensions, grading, and the path water takes after it leaves the roof.",
    detail:
      "The job is complete when water moves where it should, the finish matches the home, and the downspouts are not creating a new problem.",
    items: [
      "Roofline, fascia, and drainage inspection",
      "Run length, outlet, color, and downspout plan",
      "Seamless fabrication and careful fastening",
      "Extensions, water test, and final cleanup",
    ],
    value: {
      headline: "The cheapest way to prevent expensive foundation and basement water damage.",
      notes: [
        ["Damage prevention", "Water that pools at the foundation is one of the most common causes of basement moisture and slab issues."],
        ["Protect the rest", "Working gutters protect fascia, siding, landscaping, and the soil around the foundation."],
        ["Low cost, high impact", "Gutter work is one of the lowest-cost exterior improvements per dollar of risk removed."],
      ],
    },
    faqs: [
      ["Are gutter guards worth it?", "They reduce cleaning frequency, but no guard is maintenance-free. We will tell you honestly whether your tree cover justifies them."],
      ["Why is water still pooling after new gutters?", "Usually grading or missing extensions. We inspect where the water actually goes, not just the gutter itself."],
      ["How long do gutters last?", "Aluminum runs decades with proper slope and fastening. We will show you what failed on the old system."],
    ],
    related: ["roofing", "drainage", "siding"],
  },
  {
    slug: "exterior-paint",
    title: "Exterior paint, preparation you can see",
    eyebrow: "Exterior paint project guide",
    category: "Exterior & protection",
    heroImage: P.paint,
    gallery: [P.home3, P.home2],
    intro:
      "Paint only lasts as long as the preparation underneath it. We wash, scrape, repair, caulk, prime, and apply the finish in the right order.",
    detail:
      "A professional exterior paint project is a sequence of surface decisions, not just two coats of color.",
    items: [
      "Surface and moisture condition assessment",
      "Wash, scrape, repair, and caulk plan",
      "Color and sheen review in natural light",
      "Primer, finish-coat quality control, and touch-up",
    ],
    value: {
      headline: "The lowest-cost way to reset a home's first impression and protect the substrate.",
      notes: [
        ["Curb appeal", "A clean, modern color scheme is one of the cheapest per-dollar improvements a seller can make."],
        ["Protect materials", "Sealed wood, trim, and stucco survive weather far longer than exposed surfaces."],
        ["Warranty for buyers", "A dated, documented paint job answers an inspection question before it is asked."],
      ],
    },
    faqs: [
      ["How often does a house need repainting?", "Typically every seven to ten years in harsh climates, longer with good prep and quality coatings."],
      ["Do you repair the wood too?", "Yes. Scraping and caulking are included; rotted trim is called out as a separate, photographed line item."],
      ["Can you paint siding and trim two colors?", "Absolutely. We will help you test schemes in the light your home actually receives."],
    ],
    related: ["siding", "doors", "roofing"],
  },
  {
    slug: "doors",
    title: "Doors and entry, the upgrade buyers notice first",
    eyebrow: "Doors & entry guide",
    category: "Exterior & protection",
    heroImage: P.home2,
    gallery: [P.home, P.pexHome],
    intro:
      "Entry and patio doors are where security, energy performance, and first impressions meet. We size, seal, and finish them so they operate and last.",
    detail:
      "From steel entry doors to sliding and French patio doors, the scope covers framing, flashing, trim, weatherstripping, hardware, and finish.",
    items: [
      "Opening, header, threshold, and flashing review",
      "Material, glass, hardware, and finish options",
      "Accurate measurement and order confirmation",
      "Sealing, alignment, operation test, and cleanup",
    ],
    value: {
      headline: "Entry doors are among the highest-return exterior upgrades in national data.",
      notes: [
        ["Resale benchmark", "Zonda's 2025 Cost vs. Value report places a steel entry door replacement near 216% cost recovery in its standardized project."],
        ["Security & energy", "A modern, well-sealed door closes the biggest air leak on most facades."],
        ["Feel", "Solid, quiet, smooth-operating doors change how the house feels to enter every day."],
      ],
    },
    faqs: [
      ["How long does a door install take?", "Most single door replacements are a half day to a full day, including trim and finish."],
      ["Do you repair the frame?", "Yes. Rotted jambs and thresholds are common; we photograph and price the repair before proceeding."],
      ["Should I add a storm door?", "Often a good idea for weather protection and ventilation. We will explain the trade-offs for your exposure."],
    ],
    related: ["windows", "garage-doors", "exterior-paint"],
  },
  {
    slug: "garage-doors",
    title: "Garage doors, the largest moving surface on the house",
    eyebrow: "Garage door guide",
    category: "Exterior & protection",
    heroImage: P.home3,
    gallery: [P.pexHome, P.home],
    intro:
      "A garage door is a huge share of the street-facing wall. It is also a safety device. We handle the door, track, spring, and opener as one system.",
    detail:
      "The scope covers measuring, insulation value, window and panel style, spring and track replacement, opener compatibility, and safe operation testing.",
    items: [
      "Opening, headroom, and track measurement",
      "Insulation, panel, window, and color options",
      "Spring, cable, and track condition review",
      "Opener calibration, safety-reverse test, and cleanup",
    ],
    value: {
      headline: "The single strongest resale benchmark in the 2025 national report.",
      notes: [
        ["Resale benchmark", "Zonda's 2025 report places a garage door replacement near 268% cost recovery nationally."],
        ["Safety", "Old springs and cables are a genuine hazard. New hardware removes one of the most common home-injury risks."],
        ["Quiet & efficient", "Insulated doors cut street noise and help keep attached rooms warmer in winter."],
      ],
    },
    faqs: [
      ["Can I keep my existing opener?", "Usually, if it is in good condition and compatible. We test and tell you honestly."],
      ["Why is my door so loud?", "Worn rollers, dry hinges, or failing springs. A tune-up is often enough; sometimes replacement is smarter."],
      ["Do you repair panels only?", "When sections are still available and the frame is sound, yes. Otherwise we price a full replacement."],
    ],
    related: ["doors", "concrete", "exterior-paint"],
  },
  {
    slug: "decks",
    title: "Decks and porches, built for real weather",
    eyebrow: "Decks & porches guide",
    category: "Outdoor spaces & property",
    heroImage: P.outdoor,
    gallery: [P.pexSuburb, P.home],
    intro:
      "A deck is structure first and furniture second. We look at footings, framing, fasteners, ledger attachment, and drainage before anyone talks about boards.",
    detail:
      "The scope covers layout, footings, framing, ledger flashing, decking, railings, stairs, and lighting — or a repair of the specific failed component.",
    items: [
      "Structural, footing, and ledger inspection",
      "Material, railing, and stair options",
      "Framing, flashing, and drainage details",
      "Fastener check, finish, and final walkthrough",
    ],
    value: {
      headline: "Outdoor living raises usable space and recovers a strong share of cost at resale.",
      notes: [
        ["Usable square footage", "A well-built deck effectively adds living area without the cost per square foot of an addition."],
        ["Resale", "Wood and composite decks typically recover a majority of cost nationally, per Zonda's outdoor project data."],
        ["Lifestyle", "The best-returning projects are the ones the family actually uses every week."],
      ],
    },
    faqs: [
      ["Wood or composite?", "Wood is cheaper and can be refinished; composite costs more and needs less maintenance. We price both."],
      ["Can you rebuild on my existing frame?", "Only if the footings, ledger, and framing pass inspection. If not, we show you why."],
      ["Do you handle permits?", "Where required, yes. Deck permits are common and we plan for them in the schedule."],
    ],
    related: ["patios", "fencing", "landscaping"],
  },
  {
    slug: "fencing",
    title: "Fencing and gates, privacy you can lean on",
    eyebrow: "Fencing & gates guide",
    category: "Outdoor spaces & property",
    heroImage: P.pexFence,
    gallery: [P.pexSuburb, P.outdoor],
    intro:
      "A good fence does three jobs: privacy, safety, and property definition. We plan the line, the posts, the gates, and the sight lines before setting anything.",
    detail:
      "The scope covers layout and setbacks, post setting, material and height options, gate hardware, and staining or sealing.",
    items: [
      "Property line, setback, and utility review",
      "Material, height, and style selection",
      "Post depth, spacing, and gate planning",
      "Hardware alignment, finish, and cleanup",
    ],
    value: {
      headline: "Privacy, pet and child safety, and a clean property line — all in one project.",
      notes: [
        ["Privacy", "Blocking sight lines from neighbors and the street is the number-one reason homeowners fence."],
        ["Safety", "Containment for pets and kids, and a barrier around pools where required."],
        ["Durability", "Correct post depth and material choice decide whether the fence still stands straight in ten years."],
      ],
    },
    faqs: [
      ["How deep should posts be set?", "Below the frost line where it matters, usually a third of the post length in concrete. We account for your climate."],
      ["Wood, vinyl, or metal?", "Wood is classic and repairable, vinyl is low-maintenance, and metal is durable and modern. We price the options."],
      ["Who handles the survey?", "We plan to your existing markers and note any uncertainty. For disputed lines we recommend a survey before work."],
    ],
    related: ["decks", "landscaping", "concrete"],
  },
  {
    slug: "paving",
    title: "Driveways and paving, the approach that frames the home",
    eyebrow: "Paving & driveway guide",
    category: "Outdoor spaces & property",
    heroImage: P.pexPaving,
    gallery: [P.pexConcrete, P.pexSuburb],
    intro:
      "A driveway is the first thing a guest and a buyer sees. It is also the surface that carries every vehicle and every winter.",
    detail:
      "The scope covers excavation, base preparation, drainage and slope, material choice, edging, and the finished surface.",
    items: [
      "Existing surface, base, and drainage review",
      "Material options: asphalt, concrete, pavers",
      "Excavation, base compaction, and grading",
      "Edging, cure or seal, and final cleanup",
    ],
    value: {
      headline: "Curb appeal plus durability — and a surface that stops damaging your vehicles and foundation.",
      notes: [
        ["First impression", "A clean, level approach carries a disproportionate share of the home's street appeal."],
        ["Water control", "Correct slope moves water away from the garage and foundation instead of into them."],
        ["Repair vs. replace", "Sometimes crack filling and sealing buys years; sometimes full replacement is cheaper over time. We will show both numbers."],
      ],
    },
    faqs: [
      ["How long before I can drive on it?", "Concrete typically needs about seven days before vehicles; asphalt is often ready in a few days. We will tell you exactly."],
      ["Can you widen or extend my driveway?", "Usually yes, subject to setbacks and drainage. We will flag any municipal limits."],
      ["Do you remove the old driveway?", "Yes. Proper base preparation starts with removing and rebuilding, not paving over."],
    ],
    related: ["concrete", "masonry", "drainage"],
  },
  {
    slug: "concrete",
    title: "Concrete and flatwork, poured to last",
    eyebrow: "Concrete & flatwork guide",
    category: "Outdoor spaces & property",
    heroImage: P.pexConcrete,
    gallery: [P.pexPaving, P.build],
    intro:
      "Concrete is unforgiving of shortcuts. The mix, the base, the reinforcement, the joints, and the cure decide whether it lasts or cracks.",
    detail:
      "The scope covers removal, subgrade prep, forms, reinforcement, pour, finish, control joints, and curing for walks, slabs, steps, and patios.",
    items: [
      "Subgrade, drainage, and thickness review",
      "Form, joint, and reinforcement plan",
      "Pour, finish, and edge detailing",
      "Curing, sealing, and site cleanup",
    ],
    value: {
      headline: "Flat, safe, durable surfaces that fix trip hazards and drainage problems.",
      notes: [
        ["Safety", "Lifted, cracked walks are a liability and a nuisance. Replacement fixes the root cause, not the symptom."],
        ["Drainage", "Correct slope and jointing keep water out of the garage, basement, and yard."],
        ["Long life", "A properly prepared slab can last decades; a poured-over failure will not."],
      ],
    },
    faqs: [
      ["Why did my old concrete crack?", "Usually base failure, missing control joints, or freeze-thaw. We explain the cause before we replace."],
      ["Can you match an existing slab?", "We get as close as possible with finish and color, and we will show you a sample first."],
      ["Do you handle small pours?", "Yes. Steps, pads, and walkway sections are common and welcome."],
    ],
    related: ["paving", "masonry", "drainage"],
  },
  {
    slug: "masonry",
    title: "Masonry and retaining walls, structure in stone",
    eyebrow: "Masonry guide",
    category: "Outdoor spaces & property",
    heroImage: P.build,
    gallery: [P.pexConcrete, P.home],
    intro:
      "Brick, block, and stone work is structural as much as decorative. Repointing, tuckpointing, steps, and retaining walls all depend on correct base and drainage.",
    detail:
      "The scope covers mortar matching, repointing, wall repair, chimney work, steps, and retaining walls with proper drainage and reinforcement.",
    items: [
      "Mortar, unit, and structural condition review",
      "Color and profile matching for repairs",
      "Footing, drainage, and reinforcement planning",
      "Repointing, cleaning, and final inspection",
    ],
    value: {
      headline: "Masonry outlasts nearly every other exterior material when it is maintained.",
      notes: [
        ["Structural integrity", "Catching spalling and failing mortar early prevents much larger rebuilds later."],
        ["Water management", "Retaining walls only work when drainage is designed with them, not after them."],
        ["Character", "Original brick and stone are features buyers pay for — when they are maintained."],
      ],
    },
    faqs: [
      ["Can you match old mortar?", "Usually yes. Matching color, hardness, and joint profile matters more than most people realize."],
      ["Is my retaining wall failing?", "Bulging, leaning, and water stains are the warning signs. We assess and price stabilization."],
      ["Do you repair chimneys?", "Yes, including flashing, crown, and cap work, often coordinated with roofing."],
    ],
    related: ["concrete", "drainage", "roofing"],
  },
  {
    slug: "patios",
    title: "Patios and hardscape, an outdoor room",
    eyebrow: "Patios & hardscape guide",
    category: "Outdoor spaces & property",
    heroImage: P.outdoor,
    gallery: [P.pexPaving, P.pexSuburb],
    intro:
      "A patio is an outdoor room. It should sit at the right level, drain away from the house, and be comfortable to walk on barefoot.",
    detail:
      "The scope covers layout, excavation, base, drainage, paver or stone selection, edging, and sometimes a fire feature or seat wall.",
    items: [
      "Layout, level, and drainage planning",
      "Material, pattern, and border selection",
      "Excavation, base compaction, and setting",
      "Joint filling, edging, and cleanup",
    ],
    value: {
      headline: "Adds usable living space and one of the highest lifestyle returns per dollar.",
      notes: [
        ["Usable space", "A patio turns unused yard into the room the family actually gathers in."],
        ["Resale", "Hardscape is durable, visible, and generally recovers a solid share of cost."],
        ["Low maintenance", "Unlike a deck, quality hardscape needs little beyond occasional cleaning."],
      ],
    },
    faqs: [
      ["Pavers or poured concrete?", "Pavers handle freeze-thaw better and can be repaired section by section; concrete is cheaper upfront. We price both."],
      ["Does a patio need a permit?", "Often not, but some jurisdictions require one depending on size and coverage. We will check."],
      ["Can you tie it into my existing deck?", "Yes. Mixed deck-and-patio designs are common, and we plan the transition."],
    ],
    related: ["decks", "landscaping", "masonry"],
  },
  {
    slug: "drainage",
    title: "Drainage and grading, solve the water first",
    eyebrow: "Drainage & grading guide",
    category: "Outdoor spaces & property",
    heroImage: P.pexConcrete,
    gallery: [P.home3, P.outdoor],
    intro:
      "Almost every wet basement, soggy yard, and cracking slab starts with water moving the wrong way. Fixing drainage first saves money on everything else.",
    detail:
      "The scope covers grading, swales, French drains, downspout extensions, catch basins, dry wells, and sump discharge routing.",
    items: [
      "Water-flow, grade, and soil assessment",
      "Swale, French drain, and catch basin plan",
      "Downspout and sump routing",
      "Grading, restoration, and water test",
    ],
    value: {
      headline: "The highest-leverage repair in the whole house — it protects everything else.",
      notes: [
        ["Prevent structural damage", "Chronic foundation moisture is one of the most expensive problems a homeowner can ignore."],
        ["Protect landscaping", "Standing water kills grass, shrubs, and trees and washes out beds."],
        ["Health", "Dry crawl spaces and basements mean less mold, odor, and pest pressure."],
      ],
    },
    faqs: [
      ["Do I need a French drain?", "Sometimes. Often grading and downspout extensions solve most of the problem for far less money."],
      ["Can you find the source?", "Yes. We trace where water enters before recommending any structure."],
      ["Will you restore the lawn?", "We grade and restore as part of the scope and reseed where needed."],
    ],
    related: ["gutters", "concrete", "landscaping"],
  },
  {
    slug: "landscaping",
    title: "Landscaping, the details that finish a yard",
    eyebrow: "Landscaping guide",
    category: "Outdoor spaces & property",
    heroImage: P.outdoor,
    gallery: [P.pexSuburb, P.home],
    intro:
      "Landscaping ties the whole property together. We plan planting, beds, edging, lighting, and irrigation so the yard looks intentional and survives.",
    detail:
      "The scope covers design, soil preparation, plant selection for your climate, beds and edging, mulching, and optional irrigation and lighting.",
    items: [
      "Site, sun, and soil review",
      "Plant and material selection",
      "Bed prep, edging, and planting",
      "Mulch, irrigation, and lighting setup",
    ],
    value: {
      headline: "The finishing layer that makes a home look cared for from the street.",
      notes: [
        ["Curb appeal", "Landscaping is consistently cited among the highest-impact improvements for first impressions."],
        ["Water use", "Climate-appropriate planting and irrigation reduce long-term water and maintenance costs."],
        ["Privacy & shade", "Strategic trees and hedges add screening and summer cooling over time."],
      ],
    },
    faqs: [
      ["Do you maintain it afterwards?", "We can set up a maintenance plan, or hand off a simple care guide."],
      ["What about drainage in beds?", "Beds are designed to drain. If the yard holds water, we fix the grade first."],
      ["Can you work with my existing plants?", "Absolutely. We preserve what is healthy and worth keeping."],
    ],
    related: ["patios", "drainage", "fencing"],
  },
  {
    slug: "kitchens",
    title: "Kitchens, the room that sells the house",
    eyebrow: "Kitchen remodeling guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.home4,
    gallery: [P.windows, P.home],
    intro:
      "A kitchen is the most complicated room in the house: cabinetry, counters, tile, electric, plumbing, and ventilation all have to land in the right order.",
    detail:
      "The scope covers layout, demolition, framing, rough-in, cabinets, counters, tile, appliances, lighting, and the final punch list.",
    items: [
      "Layout, storage, and workflow planning",
      "Mechanical, electrical, and plumbing rough-in",
      "Cabinet, countertop, and tile installation",
      "Appliance set, paint, punch list, and cleanup",
    ],
    value: {
      headline: "The biggest lifestyle and resale lever in the interior — when it is done right.",
      notes: [
        ["Resale", "Kitchen remodels consistently rank among the top interior projects for buyer interest in NAR's Remodeling Impact research."],
        ["Daily use", "No room is used more often. A better layout changes how the household functions."],
        ["Cost control", "Careful planning is what separates a good kitchen from a runaway budget."],
      ],
    },
    faqs: [
      ["Do I need a permit?", "Usually yes for structural, electrical, plumbing, or gas changes. We plan permits into the schedule."],
      ["Can we keep the footprint?", "Often the smartest budget move. We will tell you whether the layout actually needs to change."],
      ["How long will I be without a kitchen?", "Typical full remodels run several weeks. We phase work to keep at least a temporary setup available."],
    ],
    related: ["countertops", "cabinetry", "tile"],
  },
  {
    slug: "bathrooms",
    title: "Bathrooms, small rooms with no room for error",
    eyebrow: "Bathroom remodeling guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.windows,
    gallery: [P.home4, P.home],
    intro:
      "Bathrooms hide the most critical work: waterproofing. Tile failure is almost always a waterproofing failure, so the details behind the wall decide everything.",
    detail:
      "The scope covers demolition, plumbing and electrical rough-in, waterproofing, tile, vanities, fixtures, ventilation, and finish.",
    items: [
      "Layout, fixture, and ventilation planning",
      "Plumbing and electrical rough-in",
      "Waterproofing, tile, and glass",
      "Fixture set, paint, punch list, and cleanup",
    ],
    value: {
      headline: "One of the most reliable interior returns, and a daily quality-of-life win.",
      notes: [
        ["Resale", "Bathroom remodels rank highly for both value and owner satisfaction in NAR's Remodeling Impact research."],
        ["Water damage", "Correct waterproofing and ventilation prevent the rot and mold that ruin a bathroom over time."],
        ["Accessibility", "Adding a curbless shower or grab bars now can mean aging in place later."],
      ],
    },
    faqs: [
      ["Do you replace the whole bathroom?", "Sometimes a targeted update is smarter. We will show you what a partial refresh would and would not fix."],
      ["What is the waterproofing system?", "A tested membrane system over a properly prepared substrate, not just cement board and hope. We specify it in writing."],
      ["Can you do a walk-in shower?", "Yes, including curbless designs where the framing allows."],
    ],
    related: ["tile", "flooring", "accessibility"],
  },
  {
    slug: "basements",
    title: "Basements and interiors, usable space below",
    eyebrow: "Basement finishing guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.home,
    gallery: [P.home2, P.home4],
    intro:
      "A finished basement is the cheapest square footage most homes will ever add — if moisture and mechanical access are handled correctly first.",
    detail:
      "The scope covers moisture assessment, framing, insulation, drywall, flooring, ceilings, egress, lighting, outlets, and finish.",
    items: [
      "Moisture, foundation, and egress review",
      "Framing, insulation, and mechanical access plan",
      "Drywall, flooring, ceiling, and lighting",
      "Trim, paint, and final inspection",
    ],
    value: {
      headline: "Add functional living space without the cost of an addition.",
      notes: [
        ["Cost per square foot", "Finishing existing space is far cheaper per square foot than building new."],
        ["Property use", "A guest suite, office, gym, or family room is usable, valuable space."],
        ["Do it right", "Moisture control first, always. A beautiful basement that floods is a loss."],
      ],
    },
    faqs: [
      ["Do I need egress?", "Bedrooms almost always require an egress window or door. We plan for it in the layout."],
      ["What if the basement is damp?", "We address drainage and moisture before framing. That is not optional."],
      ["Can I add a bathroom?", "Usually yes, if plumbing can reach the main stack. We assess before promising."],
    ],
    related: ["flooring", "drywall", "drainage"],
  },
  {
    slug: "flooring",
    title: "Flooring, the surface you live on",
    eyebrow: "Flooring guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.floor,
    gallery: [P.home4, P.windows],
    intro:
      "Flooring takes the most wear of anything in the home. Subfloor prep, moisture, and acclimation matter as much as the material you pick.",
    detail:
      "The scope covers removal and disposal, subfloor repair, moisture testing, leveling, installation, transitions, and trim.",
    items: [
      "Subfloor and moisture condition review",
      "Material, finish, and pattern selection",
      "Leveling, acclimation, and installation",
      "Transitions, trim, and final cleanup",
    ],
    value: {
      headline: "The highest-visibility interior upgrade for the money.",
      notes: [
        ["First impression", "Buyers judge flooring quickly. Worn carpet or damaged boards discount a whole room."],
        ["Air quality", "Replacing old carpet reduces dust, allergens, and odor."],
        ["Durability", "Waterproof options in kitchens and baths prevent the damage that ruins subfloors."],
      ],
    },
    faqs: [
      ["What floor is best for pets?", "Waterproof luxury vinyl and porcelain tile handle claws and accidents far better than carpet."],
      ["Do you move furniture?", "We ask that rooms be cleared beforehand. We will tell you exactly what needs to move."],
      ["Can you match existing flooring?", "For repairs, yes where material still exists. Whole-room replacement is often the cleanest answer."],
    ],
    related: ["tile", "bathrooms", "basements"],
  },
  {
    slug: "tile",
    title: "Tile and backsplash, craft you can see",
    eyebrow: "Tile & backsplash guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.windows,
    gallery: [P.home4, P.floor],
    intro:
      "Tile is a craft trade. Layout, spacing, level, and grout lines are what separate a professional job from a weekend project.",
    detail:
      "The scope covers substrate prep, waterproofing where required, layout, setting, grouting, sealing, and caulking.",
    items: [
      "Substrate and waterproofing review",
      "Layout, pattern, and edge detail planning",
      "Setting, leveling, and spacing control",
      "Grout, seal, caulk, and cleanup",
    ],
    value: {
      headline: "A small, affordable upgrade with a large visual return.",
      notes: [
        ["Visual impact", "A new backsplash transforms a kitchen for a fraction of a full remodel."],
        ["Durability", "Porcelain and ceramic resist water, heat, and stains for decades."],
        ["Waterproofing", "In showers, the tile is only as good as the membrane under it."],
      ],
    },
    faqs: [
      ["Can you tile over existing tile?", "Sometimes, but only over sound, well-bonded surfaces. We will tell you when it is a bad idea."],
      ["What grout is best?", "Epoxy and high-performance grouts resist staining; traditional grout needs sealing. We will explain the trade-offs."],
      ["How long does a backsplash take?", "Most are a day or two, including grout and caulk."],
    ],
    related: ["kitchens", "bathrooms", "countertops"],
  },
  {
    slug: "cabinetry",
    title: "Cabinetry, storage that fits the room",
    eyebrow: "Cabinetry guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.home4,
    gallery: [P.home, P.windows],
    intro:
      "Cabinets are the single largest visual element in a kitchen or bath. Fit, finish, and hardware decide whether it feels custom or cobbled together.",
    detail:
      "The scope covers measurement, layout, box and door style, hardware, installation, filler and trim work, and adjustment.",
    items: [
      "Measured layout and storage planning",
      "Box, door, finish, and hardware selection",
      "Level installation and scribing",
      "Hardware, adjustment, and cleanup",
    ],
    value: {
      headline: "The backbone of a kitchen remodel and a major resale driver.",
      notes: [
        ["Resale", "Cabinet condition is one of the first things buyers assess in a kitchen."],
        ["Storage", "Good layout converts wasted space into usable storage — a daily quality-of-life gain."],
        ["Refacing option", "Sometimes refacing is the smarter spend. We will price both honestly."],
      ],
    },
    faqs: [
      ["Replace or reface?", "Refacing saves money when boxes are solid and the layout works. We will show you which applies."],
      ["Do you handle appliances?", "We coordinate appliance sizing and installation so everything fits on the first try."],
      ["How long does installation take?", "Typical kitchens run several days for install, longer with counters and tile."],
    ],
    related: ["kitchens", "countertops", "tile"],
  },
  {
    slug: "countertops",
    title: "Countertops, the surface you touch every day",
    eyebrow: "Countertop guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.windows,
    gallery: [P.home4, P.floor],
    intro:
      "Countertops are an investment in a surface you use dozens of times a day. Templating accuracy is what makes the finished edge look seamless.",
    detail:
      "The scope covers material selection, digital or physical templating, fabrication, seam planning, and installation with sink and cooktop cutouts.",
    items: [
      "Material, edge, and thickness selection",
      "Accurate templating after cabinets are set",
      "Fabrication and seam planning",
      "Installation, cutouts, and sealing",
    ],
    value: {
      headline: "High-impact visual upgrade with real durability differences between materials.",
      notes: [
        ["Buyer appeal", "Stone and quartz counters are among the most requested features in buyer surveys."],
        ["Durability", "Quartz resists staining and never needs sealing; natural stone needs more care but has unique character."],
        ["Hygiene", "Non-porous surfaces are easier to sanitize for food prep."],
      ],
    },
    faqs: [
      ["Quartz or granite?", "Quartz is low-maintenance and consistent; granite is natural and unique. We will walk you through the trade-offs."],
      ["Can I keep my sink?", "Usually yes, if the sink is in good shape. Undermount sinks sometimes need new counter cutouts."],
      ["How long from template to install?", "Often one to two weeks depending on material and edge profile."],
    ],
    related: ["kitchens", "cabinetry", "tile"],
  },
  {
    slug: "interior-painting",
    title: "Interior painting, clean lines and clean air",
    eyebrow: "Interior paint guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.paint,
    gallery: [P.home4, P.home],
    intro:
      "Interior painting is detail work. Masking, patching, sanding, priming, and cutting clean lines are what make a room feel finished.",
    detail:
      "The scope covers protection, patching, sanding, priming, and two finish coats in your chosen sheen, plus trim and ceilings where requested.",
    items: [
      "Surface patching and sanding",
      "Color and sheen selection per room",
      "Careful masking and protection",
      "Finish coats, trim detail, and cleanup",
    ],
    value: {
      headline: "The lowest-cost way to make a home feel new.",
      notes: [
        ["Cost per dollar", "Painting is among the cheapest improvements per square foot of visual impact."],
        ["Sale readiness", "Neutral, fresh paint removes the biggest objection in a dated room."],
        ["Health", "Low-VOC paints improve indoor air quality, especially in bedrooms and nurseries."],
      ],
    },
    faqs: [
      ["Do you move furniture?", "We protect and shift what we can; we ask that valuables and fragile items be packed away first."],
      ["How many coats?", "Two finish coats over primed or properly prepared surfaces is standard for lasting coverage."],
      ["Can you paint cabinets too?", "Yes. Cabinet refinishing is a common add-on and a strong budget alternative to replacement."],
    ],
    related: ["drywall", "trim", "cabinetry"],
  },
  {
    slug: "drywall",
    title: "Drywall and texture, walls that read flat",
    eyebrow: "Drywall guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.build,
    gallery: [P.home4, P.home],
    intro:
      "Drywall quality is judged in raking light. Taping, mudding, and sanding have to be right or every paint job will highlight the flaws.",
    detail:
      "The scope covers hanging, taping, mudding, sanding, texture matching, and repair of holes, cracks, and water damage.",
    items: [
      "Damage and moisture source review",
      "Hanging and mechanical fastening",
      "Taping, mudding, and finish level",
      "Texture matching and final sanding",
    ],
    value: {
      headline: "Repairs that stop small damage and moisture from spreading.",
      notes: [
        ["Stop the cause", "Drywall cracks and stains are symptoms. We find the source before patching."],
        ["Sale readiness", "Clean, flat walls remove the appearance of neglect that buyers notice immediately."],
        ["Finish quality", "Good drywall is the foundation of every good paint job."],
      ],
    },
    faqs: [
      ["Can you match my texture?", "In most cases yes — orange peel, knockdown, and smooth finishes are all matchable."],
      ["Will you find the leak?", "Yes. We locate the moisture source and coordinate the repair so it does not return."],
      ["Do you do small patch jobs?", "Yes. No patch is too small to do properly."],
    ],
    related: ["interior-painting", "trim", "insulation"],
  },
  {
    slug: "trim",
    title: "Trim and millwork, the details that finish a room",
    eyebrow: "Trim & millwork guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.home4,
    gallery: [P.home, P.windows],
    intro:
      "Trim is what makes a room look designed instead of assembled. Base, casing, crown, and panel details tie the whole space together.",
    detail:
      "The scope covers profile selection, measurement, cutting, fitting, caulking, and finish for baseboards, casings, crown, and built-ins.",
    items: [
      "Profile and proportion planning",
      "Precise measurement and cutting",
      "Fitting, coping, and fastening",
      "Caulk, fill, sand, and finish",
    ],
    value: {
      headline: "A modest budget line that raises the perceived quality of every room.",
      notes: [
        ["Perceived quality", "Good trim is one of the clearest signals of craftsmanship to a buyer."],
        ["Character", "Reinstating period-appropriate trim restores character to older homes."],
        ["Seal the gaps", "Properly caulked trim reduces drafts and dust infiltration."],
      ],
    },
    faqs: [
      ["Can you match my existing trim?", "Usually yes, either with a stock profile or a small custom run."],
      ["Do you paint it too?", "Yes. Caulking, filling, and finishing are part of a complete trim scope."],
      ["How long does trim take?", "A single room is often a day or two; whole-house trim is a multi-week project."],
    ],
    related: ["interior-painting", "drywall", "doors"],
  },
  {
    slug: "closets",
    title: "Closets and storage, reclaim the space you have",
    eyebrow: "Closets & storage guide",
    category: "Kitchens, baths & interiors",
    heroImage: P.home,
    gallery: [P.home4, P.windows],
    intro:
      "Most homes do not have too little space — they have poorly organized space. Good storage design makes a house feel bigger without adding a foot.",
    detail:
      "The scope covers measurement, layout design, shelving and drawer systems, hanging options, and installation with lighting where wanted.",
    items: [
      "Space and storage-need review",
      "Layout and system design",
      "Shelf, rod, and drawer installation",
      "Lighting, finish, and adjustment",
    ],
    value: {
      headline: "Functional square footage for a fraction of an addition.",
      notes: [
        ["Perceived space", "Organized storage makes rooms feel larger and less cluttered."],
        ["Sale appeal", "Walk-in closet systems are a strong selling feature in primary suites."],
        ["Everyday calm", "A place for everything reduces daily friction in a busy household."],
      ],
    },
    faqs: [
      ["Custom or modular?", "Modular systems are faster and cheaper; custom gives a perfect fit. We will price both."],
      ["Can you add lighting?", "Yes, low-voltage LED strips and switched fixtures are common add-ons."],
      ["Do you do garages and pantries too?", "Yes. Garages, pantries, mudrooms, and laundry rooms all benefit from the same approach."],
    ],
    related: ["cabinetry", "trim", "garage-doors"],
  },
  {
    slug: "hvac",
    title: "HVAC and comfort, engineered for your home",
    eyebrow: "HVAC guide",
    category: "Systems & comfort",
    heroImage: P.build,
    gallery: [P.home2, P.home3],
    intro:
      "Heating and cooling is the largest energy cost in most homes and the biggest driver of daily comfort. Sizing and ductwork matter as much as the equipment.",
    detail:
      "The scope covers load calculation, equipment selection, duct review, thermostat setup, and commissioning with a documented performance check.",
    items: [
      "Load calculation and duct assessment",
      "Equipment, efficiency, and rebate review",
      "Installation and refrigerant charging",
      "Thermostat setup and performance test",
    ],
    value: {
      headline: "Lower energy bills, better comfort, and equipment that lasts when sized correctly.",
      notes: [
        ["Energy cost", "A right-sized, efficient system cuts monthly utility spend more than almost any other upgrade."],
        ["Comfort", "Even temperatures and quiet operation are felt in every room."],
        ["Reliability", "Oversized or undersized equipment fails sooner. Correct sizing is the difference."],
      ],
    },
    faqs: [
      ["Repair or replace?", "If the unit is near end of life and repair costs approach a third of replacement, replacement usually wins."],
      ["Do you check the ducts?", "Yes. Duct leakage and undersized returns are common causes of comfort complaints."],
      ["Are rebates available?", "Often. We will point you to current utility and federal programs and document the installation."],
    ],
    related: ["insulation", "air-quality", "electrical"],
  },
  {
    slug: "plumbing",
    title: "Plumbing, fix it before it finds you",
    eyebrow: "Plumbing guide",
    category: "Systems & comfort",
    heroImage: P.work,
    gallery: [P.build, P.home],
    intro:
      "Water damage is the most expensive kind. Plumbing work should be done once, correctly, with parts you can trust and access you can maintain.",
    detail:
      "The scope covers leak detection, fixture and faucet replacement, water heaters, repiping, shut-off valves, and drain clearing.",
    items: [
      "Leak, pressure, and material review",
      "Fixture, valve, and heater selection",
      "Installation and code-compliant routing",
      "Pressure test, cleanup, and documentation",
    ],
    value: {
      headline: "Cheap insurance against the most expensive damage a home can suffer.",
      notes: [
        ["Prevent damage", "A failed supply line can do tens of thousands of dollars in damage in hours."],
        ["Efficiency", "Modern fixtures and heaters cut water and energy waste."],
        ["Emergency readiness", "Working shut-offs and documented plumbing save you in the moments that matter."],
      ],
    },
    faqs: [
      ["Should I replace working old pipes?", "Not always. It depends on material, history, and water quality. We will give you an honest read."],
      ["Tank or tankless water heater?", "Tankless saves space and runs unlimited, but needs capacity and venting. We will model your usage."],
      ["Do you handle emergency leaks?", "Yes, we prioritize active leaks and coordinate quick dry-out where needed."],
    ],
    related: ["hvac", "bathrooms", "basements"],
  },
  {
    slug: "electrical",
    title: "Electrical, capacity and safety you can rely on",
    eyebrow: "Electrical guide",
    category: "Systems & comfort",
    heroImage: P.build,
    gallery: [P.home2, P.home4],
    intro:
      "Older homes were never wired for modern loads. Adding outlets, circuits, and safety devices fixes both convenience and real risk.",
    detail:
      "The scope covers load review, circuit additions, outlet and switch work, lighting, GFCI and AFCI protection, and permit inspections.",
    items: [
      "Panel and circuit capacity review",
      "Outlet, switch, and lighting plan",
      "Permitted installation and inspection",
      "Testing, labeling, and cleanup",
    ],
    value: {
      headline: "Safety first, then the convenience and resale value of a modern system.",
      notes: [
        ["Fire & shock safety", "GFCI, AFCI, and grounding cover the most common electrical hazards in homes."],
        ["Resale & inspection", "Unpermitted or outdated wiring is one of the most common deal-breakers in an inspection."],
        ["Modern use", "Enough circuits stop the tripping that plagues kitchens, shops, and home offices."],
      ],
    },
    faqs: [
      ["Do I need a permit?", "Most circuit and panel work requires one. We handle the paperwork and the inspection."],
      ["Can I add an EV charger?", "Usually yes, subject to panel capacity. We will calculate the load first."],
      ["Is aluminum wiring safe?", "It requires specific remediation. We will assess and explain the options."],
    ],
    related: ["panel-upgrades", "smart-home", "hvac"],
  },
  {
    slug: "panel-upgrades",
    title: "Panel and service upgrades, room to grow",
    eyebrow: "Electrical panel guide",
    category: "Systems & comfort",
    heroImage: P.build,
    gallery: [P.work, P.home],
    intro:
      "The service panel is the heart of the electrical system. If it is undersized or outdated, everything else you want to add hits a wall.",
    detail:
      "The scope covers load calculation, service sizing, panel and breaker replacement, grounding, labeling, and utility and inspection coordination.",
    items: [
      "Load calculation and service sizing",
      "Panel, breaker, and grounding plan",
      "Utility disconnect coordination",
      "Labeling, inspection, and documentation",
    ],
    value: {
      headline: "Unlocks every future electrical project — and removes a serious safety liability.",
      notes: [
        ["Capacity", "A modern 200-amp service supports EV chargers, heat pumps, shops, and additions."],
        ["Insurance & inspection", "Federal Pacific and similar panels are frequently flagged and can affect insurability."],
        ["Safety", "Modern breakers and grounding dramatically reduce shock and fire risk."],
      ],
    },
    faqs: [
      ["How long is the power off?", "Most upgrades are completed in a single day, with the utility disconnect scheduled in advance."],
      ["Do you coordinate with the utility?", "Yes. We handle the disconnect and reconnect scheduling."],
      ["Will I need a new meter?", "Sometimes. We will confirm during the site review."],
    ],
    related: ["electrical", "backup-power", "solar"],
  },
  {
    slug: "smart-home",
    title: "Smart home, convenience that actually works",
    eyebrow: "Smart home guide",
    category: "Systems & comfort",
    heroImage: P.home2,
    gallery: [P.home4, P.build],
    intro:
      "Smart home technology should be boringly reliable. We choose systems that work together, that you can control, and that do not lock you into one app.",
    detail:
      "The scope covers network and wiring readiness, thermostats, cameras, locks, lighting, and a single coherent app experience.",
    items: [
      "Network and Wi-Fi coverage review",
      "Device and ecosystem selection",
      "Wiring, mounting, and installation",
      "Setup, training, and handoff guide",
    ],
    value: {
      headline: "Security, energy savings, and daily convenience in one coordinated system.",
      notes: [
        ["Energy", "Smart thermostats and lighting schedules trim usage without any lifestyle sacrifice."],
        ["Security", "Cameras, sensors, and smart locks reduce risk and give peace of mind while away."],
        ["Usability", "The right system is one you will still actually use a year from now."],
      ],
    },
    faqs: [
      ["Which ecosystem should I choose?", "It depends on your phones and priorities. We support the major ecosystems and explain the trade-offs."],
      ["Can you fix my existing setup?", "Yes. We untangle mixed systems and get them working together."],
      ["Will it work if the internet is down?", "We prioritize devices that keep working locally. We will tell you which do."],
    ],
    related: ["electrical", "backup-power", "accessibility"],
  },
  {
    slug: "backup-power",
    title: "Backup power, keep the lights on",
    eyebrow: "Backup power guide",
    category: "Systems & comfort",
    heroImage: P.build,
    gallery: [P.work, P.home2],
    intro:
      "Outages are no longer rare. Standby generators and battery backup keep heat, refrigeration, medical equipment, and internet alive when the grid fails.",
    detail:
      "The scope covers load planning, generator or battery sizing, transfer switch installation, fuel or battery setup, and commissioning.",
    items: [
      "Critical-load and runtime planning",
      "Generator, battery, and transfer switch selection",
      "Permitted installation and electrical tie-in",
      "Commissioning, testing, and owner training",
    ],
    value: {
      headline: "Protection for food, heat, health equipment, and peace of mind.",
      notes: [
        ["Continuity", "Refrigeration, sump pumps, and medical devices all depend on steady power."],
        ["Property damage", "A failed sump pump during an outage is a common and expensive loss."],
        ["Everyday usefulness", "Battery systems can also shave peak-rate usage in some regions."],
      ],
    },
    faqs: [
      ["Generator or battery?", "Generators run longer on fuel; batteries are silent and instant. We will model your needs."],
      ["How much can it power?", "We plan by critical load so you know exactly what stays running and for how long."],
      ["Do I need a permit?", "Yes, along with electrical inspection and often a gas permit for generators."],
    ],
    related: ["electrical", "panel-upgrades", "solar"],
  },
  {
    slug: "insulation",
    title: "Insulation and weatherization, comfort you cannot see",
    eyebrow: "Insulation guide",
    category: "Systems & comfort",
    heroImage: P.home3,
    gallery: [P.build, P.home],
    intro:
      "Insulation and air sealing are the cheapest comfort upgrades in most homes. Most houses leak far more air than their owners realize.",
    detail:
      "The scope covers attic, wall, and crawlspace insulation, air sealing, ventilation correction, and moisture management.",
    items: [
      "Attic, wall, and crawlspace assessment",
      "Air sealing and ventilation plan",
      "Insulation installation and baffles",
      "Moisture check and performance notes",
    ],
    value: {
      headline: "Smaller bills, quieter rooms, and fewer drafts — often the best value in the house.",
      notes: [
        ["Energy cost", "Air sealing plus insulation typically cuts heating and cooling cost meaningfully."],
        ["Comfort", "Rooms above garages and near knee walls stop being unusable in extremes."],
        ["Durability", "Correct ventilation prevents the moisture problems that ruin insulation performance."],
      ],
    },
    faqs: [
      ["Do I need more insulation or better sealing?", "Usually both, but air sealing often delivers more benefit per dollar. We will test and show you."],
      ["Are rebates available?", "Often yes. We will document the work for any applicable program."],
      ["Can you fix a hot upstairs room?", "Sometimes it is insulation, sometimes duct design. We will diagnose before recommending."],
    ],
    related: ["hvac", "air-quality", "drywall"],
  },
  {
    slug: "air-quality",
    title: "Indoor air quality, breathe easier at home",
    eyebrow: "Indoor air quality guide",
    category: "Systems & comfort",
    heroImage: P.windows,
    gallery: [P.home, P.build],
    intro:
      "Everything you seal and insulate changes how a home breathes. Good air quality work balances filtration, ventilation, humidity, and source control.",
    detail:
      "The scope covers filtration upgrades, ERV/HRV ventilation, exhaust correction, humidity control, and duct cleaning where warranted.",
    items: [
      "Air, humidity, and exhaust assessment",
      "Filtration and ventilation planning",
      "Equipment installation and balancing",
      "Verification, filter guidance, and handoff",
    ],
    value: {
      headline: "Healthier air, fewer allergens, and a home that stays comfortable and dry.",
      notes: [
        ["Health", "Better filtration and ventilation reduce allergens, dust, and airborne irritants."],
        ["Moisture control", "Managing humidity prevents mold and protects the structure."],
        ["Comfort", "Balanced ventilation keeps rooms fresh without wrecking the energy bill."],
      ],
    },
    faqs: [
      ["Do I need an ERV or HRV?", "If your home is tightly sealed, likely yes. We will measure and advise."],
      ["How often should filters be changed?", "Depends on the filter rating and your household. We will set a simple schedule."],
      ["Can you fix a musty smell?", "Often, yes — but we find the moisture source first, not just the symptom."],
    ],
    related: ["hvac", "insulation", "drainage"],
  },
  {
    slug: "solar",
    title: "Solar and battery, energy you own",
    eyebrow: "Solar coordination guide",
    category: "Specialty projects",
    heroImage: P.home2,
    gallery: [P.home3, P.build],
    intro:
      "Solar only pays off when the roof, the electrical panel, and the utility rules all line up. We coordinate the whole picture instead of selling panels in isolation.",
    detail:
      "Scope covers roof condition, shading, panel capacity, utility interconnection, incentive documentation, and battery options.",
    items: [
      "Roof, shading, and orientation review",
      "Production estimate and incentive review",
      "Panel capacity and interconnection check",
      "Installation coordination and monitoring setup",
    ],
    value: {
      headline: "Lower utility bills and long-term energy independence — if the roof and panel support it.",
      notes: [
        ["Operating cost", "Solar offsets a large share of daytime usage where the site fits."],
        ["Resilience", "Paired with a battery, solar also provides outage backup."],
        ["Do it in order", "Replacing a roof under new panels later costs far more. Sequence matters."],
      ],
    },
    faqs: [
      ["Should I fix my roof first?", "If the roof is near end of life, yes. Removing and reinstalling panels is expensive."],
      ["What if my panel is too small?", "We may need a service upgrade first. We will assess and price it."],
      ["Are there tax credits?", "Programs change. We will point you to current federal and state information and document the install."],
    ],
    related: ["roofing", "panel-upgrades", "backup-power"],
  },
  {
    slug: "accessibility",
    title: "Accessibility and aging in place, stay in your home",
    eyebrow: "Accessibility guide",
    category: "Specialty projects",
    heroImage: P.home4,
    gallery: [P.home, P.windows],
    intro:
      "Most people want to stay in the home they love. Small, thoughtful changes can keep a house safe and livable through every stage of life.",
    detail:
      "The scope covers step-free entries, ramps, bathroom grab bars and curbless showers, stair lifts, wider doorways, and lighting.",
    items: [
      "Mobility needs and safety walkthrough",
      "Entry, bathroom, and stair solutions",
      "Grab bar blocking, ramps, and clearance work",
      "Lighting, hardware, and final safety check",
    ],
    value: {
      headline: "Safety, independence, and the avoided cost of a move or a facility.",
      notes: [
        ["Falls prevention", "Bathroom and stair modifications address the most common serious home injuries."],
        ["Independence", "Staying home preserves routines, community, and dignity."],
        ["Cost avoidance", "Modest modifications are far cheaper than an unplanned move or extended care."],
      ],
    },
    faqs: [
      ["What should we do first?", "Usually the bathroom and the main entry. Those carry the highest fall risk."],
      ["Do grab bars need blocking?", "Yes for real safety. We add proper backing, not just surface anchors."],
      ["Can this be done discreetly?", "Absolutely. Accessibility features can look like good design, not medical equipment."],
    ],
    related: ["bathrooms", "doors", "lighting"],
  },
  {
    slug: "insurance-claims",
    title: "Insurance claim documentation, evidence in order",
    eyebrow: "Insurance documentation guide",
    category: "Specialty projects",
    heroImage: P.roof,
    gallery: [P.pexRoof, P.build],
    intro:
      "After a storm, the difference between a smooth claim and a frustrating one is documentation. We photograph, measure, and scope the damage clearly.",
    detail:
      "We provide dated photos, measurements, and a written scope you can submit. Coverage decisions always remain with your carrier.",
    items: [
      "Dated damage photos and measurements",
      "Written scope aligned to the loss",
      "Code and permit documentation",
      "Supplement support and completion photos",
    ],
    value: {
      headline: "Better evidence means fewer disputes and a faster path to repair.",
      notes: [
        ["Clarity", "A documented scope answers adjuster questions before they are asked."],
        ["Code upgrades", "We note code-required work that is often omitted from initial estimates."],
        ["Your control", "We never negotiate for you; you stay in charge of your claim."],
      ],
    },
    faqs: [
      ["Will you meet the adjuster?", "Yes, we can be on site to walk the damage and provide measurements."],
      ["What if the claim is denied?", "We can provide additional documentation and discuss repair options either way."],
      ["Do you do the work too?", "Yes, once approved, we can perform the repair we scoped."],
    ],
    related: ["roofing", "gutters", "siding"],
  },
  {
    slug: "historic-homes",
    title: "Historic home updates, respect the original",
    eyebrow: "Historic home guide",
    category: "Specialty projects",
    heroImage: P.home3,
    gallery: [P.home, P.siding],
    intro:
      "Older homes demand specific materials and methods. Matching profiles, mortar, and proportions keeps character intact while improving performance.",
    detail:
      "The scope covers condition assessment, material matching, sympathetic repair, and modern performance upgrades hidden behind original finishes.",
    items: [
      "Historic condition and material assessment",
      "Profile, mortar, and trim matching",
      "Sympathetic repair and repointing",
      "Performance upgrades behind original finishes",
    ],
    value: {
      headline: "Preserve the character that makes the home valuable in the first place.",
      notes: [
        ["Value preservation", "Incorrect modern materials can permanently damage historic fabric and value."],
        ["Modern comfort", "Careful insulation and mechanical work improve performance without visible change."],
        ["Durability", "Old-growth wood and masonry can outlast modern replacements when properly maintained."],
      ],
    },
    faqs: [
      ["Can I replace original windows?", "Sometimes restoration is better for both character and cost. We will compare options."],
      ["Do you know local historic rules?", "We research your jurisdiction's requirements before specifying anything."],
      ["Can you match old mortar?", "Yes. Matching color, hardness, and joint profile protects brick from damage."],
    ],
    related: ["windows", "masonry", "roofing"],
  },
  {
    slug: "rental-turnover",
    title: "Rental turnover refreshes, fast and durable",
    eyebrow: "Rental turnover guide",
    category: "Specialty projects",
    heroImage: P.home,
    gallery: [P.home4, P.home2],
    intro:
      "Between tenants, speed and durability matter more than trends. We focus on the work that reduces vacancy and survives real use.",
    detail:
      "The scope covers paint, flooring, fixtures, doors, hardware, deep cleaning, and the repairs that consistently fail under tenants.",
    items: [
      "Turn condition walkthrough",
      "Durable paint, flooring, and fixture selection",
      "Repair of doors, hardware, and trim",
      "Clean, stage, and photo-ready handoff",
    ],
    value: {
      headline: "Less vacancy, fewer repair calls, and a unit that rents faster.",
      notes: [
        ["Vacancy cost", "Every empty week is lost rent. Speed is the highest-value variable."],
        ["Durability", "Buying for wear, not taste, lowers repeat repair costs."],
        ["Rentability", "Fresh, clean units photograph better and attract better tenants."],
      ],
    },
    faqs: [
      ["How fast can you turn a unit?", "Often within a week for standard turns, depending on scope and scheduling."],
      ["Do you work with property managers?", "Yes, we handle multiple units and standardized specs."],
      ["Can you make repairs only?", "Yes. We will separate must-fix from nice-to-have to protect your budget."],
    ],
    related: ["interior-painting", "flooring", "property-maintenance"],
  },
  {
    slug: "property-maintenance",
    title: "Property maintenance, one call for many trades",
    eyebrow: "Property maintenance guide",
    category: "Specialty projects",
    heroImage: P.build,
    gallery: [P.home2, P.work],
    intro:
      "Managing multiple properties means juggling dozens of vendors. Consolidating maintenance under one accountable team saves time and prevents small issues from growing.",
    detail:
      "The scope covers recurring inspections, preventive maintenance, repair coordination, and documentation for owners and managers.",
    items: [
      "Scheduled property inspections",
      "Preventive maintenance planning",
      "Coordinated multi-trade repairs",
      "Photo documentation and reporting",
    ],
    value: {
      headline: "Fewer emergencies, longer asset life, and one point of accountability.",
      notes: [
        ["Prevention", "Scheduled maintenance catches the failures that become expensive emergencies."],
        ["Asset life", "Roofs, HVAC, and envelopes last longer when maintained on a schedule."],
        ["Simplicity", "One accountable partner replaces a dozen vendor relationships."],
      ],
    },
    faqs: [
      ["Do you serve multi-family buildings?", "Yes, from small portfolios to larger managed properties."],
      ["How is work approved?", "We provide written scopes, photos, and estimates for approval before work begins."],
      ["Do you report back?", "Yes, with photos and completion documentation for your records."],
    ],
    related: ["rental-turnover", "insurance-claims", "drainage"],
  },
  {
    slug: "pre-sale",
    title: "Pre-sale improvement plans, spend where it counts",
    eyebrow: "Pre-sale planning guide",
    category: "Specialty projects",
    heroImage: P.home2,
    gallery: [P.pexSuburb, P.home],
    intro:
      "Not every improvement pays back before a sale. We help sellers focus on the handful of items that answer buyer objections and inspector findings.",
    detail:
      "The scope covers a walkthrough, prioritized recommendations, cost estimates, and a scheduling plan built around your listing timeline.",
    items: [
      "Buyer-objection walkthrough",
      "Prioritized improvements with cost estimates",
      "Inspector-flagged repair coordination",
      "Scheduling aligned to your listing date",
    ],
    value: {
      headline: "Concentrate your budget where buyers actually deduct value.",
      notes: [
        ["Avoid overspending", "Some projects do not return their cost before a sale. We tell you which."],
        ["Inspector readiness", "Fixing flagged items first prevents renegotiation later."],
        ["Faster sale", "Homes that read as maintained sell with fewer concessions."],
      ],
    },
    faqs: [
      ["What should I fix first?", "Usually safety and water issues, then anything visibly neglected. We will prioritize."],
      ["Should I remodel the kitchen?", "Rarely right before selling. Small cosmetic work usually returns more."],
      ["How far ahead should I start?", "Ideally two to three months before listing to allow scheduling."],
    ],
    related: ["interior-painting", "flooring", "roofing"],
  },
  {
    slug: "punch-list",
    title: "Punch lists and closeout work, finish the job",
    eyebrow: "Punch list guide",
    category: "Specialty projects",
    heroImage: P.home,
    gallery: [P.home4, P.build],
    intro:
      "Every project leaves small unfinished items. A dedicated closeout pass is what separates a finished job from an almost-finished one.",
    detail:
      "The scope covers walkthrough documentation, touch-up, adjustment, hardware alignment, and final completion photos.",
    items: [
      "Documented walkthrough and item list",
      "Touch-up painting and trim detail",
      "Adjustment of doors, drawers, and hardware",
      "Verification photos and final sign-off",
    ],
    value: {
      headline: "Small items, disproportionate impact on how the project is remembered.",
      notes: [
        ["Perceived quality", "Buyers and homeowners judge the whole job by the last details they see."],
        ["Warranty confidence", "A documented closeout makes warranty conversations straightforward."],
        ["Referral value", "Clean completion is what turns a customer into a referral source."],
      ],
    },
    faqs: [
      ["Can you finish another contractor's job?", "Often yes, after a review of what remains and any underlying issues."],
      ["How is the list built?", "We walk the project with you and document every item in writing."],
      ["How long does closeout take?", "Usually a day or two depending on scope."],
    ],
    related: ["multi-trade", "trim", "interior-painting"],
  },
  {
    slug: "multi-trade",
    title: "Multi-trade renovations, one coordinated scope",
    eyebrow: "Multi-trade renovation guide",
    category: "Specialty projects",
    heroImage: P.build,
    gallery: [P.crew, P.home],
    intro:
      "Big renovations involve many trades in a precise order. Coordinating them under one scope prevents the delays, gaps, and finger-pointing that derail projects.",
    detail:
      "The scope covers design coordination, sequencing, permits, trade scheduling, inspections, and a single point of accountability.",
    items: [
      "Single scoped plan across all trades",
      "Permit and inspection coordination",
      "Sequenced trade scheduling",
      "Unified punch list and closeout",
    ],
    value: {
      headline: "Fewer delays and no gaps between trades — the real cost driver in big projects.",
      notes: [
        ["Schedule risk", "Poor sequencing is the single biggest cause of renovation overruns."],
        ["Accountability", "One scope means no one points at the other trade."],
        ["Budget control", "A unified plan prevents the change orders that come from missing scope."],
      ],
    },
    faqs: [
      ["Can you handle whole-house projects?", "Yes, from design coordination through final inspection."],
      ["Do you self-perform or subcontract?", "Both, depending on the trade and scope. All crews are vetted and insured."],
      ["How do you handle changes?", "Every change is written, priced, and approved before work continues."],
    ],
    related: ["kitchens", "bathrooms", "punch-list"],
  },
  {
    slug: "emergency-repair",
    title: "Emergency repair coordination, act fast, act right",
    eyebrow: "Emergency repair guide",
    category: "Specialty projects",
    heroImage: P.pexRoof,
    gallery: [P.build, P.roof],
    intro:
      "When water is coming in or something unsafe has failed, speed matters — but so does doing the repair correctly the first time.",
    detail:
      "The scope covers stabilization and containment, mitigation where needed, permanent repair scoping, and documentation.",
    items: [
      "Immediate stabilization and containment",
      "Damage and cause assessment",
      "Mitigation coordination where required",
      "Permanent repair scope and documentation",
    ],
    value: {
      headline: "Stop the damage first, then repair the cause.",
      notes: [
        ["Limit loss", "Fast containment prevents a small failure from becoming a major loss."],
        ["Correct cause", "Temporary fixes that ignore the cause just delay the next failure."],
        ["Documentation", "Photos and records support any insurance claim that follows."],
      ],
    },
    faqs: [
      ["What counts as an emergency?", "Active water intrusion, structural instability, electrical hazards, and no heat in freezing weather."],
      ["Do you do temporary repairs?", "Yes, to stabilize the home until a permanent repair can be scheduled."],
      ["Will you document for insurance?", "Yes. We photograph and record everything for your records."],
    ],
    related: ["roofing", "plumbing", "insurance-claims"],
  },
];

export const PROJECT_LIBRARY: ProjectGuide[] = LIBRARY;

const BY_SLUG = new Map(LIBRARY.map((project) => [project.slug, project]));

const FALLBACK_IMAGES = [P.home, P.home2, P.home3, P.home4, P.build, P.siding, P.windows, P.outdoor];

export function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Returns the full guide for a slug. Unknown slugs (for example a catalog item
 * that does not yet have a bespoke write-up) still get a complete, honest page
 * instead of a dead end or an empty template.
 */
export function getProjectGuide(slug: string | undefined): ProjectGuide | undefined {
  if (!slug) return undefined;
  const found = BY_SLUG.get(slug);
  if (found) return found;

  const title = titleFromSlug(slug);
  if (!title) return undefined;

  const seed = slug.length % FALLBACK_IMAGES.length;
  return {
    slug,
    title: `${title}, planned and documented`,
    eyebrow: `${title} project guide`,
    category: "Home improvement",
    heroImage: FALLBACK_IMAGES[seed],
    gallery: [FALLBACK_IMAGES[(seed + 1) % FALLBACK_IMAGES.length], FALLBACK_IMAGES[(seed + 2) % FALLBACK_IMAGES.length]],
    intro: `Every LoveMeAfter project follows the same standard, whether it is a full roof replacement or a ${title.toLowerCase()} conversation. We inspect, document, and put the useful parts in writing before anyone commits.`,
    detail: `Tell us what you see, feel, or want to change and we will turn it into a clear ${title.toLowerCase()} scope with honest pricing, a realistic schedule, and a checked crew.`,
    items: [
      "On-site assessment and photo documentation",
      "Written scope with material and finish options",
      "Permit and crew coordination where required",
      "Final walkthrough, completion photos, and follow-up",
    ],
    value: {
      headline: "The same standard applies: protect the asset, improve daily life, and support resale.",
      notes: [
        ["Protect the home", "We start with water, safety, and structure before finishes."],
        ["Improve daily life", "Comfort, function, and maintenance load matter as much as appearance."],
        ["Support resale", "Documented, permitted work is easier to explain to a buyer or inspector."],
      ],
    },
    faqs: [
      ["How do I get started?", "Send the address and a short description of the project, and we will schedule a walkthrough."],
      ["Is the estimate free?", "Yes. You get a written scope with no obligation to proceed."],
      ["Do you subcontract?", "Yes, when a specialist is the right fit. Every crew is vetted, insured, and coordinated by us."],
    ],
    related: ["multi-trade", "punch-list", "pre-sale"],
  };
}

export function relatedGuides(project: ProjectGuide): ProjectGuide[] {
  const picks = project.related
    .map((slug) => BY_SLUG.get(slug))
    .filter((guide): guide is ProjectGuide => Boolean(guide));
  if (picks.length >= 3) return picks.slice(0, 3);
  const filler = PROJECT_LIBRARY.filter(
    (guide) => guide.slug !== project.slug && !project.related.includes(guide.slug),
  ).slice(0, 3 - picks.length);
  return [...picks, ...filler];
}
