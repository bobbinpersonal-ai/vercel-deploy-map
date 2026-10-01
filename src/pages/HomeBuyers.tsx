import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CircleDollarSign, ClipboardCheck, Hammer, House, LoaderCircle, MapPin, Phone, Trees } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { usePageMeta } from "@/components/PageMeta";
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { db, trackEvent } from "@/lib/firebase";

type BuyerKind = "house" | "land";

const STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
] as const;

const BUYING_STATES = STATES.filter(([code]) => code !== "DC").map(([, name]) => name);
const BUYER_PHONE = "424-426-0760";
const BUYER_PHONE_HREF = "tel:+14244260760";

const FIELD_WORK = [
  ["01", "Before", "Document condition and access before discussing an offer."],
  ["02", "During", "Record repair scope and the work the crew can actually take on."],
  ["03", "After", "Keep a clear file of finished work, costs, and closeout."],
] as const;

const PAGE_COPY = {
  house: {
    title: "Thinking about selling a house?",
    intro: "Send the address and your timing from any U.S. state. We’ll check whether we can review the property there and call to discuss possible options.",
    eyebrow: "LoveMeAfter Home Buyers · Homes",
    propertyLabel: "Home type",
    propertyOptions: ["Single-family home", "Condo or townhome", "Multi-family property", "Manufactured home", "Other / not sure"],
    icon: House,
  },
  land: {
    title: "Selling a lot or acreage?",
    intro: "Send the location and what you know about the parcel from any U.S. state. We’ll check whether we can review it there and call if it may fit.",
    eyebrow: "LoveMeAfter Home Buyers · Land",
    propertyLabel: "Land type",
    propertyOptions: ["Vacant residential lot", "Infill parcel", "Acreage", "Inherited land", "Other / not sure"],
    icon: Trees,
  },
} satisfies Record<BuyerKind, { title: string; intro: string; eyebrow: string; propertyLabel: string; propertyOptions: string[]; icon: typeof House }>;

const BUYER_FAQS = [
  ["Can I send an inquiry from my state?", "Yes. You can send details from any of the 50 states. We’ll confirm whether we can handle that location and its requirements before discussing a purchase."],
  ["Is a cash offer the same as selling on the market?", "No. A direct purchase can avoid repairs and showings, but the price may be lower than a sale on the open market. Compare the likely net amount and timing before deciding."],
  ["Do I have to accept an offer?", "No. Sending an inquiry doesn’t commit you to sell. Any purchase terms must be in a written agreement signed by the parties."],
  ["Will you assign the purchase contract?", "An assignment may be considered where the written agreement and applicable law allow it. If proposed, the assignment and our role must be disclosed as required before you sign."],
] as const;

const controlClass = "h-12 w-full rounded-sm border border-[#252923]/15 bg-[#fbf9f3] px-4 text-sm text-[#252923] outline-none transition placeholder:text-[#89877b] focus:border-[#65735b] focus:ring-2 focus:ring-[#65735b]/15";

const PAGE_COPY_ES = {
  house: {
    title: "¿Está pensando en vender su casa?",
    intro: "Envíenos la dirección y cuándo le gustaría vender, desde cualquier estado de EE. UU. Revisaremos si podemos evaluar la propiedad allí y le llamaremos para hablar de posibles opciones.",
    eyebrow: "LoveMeAfter Home Buyers · Casas",
    propertyLabel: "Tipo de vivienda",
    propertyOptions: ["Casa unifamiliar", "Condominio o casa adosada", "Edificio multifamiliar", "Casa prefabricada", "Otro / No estoy seguro"],
    icon: House,
  },
  land: {
    title: "¿Quiere vender un terreno?",
    intro: "Envíenos la ubicación y los datos que conozca, desde cualquier estado de EE. UU. Revisaremos si podemos evaluar el terreno allí y le llamaremos si puede ser una opción.",
    eyebrow: "LoveMeAfter Home Buyers · Terrenos",
    propertyLabel: "Tipo de terreno",
    propertyOptions: ["Lote residencial", "Lote urbano", "Terreno extenso", "Terreno heredado", "Otro / No estoy seguro"],
    icon: Trees,
  },
} satisfies Record<BuyerKind, { title: string; intro: string; eyebrow: string; propertyLabel: string; propertyOptions: string[]; icon: typeof House }>;

