import type { ProductOption } from "@/data/product-options";

const REFERENCE_IMAGE_IDS: [RegExp, number][] = [
  [/solar|photovoltaic|microinverter|powerwall|battery storage/i, 38021376],
  [/heat pump|hvac|air condition|air handler|furnace|thermostat|ductless|comfort system|ventilation|humidif|dehumidif|mini.split/i, 18725613],
  [/roof|shingle|underlayment|flashing|gaf|timberline|duration|landmark|dynasty/i, 4334097],
  [/window|glazing|casement|double.hung|fibrex|pella|marvin|milgard/i, 39634957],
  [/garage door/i, 34711989],
  [/door|entry|patio door|therma.tru|masonite|provia/i, 16254509],
  [/siding|hardie|smartside|fiber.cement|vinyl exterior/i, 186077],
  [/fenc|gate|montage|ornamental|privacy panel|vinyl privacy/i, 30573147],
  [/deck|railing|trex|timbertech|fiberon|deckorators/i, 33017851],
  [/gutter|downspout|leaf protection/i, 2663254],
  [/paint|coating|sherwin|benjamin moore|ppg/i, 5583126],
  [/paver|hardscape|concrete|masonry|brick|stone|retaining wall|quikrete|unilock|cambridge/i, 10855255],
  [/cabinet|cabinetry|closet|storage system|kraftmaid|fabuwood|wellborn/i, 8146322],
  [/counter|quartz|cambria|caesarstone|silestone/i, 18285887],
  [/tile|shower|bath|faucet|sink|toilet|vanity|kohler|moen|delta faucet|schluter|wedi|daltile/i, 19980232],
  [/floor|hardwood|carpet|vinyl plank|shaw|mohawk|mannington/i, 11126101],
  [/water heater|plumb|tankless|navien|bradford white/i, 34593293],
  [/electrical|breaker|panel|eaton|square d|leviton|generator|enphase/i, 5767595],
  [/light|lighting|lutron|kichler|wac/i, 12689254],
  [/insulat|weatheriz|rockwool|johns manville/i, 8082327],
];

const VERIFIED_MANUFACTURER_IMAGE_HOSTS = new Set([
  "images.trex.com",
  "images.carriercms.com",
  "certainteed.widen.net",
  "images.ctfassets.net",
  "edge.sitecorecloud.io",
  "www.belgard.com",
  "www.catalystfence.com",
  "www.masterhalco.com",
]);

const pexelsPhoto = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

export function getIllustrativeProductImage(product: ProductOption) {
  const subject = `${product.brand} ${product.line}`;
  const imageId = REFERENCE_IMAGE_IDS.find(([pattern]) => pattern.test(subject))?.[1] ?? 4442490;
  return {
    url: pexelsPhoto(imageId),
    source: "Illustrative product reference" as const,
    alt: `${product.line} example image; illustrative reference, not the exact ${product.brand} product`,
  };
}

export function getProductImage(product: ProductOption) {
  if (product.imageUrl) {
    try {
      const host = new URL(product.imageUrl).hostname.toLowerCase();
      if (VERIFIED_MANUFACTURER_IMAGE_HOSTS.has(host)) {
        return {
          url: product.imageUrl,
          source: "Manufacturer product photo" as const,
          alt: product.imageAlt ?? `${product.brand} ${product.line} product photo`,
        };
      }
    } catch {
      // Invalid or relative image URLs use the safe category-matched reference.
    }
  }

  return getIllustrativeProductImage(product);
}
