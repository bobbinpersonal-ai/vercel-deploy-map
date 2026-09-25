/**
 * LoveMeAfter photo library.
 *
 * Every image below was matched to its subject by searching Pexels for that
 * exact topic and then verified to resolve (HTTP 200) from the Pexels CDN at
 * the time of writing. Pexels images are free to use under the Pexels License,
 * which does not require attribution, but we link back to each photo page and
 * credit Pexels anyway.
 *
 * These are reference photographs of the type of work described. They are not
 * photographs of completed LoveMeAfter jobs and are never presented as such.
 */

export const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const pxPage = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const PHOTO_CREDIT =
  "Visual examples are used to explain the type of work discussed; completed-project photography is labeled separately when available.";

export const PHOTO_CREDIT_URL = "https://www.pexels.com/license/";

export type PhotoSet = {
  /** Hero photograph for the project. */
  hero: number;
  /** Two supporting photographs. */
  gallery: [number, number];
  /** Close-up product photographs: [accurate label, photo id]. */
  products: [string, number][];
};

/** Subject-matched photographs, keyed by project slug. */
export const PROJECT_PHOTO_SETS: Record<string, PhotoSet> = {
  roofing: {
    hero: 237907,
    gallery: [38510717, 18366307],
    products: [
      ["Roof shingles", 4334097],
      ["Crew on the roof", 32050399],
      ["Chimney and flashing", 1503520],
      ["Gutters at the roofline", 2663254],
    ],
  },
  siding: {
    hero: 39281193,
    gallery: [7475555, 9646276],
    products: [
      ["Sided house exterior", 22485304],
      ["Trim and corner detail", 9036949],
      ["Window and siding junction", 39634957],
      ["Finished exterior wall", 186077],
    ],
  },
  windows: {
    hero: 39634957,
    gallery: [953400, 2300710],
    products: [
      ["Exterior window frame", 2290609],
      ["Window light and interior", 953400],
      ["Interior window trim", 12700432],
      ["Window wall in a room", 2300710],
    ],
  },
  gutters: {
    hero: 13793186,
    gallery: [2663254, 13534968],
    products: [
      ["Gutter at the roof edge", 2663254],
      ["Downspout and runoff", 32257223],
      ["Roof and gutter line", 4334097],
      ["Ground drainage", 5940868],
    ],
  },
  "exterior-paint": {
    hero: 5583126,
    gallery: [10533141, 5583052],
    products: [
      ["Rolling on the finish coat", 10533141],
      ["Brush and detail work", 5583052],
      ["Painted exterior wall", 4913326],
      ["Trim and siding finish", 9646276],
    ],
  },
  doors: {
    hero: 16254509,
    gallery: [19609299, 10608219],
    products: [
      ["Front entry door", 16254509],
      ["Interior door", 11231039],
      ["Door hardware and hinges", 6956123],
      ["Door casing and trim", 9036949],
    ],
  },
  "garage-doors": {
    hero: 37124334,
    gallery: [34711989, 34930005],
    products: [
      ["Garage door and driveway", 3935333],
      ["Garage door on a home", 34711989],
      ["Door panel detail", 34930005],
      ["Tools and installation", 3926800],
    ],
  },
  decks: {
    hero: 33017851,
    gallery: [19632196, 17591079],
    products: [
      ["Decking boards", 33017851],
      ["Deck and porch structure", 24245767],
      ["Railing and steps", 19632196],
      ["Backyard deck setting", 17591079],
    ],
  },
  fencing: {
    hero: 11903184,
    gallery: [30573147, 11742500],
    products: [
      ["Fence line and panels", 30573147],
      ["Privacy fence", 11742500],
      ["Gate and posts", 11903184],
      ["Fence along the lawn", 38478448],
    ],
  },
  paving: {
    hero: 6333640,
    gallery: [12676275, 36861831],
    products: [
      ["Paving in progress", 6333640],
      ["Finished asphalt surface", 12676275],
      ["Concrete driveway", 8134845],
      ["Paving edge and curb", 36861831],
    ],
  },
  concrete: {
    hero: 36847988,
    gallery: [26107204, 37121400],
    products: [
      ["Concrete pour", 26107204],
      ["Freshly finished slab", 37121400],
      ["Flatwork and forms", 36847988],
      ["Concrete driveway", 3935333],
    ],
  },
  masonry: {
    hero: 39593399,
    gallery: [32968373, 36259359],
    products: [
      ["Brick masonry wall", 32968373],
      ["Stone detail work", 36259359],
      ["Retaining wall", 37340278],
      ["Brick chimney", 35160053],
    ],
  },
  patios: {
    hero: 10855255,
    gallery: [9173338, 16239802],
    products: [
      ["Paver patio", 10855255],
      ["Hardscape edging", 9173338],
      ["Outdoor seating area", 16239802],
      ["Patio and landscaping", 5163420],
    ],
  },
  drainage: {
    hero: 19459909,
    gallery: [32257223, 5940868],
    products: [
      ["Drainage trench", 5940868],
      ["Drain pipe", 32257223],
      ["Surface runoff control", 19459909],
      ["Water and grading", 8143668],
    ],
  },
  landscaping: {
    hero: 13871294,
    gallery: [5163420, 33650475],
    products: [
      ["Planted beds", 33650475],
      ["Lawn and edging", 7031581],
      ["Garden planting", 13871294],
      ["Yard and hardscape", 9173338],
    ],
  },
  kitchens: {
    hero: 4030055,
    gallery: [7658310, 7587864],
    products: [
      ["Kitchen cabinetry", 8146322],
      ["Kitchen sink and faucet", 19836790],
      ["Countertop surface", 18285887],
      ["Tile backsplash", 7173661],
      ["Cabinet doors and hardware", 5825540],
      ["Kitchen flooring", 11126101],
    ],
  },
  bathrooms: {
    hero: 6238612,
    gallery: [12631676, 36028067],
    products: [
      ["Bathroom vanity", 27629440],
      ["Bathroom sink and faucet", 10568026],
      ["Shower", 19980232],
      ["Bathroom wall tile", 10486084],
      ["Faucet detail", 10568026],
      ["Bathroom mirror", 4758745],
    ],
  },
  basements: {
    hero: 35539075,
    gallery: [4092026, 35493889],
    products: [
      ["Finished interior wall", 32716845],
      ["Basement flooring", 11126101],
      ["Ceiling light fixture", 298542],
      ["Framed wall insulation", 4482829],
    ],
  },
  flooring: {
    hero: 11126101,
    gallery: [204263, 9423038],
    products: [
      ["Hardwood flooring", 11126101],
      ["Tile floor", 15699201],
      ["Floor and baseboard transition", 12039044],
      ["Room with new flooring", 204263],
    ],
  },
  tile: {
    hero: 9423038,
    gallery: [15699201, 8141966],
    products: [
      ["Tile floor", 15699201],
      ["Wall tile", 10486084],
      ["Tile and grout lines", 27573422],
      ["Kitchen backsplash tile", 7167993],
    ],
  },
  cabinetry: {
    hero: 8146322,
    gallery: [7535073, 15409513],
    products: [
      ["Kitchen cabinet doors", 4030055],
      ["Cabinet drawer hardware", 248952],
      ["Cabinets and countertop", 8583696],
      ["Cabinets and backsplash", 10827397],
    ],
  },
  countertops: {
    hero: 18285887,
    gallery: [8583696, 7533765],
    products: [
      ["Countertop edge", 7533765],
      ["Sink cut into the counter", 34232247],
      ["Countertop and cabinetry", 18285887],
      ["Counter and backsplash", 7173661],
    ],
  },
  "interior-painting": {
    hero: 5583126,
    gallery: [5583052, 10533141],
    products: [
      ["Rolling a wall", 10533141],
      ["Cutting in edges", 10533141],
      ["Painted interior wall", 5583126],
      ["Painted trim", 8583905],
    ],
  },
  drywall: {
    hero: 32716845,
    gallery: [6082416, 11427055],
    products: [
      ["Drywall panels", 11427055],
      ["Framing before board", 39367475],
      ["Finished and painted wall", 5583052],
      ["Trim over drywall", 9036949],
    ],
  },
  trim: {
    hero: 8583905,
    gallery: [9036949, 12700432],
    products: [
      ["Baseboard and casing", 9036949],
      ["Interior door trim", 8693637],
      ["Stair and railing detail", 33803734],
      ["Built-in millwork", 7535073],
    ],
  },
  closets: {
    hero: 36307503,
    gallery: [36730419, 7587738],
    products: [
      ["Closet shelving and rods", 7587738],
      ["Walk-in closet layout", 36307503],
      ["Drawers and storage", 7587738],
      ["Closet lighting", 11021594],
    ],
  },
  hvac: {
    hero: 18725613,
    gallery: [27427771, 29452977],
    products: [
      ["Outdoor condenser unit", 18725613],
      ["Furnace equipment", 36788832],
      ["Ductwork", 32032996],
      ["Thermostat", 27638181],
    ],
  },
  plumbing: {
    hero: 3500006,
    gallery: [12142829, 8581897],
    products: [
      ["Supply and drain piping", 8581897],
      ["Water heater", 34593293],
      ["Faucet and fixture", 30560253],
      ["Bathroom plumbing fixtures", 6580366],
    ],
  },
  electrical: {
    hero: 11837451,
    gallery: [5691642, 5691588],
    products: [
      ["Breaker panel", 5767595],
      ["Light fixture", 12689254],
      ["Wiring and conduit", 5691588],
      ["Outlet and switch work", 5691642],
    ],
  },
  "panel-upgrades": {
    hero: 5767595,
    gallery: [257736, 38171184],
    products: [
      ["Service panel and breakers", 38171184],
      ["Panel and meter area", 257736],
      ["Standby generator", 32713414],
      ["Electrical service work", 5691642],
    ],
  },
  "smart-home": {
    hero: 37816637,
    gallery: [27638181, 11021594],
    products: [
      ["Smart thermostat", 27638181],
      ["Connected breaker panel", 257736],
      ["Smart light fixture", 298542],
      ["Device installation", 37816637],
    ],
  },
  "backup-power": {
    hero: 32713414,
    gallery: [9875410, 10397938],
    products: [
      ["Standby generator", 9875410],
      ["Generator and transfer equipment", 10397938],
      ["Service panel backup", 38171184],
      ["Solar and battery coordination", 12498725],
    ],
  },
  insulation: {
    hero: 4482829,
    gallery: [8082327, 8082321],
    products: [
      ["Attic insulation", 8082327],
      ["Insulated wall cavity", 8082321],
      ["Framed and insulated walls", 39151698],
      ["Ventilation at the roof", 2464420],
    ],
  },
  "air-quality": {
    hero: 32032996,
    gallery: [2464420, 19431067],
    products: [
      ["Air duct", 19431067],
      ["Ventilation equipment", 2464420],
      ["HVAC air handler", 27427771],
      ["Insulated duct run", 8082321],
    ],
  },
  solar: {
    hero: 12498725,
    gallery: [38021376, 12243093],
    products: [
      ["Roof-mounted solar array", 38021376],
      ["Solar panels", 12243093],
      ["Roof under the array", 18366307],
      ["Battery backup equipment", 9875410],
    ],
  },
  accessibility: {
    hero: 6580366,
    gallery: [19980232, 13005094],
    products: [
      ["Accessible shower", 19980232],
      ["Grab bar and mirror", 29139295],
      ["Stair safety and railing", 13821521],
      ["Step-free bathroom layout", 36028067],
    ],
  },
  "insurance-claims": {
    hero: 38510717,
    gallery: [237907, 32050399],
    products: [
      ["Damaged roof surface", 4334097],
      ["Gutter and fascia damage", 13534968],
      ["Exterior damage review", 7475555],
      ["Crew assessing the roof", 32050399],
    ],
  },
  "historic-homes": {
    hero: 4913326,
    gallery: [18729447, 10628470],
    products: [
      ["Older home exterior", 22485304],
      ["Brick and mortar detail", 36259359],
      ["Original entry door", 19609299],
      ["Period window", 2290609],
    ],
  },
  "rental-turnover": {
    hero: 37460692,
    gallery: [32579238, 20432916],
    products: [
      ["Freshly painted walls", 5583052],
      ["Refinished flooring", 204263],
      ["Bedroom after turnover", 31488380],
      ["Updated light fixture", 12689254],
    ],
  },
  "property-maintenance": {
    hero: 12314551,
    gallery: [31434235, 11293626],
    products: [
      ["Maintenance inspection", 32497163],
      ["Plumbing check", 12142829],
      ["HVAC service", 29452977],
      ["Property walkthrough", 31434235],
    ],
  },
  "pre-sale": {
    hero: 22485304,
    gallery: [7746626, 36099150],
    products: [
      ["Fresh interior paint", 10533141],
      ["Updated flooring", 11126101],
      ["Entry and curb appeal", 16254509],
      ["Living space staging", 7746626],
    ],
  },
  "punch-list": {
    hero: 12700432,
    gallery: [5825540, 11427055],
    products: [
      ["Trim touch-up", 9036949],
      ["Cabinet hardware adjustment", 248952],
      ["Drywall detail", 11427055],
      ["Final paint touch-up", 5583126],
    ],
  },
  "multi-trade": {
    hero: 39151698,
    gallery: [39367475, 9242911],
    products: [
      ["Framing in progress", 33043393],
      ["Project plans", 9242911],
      ["Construction worker on site", 4442490],
      ["Tools and materials", 3926800],
    ],
  },
  "emergency-repair": {
    hero: 19459909,
    gallery: [237907, 3500006],
    products: [
      ["Water intrusion response", 5940868],
      ["Roof damage", 18366307],
      ["Leak repair", 12142829],
      ["Damage assessment", 8482517],
    ],
  },
};

