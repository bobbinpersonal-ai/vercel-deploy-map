import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";

async function requireUser(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) throw new Error("Sign in to use the workspace.");
  return userId;
}

export const listDocuments = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    return await ctx.db.query("workspaceDocuments").withIndex("by_updatedAt").order("desc").collect();
  },
});

export const listProjects = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const projects = await ctx.db.query("workspaceProjects").withIndex("by_updatedAt").order("desc").collect();
    return await Promise.all(projects.map(async (project) => ({
      ...project,
      tasks: await ctx.db.query("workspaceTasks").withIndex("by_project", (q) => q.eq("projectId", project._id)).collect(),
    })));
  },
});

export const listJobPosts = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    return await ctx.db.query("workspaceJobPosts").withIndex("by_updatedAt").order("desc").collect();
  },
});

export const createDocument = mutation({
  args: { title: v.string(), category: v.string(), content: v.string(), status: v.union(v.literal("draft"), v.literal("published")) },
  handler: async (ctx, args) => {
    const createdBy = await requireUser(ctx);
    return await ctx.db.insert("workspaceDocuments", { ...args, createdBy, updatedAt: Date.now() });
  },
});

export const updateDocument = mutation({
  args: { id: v.id("workspaceDocuments"), title: v.string(), category: v.string(), content: v.string(), status: v.union(v.literal("draft"), v.literal("published")) },
  handler: async (ctx, { id, ...changes }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { ...changes, updatedAt: Date.now() });
  },
});

export const createProject = mutation({
  args: { name: v.string(), description: v.string(), status: v.union(v.literal("planning"), v.literal("active"), v.literal("on_hold"), v.literal("complete")), dueAt: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const ownerId = await requireUser(ctx);
    return await ctx.db.insert("workspaceProjects", { ...args, ownerId, createdAt: Date.now(), updatedAt: Date.now() });
  },
});

export const updateProject = mutation({
  args: { id: v.id("workspaceProjects"), name: v.string(), description: v.string(), status: v.union(v.literal("planning"), v.literal("active"), v.literal("on_hold"), v.literal("complete")), dueAt: v.optional(v.number()) },
  handler: async (ctx, { id, ...changes }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { ...changes, updatedAt: Date.now() });
  },
});

export const createTask = mutation({
  args: { projectId: v.id("workspaceProjects"), title: v.string(), description: v.optional(v.string()), status: v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done")), dueAt: v.optional(v.number()) },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    return await ctx.db.insert("workspaceTasks", { ...args, createdAt: Date.now(), updatedAt: Date.now() });
  },
});

export const updateTaskStatus = mutation({
  args: { id: v.id("workspaceTasks"), status: v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done")) },
  handler: async (ctx, { id, status }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { status, updatedAt: Date.now() });
  },
});

export const createJobPost = mutation({
  args: { title: v.string(), department: v.string(), location: v.string(), description: v.string(), compensation: v.string(), status: v.union(v.literal("draft"), v.literal("open"), v.literal("closed")) },
  handler: async (ctx, args) => {
    const createdBy = await requireUser(ctx);
    return await ctx.db.insert("workspaceJobPosts", { ...args, createdBy, createdAt: Date.now(), updatedAt: Date.now() });
  },
});

export const updateJobPostStatus = mutation({
  args: { id: v.id("workspaceJobPosts"), status: v.union(v.literal("draft"), v.literal("open"), v.literal("closed")) },
  handler: async (ctx, { id, status }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { status, updatedAt: Date.now() });
  },
});
