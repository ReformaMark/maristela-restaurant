import { v } from "convex/values";
import { mutation } from "./_generated/server";

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