const BUYER_FAQS_ES = [
  ["¿Puedo enviar una consulta desde mi estado?", "Sí. Puede enviarnos datos desde cualquiera de los 50 estados. Confirmaremos si podemos atender esa ubicación y sus requisitos antes de hablar de una compra."],
  ["¿Una oferta en efectivo es igual que vender en el mercado?", "No. Una compra directa puede evitar reparaciones y visitas, pero el precio puede ser menor que el de una venta en el mercado abierto. Compare el dinero neto y el tiempo antes de decidir."],
  ["¿Tengo que aceptar una oferta?", "No. Enviar una consulta no le obliga a vender. Los términos de una compra deben constar en un contrato escrito firmado por las partes."],
  ["¿Pueden ceder el contrato de compra?", "Podríamos proponer ceder el contrato si el acuerdo escrito y la ley aplicable lo permiten. Si se propone una cesión, explicaremos por escrito nuestro interés y función antes de que usted firme, según corresponda."],
] as const;

const SITUATIONS_ES = ["Propiedad heredada", "Necesita reparaciones", "Propiedad vacía", "Mudanza", "Administro una propiedad de alquiler", "Otro / Prefiero no decirlo"];
const TIMING_ES = ["Tan pronto como sea posible", "Dentro de 30 días", "En 1–3 meses", "Solo estoy explorando"];
const PATHS_ES = ["Compra en efectivo tal como está", "Conversación sobre compra y renovación", "Quiero conocer mis opciones"];

