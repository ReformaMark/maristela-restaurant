import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

export const createOrders = mutation({
    args: {
        menuId: v.optional(v.id('menus')),
        familyMealId: v.optional(v.id('familyMeals')),
        menuName: v.optional(v.string()),
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
        // Insert the order into the "orders" collection
        const orderId = await ctx.db.insert("orders", {
            menuId: args.menuId,
            familyMealId: args.familyMealId,
            menuName: args.menuName || "",
            quantity: args.quantity,
            status: args.status,
            totalPrice: args.totalPrice,
            userId: args.userId,
        });

        // Fetch the inserted order by its ID
        const id = await ctx.db.get(orderId);
        
        // If the order wasn't found, return null explicitly
        if (!id) {
            return null;  // Make it explicit that null is returned if no ID
        }
        
        // Return the order's ID
        return id._id as Id<'orders'>;
    },
});

export const getAllOrders = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (userId === null) {
            return []
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            return []
        }

        const orders = await ctx.db
            .query("orders")
            .collect()

        const ordersWithDetails = await Promise.all(orders.map(async (order) => {
            const user = await ctx.db.get(order.userId)
            const menuItem = order.menuId ? await ctx.db.get(order.menuId) : null
            const familyMeal = order.familyMealId ? await ctx.db.get(order.familyMealId) : null

            return {
                ...order,
                user: {
                    name: user?.name,
                    email: user?.email,
                    image: user?.image,
                },
                menuItem: {

                },
                familyMeal: {

                }
            }
        }))

        return ordersWithDetails
    }
})
