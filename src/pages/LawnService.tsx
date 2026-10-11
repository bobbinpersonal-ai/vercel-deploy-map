import { useEffect } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Phone } from "lucide-react";
import { usePageMeta } from "@/components/PageMeta";
import { TopNav, PHONE_DISPLAY, PHONE_HREF } from "@/components/TopNav";
import { SiteFooter } from "@/components/SiteFooter";

const eyebrow = "text-[11px] font-bold tracking-[.18em] text-[#2f8f5b] uppercase";

function PhotoPlaceholder({ label, variant = "after", className = "" }: { label: string; variant?: "before" | "after"; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={`relative overflow-hidden rounded-xl ${variant === "before" ? "photo-placeholder--before" : "photo-placeholder"} ${className}`}
    >
      <span className="absolute inset-x-3 bottom-3 rounded-md bg-black/45 px-3 py-1.5 text-xs font-semibold text-white">{label} · placeholder</span>
    </div>
  );
}

export type ServiceKey = "mowing" | "fertilization" | "weed-control";

type ServiceCopy = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  priceBand: string;
  priceNote: string;
  includedTitle: string;
  included: string[];
  beforeAfterTitle: string;
  beforeLabel: string;
  afterLabel: string;
  faqTitle: string;
  faqs: [string, string][];
  ctaTitle: string;
  ctaText: string;
};

