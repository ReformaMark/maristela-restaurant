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
                image: { url: await ctx.storage.getUrl(product.imageId as string) },
                category: product.category
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
                image: { url: await ctx.storage.getUrl(product.imageId as string) },
                category: product.category,
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

export const getOrderPopularity = query({
    args: {},
    handler: async (ctx) => {
        const transactions = await ctx.db
            .query("transactions")
            .filter((q) =>
                q.or(
                    q.eq(q.field("status"), "Completed"),
                    q.eq(q.field("status"), "Cancelled"),
                )
            )
            .collect()

        const statusCounts = {
            Completed: 0,
            Cancelled: 0
        };

        transactions.forEach(transaction => {
            statusCounts[transaction.status as keyof typeof statusCounts]++
        })

        const totalOrders = statusCounts.Completed + statusCounts.Cancelled;

        return [
            {
                orderType: "Completed",
                value: statusCounts.Completed,
                percentage: (statusCounts.Completed / totalOrders) * 100,
                fill: "#22c55e"
            },
            {
                orderType: "Cancelled",
                value: statusCounts.Cancelled,
                percentage: (statusCounts.Cancelled / totalOrders) * 100,
                fill: "#dc2626"
            }
        ]

    }
})