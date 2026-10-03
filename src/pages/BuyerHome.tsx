import { useEffect, type ReactNode } from "react";
import { Link } from "react-router";
import { usePageMeta } from "@/components/PageMeta";
import { LogoMark } from "@/components/Logo";
import { PHOTO_CREDIT_URL, px, pxPage } from "@/data/photos";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Clock3,
  House,
  MapPin,
  Phone,
  Trees,
  Wrench,
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
  photoLabel: string;
  photoNote: string;
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
  photoCredit: string;
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
  heroEyebrow: "LoveMeAfter Home Buyers",
  heroTitle: "Ready to let go of a house or land? Let’s talk about what comes next.",
  heroText: "Some properties hold a lifetime of memories. Others have become one more responsibility on a full plate. Either way, you deserve a thoughtful conversation—not a rushed answer. Call us to share what’s happening. We’ll listen, learn what matters, and talk through whether a sale could fit your next chapter. We accept inquiries nationwide and confirm whether we can review the location.",
  house: "Sell your house",
  land: "Sell your land",
  call: "Talk with us",
  photoLabel: "Suburban home exterior at sunset · illustrative stock photo",
  photoNote: "Illustrative stock photo. Not a LoveMeAfter project.",
  photoCredit: "Photo: Pexels",
  trust: ["A real conversation, without pressure", "Homes and land considered", "Clear next steps before any agreement"],
  processEyebrow: "Start where you are",
  processTitle: "A conversation can make the next step clearer.",
  steps: [["Tell us what’s going on", "Share the property’s location, condition, and what you need from a sale."], ["We look at the whole picture", "Our team reviews the property and confirms whether its location is one we can consider."], ["Talk through what could work", "If there may be a fit, we’ll discuss possible terms with you. You can review everything in writing before deciding." ]],
  whyEyebrow: "A better way to explore a sale",
  whyTitle: "A practical path through a personal decision.",
  benefits: [["Be heard first", "Tell us what’s happening in your own words. We’ll listen before we talk about the property."], ["Construction experience", "We work in construction and understand the work a home may need. If we buy it, we can put that experience toward improving the property for its next chapter."], ["Houses, vacant homes, and land", "Tell us what you own and what you’re hoping to do. We’ll help you find the right next step."], ["No need to make it picture-perfect", "Inherited, vacant, dated, or in need of work? Start with the facts you have. We’ll talk through the details together."], ["Clear terms, in writing", "If there may be a fit, we’ll explain the possible terms and give you time to review them in writing."], ["Your decision stays yours", "A conversation does not commit you to a sale. Take the time you need to decide what’s right for you."]],
  constructionEyebrow: "Our construction experience",
  constructionTitle: "We see more than the repair list.",
  constructionText: "We work in residential construction, so we know to look beyond what needs fixing. If we purchase a property, that experience can help us plan and carry out upgrades that make sense for its next chapter. A purchase and a construction project are separate decisions; any terms are discussed directly and provided in writing.",
  constructionPhotos: [["Home renovation on scaffolding", 27134625], ["Indoor renovation work", 32990521], ["Worker repairing a home", 16767783]],
  constructionPhotoNote: "Illustrative construction stock photos—not LoveMeAfter project photos.",
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
  statesTitle: "Send an inquiry from any state.",
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
  heroEyebrow: "LoveMeAfter Home Buyers",
  heroTitle: "¿Listo para dejar ir una casa o un terreno? Hablemos de lo que sigue.",
  heroText: "Algunas propiedades guardan toda una vida de recuerdos. Otras se han convertido en una responsabilidad más en medio de tantas cosas. En cualquier caso, merece una conversación atenta, no una respuesta apresurada. Llámenos y cuéntenos qué ocurre. Escucharemos, entenderemos lo que importa y hablaremos sobre si una venta podría encajar con su próxima etapa. Aceptamos consultas de todo el país y confirmaremos si podemos revisar esa ubicación.",
  house: "Vender su casa",
  land: "Vender su terreno",
  call: "Hable con nosotros",
  photoLabel: "Exterior de una casa suburbana al atardecer · foto de archivo ilustrativa",
  photoNote: "Foto de archivo ilustrativa. No es un proyecto de LoveMeAfter.",
  photoCredit: "Foto: Pexels",
  trust: ["Una conversación real, sin presión", "Casas y terrenos en consideración", "Próximos pasos claros antes de cualquier acuerdo"],
  processEyebrow: "Empiece desde donde está",
  processTitle: "Una conversación puede aclarar el próximo paso.",
  steps: [["Cuéntenos qué ocurre", "Comparta la ubicación, el estado de la propiedad y qué necesita de una venta."], ["Consideramos el panorama completo", "Nuestro equipo revisa la propiedad y confirma si podemos considerar esa ubicación."], ["Hablemos de lo que podría funcionar", "Si podría haber una opción, conversaremos sobre posibles términos. Podrá revisar todo por escrito antes de decidir." ]],
  whyEyebrow: "Una mejor forma de explorar una venta",
  whyTitle: "Un camino práctico para una decisión personal.",
  benefits: [["Primero, le escuchamos", "Cuéntenos lo que ocurre con sus propias palabras. Escucharemos antes de hablar de los detalles de la propiedad."], ["Experiencia en construcción", "Trabajamos en construcción y entendemos lo que una casa podría necesitar. Si la compramos, podemos usar esa experiencia para mejorarla de cara a su próxima etapa."], ["Casas, propiedades vacías y terrenos", "Cuéntenos qué tiene y qué espera hacer. Le ayudaremos a encontrar el siguiente paso adecuado."], ["No tiene que dejarla perfecta", "¿Heredada, vacía, antigua o necesita trabajo? Empiece con los datos que tenga. Hablaremos juntos de los detalles."], ["Términos claros y por escrito", "Si podría haber una opción, explicaremos los posibles términos y tendrá tiempo para revisarlos por escrito."], ["La decisión es suya", "Conversar no le compromete a vender. Tómese el tiempo necesario para decidir qué le conviene." ]],
  constructionEyebrow: "Nuestra experiencia en construcción",
  constructionTitle: "Vemos más que una lista de reparaciones.",
  constructionText: "Trabajamos en construcción residencial, así que miramos más allá de lo que necesita arreglo. Si compramos una propiedad, esa experiencia puede ayudarnos a planificar y realizar mejoras adecuadas para su próxima etapa. La compra y un proyecto de construcción son decisiones distintas; cualquier término se conversa directamente y se entrega por escrito.",
  constructionPhotos: [["Renovación de una casa con andamios", 27134625], ["Trabajo de renovación interior", 32990521], ["Reparación exterior de una casa", 16767783]],
  constructionPhotoNote: "Fotos de archivo ilustrativas de construcción; no son proyectos de LoveMeAfter.",
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
  statesTitle: "Envíe una consulta desde cualquier estado.",
  statesText: "Aceptamos consultas sobre casas y terrenos de los 50 estados. Confirmaremos si podemos revisar una ubicación específica antes de hablar de una compra. Esto no significa que hayamos comprado propiedades en todos los estados.",
  finalTitle: "Cuéntenos sobre su propiedad.",
  finalText: "Ya sea una casa o un terreno, el primer paso puede ser sencillo: cuéntenos qué ocurre y qué espera para el futuro.",
  footerClaim: "Consultas desde los 50 estados.",
  investors: "Inversionistas",
  refer: "Referir una propiedad",
  privacy: "Privacidad",
  terms: "Términos",
};

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#93442e]";
const buttonPrimary = `inline-flex min-h-12 items-center justify-center gap-2 bg-[#93442e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#793923] ${FOCUS}`;
const buttonSecondary = `inline-flex min-h-12 items-center justify-center gap-2 border border-[#252923]/25 bg-[#fbf9f3] px-5 py-3 text-sm font-semibold text-[#252923] transition hover:bg-[#e9e5db] ${FOCUS}`;
function PhotoSlot({ label, src, className = "", eager = false }: { label: string; src: string; className?: string; eager?: boolean }) {
  return (
    <div className={`relative isolate overflow-hidden border border-[#252923]/15 bg-[#dcd8cd] ${className}`}>
      <img src={src} alt={label} width="1200" height="900" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.03]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#191b17]/35 via-transparent to-transparent" />
      <a href={pxPage(Number(src.match(/photos\/(\d+)/)?.[1] ?? 0))} target="_blank" rel="noreferrer" className="absolute right-3 top-3 text-[9px] font-medium text-white/90 underline underline-offset-2 drop-shadow">Pexels</a>
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
    <main className="min-h-screen bg-[#f3f0e8] text-[#252923]">
      <div role="banner" className="sticky top-0 z-40 border-b border-[#252923]/10 bg-[#fbf9f3]/95 backdrop-blur">
        <div role="navigation" aria-label={spanish ? "Navegación principal" : "Main navigation"} className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 lg:px-10">
          <Link to={spanish ? "/es" : "/"} aria-label="LoveMeAfter Home Buyers" className="flex shrink-0 items-center"><LogoMark className="size-10 sm:size-11" /></Link>
          <div className="hidden items-center gap-4 text-xs font-semibold lg:flex xl:gap-6 xl:text-sm">
            <Link to={housePath} className={`hover:text-[#93442e] ${FOCUS}`}>{copy.nav[0]}</Link>
            <Link to={landPath} className={`hover:text-[#93442e] ${FOCUS}`}>{copy.nav[1]}</Link>
            <a href="#construction" className={`hover:text-[#93442e] ${FOCUS}`}>{copy.nav[2]}</a>
            <Link to="/investors" className={`hover:text-[#93442e] ${FOCUS}`}>{copy.nav[3]}</Link>
            <Link to="/refer" className={`hover:text-[#93442e] ${FOCUS}`}>{copy.nav[4]}</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to={spanish ? "/" : "/es"} lang={spanish ? "en" : "es"} className={`px-2 py-2 text-xs font-semibold text-[#65735b] hover:text-[#252923] ${FOCUS}`} aria-label={spanish ? "Read in English" : "Leer en español"}>{spanish ? "English" : "Español"}</Link>
            <a href={PHONE_HREF} className={`inline-flex min-h-10 items-center justify-center gap-2 bg-[#252923] px-3 text-xs font-semibold text-white hover:bg-[#41483f] ${FOCUS}`} aria-label={`${copy.call} ${PHONE}`}><Phone className="size-4" /><span className="sm:hidden">{spanish ? "Llamar" : "Call"}</span><span className="hidden sm:inline">{PHONE}</span></a>
          </div>
        </div>
        <div role="navigation" aria-label={spanish ? "Enlaces rápidos" : "Quick links"} className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 pb-3 text-xs font-semibold lg:hidden">
          <Link to={spanish ? "/es/vender-casa" : "/sell-your-house"} className={`shrink-0 text-[#93442e] ${FOCUS}`}>{copy.nav[0]}</Link>
          <Link to={spanish ? "/es/vender-terreno" : "/sell-your-land"} className={`shrink-0 text-[#93442e] ${FOCUS}`}>{copy.nav[1]}</Link>
          <a href="#construction" className={`shrink-0 text-[#62695f] ${FOCUS}`}>{copy.nav[2]}</a>
          <Link to="/investors" className={`shrink-0 text-[#62695f] ${FOCUS}`}>{copy.nav[3]}</Link>
          <Link to="/refer" className={`shrink-0 text-[#62695f] ${FOCUS}`}>{copy.nav[4]}</Link>
        </div>
      </div>

      <section className="border-b border-[#252923]/10">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-10 sm:px-8 sm:py-16 lg:grid-cols-[.96fr_1.04fr] lg:items-center lg:gap-12 lg:px-10 lg:py-20">
          <div>
            <p className="text-[10px] font-bold tracking-[.17em] text-[#65735b] uppercase sm:text-xs">{copy.heroEyebrow}</p>
            <h1 className="mt-4 max-w-[15ch] text-5xl leading-[.91] tracking-[-.045em] sm:text-6xl lg:text-7xl">{copy.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#62695f] sm:text-base sm:leading-7">{copy.heroText}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={PHONE_HREF} className={buttonPrimary}><Phone className="size-4" />{copy.call} {PHONE}</a>
              <LeadLink href={housePath} secondary>{copy.house}<ArrowRight className="size-4" /></LeadLink>
              <LeadLink href={landPath} secondary>{copy.land}<ArrowRight className="size-4" /></LeadLink>
            </div>
            <p className="mt-3 text-xs leading-5 text-[#62695f]">{spanish ? "Cuéntenos sobre la propiedad y hablaremos de los próximos pasos." : "Tell us about the property and we’ll talk through next steps."}</p>
          </div>
          <div className="relative min-h-[310px] sm:min-h-[420px]">
            <PhotoSlot label={copy.photoLabel} src={px(5524336, 1800)} eager className="absolute inset-0 min-h-[310px] sm:min-h-[420px]" />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-[#191b17]/80 to-transparent px-4 pb-4 pt-14 sm:px-5 sm:pb-5">
              <a href={pxPage(5524336)} target="_blank" rel="noreferrer" className={`text-[9px] text-white underline underline-offset-2 drop-shadow ${FOCUS}`}>{copy.photoCredit}</a>
              <span className="max-w-[65%] text-right text-[9px] leading-4 text-white/90 drop-shadow">{copy.photoNote}</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={spanish ? "Información sobre consultas" : "Inquiry details"} className="border-b border-[#252923]/10 bg-[#e9e5db]">
        <div className="mx-auto grid max-w-7xl divide-y divide-[#252923]/10 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-8 lg:grid-cols-3 lg:px-10">
          {copy.trust.map((item, index) => {
            const Icon = [MapPin, Phone, Clock3][index];
            return <div key={item} className="flex items-center gap-3 py-4 text-xs font-semibold leading-5 sm:px-4 lg:py-5"><Icon className="size-5 shrink-0 text-[#93442e]" /><span>{item}</span></div>;
          })}
        </div>
      </section>

      <motion.section {...reveal} className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{copy.processEyebrow}</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.processTitle}</h2></div>
          <div className="grid gap-0 sm:grid-cols-3 sm:gap-4">
            {copy.steps.map(([title, text], index) => <article key={title} className="border-t border-[#252923]/15 py-5 sm:border sm:bg-[#fbf9f3] sm:p-5"><span className="text-xs font-bold text-[#93442e]">0{index + 1}</span><h3 className="mt-3 text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#62695f]">{text}</p></article>)}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-8 max-w-2xl"><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{copy.whyEyebrow}</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.whyTitle}</h2></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {copy.benefits.map(([title, text], index) => {
            const Icon = [Phone, Wrench, House, MapPin, ClipboardList, Clock3][index];
            return <article key={title} className="border border-[#252923]/10 bg-[#fbf9f3] p-6 sm:p-7"><span className="flex size-11 items-center justify-center bg-[#e9e5db] text-[#93442e]"><Icon className="size-5" /></span><h3 className="mt-5 text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#62695f]">{text}</p></article>;
          })}
        </div>
        <div aria-label={spanish ? "Fotos ilustrativas de casas y terrenos" : "Illustrative home and land photographs"} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {copy.propertyPhotos.map(([label, id]) => <div key={id} className="group block overflow-hidden border border-[#252923]/10 bg-[#fbf9f3]"><PhotoSlot label={`${label} (illustrative stock photo)`} src={px(id, 900)} className="aspect-[4/3]" /><span className="block min-h-12 px-3 py-2 text-[11px] font-medium leading-4 text-[#62695f] group-hover:text-[#93442e]">{label}</span></div>)}
        </div>
        <p className="mt-3 text-[11px] text-[#696a60]">{copy.photoCredit} <a href={PHOTO_CREDIT_URL} target="_blank" rel="noreferrer" className={`underline underline-offset-2 ${FOCUS}`}>Pexels License</a></p>
      </motion.section>

      <motion.section {...reveal} id="construction" className="scroll-mt-24 bg-[#252923] text-[#fbf9f3]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="text-[10px] font-bold tracking-[.18em] text-[#d7b880] uppercase">{copy.constructionEyebrow}</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.constructionTitle}</h2><p className="mt-5 max-w-xl text-sm leading-6 text-white/75">{copy.constructionText}</p></div>
            <div><div className="grid grid-cols-3 gap-2 sm:gap-3">{copy.constructionPhotos.map(([label, id]) => <div key={id} className="group block overflow-hidden border border-white/15"><PhotoSlot label={`${label} · illustrative construction stock photo`} src={px(id, 800)} className="aspect-[4/5]" /><span className="block min-h-12 bg-white/[.06] px-2 py-2 text-[10px] leading-4 text-white/80 sm:px-3 sm:text-xs">{label}</span></div>)}</div><p className="mt-3 text-[10px] leading-4 text-white/60">{copy.constructionPhotoNote} <a href={PHOTO_CREDIT_URL} target="_blank" rel="noreferrer" className={`underline underline-offset-2 ${FOCUS}`}>Pexels License</a></p><Link to="/services" className={`mt-5 inline-flex min-h-12 items-center gap-2 border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white/10 ${FOCUS}`}>{copy.explore}<ArrowUpRight className="size-4" /></Link></div>
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} id="situations" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{copy.situationsEyebrow}</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.situationsTitle}</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{copy.situations.map((situation, index) => { const Icon = [House, Wrench, House, MapPin, ClipboardList, Trees][index]; const imageId = [22485304, 4916186, 8579963, 10628470, 18729447, 13324677][index]; return <article key={situation} className="overflow-hidden border border-[#252923]/10 bg-[#fbf9f3]"><PhotoSlot label={`${situation} · illustrative property stock photo`} src={px(imageId, 700)} className="aspect-[16/10]" /><div className="flex min-h-24 items-start gap-3 p-4"><Icon className="mt-0.5 size-4 shrink-0 text-[#93442e]" /><h3 className="text-lg leading-snug">{situation}</h3></div></article>; })}</div></div>
        <p className="mt-4 text-[11px] leading-5 text-[#696a60]">{copy.photoCredit} <a href={PHOTO_CREDIT_URL} target="_blank" rel="noreferrer" className={`underline underline-offset-2 ${FOCUS}`}>Pexels License</a></p>
      </motion.section>

      <motion.section {...reveal} className="border-y border-[#252923]/10 bg-[#fbf9f3]">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20"><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{copy.faqEyebrow}</p><h2 className="mt-3 text-4xl sm:text-5xl">{copy.faqTitle}</h2><div className="mt-7 divide-y divide-[#252923]/10 border-y border-[#252923]/10">{copy.faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className={`cursor-pointer list-none pr-8 text-base font-semibold marker:content-none ${FOCUS}`}>{question}<span aria-hidden="true" className="float-right text-[#93442e] group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-[#62695f]">{answer}</p></details>)}</div></div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      </motion.section>

      <motion.section {...reveal} className="border-b border-[#252923]/10 bg-[#e9e5db]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:px-10"><div><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">50 states · inquiries accepted</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.statesTitle}</h2></div><p className="max-w-2xl text-sm leading-6 text-[#62695f]">{copy.statesText}</p></div>
      </motion.section>

      <section className="bg-[#fbf9f3]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-10"><div><h2 className="text-4xl leading-none sm:text-5xl">{copy.finalTitle}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#62695f]">{copy.finalText}</p></div><div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"><a href={PHONE_HREF} className={buttonPrimary}><Phone className="size-4" />{copy.call} {PHONE}</a><LeadLink href={housePath} secondary>{copy.house}<ArrowRight className="size-4" /></LeadLink><LeadLink href={landPath} secondary>{copy.land}<ArrowRight className="size-4" /></LeadLink></div></div>
      </section>

      <footer className="border-t border-[#252923]/10 bg-[#f3f0e8]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:px-8 md:grid-cols-[1fr_2fr] lg:px-10">
          <div><Link to={spanish ? "/es" : "/"} aria-label="LoveMeAfter Home Buyers" className="inline-flex items-center gap-3"><LogoMark className="size-10" /><span className="text-sm font-semibold">LoveMeAfter Home Buyers</span></Link><p className="mt-3 text-xs text-[#62695f]">LoveMeAfter Home Buyers</p><a href={PHONE_HREF} className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#93442e] ${FOCUS}`}><Phone className="size-4" />{PHONE}</a><p className="mt-2 text-xs text-[#62695f]">{copy.footerClaim}</p></div>
          <div role="navigation" aria-label={spanish ? "Enlaces del pie de página" : "Footer links"} className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-medium sm:grid-cols-3"><Link className={`hover:text-[#93442e] ${FOCUS}`} to={housePath}>{copy.house}</Link><Link className={`hover:text-[#93442e] ${FOCUS}`} to={landPath}>{copy.land}</Link><Link className={`hover:text-[#93442e] ${FOCUS}`} to="/investors">{copy.investors}</Link><Link className={`hover:text-[#93442e] ${FOCUS}`} to="/refer">{copy.refer}</Link><Link className={`hover:text-[#93442e] ${FOCUS}`} to="/services">{copy.nav[2]}</Link><Link className={`hover:text-[#93442e] ${FOCUS}`} to="/privacy">{copy.privacy}</Link><Link className={`hover:text-[#93442e] ${FOCUS}`} to="/terms">{copy.terms}</Link></div>
        </div>
        <div className="border-t border-[#252923]/10 px-5 py-4 text-center text-[11px] text-[#696a60]">© LoveMeAfter · {copy.footerClaim}</div>
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