const EN: Record<ServiceKey, ServiceCopy> = {
  mowing: {
    title: "Mowing",
    metaTitle: "One-Time Lawn Mowing in Dallas–Fort Worth | LoveMeAfter Lawn Care",
    metaDescription: "One-time mow, edge, and blowout from $59 — $59–$99 by lot size. Priced from your photos, confirmed before we book. Call (424) 426-0760.",
    eyebrow: "One-time mow · edge · blowout",
    headline: "A clean cut, crisp edges, every blade blown away.",
    intro: "Your yard gets the full treatment in one visit: mowed at the right height for your grass, edged along every sidewalk and driveway, and every hard surface blown clean. Booked today, mowed tomorrow.",
    priceBand: "$59–$99 by lot size",
    priceNote: "One-time mow + edge + blowout from $59 · priced from your photos, confirmed before we book",
    includedTitle: "What’s included",
    included: [
      "Even cut at the right height for your Texas grass type",
      "Crisp edging along sidewalks, driveways, and beds",
      "Full blowout of patios, walks, and driveways",
      "Clippings mulched back into the lawn or bagged—your call",
      "Gates closed and everything tidy before we leave",
      "A quick photo note when the job is done",
    ],
    beforeAfterTitle: "From overgrown to sharp in one visit.",
    beforeLabel: "Before",
    afterLabel: "After",
    faqTitle: "Mowing questions",
    faqs: [
      ["Is the mow a one-time job?", "Yes—one visit, one firm price. If you want us to come back another time, we’ll quote that as its own one-time job whenever you’re ready."],
      ["How is my price decided?", "From your lot size and photos. You’ll get a firm number before we book—$59–$99 by lot size—and that’s the price you pay."],
      ["Do I need to be home during the mow?", "No. Leave gates unlocked and pets inside, and we’ll text you when we’re on the way and when the yard is finished."],
      ["What if my grass is really long?", "Send the worst spot in your photos so we can see it. Overgrown yards can take extra passes—we’ll include that in your firm price up front, not as a surprise later."],
    ],
    ctaTitle: "Ready for a yard that looks sharp?",
    ctaText: "Send your yard photos and we’ll call you with a firm price—usually within 5 minutes during business hours.",
  },
  fertilization: {
    title: "Fertilization",
    metaTitle: "One-Time Lawn Fertilization in Dallas–Fort Worth | LoveMeAfter Lawn Care",
    metaDescription: "One-time fertilization treatment from $99 for Texas lawns. Feeding matched to your grass type, priced from your photos. Call (424) 426-0760.",
    eyebrow: "One-time fertilization treatment",
    headline: "Greener grass starts with one good feeding.",
    intro: "A single, well-timed treatment does a lot of work: deeper color, thicker growth, and a lawn that stands up to Texas heat. We match the feeding to your grass type and leave you simple watering notes so it actually takes.",
    priceBand: "From $99",
    priceNote: "One-time fertilization treatment from $99 · priced from your photos, confirmed before we book",
    includedTitle: "What’s included",
    included: [
      "Feeding matched to your grass type and season",
      "Calibrated spreader for even, no-streak coverage",
      "Care around beds, trees, and water features",
      "Simple watering notes for the days that follow",
      "A note on what to expect and when",
      "Straight advice on what your yard needs next—no pressure",
    ],
    beforeAfterTitle: "One treatment, visible difference.",
    beforeLabel: "Before",
    afterLabel: "After",
    faqTitle: "Fertilization questions",
    faqs: [
      ["Is this a one-time treatment?", "Yes. One visit, one firm price, from $99. If your yard wants another feeding later in the season, we’ll quote that separately whenever you ask."],
      ["When is the best time to fertilize in Texas?", "It depends on your grass type—warm-season lawns like Bermuda and St. Augustine have their own timing. Tell us what you’ve got (or send a photo) and we’ll recommend the right window."],
      ["Will it burn my lawn or hurt my pets?", "We use the right rate for your lawn and leave watering notes so the treatment settles in. Keep pets off the lawn until it’s watered in and dry, and you’re all set."],
      ["How soon will I see a difference?", "Most lawns show deeper color within a couple of weeks, with thicker growth following. Weather and watering play a part—we’ll tell you what to expect for your yard."],
    ],
    ctaTitle: "Give your lawn a fresh start.",
    ctaText: "Send a few yard photos and we’ll call you with a firm price for the treatment.",
  },
  "weed-control": {
    title: "Weed control",
    metaTitle: "One-Time Weed Control in Dallas–Fort Worth | LoveMeAfter Lawn Care",
    metaDescription: "One-time weed control treatment from $79. Targeted treatment for Texas lawns, priced from your photos, confirmed before we book. Call (424) 426-0760.",
    eyebrow: "One-time weed control treatment",
    headline: "Weeds out. Grass room to grow.",
    intro: "Targeted treatment for the weeds taking over your yard—front, back, and the worst spots. We identify what’s growing, treat it properly, and tell you exactly what to expect as it clears.",
    priceBand: "From $79",
    priceNote: "One-time weed control treatment from $79 · priced from your photos, confirmed before we book",
    includedTitle: "What’s included",
    included: [
      "Weed ID so we treat the right thing the right way",
      "Targeted treatment across front yard, back yard, and problem spots",
      "Care around gardens, trees, and water features",
      "Straight talk on timing and re-growth",
      "Notes on what to expect over the following days",
      "A firm price before we book—no add-ons on arrival",
    ],
    beforeAfterTitle: "The worst spot in the yard, handled.",
    beforeLabel: "Before",
    afterLabel: "After",
    faqTitle: "Weed control questions",
    faqs: [
      ["Is the weed treatment one-time?", "Yes—one visit, one firm price, from $79. If tough weeds come back later, we’ll quote a follow-up treatment separately, only if you want one."],
      ["Which weeds can you treat?", "Most common Texas lawn weeds, including crabgrass, dandelions, clover, nutsedge, and sticker weeds. Send a close-up photo of the worst spot and we’ll confirm before booking."],
      ["How long until the weeds are gone?", "Many weeds show curling and discoloration within days, with full clear-out over a couple of weeks depending on the weed and the season. We’ll set honest expectations for your yard."],
      ["Is it safe for kids and pets?", "Keep kids and pets off the treated area until it’s fully dry. After that it’s back to normal—we’ll include the exact wait time with your job."],
    ],
    ctaTitle: "Take the yard back from the weeds.",
    ctaText: "Send a photo of the worst spot and we’ll call you with a firm price.",
  },
};

