export type ProductOption = {
  brand: string;
  line: string;
  domain: string;
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

const option = (
  brand: string,
  line: string,
  domain: string,
  history: string,
  why: string,
  warranty: string,
  officialUrl: string,
): ProductOption => ({ brand, line, domain, history, why, warranty, officialUrl });

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
      option("GAF", "Timberline HDZ shingles", "gaf.com", "Founded in 1886, GAF grew into one of North America's largest roofing-material manufacturers.", "A familiar contractor network, broad color range, and a complete system approach for common residential roofs.", "Limited manufacturer coverage varies by product; enhanced system coverage can depend on qualifying components, installer status, registration, and maintenance.", "https://www.gaf.com/en-us"),
      option("Owens Corning", "Duration shingles", "owenscorning.com", "Owens Corning began in 1938 and became a major building-materials company known for fiberglass and roofing systems.", "SureNail reinforcement, recognizable product tiers, and strong availability across many residential markets.", "Limited shingle and system warranties vary by line and installation; the current Owens Corning warranty controls coverage, exclusions, and transfer terms.", "https://www.owenscorning.com/en-us/roofing"),
      option("CertainTeed", "Landmark shingles", "certainteed.com", "CertainTeed traces its building-products history to 1904 and is part of Saint-Gobain's North American materials network.", "A wide architectural shingle palette and useful good/better/best product tiers for design-conscious homes.", "Limited warranty terms vary by product and system; upgraded coverage may require specified components and a credentialed installer.", "https://www.certainteed.com/residential-roofing"),
      option("IKO", "Dynasty shingles", "iko.com", "IKO has manufactured roofing and building products for more than 60 years across North America and other markets.", "A high-definition shingle option with strong color variation and a system designed around wind and weather exposure.", "IKO limited warranty coverage depends on the exact product, installation, registration, and applicable jurisdiction.", "https://www.iko.com/na/"),
      option("DuPont", "Tyvek Protec underlayments", "dupont.com", "DuPont introduced Tyvek in the 1960s and expanded the material into building-envelope and weatherization applications.", "A dedicated roof-underlayment choice that helps manage water and temporary exposure beneath the finished roof covering.", "Product-specific limited warranty; underlayment coverage is not the same as the shingle manufacturer's labor or system warranty.", "https://www.dupont.com/tyvek.html"),
    ],
  },
  siding: {
    title: "Siding and exterior-envelope choices",
    intro: "The visible siding is only one layer. We compare profile, trim, moisture management, paint or color technology, maintenance, and the manufacturer's installation requirements.",
    options: [
      option("Alside", "Charter Oak and Ascend siding", "alside.com", "Alside has supplied residential siding, windows, doors, and accessories to the remodeling market for decades.", "A broad vinyl and composite-style selection with familiar profiles, trim packages, and regional availability.", "Limited product warranties vary by line, finish, color, and transfer; installation and maintenance requirements apply.", "https://www.alside.com/"),
      option("James Hardie", "HardiePlank and HardiePanel fiber cement", "jameshardie.com", "James Hardie began in Australia in the late 19th century and developed a large fiber-cement building-products business.", "Fiber-cement durability, strong architectural profiles, and a finish system designed for regional climate conditions.", "Limited product and finish warranties vary by product and finish; correct installation, painting, and maintenance are essential.", "https://www.jameshardie.com/"),
      option("LP", "SmartSide engineered wood siding", "lpcorp.com", "LP Building Solutions has made engineered wood and structural building products for more than 50 years.", "A warm wood appearance with engineered treatment, practical trim options, and a lighter installation profile than some masonry products.", "Limited warranty terms vary by SmartSide product and finish; installation, clearance, and maintenance rules matter.", "https://lpcorp.com/products/siding-trim"),
      option("CertainTeed", "Monogram and MainStreet vinyl siding", "certainteed.com", "CertainTeed's long building-products history includes one of the industry's broadest residential exterior catalogs.", "Many profile, color, and trim combinations for homeowners who want predictable maintenance and a coordinated exterior.", "Limited lifetime-style and finish warranties vary by product and homeowner status; review the current document before selection.", "https://www.certainteed.com/siding"),
      option("Westlake Royal", "Cedar Renditions and Celect", "westlakeroyalbuildingproducts.com", "Westlake Royal Building Products combines established North American exterior-product brands and manufacturing operations.", "Useful for modern panelized looks, trim coordination, and low-maintenance exterior design directions.", "Product-specific limited warranties apply; color, installation, and transfer provisions vary by line.", "https://www.westlakeroyalbuildingproducts.com/"),
    ],
  },
  windows: {
    title: "Window choices",
    intro: "We compare frame material, glass, operation, opening condition, noise, ventilation, trim, and the warranty behind the exact unit—not just a sample in a showroom.",
    options: [
      option("Andersen", "400 Series and A-Series", "andersenwindows.com", "Andersen began in 1903 and became one of the best-known American window and door manufacturers.", "A broad replacement and new-construction ecosystem with many grille, glass, hardware, and trim choices.", "Limited warranties vary by series and component; glass, hardware, installation, and transfer terms are documented separately.", "https://www.andersenwindows.com/"),
      option("Pella", "250 Series and Impervia", "pella.com", "Pella has manufactured windows and doors since 1925 and maintains a large residential product range.", "Useful good/better/best choices for homeowners balancing price, frame material, sightlines, and performance.", "Limited warranties vary by product and component; installation, registration, and transfer terms must be reviewed for the selected unit.", "https://www.pella.com/"),
      option("Marvin", "Essential and Elevate", "marvin.com", "Marvin is a family-owned window and door manufacturer with roots going back to 1912.", "Strong design control for architectural proportions, larger openings, and projects where interior and exterior finish matter equally.", "Limited manufacturer's warranties vary by collection and component; finish, glass, hardware, and installation coverage are not identical.", "https://www.marvin.com/"),
      option("JELD-WEN", "V-4500 and Siteline", "jeld-wen.com", "JELD-WEN grew from a small Oregon millwork operation founded in 1960 into a global window and door manufacturer.", "Many replacement sizes and materials with broad distribution for practical renovation scopes.", "Limited warranties vary by product, material, glass, and finish; current terms and exclusions govern.", "https://www.jeld-wen.com/"),
      option("Milgard", "Tuscany and Style Line", "milgard.com", "Milgard began in 1962 and is known for residential windows and patio doors in Western and other U.S. markets.", "A practical vinyl and fiberglass choice where regional availability, smooth operation, and replacement value matter.", "Limited lifetime and component warranties vary by product and owner; availability is market-dependent.", "https://www.milgard.com/"),
    ],
  },
  doors: {
    title: "Entry and patio door choices",
    intro: "Door selection combines security, weather sealing, glass, threshold, hardware, frame condition, and the finish the homeowner sees every day.",
    options: [
      option("Therma-Tru", "Fiber-Classic and Classic-Craft", "thermatru.com", "Therma-Tru helped establish fiberglass entry doors as a major residential category beginning in the 1960s.", "Strong entry-door design range, fiberglass options, decorative glass, and system components built around the opening.", "Limited product and finish warranties vary by collection, glass, and installation; exact terms are supplied with the door package.", "https://www.thermatru.com/"),
      option("ProVia", "Signet and Embarq doors", "provia.com", "ProVia has operated as an Ohio-based building-products manufacturer since 1977.", "A high-customization option for homeowners focused on door proportion, glass, hardware, and finish detail.", "Limited warranties vary by component and finish; installation and maintenance requirements apply.", "https://www.provia.com/"),
      option("Masonite", "VistaGrande and Legacy collections", "masonite.com", "Masonite has manufactured residential and architectural doors since the 1920s.", "Wide design availability for entry, patio, and interior door scopes at different budget levels.", "Limited product and finish warranties vary by line, glass, and owner; current documents control.", "https://www.masonite.com/"),
      option("Andersen", "400 Series and E-Series doors", "andersenwindows.com", "Andersen's century-plus history includes a deep catalog of patio, gliding, hinged, and multi-slide doors.", "Useful when the door must coordinate directly with a larger window or opening package.", "Limited warranties vary by series and component; installation and glass terms are separate considerations.", "https://www.andersenwindows.com/"),
    ],
  },
  gutters: {
    title: "Gutter and water-management choices",
    intro: "We select the gutter profile, gauge, outlet size, hangers, downspouts, extensions, and protection based on the roof and where water needs to go.",
    options: [
      option("Englert", "Aluminum gutter and coil systems", "englertinc.com", "Englert has supplied metal roofing and gutter materials to the building trade since the 1960s.", "A contractor-oriented coil and gutter system with many colors and fabrication options.", "Manufacturer finish and material warranties vary by coating and product; workmanship is separately scoped.", "https://www.englertinc.com/"),
      option("Spectra", "Gutter systems and accessories", "spectraguttersystems.com", "Spectra Gutter Systems focuses on residential gutter, downspout, and protection products.", "Useful for standard residential profiles, accessories, and practical replacement scopes.", "Limited product warranties vary by product and finish; installation and drainage design remain critical.", "https://www.spectraguttersystems.com/"),
      option("LeafFilter", "Gutter protection system", "leaffilter.com", "LeafFilter built its business around a micromesh gutter-protection system and national installation network.", "An option for homeowners prioritizing reduced cleaning frequency where roof and tree conditions support it.", "Protection-system warranties and service terms are separate from the gutter itself; exclusions and maintenance requirements apply.", "https://www.leaffilter.com/"),
    ],
  },
  paint: {
    title: "Paint and coating choices",
    intro: "The product matters, but prep, substrate repair, primer, sheen, weather window, and application method determine whether the finish earns its warranty.",
    options: [
      option("Sherwin-Williams", "Duration and Emerald", "sherwin-williams.com", "Sherwin-Williams has manufactured coatings since 1866 and remains one of the largest architectural paint companies.", "Broad color support, contractor availability, and exterior lines designed for different exposure and finish goals.", "Limited product warranties vary by coating and substrate; they generally require proper preparation and application.", "https://www.sherwin-williams.com/"),
      option("Benjamin Moore", "Aura and Regal Select", "benjaminmoore.com", "Benjamin Moore was founded in 1883 and built a reputation around architectural color and coatings.", "Strong color system, premium finish options, and reliable interior and exterior product tiers.", "Limited warranty coverage varies by product and application; substrate, preparation, and maintenance exclusions apply.", "https://www.benjaminmoore.com/"),
      option("PPG", "Permanizer and Timeless", "ppgpaints.com", "PPG has made coatings since 1883 and supplies architectural, industrial, and protective paint systems.", "A practical option where contractor distribution, durable exterior coatings, and color availability matter.", "Product-specific limited warranty terms vary; current PPG documentation controls.", "https://www.ppgpaints.com/"),
    ],
  },
  decks: {
    title: "Decking and porch choices",
    intro: "We compare structure, decking, railing, fasteners, stair components, heat, slip, maintenance, and the warranty behind the surface.",
    options: [
      option("Trex", "Transcend and Trex Select", "trex.com", "Trex helped popularize recycled-composite decking in the 1990s and remains a major outdoor-living manufacturer.", "Low-maintenance composite boards, coordinated railing, and a wide set of colors and profiles.", "Limited residential warranties vary by collection and use; cleaning, installation, and transfer terms apply.", "https://www.trex.com/"),
      option("TimberTech", "Terrain, Reserve, and Legacy", "timbertech.com", "TimberTech grew from composite-decking technology and is now part of the AZEK outdoor-living portfolio.", "Useful good/better/best paths with natural visual texture and coordinated deck, trim, and railing products.", "Limited product warranties vary by collection; exact coverage depends on installation, use, and registration.", "https://www.timbertech.com/"),
      option("Fiberon", "Good Life and Paramount", "fiberondecking.com", "Fiberon has developed composite and PVC decking products for residential outdoor living for more than two decades.", "A practical choice for balancing color, price, low maintenance, and board profile.", "Limited warranties vary by product line and application; installation and care requirements apply.", "https://www.fiberondecking.com/"),
      option("Deckorators", "Voyage and mineral-based decking", "deckorators.com", "Deckorators has built a broad outdoor-living catalog of decking, railing, and accessories.", "Mineral-based and composite options help when weight, moisture, and low-maintenance performance matter.", "Limited product warranties vary by line and use; follow the current installation guide.", "https://www.deckorators.com/"),
    ],
  },
  fencing: {
    title: "Fence and gate choices",
    intro: "A fence is selected for privacy, pets, wind, maintenance, gate hardware, property lines, and how the finished line meets the home and landscape.",
    options: [
      option("CertainTeed", "Bufftech vinyl fencing", "certainteed.com", "CertainTeed's long exterior-products history includes vinyl fencing and coordinated outdoor materials.", "Low-maintenance privacy, picket, and ranch profiles with familiar contractor distribution.", "Limited lifetime-style warranties vary by line, owner, and installation; current product terms apply.", "https://www.certainteed.com/fencing"),
      option("Trex", "Seclusions composite fencing", "trex.com", "Trex expanded its composite outdoor-living platform beyond decking into privacy fencing.", "A wood-like privacy look with low routine maintenance and coordinated outdoor-living design.", "Limited product warranty varies by product and installation; fading, staining, care, and transfer provisions apply.", "https://www.trex.com/products/fencing/"),
      option("Master Halco", "Ameristar ornamental and chain-link systems", "masterhalco.com", "Master Halco has supplied fencing materials and systems to contractors for decades.", "Broad access to steel, ornamental, chain-link, posts, hardware, and commercial-grade components.", "Product and coating warranties vary by system and finish; installation and site conditions are separate.", "https://www.masterhalco.com/"),
    ],
  },
  hardscape: {
    title: "Paver, concrete, and masonry choices",
    intro: "We compare base preparation, drainage, paver or slab material, edge restraint, joints, sealers, and the freeze-thaw demands of the site.",
    options: [
      option("Belgard", "Pavers, slabs, and retaining-wall systems", "belgard.com", "Belgard has become a major North American hardscape brand for residential pavers, walls, and outdoor-living products.", "A coordinated catalog for driveways, patios, walls, steps, borders, and outdoor rooms.", "Product warranties vary by category and installation; base, drainage, jointing, and maintenance are essential to performance.", "https://www.belgard.com/"),
      option("Unilock", "Pavers and outdoor-living systems", "unilock.com", "Unilock has manufactured concrete paving products in North America since the 1970s.", "Strong pattern, color, and edge-detail options for design-forward patios and walks.", "Limited product warranties vary by product and installation; movement, base, drainage, and maintenance exclusions apply.", "https://unilock.com/"),
      option("Cambridge", "Pavingstones and wall systems", "cambridgepavers.com", "Cambridge Pavers has supplied concrete paving and wall products to the residential market for decades.", "Useful for traditional and contemporary patterns with coordinated borders and wall components.", "Limited product warranties vary by line; installation workmanship, base, and drainage are separately controlled.", "https://www.cambridgepavers.com/"),
      option("QUIKRETE", "Concrete and repair systems", "quikrete.com", "QUIKRETE has supplied packaged concrete and repair products to homeowners and contractors since 1940.", "Widely available mixes, repair products, and setting materials for concrete, masonry, and small hardscape scopes.", "Product-specific limited warranties vary; surface preparation, mix, cure, and site conditions control results.", "https://www.quikrete.com/"),
    ],
  },
  cabinetry: {
    title: "Cabinet and kitchen choices",
    intro: "Cabinet choice affects layout, storage, finish, lead time, hardware, serviceability, and the cost of every counter and appliance decision around it.",
    options: [
      option("KraftMaid", "Semi-custom cabinetry", "kraftmaid.com", "KraftMaid has supplied residential cabinetry since the late 1960s and is widely distributed through remodeling channels.", "A broad semi-custom range for homeowners who want more sizing and finish control than stock cabinets.", "Limited cabinet warranties vary by construction and finish; hardware, installation, humidity, and care terms apply.", "https://www.kraftmaid.com/"),
      option("Fabuwood", "Allure and Galaxy cabinetry", "fabuwood.com", "Fabuwood was founded in 2009 and grew quickly in the U.S. cabinet market.", "A strong value-oriented selection with contemporary door styles and many popular finishes.", "Limited warranties vary by product and owner; exact cabinet, finish, and hardware terms apply.", "https://www.fabuwood.com/"),
      option("Wellborn", "Cabinetry and custom storage", "wellborn.com", "Wellborn has manufactured cabinetry in Alabama since the 1960s.", "Useful for made-to-order sizing, finish variety, and a domestic manufacturing story.", "Limited warranties vary by collection, finish, and hardware; current manufacturer terms apply.", "https://www.wellborn.com/"),
      option("Omega", "Custom and semi-custom cabinetry", "omegacabinetry.com", "Omega Cabinetry has specialized in residential cabinetry for more than 40 years.", "A design-led option when inset details, unusual dimensions, and finish control matter.", "Limited warranties vary by collection and component; finish and installation care are important.", "https://www.omegacabinetry.com/"),
    ],
  },
  countertops: {
    title: "Countertop choices",
    intro: "We compare slab composition, edge profile, seam placement, heat and stain behavior, maintenance, sink integration, and the room's lighting.",
    options: [
      option("Cambria", "Quartz surfaces", "cambriausa.com", "Cambria is a U.S.-based family-owned quartz-surface manufacturer founded in 2000.", "Strong design collection, low routine maintenance, and a premium finish for kitchens and baths.", "Limited residential warranty terms vary; the current Cambria warranty controls care, installation, and exclusions.", "https://www.cambriausa.com/"),
      option("Caesarstone", "Quartz surfaces", "caesarstoneus.com", "Caesarstone helped establish engineered quartz surfaces as a global residential category in the 1980s.", "Wide color and texture range with a familiar fabrication and design ecosystem.", "Limited warranty varies by product, owner, installation, and care; review the current terms before selection.", "https://www.caesarstoneus.com/"),
      option("MSI", "Q Premium Natural Quartz", "msisurfaces.com", "MSI has supplied flooring, countertop, tile, and hardscape products to the U.S. market for decades.", "Broad availability, many price points, and a large catalog for coordinating multiple rooms.", "Limited warranty varies by surface and use; fabrication, installation, seams, and maintenance provisions apply.", "https://www.msisurfaces.com/"),
      option("Silestone", "Quartz surfaces", "cosentino.com", "Cosentino is a Spanish family business founded in 1979 and known for engineered and natural surfaces.", "Useful for integrated kitchen and bath design where color, slab scale, and surface continuity matter.", "Limited warranty varies by product and registration; care and installer requirements apply.", "https://www.cosentino.com/"),
    ],
  },
  baths: {
    title: "Bathroom, tile, and waterproofing choices",
    intro: "A beautiful bathroom begins behind the tile. We compare waterproofing, tile, fixtures, ventilation, glass, accessibility, and the manufacturer's installation system.",
    options: [
      option("Kohler", "Bathroom fixtures and fittings", "kohler.com", "Kohler was founded in 1873 and has grown from plumbing fixtures into a global kitchen, bath, and design company.", "A deep fixture, bath, shower, and accessory catalog for coordinated designs.", "Limited warranties vary by product and finish; registration, installation, water conditions, and care apply.", "https://www.kohler.com/"),
      option("Delta", "Faucets and shower systems", "deltafaucet.com", "Delta Faucet began in 1954 and became known for residential faucet and shower innovation.", "Strong everyday availability, broad style range, and serviceable parts support.", "Limited lifetime-style warranties vary by product and owner; finish and electronic components may differ.", "https://www.deltafaucet.com/"),
      option("Schluter", "KERDI waterproofing and shower systems", "schluter.com", "Schluter-Systems grew from European tile-installation products into a major waterproofing and transition-system manufacturer.", "A system approach for shower waterproofing, drains, uncoupling, edges, and transitions.", "Limited system warranty depends on using specified components and following the installation handbook; tile and labor warranties are separate.", "https://www.schluter.com/"),
      option("Wedi", "Building panel and shower systems", "wedi.net", "Wedi developed waterproof building panels and prefabricated shower systems in Germany.", "Lightweight, integrated waterproof panels and shower components for a controlled installation sequence.", "Limited product-system warranties vary by country and installation; exact current documents apply.", "https://www.wedi.net/"),
      option("Daltile", "Ceramic and porcelain tile", "daltile.com", "Daltile has produced tile in the United States since 1947.", "Large domestic catalog, dependable distribution, and options for floors, walls, showers, and backsplashes.", "Limited product warranties vary by tile and use; substrate, setting materials, grout, and installation remain critical.", "https://www.daltile.com/"),
    ],
  },
  flooring: {
    title: "Flooring choices",
    intro: "We compare wear layer, moisture behavior, repairability, acoustics, transitions, subfloor prep, and the finish that fits the household.",
    options: [
      option("Shaw", "Floorté, hardwood, carpet, and tile", "shawfloors.com", "Shaw has manufactured flooring since 1946 and is one of the largest flooring companies in North America.", "A broad catalog that lets homeowners coordinate multiple rooms and budgets.", "Limited product warranties vary by category, wear layer, owner, and use; installation and moisture requirements apply.", "https://shawfloors.com/"),
      option("Mohawk", "RevWood, SolidTech, and carpet", "mohawkflooring.com", "Mohawk's flooring history reaches back to 1878 and spans carpet, hard surface, and resilient flooring.", "Strong range of practical family-home surfaces and coordinated collections.", "Limited warranties vary by product and use; moisture, subfloor, and installation conditions apply.", "https://www.mohawkflooring.com/"),
      option("COREtec", "Luxury vinyl plank and tile", "coretecfloors.com", "COREtec helped popularize rigid-core luxury vinyl flooring as part of the USFloors and Shaw ecosystem.", "Water-resistant construction, realistic visuals, and useful replacement flexibility for busy homes.", "Limited warranties vary by collection, wear layer, and residential use; acclimation and installation rules apply.", "https://coretecfloors.com/"),
      option("Mannington", "Adura and residential flooring", "mannington.com", "Mannington has made residential flooring in the United States since 1915.", "A long-established manufacturer with resilient, laminate, hardwood, and design-focused options.", "Limited warranties vary by collection and use; care, subfloor, and installation provisions apply.", "https://www.mannington.com/"),
    ],
  },
  hvac: {
    title: "Heating and cooling choices",
    intro: "We compare system size, efficiency, comfort, controls, duct condition, serviceability, electrical requirements, and the warranty behind the equipment.",
    options: [
      option("Carrier", "Infinity and Performance systems", "carrier.com", "Carrier was founded in 1915 by Willis Carrier, widely credited with modern air conditioning.", "Deep equipment range, communicating controls, heat-pump options, and contractor familiarity.", "Limited parts and compressor warranties vary by model, registration, and installer; labor coverage is separate.", "https://www.carrier.com/residential/en/us/"),
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
      option("Moen", "Faucets and shower systems", "moen.com", "Moen introduced its first single-handle faucet in 1947 and became a major fixture manufacturer.", "Serviceable everyday fixtures with broad style and finish availability.", "Limited lifetime-style warranties vary by product and owner; electronic and finish components can differ.", "https://www.moen.com/"),
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
