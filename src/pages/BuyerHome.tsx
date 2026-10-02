import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { usePageMeta } from "@/components/PageMeta";
import { PHOTO_CREDIT_URL, px, pxPage } from "@/data/photos";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
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
  divisionNote: string;
  tradeoff: string;
  heroTitle: string;
  heroText: string;
  house: string;
  land: string;
  call: string;
  photoLabel: string;
  photoNote: string;
  teaser: string;
  trust: string[];
  calculatorHandoff: string;
  processEyebrow: string;
  processTitle: string;
  steps: [string, string][];
  calcEyebrow: string;
  calcTitle: string;
  calcText: string;
  value: string;
  repairs: string;
  range: string;
  sendNumbers: string;
  disclaimer: string;
  whyEyebrow: string;
  whyTitle: string;
  benefits: [string, string][];
  constructionEyebrow: string;
  constructionTitle: string;
  constructionText: string;
  videoLabel: string;
  videoNote: string;
  photoSlots: string[];
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
  calculated: string;
  formula: string;
};

const EN: Copy = {
  nav: ["Sell your house", "Sell land", "Construction", "Investors", "Refer"],
  heroEyebrow: "LoveMeAfter Home Buyers · A LoveMeAfter Construction company",
  divisionNote: "[NEEDS FACT: Confirm the Home Buyers division and LoveMeAfter Construction relationship before publishing this company attribution.]",
  heroTitle: "We buy houses and land.",
  heroText: "If a property needs work, is sitting empty, or no longer fits your plans, send us the details. We accept inquiries nationwide, then confirm whether we can review the location. A form isn’t an instant offer or cash payout.",
  house: "Sell your house",
  land: "Sell your land",
  call: "Call",
  photoLabel: "Suburban home exterior at sunset · illustrative stock photo",
  photoNote: "Illustrative stock photo. Not a LoveMeAfter project.",
  photoCredit: "Photo: Pexels",
  teaser: "Check a rough estimate · not an offer",
  trust: ["Inquiries accepted from all 50 states", "[NEEDS FACT] As-is purchases without repairs", "[NEEDS FACT] No agent commissions", "Discuss timing before any agreement"],
  tradeoff: "[NEEDS FACT: Confirm whether as-is purchases and no agent commissions apply to your deals before publishing those points as facts.]",
  calculatorHandoff: "Your estimates travel in the link, not an instant offer or cash payout. The existing inquiry form doesn’t import them yet, so include the figures in your notes if you’d like them reviewed.",
  processEyebrow: "A clear place to start",
  processTitle: "How it works",
  steps: [["Send the details", "Share the location, condition, and what you’re considering."], ["We review the property", "We’ll check the information and whether the location may fit."], ["Talk through written terms", "If there’s a possible fit, we’ll discuss terms in writing. You decide what to do next."]],
  calcEyebrow: "A starting point, not an offer",
  calcTitle: "Try a rough number",
  calcText: "Enter your estimate of the property’s value after repairs. The range applies a 65–70% factor, then subtracts your repair estimate and a $10,000 margin. This simple calculation can’t account for every cost or property detail.",
  value: "Estimated after-repair value ($)",
  repairs: "Estimated repairs ($)",
  range: "Rough starting range",
  sendNumbers: "Continue to the house inquiry",
  disclaimer: "This is a rough starting point, not an offer, appraisal, or promise to buy. Actual terms depend on review, location, costs, and a written agreement.",
  whyEyebrow: "What a direct sale can mean",
  whyTitle: "Three things to weigh",
  benefits: [["As-is inquiry", "You can ask about a purchase without finishing repairs first. The property still needs review, and any terms depend on a written agreement."], ["Repair costs in plain terms", "We’re contractors first. If a renovation path makes sense, we can talk through the work we see and what needs a closer look."], ["Clear next steps", "We’ll tell you what information we need and whether a conversation makes sense. There’s no obligation to accept terms."]],
  constructionEyebrow: "LoveMeAfter Construction",
  constructionTitle: "Backed by a real construction company.",
  constructionText: "We’re contractors first. That means we can read a property’s condition with a practical eye, and we have a crew if a renovation path makes sense. A home purchase and a construction project are separate decisions.",
  videoLabel: "Construction video [NEEDS FACT: confirm it shows LoveMeAfter work]",
  videoNote: "[NEEDS FACT: Confirm this video shows LoveMeAfter work and is approved for public use.]",
  photoSlots: ["[NEEDS PHOTO] Before", "[NEEDS PHOTO] During", "[NEEDS PHOTO] After"],
  propertyPhotos: [["Aerial view across farmland", 2264699], ["Older home exterior, shown as an example", 4916186], ["White home exterior with a front porch", 5661021], ["Close detail of a house roof", 10025299], ["Bright kitchen interior", 19807422], ["Home exterior beside a garden", 12608773], ["Aerial view across farm fields", 28412626], ["Open field bordered by trees", 21856659]],
  explore: "Explore construction services",
  situationsEyebrow: "Properties aren’t all alike",
  situationsTitle: "You may be dealing with…",
  situations: ["An inherited property", "Repairs that have piled up", "A vacant house", "A move out of the area", "A rental you’re tired of managing", "Land that’s hard to use or sell"],
  faqEyebrow: "The plain answers",
  faqTitle: "Questions sellers ask",
  faqs: [
    ["Does an inquiry mean I have an offer?", "No. It gives us information to review. It isn’t an offer, contract, or promise to buy. Any purchase terms would need to be in a written agreement."],
    ["Will you buy a house or land in my state?", "You can send an inquiry from any state. We’ll confirm whether we can review that location before discussing a purchase. Sending details doesn’t mean we can buy there."],
    ["Is a cash price usually lower than listing?", "Often, yes. A direct cash sale may avoid repairs, showings, and a longer sale process, but it can mean a lower price. Compare likely net proceeds. If listing appears to make more sense, we’ll say so."],
    ["Do I need to repair the property first?", "You can ask about an as-is purchase without completing repairs first. We still need to review the property, and no purchase is guaranteed."],
    ["Can the purchase contract be assigned?", "An assignment may be proposed only where the agreement and applicable law allow it. Any proposed assignment and our role must be disclosed in writing before you sign, as required."],
    ["How soon could a sale close?", "There isn’t one timeline for every property. Location, title, the parties, and any written terms affect timing. We’ll discuss a timeline only if there’s a possible fit."],
  ],
  statesTitle: "Send an inquiry from any state.",
  statesText: "We accept inquiries about houses and land from all 50 states. We’ll confirm whether we can review a specific location before discussing a purchase. This isn’t a claim that we’ve bought property in every state.",
  finalTitle: "Tell us about your property.",
  finalText: "Choose the page that fits, share the details, and we’ll review your inquiry.",
  footerClaim: "Inquiries from all 50 states.",
  investors: "Investors",
  refer: "Refer a property",
  privacy: "Privacy",
  terms: "Terms",
  calculated: "Estimated range",
  formula: "65–70% × after-repair value − repairs − $10,000",
};

