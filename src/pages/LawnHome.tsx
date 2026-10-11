import { useEffect } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Phone, Sprout } from "lucide-react";
import { usePageMeta } from "@/components/PageMeta";
import { TopNav, PHONE_DISPLAY, PHONE_HREF } from "@/components/TopNav";
import { SiteFooter } from "@/components/SiteFooter";

const eyebrow = "text-[11px] font-bold tracking-[.18em] text-[#a36a27] uppercase";

function ExteriorPhoto({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`h-full w-full rounded-xl object-cover ${className}`}
    />
  );
}

type Copy = {
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  heroPrice: string;
  callCta: string;
  quoteCta: string;
  beforeAfterEyebrow: string;
  beforeAfterTitle: string;
  beforeAfterText: string;
  servicesEyebrow: string;
  servicesTitle: string;
  services: { name: string; price: string; detail: string; bullets: string[]; href: string }[];
  combo: string;
  howEyebrow: string;
  howTitle: string;
  steps: [string, string][];
  areasEyebrow: string;
  areasTitle: string;
  areasText: string;
  reviewsEyebrow: string;
  reviewsTitle: string;
  reviews: [string, string][];
  reviewsNote: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: [string, string][];
  finalTitle: string;
  finalText: string;
};

const EN: Copy = {
  heroEyebrow: "Dallas–Fort Worth · Lawn care for the whole property",
  heroTitle: "We know curb appeal. Now we’re bringing it to your lawn.",
  heroText: "A proper mow is more than a pass with the mower: clean lines at the drive, edges around the beds, and clippings blown off the walk. Send photos of your actual yard and we’ll quote the work before we schedule it.",
  heroPrice: "Mow, edge & blowout $59–$99 · One clear quote before we start",
  callCta: "Call",
  quoteCta: "Get My Price",
  beforeAfterEyebrow: "A home-improvement perspective",
  beforeAfterTitle: "The outside makes the first impression.",
  beforeAfterText: "The exterior inspiration shown here reflects the home-improvement side of LoveMeAfter—not lawn-care results. Our lawn work focuses on that same attention to detail: a clean cut, crisp edges, and a tidy finish.",
  servicesEyebrow: "Three ways we help",
  servicesTitle: "Straight services. Firm, one-time prices.",
  services: [
    {
      name: "Mow, edge & blowout",
      price: "$59–$99 by lot size",
      detail: "One-time mow + edge + blowout from $59",
      bullets: ["Even cut at the right height for your grass", "Crisp edges along sidewalks and driveways", "Every clippings blown off patios and walks"],
      href: "/services/mowing",
    },
    {
      name: "Fertilization treatment",
      price: "From $99",
      detail: "One-time fertilization treatment from $99",
      bullets: ["Feeding matched to your Texas grass type", "Even coverage, calibrated spreader", "Watering notes so it actually works"],
      href: "/services/fertilization",
    },
    {
      name: "Weed control treatment",
      price: "From $79",
      detail: "One-time weed control treatment from $79",
      bullets: ["Targeted treatment for the weeds in your yard", "Front, back, and the worst spots", "Follow-up notes on what to expect"],
      href: "/services/weed-control",
    },
  ],
  combo: "Mow + fertilization combo: 15% off the second service.",
  howEyebrow: "How it works",
  howTitle: "Photos in. Price out. Yard handled.",
  steps: [
    ["Send yard photos", "Front yard, back yard, and the worst spot. Thirty seconds from your phone."],
    ["Firm price in minutes", "We price from your photos and confirm before we book. The number doesn’t move when we arrive."],
    ["We book your slot", "Pick a day that works. We show up, do the job, and leave the place clean."],
  ],
  areasEyebrow: "Service area",
  areasTitle: "Proudly mowing Dallas–Fort Worth.",
  areasText: "Local crews run daily routes across the Metroplex. Tap your city to see what we do there.",
  reviewsEyebrow: "The LoveMeAfter standard",
  reviewsTitle: "Care for the details you see every day.",
  reviews: [
    ["No guessing at the gate. We price from your yard photos and confirm the full amount before scheduling.", "A clear price"],
    ["The cut is only part of it: we edge the walks and drive, then blow hard surfaces clean.", "The whole finish"],
    ["We work around beds, gates, and the parts of the yard that need extra care—not just the easy straightaways.", "Your property, respected"],
  ],
  reviewsNote: "We’ll share real lawn-care project photos as those jobs are completed.",
  faqEyebrow: "Straight answers",
  faqTitle: "Questions homeowners ask",
  faqs: [
    ["Is every job really one-time?", "Yes. You book a single job at a firm price and we do that job well. If you want us to come back later, just ask—we’ll quote that as its own one-time job."],
    ["How does pricing work?", "Priced from your photos, confirmed before we book. A one-time mow + edge + blowout runs $59–$99 by lot size. Fertilization treatments start at $99 and weed control at $79. Combo the mow with fertilization and take 15% off the second service."],
    ["What’s included in a mow?", "A clean, even cut at the right height for your grass, crisp edges along sidewalks, driveways, and beds, and a full blowout of every hard surface. Clippings go where you want them—mulched back into the lawn or bagged."],
    ["Do I need to be home?", "No. Just make sure gates are unlocked and pets are inside. We’ll text when we’re on the way and send a note when the job is done."],
    ["How fast can you get here?", "Booked today, mowed tomorrow. Send photos any time and we’ll call you within 5 minutes with your firm price during business hours."],
    ["What areas do you serve?", "Dallas–Fort Worth, including Dallas, Fort Worth, Arlington, Plano, Garland, and Irving. If you’re near the Metroplex but not sure, call us at " + PHONE_DISPLAY + " and we’ll confirm."],
  ],
  finalTitle: "Your yard, handled this week.",
  finalText: "Send a few photos now, or just call. Either way you’ll have a firm price before anything is booked.",
};

