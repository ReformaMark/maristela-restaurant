import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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

export const updateUser = mutation({
    args: {
        name: v.string(),
        lastName: v.string(),
        address: v.string(),
        barangay: v.string(),
        municipality: v.string(),
        province: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) return null

        await ctx.db.patch(userId, {
            name: args.name,
            lastName: args.lastName,
            address: args.address,
            barangay: args.barangay,
            municipality: args.municipality,
            province: args.province,
        })
    }
})
