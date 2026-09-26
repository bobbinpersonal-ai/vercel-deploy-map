import { useState } from "react";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getProductFamily, PRODUCT_FAMILIES, type ProductOption } from "../data/product-options";
import { OfficialBrandLogo } from "@/components/OfficialBrandLogo";

type ManufacturerLogoProps = {
  brand: string;
  domain: string;
};

function ManufacturerLogo({ brand, domain }: ManufacturerLogoProps) {
  return (
    <span className="flex min-h-10 items-center gap-3">
      <OfficialBrandLogo brand={brand} domain={domain} className="size-7" />
      <span className="text-sm font-semibold tracking-tight text-[#f0e8ef]">{brand}</span>
    </span>
  );
}

type ManufacturerShowcaseProps = {
  slug?: string;
  compact?: boolean;
};

function ProductDetailsDialog({ product, onClose }: { product: ProductOption | null; onClose: () => void }) {
  return (
    <Dialog open={Boolean(product)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto rounded-3xl border-white/15 bg-[#172019] p-0 text-white shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:max-w-2xl">
        {product && (
          <div>
            <div className="border-b border-white/10 bg-white/[.035] px-6 py-6 pr-14 sm:px-8 sm:py-8">
              <p className="text-[10px] font-bold tracking-[.16em] text-[#d5ec77] uppercase">Manufacturer product overview</p>
              <DialogHeader className="mt-2 text-left">
                <DialogTitle className="text-3xl font-semibold tracking-[-.045em] text-white">{product.brand}</DialogTitle>
                <DialogDescription className="mt-1 text-base font-medium text-white/70">{product.line}</DialogDescription>
              </DialogHeader>
            </div>
            <div className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">
              <section className="rounded-2xl border border-white/10 bg-white/[.045] p-5">
                <h3 className="text-xs font-bold tracking-[.13em] text-[#d5ec77] uppercase">Product background</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{product.history}</p>
              </section>
              <section className="rounded-2xl border border-[#d5ec77]/20 bg-[#d5ec77]/[.07] p-5">
                <h3 className="text-xs font-bold tracking-[.13em] text-[#e6f4ae] uppercase">Why it may fit</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{product.why}</p>
              </section>
              <section className="rounded-2xl border border-white/10 bg-white/[.045] p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 shrink-0 text-[#d5ec77]" />
                  <h3 className="text-xs font-bold tracking-[.13em] text-[#d5ec77] uppercase">Warranty details to verify</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/75">{product.warranty}</p>
              </section>
              <section>
                <h3 className="text-sm font-semibold">What the project scope should spell out</h3>
                <ul className="mt-3 grid gap-2 text-xs leading-5 text-white/65 sm:grid-cols-2">
                  {[
                    "Exact product, finish, size, and quantity",
                    "Preparation, flashing, and substrate work",
                    "Removal, disposal, permits, cleanup, and testing",
                    "Lead time, installation method, and warranty exclusions",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-[#d5ec77]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <p className="text-[10px] leading-4 text-white/45">Options, pricing, availability, and warranty terms vary by address and product line. This overview is for comparison, not an endorsement or guarantee; the current manufacturer documents and written project scope control.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ManufacturerShowcase({ slug, compact = false }: ManufacturerShowcaseProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null);
  const family = getProductFamily(slug);
  const compactProducts = slug
    ? family.options
    : Object.values(PRODUCT_FAMILIES)
        .flatMap((productFamily) => productFamily.options)
        .filter((product, index, products) => products.findIndex((candidate) => candidate.brand === product.brand) === index)
        .slice(0, 8);

  if (compact) {
    return (
      <>
        <section className="border-y border-white/10 bg-white/75 py-8" aria-labelledby="manufacturer-choices-heading">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f3a4c2]">Manufacturer choices</p>
                <h2 id="manufacturer-choices-heading" className="mt-2 max-w-2xl font-display text-2xl font-semibold text-[#f0e8ef] sm:text-3xl">
                  We show you the product behind the promise.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-white/70">
                Tap a manufacturer to review product fit, warranty caveats, and the installation details to confirm in the written scope.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {compactProducts.map((product) => (
                <button
                  key={`${product.brand}-${product.line}`}
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  aria-label={`View ${product.brand} ${product.line} product details`}
                  className="rounded-full border border-white/10 bg-[#211924] px-4 py-2.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#ef8eb4] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef8eb4]"
                >
                  <ManufacturerLogo brand={product.brand} domain={product.domain} />
                </button>
              ))}
            </div>
          </div>
        </section>
        <ProductDetailsDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </>
    );
  }

  return (
    <>
      <section id="products" className="scroll-mt-28 border-t border-white/10 bg-[#f7f5ef] py-16 sm:py-20" aria-labelledby="product-options-heading">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ef8eb4]/30 bg-[#211824] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#f3a4c2]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Product transparency
            </div>
            <h2 id="product-options-heading" className="mt-5 font-display text-3xl font-semibold tracking-tight text-[#f0e8ef] sm:text-4xl">
              You choose what goes on your home.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/75">{family.intro}</p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Tap any product option for fit, warranty, and installation details. Availability, color, code approval, lead time, installer requirements, and current pricing are confirmed for your address before anything is ordered.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {family.options.map((product) => (
              <button
                key={`${product.brand}-${product.line}`}
                type="button"
                onClick={() => setSelectedProduct(product)}
                aria-label={`View ${product.brand} ${product.line} product details`}
                className="rounded-2xl border border-white/10 bg-[#211924] p-5 text-left shadow-[0_12px_35px_-25px_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:border-[#ef8eb4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef8eb4] sm:p-6"
              >
                <ManufacturerLogo brand={product.brand} domain={product.domain} />
                <p className="mt-5 text-2xl font-semibold tracking-tight text-[#f0e8ef] sm:text-3xl">{product.line}</p>
                <p className="mt-3 text-sm leading-6 text-white/70">{product.why}</p>
                <span className="mt-5 inline-flex items-center text-xs font-semibold text-[#f3a4c2]">View product, warranty &amp; installation details <Check className="ml-2 size-4" /></span>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#211824] p-5 text-sm leading-6 text-white/75 sm:p-6">
            <p className="font-semibold text-white">Warranty clarity matters.</p>
            <p className="mt-1 text-white/70">
              A manufacturer's limited warranty is not automatically a promise that every installation, labor item, finish, or failure is covered. We review the current product document with you and identify manufacturer coverage, our installation/workmanship coverage, registration steps, maintenance, exclusions, and who to call after completion.
            </p>
          </div>
        </div>
      </section>
      <ProductDetailsDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