const ES: Copy = {
  heroEyebrow: "Dallas–Fort Worth · Cuidado para toda su propiedad",
  heroTitle: "Conocemos el atractivo de una casa. Ahora, también cuidamos su césped.",
  heroText: "Un buen corte es más que pasar la podadora: líneas limpias junto a la entrada, bordes alrededor de los jardines y hojas sopladas de las banquetas. Envíe fotos de su jardín y le cotizamos el trabajo antes de agendar.",
  heroPrice: "Corte, borde y soplado: $59–$99 · Precio claro antes de empezar",
  callCta: "Llamar",
  quoteCta: "Pedir precio",
  beforeAfterEyebrow: "Una perspectiva de mejoras para el hogar",
  beforeAfterTitle: "El exterior da la primera impresión.",
  beforeAfterText: "La inspiración exterior que ve aquí refleja el lado de mejoras para el hogar de LoveMeAfter, no resultados de jardinería. Nuestro trabajo de césped aplica esa misma atención al detalle: corte limpio, bordes definidos y un acabado ordenado.",
  servicesEyebrow: "Tres formas de ayudar",
  servicesTitle: "Servicios claros. Precios firmes, por trabajo.",
  services: [
    {
      name: "Corte, borde y soplado",
      price: "$59–$99 según el terreno",
      detail: "Corte + borde + soplado puntual desde $59",
      bullets: ["Corte parejo a la altura ideal para su césped", "Bordes definidos en banquetas y entradas", "Todos los recogidos soplados de superficies duras"],
      href: "/es/corte-de-cesped",
    },
    {
      name: "Tratamiento de fertilización",
      price: "Desde $99",
      detail: "Fertilización puntual desde $99",
      bullets: ["Fórmula adecuada para su tipo de césped en Texas", "Cobertura pareja y dosis medida", "Indicaciones de riego para que funcione"],
      href: "/es/fertilizacion",
    },
    {
      name: "Control de malezas",
      price: "Desde $79",
      detail: "Control de malezas puntual desde $79",
      bullets: ["Tratamiento dirigido a las malezas de su jardín", "Frente, patio y los puntos más difíciles", "Notas de seguimiento sobre qué esperar"],
      href: "/es/control-de-malezas",
    },
  ],
  combo: "Combo corte + fertilización: 15% de descuento en el segundo servicio.",
  howEyebrow: "Cómo funciona",
  howTitle: "Fotos primero. Precio claro. Jardín listo.",
  steps: [
    ["Envíe fotos del jardín", "Frente, patio y el punto más difícil. Treinta segundos desde su teléfono."],
    ["Precio firme en minutos", "Precio según sus fotos y confirmado antes de agendar. El número no cambia al llegar."],
    ["Agendamos su día", "Elija el día que le convenga. Llegamos, hacemos el trabajo y dejamos todo limpio."],
  ],
  areasEyebrow: "Área de servicio",
  areasTitle: "Con orgullo servimos Dallas–Fort Worth.",
  areasText: "Nuestros equipos locales recorren el Metroplex cada semana. Toque su ciudad para ver lo que hacemos allí.",
  reviewsEyebrow: "El estilo LoveMeAfter",
  reviewsTitle: "Cuidamos los detalles que ve todos los días.",
  reviews: [
    ["Sin dudas al llegar. Cotizamos con las fotos de su jardín y confirmamos el precio total antes de agendar.", "Precio claro"],
    ["El corte es solo una parte: definimos los bordes de banquetas y entradas, y dejamos limpias las superficies duras.", "Un acabado completo"],
    ["Cuidamos los jardines, las puertas y las zonas que necesitan atención extra, no solo las partes fáciles.", "Respeto por su propiedad"],
  ],
  reviewsNote: "Compartiremos fotos reales de trabajos de césped cuando estén disponibles.",
  faqEyebrow: "Respuestas claras",
  faqTitle: "Preguntas de los dueños de casa",
  faqs: [
    ["¿Cada trabajo es realmente puntual?", "Sí. Usted agenda un solo trabajo a un precio firme y lo hacemos bien. Si desea que volvamos, lo cotizamos como otro trabajo puntual."],
    ["¿Cómo se calcula el precio?", "Precio según sus fotos, confirmado antes de agendar. Un corte + borde + soplado puntual cuesta $59–$99 según el terreno. La fertilización empieza en $99 y el control de malezas en $79. Con el combo corte + fertilización obtiene 15% de descuento en el segundo servicio."],
    ["¿Qué incluye el corte?", "Un corte parejo a la altura ideal, bordes definidos en banquetas, entradas y jardineras, y soplado completo de todas las superficies duras."],
    ["¿Necesito estar en casa?", "No. Solo asegúrese de que las puertas del patio estén abiertas y las mascotas adentro. Le avisaremos cuando estemos en camino y al terminar."],
    ["¿Qué tan rápido pueden ir?", "Agendado hoy, cortado mañana. Envíe fotos cuando quiera y le llamaremos en 5 minutos con su precio firme en horario de atención."],
    ["¿Qué áreas cubren?", "Dallas–Fort Worth: Dallas, Fort Worth, Arlington, Plano, Garland e Irving. Si está cerca del Metroplex, llame al " + PHONE_DISPLAY + " y lo confirmamos."],
  ],
  finalTitle: "Su jardín, listo esta semana.",
  finalText: "Envíe unas fotos ahora o simplemente llame. De cualquier forma, tendrá un precio firme antes de agendar.",
};