const ES: Record<ServiceKey, ServiceCopy> = {
  mowing: {
    title: "Corte de césped",
    metaTitle: "Corte de césped puntual en Dallas–Fort Worth | LoveMeAfter Lawn Care",
    metaDescription: "Corte, borde y soplado puntual desde $59 — $59–$99 según el terreno. Precio según sus fotos, confirmado antes de agendar. Llame al (424) 426-0760.",
    eyebrow: "Corte · borde · soplado puntual",
    headline: "Un corte limpio, bordes definidos, todo soplado.",
    intro: "Su jardín recibe el servicio completo en una sola visita: corte a la altura ideal para su césped, bordes definidos en banquetas y entradas, y todas las superficies duras sopladas. Agendado hoy, cortado mañana.",
    priceBand: "$59–$99 según el terreno",
    priceNote: "Corte + borde + soplado puntual desde $59 · precio según sus fotos, confirmado antes de agendar",
    includedTitle: "Qué incluye",
    included: [
      "Corte parejo a la altura ideal para su tipo de césped",
      "Bordes definidos en banquetas, entradas y jardineras",
      "Soplado completo de patios, caminos y entradas",
      "Recogidos incorporados al césped o embolsados, como prefiera",
      "Puertas cerradas y todo ordenado antes de irnos",
      "Una foto de aviso cuando el trabajo termine",
    ],
    beforeAfterTitle: "De descuidado a impecable en una visita.",
    beforeLabel: "Antes",
    afterLabel: "Después",
    faqTitle: "Preguntas sobre el corte",
    faqs: [
      ["¿El corte es un trabajo puntual?", "Sí: una visita, un precio firme. Si desea que volvamos otra vez, lo cotizamos como otro trabajo puntual cuando usted lo pida."],
      ["¿Cómo se calcula mi precio?", "Según el tamaño del terreno y sus fotos. Recibirá un precio firme antes de agendar: $59–$99 según el terreno, y ese es el precio que paga."],
      ["¿Necesito estar en casa durante el corte?", "No. Deje las puertas del patio abiertas y las mascotas adentro. Le avisaremos cuando estemos en camino y cuando el jardín esté listo."],
      ["¿Y si mi césped está muy largo?", "Envíe una foto del punto más difícil para verlo. Los céspedes muy altos pueden necesitar pasadas extra: lo incluimos en su precio firme desde el inicio, sin sorpresas."],
    ],
    ctaTitle: "¿Listo para un jardín impecable?",
    ctaText: "Envíe fotos de su jardín y le llamaremos con un precio firme, normalmente en 5 minutos en horario de atención.",
  },
  fertilization: {
    title: "Fertilización",
    metaTitle: "Fertilización de césped puntual en Dallas–Fort Worth | LoveMeAfter Lawn Care",
    metaDescription: "Tratamiento de fertilización puntual desde $99 para céspedes en Texas. Fórmula según su tipo de césped, precio según sus fotos. Llame al (424) 426-0760.",
    eyebrow: "Tratamiento de fertilización puntual",
    headline: "Un césped más verde empieza con una buena alimentación.",
    intro: "Un solo tratamiento bien hecho hace mucho: más color, crecimiento más tupido y un césped que aguanta el calor de Texas. Adaptamos la fórmula a su tipo de césped y le dejamos indicaciones simples de riego para que funcione.",
    priceBand: "Desde $99",
    priceNote: "Fertilización puntual desde $99 · precio según sus fotos, confirmado antes de agendar",
    includedTitle: "Qué incluye",
    included: [
      "Fórmula adecuada para su tipo de césped y la temporada",
      "Distribuidor calibrado para una cobertura pareja",
      "Cuidado alrededor de jardineras, árboles y fuentes de agua",
      "Indicaciones simples de riego para los días siguientes",
      "Una nota sobre qué esperar y cuándo",
      "Consejos claros sobre lo que su jardín necesita después, sin presión",
    ],
    beforeAfterTitle: "Un tratamiento, diferencia visible.",
    beforeLabel: "Antes",
    afterLabel: "Después",
    faqTitle: "Preguntas sobre fertilización",
    faqs: [
      ["¿Es un tratamiento puntual?", "Sí: una visita, un precio firme, desde $99. Si su jardín necesita otra alimentación después en la temporada, la cotizamos por separado cuando la pida."],
      ["¿Cuál es la mejor época para fertilizar en Texas?", "Depende de su tipo de césped: los céspedes de temporada cálida como Bermuda y San Agustín tienen su propia época. Cuéntenos cuál tiene (o envíe una foto) y le recomendamos la mejor ventana."],
      ["¿Quemará mi césped o afectará a mis mascotas?", "Usamos la dosis correcta para su césped y dejamos indicaciones de riego para que el tratamiento se asiente. Mantenga las mascotas fuera del césped hasta que se riegue y se seque."],
      ["¿Cuándo veré la diferencia?", "La mayoría de los céspedes muestran más color en un par de semanas, con crecimiento más tupido después. El clima y el riego influyen: le diremos qué esperar en su jardín."],
    ],
    ctaTitle: "Déle a su césped un nuevo comienzo.",
    ctaText: "Envíe unas fotos del jardín y le llamaremos con un precio firme para el tratamiento.",
  },
  "weed-control": {
    title: "Control de malezas",
    metaTitle: "Control de malezas puntual en Dallas–Fort Worth | LoveMeAfter Lawn Care",
    metaDescription: "Control de malezas puntual desde $79. Tratamiento dirigido para céspedes en Texas, precio según sus fotos. Llame al (424) 426-0760.",
    eyebrow: "Tratamiento de control de malezas puntual",
    headline: "Malezas fuera. Espacio para su césped.",
    intro: "Tratamiento dirigido a las malezas que invaden su jardín: frente, patio y los puntos más difíciles. Identificamos lo que está creciendo, lo tratamos como corresponde y le explicamos qué esperar mientras desaparece.",
    priceBand: "Desde $79",
    priceNote: "Control de malezas puntual desde $79 · precio según sus fotos, confirmado antes de agendar",
    includedTitle: "Qué incluye",
    included: [
      "Identificación de malezas para tratarlas como corresponde",
      "Tratamiento dirigido en frente, patio y puntos problemáticos",
      "Cuidado alrededor de jardines, árboles y fuentes de agua",
      "Información clara sobre tiempos y rebrote",
      "Notas sobre qué esperar en los días siguientes",
      "Precio firme antes de agendar, sin cargos extra al llegar",
    ],
    beforeAfterTitle: "El punto más difícil del jardín, resuelto.",
    beforeLabel: "Antes",
    afterLabel: "Después",
    faqTitle: "Preguntas sobre control de malezas",
    faqs: [
      ["¿El tratamiento es puntual?", "Sí: una visita, un precio firme, desde $79. Si las malezas difíciles vuelven después, cotizamos un tratamiento de seguimiento por separado, solo si usted lo desea."],
      ["¿Qué malezas pueden tratar?", "La mayoría de las malezas comunes del césped en Texas: cangrejilla, dientes de león, trébol, corocillo y abrojos. Envíe una foto del punto más difícil y lo confirmamos antes de agendar."],
      ["¿Cuánto tardan en desaparecer?", "Muchas malezas muestran cambios en días, con desapareción completa en un par de semanas según la maleza y la temporada. Le daremos expectativas honestas para su jardín."],
      ["¿Es seguro para niños y mascotas?", "Mantenga a niños y mascotas fuera del área tratada hasta que esté completamente seca. Después, todo vuelve a la normalidad: le daremos el tiempo exacto con su trabajo."],
    ],
    ctaTitle: "Recupere su jardín de las malezas.",
    ctaText: "Envíe una foto del punto más difícil y le llamaremos con un precio firme.",
  },
};