/** Photos used by state and area pages for everyday, non-luxury housing. */
export const SUBURBAN_HOME_PHOTOS: [string, number][] = [
  ["Everyday home exterior", 4913326],
  ["Practical family home", 22485304],
  ["Townhome row", 18729447],
  ["Ordinary neighborhood home", 10628470],
  ["Older suburban house", 8579963],
  ["Home with a modest lawn", 7031581],
];

/**
 * Field conditions documentation: storm damage, water intrusion, rot, mold,
 * failed work, and demolition. Used to educate homeowners on what neglect and
 * bad weather actually cost.
 */
export const DAMAGE_PHOTOS: [string, number][] = [
  ["Storm-damaged roof", 17596993],
  ["Exposed roof decking", 37737386],
  ["Wind-lifted shingles", 38476854],
  ["Failed roof section", 17931269],
  ["Storm damage to a home", 17845889],
  ["Downed tree on a property", 34680656],
  ["Hail-hit roof surface", 11522832],
  ["Damaged exterior", 28447774],
  ["Water-stained ceiling", 30499666],
  ["Water damage inside a room", 14377406],
  ["Ceiling leak damage", 5138311],
  ["Bulk water intrusion", 17537662],
  ["Mold on a wall surface", 6141203],
  ["Mold growth detail", 17374615],
  ["Moisture and mold damage", 33011846],
  ["Rotten structural wood", 34041325],
  ["Rotted framing", 16719750],
  ["Timber rot", 8551844],
  ["Decayed wood member", 13791090],
  ["Interior demolition", 15109996],
  ["Gutted room during demo", 28704277],
  ["Demolition debris", 38173080],
  ["Broken window glass", 5135437],
  ["Shattered window", 35425836],
  ["Damaged window frame", 10631753],
  ["Cracked wall", 10979509],
  ["Foundation cracking", 10682524],
  ["Structural cracking", 14070662],
  ["Flooded interior", 8770486],
  ["Standing water damage", 28447806],
  ["Flooded floor", 7924140],
  ["Water-damaged interior", 28447782],
  ["Leaking pipe", 15206136],
  ["Pipe corrosion", 18274115],
  ["Plumbing failure", 35137859],
  ["Hail damage to roofing", 6931459],
  ["Storm-hail damage", 16860477],
  ["Storm damage detail", 18631466],
  ["Damaged roof surface", 20609267],
  ["Tree damage to a structure", 33526769],
  ["Storm debris on a home", 16105712],
  ["Property storm damage", 32394146],
  ["Interior tear-out", 3562689],
  ["Wall removal", 8488031],
  ["Demolition in progress", 36436207],
  ["Removal and haul-away", 36491147],
  ["Cracked concrete", 29102198],
  ["Concrete spalling", 16092156],
  ["Surface cracking", 9781822],
  ["Debris removal", 33842119],
  ["Dumpster on site", 33929758],
  ["Waste removal", 5983967],
  ["Cleanup after demolition", 8811446],
  ["Old roof removed", 37062270],
  ["Exposed framing during repair", 38975495],
  ["Jobsite debris", 36311213],
  ["Torn-off shingles", 38368148],
];

