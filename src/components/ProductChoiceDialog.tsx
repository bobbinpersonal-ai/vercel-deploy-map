import { useState } from "react";
import { ArrowUpRight, Check, ExternalLink, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { px } from "@/data/photos";
import { PRODUCT_FAMILIES } from "@/data/product-options";
import type { ProductOption } from "@/data/product-options";
import { OfficialBrandLogo } from "@/components/OfficialBrandLogo";

export type MaterialSelection = {
  group: string;
  label: string;
  imageId?: number;
  imageUrl?: string;
  familySlug?: string;
  officialUrl?: string;
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

function ProductImage({ product }: { product: ProductOption }) {
  const [failed, setFailed] = useState(false);
  if (!product.imageUrl || failed) {
    return <div className="flex h-44 flex-col items-center justify-center bg-[radial-gradient(ellipse_at_50%_45%,rgba(239,142,180,.2),transparent_65%),linear-gradient(140deg,#352a38,#211824)] px-5 text-center sm:h-52"><OfficialBrandLogo brand={product.brand} domain={product.domain} className="size-12 rounded-lg bg-white p-2" /><p className="mt-3 text-sm font-semibold text-white">{product.brand}</p><p className="mt-1 text-xs leading-5 text-white/70">{product.line}</p><p className="mt-2 text-[10px] text-white/50">Open the manufacturer page below for current product imagery.</p></div>;
  }
  return <img src={product.imageUrl} alt={product.imageAlt ?? `${product.brand} ${product.line} manufacturer product`} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="h-44 w-full rounded-xl object-cover sm:h-52" />;
}

export function ProductChoiceDialog({
  selection,
  onClose,
}: {
  selection: MaterialSelection | null;
  onClose: () => void;
}) {
  const familyKey = selection?.familySlug ?? (selection ? familyForMaterial(selection.group, selection.label) : "general");
  const family = PRODUCT_FAMILIES[familyKey] ?? PRODUCT_FAMILIES.general;
  const imageUrl = selection?.imageUrl ?? (selection?.imageId ? px(selection.imageId, 1100) : undefined);
  const useProductImage = Boolean(selection?.imageUrl || selection?.imageId);
  const products = family.options;

  return (
    <Dialog open={Boolean(selection)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto rounded-3xl border-white/15 bg-[#211824]/[.98] p-0 text-white shadow-[0_30px_100px_rgba(0,0,0,.65)] backdrop-blur-2xl sm:max-w-5xl">
        {selection && (
          <div>
            <div className="grid border-b border-white/10 bg-[#2a202c] sm:grid-cols-[.9fr_1.1fr]">
              {imageUrl ? <img src={imageUrl} alt={`${selection.label} product reference`} className="h-56 w-full object-cover sm:h-full sm:min-h-72" loading="lazy" referrerPolicy="no-referrer" /> : <div className="flex min-h-56 items-center justify-center bg-[linear-gradient(145deg,#463343,#211824)] text-center font-semibold text-white/70">{selection.label}</div>}
              <div className="p-6 pr-14 sm:p-8 sm:pr-16">
                <p className="text-[10px] font-bold tracking-[.16em] text-[#ffc6dc] uppercase">{selection.group} · {useProductImage ? "product reference" : "manufacturer choices"}</p>
                <DialogHeader className="mt-3 text-left">
                  <DialogTitle className="text-3xl font-semibold tracking-[-.045em] text-white sm:text-4xl">{selection.label}</DialogTitle>
                  <DialogDescription className="mt-3 text-sm leading-6 text-white/70">{family.intro}</DialogDescription>
                </DialogHeader>
                {selection.officialUrl && <a href={selection.officialUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-[#ffc6dc] transition hover:border-[#ef8eb4] hover:bg-white/5">Open manufacturer product page <ExternalLink className="size-3.5" /></a>}
                <p className="mt-4 text-xs leading-5 text-white/60">Examples and product categories identify manufacturer choices. Confirm the exact model/configuration, code fit, market availability, pricing, installation instructions, and warranty documents before ordering.</p>
              </div>
            </div>

            <div className="space-y-8 p-5 sm:p-8">
              <section aria-labelledby="material-options-heading">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold tracking-[.14em] text-[#ffc6dc] uppercase">Manufacturer product families</p><h3 id="material-options-heading" className="mt-2 text-xl font-semibold sm:text-2xl">Compare real lines and complete systems</h3></div><span className="text-xs text-white/50">{products.length} product families</span></div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {products.map((product) => (
                    <article key={`${product.brand}-${product.line}`} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.04]">
                      <div className="relative p-3"><ProductImage product={product} /></div>
                      <div className="px-5 pb-5"><div className="flex items-center gap-2"><OfficialBrandLogo brand={product.brand} domain={product.domain} className="size-6" /><span className="text-xs font-semibold text-[#ffc6dc]">{product.brand}</span></div><h4 className="mt-2 text-lg font-semibold">{product.line}</h4><p className="mt-2 text-sm leading-6 text-white/70">{product.why}</p>
                        {product.highlights?.length ? <div className="mt-4"><p className="text-[10px] font-semibold tracking-[.12em] text-[#ffc6dc] uppercase">System components &amp; sub-products</p><div className="mt-2 flex flex-wrap gap-1.5">{product.highlights.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[.04] px-2.5 py-1 text-[10px] leading-4 text-white/70">{item}</span>)}</div></div> : null}
                        <div className="mt-4 flex gap-2 border-t border-white/10 pt-3"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#ffc6dc]" /><p className="text-xs leading-5 text-white/60"><span className="font-semibold text-white/80">Warranty to verify: </span>{product.warranty}</p></div>
                        <a href={product.productUrl ?? product.officialUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center text-xs font-semibold text-[#ffc6dc] hover:text-white">Manufacturer page &amp; current specs <ArrowUpRight className="ml-1 size-3.5" /></a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[#ef8eb4]/20 bg-[#ef8eb4]/[.08] p-5 sm:p-6" aria-labelledby="installation-checks-heading">
                <h3 id="installation-checks-heading" className="text-base font-semibold text-[#ffd9e8]">A purchase you can explain later</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">The strongest justification is specific to your home: a documented problem or desired outcome, a product system that fits it, and an installation scope that names the materials, preparation, and follow-through.</p>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-white/75 sm:grid-cols-2">{["Exact product line, finish, dimensions, and quantity", "Preparation, substrate, flashing, posts, base, or drainage", "Removal, disposal, permit, cleanup, and inspection responsibilities", "Lead time, installation instructions, care, and warranty exclusions"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-[#ffc6dc]" /><span>{item}</span></li>)}</ul>
              </section>
              <p className="text-[10px] leading-4 text-white/45">Product examples are for comparison, not an endorsement or a promise that every line is available in every market. Manufacturer coverage and installation/workmanship coverage are separate; current manufacturer documents and the approved project scope control.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