const SERVICE_PATH: Record<ServiceKey, string> = {
  mowing: "/services/mowing",
  fertilization: "/services/fertilization",
  "weed-control": "/services/weed-control",
};

export default function LawnService({ service, spanish = false }: { service: ServiceKey; spanish?: boolean }) {
  const copy = (spanish ? ES : EN)[service];
  const reduceMotion = useReducedMotion();
  const canonical = spanish ? `https://lovemeafter.com/es/${service === "mowing" ? "corte-de-cesped" : service === "fertilization" ? "fertilizacion" : "control-de-malezas"}` : `https://lovemeafter.com${SERVICE_PATH[service]}`;

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = spanish ? "es" : "en";
    return () => { document.documentElement.lang = previousLanguage; };
  }, [spanish]);

  usePageMeta(copy.metaTitle, copy.metaDescription, canonical);

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  }).replace(/</g, "\\u003c");

  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.14 }, transition: { duration: 0.45 } };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopNav />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#14372a] text-white">
          <div aria-hidden="true" className="photo-placeholder--dark absolute inset-0 opacity-40" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0f2b20] via-[#14372a]/85 to-transparent" />
          <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <p className={eyebrow + " text-[#8fd6ac]"}>{copy.eyebrow}</p>
            <h1 className="mt-4 max-w-[16ch] text-4xl leading-[1.03] sm:text-5xl lg:text-[3.75rem]">{copy.headline}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{copy.intro}</p>
            <div className="mt-8 inline-flex flex-col rounded-xl border border-white/20 bg-white/10 px-6 py-4">
              <span className="text-2xl font-extrabold">{copy.priceBand}</span>
              <span className="mt-1 max-w-md text-xs font-medium text-white/80">{copy.priceNote}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/get-quote" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-base font-bold text-[#14502f] transition hover:bg-[#eaf2ed]">
                {spanish ? "Pedir mi precio" : "Get My Price"}<ArrowRight className="size-4" />
              </Link>
              <a href={PHONE_HREF} className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                <Phone className="size-4" />{PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <motion.section {...reveal} className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_.9fr]">
              <div>
                <p className={eyebrow}>{copy.includedTitle}</p>
                <ul className="mt-6 space-y-4">
                  {copy.included.map((item) => (
                    <li key={item} className="flex gap-3 border-t border-[#1c2620]/12 pt-4 text-base leading-6 text-[#26332b]">
                      <Check className="mt-1 size-5 shrink-0 text-[#2f8f5b]" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl text-[#14372a]">{copy.beforeAfterTitle}</h2>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <PhotoPlaceholder label={copy.beforeLabel} variant="before" className="aspect-[4/5]" />
                  <PhotoPlaceholder label={copy.afterLabel} variant="after" className="aspect-[4/5]" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} className="bg-[#f2f6f3]">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="text-3xl text-[#14372a] sm:text-4xl">{copy.faqTitle}</h2>
            <div className="mt-8 divide-y divide-[#1c2620]/12 border-y border-[#1c2620]/12">
              {copy.faqs.map(([question, answer]) => (
                <details key={question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 text-base font-bold text-[#14372a] marker:content-none">
                    {question}
                    <span aria-hidden="true" className="float-right text-[#2f8f5b] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[#4c5b52]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
        </motion.section>

        <section className="bg-[#175a3b] text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-[18ch] text-3xl leading-[1.05] sm:text-4xl">{copy.ctaTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">{copy.ctaText}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/get-quote" className="inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#14502f] transition hover:bg-[#eaf2ed]">
                {spanish ? "Pedir mi precio" : "Get My Price"}<ArrowRight className="size-4" />
              </Link>
              <a href={PHONE_HREF} className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                <Phone className="size-4" />{PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter spanish={spanish} />
    </div>
  );
}

export function MowingPage() { return <LawnService service="mowing" />; }
export function FertilizationPage() { return <LawnService service="fertilization" />; }
export function WeedControlPage() { return <LawnService service="weed-control" />; }
export function MowingSpanishPage() { return <LawnService service="mowing" spanish />; }
export function FertilizationSpanishPage() { return <LawnService service="fertilization" spanish />; }
export function WeedControlSpanishPage() { return <LawnService service="weed-control" spanish />; }