export default function LawnHome({ spanish = false }: { spanish?: boolean }) {
  const copy = spanish ? ES : EN;
  const reduceMotion = useReducedMotion();
  const canonical = spanish ? "https://lovemeafter.com/es" : "https://lovemeafter.com/";

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = spanish ? "es" : "en";
    return () => { document.documentElement.lang = previousLanguage; };
  }, [spanish]);

  usePageMeta(
    spanish ? "Cuidado de césped en Texas | LoveMeAfter Lawn Care" : "Texas Lawn Care — Mowing, Fertilization & Weed Control | LoveMeAfter",
    spanish ? "Corte de césped, fertilización y control de malezas como trabajos puntuales en Dallas–Fort Worth. Precio firme según sus fotos, confirmado antes de agendar." : "One-time mowing, fertilization, and weed control in Dallas–Fort Worth. Priced from your photos, confirmed before we book. Call (424) 426-0760.",
    canonical,
  );

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  }).replace(/</g, "\\u003c");

  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.14 }, transition: { duration: 0.45 } };

  return (
    <div className="flex min-h-screen flex-col bg-[#fffefa]">
      <TopNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#12304d] text-white">
          <img
            src="/images/products/imgi_5_Alside_CHO_Beauty5-1024x551.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#102b45]/95 via-[#12304d]/75 to-[#12304d]/25" />
          <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
            <p className={eyebrow + " text-[#ffdfa0]"}>{copy.heroEyebrow}</p>
            <h1 className="mt-4 max-w-[15ch] text-4xl leading-[1.02] sm:text-6xl lg:text-[4.5rem]">{copy.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">{copy.heroText}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={PHONE_HREF} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#fffefa] px-6 py-3 text-base font-bold text-[#0b3f78] transition hover:bg-[#f4ead7]">
                <Phone className="size-5" />{copy.callCta} {PHONE_DISPLAY}
              </a>
              <Link to="/get-quote" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/60 bg-[#fffefa]/10 px-6 py-3 text-base font-bold text-white transition hover:bg-[#fffefa]/20">
                {copy.quoteCta}<ArrowRight className="size-4" />
              </Link>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/85">
              <Sprout className="size-4 text-[#ffdfa0]" />{copy.heroPrice}
            </p>
          </div>
        </section>

        {/* Before / after band */}
        <motion.section {...reveal} className="border-b border-[#1c2620]/10 bg-[#fffaf0]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className={eyebrow}>{copy.beforeAfterEyebrow}</p>
                <h2 className="mt-3 max-w-[13ch] text-3xl leading-[1.05] text-[#12304d] sm:text-5xl">{copy.beforeAfterTitle}</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-[#5d6268]">{copy.beforeAfterText}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <figure className="overflow-hidden rounded-xl bg-[#fffaf0]">
                  <ExteriorPhoto
                    src="/images/products/imgi_5_Alside_CHO_Beauty5-1024x551.jpg"
                    alt={spanish ? "Exterior de una casa en un proyecto de mejoras para el hogar" : "Home exterior from a home-improvement project"}
                    className="aspect-[4/5] sm:aspect-[4/3]"
                  />
                </figure>
                <figure className="overflow-hidden rounded-xl bg-[#fffaf0]">
                  <ExteriorPhoto
                    src="/images/products/imgi_7_Alside_GreenbriarVintage_Beauty-683x1024.png"
                    alt={spanish ? "Detalle del exterior de una casa en un proyecto de mejoras para el hogar" : "Home exterior detail from a home-improvement project"}
                    className="aspect-[4/5] sm:aspect-[4/3]"
                  />
                </figure>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Services */}
        <motion.section {...reveal} id="services" className="scroll-mt-20 bg-[#fffefa]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <p className={eyebrow}>{copy.servicesEyebrow}</p>
            <h2 className="mt-3 max-w-[18ch] text-3xl leading-[1.05] text-[#12304d] sm:text-5xl">{copy.servicesTitle}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {copy.services.map((service) => (
                <article key={service.name} className="flex flex-col rounded-xl border border-[#1c2620]/12 bg-[#fffefa] p-6">
                  <h3 className="text-2xl text-[#12304d]">{service.name}</h3>
                  <p className="mt-2 text-lg font-extrabold text-[#174f8d]">{service.price}</p>
                  <p className="mt-1 text-xs font-semibold text-[#5d6268]">{service.detail}</p>
                  <ul className="mt-5 space-y-2.5">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-sm leading-6 text-[#3d4650]">
                        <Check className="mt-1 size-4 shrink-0 text-[#a36a27]" />{bullet}
                      </li>
                    ))}
                  </ul>
                  <Link to={service.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#174f8d] hover:text-[#0b3f78]">
                    {spanish ? "Ver detalles" : "See what’s included"}<ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-6 rounded-md bg-[#f4ead7] px-4 py-3 text-sm font-semibold text-[#0b3f78]">{copy.combo}</p>
          </div>
        </motion.section>

        {/* How it works */}
        <motion.section {...reveal} className="bg-[#12304d] text-white">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <p className={eyebrow + " text-[#ffdfa0]"}>{copy.howEyebrow}</p>
            <h2 className="mt-3 max-w-[16ch] text-3xl leading-[1.05] sm:text-5xl">{copy.howTitle}</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {copy.steps.map(([title, text], index) => (
                <div key={title} className="border-t border-white/25 pt-5">
                  <span className="text-sm font-extrabold text-[#ffdfa0]">0{index + 1}</span>
                  <h3 className="mt-3 text-2xl">{title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Service area strip */}
        <motion.section {...reveal} className="border-b border-[#1c2620]/10 bg-[#fffaf0]">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <p className={eyebrow}>{copy.areasEyebrow}</p>
                <h2 className="mt-3 max-w-[14ch] text-3xl leading-[1.05] text-[#12304d] sm:text-4xl">{copy.areasTitle}</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#5d6268]">{copy.areasText}</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {([["dallas", "Dallas"], ["fort-worth", "Fort Worth"], ["arlington", "Arlington"], ["plano", "Plano"], ["garland", "Garland"], ["irving", "Irving"]] as const).map(([slug, name]) => (
                  <Link key={slug} to={`/areas/texas/${slug}`} className="rounded-full border border-[#174f8d]/25 bg-[#fffefa] px-5 py-2.5 text-sm font-semibold text-[#0b3f78] transition hover:border-[#174f8d] hover:bg-[#f4ead7]">
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Reviews */}
        <motion.section {...reveal} className="bg-[#fffefa]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <p className={eyebrow}>{copy.reviewsEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-[1.05] text-[#12304d] sm:text-5xl">{copy.reviewsTitle}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {copy.reviews.map(([quote, author], index) => (
                <article key={author} className="border-t-2 border-[#b98555] bg-[#fffefa] p-6">
                  <span aria-hidden="true" className="text-xs font-extrabold tracking-[.16em] text-[#a56f3f]">0{index + 1} / LOVE ME AFTER</span>
                  <p className="mt-5 text-lg font-semibold leading-7 text-[#26313d]">{quote}</p>
                  <p className="mt-5 text-xs font-bold tracking-[.08em] text-[#5d6268] uppercase">{author}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 text-xs text-[#5d6268]">{copy.reviewsNote}</p>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section {...reveal} id="faq" className="scroll-mt-20 bg-[#fffaf0]">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <p className={eyebrow}>{copy.faqEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-[1.05] text-[#12304d] sm:text-5xl">{copy.faqTitle}</h2>
            <div className="mt-8 divide-y divide-[#1c2620]/12 border-y border-[#1c2620]/12">
              {copy.faqs.map(([question, answer]) => (
                <details key={question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 text-base font-bold text-[#12304d] marker:content-none">
                    {question}
                    <span aria-hidden="true" className="float-right text-[#a36a27] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[#4e5964]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
        </motion.section>

        {/* Final CTA */}
        <section className="bg-[#174f8d] text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-[16ch] text-3xl leading-[1.05] sm:text-4xl">{copy.finalTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">{copy.finalText}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={PHONE_HREF} className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#fffefa] px-6 py-3 text-sm font-bold text-[#0b3f78] transition hover:bg-[#f4ead7]">
                <Phone className="size-4" />{copy.callCta} {PHONE_DISPLAY}
              </a>
              <Link to="/get-quote" className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-[#fffefa]/10">
                {copy.quoteCta}<ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter spanish={spanish} />
    </div>
  );
}

export function LawnHomeEnglish() {
  return <LawnHome />;
}

export function LawnHomeSpanish() {
  return <LawnHome spanish />;
}
