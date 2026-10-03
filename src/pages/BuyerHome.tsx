import { useEffect, type ReactNode } from "react";
import { Link } from "react-router";
import { usePageMeta } from "@/components/PageMeta";
import { LogoMark } from "@/components/Logo";
import { PHOTO_CREDIT_URL, px } from "@/data/photos";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const PHONE = "424-426-0760";
const PHONE_HREF = "tel:+14244260760";

type Copy = {
  nav: string[];
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  house: string;
  land: string;
  call: string;
  trust: string[];
  processEyebrow: string;
  processTitle: string;
  steps: [string, string][];
  whyEyebrow: string;
  whyTitle: string;
  benefits: [string, string][];
  constructionEyebrow: string;
  constructionTitle: string;
  constructionText: string;
  constructionPhotos: [string, number][];
  constructionPhotoNote: string;
  propertyPhotos: [string, number][];
  explore: string;
  situationsEyebrow: string;
  situationsTitle: string;
  situations: string[];
  faqEyebrow: string;
  faqTitle: string;
  faqs: [string, string][];
  statesTitle: string;
  statesText: string;
  finalTitle: string;
  finalText: string;
  footerClaim: string;
  investors: string;
  refer: string;
  privacy: string;
  terms: string;
};

const EN: Copy = {
  nav: ["Sell your house", "Sell land", "Construction", "Investors", "Refer"],
  heroEyebrow: "LoveMeAfter Home Buyers · Houses & land",
  heroTitle: "A considered way forward—for you and your property.",
  heroText: "When a home or piece of land no longer fits your plans, the right next step deserves a little care. Tell us what matters, and we’ll have a straightforward conversation about the property and whether a sale might make sense. We accept inquiries nationwide and confirm whether we can review the location.",
  house: "Sell your house",
  land: "Sell your land",
  call: "Talk with us",
  trust: ["Houses, land, and homes that need work", "A person-to-person conversation", "Any proposed terms shared in writing"],
  processEyebrow: "A personal approach",
  processTitle: "A thoughtful process, at your pace.",
  steps: [["Tell us the situation", "Where is the property? What’s its condition? What would you like to happen next?"], ["We take a closer look", "We review the property details and confirm whether we can consider its location."], ["Decide with the facts", "If there may be a fit, we’ll talk through possible terms and share them in writing for you to review." ]],
  whyEyebrow: "A more considered approach",
  whyTitle: "Every property deserves a closer look.",
  benefits: [["Start with your situation", "No need to have the perfect words or every answer. Tell us what’s happening."], ["We understand the work", "We also do residential construction. If we buy a home, we can put that experience to work improving it for its next chapter."], ["Houses and land", "Ask about a house, a vacant property, or land. We’ll help you find the right place to start."], ["A property that needs attention", "Inherited, dated, vacant, or full of unfinished repairs? Share what you know; we’ll take it from there together."], ["Terms you can review", "If there may be a fit, we’ll explain the possible terms and put them in writing."], ["Room to make your decision", "An initial conversation isn’t an agreement to sell. Consider your options and decide what feels right for you."]],
  constructionEyebrow: "A buyer who understands the work",
  constructionTitle: "We know a house is more than its punch list.",
  constructionText: "We also do residential construction. That experience helps us see what a home may need beyond a quick walkthrough. If we buy it, we can put those skills toward thoughtful upgrades for its next chapter. The sale and any construction work are separate decisions.",
  constructionPhotos: [["Home renovation on scaffolding", 27134625], ["Indoor renovation work", 32990521], ["Worker repairing a home", 16767783]],
  constructionPhotoNote: "Illustrative construction photos · Pexels",

  propertyPhotos: [["Aerial view of farmland", 7457220], ["Suburban neighborhood from above", 17286412], ["White home exterior with a front porch", 5661021], ["Close detail of a house roof", 10025299], ["Bright kitchen interior", 19807422], ["Home exterior beside a garden", 12608773], ["Cultivated agricultural land", 7457218], ["Older suburban home", 8579963]],
  explore: "Explore construction services",
  situationsEyebrow: "Properties aren’t all alike",
  situationsTitle: "You may be dealing with…",
  situations: ["An inherited property", "Repairs that have piled up", "A vacant house", "A move out of the area", "A rental you’re tired of managing", "Land that’s hard to use or sell"],
  faqEyebrow: "The plain answers",
  faqTitle: "Questions sellers ask",
  faqs: [
    ["Does an inquiry mean I have an offer?", "No. It gives us information to review. It isn’t an offer, contract, or promise to buy. Any purchase terms would need to be in a written agreement."],
    ["Will you buy a house or land in my state?", "You can send an inquiry from any state. We’ll confirm whether we can review that location before discussing a purchase. Sending details doesn’t mean we can buy there."],
    ["How do you decide whether a property may fit?", "We start with a conversation about the location, condition, and your situation. If there may be a fit, we’ll talk through any possible terms directly and provide them in writing for you to review."],
    ["What if the property needs work?", "Tell us about its condition when you call. We’ll review the details and discuss whether there may be a next step."],
    ["Can the purchase contract be assigned?", "An assignment may be proposed only where the agreement and applicable law allow it. Any proposed assignment and our role must be disclosed in writing before you sign, as required."],
    ["How soon could a sale close?", "There isn’t one timeline for every property. Location, title, the parties, and any written terms affect timing. We’ll discuss a timeline only if there’s a possible fit."],
  ],
  statesTitle: "A conversation can start wherever you are.",
  statesText: "We accept inquiries about houses and land from all 50 states. We’ll confirm whether we can review a specific location before discussing a purchase. This isn’t a claim that we’ve bought property in every state.",
  finalTitle: "Tell us about your property.",
  finalText: "Whether the property is a house or a stretch of land, the first step can be simple: tell us what’s happening and what you hope comes next.",
  footerClaim: "Inquiries from all 50 states.",
  investors: "Investors",
  refer: "Refer a property",
  privacy: "Privacy",
  terms: "Terms",
};

