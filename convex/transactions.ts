import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createTransaction = mutation({
    args: {
        orders: v.array(v.id('orders')),
        mop: v.string(),
        status: v.union(
            v.literal('unconfirmed'),
            v.literal('confirmed'),
            v.literal('delivered'),
            v.literal('unsuccessful'),
        ),
        userId: v.id('users'),
        shippingId: v.id('shippingAddress')
    },
    handler: async (ctx, args) => {
        const transactionId = await ctx.db.insert("transactions", {
            orders: args.orders,
            mop: args.mop,
            status: args.status,
            userId: args.userId,
            shippingId: args.shippingId
        })

        return transactionId

    },
});

export const getAllTransactions = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (userId === null) {
            return null
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            return null
        }

        const transactions = await ctx.db
            .query("transactions")
            .collect()

        const transactionWithDetails = await Promise.all(transactions.map(async (transaction) => {
            const user = await ctx.db.get(transaction.userId)
            const shippingAddress = await ctx.db.get(transaction.shippingId)
            const orders = await Promise.all(transaction.orders.map(async (orderId) => {
                const order = await ctx.db.get(orderId)
                const menuItem = order?.menuId ? await ctx.db.get(order.menuId) : null
                const familyMeal = order?.familyMealId ? await ctx.db.get(order.familyMealId) : null
                return {
                    ...order,
                    menuItem,
                    familyMeal,
                }
            }))

            return {
                ...transaction,
                user,
                shippingAddress,
                orders,
            }
        }))

        return transactionWithDetails
    }
})