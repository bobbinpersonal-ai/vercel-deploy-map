import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, BookOpen, Check, Clock3, Phone, ShieldCheck } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { usePageMeta } from "@/components/PageMeta";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ExpertTopic } from "@/components/ExpertTopic";
import { PHOTO_CREDIT, px } from "@/data/photos";

type Post = {
  tag: string;
  image: string;
  title: string;
  read: string;
  copy: string;
  href: string;
  cta: string;
  photo: number;
};

const post = (
  tag: string,
  photo: number,
  title: string,
  read: string,
  copy: string,
  href: string,
  cta = "Read the guide",
): Post => ({ tag, photo, image: px(photo, 900), title, read, copy, href, cta });

const POSTS: Post[] = [
  post("Home value", 22485304, "Which home improvements actually pay back? Start with the outside.", "9 min read", "A sourced guide to resale value, daily-life value, and the difference between a national benchmark and what your own home can support.", "/insights/topics/home-improvement-roi"),
  post("Roofing", 237907, "The 7 questions to ask before signing a roofing contract", "6 min read", "A roof quote is only useful when the scope is clear. Learn what should be documented, what warranties really cover, and which promises are red flags.", "/services/roofing"),
  post("Storm damage", 18366307, "Hail damage: inspect first, file second", "5 min read", "Photos, a written scope, and an honest inspection give you a better starting point than rushing into a claim.", "/services/insurance-claims"),
  post("Windows", 39634957, "Why the cheapest window quote is rarely the cheapest project", "7 min read", "Compare installation method, glass package, trim work, labor, disposal, and warranty — not just the unit price.", "/services/windows"),
  post("Siding", 39281193, "A homeowner's guide to siding materials and prep", "8 min read", "The material matters, but the preparation underneath it determines how the exterior performs five years from now.", "/services/siding"),
  post("Gutters", 2663254, "Where your gutters should move water", "4 min read", "Learn how roof pitch, downspout placement, grading, and extensions protect the foundation.", "/services/gutters"),
  post("Budget", 4913326, "How to prioritize exterior work when everything needs attention", "6 min read", "Start with water, safety, and preventable damage. Then plan comfort and curb appeal in an order that makes financial sense.", "/services/pre-sale"),
  post("Kitchens", 8146322, "Cabinets, counters, and sinks: what actually drives a kitchen budget", "8 min read", "Cabinetry, counters, tile, and plumbing are the four lines that move a kitchen number the most. Here is the order to decide them in.", "/services/kitchens"),
  post("Bathrooms", 30629679, "Waterproofing is the whole ballgame in a bathroom remodel", "7 min read", "Tile failure is almost always a waterproofing failure. What to confirm before anyone sets a single tile.", "/services/bathrooms"),
  post("Flooring", 326862, "Choosing flooring that survives pets, kids, and water", "6 min read", "Hardwood, LVP, tile, and carpet compared on wear, moisture, repair, and resale — with honest trade-offs.", "/services/flooring"),
  post("Interior paint", 5583052, "Why paint prep decides whether the finish lasts", "5 min read", "Patching, sanding, priming, and cutting clean lines matter more than the brand on the can.", "/services/interior-painting"),
  post("HVAC", 18725613, "Right-sizing a furnace or AC unit matters more than the brand", "7 min read", "Oversized and undersized equipment both fail early. Why a load calculation is the first deliverable.", "/services/hvac"),
  post("Electrical", 5767595, "When your panel, not your appliances, is the problem", "6 min read", "Tripping breakers, EV chargers, and heat pumps all start with available capacity. How to check yours.", "/services/electrical"),
  post("Solar", 38021376, "Solar only pays off if the roof and panel come first", "7 min read", "Sequence matters. Removing and reinstalling an array later costs far more than doing the roof once.", "/services/solar"),
  post("Fencing", 30573147, "Privacy, pets, and property lines: planning a fence", "5 min read", "Setbacks, post depth, material choice, and gate placement decide whether a fence still stands straight in ten years.", "/services/fencing"),
  post("Paving", 6333640, "Driveway replacement: what happens under the surface", "6 min read", "Base preparation and drainage decide whether a new driveway lasts decades or cracks in two winters.", "/services/paving"),
  post("Insulation", 8082327, "The cheapest comfort upgrade most homes are missing", "6 min read", "Air sealing and insulation usually beat a bigger furnace on both comfort and monthly cost.", "/services/insulation"),
];

