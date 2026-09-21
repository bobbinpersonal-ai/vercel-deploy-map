"use node";

import { action } from "./_generated/server";

export const deploy = action({
  args: {},
  handler: async () => {
    const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

    if (!hookUrl) {
      throw new Error(
        "Vercel is not connected yet. Add VERCEL_DEPLOY_HOOK_URL in the Keys tab.",
      );
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(hookUrl);
    } catch {
      throw new Error("VERCEL_DEPLOY_HOOK_URL is not a valid URL.");
    }

    if (parsedUrl.hostname !== "api.vercel.com") {
      throw new Error("VERCEL_DEPLOY_HOOK_URL must point to api.vercel.com.");
    }

    const response = await fetch(parsedUrl, { method: "POST" });
    if (!response.ok) {
      throw new Error(`Vercel rejected the deployment (${response.status}).`);
    }

    const body = (await response.json().catch(() => null)) as
      | { job?: { id?: string } }
      | null;

    return {
      ok: true,
      jobId: body?.job?.id ?? null,
    };
  },
});
