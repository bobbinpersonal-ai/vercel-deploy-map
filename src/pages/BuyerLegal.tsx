import { Link } from "react-router";
import { LogoMark } from "@/components/Logo";
import { usePageMeta } from "@/components/PageMeta";

type LegalPageKind = "privacy" | "terms";

function BuyerLegal({ kind }: { kind: LegalPageKind }) {
  const privacy = kind === "privacy";
  usePageMeta(
    privacy ? "Privacy | LoveMeAfter Lawn Care" : "Terms | LoveMeAfter Lawn Care",
    privacy
      ? "How LoveMeAfter Lawn Care handles information submitted through its quote and contact forms."
      : "Terms for use of LoveMeAfter Lawn Care quote and contact pages.",
    `/${kind}`,
  );
  return (
    <main className="min-h-screen bg-white text-[#1c2620]">
      <header className="border-b border-[#1c2620]/10 bg-[#f2f6f3]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <LogoMark className="size-10" />
            <span className="text-sm font-extrabold text-[#14372a]">LoveMeAfter Lawn Care</span>
          </Link>
          <Link to="/get-quote" className="text-sm font-semibold text-[#175a3b]">Get a quote</Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-5 py-12 sm:py-20">
        <p className="text-[10px] font-bold tracking-[.18em] text-[#2f8f5b] uppercase">Draft for review · not legal advice</p>
        <h1 className="mt-4 text-4xl tracking-[-.03em] text-[#14372a] sm:text-5xl">{privacy ? "Privacy notice" : "Website terms"}</h1>
        <p className="mt-4 text-sm text-[#5c6b62]">Effective date: [SET BEFORE LAUNCH] · Operator: [INSERT LEGAL LLC NAME]</p>
        {TERMS_BODY(privacy)}
        <p className="mt-10 border-t border-[#1c2620]/10 pt-5 text-xs leading-5 text-[#5c6b62]">
          This is starter copy, not a completed legal policy. Replace every bracketed item and have counsel verify the live technologies, privacy obligations, contact disclosures, and service language before collecting leads.
        </p>
      </article>
      <footer className="border-t border-[#1c2620]/10 px-5 py-6 text-center text-xs text-[#5c6b62]">
        <Link to="/privacy" className="underline">Privacy</Link>
        <span className="mx-3">·</span>
        <Link to="/terms" className="underline">Terms</Link>
      </footer>
    </main>
  );
}

function TERMS_BODY(privacy: boolean) {
  return privacy ? (
    <div className="mt-10 space-y-8 text-sm leading-7 text-[#3d4c43]">
      <section>
        <h2 className="text-xl font-semibold text-[#14372a]">Information you submit</h2>
        <p className="mt-2">When you request a lawn quote, we collect the contact details you provide (name, phone, ZIP code), the yard photos you upload, your service and scheduling preferences, and the time and page associated with the submission. Don’t submit Social Security numbers, bank-account details, identity documents, or other sensitive information through these forms.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[#14372a]">How we use it</h2>
        <p className="mt-2">We use submitted information to price and schedule lawn care jobs, respond to inquiries, protect our operations, and meet legal obligations. Yard photos are used to prepare your price and to do the work. We may use service providers to operate the site, store records, or deliver communications. Add the actual providers and purposes here before launch.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[#14372a]">Texts, email, and choices</h2>
        <p className="mt-2">The text-message checkbox is optional. If you choose it, it records your consent to be contacted at the number provided, including about your quote and scheduling; message and data rates may apply and delivery is not guaranteed. Reply STOP to a text to opt out. Consent is not a condition of purchase. You can ask us to stop email follow-up or request access or deletion where applicable law provides that right.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[#14372a]">Retention and security</h2>
        <p className="mt-2">We retain records for as long as needed for the purposes above, legal requirements, or dispute handling. No internet system can be promised completely secure. Add the actual retention schedule and safeguards after reviewing the deployed systems.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[#14372a]">Contact and state rights</h2>
        <p className="mt-2">Privacy contact: [INSERT MONITORED EMAIL] · Mailing address: [INSERT BUSINESS MAILING ADDRESS]. The LLC, privacy counsel, and applicable-state disclosures must be confirmed before launch. If you are a California resident or live in another state with a privacy law, contact us using the final details above to ask about applicable rights.</p>
      </section>
    </div>
  ) : (
    <div className="mt-10 space-y-8 text-sm leading-7 text-[#3d4c43]">
      <section>
        <h2 className="text-xl font-semibold text-[#14372a]">Informational pages and quotes only</h2>
        <p className="mt-2">These pages let you request a price for lawn care work. The prices shown are firm for the described one-time job, but a quote is not a booking. Work is scheduled only when we confirm a date with you.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[#14372a]">One-time jobs</h2>
        <p className="mt-2">Every service offered on this site—mowing, fertilization, and weed control—is sold as a one-time job at the price quoted from your photos. If you want additional work later, we will quote that separately. You are never obligated to book again.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[#14372a]">Pricing and scheduling</h2>
        <p className="mt-2">Prices are based on the photos and details you provide. If the actual yard differs materially from what the photos show, we will discuss the price with you before any work begins—you approve any change before we start. Weather and access can move a scheduled date; we will reschedule at no charge.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[#14372a]">Site availability and local rules</h2>
        <p className="mt-2">Service is offered in the Dallas–Fort Worth area. Lawn care, pesticide and fertilizer application, licensing, marketing, and privacy rules differ by state and may change; the business must hold any credentials required for the work it performs in each location it serves.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[#14372a]">Contact</h2>
        <p className="mt-2">Operator: [INSERT LEGAL LLC NAME] · Contact: [INSERT MONITORED EMAIL AND MAILING ADDRESS]. Have counsel review this page before collecting leads.</p>
      </section>
    </div>
  );
}

export function PrivacyPage() { return <BuyerLegal kind="privacy" />; }
export function TermsPage() { return <BuyerLegal kind="terms" />; }