export default function HomeBuyers({ kind, spanish = false }: { kind: BuyerKind; spanish?: boolean }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const page = spanish ? PAGE_COPY_ES[kind] : PAGE_COPY[kind];
  const faqs = spanish ? BUYER_FAQS_ES : BUYER_FAQS;
  const PropertyIcon = page.icon;

  usePageMeta(
    spanish
      ? kind === "house" ? "Vender una casa | LoveMeAfter Home Buyers" : "Vender un terreno | LoveMeAfter Home Buyers"
      : kind === "house" ? "Sell a House | LoveMeAfter Home Buyers" : "Sell Land | LoveMeAfter Home Buyers",
    spanish
      ? kind === "house" ? "Envíe los datos de una casa ubicada en cualquier estado de EE. UU. para comprobar si podemos revisarla." : "Envíe los datos de un terreno ubicado en cualquier estado de EE. UU. para comprobar si podemos revisarlo."
      : kind === "house" ? "Send details about a house in any U.S. state so we can check whether we can review it there." : "Send details about land in any U.S. state so we can check whether we can review it there.",
    spanish
      ? kind === "house" ? "/es/vender-casa" : "/es/vender-terreno"
      : kind === "house" ? "/sell-your-house" : "/sell-your-land",
  );

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const state = String(data.get("state") ?? "");
    const stateName = STATES.find(([code]) => code === state)?.[1] ?? "";
    const smsConsent = data.get("smsConsent") === "on";
    const smsConsentAt = smsConsent ? serverTimestamp() : null;
    try {
      const lead = {
        name: String(data.get("name") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        address: String(data.get("address") ?? "").trim(),
        city: String(data.get("city") ?? "").trim(),
        state,
        stateName,
        zip: String(data.get("zip") ?? "").trim(),
        propertyType: String(data.get("propertyType") ?? ""),
        service: kind === "house" ? "Sell a house" : "Sell land",
        situation: String(data.get("situation") ?? ""),
        timing: String(data.get("timing") ?? ""),
        notes: String(data.get("notes") ?? "").trim(),
        preferredPath: String(data.get("preferredPath") ?? "").trim(),
        smsConsent,
        smsConsentTextVersion: smsConsent ? "home-buyer-sms-v1" : "",
        smsConsentAt,
        source: kind === "house" ? "national_sell_house_page" : "national_sell_land_page",
        stage: "new",
        estimatedValue: 0,
      };
      const leadRef = doc(collection(db, "leads"));
      const mailRef = doc(collection(db, "mail"));
      const fields = [
        ["Name", lead.name], ["Phone", lead.phone], ["Email", lead.email || "Not provided"],
        ["Property", [lead.address, lead.city, lead.state, lead.zip].filter(Boolean).join(", ")],
        ["Property type", lead.propertyType], ["Situation", lead.situation || "Not provided"],
        ["Timeline", lead.timing || "Not provided"], ["Preferred path", lead.preferredPath || "Not specified"],
        ["SMS consent", smsConsent ? `Yes · ${lead.smsConsentTextVersion}` : "No"],
        ["Notes", lead.notes || "Not provided"], ["Lead record", leadRef.id],
      ] as const;
      const escapeHtml = (value: string) => value.replace(/[&<>\u0022]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\\"": "&quot;" })[character] ?? character);
      const text = [`New LoveMeAfter Home Buyers ${kind} inquiry`, "", ...fields.map(([label, value]) => `${label}: ${value}`)].join("\n");
      const html = "<div style=\"font-family:Arial,sans-serif;color:#252923\"><h2>New LoveMeAfter Home Buyers inquiry</h2><p>See the plain-text message for property details.</p></div>";
      const batch = writeBatch(db);
      batch.set(leadRef, { ...lead, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      batch.set(mailRef, {
        to: ["hello@lovemeafter.com"],
        from: "LoveMeAfter <hello@lovemeafter.com>",
        ...(lead.email ? { replyTo: lead.email } : {}),
        message: { subject: `Home Buyers ${kind} inquiry · ${lead.city}, ${lead.state}`, text, html },
        source: lead.source,
        leadId: leadRef.id,
        createdAt: serverTimestamp(),
      });
      await batch.commit();
      void trackEvent("home_buyer_inquiry_submitted", { propertyType: kind, state, smsConsent });
      setSubmitted(true);
      form.reset();
    } catch (cause) {
      console.error("Could not save home buyer inquiry", cause);
      setError("We couldn’t submit this right now. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#252923]">
      <div role="banner" className="border-b border-[#252923]/10 bg-[#fbf9f3]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" aria-label="LoveMeAfter home" className="flex items-center gap-3">
            <LogoMark className="size-10" />
            <span className="text-sm font-extrabold tracking-[.02em] sm:text-base">LoveMeAfter <span className="font-medium text-[#65735b]">Home Buyers</span></span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <div role="navigation" aria-label="Home buyer pages" className="flex items-center gap-3 text-xs font-semibold sm:gap-6 sm:text-sm">
              <Link to={spanish ? "/es/vender-casa" : "/sell-your-house"} className={kind === "house" ? "text-[#93442e]" : "text-[#696a60] hover:text-[#252923]"}>{spanish ? "Casas" : "Houses"}</Link>
              <Link to={spanish ? "/es/vender-terreno" : "/sell-your-land"} className={kind === "land" ? "text-[#93442e]" : "text-[#696a60] hover:text-[#252923]"}>{spanish ? "Terrenos" : "Land"}</Link>
              <Link to={spanish ? (kind === "house" ? "/sell-your-house" : "/sell-your-land") : (kind === "house" ? "/es/vender-casa" : "/es/vender-terreno")} className="hidden text-[#696a60] hover:text-[#252923] sm:inline">{spanish ? "English" : "Español"}</Link>
              <Link to="/investors" className="hidden text-[#696a60] hover:text-[#252923] lg:inline">{spanish ? "Compradores" : "Investors"}</Link>
              <Link to="/refer" className="hidden text-[#696a60] hover:text-[#252923] lg:inline">{spanish ? "Referir" : "Refer"}</Link>
            </div>
            <a href={BUYER_PHONE_HREF} className="inline-flex size-10 items-center justify-center border border-[#252923]/15 text-[#93442e] transition hover:bg-[#e9e5db] sm:h-10 sm:w-auto sm:gap-2 sm:px-3" aria-label={`${spanish ? "Llame a" : "Call"} LoveMeAfter Home Buyers ${spanish ? "al" : "at"} ${BUYER_PHONE}`}><Phone className="size-4" /><span className="hidden text-xs font-semibold sm:inline">{BUYER_PHONE}</span></a>
          </div>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-b border-[#252923]/10">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_22%,rgba(101,115,91,.16),transparent_42%),linear-gradient(135deg,#f3f0e8,#e9e5db)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:py-28">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold tracking-[.19em] text-[#65735b] uppercase"><MapPin className="size-3.5" />{page.eyebrow}</p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[.91] tracking-[-.055em] sm:text-7xl">{page.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#62695f] sm:text-lg sm:leading-8">{page.intro}</p>
            <div className="mt-6 inline-flex items-center gap-2 border border-[#65735b]/25 bg-[#fbf9f3]/85 px-3 py-2 text-xs font-semibold text-[#526047]"><MapPin className="size-4" /> {spanish ? "Consultas desde los 50 estados" : "Inquiries from all 50 U.S. states"}</div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#62695f]">{spanish ? "Una compra en efectivo tal como está puede evitar reparaciones y visitas. El precio puede ser menor que el de una venta en el mercado abierto. Revisaremos la dirección antes de hablar de términos." : "An as-is cash purchase may avoid repair work and showings. The price may be lower than selling on the open market. We’ll review the address before discussing terms."}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#property-form" className="inline-flex h-12 items-center gap-2 bg-[#93442e] px-5 text-sm font-semibold text-white transition hover:bg-[#793923]">{spanish ? "Envíe los datos de la propiedad" : "Tell us about the property"} <ArrowDown className="size-4" /></a><a href={BUYER_PHONE_HREF} className="inline-flex h-12 items-center gap-2 border border-[#252923]/20 bg-[#fbf9f3]/85 px-5 text-sm font-semibold text-[#252923] transition hover:bg-[#e9e5db]"><Phone className="size-4" /> {spanish ? "Llame al" : "Call"} {BUYER_PHONE}</a></div>
          </div>
            <div className="relative flex min-h-[330px] items-center justify-center border border-[#252923]/10 bg-[#e9e5db] p-6 sm:min-h-[450px] sm:p-10">
            <div aria-hidden="true" className="absolute inset-5 border border-[#252923]/10 sm:inset-8" />
            <div className="relative w-full max-w-md border border-[#252923]/10 bg-[#fbf9f3] p-6 shadow-xl sm:p-8">
              <span className="flex size-12 items-center justify-center bg-[#252923] text-[#d7b880]"><PropertyIcon className="size-6" /></span>
              <p className="mt-6 text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{spanish ? "Revisión de propiedad" : "Property review"}</p>
              <h2 className="mt-2 text-3xl leading-tight">{spanish ? "Dirección. Estado. Próximo paso." : "Address. Condition. Next step."}</h2>
              <p className="mt-3 text-sm leading-6 text-[#62695f]">{spanish ? "Empezamos con la información que usted comparte. Después hablamos de opciones posibles y sus términos por escrito." : "We start with the details you share. Then we discuss possible options and their written terms."}</p>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-[#526047]"><span className="border border-[#65735b]/20 px-2 py-3">{spanish ? "Ubicación" : "Location"}</span><span className="border border-[#65735b]/20 px-2 py-3">{spanish ? "Estado" : "Condition"}</span><span className="border border-[#65735b]/20 px-2 py-3">{spanish ? "Opciones" : "Options"}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="nationwide-coverage" className="border-y border-[#252923]/10 bg-[#e9e5db]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <div className="grid gap-5 sm:grid-cols-[.75fr_1.25fr] sm:items-end">
            <div><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{spanish ? "Consultas de todo el país" : "Nationwide property inquiries"}</p><h2 id="nationwide-coverage" className="mt-3 text-4xl leading-[.97] tracking-[-.045em] sm:text-5xl">{spanish ? "Envíe una consulta desde cualquier estado." : "Send an inquiry from any state."}</h2></div>
            <p className="max-w-2xl text-sm leading-6 text-[#62695f]">{spanish ? "Puede enviarnos información de una casa o terreno ubicado en cualquiera de los 50 estados. Antes de hablar de una compra, confirmaremos si podemos atender esa ubicación y qué requisitos aplican. La consulta no es una oferta ni garantiza una compra." : "You can send details about a house or parcel in any of the 50 states. Before discussing a purchase, we’ll confirm whether we can handle that location and what requirements apply. An inquiry isn’t an offer or a promise to buy."}</p>
          </div>
          <ul aria-label="States from which we accept property inquiries" className="mt-8 flex flex-wrap gap-2">{BUYING_STATES.map((state) => <li key={state} className="border border-[#252923]/10 bg-[#fbf9f3] px-3 py-2 text-xs font-medium text-[#41483f]">{state}</li>)}</ul>
        </div>
      </section>

      <section className="border-y border-[#252923]/10 bg-[#252923] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[.65fr_1.35fr] lg:items-center lg:px-10">
          <div><p className="text-[10px] font-bold tracking-[.18em] text-[#d7b880] uppercase">{spanish ? "Construcción en el trabajo" : "Construction in the field"}</p><h2 className="mt-3 text-4xl leading-[.97] tracking-[-.045em] sm:text-5xl">{spanish ? "Una mirada práctica al trabajo de una propiedad." : "A practical eye for the work behind a property."}</h2><p className="mt-5 text-sm leading-6 text-white/70">{spanish ? "Vea el video de proyectos de LoveMeAfter. Las imágenes de apoyo muestran ejemplos de oficios de construcción y trabajo en obra." : "Watch the LoveMeAfter project film. Supporting images show examples of construction trades and site work."}</p></div>
          <video className="aspect-video w-full border border-white/15 bg-black object-cover" src="/copy_5E397E73-24D9-4597-8204-60EA4CE89EDD.mp4" controls playsInline preload="metadata" aria-label={spanish ? "Video de proyectos de construcción de LoveMeAfter" : "LoveMeAfter construction project film"} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">              <div className="grid gap-4 md:grid-cols-3">
          <article className="border border-[#252923]/10 bg-[#fbf9f3] p-6 sm:p-7"><CircleDollarSign className="size-5 text-[#93442e]" /><h2 className="mt-5 text-2xl">{spanish ? "Compra tal como está" : "As-is purchase"}</h2><p className="mt-2 text-sm leading-6 text-[#62695f]">{spanish ? "Pregunte por una posible compra en efectivo sin hacer primero las reparaciones. Toda oferta depende de la ubicación, la revisión y los términos escritos." : "Ask about a possible cash purchase without first completing repairs. Any offer depends on location, review, and written terms."}</p></article>
          <article className="border border-[#252923]/10 bg-[#fbf9f3] p-6 sm:p-7"><Hammer className="size-5 text-[#93442e]" /><h2 className="mt-5 text-2xl">{spanish ? "Conversación sobre renovación" : "Renovation conversation"}</h2><p className="mt-2 text-sm leading-6 text-[#62695f]">{spanish ? "En algunas casas, la experiencia en construcción puede ayudarnos a evaluar una compra y una posible renovación. La disponibilidad y el ajuste varían." : "For some homes, construction experience may help us evaluate a purchase and renovation path. Availability and fit vary."}</p></article>
          <article className="border border-[#252923]/10 bg-[#fbf9f3] p-6 sm:p-7"><ClipboardCheck className="size-5 text-[#93442e]" /><h2 className="mt-5 text-2xl">{spanish ? "Próximos pasos claros" : "Clear next steps"}</h2><p className="mt-2 text-sm leading-6 text-[#62695f]">{spanish ? "Empiece con los datos de la propiedad. Los revisaremos y explicaremos si tiene sentido conversar; no tiene que aceptar una oferta." : "Start with property details. We’ll review them and explain whether a conversation makes sense. You don’t have to accept an offer."}</p></article>
        </div>
      </section>

      <section className="bg-[#252923] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <p className="text-[10px] font-bold tracking-[.18em] text-[#d7b880] uppercase">{spanish ? "Cómo revisamos una propiedad" : "How we review a property"}</p>
          <h2 className="mt-3 max-w-2xl text-4xl leading-[.97] tracking-[-.045em] sm:text-5xl">{spanish ? "Primero revisamos el estado." : "First, we check the condition."}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">{spanish ? "La experiencia en construcción puede ayudar a estimar reparaciones. No significa que aceptemos todos los proyectos ni que una oferta esté garantizada." : "Construction experience can help us estimate repairs. It doesn’t mean we can take on every project or guarantee an offer."}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">{FIELD_WORK.map(([number, title, copy]) => <article key={number} className="border border-white/15 bg-white/[.04] p-5"><span className="text-xs font-semibold text-[#d7b880]">{number}</span><h3 className="mt-4 text-xl">{spanish ? ({ Before: "Antes", During: "Durante", After: "Después" }[title] ?? title) : title}</h3><p className="mt-2 text-sm leading-6 text-white/70">{spanish ? ({ "Document condition and access before discussing an offer.": "Documentamos el estado y el acceso antes de hablar de una oferta.", "Record repair scope and the work the crew can actually take on.": "Anotamos las reparaciones y el trabajo que el equipo realmente puede realizar.", "Keep a clear file of finished work, costs, and closeout.": "Guardamos un registro claro del trabajo terminado, los costos y el cierre." }[copy] ?? copy) : copy}</p></article>)}</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.7fr_1.3fr] lg:px-10">
        <div><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{spanish ? "El proceso" : "The process"}</p><h2 className="mt-4 text-4xl leading-[.97] tracking-[-.045em] sm:text-5xl">{spanish ? "Primero, entendemos lo que necesita." : "First, we learn what you need."}</h2><div className="mt-8 space-y-6">{(spanish ? [["01", "Envíe los datos", "Díganos cómo contactarle, dónde está la propiedad y qué le gustaría hacer."], ["02", "Revisamos la información", "Revisamos los datos de la propiedad y los requisitos locales de su estado."], ["03", "Hablamos de opciones", "Si puede haber una opción, Bobbin o un representante autorizado puede conversar sobre términos por escrito. La consulta no es una oferta ni un contrato."]] : [["01", "Send the basics", "Tell us how to reach you, where the property is, and what you’d like to do."], ["02", "We review the details", "We review the property information and local requirements for its state."], ["03", "Discuss possible options", "If it may fit, Bobbin or an authorized representative can discuss written terms. An inquiry isn’t an offer or contract."]]).map(([number, title, copy]) => <div key={number} className="flex gap-4 border-t border-[#252923]/12 pt-5"><span className="text-xs font-bold text-[#93442e]">{number}</span><div><h3 className="text-xl">{title}</h3><p className="mt-1 text-sm leading-6 text-[#62695f]">{copy}</p></div></div>)}</div></div>
        <div id="property-form" className="scroll-mt-8 border border-[#252923]/12 bg-[#e9e5db] p-5 sm:p-8">
          {submitted ? <div className="flex min-h-[420px] flex-col items-start justify-center"><span className="flex size-12 items-center justify-center bg-[#dce4cf] text-[#526047]"><Check className="size-5" /></span><p className="mt-6 text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{spanish ? "Consulta recibida" : "Inquiry received"}</p><h2 className="mt-3 text-4xl">{spanish ? "Gracias por compartir los datos." : "Thanks for sharing the details."}</h2><p className="mt-4 max-w-lg text-sm leading-6 text-[#62695f]">{spanish ? "Recibimos su consulta para revisarla. Un integrante del equipo podría comunicarse con usted usando los datos proporcionados. Esto no es una oferta de compra ni una cita confirmada." : "Your property inquiry has been submitted for review. A member of the team may follow up using the contact information you provided. No purchase offer or appointment has been made."}</p><button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-[#93442e]">{spanish ? "Enviar otra propiedad" : "Submit another property"} <ArrowRight className="ml-1 inline size-4" /></button></div> : <>
            <p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{spanish ? "Consulta sobre la propiedad · Sin compromiso" : "Property inquiry · no obligation"}</p><h2 className="mt-3 text-4xl leading-[.98] tracking-[-.045em]">{spanish ? `Cuéntenos sobre su ${kind === "house" ? "casa" : "terreno"}.` : `Tell us about your ${kind === "house" ? "house" : "land"}.`}</h2><p className="mt-3 text-sm leading-6 text-[#62695f]">{spanish ? "Los campos con * son obligatorios. Usaremos estos datos para revisar su consulta." : "Fields marked * are required. We’ll use these details to review your inquiry."}</p>
            <form className="mt-7 space-y-5" onSubmit={submitLead}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold">{spanish ? "Su nombre *" : "Your name *"}<input className={`${controlClass} mt-2`} name="name" required autoComplete="name" placeholder={spanish ? "Nombre y apellido" : "Full name"} /></label>
                <label className="text-xs font-semibold">{spanish ? "Teléfono *" : "Best phone number *"}<input className={`${controlClass} mt-2`} name="phone" required type="tel" autoComplete="tel" placeholder="(555) 555-5555" /></label>
                <label className="text-xs font-semibold">{spanish ? "Correo electrónico" : "Email address"}<input className={`${controlClass} mt-2`} name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
                <label className="text-xs font-semibold">{page.propertyLabel} *<select className={`${controlClass} mt-2`} name="propertyType" required defaultValue=""><option value="" disabled>{spanish ? "Seleccione una opción" : "Select one"}</option>{page.propertyOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="text-xs font-semibold sm:col-span-2">{spanish ? "Dirección de la propiedad *" : "Property street address *"}<input className={`${controlClass} mt-2`} name="address" required autoComplete="street-address" placeholder={spanish ? "Calle y número o ubicación del terreno" : "Street address or parcel location"} /></label>
                <label className="text-xs font-semibold">{spanish ? "Ciudad *" : "City *"}<input className={`${controlClass} mt-2`} name="city" required autoComplete="address-level2" placeholder={spanish ? "Ciudad" : "City"} /></label>
                <label className="text-xs font-semibold">{spanish ? "Estado *" : "State *"}<select className={`${controlClass} mt-2`} name="state" required defaultValue=""><option value="" disabled>{spanish ? "Seleccione un estado" : "Select state"}</option>{STATES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select></label>
                <label className="text-xs font-semibold">{spanish ? "Código postal" : "ZIP code"}<input className={`${controlClass} mt-2`} name="zip" autoComplete="postal-code" inputMode="numeric" placeholder="ZIP" /></label>
                <label className="text-xs font-semibold">{spanish ? "¿Cuándo quiere vender?" : "When would you like to sell?"}<select className={`${controlClass} mt-2`} name="timing" defaultValue=""><option value="">{spanish ? "Seleccione un plazo" : "Choose timing"}</option>{(spanish ? TIMING_ES : ["As soon as practical", "Within 30 days", "1–3 months", "Just exploring"]).map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="text-xs font-semibold">{spanish ? "Su situación" : "Your situation"}<select className={`${controlClass} mt-2`} name="situation" defaultValue=""><option value="">{spanish ? "Seleccione si desea" : "Choose if helpful"}</option>{(spanish ? SITUATIONS_ES : ["Inherited property", "Repairs needed", "Vacant property", "Relocating", "Managing a rental", "Other / prefer not to say"]).map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="text-xs font-semibold">{spanish ? "¿Qué opción quiere explorar?" : "What would you like to explore?"}<select className={`${controlClass} mt-2`} name="preferredPath" defaultValue=""><option value="">{spanish ? "Aún no lo sé" : "Not sure yet"}</option>{(spanish ? PATHS_ES.filter((item) => kind === "house" || item !== PATHS_ES[1]) : kind === "house" ? ["As-is cash purchase", "Renovation purchase conversation", "Help understanding possible options"] : ["As-is cash purchase", "Help understanding possible options"]).map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="text-xs font-semibold sm:col-span-2">{spanish ? "¿Qué más deberíamos saber?" : "Anything else we should know?"}<textarea className="mt-2 min-h-28 w-full resize-y rounded-sm border border-[#252923]/15 bg-[#fbf9f3] px-4 py-3 text-sm outline-none placeholder:text-[#89877b] focus:border-[#65735b] focus:ring-2 focus:ring-[#65735b]/15" name="notes" placeholder={spanish ? "Estado, propietarios, gravámenes, inquilinos, acceso o preguntas" : "Condition, ownership, liens, tenants, access, or questions"} /></label>
              </div>
              <label className="flex items-start gap-3 border-t border-[#252923]/10 pt-5 text-xs leading-5 text-[#62695f]"><input name="smsConsent" type="checkbox" className="mt-1 size-4 shrink-0 accent-[#93442e]" /><span>{spanish ? "Opcional: Acepto recibir mensajes de texto de LoveMeAfter Home Buyers sobre esta consulta en el número que proporcioné. La frecuencia puede variar. Pueden aplicarse cargos de mensajes y datos. Responda STOP para dejar de recibirlos o HELP para ayuda. El consentimiento no es condición para comprar o vender." : "Optional: I agree to receive text messages from LoveMeAfter Home Buyers about this property inquiry at the number I provided. Message frequency varies; message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of a purchase or sale."}</span></label>
              <p className="text-[11px] leading-5 text-[#696a60]">{spanish ? "Usaremos estos datos para revisar y responder a su consulta. Marcar la casilla opcional registra su consentimiento para recibir mensajes; no significa que enviaremos un texto automáticamente." : "We use the information to review and respond to this request. Checking the optional box records text-message consent; it does not mean a text will be sent automatically."}</p>
              {error && <p role="alert" className="border border-red-800/20 bg-red-50 px-4 py-3 text-sm text-red-900">{spanish ? "No pudimos enviar la consulta ahora. Inténtelo de nuevo en un momento." : error}</p>}
              <button type="submit" disabled={submitting} className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#93442e] px-5 text-sm font-semibold text-white transition hover:bg-[#793923] disabled:cursor-wait disabled:opacity-60 sm:w-auto">{submitting ? <><LoaderCircle className="size-4 animate-spin" /> {spanish ? "Enviando…" : "Sending…"}</> : <>{spanish ? "Enviar datos de la propiedad" : "Send property details"} <ArrowUpRight className="size-4" /></>}</button>
            </form>
          </>}
        </div>
      </section>

      <section aria-labelledby="seller-faq-heading" className="border-y border-[#252923]/10 bg-[#fbf9f3]">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10"><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{spanish ? "Antes de enviar la dirección" : "Before you send the address"}</p>
          <h2 id="seller-faq-heading" className="mt-3 text-4xl">{spanish ? "Preguntas frecuentes." : "Questions sellers ask."}</h2>
          <div className="mt-7 divide-y divide-[#252923]/10 border-y border-[#252923]/10">
            {faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none text-base font-semibold marker:content-none">{question}<span className="float-right text-[#93442e]">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-[#62695f]">{answer}</p></details>)}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }).replace(/</g, "\\u003c") }} />
      </section>

      <section className="border-y border-[#252923]/10 bg-[#fbf9f3]"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 text-xs leading-5 text-[#696a60] sm:grid-cols-2 sm:px-8 lg:px-10"><p>{spanish ? "Puede enviar consultas sobre casas y terrenos en cualquiera de los 50 estados. La disponibilidad, la revisión y los términos dependen de la propiedad, nuestra capacidad operativa y los requisitos locales. Esta página recibe consultas de compra; no ofrecemos representar al propietario como agente o corredor. El formulario no crea un contrato ni garantiza una oferta." : "You can submit house and land inquiries from any of the 50 U.S. states. Availability, review, and terms depend on the property, our operating capacity, and local requirements. This page receives purchase inquiries; it doesn’t offer to represent a property owner as an agent or broker. The form creates no contract or promise of an offer."}</p><p>{spanish ? "Toda compra, cesión de derechos contractuales, divulgación, plazo, depósito y demás términos dependen de un acuerdo escrito y de la ley aplicable. Si se propone una cesión, se divulgará por escrito antes de la firma, según corresponda. Considere consultar a un abogado, asesor fiscal y asesor financiero independientes." : "Any purchase, assignment of contract rights, disclosures, timelines, deposits, and other terms depend on a written agreement and applicable law. Where assignment is contemplated, it will be disclosed in writing as required before signing. Please seek independent legal, tax, and financial advice as needed."}</p></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#696a60] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><Link to="/" className="font-semibold text-[#252923]">LoveMeAfter.com</Link><span>{spanish ? "LoveMeAfter Home Buyers · Consultas desde los 50 estados" : "LoveMeAfter Home Buyers · Inquiries from all 50 states"}</span><a href={BUYER_PHONE_HREF} className="inline-flex items-center gap-1 font-semibold text-[#93442e]">{spanish ? "Llame al" : "Call"} {BUYER_PHONE} <ArrowUpRight className="size-3.5" /></a><Link to={kind === "house" ? (spanish ? "/es/vender-terreno" : "/sell-your-land") : (spanish ? "/es/vender-casa" : "/sell-your-house")} className="inline-flex items-center font-semibold text-[#93442e]">{spanish ? (kind === "house" ? "¿Vende un terreno?" : "¿Vende una casa?") : (kind === "house" ? "Selling land instead?" : "Selling a house instead?")} <ArrowUpRight className="ml-1 size-3.5" /></Link><Link to="/investors" className="font-semibold text-[#93442e]">{spanish ? "Registro de compradores" : "Investor buyers"}</Link><Link to="/refer" className="font-semibold text-[#93442e]">{spanish ? "Referir una propiedad" : "Refer a property"}</Link><Link to="/privacy" className="underline">{spanish ? "Privacidad" : "Privacy"}</Link><Link to="/terms" className="underline">{spanish ? "Términos" : "Terms"}</Link></footer>
    </main>
  );
}

export function SellYourHouse() {
  return <HomeBuyers kind="house" />;
}

export function SellYourLand() {
  return <HomeBuyers kind="land" />;
}

export function SellYourHouseSpanish() {
  return <HomeBuyers kind="house" spanish />;
}

export function SellYourLandSpanish() {
  return <HomeBuyers kind="land" spanish />;
}
