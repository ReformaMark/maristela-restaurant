import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createOrders = mutation({
    args: {
        menuId: v.optional(v.id('menus')),
        familyMealId: v.optional(v.id('familyMeals')),
        menuName: v.string(),
        quantity: v.number(),
        status: v.union(
            v.literal('unconfirmed'),
            v.literal('confirmed'),
            v.literal('delivered'),
            v.literal('unsuccessful'),
        ),
        totalPrice: v.number(),
        userId: v.id('users'),
    },
    handler: async (ctx, args) => {
        const orderId = await ctx.db.insert("orders", {
            menuId: args.menuId,
            familyMealId: args.familyMealId,
            menuName: args.menuName,
            quantity: args.quantity,
            status: args.status,
            totalPrice: args.totalPrice,
            userId: args.userId,
        })

        return orderId

    },
});