/** Trade workers, by craft. */
export const WORKER_PHOTOS: [string, number][] = [
  ["Roofing crew at work", 38510717],
  ["Roofer installing shingles", 32050399],
  ["Roofer on a ladder", 38524253],
  ["Roof work in progress", 38781401],
  ["Electrician at work", 11837451],
  ["Electrical panel work", 33694016],
  ["Wiring installation", 9679179],
  ["Electrical service work", 34054464],
  ["Plumber at work", 33388390],
  ["Plumbing repair", 32588548],
  ["Pipe work", 8486927],
  ["Plumbing service call", 35072812],
  ["HVAC technician", 6471913],
  ["HVAC service", 32497161],
  ["Heating system service", 6471914],
  ["Comfort system work", 5463582],
  ["House painter at work", 5768187],
  ["Painting preparation", 6474200],
  ["Exterior painting", 31544574],
  ["Paint application", 7217983],
  ["Tile setter at work", 12924578],
  ["Tile installation", 11806476],
  ["Bathroom tile work", 20381405],
  ["Tile detail work", 11806477],
  ["Carpenter at work", 33005110],
  ["Carpentry detail", 5691541],
  ["Wood framing work", 32357250],
  ["Finish carpentry", 313776],
  ["Drywall installation", 4981812],
  ["Drywall finishing", 4981770],
  ["Hanging drywall", 5493677],
  ["Mudding and taping", 3614763],
  ["Landscaper at work", 27135590],
  ["Landscape crew", 24595772],
  ["Yard work", 16239805],
  ["Planting work", 9548417],
  ["Bricklayer at work", 19688828],
  ["Masonry work", 8586035],
  ["Brick laying", 10383588],
  ["Stone work", 15806957],
  ["Construction worker at work", 4442490],
  ["Site supervisor", 4442490],
  ["Jobsite leadership", 9405517],
  ["Crew coordination", 3932291],
  ["Apprentice learning the trade", 3846255],
  ["Training on the job", 3846269],
  ["Trade training", 9242821],
  ["Apprentice at work", 9241704],
  ["Welder at work", 29960487],
  ["Welding metal", 4400533],
  ["Metal fabrication", 4561617],
  ["Welding detail", 37517094],
  ["Construction team", 6192762],
  ["Crew group photo", 34670929],
  ["Team on site", 12314551],
  ["Site team", 5773087],
];

