import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
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

function ProductImage({ product, className = "" }: { product: ProductOption; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!product.imageUrl || failed) {
    return (
      <div className={`flex items-center justify-center bg-[radial-gradient(ellipse_at_50%_45%,rgba(213,236,119,.15),transparent_65%),linear-gradient(140deg,#29342b,#182019)] ${className}`} aria-label={`${product.brand} ${product.line} product reference`}>
        <div className="max-w-xs px-5 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-bold tracking-wider text-[#d5ec77]">{product.brand.split(/\\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>
          <p className="mt-3 text-sm font-semibold text-white/85">{product.brand}</p>
          <p className="mt-1 text-xs leading-5 text-white/55">{product.line}</p>
        </div>
      </div>
    );
  }
  return <img src={product.imageUrl} alt={product.imageAlt ?? `${product.brand} ${product.line} product`} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} className={`w-full object-cover ${className}`} />;
}

function ProductDetailsDialog({ product, onClose }: { product: ProductOption | null; onClose: () => void }) {
  return (
    <Dialog open={Boolean(product)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto rounded-3xl border-white/15 bg-[#172019] p-0 text-white shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:max-w-2xl">
        {product && (
          <div>
            <div className="grid border-b border-white/10 bg-white/[.035] sm:grid-cols-[.88fr_1.12fr]">
              <ProductImage product={product} className="min-h-56 h-full sm:min-h-72" />
              <div className="px-6 py-6 pr-14 sm:px-8 sm:py-8">
              <p className="text-[10px] font-bold tracking-[.16em] text-[#d5ec77] uppercase">Manufacturer product overview</p>
              <DialogHeader className="mt-2 text-left">
                <DialogTitle className="text-3xl font-semibold tracking-[-.045em] text-white">{product.brand}</DialogTitle>
                <DialogDescription className="mt-1 text-base font-medium text-white/70">{product.line}</DialogDescription>
              </DialogHeader>
              <a href={product.productUrl ?? product.officialUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#d5ec77] underline-offset-4 hover:underline">View manufacturer catalog <ExternalLink className="size-3.5" /></a>
              </div>
            </div>
            <div className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">
              <section className="rounded-2xl border border-white/10 bg-white/[.045] p-5">
                <h3 className="text-xs font-bold tracking-[.13em] text-[#d5ec77] uppercase">Product background</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{product.history}</p>
              </section>
              {product.highlights?.length ? <section className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><h3 className="text-xs font-bold tracking-[.13em] text-[#d5ec77] uppercase">Explore the suite</h3><div className="mt-3 grid gap-2 sm:grid-cols-2">{product.highlights.map((item) => <div key={item} className="flex items-start gap-2 rounded-xl bg-white/[.035] px-3 py-2 text-xs leading-5 text-white/75"><Check className="mt-0.5 size-3.5 shrink-0 text-[#d5ec77]" />{item}</div>)}</div>{product.suiteLinks?.length ? <div className="mt-4 border-t border-white/10 pt-4"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-white/50">Manufacturer catalogs &amp; care resources</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{product.suiteLinks.map(({ label, url }) => <a key={label} href={url} target="_blank" rel="noreferrer" className="flex min-h-10 items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#111714]/55 px-3 py-2 text-xs leading-5 text-white/75 transition hover:border-[#d5ec77]/50 hover:text-[#d5ec77]">{label}<ExternalLink className="size-3.5 shrink-0" /></a>)}</div></div> : null}</section> : null}
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
        <section className="border-y border-white/10 bg-[#211824] py-8 text-white" aria-labelledby="manufacturer-choices-heading">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f3a4c2]">Manufacturer choices</p>
                <h2 id="manufacturer-choices-heading" className="mt-2 max-w-2xl font-display text-2xl font-semibold text-white sm:text-3xl">
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
                  className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#211924] py-1.5 pl-2 pr-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#ef8eb4] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef8eb4]"
                >
                  {product.imageUrl ? <img src={product.imageUrl} alt="" loading="lazy" className="size-10 rounded-full border border-white/15 bg-white object-cover" /> : <span className="flex size-10 items-center justify-center rounded-full bg-white/[.06]"><OfficialBrandLogo brand={product.brand} domain={product.domain} className="size-7" /></span>}
                  <span className="text-xs font-semibold text-white/90">{product.brand}<span className="ml-1 font-normal text-white/50">· {product.line}</span></span>
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
      <section id="products" className="scroll-mt-28 border-t border-white/10 bg-[#18151b] py-16 text-white sm:py-20" aria-labelledby="product-options-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ef8eb4]/30 bg-[#211824] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#f3a4c2]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Product transparency
              </div>
              <h2 id="product-options-heading" className="mt-5 font-display text-3xl font-semibold tracking-tight text-[#f0e8ef] sm:text-4xl">
                The product choices behind your project.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/75">{family.intro}</p>
              <p className="mt-3 text-sm leading-6 text-white/70">Compare the complete installed system, not just the visible finish. Choose a brand to see its official suite, product imagery, details, and current manufacturer information.</p>
              <a href="#manufacturer-options" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d5ec77]">Explore manufacturer options <ArrowDown className="size-4" /></a>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#172019] p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[.15em] text-[#d5ec77]">After the purchase · a clear record</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Keep the reasons, details, and next steps together.</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">A good home improvement decision is easy to explain later: what problem it solves, what was installed, how the system fits together, and where to find the care and warranty documents.</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">{["The need it addresses", "The complete product suite", "The approved scope & options", "Care, registration & support"].map((item) => <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-white/75"><Check className="size-3.5 shrink-0 text-[#d5ec77]" />{item}</div>)}</div>
              <p className="mt-5 border-t border-white/10 pt-4 text-[11px] leading-5 text-white/55">A grounded way to justify the investment: connect it to the documented condition, the outcome you wanted, and the completed scope. Resale, savings, useful life, and comfort depend on your home and aren't guaranteed by a product name.</p>
            </div>
          </div>

          <div id="manufacturer-options" className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {family.options.map((product) => (
              <article key={`${product.brand}-${product.line}`} className="group overflow-hidden rounded-3xl border border-[#1d211d]/10 bg-[#1c171e] text-white shadow-[0_18px_50px_-35px_rgba(0,0,0,.75)] transition hover:-translate-y-1 hover:border-[#ef8eb4]/40">
                <button type="button" onClick={() => setSelectedProduct(product)} aria-label={`Open detailed ${product.brand} ${product.line} overview`} className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#d5ec77]">
                  <div className="relative h-52 overflow-hidden bg-[#29342b] sm:h-60"><ProductImage product={product} className="h-full transition duration-700 group-hover:scale-[1.035]" />{product.imageUrl && <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#111714]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#d5ec77] backdrop-blur">Manufacturer image</span>}<span className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full border border-white/20 bg-[#111714]/75 text-white backdrop-blur transition group-hover:bg-[#d5ec77] group-hover:text-[#1d211d]"><ArrowUpRight className="size-4" /></span></div>
                  <div className="p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><ManufacturerLogo brand={product.brand} domain={product.domain} /><span className="text-[10px] font-semibold uppercase tracking-[.12em] text-white/45">{product.highlights?.length ?? 0} suite details</span></div><h3 className="mt-5 text-xl font-semibold leading-tight text-white">{product.line}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-white/70">{product.why}</p><span className="mt-5 inline-flex items-center text-xs font-semibold text-[#f3a4c2]">Explore product &amp; system details <ArrowUpRight className="ml-2 size-4" /></span></div>
                </button>
                <div className="flex border-t border-white/10 px-5 py-3 sm:px-6"><a href={product.productUrl ?? product.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition hover:text-[#d5ec77]">Official product information <ExternalLink className="size-3.5" /></a></div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#211824] p-5 text-sm leading-6 text-white/75 sm:p-6">
            <p className="font-semibold text-white">Warranty clarity matters.</p>
            <p className="mt-1 text-white/70">A manufacturer's limited warranty is not automatically a promise that every installation, labor item, finish, or failure is covered. Keep the chosen product, complete scope, product documentation, registration steps, maintenance requirements, exclusions, and service contact together in your home records.</p>
          </div>
          <p className="mt-4 text-[10px] leading-4 text-white/45">Manufacturer-owned images and links are presented for product identification and homeowner research. Brands and product examples are illustrative; exact products, scope, pricing, availability, code approvals, and warranty terms are confirmed for the address before an order.</p>
        </div>
      </section>
      <ProductDetailsDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