const ES: Copy = {
  nav: ["Vender su casa", "Vender terreno", "Construcción", "Inversionistas", "Referir"],
  heroEyebrow: "LoveMeAfter Home Buyers · Casas y terrenos",
  heroTitle: "Un camino considerado para usted y su propiedad.",
  heroText: "Cuando una casa o un terreno ya no encaja con sus planes, merece pensar con calma en el próximo paso. Cuéntenos qué es importante para usted y hablaremos con claridad sobre la propiedad y si una venta podría tener sentido. Aceptamos consultas de todo el país y confirmaremos si podemos revisar esa ubicación.",
  house: "Vender su casa",
  land: "Vender su terreno",
  call: "Hable con nosotros",
  trust: ["Casas, terrenos y propiedades que necesitan trabajo", "Una conversación personal", "Términos propuestos por escrito"],
  processEyebrow: "Un trato personal",
  processTitle: "Un proceso atento, a su ritmo.",
  steps: [["Cuéntenos la situación", "¿Dónde está la propiedad? ¿En qué estado se encuentra? ¿Qué le gustaría que ocurriera?"], ["La revisamos con atención", "Revisamos los detalles y confirmamos si podemos considerar esa ubicación."], ["Decida con la información", "Si podría haber una opción, hablaremos de los posibles términos y se los daremos por escrito para que los revise." ]],
  whyEyebrow: "Una forma más considerada",
  whyTitle: "Cada propiedad merece una mirada atenta.",
  benefits: [["Empezamos por su situación", "No necesita encontrar las palabras perfectas ni tener todas las respuestas. Cuéntenos qué ocurre."], ["Entendemos el trabajo", "También hacemos construcción residencial. Si compramos una casa, podemos usar esa experiencia para mejorarla de cara a su próxima etapa."], ["Casas y terrenos", "Consulte por una casa, una propiedad vacía o un terreno. Le ayudaremos a encontrar el punto de partida adecuado."], ["Una propiedad que necesita atención", "¿Heredada, antigua, vacía o con reparaciones pendientes? Comparta lo que sabe; lo revisaremos juntos."], ["Términos para revisar", "Si podría haber una opción, explicaremos los posibles términos y se los daremos por escrito."], ["Tiempo para decidir", "Una conversación inicial no es un acuerdo de venta. Considere sus opciones y decida qué le conviene." ]],
  constructionEyebrow: "Un comprador que entiende el trabajo",
  constructionTitle: "Una casa es más que una lista de reparaciones.",
  constructionText: "También hacemos construcción residencial. Esa experiencia nos ayuda a ver lo que una casa podría necesitar más allá de una visita rápida. Si la compramos, podemos usar nuestras habilidades para hacer mejoras bien pensadas para su próxima etapa. La venta y cualquier trabajo de construcción son decisiones distintas.",
  constructionPhotos: [["Renovación de una casa con andamios", 27134625], ["Trabajo de renovación interior", 32990521], ["Reparación exterior de una casa", 16767783]],
  constructionPhotoNote: "Fotos ilustrativas de construcción · Pexels",

  propertyPhotos: [["Vista aérea de terreno agrícola", 7457220], ["Barrio residencial visto desde arriba", 17286412], ["Exterior de una casa blanca con porche", 5661021], ["Detalle del techo de una casa", 10025299], ["Interior luminoso de una cocina", 19807422], ["Exterior de una casa junto a un jardín", 12608773], ["Terreno agrícola cultivado", 7457218], ["Casa suburbana antigua", 8579963]],
  explore: "Ver servicios de construcción",
  situationsEyebrow: "Cada propiedad es distinta",
  situationsTitle: "Quizás se encuentre ante…",
  situations: ["Una propiedad heredada", "Reparaciones pendientes", "Una casa vacía", "Una mudanza a otro lugar", "Una propiedad de alquiler difícil de administrar", "Un terreno difícil de usar o vender"],
  faqEyebrow: "Respuestas claras",
  faqTitle: "Preguntas de vendedores",
  faqs: [
    ["¿Enviar una consulta significa que ya tengo una oferta?", "No. Nos da información para revisar. No es una oferta, un contrato ni una promesa de compra. Cualquier término de compra tendría que constar en un acuerdo por escrito."],
    ["¿Comprarán una casa o un terreno en mi estado?", "Puede enviar una consulta desde cualquier estado. Confirmaremos si podemos revisar esa ubicación antes de hablar de una compra. Enviar los datos no significa que podamos comprar allí."],
    ["¿Cómo deciden si una propiedad podría ser adecuada?", "Comenzamos conversando sobre la ubicación, el estado y su situación. Si podría haber una opción, hablaremos directamente sobre los posibles términos y se los daremos por escrito para que los revise."],
    ["¿Qué pasa si la propiedad necesita reparaciones?", "Cuéntenos sobre su estado cuando llame. Revisaremos los detalles y hablaremos sobre si podría haber un próximo paso."],
    ["¿Se puede ceder el contrato de compra?", "Solo se podría proponer una cesión cuando lo permitan el acuerdo y la ley aplicable. Cualquier cesión propuesta y nuestra función deben divulgarse por escrito antes de que usted firme, según corresponda."],
    ["¿Cuánto tardaría el cierre?", "No hay un plazo igual para todas las propiedades. La ubicación, el título, las partes y los términos escritos influyen en el tiempo. Solo hablaremos de un plazo si puede haber una opción."],
  ],
  statesTitle: "La conversación puede comenzar desde donde esté.",
  statesText: "Aceptamos consultas sobre casas y terrenos de los 50 estados. Confirmaremos si podemos revisar una ubicación específica antes de hablar de una compra. Esto no significa que hayamos comprado propiedades en todos los estados.",
  finalTitle: "Cuéntenos sobre su propiedad.",
  finalText: "Ya sea una casa o un terreno, el primer paso puede ser sencillo: cuéntenos qué ocurre y qué espera para el futuro.",
  footerClaim: "Consultas desde los 50 estados.",
  investors: "Inversionistas",
  refer: "Referir una propiedad",
  privacy: "Privacidad",
  terms: "Términos",
};

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const buttonPrimary = `inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-semibold tracking-[.01em] text-black transition hover:bg-white/85 ${FOCUS}`;
const buttonSecondary = `inline-flex min-h-12 items-center justify-center gap-2 px-1 py-3 text-sm font-medium text-white underline decoration-white/60 underline-offset-4 transition hover:text-white/70 hover:decoration-white ${FOCUS}`;
function PhotoSlot({ label, src, className = "", eager = false }: { label: string; src: string; className?: string; eager?: boolean }) {
  return (
    <div className={`relative isolate overflow-hidden border border-white/15 bg-black ${className}`}>
      <img src={src} alt={label} width="1200" height="900" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 hover:scale-[1.03]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}

function LeadLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link className={secondary ? buttonSecondary : buttonPrimary} to={href}>{children}</Link>;
}

