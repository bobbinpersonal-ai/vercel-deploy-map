import { useState } from "react";
import { ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { getProductFamily, PRODUCT_FAMILIES } from "../data/product-options";

type ManufacturerLogoProps = {
  brand: string;
  domain: string;
};

function ManufacturerLogo({ brand, domain }: ManufacturerLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="text-sm font-semibold tracking-tight text-slate-900">{brand}</span>;
  }

  return (
    <div className="flex min-h-10 items-center gap-3">
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={`${brand} logo`}
        className="max-h-8 w-auto max-w-[8.5rem] object-contain"
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <span className="text-sm font-semibold tracking-tight text-slate-900">{brand}</span>
    </div>
  );
}

type ManufacturerShowcaseProps = {
  slug?: string;
  compact?: boolean;
};

export function ManufacturerShowcase({ slug, compact = false }: ManufacturerShowcaseProps) {
  const family = getProductFamily(slug);
  const compactProducts = slug
    ? family.options
    : Object.values(PRODUCT_FAMILIES)
        .flatMap((productFamily) => productFamily.options)
        .filter((product, index, products) => products.findIndex((candidate) => candidate.brand === product.brand) === index)
        .slice(0, 8);

  if (compact) {
    return (
      <section className="border-y border-slate-200/80 bg-white/75 py-8" aria-labelledby="manufacturer-choices-heading">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Manufacturer choices</p>
              <h2 id="manufacturer-choices-heading" className="mt-2 max-w-2xl font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
                We show you the product behind the promise.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              Compare established product lines, not vague allowances. Your written scope identifies the selected brand, line, and current manufacturer warranty.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {compactProducts.map((product) => (
              <div key={`${product.brand}-${product.line}`} className="rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                <ManufacturerLogo brand={product.brand} domain={product.domain} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="scroll-mt-28 border-t border-slate-200/80 bg-[#f7f5ef] py-16 sm:py-20" aria-labelledby="product-options-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Product transparency
          </div>
          <h2 id="product-options-heading" className="mt-5 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            You choose what goes on your home.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{family.intro}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            These are real manufacturer and product-line options commonly available for this kind of work. Availability, color, code approval, lead time, installer requirements, and current pricing are confirmed for your address before anything is ordered.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {family.options.map((product) => (
            <article key={`${product.brand}-${product.line}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_-25px_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:border-amber-300 sm:p-6">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <ManufacturerLogo brand={product.brand} domain={product.domain} />
                <a
                  href={product.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-amber-700"
                >
                  Manufacturer site
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{product.line}</h3>
              <dl className="mt-4 space-y-4 text-sm leading-6">
                <div>
                  <dt className="font-semibold text-slate-900">A little history</dt>
                  <dd className="mt-1 text-slate-600">{product.history}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Why it may fit</dt>
                  <dd className="mt-1 text-slate-600">{product.why}</dd>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <dt className="flex items-center gap-2 font-semibold text-emerald-950">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    Manufacturer warranty note
                  </dt>
                  <dd className="mt-1 text-emerald-950/75">{product.warranty}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-slate-900 p-5 text-sm leading-6 text-slate-200 sm:p-6">
          <p className="font-semibold text-white">Warranty clarity matters.</p>
          <p className="mt-1 text-slate-300">
            A manufacturer's limited warranty is not automatically a promise that every installation, labor item, finish, or failure is covered. We review the current product document with you and identify manufacturer coverage, our installation/workmanship coverage, registration steps, maintenance, exclusions, and who to call after completion.
          </p>
        </div>
      </div>
    </section>
  );
}