export default function Insights() {
  const navigate = useNavigate();
  usePageMeta(
    "Home Improvement Insights | LoveMeAfter",
    "Field guides for homeowners, installers and sales teams: project priorities, quote comparison, ROI benchmarks, installer margins and sales handoffs.",
  );
  return <main className="min-h-screen bg-[#f7f5f0] text-[#1d211d]"><header className="bg-[#182019] text-white"><nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10"><button onClick={() => navigate("/")} className="flex items-center gap-3 font-semibold"><span className="flex size-10 items-center justify-center rounded-full bg-[#d5ec77] text-[#1d211d]"><LogoMark className="size-5" /></span>LoveMeAfter</button><div className="flex items-center gap-4"><a href="tel:+14244260760" className="hidden items-center gap-2 text-sm text-white/75 sm:flex"><Phone className="size-4" /> 424 426 0760</a><Button onClick={() => navigate("/")} variant="ghost" className="text-white hover:bg-white/10 hover:text-white"><ArrowLeft className="mr-2 size-4" /> Back home</Button></div></nav></header><section className="bg-[#182019] text-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_.75fr] lg:items-end lg:px-10 lg:py-28"><div><p className="text-xs font-semibold tracking-[.18em] text-[#d5ec77] uppercase">The LoveMeAfter field guide</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-7xl">Better questions lead to better home projects.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">Straight answers for homeowners comparing quotes, planning exterior work, and trying to make a smart decision without becoming a contractor themselves.</p></div><div className="rounded-2xl bg-[#263227] p-7"><BookOpen className="size-6 text-[#d5ec77]" /><p className="mt-8 text-2xl font-semibold tracking-[-.03em]">Our point of view</p><p className="mt-3 text-sm leading-6 text-white/60">Educate first. Scope honestly. Recommend only the work that makes sense for the home.</p></div></div></section><section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{POSTS.map((post) => <article key={post.title} className="flex min-h-[280px] flex-col rounded-2xl border border-[#1d211d]/10 bg-white p-4"><div className="mb-5 h-32 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} /><div className="flex items-center justify-between px-3"><span className="text-xs font-semibold tracking-[.15em] text-[#71803d] uppercase">{post.tag}</span><Clock3 className="size-4 text-[#9aa095]" /></div><h2 className="mt-6 px-3 text-2xl font-semibold leading-tight tracking-[-.04em]">{post.title}</h2><p className="mt-3 px-3 text-sm leading-6 text-[#62695f]">{post.copy}</p><div className="mt-auto flex items-center justify-between px-3 pt-7 text-xs text-[#8a9287]"><span>{post.read}</span><Link to={post.href} className="flex items-center font-semibold text-[#71803d]">{post.cta} <ArrowUpRight className="ml-1 size-4" /></Link></div></article>)}</div><p className="mt-8 text-xs leading-5 text-[#71803d]">{PHOTO_CREDIT} Use the guides for decisions; use your inspection for the facts of your home.</p></section><ExpertTopic compact /><section className="border-y border-[#1d211d]/10 bg-[#eaf0d0]"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">A smarter planning system</p><h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">Knowledge is useful when it changes the decision.</h2></div><div className="grid gap-4 sm:grid-cols-3"><div className="bg-white/80 p-6"><p className="text-3xl font-semibold text-[#71803d]">01</p><h3 className="mt-8 text-lg font-semibold">Observe</h3><p className="mt-2 text-sm leading-6 text-[#62695f]">Look for water, safety, comfort, and preventable damage before aesthetics.</p></div><div className="bg-white/80 p-6"><p className="text-3xl font-semibold text-[#71803d]">02</p><h3 className="mt-8 text-lg font-semibold">Compare</h3><p className="mt-2 text-sm leading-6 text-[#62695f]">Ask what is included, what is not, and how the recommendation fits your home.</p></div><div className="bg-white/80 p-6"><p className="text-3xl font-semibold text-[#71803d]">03</p><h3 className="mt-8 text-lg font-semibold">Decide</h3><p className="mt-2 text-sm leading-6 text-[#62695f]">Choose a path because it makes sense—not because someone created artificial urgency.</p></div></div></div></div></section><section className="border-y border-[#1d211d]/10 bg-[#eaf0d0]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-28"><div><p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Our expert checklist</p><h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">Before you sign anything.</h2></div><ul className="space-y-4 text-sm leading-6 text-[#4f5a4d]"><li className="flex gap-3"><ShieldCheck className="size-5 shrink-0 text-[#71803d]" /> Ask for a line-by-line written scope, not a verbal promise.</li><li className="flex gap-3"><Check className="size-5 shrink-0 text-[#71803d]" /> Confirm insurance, registration, permits, and who is responsible for each one.</li><li className="flex gap-3"><Check className="size-5 shrink-0 text-[#71803d]" /> Compare installation, prep, cleanup, warranty, and payment schedule — not only materials.</li><li className="flex gap-3"><Check className="size-5 shrink-0 text-[#71803d]" /> Never accept an offer to waive or absorb an insurance deductible.</li></ul></div></section><section className="bg-[#d5ec77]"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-10"><div><p className="text-xs font-semibold tracking-[.18em] text-[#657035] uppercase">Have a project question?</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.055em] sm:text-5xl">Bring it to an expert.</h2></div><Button onClick={() => navigate("/")} className="h-14 rounded-full bg-[#1d211d] px-7 text-white hover:bg-[#30382f]">Get a free estimate <ArrowUpRight className="ml-2 size-5" /></Button></div></section></main>;
}