/** Jobsite, equipment, tools, permits, and inspection photography. */
export const JOBSITE_PHOTOS: [string, number][] = [
  ["Scaffolding on a building", 16901852],
  ["Scaffold access", 38253244],
  ["Working at height", 29106062],
  ["Excavator on site", 36657008],
  ["Excavation work", 37393680],
  ["Earthwork", 39351492],
  ["Site excavation", 15794732],
  ["Crane on a project", 17297091],
  ["Lifting equipment", 14354493],
  ["Crane and structure", 30334199],
  ["Heavy lift", 31258538],
  ["Heavy equipment", 1009926],
  ["Earthmoving equipment", 14484385],
  ["Machinery on site", 11973740],
  ["Equipment at work", 31543919],
  ["Ladder on site", 18194443],
  ["Ladder work", 15794754],
  ["Access equipment", 2637051],
  ["Step ladder", 9396159],
  ["Tool belt", 8447753],
  ["Hand tools", 17063686],
  ["Tools laid out", 34019840],
  ["Tool kit", 8447882],
  ["Power tools", 3877525],
  ["Cordless tools", 8811530],
  ["Tool use", 8961527],
  ["Power tool detail", 30413428],
  ["Paint sprayer", 7493886],
  ["Spray equipment", 7493876],
  ["Finishing equipment", 31759140],
  ["Spray finish", 6474130],
  ["Site plans", 8470842],
  ["Blueprints on site", 8961133],
  ["Plan review", 8961134],
  ["Project documents", 29299826],
  ["Inspection checklist", 8293635],
  ["Site inspection", 5532844],
  ["Clipboard inspection", 8293774],
  ["Quality check", 8293670],
  ["Safety gear", 38070],
  ["Safety helmet", 8487763],
  ["PPE on site", 13507074],
  ["Jobsite safety", 12131144],
  ["Contractor site meeting", 8070723],
  ["Site walkthrough", 6285155],
  ["Project meeting", 8470037],
  ["Coordination on site", 7937659],
  ["Work van", 18031901],
  ["Van and tools", 6195877],
  ["Service vehicle", 13821194],
  ["Work vehicle", 6196228],
  ["Equipment trailer", 12261472],
  ["Trailer on site", 38095094],
  ["Hauling equipment", 25284586],
  ["Towing on site", 35042792],
];

