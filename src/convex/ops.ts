import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";
import {
  jobStatusValidator,
  leadSourceValidator,
  leadStageValidator,
} from "./schema";

async function requireUser(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("Sign in to use the operations console.");
  }
  return userId;
}

/** Live pipeline, newest first. Reactive: the board updates as intake works. */
export const listLeads = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const leads = await ctx.db.query("leads").withIndex("by_createdAt").order("desc").take(200);
    return leads;
  },
});

export const listContractors = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    return await ctx.db.query("contractors").take(100);
  },
});

/** Dispatched work joined with the crew partner assigned to it. */
export const listJobs = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const jobs = await ctx.db.query("jobs").take(200);
    const withContractor = await Promise.all(
      jobs.map(async (job) => {
        const contractor = await ctx.db.get(job.contractorId);
        return {
          ...job,
          contractorName: contractor?.name ?? "Unassigned",
          contractorTrade: contractor?.trade ?? "",
        };
      }),
    );
    return withContractor.sort((a, b) => a.scheduledFor - b.scheduledFor);
  },
});

export const createLead = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    city: v.string(),
    service: v.string(),
    source: leadSourceValidator,
    estimatedValue: v.number(),
    notes: v.optional(v.string()),
    agent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const now = Date.now();
    return await ctx.db.insert("leads", {
      ...args,
      stage: "new",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateLeadStage = mutation({
  args: { id: v.id("leads"), stage: leadStageValidator },
  handler: async (ctx, { id, stage }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { stage, updatedAt: Date.now() });
  },
});

export const updateJobStatus = mutation({
  args: { id: v.id("jobs"), status: jobStatusValidator },
  handler: async (ctx, { id, status }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { status, updatedAt: Date.now() });
  },
});

export const setContractorActive = mutation({
  args: { id: v.id("contractors"), active: v.boolean() },
  handler: async (ctx, { id, active }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { active });
  },
});

const HOUR = 60 * 60 * 1000;

const DEMO_CONTRACTORS = [
  { name: "Meridian Roofing Co.", trade: "Roofing", city: "Portland, OR", phone: "(503) 555-0142", rating: 4.9, jobsCompleted: 68, active: true, licensed: true },
  { name: "Calder & Sons Carpentry", trade: "Kitchen Remodel", city: "Beaverton, OR", phone: "(503) 555-0188", rating: 4.7, jobsCompleted: 41, active: true, licensed: true },
  { name: "Northbank Tile & Bath", trade: "Bath Remodel", city: "Vancouver, WA", phone: "(360) 555-0134", rating: 4.8, jobsCompleted: 55, active: true, licensed: true },
  { name: "Halverson Floorworks", trade: "Flooring", city: "Salem, OR", phone: "(971) 555-0177", rating: 4.6, jobsCompleted: 33, active: true, licensed: true },
  { name: "Summit Window & Door", trade: "Windows & Doors", city: "Gresham, OR", phone: "(503) 555-0163", rating: 4.5, jobsCompleted: 27, active: false, licensed: true },
  { name: "Ridgeline Exteriors", trade: "Exterior Painting", city: "Hillsboro, OR", phone: "(971) 555-0110", rating: 4.8, jobsCompleted: 49, active: true, licensed: true },
];

type DemoLead = {
  name: string;
  phone: string;
  city: string;
  service: string;
  source: "google_search" | "outbound" | "b2b_partner" | "referral";
  stage: "new" | "contacted" | "qualified" | "quoted" | "won" | "lost";
  estimatedValue: number;
  agent: string;
  notes: string;
  ageHours: number;
};

