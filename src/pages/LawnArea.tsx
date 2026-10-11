import { Link, useParams } from "react-router";
import { ArrowRight, Check, Phone } from "lucide-react";
import { usePageMeta } from "@/components/PageMeta";
import { TopNav, PHONE_DISPLAY, PHONE_HREF } from "@/components/TopNav";
import { SiteFooter } from "@/components/SiteFooter";

const eyebrow = "text-[11px] font-bold tracking-[.18em] text-[#a36a27] uppercase";

type CityCopy = {
  name: string;
  headline: string;
  paragraphs: string[];
  localNote: string;
};

const CITIES: Record<string, CityCopy> = {
  dallas: {
    name: "Dallas",
    headline: "Lawn care for Dallas yards, booked today.",
    paragraphs: [
      "Dallas yards take a beating. Bermuda and St. Augustine lawns bake through long summers, and by mid-season the edges, weeds, and bare spots all show at once. LoveMeAfter Lawn Care handles the whole picture with one-time jobs priced from your photos: a clean mow with sharp edges along every sidewalk and driveway, a fertilization treatment matched to your grass type, and weed control that goes after the crabgrass and sticker weeds taking over the back yard. Send a few photos and we’ll call you within 5 minutes with a firm price.",
      "We run daily routes across Dallas — from Lake Highlands and Casa Linda to Oak Cliff and Preston Hollow — so booking is simple. Pick a day, leave the gate unlocked, and come home to a yard that looks sharp. There are no long-term commitments anywhere: every job is priced, approved, and done as a one-time visit. If you want us back later, we quote that fresh each time. Small lots start at $59 for a full mow, edge, and blowout.",
    ],
    localNote: "Serving Lake Highlands, Lakewood, Oak Cliff, Preston Hollow, and the rest of Dallas.",
  },
  "fort-worth": {
    name: "Fort Worth",
    headline: "One-time lawn jobs across Fort Worth.",
    paragraphs: [
      "Fort Worth lawns run big, and the grass never stops growing. Between Bermuda that outruns the mower and weeds that slip into every crack, keeping a yard sharp takes real work. LoveMeAfter Lawn Care does it one job at a time: mow, edge, and blowout from $59 by lot size, one-time fertilization from $99, and one-time weed control from $79. Every price is set from your photos and confirmed before we book, so the number you approve is the number you pay.",
      "Our crews cover Fort Worth neighborhoods all week — Tanglewood, Arlington Heights, Ridglea, Walsh, and everywhere in between. Whether it’s a sprawling lot that needs a proper cut or a rental property that needs to look presentable this week, we show up when we say we will and leave the place clean. Send photos of the front yard, the back yard, and the worst spot, and we’ll have your firm price in minutes. Want the yard fed at the same time? The mow + fertilization combo takes 15% off the second service.",
    ],
    localNote: "Serving Tanglewood, Arlington Heights, Ridglea, Walsh, and the rest of Fort Worth.",
  },
  arlington: {
    name: "Arlington",
    headline: "Arlington lawn care at firm, one-time prices.",
    paragraphs: [
      "Sitting between Dallas and Fort Worth means Arlington yards get both crowds’ weather — scorching summers, sudden storms, and weeds that love every gap. LoveMeAfter Lawn Care keeps it simple: send your yard photos, get a firm price in minutes, and we book your slot. A one-time mow, edge, and blowout runs $59–$99 by lot size. Fertilization treatments start at $99, weed control at $79, and the mow + fertilization combo takes 15% off the second service.",
      "We work all over Arlington — from Dalworthington Gardens and Pantego to the neighborhoods around Lake Arlington and UTA. Homeowners use us for the yards that need a reset before a gathering, rentals between tenants, and the back corners where the weeds have won. Every job is a one-time job, priced from your photos and confirmed before we book. No packages to pick, no fine print — approve the price, choose your day, and we handle the rest. Most jobs booked today are mowed tomorrow.",
    ],
    localNote: "Serving Dalworthington Gardens, Pantego, Lake Arlington, and the rest of Arlington.",
  },
  plano: {
    name: "Plano",
    headline: "Sharp lawns in Plano, priced from your photos.",
    paragraphs: [
      "Plano neighborhoods hold a standard — tidy edges, even color, and a front yard that looks cared for. Getting there takes more than a quick mow. LoveMeAfter Lawn Care does one-time jobs that add up: a precise cut with crisp edging and a full blowout from $59, a fertilization treatment matched to Bermuda, St. Augustine, or Zoysia from $99, and targeted weed control from $79. We price everything from your photos and confirm before we book.",
      "Our routes cover Plano all week — West Plano, Willow Bend, Preston Meadows, and the neighborhoods around Legacy and Downtown. Send three photos from your phone: front yard, back yard, and the worst spot. We’ll call you within 5 minutes with a firm price, and if you approve it, we book a day that works for you. Pair the mow with fertilization and take 15% off the second service. Every visit is a single, one-time job — done right, cleaned up, and confirmed with a photo when it’s finished.",
    ],
    localNote: "Serving West Plano, Willow Bend, Preston Meadows, Legacy, and the rest of Plano.",
  },
  garland: {
    name: "Garland",
    headline: "Garland yards handled — one job, one firm price.",
    paragraphs: [
      "Garland yards are full of mature trees, older St. Augustine lawns, and shade that weeds absolutely love. That mix needs a crew that pays attention: a cut at the right height, edges that stay defined, and weed control that actually targets what’s growing in your yard. LoveMeAfter Lawn Care does all three as one-time jobs — mow, edge, and blowout from $59 by lot size, fertilization from $99, and weed control from $79, every one priced from your photos.",
      "We’re in Garland neighborhoods every week — Firewheel, Duck Creek, Oaks, and the streets around downtown and Lake Ray Hubbard. Whether the front needs to look sharp for visitors or the back yard has quietly turned into a weed farm, send photos and we’ll call you within 5 minutes with a firm number. Book today and we can often mow tomorrow. No long-term commitments — just a job priced fairly, approved by you, and finished clean.",
    ],
    localNote: "Serving Firewheel, Duck Creek, Oaks, and the rest of Garland.",
  },
  irving: {
    name: "Irving",
    headline: "Irving lawn care that starts with your photos.",
    paragraphs: [
      "From Las Colinas townhomes to family lots near Valley Ranch, Irving yards come in every size — and so does our pricing. A one-time mow, edge, and blowout runs $59–$99 by lot size. One-time fertilization starts at $99, weed control at $79, and combining the mow with fertilization takes 15% off the second service. Send a few yard photos and we’ll call you within 5 minutes with your firm price, confirmed before we book.",
      "Irving’s heat and clay soil are hard on grass: Bermuda thins out, St. Augustine fights for shade, and weeds fill whatever’s left. We cut at the right height for your grass, keep the edges crisp along sidewalks and drives, and treat the weeds that have taken hold where you actually see them. Booked today, mowed tomorrow — leave the gate unlocked and we’ll send a note when the job is done. Every visit is a one-time job at the price you approved.",
    ],
    localNote: "Serving Las Colinas, Valley Ranch, Irving Heights, and the rest of Irving.",
  },
};