/** Photos chosen to describe a specific service category on guide pages. */
export const CATEGORY_PHOTOS: Record<string, [string, string, number][]> = {
  "Exterior & protection": [
    ["Damage", "Storm-damaged roof", 17596993],
    ["Repair", "Roof work in progress", 38781401],
    ["Crew", "Roofer installing shingles", 32050399],
  ],
  "Kitchens, baths & interiors": [
    ["Damage", "Water-stained ceiling", 30499666],
    ["Repair", "Drywall installation", 4981812],
    ["Crew", "Tile setter at work", 12924578],
  ],
  "Systems & comfort": [
    ["Diagnosis", "Pipe corrosion", 18274115],
    ["Repair", "HVAC service", 32497161],
    ["Crew", "Plumber at work", 33388390],
  ],
  "Outdoor spaces & property": [
    ["Damage", "Concrete spalling", 16092156],
    ["Repair", "Excavation work", 37393680],
    ["Crew", "Masonry work", 8586035],
  ],
  "Specialty projects": [
    ["Inspection", "Site inspection", 5532844],
    ["Documentation", "Project documents", 29299826],
    ["Crew", "Construction team", 6192762],
  ],
  "Home improvement": [
    ["Inspection", "Inspection checklist", 8293635],
    ["Repair", "Tool belt", 8447753],
    ["Crew", "Team on site", 12314551],
  ],
};

export function projectHero(slug: string) {
  const set = PROJECT_PHOTO_SETS[slug];
  return set ? px(set.hero) : px(22485304);
}

export function projectGallery(slug: string): [string, string] {
  const set = PROJECT_PHOTO_SETS[slug];
  return set ? [px(set.gallery[0]), px(set.gallery[1])] : [px(12314551), px(4442490)];
}

export type ProductPhoto = { label: string; image: string; id: number; page: string };

export function projectProducts(slug: string): ProductPhoto[] {
  const set = PROJECT_PHOTO_SETS[slug];
  const list: [string, number][] = set
    ? set.products
    : [
        ["Project review", 31434235],
        ["Trade work", 12314551],
        ["Tools and materials", 3926800],
        ["Finished detail", 22485304],
      ];
  return list.map(([label, id]) => ({ label, image: px(id), id, page: pxPage(id) }));
}
