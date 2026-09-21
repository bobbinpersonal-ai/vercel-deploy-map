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

/** Public estimate intake. It intentionally does not require auth so homeowners can request a callback. */
export const createEstimateLead = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    address: v.string(),
    city: v.string(),
    service: v.string(),
    estimatedValue: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("leads", {
      ...args,
      source: "inbound_web",
      stage: "new",
      notes: "Website free-estimate request",
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
  { name: "Summit Peak Roofing", trade: "Roofing", city: "Denver, CO", phone: "(303) 555-0142", rating: 4.9, jobsCompleted: 68, active: true, licensed: true },
  { name: "Front Range Siding Co.", trade: "Siding", city: "Aurora, CO", phone: "(720) 555-0188", rating: 4.7, jobsCompleted: 41, active: true, licensed: true },
  { name: "Midwest Window Works", trade: "Windows", city: "Kansas City, MO", phone: "(816) 555-0134", rating: 4.8, jobsCompleted: 55, active: true, licensed: true },
  { name: "Prairie Seamless Gutters", trade: "Gutters", city: "Wichita, KS", phone: "(316) 555-0177", rating: 4.6, jobsCompleted: 33, active: true, licensed: true },
  { name: "Hoosier Fence & Post", trade: "Fencing", city: "Indianapolis, IN", phone: "(317) 555-0163", rating: 4.5, jobsCompleted: 27, active: false, licensed: true },
  { name: "Casper Exteriors", trade: "Exterior Paint", city: "Casper, WY", phone: "(307) 555-0110", rating: 4.8, jobsCompleted: 49, active: true, licensed: true },
  { name: "Front Range Overhead Doors", trade: "Garage Doors", city: "Denver, CO", phone: "(303) 555-0195", rating: 4.6, jobsCompleted: 22, active: true, licensed: true },
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
  { name: "Dana Whitfield", phone: "(303) 555-0301", city: "Denver, CO", service: "Roofing", source: "google_search", stage: "new", estimatedValue: 18400, agent: "Maricel", notes: "Storm damage, three missing shingle fields. Wants us up before Friday.", ageHours: 0.2 },
  { name: "Ellis Nakamura", phone: "(720) 555-0302", city: "Aurora, CO", service: "Siding", source: "google_search", stage: "new", estimatedValue: 42750, agent: "Joel", notes: "Hail-bruised Hardie board on three elevations. Photos on file.", ageHours: 0.9 },
  { name: "Priya Raghavan", phone: "(816) 555-0303", city: "Kansas City, MO", service: "Windows", source: "referral", stage: "contacted", estimatedValue: 21800, agent: "Maricel", notes: "Twelve double-hung replacements, second storey access.", ageHours: 3 },
  { name: "Grant Buckley", phone: "(316) 555-0304", city: "Wichita, KS", service: "Gutters", source: "google_search", stage: "contacted", estimatedValue: 9400, agent: "Aiko", notes: "Seamless run plus fascia repair. Kansas AG registration verified.", ageHours: 5 },
  { name: "Willow Creek Property Mgmt", phone: "(317) 555-0305", city: "Indianapolis, IN", service: "Exterior Paint", source: "b2b_partner", stage: "qualified", estimatedValue: 31200, agent: "Joel", notes: "14-unit portfolio repaint. Recurring work, net-30 terms.", ageHours: 9 },
  { name: "Theodore Lindqvist", phone: "(317) 555-0306", city: "Fishers, IN", service: "Fence", source: "google_search", stage: "qualified", estimatedValue: 14600, agent: "Aiko", notes: "Cedar with steel posts, 180 linear ft. Wants it before winter.", ageHours: 14 },
  { name: "Rosa Delgado", phone: "(303) 555-0307", city: "Lakewood, CO", service: "Garage Doors", source: "outbound", stage: "qualified", estimatedValue: 12800, agent: "Maricel", notes: "Two-door replacement plus opener. Dialed from a local listing.", ageHours: 20 },
  { name: "Arden Blackwood", phone: "(816) 555-0308", city: "Lee's Summit, MO", service: "Roofing", source: "referral", stage: "quoted", estimatedValue: 38900, agent: "Joel", notes: "Hail claim filed. Meeting the adjuster on the roof Thursday.", ageHours: 30 },
  { name: "Hollis Grant", phone: "(317) 555-0309", city: "Carmel, IN", service: "Siding", source: "google_search", stage: "quoted", estimatedValue: 16750, agent: "Aiko", notes: "Front elevation only. Estimate issued with two paint options.", ageHours: 44 },
  { name: "Marlene Osei", phone: "(720) 555-0310", city: "Centennial, CO", service: "Windows", source: "b2b_partner", stage: "won", estimatedValue: 46300, agent: "Maricel", notes: "Signed via e-signature. Deposit collected on card, ACH for balance.", ageHours: 56 },
  { name: "Silas Romero", phone: "(303) 555-0311", city: "Denver, CO", service: "Roofing", source: "outbound", stage: "won", estimatedValue: 22100, agent: "Joel", notes: "Tear-off and re-deck. Payout scheduled on completion.", ageHours: 70 },
  { name: "June Halvorsen", phone: "(307) 555-0312", city: "Cheyenne, WY", service: "Gutters", source: "google_search", stage: "won", estimatedValue: 15400, agent: "Aiko", notes: "Full seamless run, colour-matched to trim.", ageHours: 88 },
  { name: "Bennett Cole", phone: "(316) 555-0313", city: "Derby, KS", service: "Exterior Paint", source: "google_search", stage: "lost", estimatedValue: 19900, agent: "Maricel", notes: "Went with a cheaper one-coat quote. Follow up next season.", ageHours: 96 },
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
  { title: "Whole-house window replacement — Osei", address: "1420 Alder St", city: "Kansas City, MO", service: "Windows", contractValue: 46300, payout: 28700, status: "in_progress", contractor: "Midwest Window Works", scheduleInHours: 0 },
  { title: "Full tear-off and re-deck", address: "88 Rowan Ave", city: "Denver, CO", service: "Roofing", contractValue: 22100, payout: 13500, status: "dispatched", contractor: "Summit Peak Roofing", scheduleInHours: 20 },
  { title: "Seamless gutter run, colour-matched", address: "7 Foxglove Ct", city: "Wichita, KS", service: "Gutters", contractValue: 15400, payout: 9200, status: "scheduled", contractor: "Prairie Seamless Gutters", scheduleInHours: 44 },
  { title: "Cedar fence with steel posts", address: "215 Larkspur Way", city: "Indianapolis, IN", service: "Fence", contractValue: 14600, payout: 8800, status: "scheduled", contractor: "Hoosier Fence & Post", scheduleInHours: 68 },
  { title: "Hardie board, three elevations", address: "930 Meridian Rd", city: "Aurora, CO", service: "Siding", contractValue: 42750, payout: 25600, status: "complete", contractor: "Front Range Siding Co.", scheduleInHours: -30 },
  { title: "14-unit exterior repaint — Willow Creek", address: "Multiple sites", city: "Casper, WY", service: "Exterior Paint", contractValue: 31200, payout: 18900, status: "complete", contractor: "Casper Exteriors", scheduleInHours: -52 },
  { title: "Two-door garage replacement + opener", address: "64 Briar Patch Ln", city: "Lakewood, CO", service: "Garage Doors", contractValue: 12800, payout: 7400, status: "paid", contractor: "Front Range Overhead Doors", scheduleInHours: -120 },
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