const SERVICES = [
  ["Mow, edge & blowout", "$59–$99 by lot size", "/services/mowing"],
  ["Fertilization treatment", "From $99", "/services/fertilization"],
  ["Weed control treatment", "From $79", "/services/weed-control"],
] as const;

export default function LawnArea() {
  const { city = "" } = useParams();
  const copy = CITIES[city];

  usePageMeta(
    copy ? `Lawn Care in ${copy.name}, Texas | LoveMeAfter Lawn Care` : "Service Areas | LoveMeAfter Lawn Care",
    copy
      ? `One-time mowing, fertilization, and weed control in ${copy.name}, TX. Priced from your photos, confirmed before we book. Call (424) 426-0760.`
      : "LoveMeAfter Lawn Care serves Dallas–Fort Worth. Call (424) 426-0760 to check your address.",
    `/areas/texas/${city}`,
  );

  if (!copy) {
    return (
      <div className="flex min-h-screen flex-col bg-[#fffefa]">
        <TopNav />
        <main className="flex-1">
          <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
            <p className={eyebrow}>Service area</p>
            <h1 className="mt-4 text-4xl text-[#12304d] sm:text-5xl">We might still reach you.</h1>
            <p className="mt-5 text-base leading-7 text-[#4e5964]">
              Our daily routes cover Dallas–Fort Worth — Dallas, Fort Worth, Arlington, Plano, Garland, and Irving. If you’re nearby, call us and we’ll confirm your address in a minute.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={PHONE_HREF} className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#174f8d] px-6 py-3 text-sm font-bold text-white hover:bg-[#0b3f78]"><Phone className="size-4" />{PHONE_DISPLAY}</a>
              <Link to="/get-quote" className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#174f8d]/35 bg-white px-6 py-3 text-sm font-bold text-[#0b3f78] hover:bg-[#f4ead7]">Get My Price<ArrowRight className="size-4" /></Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-2.5">
              {Object.entries(CITIES).map(([slug, cityCopy]) => (
                <Link key={slug} to={`/areas/texas/${slug}`} className="rounded-full border border-[#174f8d]/25 px-5 py-2.5 text-sm font-semibold text-[#0b3f78] hover:bg-[#f4ead7]">{cityCopy.name}</Link>
              ))}
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fffefa]">
      <TopNav />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#12304d] text-white">
          <img src="/images/products/imgi_5_Alside_CHO_Beauty5-1024x551.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center opacity-35" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#102b45]/95 via-[#12304d]/80 to-[#12304d]/30" />
          <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <p className={eyebrow + " text-[#ffdfa0]"}>Lawn care in {copy.name}, Texas</p>
            <h1 className="mt-4 max-w-[18ch] text-4xl leading-[1.03] sm:text-5xl lg:text-[3.5rem]">{copy.headline}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">{copy.localNote}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/get-quote" className="inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#0b3f78] transition hover:bg-[#f4ead7]">Get My Price<ArrowRight className="size-4" /></Link>
              <a href={PHONE_HREF} className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"><Phone className="size-4" />{PHONE_DISPLAY}</a>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
              <div>
                <h2 className="text-3xl text-[#12304d] sm:text-4xl">What we do in {copy.name}</h2>
                <div className="mt-6 space-y-5">
                  {copy.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className="text-base leading-7 text-[#3d4650]">{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 rounded-xl border border-[#1c2620]/12 bg-[#fffefa] p-6">
                  <p className={eyebrow}>Services & prices</p>
                  <ul className="mt-4 divide-y divide-[#1c2620]/12">
                    {SERVICES.map(([name, price, href]) => (
                      <li key={name} className="flex flex-wrap items-center justify-between gap-3 py-4">
                        <div>
                          <Link to={href} className="text-lg font-bold text-[#12304d] hover:text-[#174f8d]">{name}</Link>
                          <p className="mt-1 text-xs text-[#5d6268]">One-time job · priced from your photos</p>
                        </div>
                        <span className="rounded-full bg-[#f4ead7] px-4 py-1.5 text-sm font-extrabold text-[#0b3f78]">{price}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 rounded-md bg-[#f4ead7] px-4 py-3 text-sm font-semibold text-[#0b3f78]">Mow + fertilization combo: 15% off the second service.</p>
                  <Link to="/get-quote" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#174f8d] hover:text-[#0b3f78]">
                    Get my {copy.name} price<ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[.16em] text-[#a36a27] uppercase">Home-improvement inspiration</p>
                <h3 className="mt-3 text-2xl leading-tight text-[#12304d]">The outside makes the first impression.</h3>
                <p className="mt-3 text-sm leading-6 text-[#5d6268]">These exterior images are home-improvement inspiration, not lawn-care results. For the yard, we focus on clean cuts, crisp edges, and a tidy finish.</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <img src="/images/products/imgi_5_Alside_CHO_Beauty5-1024x551.jpg" alt="Home exterior shown as home-improvement inspiration" loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover" />
                  <img src="/images/products/imgi_7_Alside_GreenbriarVintage_Beauty-683x1024.png" alt="Exterior detail shown as home-improvement inspiration" loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover" />
                </div>
                <ul className="mt-6 space-y-3">
                  {["One-time jobs at firm prices", "Booked today, mowed tomorrow", "Gates closed, everything blown clean", "Photo note when the job is done"].map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-6 text-[#26313d]"><Check className="mt-1 size-4 shrink-0 text-[#a36a27]" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#174f8d] text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-[20ch] text-3xl leading-[1.05] sm:text-4xl">Get your {copy.name} yard on the schedule.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">Send your photos now and we’ll call you within 5 minutes with your firm price.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/get-quote" className="inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#0b3f78] transition hover:bg-[#f4ead7]">Get My Price<ArrowRight className="size-4" /></Link>
              <a href={PHONE_HREF} className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"><Phone className="size-4" />{PHONE_DISPLAY}</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