export default function BuyerHome({ spanish = false }: { spanish?: boolean }) {
  const copy = spanish ? ES : EN;
  const reduceMotion = useReducedMotion();
  const housePath = spanish ? "/es/vender-casa" : "/sell-your-house";
  const landPath = spanish ? "/es/vender-terreno" : "/sell-your-land";
  const canonical = spanish ? "https://lovemeafter.com/es" : "https://lovemeafter.com/";
  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = spanish ? "es" : "en";
    return () => { document.documentElement.lang = previousLanguage; };
  }, [spanish]);
  usePageMeta(
    spanish ? "Compramos casas y terrenos | LoveMeAfter Home Buyers" : "We Buy Houses & Land | LoveMeAfter Home Buyers",
    spanish ? "Envíe una consulta sobre una casa o un terreno desde cualquier estado. Revisaremos la ubicación antes de hablar de una posible compra." : "Send an inquiry about a house or land from any state. We’ll review the location before discussing a possible purchase.",
    canonical,
  );

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  }).replace(/</g, "\\u003c");

  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.14 }, transition: { duration: 0.45 } };

  return (
    <main className="relative isolate min-h-screen bg-black text-white [color-scheme:dark]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center grayscale"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.34), rgba(0,0,0,.58)), url("${px(5524336, 1800)}")` }}
      />
      <div role="banner" className="sticky top-0 z-40 border-b border-white/15 bg-black/75 text-white backdrop-blur-md">
        <div role="navigation" aria-label={spanish ? "Navegación principal" : "Main navigation"} className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8 lg:px-10">
          <Link to={spanish ? "/es" : "/"} aria-label="LoveMeAfter Home Buyers" className="flex shrink-0 items-center"><LogoMark className="size-10 sm:size-11" /></Link>
          <div className="hidden items-center gap-5 text-[11px] font-medium tracking-[.04em] text-white/85 lg:flex xl:gap-7 xl:text-xs">
            <Link to={housePath} className={`hover:text-white/65 ${FOCUS}`}>{copy.nav[0]}</Link>
            <Link to={landPath} className={`hover:text-white/65 ${FOCUS}`}>{copy.nav[1]}</Link>
            <a href="#construction" className={`hover:text-white/65 ${FOCUS}`}>{copy.nav[2]}</a>
            <Link to="/investors" className={`hover:text-white/65 ${FOCUS}`}>{copy.nav[3]}</Link>
            <Link to="/refer" className={`hover:text-white/65 ${FOCUS}`}>{copy.nav[4]}</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to={spanish ? "/" : "/es"} lang={spanish ? "en" : "es"} className={`px-2 py-2 text-xs font-semibold text-white/70 hover:text-white ${FOCUS}`} aria-label={spanish ? "Read in English" : "Leer en español"}>{spanish ? "English" : "Español"}</Link>
            <a href={PHONE_HREF} className={`inline-flex min-h-10 items-center justify-center gap-2 border-b border-white/60 px-2 text-xs font-semibold text-white transition hover:border-white hover:text-white/70 ${FOCUS}`} aria-label={`${copy.call} ${PHONE}`}><Phone className="size-4" /><span className="sm:hidden">{spanish ? "Llamar" : "Call"}</span><span className="hidden sm:inline">{PHONE}</span></a>
          </div>
        </div>
        <div role="navigation" aria-label={spanish ? "Enlaces rápidos" : "Quick links"} className="mx-auto flex max-w-7xl gap-5 overflow-x-auto border-t border-white/10 px-4 pb-3 pt-2 text-xs font-semibold text-white/85 lg:hidden">
          <Link to={spanish ? "/es/vender-casa" : "/sell-your-house"} className={`shrink-0 text-white ${FOCUS}`}>{copy.nav[0]}</Link>
          <Link to={spanish ? "/es/vender-terreno" : "/sell-your-land"} className={`shrink-0 text-white ${FOCUS}`}>{copy.nav[1]}</Link>
          <a href="#construction" className={`shrink-0 text-white/65 ${FOCUS}`}>{copy.nav[2]}</a>
          <Link to="/investors" className={`shrink-0 text-white/65 ${FOCUS}`}>{copy.nav[3]}</Link>
          <Link to="/refer" className={`shrink-0 text-white/65 ${FOCUS}`}>{copy.nav[4]}</Link>
        </div>
      </div>

      <section className="border-b border-white/15">
        <div className="mx-auto flex min-h-[72vh] max-w-7xl items-center bg-black/42 px-5 py-16 backdrop-blur-[2px] sm:px-8 sm:py-20 lg:min-h-[78vh] lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[.2em] text-white/70 uppercase sm:text-[11px]">{copy.heroEyebrow}</p>
            <h1 className="mt-5 max-w-[13ch] text-5xl leading-[.93] tracking-[-.035em] sm:text-6xl lg:text-[5.25rem]">{copy.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">{copy.heroText}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={PHONE_HREF} className={buttonPrimary}><Phone className="size-4" />{copy.call} {PHONE}</a>
              <span className="text-xs text-white/70">{spanish ? "O" : "Or"}</span>
              <LeadLink href={housePath} secondary>{copy.house}<ArrowRight className="size-4" /></LeadLink>
              <LeadLink href={landPath} secondary>{copy.land}<ArrowRight className="size-4" /></LeadLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={spanish ? "Información sobre consultas" : "Inquiry details"} className="border-b border-white/15 bg-black/55 text-white backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl divide-y divide-white/15 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
          {copy.trust.map((item) => <div key={item} className="flex items-center gap-4 py-5 sm:px-5 lg:py-6"><span aria-hidden="true" className="h-px w-7 shrink-0 bg-white/60" /><span className="max-w-52 text-[11px] font-medium leading-5 tracking-[.025em] text-white/85">{item}</span></div>)}
        </div>
      </section>

      <motion.section {...reveal} className="mx-auto max-w-7xl bg-black/62 px-5 py-16 text-white backdrop-blur-sm sm:px-8 sm:py-24 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div><p className="text-[10px] font-semibold tracking-[.2em] text-white/70 uppercase">{copy.processEyebrow}</p><h2 className="mt-3 max-w-[13ch] text-4xl leading-[.98] sm:text-5xl">{copy.processTitle}</h2></div>
          <div role="list" className="grid gap-0 sm:grid-cols-3 sm:gap-7">
            {copy.steps.map(([title, text], index) => <div role="listitem" key={title} className="border-t border-white/20 py-5 sm:pt-5"><span className="font-serif text-3xl text-white/65">0{index + 1}</span><h3 className="mt-4 text-2xl">{title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-white/70">{text}</p></div>)}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="mx-auto max-w-7xl bg-black/62 px-5 py-16 text-white backdrop-blur-sm sm:px-8 sm:py-24 lg:px-10">
        <div className="mb-9 grid gap-4 md:grid-cols-[.75fr_1.25fr] md:items-end"><div><p className="text-[10px] font-semibold tracking-[.2em] text-white/70 uppercase">{copy.whyEyebrow}</p><h2 className="mt-3 max-w-[14ch] text-4xl leading-none sm:text-5xl">{copy.whyTitle}</h2></div><p className="max-w-lg text-sm leading-6 text-white/70">{spanish ? "No hay dos propiedades ni dos decisiones iguales. Estas son algunas razones por las que la gente nos llama." : "No two properties—or decisions—are alike. Here are a few reasons people call us."}</p></div>
        <div className="grid gap-x-12 md:grid-cols-2">
          {copy.benefits.map(([title, text]) => <article key={title} className="border-t border-white/15 py-5 sm:py-6"><h3 className="text-2xl leading-tight">{title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-white/70">{text}</p></article>)}
        </div>
        <div aria-label={spanish ? "Fotos ilustrativas de casas y terrenos" : "Illustrative home and land photographs"} className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-12 md:auto-rows-[90px] md:gap-3 lg:auto-rows-[112px]">
          {copy.propertyPhotos.map(([label, id], index) => {
            const layout = ["col-span-2 md:col-span-7 md:row-span-3", "col-span-1 md:col-span-5 md:row-span-2", "col-span-1 md:col-span-5 md:row-span-2", "col-span-1 md:col-span-4 md:row-span-2", "col-span-1 md:col-span-4 md:row-span-2", "col-span-2 md:col-span-4 md:row-span-2", "col-span-1 md:col-span-4 md:row-span-2", "col-span-1 md:col-span-4 md:row-span-2"][index];
            return <div key={id} className={`group relative overflow-hidden bg-black ${layout}`}><PhotoSlot label={`${label} (illustrative stock photo)`} src={px(id, 1100)} className="absolute inset-0 h-full w-full" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-12 font-serif text-base text-white sm:px-5 sm:pb-5 sm:text-lg">{label}</span></div>;
          })}
        </div>
        <p className="mt-3 text-[10px] tracking-[.04em] text-white/70">Illustrative stock photography · <a href={PHOTO_CREDIT_URL} target="_blank" rel="noreferrer" className={`underline underline-offset-2 ${FOCUS}`}>Pexels License</a></p>
      </motion.section>

      <motion.section {...reveal} id="construction" className="scroll-mt-24 border-y border-white/15 bg-black/78 text-white backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="text-[10px] font-semibold tracking-[.2em] text-white/70 uppercase">{copy.constructionEyebrow}</p><h2 className="mt-3 max-w-[12ch] text-4xl leading-[.98] sm:text-5xl">{copy.constructionTitle}</h2><p className="mt-5 max-w-xl text-sm leading-6 text-white/70">{copy.constructionText}</p></div>
            <div><div className="grid grid-cols-12 items-end gap-2 border-l border-white/40 pl-3 sm:gap-3 sm:pl-5">{copy.constructionPhotos.map(([label, id], index) => { const photoSize = ["col-span-7", "col-span-5 -mb-6", "col-span-7 col-start-6"][index]; return <div key={id} className={`relative overflow-hidden ${photoSize}`}><PhotoSlot label={`${label} · illustrative construction stock photo`} src={px(id, 1000)} className={index === 1 ? "aspect-[4/5]" : "aspect-[5/4]"} /></div>; })}</div><div className="mt-5 flex flex-col justify-between gap-4 border-t border-white/20 pt-4 sm:flex-row sm:items-end"><p className="max-w-xs text-[10px] leading-4 tracking-[.03em] text-white/60">{copy.constructionPhotoNote} <a href={PHOTO_CREDIT_URL} target="_blank" rel="noreferrer" className={`underline underline-offset-2 ${FOCUS}`}>Pexels License</a></p><Link to="/services" className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white ${FOCUS}`}>{copy.explore}<ArrowUpRight className="size-4" /></Link></div></div>
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} id="situations" className="scroll-mt-24 border-y border-white/15 bg-black/58 text-white backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.7fr_1.3fr] lg:px-10"><div><p className="text-[10px] font-semibold tracking-[.2em] text-white/70 uppercase">{copy.situationsEyebrow}</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.situationsTitle}</h2></div><ul className="grid gap-x-10 sm:grid-cols-2">{copy.situations.map((situation) => <li key={situation} className="border-t border-white/20 py-4 text-base text-white/85">{situation}</li>)}</ul></div>
      </motion.section>

      <motion.section {...reveal} className="border-y border-white/15 bg-black/64 text-white backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24"><p className="text-[10px] font-semibold tracking-[.2em] text-white/70 uppercase">{copy.faqEyebrow}</p><h2 className="mt-3 text-4xl sm:text-5xl">{copy.faqTitle}</h2><div className="mt-7 divide-y divide-white/15 border-y border-white/15">{copy.faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className={`cursor-pointer list-none pr-8 text-base font-semibold text-white marker:content-none ${FOCUS}`}>{question}<span aria-hidden="true" className="float-right text-white/70 group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">{answer}</p></details>)}</div></div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      </motion.section>

      <motion.section {...reveal} className="border-b border-white/15 bg-black/58 text-white backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:px-10"><div><p className="text-[10px] font-semibold tracking-[.2em] text-white/70 uppercase">50 states · inquiries accepted</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.statesTitle}</h2></div><p className="max-w-2xl text-sm leading-6 text-white/70">{copy.statesText}</p></div>
      </motion.section>

      <section className="bg-black/62 text-white backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div><p className="text-[10px] font-semibold tracking-[.2em] text-white/70 uppercase">{spanish ? "Cuando esté listo" : "When you’re ready"}</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.finalTitle}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/70">{copy.finalText}</p></div><div className="flex flex-col gap-3 sm:items-start"><a href={PHONE_HREF} className={buttonPrimary}><Phone className="size-4" />{copy.call} {PHONE}</a><div className="flex flex-wrap items-center gap-4 text-xs"><LeadLink href={housePath} secondary>{copy.house}<ArrowRight className="size-4" /></LeadLink><LeadLink href={landPath} secondary>{copy.land}<ArrowRight className="size-4" /></LeadLink></div></div></div>
      </section>

      <footer className="border-t border-white/15 bg-black/82 text-white backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1fr_2fr] lg:px-10">
          <div><Link to={spanish ? "/es" : "/"} aria-label="LoveMeAfter Home Buyers" className="inline-flex items-center gap-3"><LogoMark className="size-10" /><span className="text-sm font-semibold">LoveMeAfter Home Buyers</span></Link><p className="mt-3 text-xs text-white/60">LoveMeAfter Home Buyers</p><a href={PHONE_HREF} className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white ${FOCUS}`}><Phone className="size-4" />{PHONE}</a><p className="mt-2 text-xs text-white/60">{copy.footerClaim}</p></div>
          <div role="navigation" aria-label={spanish ? "Enlaces del pie de página" : "Footer links"} className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-medium sm:grid-cols-3"><Link className={`hover:text-white/65 ${FOCUS}`} to={housePath}>{copy.house}</Link><Link className={`hover:text-white/65 ${FOCUS}`} to={landPath}>{copy.land}</Link><Link className={`hover:text-white/65 ${FOCUS}`} to="/investors">{copy.investors}</Link><Link className={`hover:text-white/65 ${FOCUS}`} to="/refer">{copy.refer}</Link><Link className={`hover:text-white/65 ${FOCUS}`} to="/services">{copy.nav[2]}</Link><Link className={`hover:text-white/65 ${FOCUS}`} to="/privacy">{copy.privacy}</Link><Link className={`hover:text-white/65 ${FOCUS}`} to="/terms">{copy.terms}</Link></div>
        </div>
        <div className="border-t border-white/15 px-5 py-4 text-center text-[11px] text-white/55">© LoveMeAfter · {copy.footerClaim}</div>
      </footer>
    </main>
  );
}

export function BuyerHomeEnglish() {
  return <BuyerHome />;
}

export function BuyerHomeSpanish() {
  return <BuyerHome spanish />;
}
