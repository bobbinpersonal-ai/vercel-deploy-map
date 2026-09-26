import { useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getProductFamily } from "@/data/product-options";

export function BrandProductExample({ slug, label, brand, productLine, domain }: {
  slug: string;
  label: string;
  brand: string;
  productLine?: string;
  domain: string;
}) {
  const products = getProductFamily(slug).options.filter((product) => product.domain === domain);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const activeProduct = products.find((product) => product.line === selectedLine)
    ?? products.find((product) => product.line === productLine)
    ?? products[0];

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#302733]">
      <div className="relative h-56 overflow-hidden bg-[#292431] sm:h-72">
        {activeProduct?.imageUrl ? (
          <img
            src={activeProduct.imageUrl}
            alt={activeProduct.imageAlt ?? `${activeProduct.brand} ${activeProduct.line} product photograph`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-[radial-gradient(ellipse_at_50%_45%,rgba(239,142,180,.2),transparent_65%),linear-gradient(140deg,#352a38,#211824)] px-8 text-center">
            <div><p className="text-[10px] font-bold tracking-[.16em] text-[#ffc6dc] uppercase">Manufacturer catalog</p><p className="mt-3 text-lg font-semibold text-white">{activeProduct?.brand ?? brand}</p><p className="mt-1 text-sm text-white/65">{activeProduct?.line ?? productLine ?? label}</p></div>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#211824]/80 px-3 py-1 text-[10px] font-bold tracking-[.12em] text-white backdrop-blur">{activeProduct?.imageUrl ? "MANUFACTURER PRODUCT PHOTO" : "PRODUCT FAMILY"}</span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#211824] via-[#211824]/75 to-transparent px-5 pb-4 pt-12">
          <p className="text-[10px] font-bold tracking-[.16em] text-[#ffc6dc] uppercase">{activeProduct?.brand ?? brand} · {activeProduct?.line ?? "Product collection"}</p>
          {activeProduct?.productUrl && <a href={activeProduct.productUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white underline-offset-4 hover:text-[#ffc6dc] hover:underline">See manufacturer's product details <ExternalLink className="size-3" /></a>}
        </div>
      </div>
      {products.length > 1 && (
        <div className="border-t border-white/10 px-4 py-3">
          <p className="mb-2 text-[10px] font-bold tracking-[.12em] text-white/50 uppercase">Explore {brand} product lines</p>
          <div className="flex gap-2 overflow-x-auto pb-1" aria-label={`${brand} product lines`}>
            {products.map((product) => (
              <button key={product.line} type="button" onClick={() => setSelectedLine(product.line)} aria-pressed={(activeProduct?.line ?? productLine) === product.line} className="group flex w-28 shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[.04] text-left transition hover:border-[#ef8eb4]/60 aria-pressed:border-[#ef8eb4]">
                {product.imageUrl ? <img src={product.imageUrl} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="h-14 w-full object-cover" /> : <span className="flex h-14 items-center justify-center bg-white/[.05] text-[10px] font-semibold text-white/55">{product.brand}</span>}
                <span className="flex min-h-11 items-center justify-between gap-1 px-2 py-1.5 text-[10px] font-medium leading-4 text-white/75"><span className="line-clamp-2">{product.line}</span><ArrowUpRight className="size-3 shrink-0 text-[#ffc6dc]" /></span>
              </button>
            ))}
          </div>
        </div>
      )}
      <figcaption className="px-4 py-3 text-xs leading-5 text-white/75">Manufacturer-sourced product references; exact configurations, specifications, and local availability are confirmed for your project.</figcaption>
    </figure>
  );
}