const DEMO_LEADS: DemoLead[] = [
  { name: "Dana Whitfield", phone: "(503) 555-0301", city: "Portland, OR", service: "Roofing", source: "google_search", stage: "new", estimatedValue: 18400, agent: "Maricel", notes: "Storm damage, three missing shingle fields. Wants us out before Friday.", ageHours: 0.2 },
  { name: "Ellis Nakamura", phone: "(971) 555-0302", city: "Lake Oswego, OR", service: "Kitchen Remodel", source: "google_search", stage: "new", estimatedValue: 42750, agent: "Joel", notes: "Full gut, keeping the island. Photos of cabinet rot on file.", ageHours: 0.9 },
  { name: "Priya Raghavan", phone: "(360) 555-0303", city: "Vancouver, WA", service: "Bath Remodel", source: "referral", stage: "contacted", estimatedValue: 21800, agent: "Maricel", notes: "Repeat client from the Gladstone job. Wants curbless shower.", ageHours: 3 },
  { name: "Grant Buckley", phone: "(503) 555-0304", city: "Beaverton, OR", service: "Flooring", source: "google_search", stage: "contacted", estimatedValue: 9400, agent: "Aiko", notes: "1,400 sq ft LVP over slab. Moisture reading pending.", ageHours: 5 },
  { name: "Willow Creek Property Mgmt", phone: "(503) 555-0305", city: "Portland, OR", service: "Drywall & Repairs", source: "b2b_partner", stage: "qualified", estimatedValue: 31200, agent: "Joel", notes: "14-unit portfolio. Recurring turn work, net-30 terms.", ageHours: 9 },
  { name: "Theodore Lindqvist", phone: "(971) 555-0306", city: "Tigard, OR", service: "Windows & Doors", source: "google_search", stage: "qualified", estimatedValue: 14600, agent: "Aiko", notes: "9 double-hung replacements, second storey access.", ageHours: 14 },
  { name: "Rosa Delgado", phone: "(503) 555-0307", city: "Gresham, OR", service: "Exterior Painting", source: "outbound", stage: "qualified", estimatedValue: 12800, agent: "Maricel", notes: "Dialed from a Craigslist listing, deck refinish bundled in.", ageHours: 20 },
  { name: "Arden Blackwood", phone: "(360) 555-0308", city: "Camas, WA", service: "Basement Finishing", source: "referral", stage: "quoted", estimatedValue: 38900, agent: "Joel", notes: "Quote issued Tuesday. Financing pre-approval running.", ageHours: 30 },
  { name: "Hollis Grant", phone: "(503) 555-0309", city: "Hillsboro, OR", service: "Gutters & Siding", source: "google_search", stage: "quoted", estimatedValue: 16750, agent: "Aiko", notes: "Seamless gutter run plus fascia repair.", ageHours: 44 },
  { name: "Marlene Osei", phone: "(971) 555-0310", city: "Oregon City, OR", service: "Kitchen Remodel", source: "b2b_partner", stage: "won", estimatedValue: 46300, agent: "Maricel", notes: "Signed via e-signature. 30% deposit collected on card.", ageHours: 56 },
  { name: "Silas Romero", phone: "(503) 555-0311", city: "Portland, OR", service: "Roofing", source: "outbound", stage: "won", estimatedValue: 22100, agent: "Joel", notes: "Tear-off and re-deck. Payout scheduled on completion.", ageHours: 70 },
  { name: "June Halvorsen", phone: "(503) 555-0312", city: "Milwaukie, OR", service: "Decks & Fencing", source: "google_search", stage: "won", estimatedValue: 15400, agent: "Aiko", notes: "Cedar deck rebuild, 320 sq ft.", ageHours: 88 },
  { name: "Bennett Cole", phone: "(360) 555-0313", city: "Battle Ground, WA", service: "Bath Remodel", source: "google_search", stage: "lost", estimatedValue: 19900, agent: "Maricel", notes: "Went with a cheaper handyman quote. Follow up next season.", ageHours: 96 },
];

type DemoJob = {
  title: string;
  address: string;
  city: string;
  service: string;
  contractValue: number;
  payout: number;
  status: "scheduled" | "dispatched" | "in_progress" | "complete" | "paid";
  contractor: string;
  scheduleInHours: number;
};

const DEMO_JOBS: DemoJob[] = [
  { title: "Kitchen gut remodel — Osei residence", address: "1420 Alder St", city: "Oregon City, OR", service: "Kitchen Remodel", contractValue: 46300, payout: 28700, status: "in_progress", contractor: "Calder & Sons Carpentry", scheduleInHours: 0 },
  { title: "Full tear-off and re-deck", address: "88 Rowan Ave", city: "Portland, OR", service: "Roofing", contractValue: 22100, payout: 13500, status: "dispatched", contractor: "Meridian Roofing Co.", scheduleInHours: 20 },
  { title: "Cedar deck rebuild, 320 sq ft", address: "7 Foxglove Ct", city: "Milwaukie, OR", service: "Decks & Fencing", contractValue: 15400, payout: 9200, status: "scheduled", contractor: "Calder & Sons Carpentry", scheduleInHours: 44 },
  { title: "Primary bath — curbless shower conversion", address: "215 Larkspur Way", city: "Vancouver, WA", service: "Bath Remodel", contractValue: 21800, payout: 13200, status: "scheduled", contractor: "Northbank Tile & Bath", scheduleInHours: 68 },
  { title: "1,400 sq ft LVP install over slab", address: "930 Meridian Rd", city: "Beaverton, OR", service: "Flooring", contractValue: 9400, payout: 5600, status: "complete", contractor: "Halverson Floorworks", scheduleInHours: -30 },
  { title: "14-unit drywall turn — Willow Creek", address: "Multiple sites", city: "Portland, OR", service: "Drywall & Repairs", contractValue: 31200, payout: 18900, status: "complete", contractor: "Ridgeline Exteriors", scheduleInHours: -52 },
  { title: "Exterior repaint + fascia repair", address: "64 Briar Patch Ln", city: "Gresham, OR", service: "Exterior Painting", contractValue: 12800, payout: 7400, status: "paid", contractor: "Ridgeline Exteriors", scheduleInHours: -120 },
];

/** One-tap demo data so the console is never an empty shell. */
export const seedDemo = mutation({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const existing = await ctx.db.query("leads").first();
    if (existing) return { seeded: false };

    const now = Date.now();
    const contractorIds = new Map<string, Awaited<ReturnType<typeof ctx.db.insert<"contractors">>>>();

    for (const contractor of DEMO_CONTRACTORS) {
      const id = await ctx.db.insert("contractors", { ...contractor, createdAt: now });
      contractorIds.set(contractor.name, id);
    }

    for (const lead of DEMO_LEADS) {
      const { ageHours, ...rest } = lead;
      const createdAt = now - ageHours * HOUR;
      await ctx.db.insert("leads", { ...rest, createdAt, updatedAt: createdAt });
    }

    for (const job of DEMO_JOBS) {
      const { contractor, scheduleInHours, ...rest } = job;
      const contractorId = contractorIds.get(contractor);
      if (!contractorId) continue;
      await ctx.db.insert("jobs", {
        ...rest,
        contractorId,
        scheduledFor: now + scheduleInHours * HOUR,
        createdAt: now,
        updatedAt: now,
      });
    }

    return { seeded: true };
  },
});
