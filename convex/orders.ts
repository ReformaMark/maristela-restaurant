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
       
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)
        if(userId === null) return
        // Insert the order into the "orders" collection
        const orderId = await ctx.db.insert("orders", {
            ...args,
            userId: userId,
            menuName: args.menuName ?? "",
            orderDate: Date.now()
        });

        // Fetch the inserted order by its ID
        const order = await ctx.db.get(orderId);

        // If the order wasn't found, return null explicitly
        if (!order) {
            return null;  // Make it explicit that null is returned if no order
        }

        // Return the order's ID
        return order._id;
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
