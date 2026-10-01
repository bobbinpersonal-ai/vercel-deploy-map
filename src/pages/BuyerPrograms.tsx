import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ClipboardList, HandCoins, LoaderCircle } from "lucide-react";
import { Link } from "react-router";
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { LogoMark } from "@/components/Logo";
import { usePageMeta } from "@/components/PageMeta";

const inputClass = "mt-2 h-12 w-full rounded-sm border border-[#252923]/15 bg-[#fbf9f3] px-4 text-sm outline-none focus:border-[#65735b] focus:ring-2 focus:ring-[#65735b]/15";

type Program = "investors" | "refer";

export default function BuyerProgram({ program }: { program: Program }) {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const investor = program === "investors";
  usePageMeta(investor ? "Investor Buyers | LoveMeAfter Home Buyers" : "Property Referral | LoveMeAfter Home Buyers", investor ? "Register your real estate acquisition criteria and markets with LoveMeAfter Home Buyers." : "Send a property referral to LoveMeAfter Home Buyers for review. Any referral fee depends on state law and a separate written agreement.", `/${program}`);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const source = investor ? "investor_buyer_signup" : "property_referral_signup";
      const leadRef = doc(collection(db, "leads"));
      const mailRef = doc(collection(db, "mail"));
      const details = Object.fromEntries([...data.entries()].filter(([key]) => key !== "feeNotice" && key !== "proofOfFunds"));
      const batch = writeBatch(db);
      batch.set(leadRef, {
        name: String(data.get("name") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        service: investor ? "Investor buyer registration" : "Property referral inquiry",
        source,
        stage: "new",
        ...(investor ? {
          company: String(data.get("company") ?? "").trim(),
          markets: String(data.get("markets") ?? "").trim(),
          propertyTypes: String(data.get("propertyTypes") ?? "").trim(),
          priceRange: String(data.get("priceRange") ?? "").trim(),
          proofOfFundsConfirmed: data.get("proofOfFunds") === "on",
        } : {
          propertyAddress: String(data.get("propertyAddress") ?? "").trim(),
          relationship: String(data.get("relationship") ?? "").trim(),
          referralTermsAcknowledged: data.get("feeNotice") === "on",
        }),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      batch.set(mailRef, {
        to: ["hello@lovemeafter.com"],
        from: "LoveMeAfter <hello@lovemeafter.com>",
        message: {
          subject: investor ? "New investor buyer registration" : "New property referral inquiry",
          text: JSON.stringify(details, null, 2),
          html: `<div style="font-family:Arial,sans-serif;color:#252923"><h2>New ${investor ? "investor buyer" : "property referral"} inquiry</h2><p>Lead record: ${leadRef.id}</p><p>See the plain-text message for submitted details.</p></div>`,
        },
        source,
        leadId: leadRef.id,
        createdAt: serverTimestamp(),
      });
      await batch.commit();
      setSubmitted(true);
      form.reset();
    } catch (cause) {
      console.error("Could not submit buyer program form", cause);
      setError("We couldn’t save this just now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="min-h-screen bg-[#f3f0e8] text-[#252923]">
    <header className="border-b border-[#252923]/10 bg-[#fbf9f3]"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><Link to="/" className="flex items-center gap-3"><LogoMark className="size-10" /><span className="text-sm font-bold">LoveMeAfter <span className="font-medium text-[#65735b]">Home Buyers</span></span></Link><nav className="flex gap-4 text-xs font-semibold sm:gap-6 sm:text-sm"><Link to="/sell-your-house">Sell a house</Link><Link to="/sell-your-land">Sell land</Link><Link to={investor ? "/refer" : "/investors"}>{investor ? "Refer a property" : "Investor buyers"}</Link></nav></div></header>
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:py-20 lg:grid-cols-[.9fr_1.1fr]">
      <div><p className="text-[10px] font-bold tracking-[.18em] text-[#65735b] uppercase">{investor ? "Buyer registration" : "Property referral"}</p><h1 className="mt-4 text-5xl leading-[.95] tracking-[-.055em] sm:text-6xl">{investor ? "Tell us what you buy." : "Know a property we should review?"}</h1><p className="mt-5 max-w-xl text-base leading-7 text-[#62695f]">{investor ? "Share your criteria and target markets. We’ll keep your information with our acquisition records and contact you if a property appears to match. Registration doesn’t guarantee deal flow." : "Send the property location and your relationship to it. We’ll review the lead and confirm any next steps in writing. Don’t share an owner’s private contact details unless you have permission to do so."}</p>
        <div className="mt-8 border-l-2 border-[#93442e] pl-4 text-sm leading-6 text-[#62695f]">{investor ? "We don’t publish a buyer list or promise access to deals. Any purchase, assignment, or closing depends on a specific written agreement and applicable law." : "The proposed referral range is $500–$1,000 for a qualifying referral, not a guaranteed payment. Payment is subject to state law, eligibility, and a separate written agreement approved for the property’s state. We won’t pay a fee where it isn’t lawful."}</div>
        {investor ? <div className="mt-8 flex gap-3 border-t border-[#252923]/10 pt-5"><ClipboardList className="mt-1 size-5 shrink-0 text-[#93442e]" /><p className="text-sm leading-6 text-[#62695f]">Useful details: markets, property type, purchase range, timing, and verified funds available for acquisition.</p></div> : <div className="mt-8 flex gap-3 border-t border-[#252923]/10 pt-5"><HandCoins className="mt-1 size-5 shrink-0 text-[#93442e]" /><p className="text-sm leading-6 text-[#62695f]">A referral is an introduction only. Don’t negotiate, show property, advise an owner, or market a contract on our behalf unless counsel confirms you’re authorized.</p></div>}
      </div>
      <div className="border border-[#252923]/12 bg-[#e9e5db] p-5 sm:p-8">{submitted ? <div className="flex min-h-96 flex-col justify-center"><Check className="size-8 text-[#65735b]" /><h2 className="mt-5 text-3xl">Thanks. We received it.</h2><p className="mt-3 text-sm leading-6 text-[#62695f]">This is an inquiry, not a promise of a purchase, assignment, referral fee, or other agreement.</p><button className="mt-5 self-start text-sm font-semibold text-[#93442e]" onClick={() => setSubmitted(false)}>Send another <ArrowUpRight className="ml-1 inline size-4" /></button></div> : <><h2 className="text-3xl">{investor ? "Buyer criteria" : "Referral details"}</h2><p className="mt-2 text-sm leading-6 text-[#62695f]">Fields marked * are required.</p><form onSubmit={submit} className="mt-6 space-y-4"><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold">Name *<input name="name" required autoComplete="name" className={inputClass} /></label><label className="text-xs font-semibold">Email *<input name="email" type="email" required autoComplete="email" className={inputClass} /></label><label className="text-xs font-semibold">Phone<input name="phone" type="tel" autoComplete="tel" className={inputClass} /></label>{investor ? <label className="text-xs font-semibold">Company<input name="company" className={inputClass} /></label> : <label className="text-xs font-semibold">Your relationship to the property *<select name="relationship" required defaultValue="" className={inputClass}><option value="" disabled>Select one</option><option>Owner</option><option>Family member or representative</option><option>Neighbor or community contact</option><option>Other</option></select></label>}</div>
        {investor ? <><label className="block text-xs font-semibold">Markets you’re prepared to buy in *<textarea name="markets" required className="mt-2 min-h-24 w-full border border-[#252923]/15 bg-[#fbf9f3] p-3 text-sm outline-none focus:border-[#65735b]" placeholder="List states, cities, or counties" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold">Property types *<select name="propertyTypes" required defaultValue="" className={inputClass}><option value="" disabled>Select one</option><option>Single-family</option><option>Small multi-family</option><option>Land</option><option>Other</option></select></label><label className="text-xs font-semibold">Typical purchase range *<input name="priceRange" required className={inputClass} placeholder="For example: $100,000–$250,000" /></label></div><label className="flex items-start gap-3 text-xs leading-5 text-[#62695f]"><input type="checkbox" name="proofOfFunds" required className="mt-1 size-4 accent-[#93442e]" /><span>I confirm I can provide current proof of funds or financing evidence before making an offer. This checkbox doesn’t upload or verify documents.</span></label></> : <><label className="block text-xs font-semibold">Property address or parcel location *<textarea name="propertyAddress" required className="mt-2 min-h-24 w-full border border-[#252923]/15 bg-[#fbf9f3] p-3 text-sm outline-none focus:border-[#65735b]" /></label><label className="flex items-start gap-3 text-xs leading-5 text-[#62695f]"><input type="checkbox" name="feeNotice" required className="mt-1 size-4 accent-[#93442e]" /><span>I understand a referral fee isn’t guaranteed. Any fee requires legal review for the property’s state and a separate written agreement before work begins.</span></label></>}
        {error && <p role="alert" className="text-sm text-red-900">{error}</p>}<button disabled={busy} className="inline-flex h-12 items-center justify-center gap-2 bg-[#93442e] px-5 text-sm font-semibold text-white hover:bg-[#793923] disabled:opacity-60">{busy ? <><LoaderCircle className="size-4 animate-spin" /> Sending…</> : <>Submit for review <ArrowUpRight className="size-4" /></>}</button></form></>}</div>
    </section><footer className="border-t border-[#252923]/10 bg-[#fbf9f3]"><div className="mx-auto flex max-w-6xl flex-wrap gap-5 px-5 py-7 text-xs text-[#62695f]"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href="mailto:hello@lovemeafter.com">Contact</a><span>LoveMeAfter Home Buyers</span></div></footer>
  </main>;
}

export function InvestorsPage() { return <BuyerProgram program="investors" />; }
export function ReferralPage() { return <BuyerProgram program="refer" />; }
