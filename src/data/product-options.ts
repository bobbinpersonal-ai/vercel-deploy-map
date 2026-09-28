export type ProductOption = {
  brand: string;
  line: string;
  domain: string;
  imageUrl?: string;
  imageAlt?: string;
  productUrl?: string;
  highlights?: string[];
  suiteLinks?: { label: string; url: string }[];
  history: string;
  why: string;
  warranty: string;
  officialUrl: string;
};

export type ProductFamily = {
  title: string;
  intro: string;
  options: ProductOption[];
};

const SUITE_LINKS: Record<string, [string, string][]> = {
  "gaf.com": [
    ["Timberline HDZ shingles", "https://www.gaf.com/en-us/roofing-materials/residential-roofing-materials/shingles/timberline-hdz"],
    ["All residential shingle lines", "https://www.gaf.com/en-us/roofing-materials/residential-roofing-materials/shingles"],
    ["Starter strip shingles", "https://www.gaf.com/en-us/roofing-materials/residential-roofing-materials/starter-strip-shingles"],
    ["Hip & ridge cap shingles", "https://www.gaf.com/en-us/roofing-materials/residential-roofing-materials/hip-and-ridge-cap-shingles"],
    ["Leak barriers / ice protection", "https://www.gaf.com/en-us/roofing-materials/residential-roofing-materials/leak-barriers"],
    ["Roof deck protection", "https://www.gaf.com/en-us/roofing-materials/residential-roofing-materials/roof-deck-protection"],
    ["Attic vents & ventilation", "https://www.gaf.com/en-us/roofing-materials/residential-roofing-materials/attic-vents-other-ventilation"],
    ["GAF warranty information", "https://www.gaf.com/en-us/for-homeowners/warranties"],
  ],
  "owenscorning.com": [
    ["Duration shingles", "https://www.owenscorning.com/en-us/roofing/shingles/trudefinition-duration"],
    ["Duration FLEX", "https://www.owenscorning.com/en-us/roofing/shingles/trudefinition-duration-flex"],
    ["Duration STORM", "https://www.owenscorning.com/en-us/roofing/shingles/trudefinition-duration-storm"],
    ["Duration COOL", "https://www.owenscorning.com/en-us/roofing/shingles/trudefinition-duration-cool"],
    ["Designer shingle lines", "https://www.owenscorning.com/en-us/roofing/shingles/trudefinition-duration-designer"],
    ["Roof components & documents", "https://www.owenscorning.com/en-us/roofing/documents"],
    ["Installation instructions", "https://www.owenscorning.com/en-us/roofing/install-instructions"],
  ],
  "certainteed.com": [
    ["Residential roofing product suite", "https://www.certainteed.com/products/residential-roofing"],
    ["Landmark shingles", "https://www.certainteed.com/products/residential-roofing-products/landmark"],
    ["Landmark PRO", "https://www.certainteed.com/products/residential-roofing-products/landmark-pro"],
    ["Roof starter shingles", "https://www.certainteed.com/products/residential-roofing-products/high-performance-starter"],
    ["Hip & ridge products", "https://www.certainteed.com/products/residential-roofing-products"],
    ["Ridge ventilation", "https://www.certainteed.com/products/residential-roofing-products/ridge-vent"],
    ["Siding & trim products", "https://www.certainteed.com/products/siding-products"],
    ["Roofing warranty information", "https://www.certainteed.com/warranties"],
  ],
  "jameshardie.com": [
    ["All Hardie products", "https://www.jameshardie.com/product-catalog/"],
    ["HardiePlank lap siding", "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/"],
    ["HardiePanel vertical siding", "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/"],
    ["HardieShingle siding", "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/"],
    ["HardieTrim products", "https://www.jameshardie.com/product-catalog/trim-products/"],
    ["HardieSoffit panels", "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/"],
    ["Installation guidance & technical documents", "https://www.jameshardie.com/installation-instructions-technical-docs/"],
  ],
  "lpcorp.com": [
    ["LP SmartSide siding & trim", "https://lpcorp.com/products/siding-trim"],
    ["Lap siding", "https://lpcorp.com/products/siding-trim/lap-siding"],
    ["Panel siding", "https://lpcorp.com/products/siding-trim/panel-siding"],
    ["Shake siding", "https://lpcorp.com/products/siding-trim/shake-siding"],
    ["Trim & fascia", "https://lpcorp.com/products/siding-trim/trim"],
    ["Installation resources", "https://lpcorp.com/resources"],
  ],
  "andersenwindows.com": [
    ["Compare Andersen product series", "https://www.andersenwindows.com/windows-and-doors/series"],
    ["100 Series", "https://www.andersenwindows.com/windows-and-doors/series/100-series"],
    ["200 Series", "https://www.andersenwindows.com/windows-and-doors/series/200-series"],
    ["400 Series", "https://www.andersenwindows.com/windows-and-doors/series/400-series"],
    ["A-Series architectural collection", "https://www.andersenwindows.com/windows-and-doors/series/a-series"],
    ["E-Series", "https://www.andersenwindows.com/windows-and-doors/series/e-series"],
    ["Patio doors", "https://www.andersenwindows.com/windows-and-doors/doors"],
    ["Compare windows & doors", "https://www.andersenwindows.com/windows-and-doors/series"],
  ],
  "pella.com": [
    ["Explore Pella windows", "https://www.pella.com/windows/"],
    ["Explore Pella doors", "https://www.pella.com/doors/"],
    ["Product series and materials", "https://www.pella.com/windows/"],
    ["Care and warranty resources", "https://www.pella.com/support/"],
  ],
  "marvin.com": [
    ["Marvin product collections", "https://www.marvin.com/products"],
    ["Essential collection", "https://www.marvin.com/products/essential"],
    ["Elevate collection", "https://www.marvin.com/products/elevate"],
    ["Signature collection", "https://www.marvin.com/products/signature"],
    ["Windows & doors", "https://www.marvin.com/products/windows"],
  ],
  "trex.com": [
    ["All Trex outdoor-living products", "https://www.trex.com/products/"],
    ["Trex composite fencing collections", "https://www.trex.com/products/fencing/"],
    ["Trex Seclusions panel & color information", "https://www.trex.com/products/fencing/"],
    ["Trex Horizons framed fence system", "https://www.trex.com/products/fencing/"],
    ["Trex Solitudes horizontal fence", "https://www.trex.com/products/fencing/"],
    ["Trex Rail Fence", "https://www.trex.com/products/fencing/"],
    ["Trex Seclusions panel & color information", "https://www.trex.com/products/fencing/"],
    ["Trex Horizons framed fence system", "https://www.trex.com/products/fencing/"],
    ["Trex Solitudes horizontal fence", "https://www.trex.com/products/fencing/"],
    ["Trex Rail Fence", "https://www.trex.com/products/fencing/"],
    ["Trex fencing inspiration gallery", "https://www.trex.com/deck-ideas/composite-fencing-ideas-gallery/"],
    ["Seclusions / Horizons / Solitudes / Rail Fence options", "https://www.trex.com/products/fencing/"],
    ["Fencing colors, posts, rails & components", "https://www.trex.com/products/fencing/"],
    ["Fencing warranty, care & support", "https://www.trex.com/customer-support/"],
    ["Compare decking tiers & colors", "https://www.trex.com/products/decking/"],
    ["Transcend Lineage decking", "https://www.trex.com/products/decking/lineage/"],
    ["Railing systems", "https://www.trex.com/products/railing/"],
    ["Deck lighting", "https://www.trex.com/products/deck-lighting/"],
    ["Deck drainage", "https://www.trex.com/products/deck-drainage/"],
    ["Fascia & cladding", "https://www.trex.com/products/fascia/"],
    ["Fasteners & accessories", "https://www.trex.com/products/fasteners/"],
    ["Fencing", "https://www.trex.com/products/fencing/"],
    ["Outdoor furniture", "https://www.trex.com/products/furniture/"],
    ["Care, cleaning & warranties", "https://www.trex.com/customer-support/"],
    ["Color selector & samples", "https://www.trex.com/deck-ideas/colors/"],
  ],
  "belgard.com": [
    ["All Belgard products", "https://www.belgard.com/products/"],
    ["Patio pavers & slabs", "https://www.belgard.com/products/patios-paths/patio-pavers/"],
    ["Driveway pavers", "https://www.belgard.com/products/driveways/driveway-pavers/"],
    ["Permeable pavers", "https://www.belgard.com/products/patios-paths/permeable-patio-pavers/"],
    ["Outdoor porcelain pavers", "https://www.belgard.com/products/patios-paths/porcelain-pavers/"],
    ["Retaining wall systems", "https://www.belgard.com/products/wall-systems/retaining-walls/"],
    ["Caps, coping & edgers", "https://www.belgard.com/products/hardscape-accessories/paver-caps-coping-edgers/"],
    ["Outdoor kitchens & fire features", "https://www.belgard.com/outdoor-living/"],
    ["Installation, care & catalogs", "https://www.belgard.com/resources/"],
  ],
  "kohler.com": [
    ["Curated kitchen & bath collections", "https://www.kohler.com/en/products/kohler-collections"],
    ["Bathroom faucets", "https://www.kohler.com/en/products/bathroom-faucets"],
    ["Kitchen faucets", "https://www.kohler.com/en/products/kitchen-faucets"],
    ["Bathroom sets", "https://www.kohler.com/en/products/bathroom-sets"],
    ["Bathtubs & hydrotherapy", "https://www.kohler.com/en/products/bathtubs"],
    ["Showers, sinks, toilets & bidets", "https://www.kohler.com/en"],
    ["Care & replacement parts", "https://www.kohler.com/en/support/find-a-service-part"],
  ],
  "moen.com": [
    ["Moen kitchen products", "https://www.moen.com/kitchen/"],
    ["Moen bathroom products", "https://www.moen.com/bathroom/"],
    ["Faucets, showers & accessories", "https://www.moen.com/"],
    ["Smart water monitor & shutoff", "https://www.moen.com/flo"],
    ["Sinks, filtration & disposals", "https://www.moen.com/"],
    ["Identify a product or find parts", "https://www.moen.com/parts/"],
  ],
  "masterhalco.com": [
    ["Montage welded ornamental steel", "https://www.masterhalco.com/ornamental-steel/montage"],
    ["Highland steel ornamental fencing", "https://www.masterhalco.com/ornamental-steel/highland"],
    ["Remington steel ornamental fencing", "https://www.masterhalco.com/ornamental-steel/remington"],
    ["Montage Plus residential / light commercial", "https://www.masterhalco.com/ornamental-steel/montage"],
    ["Montage gates, accessories & drawings", "https://www.masterhalco.com/ornamental-steel/montage"],
    ["Ameristar warranty information", "https://www.masterhalco.com/warranty-info"],
  ],
  "daikincomfort.com": [
    ["Daikin FIT whole-home heat pumps", "https://daikincomfort.com/products/heating-cooling/whole-home-systems/heat-pumps"],
    ["Daikin FIT DZ6VS heat pump", "https://daikincomfort.com/products/heating-cooling/whole-home-systems/heat-pumps/daikin-fit-heat-pump-dz6vs"],
    ["Daikin FIT DH7VS cold-climate heat pump", "https://daikincomfort.com/products/heating-cooling/whole-home-systems/heat-pumps/daikin-fit-heat-pump-dh7vs"],
    ["Daikin One+ smart thermostat", "https://daikincomfort.com/products/thermostats-controls"],
    ["Daikin indoor air quality products", "https://daikincomfort.com/products/indoor-air-quality"],
    ["Daikin media gallery", "https://daikincomfort.com/about-daikin/news-media/media-gallery"],
  ],
  "carrier.com": [
    ["Carrier residential product catalog", "https://www.carrier.com/residential/en/us/products/"],
    ["Carrier Infinity 24 heat pump (25VNA4)", "https://www.carrier.com/residential/en/us/products/heat-pumps/25VNA4/"],
    ["Heat pumps", "https://www.carrier.com/residential/en/us/products/heat-pumps/"],
    ["Air conditioners", "https://www.carrier.com/residential/en/us/products/air-conditioners/"],
    ["Furnaces", "https://www.carrier.com/residential/en/us/products/gas-furnaces/"],
    ["Ductless systems", "https://www.carrier.com/residential/en/us/products/ductless-systems/"],
    ["Indoor air quality", "https://www.carrier.com/residential/en/us/products/indoor-air-quality/"],
    ["Thermostats & controls", "https://www.carrier.com/residential/en/us/products/thermostats/"],
    ["Product literature & manuals", "https://www.carrier.com/residential/en/us/homeowner-resources/product-literature/"],
  ],
  "schluter.com": [
    ["Shower systems", "https://www.schluter.com/schluter-us/en_US/Shower-System/c/SS"],
    ["KERDI waterproofing", "https://www.schluter.com/schluter-us/en_US/Membranes/Waterproofing-%28KERDI%29/c/P-W"],
    ["Drains & shower bases", "https://www.schluter.com/schluter-us/en_US/Shower-System/Drains/c/SS-D"],
    ["Profiles & movement joints", "https://www.schluter.com/schluter-us/en_US/Profiles/c/P"],
    ["Installation resources", "https://www.schluter.com/schluter-us/en_US/"],
  ],
  "deltafaucet.com": [
    ["Kitchen faucets", "https://www.deltafaucet.com/kitchen"],
    ["Bathroom faucets", "https://www.deltafaucet.com/bathroom"],
    ["Shower systems", "https://www.deltafaucet.com/bathroom/showering"],
    ["Toilets & accessories", "https://www.deltafaucet.com/bathroom"],
    ["Parts & support", "https://www.deltafaucet.com/service-parts"],
  ],
  "bradfordwhite.com": [
    ["Residential water heaters", "https://www.bradfordwhite.com/residential-products/"],
    ["Gas water heaters", "https://www.bradfordwhite.com/residential-products/"],
    ["Heat-pump water heaters", "https://www.bradfordwhite.com/residential-products/"],
    ["Product documents & support", "https://www.bradfordwhite.com/"],
  ],
  "lutron.com": [
    ["Residential lighting controls", "https://www.lutron.com/us/en/residential"],
    ["Caséta smart lighting", "https://www.casetawireless.com/us/en"],
    ["RadioRA 3", "https://www.lutron.com/us/en/residential-lighting-control/ra3"],
    ["Dimmers, switches & shades", "https://www.lutron.com/us/en/residential"],
  ],
  "enphase.com": [
    ["Home energy systems", "https://enphase.com/homeowners"],
    ["Microinverters", "https://enphase.com/installers/microinverters"],
    ["IQ Battery storage", "https://enphase.com/homeowners/home-solar-batteries"],
    ["Monitoring & app", "https://enphase.com/homeowners/enlighten"],
    ["Warranty resources", "https://enphase.com/warranty"],
  ],
};

