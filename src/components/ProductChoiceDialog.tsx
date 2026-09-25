import { Check, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { px } from "@/data/photos";
import { PRODUCT_FAMILIES } from "@/data/product-options";

export type MaterialSelection = {
  group: string;
  label: string;
  imageId: number;
};

function familyForMaterial(group: string, label: string) {
  const text = `${group} ${label}`.toLowerCase();
  if (text.includes("solar")) return "solar";
  if (text.includes("attic insulation")) return "insulation";
  if (text.includes("countertop")) return "countertops";
  if (text.includes("cabinet") || text.includes("closet")) return "cabinetry";
  if (text.includes("tile") || text.includes("shower") || text.includes("vanity") || text.includes("faucet") || text.includes("sink")) return "baths";
  if (text.includes("roof")) return "roofing";
  if (text.includes("siding")) return "siding";
  if (text.includes("window")) return "windows";
  if (text.includes("door")) return "doors";
  if (text.includes("gutter")) return "gutters";
  if (text.includes("paint")) return "paint";
  if (text.includes("deck")) return "decks";
  if (text.includes("fence")) return "fencing";
  if (text.includes("paver") || text.includes("paving") || text.includes("concrete") || text.includes("brick") || text.includes("stone")) return "hardscape";
  if (text.includes("landscape") || text.includes("lawn")) return "hardscape";
  if (text.includes("floor")) return "flooring";
  if (text.includes("condenser") || text.includes("furnace") || text.includes("thermostat")) return "hvac";
  if (text.includes("water heater")) return "plumbing";
  if (text.includes("breaker") || text.includes("panel")) return "electrical";
  if (text.includes("light")) return "lighting";
  return "general";
}

export function ProductChoiceDialog({
  selection,
  onClose,
}: {
  selection: MaterialSelection | null;
  onClose: () => void;
}) {
  const familyKey = selection ? familyForMaterial(selection.group, selection.label) : "general";
  const family = PRODUCT_FAMILIES[familyKey] ?? PRODUCT_FAMILIES.general;

  return (
    <Dialog open={Boolean(selection)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[88vh] max-w-4xl overflow-y-auto rounded-3xl border-white/15 bg-[#172019] p-0 text-white shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:max-w-4xl">
        {selection && (
          <div>
            <div className="grid border-b border-white/10 sm:grid-cols-[.8fr_1.2fr]">
              <img
                src={px(selection.imageId, 1100)}
                alt={`${selection.label} reference`}
                className="h-48 w-full object-cover sm:h-full sm:min-h-64"
              />
              <div className="p-6 pr-14 sm:p-8 sm:pr-16">
                <p className="text-[10px] font-bold tracking-[.16em] text-[#d5ec77] uppercase">
                  {selection.group} · product and installation choices
                </p>
                <DialogHeader className="mt-3 text-left">
                  <DialogTitle className="text-3xl font-semibold tracking-[-.045em] text-white">{selection.label}</DialogTitle>
                  <DialogDescription className="mt-2 text-sm leading-6 text-white/70">
                    {family.intro}
                  </DialogDescription>
                </DialogHeader>
                <p className="mt-4 text-xs leading-5 text-white/50">
                  Reference image only. Final product, quantities, code requirements, and availability are confirmed for your address and written scope.
                </p>
              </div>
            </div>

            <div className="space-y-7 p-6 sm:p-8">
              <section aria-labelledby="material-options-heading">
                <p className="text-xs font-semibold tracking-[.14em] text-[#d5ec77] uppercase">Compare real product lines</p>
                <h3 id="material-options-heading" className="mt-2 text-xl font-semibold">Options to review with your project specialist</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {family.options.map((product) => (
                    <article key={`${product.brand}-${product.line}`} className="rounded-2xl border border-white/10 bg-white/[.045] p-4 sm:p-5">
                      <p className="text-[10px] font-semibold tracking-[.12em] text-[#d5ec77] uppercase">{product.brand}</p>
                      <h4 className="mt-1 text-lg font-semibold">{product.line}</h4>
                      <p className="mt-3 text-sm leading-6 text-white/70">{product.why}</p>
                      <div className="mt-4 flex gap-2 border-t border-white/10 pt-3">
                        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#d5ec77]" />
                        <p className="text-xs leading-5 text-white/55"><span className="font-semibold text-white/75">Warranty to verify: </span>{product.warranty}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[#d5ec77]/20 bg-[#d5ec77]/[.07] p-5" aria-labelledby="installation-checks-heading">
                <h3 id="installation-checks-heading" className="text-base font-semibold text-[#e6f4ae]">What the written scope should settle</h3>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/75 sm:grid-cols-2">
                  {[
                    "Exact product line, material, color, and quantity",
                    "Preparation, flashing, underlayment, or substrate work",
                    "Removal, disposal, cleanup, permits, and inspection",
                    "Lead time, installation requirements, and warranty exclusions",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0 text-[#d5ec77]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <p className="text-[10px] leading-4 text-white/45">
                Product examples are for comparison, not endorsements or a promise that every line is available in every market. Manufacturer coverage and installation/workmanship coverage are separate; review the current documents before approving an order.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
