import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const current = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (userId === null) {
            return null
        }

        // const user = await ctx.db.get(userId)

        // return user

        return await ctx.db.get(userId)
    }
})

export const checkUserRole = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) return null

        const user = await ctx.db.get(userId)

        if (!user) return null

        return user.role
    }
})