const option = (
  brand: string,
  line: string,
  domain: string,
  history: string,
  why: string,
  warranty: string,
  officialUrl: string,
  imageUrl?: string,
  highlights?: string[],
): ProductOption => ({
  brand,
  line,
  domain,
  history,
  why,
  warranty,
  officialUrl,
  imageUrl,
  imageAlt: `${brand} manufacturer image illustrating ${line}`,
  productUrl: officialUrl,
  highlights,
  suiteLinks: SUITE_LINKS[domain]?.map(([label, url]) => ({ label, url })),
});

/**
 * Manufacturer and product-line choices shown to homeowners before a scope is
 * finalized. Availability, color, code approval, lead time, installer
 * requirements, and current warranty documents are confirmed for the address.
 */
export const PRODUCT_FAMILIES: Record<string, ProductFamily> = {
  roofing: {
    title: "Roofing system choices",
    intro: "A roof is a system: shingles or panels, underlayment, flashing, ventilation, ice and water protection, and the accessories that make the warranty meaningful.",
    options: [
      option("GAF", "Timberline HDZ shingles", "gaf.com", "Founded in 1886, GAF grew into one of North America's largest roofing-material manufacturers.", "A familiar contractor network, broad color range, and a complete system approach for common residential roofs.", "Limited manufacturer coverage varies by product; enhanced system coverage can depend on qualifying components, installer status, registration, and maintenance.", "https://www.gaf.com/en-us/roofing-materials/residential-roofing-materials/shingles/timberline-hdz", "https://product-assets.gaf.com/media/catalog/product/t/i/timberlinehdz_pewtergray_shingles-opt2.png?width=1200", ["Shingle color and profile", "Starter strip shingles", "Leak barrier / ice & water protection", "Roof deck protection", "Hip and ridge caps", "Ridge ventilation", "Drip edge & flashing details", "Attic ventilation components"]),
      option("Owens Corning", "TruDefinition Duration roofing system", "owenscorning.com", "Owens Corning began in 1938 and became a major building-materials company known for fiberglass and roofing systems.", "The laminated Duration shingles use the patented SureNail Technology fabric strip at the nailing zone; the family includes FLEX, STORM, COOL, and designer variants. Match color, shingle, starter, hip-and-ridge, underlayment, and ventilation to the roof design.", "Limited shingle and system warranties vary by line and installation; the current Owens Corning warranty controls coverage, exclusions, and transfer terms.", "https://www.owenscorning.com/en-us/roofing/shingles/trudefinition-duration", undefined, ["SureNail Technology nailing zone", "Duration, FLEX, STORM, COOL & Designer families", "Color gallery and visualizer", "Starter and hip-and-ridge shingles", "Underlayment, ice barrier & ventilation"]),
      option("CertainTeed", "Landmark roofing system", "certainteed.com", "CertainTeed traces its building-products history to 1904 and is part of Saint-Gobain's North American materials network.", "Compare Landmark, Landmark PRO, ClimateFlex, designer shingles, starters, hip-and-ridge finishes, leak barriers, deck protection, and ridge ventilation as a complete assembly.", "Limited warranty terms vary by product and system; upgraded coverage may require specified components and a credentialed installer.", "https://www.certainteed.com/products/residential-roofing", "https://certainteed.widen.net/content/df3n7ka70g/web/landmark-sol-birc-A01-homefree-dml.tif?crop=yes&k=c&w=1200&h=520&v=313cc46e-8898-4fe0-b754-7160d3a6e479&itok=6wlAdINQ", ["Landmark & Landmark PRO", "ClimateFlex and designer lines", "Starter shingles", "Hip & ridge cap", "Leak barrier and underlayment", "Ridge ventilation", "Siding, trim & insulation coordination"]),
      option("IKO", "Dynasty shingles", "iko.com", "IKO has manufactured roofing and building products for more than 60 years across North America and other markets.", "A high-definition shingle option with strong color variation and a system designed around wind and weather exposure.", "IKO limited warranty coverage depends on the exact product, installation, registration, and applicable jurisdiction.", "https://www.iko.com/na/product/dynasty/", "https://www.iko.com/na/wp-content/uploads/2024/04/RGB_2500_IKO_DYST_SHGL_HOME_GRBK_A_0577_Edit1-1.webp"),
      option("DuPont", "Tyvek Protec underlayments", "dupont.com", "DuPont introduced Tyvek in the 1960s and expanded the material into building-envelope and weatherization applications.", "A dedicated roof-underlayment choice that helps manage water and temporary exposure beneath the finished roof covering.", "Product-specific limited warranty; underlayment coverage is not the same as the shingle manufacturer's labor or system warranty.", "https://www.dupont.com/products/tyvek-roof-protector.html", "https://dupont.scene7.com/is/image/Dupont/tyvek-roof-protector-product-logo-image1"),
    ],
  },
  siding: {
    title: "Siding and exterior-envelope choices",
    intro: "The visible siding is only one layer. We compare profile, trim, moisture management, paint or color technology, maintenance, and the manufacturer's installation requirements.",
    options: [
      option("Alside", "Charter Oak and Ascend siding", "alside.com", "Alside has supplied residential siding, windows, doors, and accessories to the remodeling market for decades.", "A broad vinyl and composite-style selection with familiar profiles, trim packages, and regional availability.", "Limited product warranties vary by line, finish, color, and transfer; installation and maintenance requirements apply.", "https://www.alside.com/", "/images/products/imgi_5_Alside_CHO_Beauty5-1024x551.jpg", ["Charter Oak vinyl siding", "Ascend composite cladding", "Profiles, colors, and trim details", "Current manufacturer care and warranty information"]),
      option("James Hardie", "HardiePlank, HardiePanel, HardieShingle & trim", "jameshardie.com", "James Hardie began in Australia in the late 19th century and developed a large fiber-cement building-products business.", "The exterior suite spans lap, vertical panel, shingle, trim, and soffit components, with finish and climate guidance tied to region.", "Limited product and finish warranties vary by product and finish; correct installation, painting, and maintenance are essential.", "https://www.jameshardie.com/product-catalog/", "https://images.ctfassets.net/dzi2asncd44t/1MRmRjpjKa60BuCi9AKSi9/154190ebde2eae7d0edb8818006b3861/house-with-couple-hardie-plank-deep-ocean.jpg", ["HardiePlank lap siding", "HardiePanel vertical siding", "HardieShingle siding", "HardieTrim boards & battens", "HardieSoffit panels", "ColorPlus finish options", "Weather barrier & touch-up products"]),
      option("James Hardie", "HardiePlank lap siding", "jameshardie.com", "James Hardie is a manufacturer of fiber-cement siding and exterior building products.", "A specifically named lap-siding line; the correct product, finish, climate zone, trim, moisture management, and installation method should be confirmed for the address.", "Limited warranties and finish terms depend on product, finish, installation, and current manufacturer documents.", "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/", "https://images.ctfassets.net/dzi2asncd44t/1MRmRjpjKa60BuCi9AKSi9/154190ebde2eae7d0edb8818006b3861/house-with-couple-hardie-plank-deep-ocean.jpg", ["HardiePlank lap siding profiles", "Finish and color availability", "Trim, flashing, and weather barrier coordination", "Climate and installation requirements", "Current care and warranty documents"]),
      option("LP", "SmartSide engineered wood siding", "lpcorp.com", "LP Building Solutions has made engineered wood and structural building products for more than 50 years.", "A warm wood appearance with engineered treatment, practical trim options, and a lighter installation profile than some masonry products.", "Limited warranty terms vary by SmartSide product and finish; installation, clearance, and maintenance rules matter.", "https://www.lpcorp.com/products/siding-trim/lap-siding", "https://images.ctfassets.net/89s5b832f23c/tz7wntkoSdvNUHgExloPg/6946707c155a30a2f5847aa2442ecd62/LP_SmartSide_Home.jpg?fm=webp&q=75&w=1600&h=900"),
      option("CertainTeed", "Monogram and MainStreet vinyl siding", "certainteed.com", "CertainTeed's long building-products history includes one of the industry's broadest residential exterior catalogs.", "Many profile, color, and trim combinations for homeowners who want predictable maintenance and a coordinated exterior.", "Limited lifetime-style and finish warranties vary by product and homeowner status; review the current document before selection.", "https://www.certainteed.com/products/siding-products/monogram", "https://certainteed.widen.net/content/df3n7ka70g/web/landmark-sol-birc-A01-homefree-dml.tif?crop=yes&k=c&w=1200&h=520&v=313cc46e-8898-4fe0-b754-7160d3a6e479&itok=6wlAdINQ"),
      option("Westlake Royal", "Cedar Renditions and Celect", "westlakeroyalbuildingproducts.com", "Westlake Royal Building Products combines established North American exterior-product brands and manufacturing operations.", "Useful for modern panelized looks, trim coordination, and low-maintenance exterior design directions.", "Product-specific limited warranties apply; color, installation, and transfer provisions vary by line.", "https://www.westlakeroyalbuildingproducts.com/siding-and-accessories/cedar-renditions/gallery", "https://www.westlakeroyalbuildingproducts.com/sites/default/files/styles/large_16_9/public/canto/cedar-renditions_charwood_design-series_6in.jpg?itok=H9xnHoym"),
    ],
  },
  windows: {
    title: "Window choices",
    intro: "We compare frame material, glass, operation, opening condition, noise, ventilation, trim, and the warranty behind the exact unit—not just a sample in a showroom.",
    options: [
      option("Andersen", "400 Series casement window", "andersenwindows.com", "Andersen has produced windows and doors for more than a century; the 400 Series spans multiple window and patio-door configurations.", "A wood-interior, low-maintenance exterior product family with options in sizes, operation, finish, glass, grille pattern, screens, and hardware. The rough opening and existing wall condition determine the replacement approach.", "Limited manufacturer terms differ by product component, owner, installation, registration, and transfer; review the current document for the selected unit.", "https://www.andersenwindows.com/windows-and-doors/series/400-series", "https://edge.sitecorecloud.io/andersencor0d3d-andersencorae0f-prod102c-dc69/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/images/search-thumbnails/series/400-series-windows-and-doors-search-thumb-250x250.jpg?h=800&iar=0&w=1200", ["Casement, awning, double-hung & picture options", "Wood interiors and exterior finish choices", "Glazing, grille, screen & hardware choices", "Frame condition and installation method", "Product documentation and warranty review"]),
      option("Andersen", "100, 200, 400, A-Series, E-Series & Big Doors", "andersenwindows.com", "Andersen began in 1903 and became one of the best-known American window and door manufacturers.", "Series span composite, wood, architectural, custom-color, patio, and expansive moving-glass options; match product type and material to the opening and design.", "Limited warranties vary by series and component; glass, hardware, installation, and transfer terms are documented separately.", "https://www.andersenwindows.com/windows-and-doors/series", "https://edge.sitecorecloud.io/andersencor0d3d-andersencorae0f-prod102c-dc69/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/images/search-thumbnails/series/400-series-windows-and-doors-search-thumb-250x250.jpg?h=600&iar=0&w=900", ["100 Series Fibrex composite", "200 Series wood windows & patio doors", "400 Series windows & doors", "A-Series architectural collection", "E-Series custom sizes and colors", "Gliding & hinged patio doors", "Big Doors moving-glass systems", "Screens, grilles, hardware & trim"]),
      option("Pella", "250 Series and Impervia", "pella.com", "Pella has manufactured windows and doors since 1925 and maintains a large residential product range.", "Useful good/better/best choices for homeowners balancing price, frame material, sightlines, and performance.", "Limited warranties vary by product and component; installation, registration, and transfer terms must be reviewed for the selected unit.", "https://www.pella.com/ideas/windows/250-series/", "https://images.contentstack.io/v3/assets/bltf589e66bcaecd79c/blt0c0b1675f5e76dd3/6aa3252ee1500a0a22019b47/light-matrix-2-panel-square.png"),
      option("Marvin", "Essential and Elevate", "marvin.com", "Marvin is a family-owned window and door manufacturer with roots going back to 1912.", "Strong design control for architectural proportions, larger openings, and projects where interior and exterior finish matter equally.", "Limited manufacturer's warranties vary by collection and component; finish, glass, hardware, and installation coverage are not identical.", "https://www.marvin.com/products/collections/essential", "https://a-us.storyblok.com/f/1019562/1376x1101/97d1799738/marvin-essential-direct-glaze-window-double-hung-window-100-svarthus_2x.jpg"),
      option("JELD-WEN", "Premium Vinyl V-4500 windows", "jeld-wen.com", "JELD-WEN grew from a small Oregon millwork operation founded in 1960 into a North American window and door manufacturer.", "The V-4500 family includes double-hung, sliding, casement, picture, and specialty vinyl units. Compare opening style, glass package, grille configuration, color, and new-construction versus replacement installation for the specific opening.", "Warranty varies by product and component; JELD-WEN identifies limited-lifetime coverage for vinyl windows, subject to current warranty terms, exclusions, owner, and installation requirements.", "https://www.jeld-wen.com/en-us/products/windows/premium-vinyl-v-4500", undefined, ["Double-hung, sliding, casement & picture styles", "SunResist Low-E insulating glass options", "Grilles, finish and hardware configurations", "Opening measurements and egress review", "Current V-4500 documents and warranty terms"]),
      option("Milgard", "Tuscany V400 vinyl windows", "milgard.com", "Milgard began in 1962 and is known for residential windows and patio doors in Western and other U.S. markets.", "The Tuscany V400 range pairs a premium vinyl frame with SmartTouch hardware and SunCoat Low-E glass options; confirm operation, glazing, frame condition, and local dealer service for each opening.", "Milgard publishes a Full Lifetime Warranty for V400, subject to its current product, owner, installation, and transfer terms.", "https://www.milgard.com/windows/V400", "https://www.milgard.com/sites/default/files/styles/pt_image_slide_default_phone/public/2022-12/Series_Tuscany2.jpg.webp?itok=aldQkCJb", ["V400 Tuscany vinyl frame", "SmartTouch lock hardware", "SunCoat Low-E glazing options", "Picture, single-hung, double-hung, slider, casement & awning styles", "Local market, installation and warranty confirmation"]),
    ],
  },
  doors: {
    title: "Entry and patio door choices",
    intro: "Door selection combines security, weather sealing, glass, threshold, hardware, frame condition, and the finish the homeowner sees every day.",
    options: [
      option("Therma-Tru", "Fiber-Classic and Classic-Craft", "thermatru.com", "Therma-Tru helped establish fiberglass entry doors as a major residential category beginning in the 1960s.", "Strong entry-door design range, fiberglass options, decorative glass, and system components built around the opening.", "Limited product and finish warranties vary by collection, glass, and installation; exact terms are supplied with the door package.", "https://www.thermatru.com/explore-products/door-collections/classic-craft/", "https://images.salsify.com/image/upload/s--J4DlGBog--/h36ebd3x3feqkvu2t6ia.jpg"),
      option("ProVia", "Signet and Embarq doors", "provia.com", "ProVia has operated as an Ohio-based building-products manufacturer since 1977.", "A high-customization option for homeowners focused on door proportion, glass, hardware, and finish detail.", "Limited warranties vary by component and finish; installation and maintenance requirements apply.", "https://www.provia.com/doors/entry-doors/signet/", "https://embed.widencdn.net/img/masonite/cfpyufd0cd/exact/DR-VSG-926-140-1-FL-X-36-80_closed_frontal.webp?position=c&crop=no&color=ffffff00&quality=80&u=a98wgp"),
      option("Masonite", "VistaGrande and Legacy collections", "masonite.com", "Masonite has manufactured residential and architectural doors since the 1920s.", "Wide design availability for entry, patio, and interior door scopes at different budget levels.", "Limited product and finish warranties vary by line, glass, and owner; current documents control.", "https://www.masonite.com/doors/exterior/dr-ffg-926-fl-1-80/", "https://embed.widencdn.net/img/masonite/cfpyufd0cd/exact/DR-VSG-926-140-1-FL-X-36-80_closed_frontal.webp?position=c&crop=no&color=ffffff00&quality=80&u=a98wgp"),
      option("Andersen", "400 Series Frenchwood gliding patio door", "andersenwindows.com", "Andersen's century-plus history includes a deep catalog of patio, gliding, hinged, and multi-slide doors.", "Frenchwood pairs the traditional proportions of a French door with a space-saving gliding panel. Choose panel count, interior wood, exterior finish, glass, grille pattern, screen, and hardware to fit the opening and adjacent windows.", "Limited warranties vary by series and component; review current coverage for glass, hardware, finish, installation, owner, and transfer terms.", "https://www.andersenwindows.com/windows-and-doors/doors/sliding-patio-doors/400-series-frenchwood-gliding-patio-door", "https://edge.sitecorecloud.io/andersencor0d3d-andersencorae0f-prod102c-dc69/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/images/search-thumbnails/series/400-series-windows-and-doors-search-thumb-250x250.jpg?h=800&iar=0&w=1200", ["Space-saving gliding operation", "Frenchwood panel styling", "Wood interior and low-maintenance exterior", "Glass, grilles, screen and hardware choices", "Rough-opening and installation review"]),
      option("Andersen", "400 Series and E-Series windows & doors", "andersenwindows.com", "Andersen's century-plus history includes a deep catalog of patio, gliding, hinged, and multi-slide doors.", "A broad comparison for matching window materials and operation with gliding, hinged, or larger patio-door configurations.", "Limited warranties vary by series and component; installation and glass terms are separate considerations.", "https://www.andersenwindows.com/windows-and-doors/series", "https://edge.sitecorecloud.io/andersencor0d3d-andersencorae0f-prod102c-dc69/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/images/search-thumbnails/series/400-series-windows-and-doors-search-thumb-250x250.jpg?h=600&iar=0&w=900", ["400 Series windows and doors", "E-Series custom sizes and colors", "Gliding and hinged patio doors", "Wood, composite and finish options", "Glass, grille, screen and hardware selection"]),
    ],
  },
  gutters: {
    title: "Gutter and water-management choices",
    intro: "We select the gutter profile, gauge, outlet size, hangers, downspouts, extensions, and protection based on the roof and where water needs to go.",
    options: [
      option("Englert", "Aluminum gutter and coil systems", "englertinc.com", "Englert has supplied metal roofing and gutter materials to the building trade since the 1960s.", "A contractor-oriented coil and gutter system with many colors and fabrication options.", "Manufacturer finish and material warranties vary by coating and product; workmanship is separately scoped.", "https://www.englertinc.com/gutters/rainpro", "https://www.englertinc.com/sites/default/files/2021-02/series-56x-thumbnail.jpg"),
      option("Spectra", "Aluminum rainware, coils & gutter accessories", "spectraguttersystems.com", "Spectra Gutter Systems says it has manufactured and distributed aluminum rainware since 1978, with a North American network of supply locations.", "A contractor-oriented catalog of pre-painted aluminum and copper coil for seamless fabrication, K-style and half-round components, downpipe, outlets, elbows, hangers, and LeafSeries guards. Confirm profile, gauge, coating, and color against roof area and runoff.", "Material and finish coverage varies by specific product and coating; confirm current written terms and local availability. Installed drainage performance also depends on sizing, outlet placement, slope, and discharge routing.", "https://www.spectraguttersystems.com/catalog", undefined, ["Seamless aluminum and copper gutter coil", "K-style and half-round profiles", "Downpipe, elbows, outlets & miters", "Hidden hangers and support brackets", "LeafSeries guard options", "50+ color references; confirm stock locally"]),
      option("LeafFilter", "Gutter protection system", "leaffilter.com", "LeafFilter built its business around a micromesh gutter-protection system and national installation network.", "An option for homeowners prioritizing reduced cleaning frequency where roof and tree conditions support it.", "Protection-system warranties and service terms are separate from the gutter itself; exclusions and maintenance requirements apply.", "https://www.leaffilter.com/why-leaffilter/leaffilter/", "https://www.leaffilter.com/app/uploads/image-card-block/2026/04/versa-water-2026-1-2.webp"),
    ],
  },
  paint: {
    title: "Paint and coating choices",
    intro: "The product matters, but prep, substrate repair, primer, sheen, weather window, and application method determine whether the finish earns its warranty.",
    options: [
      option("Sherwin-Williams", "Duration and Emerald", "sherwin-williams.com", "Sherwin-Williams has manufactured coatings since 1866 and remains one of the largest architectural paint companies.", "Broad color support, contractor availability, and exterior lines designed for different exposure and finish goals.", "Limited product warranties vary by coating and substrate; they generally require proper preparation and application.", "https://www.sherwin-williams.com/homeowners/products/duration-exterior-acrylic-latex", "https://sherwin.scene7.com/is/image/sw/paint_template-1?layer=comp&wid=700&fmt=jpeg&qlt=92%2c0&op_sharpen=0&resMode=sharp2&op_usm=0.0%2c0.0%2c0%2c0&iccEmbed=0&printRes=150&_tparam_layer_1_src=sw/650405814-Duration-Exterior-Acrylic-Latex-Satin-Super-White-5-Gallon"),
      option("Benjamin Moore", "Aura and Regal Select", "benjaminmoore.com", "Benjamin Moore was founded in 1883 and built a reputation around architectural color and coatings.", "Strong color system, premium finish options, and reliable interior and exterior product tiers.", "Limited warranty coverage varies by product and application; substrate, preparation, and maintenance exclusions apply.", "https://www.benjaminmoore.com/en-us/interior-exterior-paints-stains/aura-exterior-paint", "https://www.benjaminmoore.com/-/media/sites/benjaminmoore/images/paint-and-stain/aura-exterior/four-gallons-aura-exterior-paint-hero_1400x807.jpg"),
      option("PPG", "Permanizer and Timeless", "ppgpaints.com", "PPG has made coatings since 1883 and supplies architectural, industrial, and protective paint systems.", "A practical option where contractor distribution, durable exterior coatings, and color availability matter.", "Product-specific limited warranty terms vary; current PPG documentation controls.", "https://www.ppgpaints.com/products", "https://cdne-laika-common-eastus2-001-ade3d6gug5haemby.a02.azurefd.net/assets/front/78ccfa3b-dc5e-494a-b834-64e1deec4e11/large_600x600/78ccfa3b-dc5e-494a-b834-64e1deec4e11_large_600.png"),
    ],
  },
  decks: {
    title: "Decking and porch choices",
    intro: "We compare structure, decking, railing, fasteners, stair components, heat, slip, maintenance, and the warranty behind the surface.",
    options: [
      option("Trex", "Trex outdoor living · decking and railing system", "trex.com", "Trex developed composite decking and has expanded into a broader outdoor-living product portfolio.", "Product tiers pair deck boards with fascia, railing, lighting, drainage, cladding, fasteners, pergolas and furnishings. Compare board profile, color, exposure, structure, stair details and codes—not just the surface board.", "Limited warranties vary by collection, use, registration, installation, and care; verify the current product-specific terms.", "https://www.trex.com/products/decking/", "https://images.trex.com/is/image/trexcompany/enh-azdeck-06-rh-sel-railing-wt-fascia-steps-adirondacks?wid=1200&fmt=webp", ["Enhance, Select, Transcend, Transcend Lineage & Signature", "Deck boards, fascia & cladding", "Composite, aluminum, cable, glass & steel railing", "Stair treads, post caps & lighting", "Drainage and under-deck space", "Fasteners, plugs, screws & accessories", "Pergolas, outdoor kitchens & furniture"]),
      option("Trex", "Full outdoor-living suite", "trex.com", "Trex helped popularize recycled-composite decking in the 1990s and remains a major outdoor-living manufacturer.", "Six deck-board tiers plus coordinated rails, lighting, drainage, cladding, fascia, fencing, fasteners, furniture, kitchens, pergolas, lattice, spiral stairs, and other outdoor-living details.", "Limited residential warranties vary by collection and use; cleaning, installation, and transfer terms apply.", "https://www.trex.com/products/", "https://images.trex.com/is/image/trexcompany/enh-azdeck-06-rh-sel-railing-wt-fascia-steps-adirondacks?wid=1400&fmt=webp", ["Signature, Transcend Lineage, Transcend, Select & Enhance decking", "Refuge PVC decking", "Composite, aluminum, cable, glass, mesh & steel railing", "Deck rail, post-cap & stair lighting", "Deck drainage & under-deck dry space", "Cladding, fascia & lattice", "Hidden fasteners, plugs, screws & tools", "Fencing and spiral stairs", "Pergolas, outdoor kitchens & furniture"]),
      option("TimberTech", "Terrain, Reserve, and Legacy", "timbertech.com", "TimberTech grew from composite-decking technology and is now part of the AZEK outdoor-living portfolio.", "Useful good/better/best paths with natural visual texture and coordinated deck, trim, and railing products.", "Limited product warranties vary by collection; exact coverage depends on installation, use, and registration.", "https://www.timbertech.com/products/decking/", "https://shop.timbertech.com/wp-content/uploads/2024/03/TimberTech-Order-Samples-Detail-Swatch-Antique-Leather.jpg"),
      option("Fiberon", "Good Life and Paramount", "fiberondecking.com", "Fiberon has developed composite and PVC decking products for residential outdoor living for more than two decades.", "A practical choice for balancing color, price, low maintenance, and board profile.", "Limited warranties vary by product line and application; installation and care requirements apply.", "https://www.fiberondecking.com/products/good-life-decking", "https://www.fiberondecking.com/cdn/shop/files/zykwl83yoz7ifk65bhil.jpg?v=1701812955"),
      option("Deckorators", "Voyage and mineral-based decking", "deckorators.com", "Deckorators has built a broad outdoor-living catalog of decking, railing, and accessories.", "Mineral-based and composite options help when weight, moisture, and low-maintenance performance matter.", "Limited product warranties vary by line and use; follow the current installation guide.", "https://www.deckorators.com/products/voyage-decking", "https://www.deckorators.com/cdn/shop/files/deckorators-voyage-decking-sierra-urban-backyard.jpg?v=1775069391"),
    ],
  },
  fencing: {
    title: "Fence and gate choices",
    intro: "A fence is selected for privacy, pets, wind, maintenance, gate hardware, property lines, and how the finished line meets the home and landscape.",
    options: [
      option("Bufftech / Catalyst", "Chesterfield & Newbury vinyl privacy", "certainteed.com", "Bufftech is a long-running fence brand now shown within Barrette Outdoor Living's Catalyst fence portfolio.", "Compare molded and extruded privacy profiles, colors, wood-grain looks, posts, rails, caps, and compatible gates; model naming and stock vary by location.", "Current product and finish warranty documents vary by collection and installation; confirm the exact line and warranty at order.", "https://www.barretteoutdoorliving.com/product/solid-privacy-fencing-vinyl-fence-panels", "https://www.catalystfence.com/wp-content/uploads/BOL_WI_July2024_RES_BuffChesterfieldArtic_003-380x253.webp", ["Chesterfield privacy", "Newbury vertical privacy", "CertaGrain molded texture options", "Color and profile selection", "Posts, rails, caps & mounting hardware", "Matching walk and drive gates", "Installation guide and warranty documents"]),
      option("Trex", "Seclusions · vertical board-on-board privacy", "trex.com", "Trex expanded its composite outdoor-living platform beyond decking into purpose-designed fence systems.", "An interlocking privacy layout with coordinated rails, posts, caps, pickets, covers, and compatible gate components.", "Trex lists a 25-year Residential Limited Warranty for fencing; terms, exclusions, maintenance and color weathering details apply. Confirm the current document.", "https://www.trex.com/products/fencing/", "https://images.trex.com/is/image/trexcompany/fnc-seclusions-backyard-004-wb-perimeter:Article-Image-Main?wid=1200&fmt=webp", ["Seclusions board-on-board privacy", "Saddle, Winchester Grey, Woodland Brown & Charcoal Black color references", "Top rail & aluminum reinforced bottom rail", "Interlocking pickets / bottom-rail covers", "Fence posts, brackets & post caps", "Matching gate kits and hardware", "Color weathering and care guidance"]),
      option("Trex", "Horizons · horizontal framed privacy", "trex.com", "Horizons is Trex's horizontal-design fence collection within its composite fence system.", "Horizontal boards with a contemporary frame appearance; review the full panel-kit configuration, frame parts, color, grade and gate details.", "Trex lists a 25-year Residential Limited Warranty for fencing; current product-specific terms and exclusions control.", "https://www.trex.com/products/fencing/", "https://images.trex.com/is/image/trexcompany/fnc-horizons-backyard-005-contemporary-wg-artistry:Product-Profile?wid=1200&fmt=webp", ["Horizontal fence layout", "Saddle, Winchester Grey & Woodland Brown colors", "Frame kit, rails and pickets", "Posts, brackets and end conditions", "Gate compatibility", "Color weathering and care guidance"]),
      option("Trex", "Solitudes · horizontal composite fence", "trex.com", "Solitudes is another horizontal Trex fence design, with composite rails framing the panel.", "Compare horizontal composition and a continuous composite top-and-bottom rail against privacy and site needs.", "Trex lists a 25-year Residential Limited Warranty for fencing; confirm current collection-specific limitations before purchase.", "https://www.trex.com/products/fencing/", "https://images.trex.com/is/image/trexcompany/fnc-seclusions-sd-hot-tub-pool:Article-Image-Main?wid=1200&fmt=webp", ["Horizontal design direction", "Top and bottom composite rails", "Pickets and compatible fence posts", "Coordinated gates and hardware", "Color and site-layout review"]),
      option("Trex", "Rail Fence · open horizontal layout", "trex.com", "Trex includes a rail-style fence in its composite fencing collection for a more open boundary treatment.", "An open design alternative to full privacy; compare post spacing, rails, terrain transitions, and the boundary's intended use.", "Review current product coverage, installation instructions, finish and maintenance provisions for the chosen system.", "https://www.trex.com/products/fencing/", "https://images.trex.com/is/image/trexcompany/Trex-Rail-Fencing-Woodland-Brown:Article-Image-Main?wid=1200&fmt=webp", ["Open horizontal rail design", "Posts and rail components", "Woodland Brown product reference", "Slope, boundaries and gate planning"]),
      option("Bufftech / Catalyst", "CertaGrain · Cypress textured vinyl fence", "certainteed.com", "Bufftech fencing products are available through the Catalyst fence portfolio.", "A textured vinyl privacy option; verify the exact profile, color, gate components, and regional stock before specifying.", "Confirm current product and finish warranty documents, installation requirements, and maintenance guidance for the selected system.", "https://www.barretteoutdoorliving.com/product/solid-privacy-fencing-vinyl-fence-panels", "https://www.catalystfence.com/wp-content/uploads/DogwoodHaven_6x8_Cypress_21-380x254.webp", ["CertaGrain wood-grain appearance", "Cypress color reference", "Privacy panels and coordinating posts", "Gate and hardware compatibility", "Current regional availability and warranty"]),
      option("Trex", "Seclusions · composite privacy fence", "trex.com", "Trex's Seclusions is a named composite privacy-fence system within its outdoor-living products.", "Compare board-on-board panel construction with coordinated rails, posts, caps, and gates; confirm color and site conditions for the installed system.", "Review current product-specific warranty, installation instructions, color weathering, and care guidance before purchase.", "https://www.trex.com/products/fencing/", "https://images.trex.com/is/image/trexcompany/fnc-seclusions-sd-hot-tub-pool:Article-Image-Main?wid=1200&fmt=webp", ["Seclusions privacy-fence system", "Panel, rail, post, cap, and gate components", "Color and site-layout selection", "Grade and wind exposure review", "Current care and warranty guidance"]),
      option("Master Halco / Ameristar", "Montage · welded ornamental steel", "masterhalco.com", "Master Halco distributes Ameristar ornamental steel systems, including residential Montage families.", "A welded steel panel family with rackability over grade, different picket spacing, post and gate options, and coating choices.", "The manufacturer page identifies limited-lifetime terms for Montage and different terms for Montage Plus; confirm model, finish, and current written warranty.", "https://www.masterhalco.com/ornamental-steel/montage", "https://www.masterhalco.com/hubfs/Master%20Halco%202021/Ornamental%20Steel%20New/Montage/163584552115.jpg", ["Montage residential", "Montage Plus heavier residential/light commercial", "Montage Commercial & Montage II system families", "Welded steel panels and rackability", "Picket spacing for pool, pet or boundary needs", "Posts, hinges, latches and compatible gates", "Black and bronze finish references; current colors vary"]),
      option("Master Halco / Ameristar", "Highland · steel ornamental fencing", "masterhalco.com", "Master Halco's outdoor catalog includes ornamental steel fence systems alongside Ameristar families.", "Compare picket spacing, rails, posts, welds, and gate options for the property's intended boundary.", "Product and finish coverage varies by product family; verify current manufacturer documentation and installation details.", "https://www.masterhalco.com/ornamental-steel/highland", "https://www.masterhalco.com/hubfs/Master%20Halco%202021/Ornamental%20Steel%20New/Highland/163584613810.png", ["Steel ornamental styles", "Picket and rail profiles", "Posts, brackets and gate hardware", "Finish and site-condition review"]),
    ],
  },
  hardscape: {
    title: "Paver, concrete, and masonry choices",
    intro: "We compare base preparation, drainage, paver or slab material, edge restraint, joints, sealers, and the freeze-thaw demands of the site.",
    options: [
      option("Belgard", "Melville slab, pavers & Tandem wall system", "belgard.com", "Belgard is a North American hardscape manufacturer with product lines across pavers, slabs, walls and outdoor-living features.", "Coordinate the walking surface with driveway loads, edge restraints, steps, coping, drainage, wall blocks and outdoor-living details. The base and site grade are as important as the visible paver.", "Warranty coverage varies by product category, installation system, market and use; review the current product terms and local technical guidance.", "https://www.belgard.com/products/", "https://www.belgard.com/wp-content/uploads/sites/2/NFD_W_MN_BEL_RES_SEPT2019_MelvilleSlab_AgilinaPaver_MelvilleTandemWall_001_preview-768x657.jpg", ["Patio and path pavers & slabs", "Driveway pavers and load requirements", "Permeable pavers and grid systems", "Retaining walls, caps & coping", "Porcelain pavers", "Steps, edging and transitions", "Outdoor kitchens, fireplaces & fire features", "Base, drainage, joints and site grading"]),
      option("Belgard", "Complete hardscape & outdoor-living catalog", "belgard.com", "Belgard has become a major North American hardscape brand for residential pavers, walls, and outdoor-living products.", "Design a coordinated outdoor scope from pavers and slabs through walls, porcelain, caps, coping, steps, kitchens, and fire features.", "Product warranties vary by category and installation; base, drainage, jointing, and maintenance are essential to performance.", "https://www.belgard.com/products/", undefined, ["Patio and walkway pavers & slabs", "Driveway pavers", "Permeable pavers and grid systems", "Outdoor porcelain pavers", "Retaining and freestanding wall systems", "Steps, caps, coping & edgers", "Outdoor kitchens and fire features", "Drainage and base-system coordination"]),
      option("Unilock", "Pavers and outdoor-living systems", "unilock.com", "Unilock has manufactured concrete paving products in North America since the 1970s.", "Strong pattern, color, and edge-detail options for design-forward patios and walks.", "Limited product warranties vary by product and installation; movement, base, drainage, and maintenance exclusions apply.", "https://www.unilock.com/product/beacon-hill-smooth-chicago/", "https://unilock.com/wp-content/uploads/2024/05/bhs_on_rocvale_infinitypool-scaled-1300x624.jpg"),
      option("Cambridge", "Pavingstones and wall systems", "cambridgepavers.com", "Cambridge Pavers has supplied concrete paving and wall products to the residential market for decades.", "Useful for traditional and contemporary patterns with coordinated borders and wall components.", "Limited product warranties vary by line; installation workmanship, base, and drainage are separately controlled.", "https://www.cambridgepavers.com/products", "https://www.cambridgepavers.com/graphics/intro_products_pss_sm.jpg"),
      option("QUIKRETE", "Concrete and repair systems", "quikrete.com", "QUIKRETE has supplied packaged concrete and repair products to homeowners and contractors since 1940.", "Widely available mixes, repair products, and setting materials for concrete, masonry, and small hardscape scopes.", "Product-specific limited warranties vary; surface preparation, mix, cure, and site conditions control results.", "https://www.quikrete.com/productlines/concretemix.asp", "https://www.quikrete.com/images/Products/concrete-mix-110180-80lb.png"),
    ],
  },
  cabinetry: {
    title: "Cabinet and kitchen choices",
    intro: "Cabinet choice affects layout, storage, finish, lead time, hardware, serviceability, and the cost of every counter and appliance decision around it.",
    options: [
      option("KraftMaid", "Semi-custom cabinetry", "kraftmaid.com", "KraftMaid has supplied residential cabinetry since the late 1960s and is widely distributed through remodeling channels.", "A broad semi-custom range for homeowners who want more sizing and finish control than stock cabinets.", "Limited cabinet warranties vary by construction and finish; hardware, installation, humidity, and care terms apply.", "https://www.kraftmaid.com/inspire/gallery/", "https://cdn11.bigcommerce.com/s-r7ihvq/images/stencil/996x666/products/86995/164346/KM_V_Hallett_2026_Set023_RS01__44006.1779268414.jpg?c=3"),
      option("Fabuwood", "Allure · Galaxy Shaker cabinetry", "fabuwood.com", "Fabuwood is a U.S. cabinetry company founded in 2009; its current catalog spans Allure, Illume, and Ovela series.", "Galaxy is a Shaker-inspired family with painted and wood-look finish choices, including Frost, Linen, Dove, and Timber options. Compare door profile, overlay, finish sample, interior accessories, and cabinet dimensions against the kitchen plan; colors should be judged from a physical sample in the room.", "Fabuwood's current warranty is product- and component-specific; verify the written cabinet, finish, hardware, care, and installation terms for the selected order.", "https://www.fabuwood.com/doorstyles/galaxy/frost", undefined, ["Galaxy Shaker-inspired door family", "Frost, Linen, Dove and wood-look finishes", "Allure framed cabinetry series", "Cabinet sizes, panels, moldings & accessories", "Order physical finish samples and confirm dealer availability"]),
      option("Wellborn", "Framed and frameless cabinetry", "wellborn.com", "Wellborn Cabinet is an Alabama cabinetry manufacturer with product lines for kitchens, baths, laundry, and other rooms.", "The catalog includes framed and full-access frameless options, varied door styles and finishes, plus storage customizations. Use the room gallery to compare real kitchen layouts, then confirm series, construction, finish sample, interior accessories, and dealer lead time in the written design.", "Warranty coverage depends on cabinet line, finish, hardware, owner, installation, and care; use the current Wellborn warranty document for the selected collection.", "https://www.wellborn.com/be-inspired/kitchen-cabinet-room-gallery/", undefined, ["Framed and frameless lines", "Kitchen, bath, laundry and living-space cabinetry", "Door styles, wood species, colors & finishes", "Organization and storage customizations", "Room gallery, samples and authorized dealer review"]),
      option("Omega", "Custom and semi-custom cabinetry", "omegacabinetry.com", "Omega Cabinetry has specialized in residential cabinetry for more than 40 years.", "A design-led option when inset details, unusual dimensions, and finish control matter.", "Limited warranties vary by collection and component; finish and installation care are important.", "https://www.omegacabinetry.com/", "https://www.omegacabinetry.com/file/media/omegacab/pages/homepage/larochmwicsmkihk5homepageimage.jpg?h=720&w=1200"),
    ],
  },
  countertops: {
    title: "Countertop choices",
    intro: "We compare slab composition, edge profile, seam placement, heat and stain behavior, maintenance, sink integration, and the room's lighting.",
    options: [
      option("Cambria", "Quartz surfaces", "cambriausa.com", "Cambria is a U.S.-based family-owned quartz-surface manufacturer founded in 2000.", "Strong design collection, low routine maintenance, and a premium finish for kitchens and baths.", "Limited residential warranty terms vary; the current Cambria warranty controls care, installation, and exclusions.", "https://www.cambriausa.com/quartz-countertops", "https://cambriausa.scene7.com/is/image/cambriacompanyllc/everleigh-kitchen-dodd-001-22:Large-16x9?dpr=off"),
      option("Caesarstone", "Quartz surfaces", "caesarstoneus.com", "Caesarstone helped establish engineered quartz surfaces as a global residential category in the 1980s.", "Wide color and texture range with a familiar fabrication and design ecosystem.", "Limited warranty varies by product, owner, installation, and care; review the current terms before selection.", "https://www.caesarstoneus.com/quartz-countertops/", "https://www.caesarstoneus.com/wp-content/uploads/2020/12/Modern-kitchen-with-Island-in-Caesarstone-5031-Statuario-Maximus-2026-768x428.jpg"),
      option("MSI", "Q Premium Natural Quartz", "msisurfaces.com", "MSI has supplied flooring, countertop, tile, and hardscape products to the U.S. market for decades.", "Broad availability, many price points, and a large catalog for coordinating multiple rooms.", "Limited warranty varies by surface and use; fabrication, installation, seams, and maintenance provisions apply.", "https://www.msisurfaces.com/quartz-countertops/", "https://cdn.msisurfaces.com/images/quartz-countertops/qsite/what-are-q-quartz-countertops.jpg"),
      option("Silestone", "Quartz surfaces", "cosentino.com", "Cosentino is a Spanish family business founded in 1979 and known for engineered and natural surfaces.", "Useful for integrated kitchen and bath design where color, slab scale, and surface continuity matter.", "Limited warranty varies by product and registration; care and installer requirements apply.", "https://www.cosentino.com/usa/silestone/", "https://www.cosentino.com/wp-content/uploads/2023/03/Silestone-Topshot-Kitchen.jpg"),
    ],
  },
  baths: {
    title: "Bathroom, tile, and waterproofing choices",
    intro: "A beautiful bathroom begins behind the tile. We compare waterproofing, tile, fixtures, ventilation, glass, accessibility, and the manufacturer's installation system.",
    options: [
      option("Kohler", "Complete kitchen & bath collections", "kohler.com", "Kohler was founded in 1873 and has grown from plumbing fixtures into a global kitchen, bath, and design company.", "Collections coordinate faucets, sinks, toilets, bidets, showers, tubs, accessories, vanities, and smart products for a consistent room design.", "Limited warranties vary by product and finish; registration, installation, water conditions, and care apply.", "https://www.kohler.com/en/products/kitchen-faucets", "https://s7d1.scene7.com/is/image/kohlergbhcloudprod/Curated-PLP-3-4-aag94956_rgb", ["Bathroom faucet collections", "Kitchen faucets & sinks", "Toilets, smart toilets & bidets", "Showers, valves & showering systems", "Bathtubs & hydrotherapy", "Bathroom sets & accessories", "Vanities and storage", "Replacement parts and service"]),
      option("Delta", "Trinsic single-handle pull-down kitchen faucet", "deltafaucet.com", "Delta Faucet began in 1954 and became known for residential faucet and shower innovation.", "The Trinsic 9159-DST is a specific single-handle pull-down faucet family; compare finish, spray functions, installation-hole layout, deck thickness, and optional Touch2O model number. Confirm the exact SKU and included accessories on the product page.", "Delta's limited lifetime faucet warranty and coverage for electronic components can differ; review current product warranty and care documents for the selected model.", "https://www.deltafaucet.com/kitchen/product/9159-DST-CDN.html", "https://www.deltafaucet.com/sites/delta/files/2019-12/Pull-Down_1.jpg", ["Trinsic 9159-DST model family", "Pull-down spray wand and finish choices", "Single-hole or optional escutcheon installation", "Optional Touch2O model is a separate SKU", "Parts identification and current warranty"]),
      option("Schluter", "KERDI bonded waterproofing shower system", "schluter.com", "Schluter-Systems grew from European tile-installation products into a major waterproofing and transition-system manufacturer.", "KERDI membranes, bonded-flange drains, prefabricated sloped trays, curbs, benches, niches, and seals are designed as a coordinated tiled-shower assembly. The manufacturer describes the system as fully bonded and watertight; follow its current handbook and use the specified components throughout transitions and penetrations.", "Limited system warranty eligibility depends on the selected system components and installation following Schluter's current handbook. Tile, plumbing labor, and workmanship coverage remain separate.", "https://www.schluter.com/schluter-us/en_US/Shower-System/c/SS", "https://www.schluter.com/schluter-us/en_US/kerdi-shower-kit-installation-instructions", ["KERDI and KERDI-DS sheet membranes", "KERDI-DRAIN point drains and KERDI-LINE linear drains", "Prefabricated sloped trays, ramps & curbs", "Niches, benches, corners and pipe seals", "Shower-system estimator, handbook and installation guide"]),
      option("Wedi", "Fundo waterproof shower system", "wedi.net", "wedi developed waterproof building boards and prefabricated shower components in Germany and supplies integrated shower systems.", "The Fundo range includes factory-sloped shower elements for point or linear drainage, with coordinated drains, building boards, sealing products, and accessories. The manufacturer describes the elements as waterproof, directly tileable, and adaptable to different installation situations; confirm the U.S.-market system and substrate details before specification.", "System coverage is governed by the current regional wedi guarantee, complete-system requirements, and installation instructions; confirm eligibility and terms for the exact assembly.", "https://www.wedi.net/en/products/flush-to-floor-showers", "https://www.wedi.net/en/products/flush-to-floor-showers/fundo-shower-element-with-point-drainage/fundo-primo", ["Fundo Primo point-drain shower elements", "Linear drainage and channel options", "Factory-formed slope and tile-ready surface", "Building boards, seals, drains and system accessories", "Configurator and installation-specific component list"]),
      option("Daltile", "Ceramic and porcelain tile", "daltile.com", "Daltile has produced tile in the United States since 1947.", "Large domestic catalog, dependable distribution, and options for floors, walls, showers, and backsplashes.", "Limited product warranties vary by tile and use; substrate, setting materials, grout, and installation remain critical.", "https://www.daltile.com/tile-product-category", "https://s7d9.scene7.com/is/image/daltile/DAL_JilaniPlace_Statuario_CM03_COM_02?$PRODUCTIMAGE$"),
    ],
  },
  flooring: {
    title: "Flooring choices",
    intro: "We compare wear layer, moisture behavior, repairability, acoustics, transitions, subfloor prep, and the finish that fits the household.",
    options: [
      option("Shaw", "Floorté, hardwood, carpet, and tile", "shawfloors.com", "Shaw has manufactured flooring since 1946 and is one of the largest flooring companies in North America.", "A broad catalog that lets homeowners coordinate multiple rooms and budgets.", "Limited product warranties vary by category, wear layer, owner, and use; installation and moisture requirements apply.", "https://shawfloors.com/", "https://shawfloors.widen.net/content/5fkhfe5j6m/jpeg/crt02_01039_main?w=1200&fmt=jpeg&quality=85&keep=c&crop=true"),
      option("Mohawk", "RevWood, SolidTech, and carpet", "mohawkflooring.com", "Mohawk's flooring history reaches back to 1878 and spans carpet, hard surface, and resilient flooring.", "Strong range of practical family-home surfaces and coordinated collections.", "Limited warranties vary by product and use; moisture, subfloor, and installation conditions apply.", "https://www.mohawkflooring.com/", "https://shawfloors.widen.net/content/5fkhfe5j6m/jpeg/crt02_01039_main?w=1200&fmt=jpeg&quality=85&keep=c&crop=true"),
      option("COREtec", "Luxury vinyl plank and tile", "coretecfloors.com", "COREtec helped popularize rigid-core luxury vinyl flooring as part of the USFloors and Shaw ecosystem.", "Water-resistant construction, realistic visuals, and useful replacement flexibility for busy homes.", "Limited warranties vary by collection, wear layer, and residential use; acclimation and installation rules apply.", "https://coretecfloors.com/en-us/products", "https://shawfloors.widen.net/content/5fkhfe5j6m/jpeg/crt02_01039_main?w=1200&fmt=jpeg&quality=85&keep=c&crop=true"),
      option("Mannington", "Adura and residential flooring", "mannington.com", "Mannington has made residential flooring in the United States since 1915.", "A long-established manufacturer with resilient, laminate, hardwood, and design-focused options.", "Limited warranties vary by collection and use; care, subfloor, and installation provisions apply.", "https://www.mannington.com/residential/adura-luxury-vinyl", "https://images.ctfassets.net/r69d9lchftro/1YLLOrdh3WN8oe88RMDzHg/0f6b9ad1942fd21a0905a205c4db8358/Napa_Tannin_dog_hero_1920x1066.jpg"),
    ],
  },
  hvac: {
    title: "Heating and cooling choices",
    intro: "Compare the actual equipment families—outdoor heat pump or AC, indoor air handler or furnace, coil, thermostat, filtration, and controls. Final model and matched system depend on a load calculation, duct inspection, electrical capacity, climate, and local availability.",
    options: [
      option("Daikin", "FIT DZ6VS inverter heat pump system", "daikincomfort.com", "Daikin publishes a dedicated product page, specifications, installation literature, compatible equipment, and warranty documents for the FIT DZ6VS.", "A specific compact, side-discharge, ducted heat-pump option. The final matched indoor unit, capacity, refrigerant generation, electrical requirements, controls, and eligibility must be verified against the home's load and current Daikin documentation—not selected by brand name alone.", "The manufacturer lists limited parts and unit-replacement coverage subject to model, registration timing, location, installation, annual-maintenance requirements, and other terms. Labor coverage is separate; check the current warranty certificate before purchase.", "https://daikincomfort.com/products/heating-cooling/whole-home-systems/heat-pumps/daikin-fit-heat-pump-dz6vs", undefined, ["Daikin FIT DZ6VS outdoor inverter heat pump", "Matched indoor air handler or compatible furnace and coil", "Daikin One+ communicating thermostat and controls", "Daikin One air cleaner and compatible IAQ products", "Capacity and AHRI match selection", "Electrical, condensate, pad/stand, and permit scope", "Model-specific specifications, installation manual, and warranty certificate"]),
      option("Daikin", "FIT DH7VS cold-climate heat pump system", "daikincomfort.com", "Daikin's DH7VS product page identifies the FIT as a communicating, inverter-driven ducted heat pump and publishes product features, efficiency data, compatible products, and documents.", "A different named FIT system for comparison when cold-climate heating characteristics matter. Verify the exact current model, indoor/outdoor match, climate performance, controls, and electrical scope with a qualified HVAC professional.", "Coverage is limited and model-specific. Registration, annual maintenance, state rules, exclusions, and separate contractor labor terms can change the protection; confirm them in writing.", "https://daikincomfort.com/products/heating-cooling/whole-home-systems/heat-pumps/daikin-fit-heat-pump-dh7vs", undefined, ["Daikin FIT DH7VS outdoor heat pump", "Compatible indoor air handler or furnace/coil combinations", "Daikin One+ thermostat and two-way communication", "Cold-climate and ENERGY STAR model documentation", "AHRI matched system and load calculation", "Electrical, drain safety, permit, startup, and commissioning", "Current model literature and limited warranty certificate"]),
      option("Carrier", "Infinity 24 variable-speed heat pump · 25VNA4", "carrier.com",  "Carrier was founded in 1915 by Willis Carrier, widely credited with modern air conditioning.", "Compare air conditioners, heat pumps, furnaces, fan coils, thermostats, air purification, humidification, and system controls as a matched comfort solution.", "Limited parts and compressor warranties vary by model, registration, and installer; labor coverage is separate.", "https://www.carrier.com/residential/en/us/products/heat-pumps/25VNA4/", "https://images.carriercms.com/image/upload/v1683828998/carrier/residential-hvac/products/heat-pumps/infinity-24-heat-pump-with-greenspeed-intelligence-25VNA4.png", ["Infinity 24 25VNA4 variable-speed heat pump", "Infinity, Performance & Comfort equipment tiers", "Air conditioners and heat pumps", "Gas and oil furnaces", "Fan coils, evaporator coils & air handlers", "Ductless systems", "Thermostats and system controls", "Air purifiers, humidifiers & dehumidifiers", "Ventilation and indoor-air accessories"]),
      option("Trane", "XV and XR systems", "trane.com", "Trane's mechanical-engineering history dates to the 19th century and it remains a major HVAC manufacturer.", "A wide lineup with strong comfort-control and heat-pump options for different climates.", "Limited equipment warranties vary by model and registration; labor, refrigerant, and maintenance are separate.", "https://www.trane.com/residential/en/"),
      option("Lennox", "Signature and Merit systems", "lennox.com", "Lennox has manufactured heating and cooling equipment since 1895.", "Useful range from premium communicating systems to straightforward replacement equipment.", "Limited parts warranties vary by model, registration, and installation; exact terms apply.", "https://www.lennox.com/"),
      option("Mitsubishi Electric", "M-Series and Hyper-Heat", "mitsubishicomfort.com", "Mitsubishi Electric has operated since 1921 and developed a major North American ductless and heat-pump business.", "Excellent for room-by-room control, additions, older homes, and cold-climate heat-pump planning.", "Limited equipment warranties vary by product, installer requirements, and registration; labor is separate.", "https://www.mitsubishicomfort.com/"),
      option("Rheem", "Classic Plus and EcoNet systems", "rheem.com", "Rheem began in 1925 and makes residential water-heating and HVAC equipment.", "Practical equipment and controls for homeowners prioritizing availability and value.", "Limited parts and equipment warranties vary by model and registration; maintenance and labor terms apply.", "https://www.rheem.com/"),
    ],
  },
  plumbing: {
    title: "Plumbing and water-heating choices",
    intro: "We separate the fixture you see from the pipe, valve, shutoff, venting, and water-heating system behind it.",
    options: [
      option("Kohler", "Faucets, toilets, baths, and fittings", "kohler.com", "Founded in 1873, Kohler is one of the longest-established names in residential plumbing and bath design.", "Coordinated design families and broad replacement-part support for kitchens and baths.", "Limited warranties vary by product, finish, electronics, and owner; installation and water conditions apply.", "https://www.kohler.com/"),
      option("Moen", "Kitchen, bath & smart-water suite", "moen.com", "Moen introduced its first single-handle faucet in 1947 and became a major fixture manufacturer.", "The catalog extends beyond faucets to showers, bath safety, sinks, accessories, filtration, garbage disposals, and smart leak monitoring/shutoff.", "Limited lifetime-style warranties vary by product and owner; electronic and finish components can differ.", "https://www.moen.com/", undefined, ["Kitchen faucets & accessories", "Bathroom faucets", "Showerheads, valves & smart showers", "Sinks and bath fixtures", "Grab bars and bath safety", "Whole-home smart water shutoff", "Water filtration", "Garbage disposals", "Replacement parts"]),
      option("Bradford White", "Residential water heaters", "bradfordwhite.com", "Bradford White has manufactured water heaters in the United States since 1881.", "Contractor-focused water-heating equipment with common service paths and many fuel types.", "Limited tank and component warranties vary by model, application, and professional installation requirements.", "https://www.bradfordwhite.com/"),
      option("Navien", "Tankless and combi boilers", "navien.com", "Navien has developed high-efficiency tankless water heaters and boilers since the 1970s.", "Useful where space, continuous hot water, efficiency, or hydronic comfort is a priority.", "Limited heat-exchanger, parts, and labor terms vary by model, registration, and installation.", "https://www.navien.com/"),
    ],
  },
  electrical: {
    title: "Electrical and control choices",
    intro: "We match panels, breakers, devices, controls, lighting, backup, and protection to the home's actual load and the local code path.",
    options: [
      option("Schneider Electric", "Square D QO and Homeline", "se.com", "Schneider Electric traces its history to 1836 and supplies electrical-distribution and automation products worldwide.", "Widely recognized residential panel and breaker families with broad device compatibility.", "Product warranties vary by component and use; electrical work must be installed, tested, and permitted as required.", "https://www.se.com/us/en/"),
      option("Eaton", "BR and CH load centers", "eaton.com", "Eaton was founded in 1911 and makes electrical-distribution, protection, and power-management equipment.", "A familiar panel and protection ecosystem with many residential applications.", "Limited component warranties vary by product and installation; system performance depends on correct design.", "https://www.eaton.com/us/en-us.html"),
      option("Leviton", "Decora, smart, and load-management devices", "leviton.com", "Leviton was founded in 1906 and has expanded from wiring devices into connected-home controls.", "Useful for switches, receptacles, GFCI/AFCI devices, dimming, and smart-home control.", "Limited product warranties vary by device and electronics; compatibility and neutral-wire requirements apply.", "https://www.leviton.com/"),
      option("Lutron", "Caseta and RadioRA controls", "lutron.com", "Lutron was founded in 1961 and became a leading lighting-control manufacturer.", "Good choice where the homeowner wants scenes, dimming, occupancy logic, and design-quality controls.", "Limited product warranties vary by line and electronics; installation, hub, and network conditions apply.", "https://www.lutron.com/"),
      option("Generac", "Home standby generators", "generac.com", "Generac was founded in 1959 and built a large residential standby-generator business.", "A common backup-power path with automatic transfer and multiple fuel configurations.", "Limited generator and engine warranties vary by model, registration, maintenance, and installer requirements.", "https://www.generac.com/"),
    ],
  },
  lighting: {
    title: "Lighting and controls choices",
    intro: "Lighting works best as layers: task, ambient, accent, landscape, security, and controls that make the system easy to live with.",
    options: [
      option("Kichler", "Architectural and landscape lighting", "kichler.com", "Kichler has designed residential lighting since 1938 and supplies indoor, outdoor, and landscape products.", "Broad decorative and landscape catalog for coordinated fixture families.", "Limited warranties vary by fixture, finish, LED engine, and installation; exact product documents apply.", "https://www.kichler.com/"),
      option("WAC Lighting", "Indoor, outdoor, and smart lighting", "waclighting.com", "WAC has supplied architectural lighting products since the 1980s.", "Useful for clean architectural fixtures, LED performance, and modern control packages.", "Limited warranties vary by fixture and LED/electronic component; installation and environment matter.", "https://waclighting.com/"),
      option("Progress Lighting", "Residential decorative and architectural fixtures", "progresslighting.com", "Progress Lighting has served the residential and specification lighting market for decades.", "A broad style range for entries, kitchens, baths, porches, and whole-home coordination.", "Limited fixture and finish warranties vary by product; LED and electrical components may have different terms.", "https://www.progresslighting.com/"),
      option("FX Luminaire", "Landscape lighting and controls", "fxl.com", "FX Luminaire is part of the Hunter Industries outdoor-water and landscape ecosystem.", "A professional landscape-lighting choice for paths, trees, walls, and programmable scenes.", "Limited warranties vary by fixture, transformer, LED, and control component; installation conditions apply.", "https://www.fxl.com/"),
    ],
  },
  insulation: {
    title: "Insulation and air-sealing choices",
    intro: "We compare R-value, air sealing, moisture, fire performance, sound, access, and the climate demands of the assembly.",
    options: [
      option("Owens Corning", "Fiberglass batts and blown insulation", "owenscorning.com", "Owens Corning began in 1938 and became a major insulation and building-materials manufacturer.", "Widely available fiberglass products and familiar attic and wall assemblies.", "Limited product warranties vary by insulation type; coverage does not replace correct air sealing and installation.", "https://www.owenscorning.com/en-us/insulation"),
      option("Johns Manville", "Fiberglass and mineral wool insulation", "jm.com", "Johns Manville's insulation history reaches back to 1858 and spans commercial and residential building products.", "Broad product range for attics, walls, crawlspaces, and mechanical systems.", "Limited product warranties vary by product and application; moisture and installation conditions apply.", "https://www.jm.com/"),
      option("ROCKWOOL", "Comfortbatt and AFB mineral wool", "rockwool.com", "ROCKWOOL has produced stone-wool insulation since 1937.", "Useful where fire resistance, sound control, density, and moisture tolerance are priorities.", "Limited product warranties vary by product and installation; assembly design controls performance.", "https://www.rockwool.com/north-america/"),
      option("CertainTeed", "InsulPure and blown-in insulation", "certainteed.com", "CertainTeed's building-products portfolio includes fiberglass and other insulation systems.", "A practical option for matching insulation with a broader exterior and building-envelope scope.", "Limited warranties vary by insulation product and application; air-sealing and moisture details remain essential.", "https://www.certainteed.com/insulation"),
    ],
  },
  solar: {
    title: "Solar and backup-power choices",
    intro: "We compare module, inverter, monitoring, roof condition, electrical capacity, battery, generator, and the service path after commissioning.",
    options: [
      option("Qcells", "Q.TRON and residential solar modules", "qcells.com", "Qcells was founded in 1999 and became a major global solar-cell and module manufacturer.", "Widely specified residential modules with strong efficiency and clean roof layouts.", "Limited product and performance warranties vary by module generation and registration; installation and inverter warranties are separate.", "https://us.qcells.com/"),
      option("REC", "Alpha solar modules", "recgroup.com", "REC was founded in Norway in 1996 and has developed high-efficiency solar modules and cells.", "Useful where roof area is limited and power density matters.", "Limited product and performance warranties vary by module and registration; system design and installation apply.", "https://www.recgroup.com/"),
      option("Enphase", "IQ microinverters and batteries", "enphase.com", "Enphase was founded in 2006 and helped popularize residential microinverter systems.", "Module-level monitoring, flexible roof layouts, and a clear battery and backup ecosystem.", "Limited equipment warranties vary by component and registration; battery, labor, and system terms are separate.", "https://enphase.com/"),
      option("SolarEdge", "Power optimizers and inverters", "solaredge.com", "SolarEdge was founded in 2006 and developed a major power-optimizer and inverter platform.", "Useful for module-level optimization, monitoring, and certain complex roof layouts.", "Limited inverter, optimizer, and battery warranties vary by component and registration.", "https://www.solaredge.com/"),
      option("Tesla", "Powerwall", "tesla.com", "Tesla introduced Powerwall in 2015 and made residential battery storage more visible to homeowners.", "A recognizable battery option for backup, load management, and pairing with solar or grid power.", "Limited battery warranty terms depend on model, use, throughput, installation, and current Tesla documentation.", "https://www.tesla.com/powerwall"),
    ],
  },
  general: {
    title: "Product choices for this scope",
    intro: "Your representative will define the exact product category, then show comparable manufacturers, product lines, lead times, and current warranty documents before ordering.",
    options: [
      option("Manufacturer choice", "Matched to your written scope", "lovemeafter.com", "We coordinate products from established manufacturers rather than forcing one house brand into every project.", "You can compare the performance, look, maintenance, availability, and price that matter to your home.", "Manufacturer warranty documents are reviewed with the final scope; coverage varies by product, installer, registration, and exclusions.", "https://lovemeafter.com/"),
      option("Local availability", "Confirmed before order", "lovemeafter.com", "A national network gives us access to more than one regional supply path.", "The best product on paper is not useful if it cannot arrive, pass code, or be serviced in your market.", "The current manufacturer document and the signed project scope control; substitutions require your approval.", "https://lovemeafter.com/"),
      option("Project fit", "Good, better, and best paths", "lovemeafter.com", "Our process is built around comparing the whole installed project, not selling a single catalog line.", "You decide what trade-off makes sense for your budget, timeline, design, and expected useful life.", "We never treat a manufacturer's limited warranty as a promise of total project performance; labor and installation terms are identified separately.", "https://lovemeafter.com/"),
    ],
  },
};

