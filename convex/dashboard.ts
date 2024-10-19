import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const totalUsers = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            return null
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            return null
        }

        return (await ctx.db.query("users").filter((q) => q.neq(q.field("role"), "admin")).collect()).length
    }
})

export const totalOrders = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            return null
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            return null
        }

        return (await ctx.db.query("transactions").collect()).length
    }
})

export const totalProducts = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            return null
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            return null
        }

        return (await ctx.db.query("menus").collect()).length
    }
})

export const totalRevenue = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            return null
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            return null
        }

        return (await ctx.db.query("orders").collect()).reduce((acc, order) => {
            return acc + order.totalPrice
        }, 0)
    }
})

export const topSellingProducts = query({
    handler: async (ctx) => {
        const limit = 5

        const products = await ctx.db
            .query("menus")
            .withIndex("by_totalUnitsSold")
            .order("desc")
            .take(limit);

        return Promise.all(
            products.map(async (product) => ({
                name: product.name,
                unitsSold: product.totalUnitsSold ?? 0,
                revenue: (product.totalUnitsSold ?? 0) * product.price,
                image: { url: await ctx.storage.getUrl(product.imageId as string) }
            }))
        )
    },
});


export const lowSellingProducts = query({
    handler: async (ctx) => {
        const limit = 5

        const products = await ctx.db
            .query("menus")
            .withIndex("by_totalUnitsSold")
            .order("asc")
            .take(limit);

        return Promise.all(
            products.map(async (product) => ({
                name: product.name,
                unitsSold: product.totalUnitsSold ?? 0,
                revenue: (product.totalUnitsSold ?? 0) * product.price,
                image: { url: await ctx.storage.getUrl(product.imageId as string) }
            }))
        )
    },
});

export const getProductPopularity = query({
    args: {},
    handler: async (ctx) => {
        const menus = await ctx.db
            .query("menus")
            .withIndex("by_totalUnitsSold")
            .order("desc")
            .collect();

        return menus.map(menu => ({
            name: menu.name,
            totalUnitsSold: menu.totalUnitsSold || 0
        }))
    }
})