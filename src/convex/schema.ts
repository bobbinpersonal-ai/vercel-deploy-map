import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

// ---------------------------------------------------------------------------
// Home improvement operations domain
// ---------------------------------------------------------------------------

// Where a lead entered the funnel (Pillar 1: demand capture).
export const LEAD_SOURCES = {
  GOOGLE_SEARCH: "google_search",
  OUTBOUND: "outbound",
  B2B_PARTNER: "b2b_partner",
  REFERRAL: "referral",
  INBOUND_WEB: "inbound_web",
} as const;

export const leadSourceValidator = v.union(
  v.literal(LEAD_SOURCES.GOOGLE_SEARCH),
  v.literal(LEAD_SOURCES.OUTBOUND),
  v.literal(LEAD_SOURCES.B2B_PARTNER),
  v.literal(LEAD_SOURCES.REFERRAL),
  v.literal(LEAD_SOURCES.INBOUND_WEB),
);
export type LeadSource = Infer<typeof leadSourceValidator>;

// Funnel stages (Pillar 3: sales & estimation).
export const LEAD_STAGES = {
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  QUOTED: "quoted",
  WON: "won",
  LOST: "lost",
} as const;

export const leadStageValidator = v.union(
  v.literal(LEAD_STAGES.NEW),
  v.literal(LEAD_STAGES.CONTACTED),
  v.literal(LEAD_STAGES.QUALIFIED),
  v.literal(LEAD_STAGES.QUOTED),
  v.literal(LEAD_STAGES.WON),
  v.literal(LEAD_STAGES.LOST),
);
export type LeadStage = Infer<typeof leadStageValidator>;

// Field execution lifecycle (Pillar 4 / Pillar 5).
export const JOB_STATUSES = {
  SCHEDULED: "scheduled",
  DISPATCHED: "dispatched",
  IN_PROGRESS: "in_progress",
  COMPLETE: "complete",
  PAID: "paid",
} as const;

export const jobStatusValidator = v.union(
  v.literal(JOB_STATUSES.SCHEDULED),
  v.literal(JOB_STATUSES.DISPATCHED),
  v.literal(JOB_STATUSES.IN_PROGRESS),
  v.literal(JOB_STATUSES.COMPLETE),
  v.literal(JOB_STATUSES.PAID),
);
export type JobStatus = Infer<typeof jobStatusValidator>;

// Home improvement service lines sold and dispatched.
export const SERVICE_LINES = [
  "Roofing",
  "Kitchen Remodel",
  "Bath Remodel",
  "Flooring",
  "Windows & Doors",
  "Exterior Painting",
  "Decks & Fencing",
  "Drywall & Repairs",
  "Basement Finishing",
  "Gutters & Siding",
] as const;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Qualified opportunities captured by the 24/7 intake team.
    leads: defineTable({
      name: v.string(),
      phone: v.string(),
      city: v.string(),
      address: v.optional(v.string()),
      service: v.string(),
      appointmentAt: v.optional(v.number()),
      appointmentNotes: v.optional(v.string()),
      source: leadSourceValidator,
      stage: leadStageValidator,
      estimatedValue: v.number(),
      notes: v.optional(v.string()),
      agent: v.optional(v.string()), // Philippines intake agent who handled it
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("by_stage", ["stage"])
      .index("by_createdAt", ["createdAt"]),

    contractorApplications: defineTable({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      company: v.string(),
      city: v.string(),
      trade: v.string(),
      weeklyCapacity: v.number(),
      notes: v.optional(v.string()),
      status: v.union(v.literal("new"), v.literal("reviewing"), v.literal("approved"), v.literal("declined")),
      createdAt: v.number(),
    }).index("by_status", ["status"]).index("by_createdAt", ["createdAt"]),

    // Vetted local crew partners that fulfill scope on site.
    contractors: defineTable({
      name: v.string(),
      trade: v.string(),
      city: v.string(),
      phone: v.string(),
      rating: v.number(),
      jobsCompleted: v.number(),
      active: v.boolean(),
      licensed: v.boolean(),
      createdAt: v.number(),
    }).index("by_trade", ["trade"]),

    // Dispatched field work and its payout milestone.
    jobs: defineTable({
      title: v.string(),
      address: v.string(),
      city: v.string(),
      service: v.string(),
      contractValue: v.number(),
      payout: v.number(),
      status: jobStatusValidator,
      scheduledFor: v.number(),
      contractorId: v.id("contractors"),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("by_status", ["status"])
      .index("by_contractor", ["contractorId"])
  },
  {
    schemaValidation: false,
  },
);

export default schema;