const SLUG_TO_FAMILY: Record<string, string> = {
  roofing: "roofing", "insurance-claims": "roofing", "emergency-repair": "roofing", "historic-homes": "roofing", "pre-sale": "roofing",
  siding: "siding", "exterior-paint": "paint", windows: "windows", doors: "doors", "garage-doors": "doors", gutters: "gutters", trim: "siding",
  decks: "decks", fencing: "fencing", paving: "hardscape", concrete: "hardscape", masonry: "hardscape", patios: "hardscape", drainage: "hardscape", landscaping: "hardscape",
  kitchens: "cabinetry", cabinetry: "cabinetry", countertops: "countertops", bathrooms: "baths", tile: "baths", accessibility: "baths", basements: "flooring", flooring: "flooring", "interior-painting": "paint", drywall: "general", closets: "cabinetry", "rental-turnover": "flooring", "punch-list": "general", "multi-trade": "general", "property-maintenance": "general",
  hvac: "hvac", "air-quality": "hvac", plumbing: "plumbing", electrical: "electrical", "panel-upgrades": "electrical", "smart-home": "electrical", "backup-power": "electrical", lighting: "lighting", insulation: "insulation", solar: "solar",
};

export function getProductFamily(slug?: string): ProductFamily {
  return PRODUCT_FAMILIES[SLUG_TO_FAMILY[slug ?? ""] ?? "general"] ?? PRODUCT_FAMILIES.general;
}

export function getProductFamilyKey(slug?: string) {
  return SLUG_TO_FAMILY[slug ?? ""] ?? "general";
}