const ES: Copy = {
  nav: ["Vender su casa", "Vender terreno", "Construcción", "Inversionistas", "Referir"],
  heroEyebrow: "LoveMeAfter Home Buyers · Una empresa de LoveMeAfter Construction",
  divisionNote: "[NEEDS FACT: Confirme la relación entre Home Buyers y LoveMeAfter Construction antes de publicar esta atribución empresarial.]",
  heroTitle: "Compramos casas y terrenos. Tal como están.",
  heroText: "Si una propiedad necesita reparaciones, está vacía o ya no encaja con sus planes, envíenos los datos. Aceptamos consultas de todo el país y confirmaremos si podemos revisar esa ubicación. El formulario no es una oferta inmediata ni un pago en efectivo.",
  house: "Vender su casa",
  land: "Vender su terreno",
  call: "Llamar",
  photoLabel: "Exterior de una casa suburbana al atardecer · foto de archivo ilustrativa",
  photoNote: "Foto de archivo ilustrativa. No es un proyecto de LoveMeAfter.",
  photoCredit: "Foto: Pexels",
  teaser: "Consulte un cálculo · no es una oferta",
  trust: ["Consultas desde los 50 estados", "[NEEDS FACT] Compra tal como está, sin reparar primero", "[NEEDS FACT] Sin comisiones de agente", "Hablemos del plazo antes de cualquier acuerdo"],
  tradeoff: "[NEEDS FACT: Confirme si las compras tal como están y la ausencia de comisiones de agente aplican a sus operaciones antes de publicar esos puntos como hechos.]",
  calculatorHandoff: "Los cálculos viajan en el enlace; no son una oferta ni un pago inmediato. El formulario actual aún no los importa. Si desea que los revisemos, incluya las cifras en sus notas.",
  processEyebrow: "Un comienzo claro",
  processTitle: "Cómo funciona",
  steps: [["Envíe los datos", "Comparta la ubicación, el estado y lo que está considerando."], ["Revisamos la propiedad", "Revisaremos la información y si la ubicación podría ser viable."], ["Hablamos de términos por escrito", "Si puede haber una opción, hablaremos de los términos por escrito. Usted decide qué hacer después."]],
  calcEyebrow: "Un punto de partida, no una oferta",
  calcTitle: "Calcule un rango aproximado",
  calcText: "Ingrese el valor estimado de la propiedad después de las reparaciones. El cálculo aplica un factor del 65–70% y luego resta el costo estimado de las reparaciones y un margen de $10,000. Este cálculo sencillo no contempla todos los costos ni los detalles de la propiedad.",
  value: "Valor estimado después de reparaciones ($)",
  repairs: "Reparaciones estimadas ($)",
  range: "Rango aproximado inicial",
  sendNumbers: "Continuar a la consulta sobre una casa",
  disclaimer: "Es un punto de partida aproximado, no una oferta, tasación ni promesa de compra. Los términos reales dependen de la revisión, la ubicación, los costos y un acuerdo por escrito.",
  whyEyebrow: "Lo que puede implicar una venta directa",
  whyTitle: "Tres cosas que debe considerar",
  benefits: [["Consulta para vender tal como está", "Puede preguntar por una posible compra sin terminar primero las reparaciones. Aún debemos revisar la propiedad y los términos dependen de un acuerdo por escrito."], ["Hablemos claramente de las reparaciones", "Somos contratistas primero. Si una renovación tiene sentido, podemos hablar del trabajo que vemos y de lo que requiere una revisión más detallada."], ["Próximos pasos claros", "Le diremos qué información necesitamos y si tiene sentido conversar. No tiene obligación de aceptar los términos."],],
  constructionEyebrow: "LoveMeAfter Construction",
  constructionTitle: "Con el respaldo de una empresa de construcción real.",
  constructionText: "Somos contratistas primero. Eso nos permite evaluar el estado de una propiedad con criterio práctico, y contamos con un equipo si una renovación tiene sentido. La compra de una casa y un proyecto de construcción son decisiones separadas.",
  videoLabel: "Video de construcción [NEEDS FACT: confirmar que muestra trabajo de LoveMeAfter]",
  videoNote: "[NEEDS FACT: Confirme que este video muestra trabajo de LoveMeAfter y que está aprobado para uso público.]",
  photoSlots: ["[NEEDS PHOTO] Antes", "[NEEDS PHOTO] Durante", "[NEEDS PHOTO] Después"],
  propertyPhotos: [["Vista aérea de terreno agrícola", 2264699], ["Exterior de una casa antigua como ejemplo", 4916186], ["Exterior de una casa blanca con porche", 5661021], ["Detalle del techo de una casa", 10025299], ["Interior luminoso de una cocina", 19807422], ["Exterior de una casa junto a un jardín", 12608773], ["Vista aérea de campos agrícolas", 28412626], ["Campo abierto junto a árboles", 21856659]],
  explore: "Ver servicios de construcción",
  situationsEyebrow: "Cada propiedad es distinta",
  situationsTitle: "Quizás se encuentre ante…",
  situations: ["Una propiedad heredada", "Reparaciones pendientes", "Una casa vacía", "Una mudanza a otro lugar", "Una propiedad de alquiler difícil de administrar", "Un terreno difícil de usar o vender"],
  faqEyebrow: "Respuestas claras",
  faqTitle: "Preguntas de vendedores",
  faqs: [
    ["¿Enviar una consulta significa que ya tengo una oferta?", "No. Nos da información para revisar. No es una oferta, un contrato ni una promesa de compra. Cualquier término de compra tendría que constar en un acuerdo por escrito."],
    ["¿Comprarán una casa o un terreno en mi estado?", "Puede enviar una consulta desde cualquier estado. Confirmaremos si podemos revisar esa ubicación antes de hablar de una compra. Enviar los datos no significa que podamos comprar allí."],
    ["¿El precio en efectivo suele ser menor que vender en el mercado?", "A menudo, sí. Una venta directa en efectivo puede evitar reparaciones, visitas y un proceso de venta más largo, pero el precio puede ser menor. Compare el dinero neto que recibiría. Si parece tener más sentido vender en el mercado, se lo diremos."],
    ["¿Tengo que reparar la propiedad primero?", "Puede preguntar por una compra tal como está, sin terminar primero las reparaciones. Aún debemos revisar la propiedad y no se garantiza una compra."],
    ["¿Se puede ceder el contrato de compra?", "Solo se podría proponer una cesión cuando lo permitan el acuerdo y la ley aplicable. Cualquier cesión propuesta y nuestra función deben divulgarse por escrito antes de que usted firme, según corresponda."],
    ["¿Cuánto tardaría el cierre?", "No hay un plazo igual para todas las propiedades. La ubicación, el título, las partes y los términos escritos influyen en el tiempo. Solo hablaremos de un plazo si puede haber una opción."],
  ],
  statesTitle: "Envíe una consulta desde cualquier estado.",
  statesText: "Aceptamos consultas sobre casas y terrenos de los 50 estados. Confirmaremos si podemos revisar una ubicación específica antes de hablar de una compra. Esto no significa que hayamos comprado propiedades en todos los estados.",
  finalTitle: "Cuéntenos sobre su propiedad.",
  finalText: "Elija la página adecuada, comparta los datos y revisaremos su consulta.",
  footerClaim: "Consultas desde los 50 estados.",
  investors: "Inversionistas",
  refer: "Referir una propiedad",
  privacy: "Privacidad",
  terms: "Términos",
  calculated: "Rango estimado",
  formula: "65–70% × valor después de reparaciones − reparaciones − $10,000",
};

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#93442e]";
const buttonPrimary = `inline-flex min-h-12 items-center justify-center gap-2 bg-[#93442e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#793923] ${FOCUS}`;
const buttonSecondary = `inline-flex min-h-12 items-center justify-center gap-2 border border-[#252923]/25 bg-[#fbf9f3] px-5 py-3 text-sm font-semibold text-[#252923] transition hover:bg-[#e9e5db] ${FOCUS}`;
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function PhotoSlot({ label, src, className = "", eager = false }: { label: string; src: string; className?: string; eager?: boolean }) {
  return (
    <div className={`relative isolate overflow-hidden border border-[#252923]/15 bg-[#dcd8cd] ${className}`}>
      <img src={src} alt={label} width="1200" height="900" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.03]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#191b17]/35 via-transparent to-transparent" />
      <a href={pxPage(Number(src.match(/photos\/(\d+)/)?.[1] ?? 0))} target="_blank" rel="noreferrer" className="absolute right-3 top-3 text-[9px] font-medium text-white/90 underline underline-offset-2 drop-shadow">Pexels</a>
    </div>
  );
}

function HouseMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path d="M5 22.5 24 7l19 15.5" stroke="#93442e" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M11 20v22h26V20M20 42V29h8v13" stroke="#252923" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function LeadLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link className={secondary ? buttonSecondary : buttonPrimary} to={href}>{children}</Link>;
}

export default function BuyerHome({ spanish = false }: { spanish?: boolean }) {
  const copy = spanish ? ES : EN;
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(250000);
  const [repairs, setRepairs] = useState(25000);
  const housePath = spanish ? "/es/vender-casa" : "/sell-your-house";
  const landPath = spanish ? "/es/vender-terreno" : "/sell-your-land";
  const estimates = useMemo(() => [Math.max(0, value * 0.65 - repairs - 10000), Math.max(0, value * 0.7 - repairs - 10000)], [value, repairs]);
  const estimateHref = useMemo(() => {
    const params = new URLSearchParams({
      estimatedValue: String(value),
      repairEstimate: String(repairs),
      roughRangeLow: String(Math.round(estimates[0])),
      roughRangeHigh: String(Math.round(estimates[1])),
    });
    return `${housePath}?${params.toString()}#property-form`;
  }, [value, repairs, estimates, housePath]);
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
          <Link to={spanish ? "/es" : "/"} aria-label="LoveMeAfter Home Buyers" className="flex shrink-0 items-center gap-2"><HouseMark className="size-9" /><span className="text-xs font-semibold leading-tight text-[#252923] sm:text-sm">LoveMeAfter<br className="sm:hidden" /> Home Buyers</span></Link>
          <div className="hidden items-center gap-4 text-xs font-semibold lg:flex xl:gap-6 xl:text-sm">
            <Link to={housePath} className={`hover:text-[#93442e] ${FOCUS}`}>{copy.nav[0]}</Link>
            <Link to={landPath} className={`hover:text-[#93442e] ${FOCUS}`}>{copy.nav[1]}</Link>
            <a href="#construction" className={`hover:text-[#93442e] ${FOCUS}`}>{copy.nav[2]}</a>
            <Link to="/investors" className={`hover:text-[#93442e] ${FOCUS}`}>{copy.nav[3]}</Link>
            <Link to="/refer" className={`hover:text-[#93442e] ${FOCUS}`}>{copy.nav[4]}</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to={spanish ? "/" : "/es"} lang={spanish ? "en" : "es"} className={`px-2 py-2 text-xs font-semibold text-[#65735b] hover:text-[#252923] ${FOCUS}`} aria-label={spanish ? "Read in English" : "Leer en español"}>{spanish ? "English" : "Español"}</Link>
            <a href={PHONE_HREF} className={`inline-flex min-h-10 items-center justify-center gap-2 bg-[#252923] px-3 text-xs font-semibold text-white hover:bg-[#41483f] ${FOCUS}`} aria-label={`${copy.call} ${PHONE}`}><Phone className="size-4" /><span className="hidden sm:inline">{PHONE}</span></a>
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
            <p className="mt-1 text-[10px] leading-4 text-[#62695f]">{copy.divisionNote}</p>
            <h1 className="mt-4 max-w-[12ch] text-5xl leading-[.91] tracking-[-.045em] sm:text-6xl lg:text-7xl">{copy.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#62695f] sm:text-base sm:leading-7">{copy.heroText}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LeadLink href={housePath}>{copy.house}<ArrowRight className="size-4" /></LeadLink>
              <LeadLink href={landPath} secondary>{copy.land}<ArrowRight className="size-4" /></LeadLink>
            </div>
            <a href={PHONE_HREF} className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#93442e] underline-offset-4 hover:underline ${FOCUS}`}><Phone className="size-4" />{copy.call} {PHONE}</a>
          </div>
          <div className="relative min-h-[310px] sm:min-h-[420px]">
            <PhotoSlot label={copy.photoLabel} src={px(5524336, 1800)} eager className="absolute inset-0 min-h-[310px] sm:min-h-[420px]" />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-[#191b17]/80 to-transparent px-4 pb-16 pt-14 sm:px-5 sm:pb-20">
              <a href={pxPage(5524336)} target="_blank" rel="noreferrer" className={`text-[9px] text-white underline underline-offset-2 drop-shadow ${FOCUS}`}>{copy.photoCredit}</a>
              <span className="max-w-[65%] text-right text-[9px] leading-4 text-white/90 drop-shadow">{copy.photoNote}</span>
            </div>
            <a href="#calculator" className={`absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 border border-[#252923]/15 bg-[#fbf9f3] p-4 shadow-xl transition hover:-translate-y-1 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[min(84%,360px)] sm:p-5 ${FOCUS}`}>
              <span><span className="block text-xs font-bold text-[#65735b]">{copy.teaser}</span><span className="mt-1 block text-sm font-semibold">{spanish ? "Pruebe la calculadora" : "Try the calculator"}</span></span><ArrowDown className="size-5 shrink-0 text-[#93442e]" />
            </a>
          </div>
        </div>
      </section>

      <section aria-label={spanish ? "Información sobre consultas" : "Inquiry details"} className="border-b border-[#252923]/10 bg-[#e9e5db]">
        <div className="mx-auto grid max-w-7xl divide-y divide-[#252923]/10 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-8 lg:grid-cols-4 lg:px-10">
          {copy.trust.map((item, index) => {
            const Icon = [MapPin, House, Check, Clock3][index];
            return <div key={item} className="flex items-center gap-3 py-4 text-xs font-semibold leading-5 sm:px-4 lg:py-5"><Icon className="size-5 shrink-0 text-[#93442e]" /><span>{item}</span></div>;
          })}
        </div>
        <p className="mx-auto max-w-7xl px-5 pb-4 text-[10px] leading-4 text-[#62695f] sm:px-8 lg:px-10">{copy.tradeoff}</p>
      </section>

      <motion.section {...reveal} className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{copy.processEyebrow}</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.processTitle}</h2></div>
          <div className="grid gap-0 sm:grid-cols-3 sm:gap-4">
            {copy.steps.map(([title, text], index) => <article key={title} className="border-t border-[#252923]/15 py-5 sm:border sm:bg-[#fbf9f3] sm:p-5"><span className="text-xs font-bold text-[#93442e]">0{index + 1}</span><h3 className="mt-3 text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#62695f]">{text}</p></article>)}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} id="calculator" className="scroll-mt-24 border-y border-[#252923]/10 bg-[#e9e5db]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
          <div><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{copy.calcEyebrow}</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.calcTitle}</h2><p className="mt-4 max-w-lg text-sm leading-6 text-[#62695f]">{copy.calcText}</p><div className="mt-6 flex items-start gap-3 border-l-2 border-[#93442e] pl-4 text-xs leading-5 text-[#62695f]"><ClipboardList className="mt-0.5 size-4 shrink-0 text-[#93442e]" /><span>{copy.disclaimer}</span></div></div>
          <div className="border border-[#252923]/15 bg-[#fbf9f3] p-5 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold">{copy.value}<span className="mt-2 flex h-12 items-center border border-[#252923]/15 bg-white px-3"><span className="text-sm text-[#696a60]">$</span><input type="number" min="0" step="1000" inputMode="numeric" value={value} onChange={(event) => setValue(Math.max(0, Number(event.target.value) || 0))} className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#65735b]" aria-label={copy.value} /></span></label>
              <label className="text-xs font-semibold">{copy.repairs}<span className="mt-2 flex h-12 items-center border border-[#252923]/15 bg-white px-3"><span className="text-sm text-[#696a60]">$</span><input type="number" min="0" step="500" inputMode="numeric" value={repairs} onChange={(event) => setRepairs(Math.max(0, Number(event.target.value) || 0))} className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#65735b]" aria-label={copy.repairs} /></span></label>
            </div>
            <div aria-live="polite" className="mt-6 border border-[#65735b]/25 bg-[#f3f0e8] p-5 sm:p-6"><p className="text-[10px] font-bold tracking-[.16em] text-[#65735b] uppercase">{copy.range}</p><p className="mt-2 text-3xl leading-none tabular-nums sm:text-4xl">{money.format(Math.round(estimates[0]))} <span className="text-[#93442e]">–</span> {money.format(Math.round(estimates[1]))}</p><p className="mt-2 text-xs text-[#62695f]">{copy.formula}</p></div>
            <p className="sr-only">{copy.calculated}: {money.format(Math.round(estimates[0]))} to {money.format(Math.round(estimates[1]))}</p>
            <p className="mt-5 text-xs leading-5 text-[#62695f]">{copy.calculatorHandoff}</p>
            <div className="mt-4"><LeadLink href={estimateHref}>
              {copy.sendNumbers}<ArrowUpRight className="size-4" />
            </LeadLink></div>
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-8 max-w-2xl"><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{copy.whyEyebrow}</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.whyTitle}</h2></div>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.benefits.map(([title, text], index) => {
            const Icon = [House, Wrench, ClipboardList][index];
            return <article key={title} className="border border-[#252923]/10 bg-[#fbf9f3] p-6 sm:p-7"><span className="flex size-11 items-center justify-center bg-[#e9e5db] text-[#93442e]"><Icon className="size-5" /></span><h3 className="mt-5 text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#62695f]">{text}</p></article>;
          })}
        </div>
        <div aria-label={spanish ? "Fotos ilustrativas de casas y terrenos" : "Illustrative home and land photographs"} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {copy.propertyPhotos.map(([label, id]) => <a key={id} href={pxPage(id)} target="_blank" rel="noreferrer" className={`group block overflow-hidden border border-[#252923]/10 bg-[#fbf9f3] ${FOCUS}`}><PhotoSlot label={`${label} (illustrative stock photo)`} src={px(id, 900)} className="aspect-[4/3]" /><span className="block min-h-12 px-3 py-2 text-[11px] font-medium leading-4 text-[#62695f] group-hover:text-[#93442e]">{label}<ArrowUpRight className="ml-1 inline size-3" /></span></a>)}
        </div>
        <p className="mt-3 text-[11px] text-[#696a60]">{copy.photoCredit} <a href={PHOTO_CREDIT_URL} target="_blank" rel="noreferrer" className={`underline underline-offset-2 ${FOCUS}`}>Pexels License</a></p>
      </motion.section>

      <motion.section {...reveal} id="construction" className="scroll-mt-24 bg-[#252923] text-[#fbf9f3]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="text-[10px] font-bold tracking-[.18em] text-[#d7b880] uppercase">{copy.constructionEyebrow}</p><h2 className="mt-3 text-4xl leading-none sm:text-5xl">{copy.constructionTitle}</h2><p className="mt-5 max-w-xl text-sm leading-6 text-white/75">{copy.constructionText}</p><Link to="/services" className={`mt-6 inline-flex min-h-12 items-center gap-2 border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white/10 ${FOCUS}`}>{copy.explore}<ArrowUpRight className="size-4" /></Link></div>
            <div><video className="aspect-video w-full border border-white/20 bg-black object-cover" src="/copy_5E397E73-24D9-4597-8204-60EA4CE89EDD.mp4" controls playsInline preload="metadata" aria-label={copy.videoLabel} /><p className="mt-2 text-xs leading-5 text-white/70">{copy.videoNote}</p></div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {copy.photoSlots.map((label) => <div key={label} className="flex aspect-[4/3] items-end border border-dashed border-white/35 bg-white/[.04] p-4 text-xs font-medium text-white/80">{label}</div>)}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-white/70">{spanish ? "[NEEDS PHOTO: Añada fotos verificadas de LoveMeAfter antes/durante/después del proyecto.]" : "[NEEDS PHOTO: Add verified LoveMeAfter before/during/after project stills here.]"}</p>
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
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-10"><div><h2 className="text-4xl leading-none sm:text-5xl">{copy.finalTitle}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#62695f]">{copy.finalText}</p></div><div className="flex flex-col gap-3 sm:flex-row"><LeadLink href={housePath}>{copy.house}<ArrowRight className="size-4" /></LeadLink><LeadLink href={landPath} secondary>{copy.land}<ArrowRight className="size-4" /></LeadLink></div></div>
      </section>

      <footer className="border-t border-[#252923]/10 bg-[#f3f0e8]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:px-8 md:grid-cols-[1fr_2fr] lg:px-10">
          <div><Link to={spanish ? "/es" : "/"} aria-label="LoveMeAfter Home Buyers" className="inline-flex items-center gap-3"><HouseMark className="size-10" /><span className="text-sm font-semibold">LoveMeAfter Home Buyers</span></Link><p className="mt-3 text-xs text-[#62695f]">LoveMeAfter Home Buyers</p><a href={PHONE_HREF} className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#93442e] ${FOCUS}`}><Phone className="size-4" />{PHONE}</a><p className="mt-2 text-xs text-[#62695f]">{copy.footerClaim}</p></div>
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
