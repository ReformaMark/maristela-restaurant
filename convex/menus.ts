
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
    getManyFrom,
} from "convex-helpers/server/relationships";
import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";
import { Id } from "./_generated/dataModel";


export const allMenus = query({
    handler: async (ctx) => {
        const menus = await ctx.db
            .query("menus")
            .order("desc")
           
            .collect();

        return Promise.all(menus.map(async (menu) => {
            const ratings = (await getManyFrom(ctx.db, 'ratings', 'by_menu', menu._id, "menuId"))
           
            const ratingsWithUser = await Promise.all(
                ratings.map(async (rating) => {
                    const user = await ctx.db.get(rating.userId); // Fetch the user document
                    return {
                        ...rating,
                        user: user ? user : null, // Include the user document, or null if not found
                    };
                })
            );
            return {
                ...menu,
                ...(menu.imageId === undefined)
                    ? ""
                    : { url: await ctx.storage.getUrl(menu.imageId) },
                ratings: ratingsWithUser
            };
        }));
    }
});

export const searchMenus = query({
    args: {
        search: v.string()
    },
    handler: async(ctx, args)=>{
        const menus = await ctx.db.query('menus')
        .withSearchIndex('search_name', (q)=> 
        q.search('name', args.search)).collect()

        return Promise.all(menus.map(async (menu) => {
            const ratings = (await getManyFrom(ctx.db, 'ratings', 'by_menu', menu._id, "menuId"))
           
            const ratingsWithUser = await Promise.all(
                ratings.map(async (rating) => {
                    const user = await ctx.db.get(rating.userId); // Fetch the user document
                    return {
                        ...rating,
                        user: user ? user : null, // Include the user document, or null if not found
                    };
                })
            );
            return {
                ...menu,
                ...(menu.imageId === undefined)
                    ? ""
                    : { url: await ctx.storage.getUrl(menu.imageId) },
                ratings: ratingsWithUser
            };
        }));
    },
})
export const getOneMenu = query({
    args: {
        menuId: v.optional(v.id('menus'))
    },
    handler: async (ctx, args) => {
        if (args.menuId) {
            const menu = await ctx.db.get(args.menuId)
            if (menu) {
                return {
                    ...menu,
                    ...(menu.imageId === undefined)
                        ? ""
                        : { url: await ctx.storage.getUrl(menu.imageId) },
                }
            }
        }
    }
})

export const create = mutation({
    args: {
        image: v.id("_storage"),

        category: v.union(
            v.literal('Chicken'),
            v.literal('Pork'),
            v.literal('Pancit & Pasta'),
            v.literal('Extras'),
            v.literal('Beverages'),
            v.literal('Sizzling Plate'),
            v.literal('Super Silog Meals'),
            v.literal('Seafood'),
            v.literal('Veggies'),
        ),

        name: v.string(),
        prepTime: v.string(),
        description: v.string(),

        recommended: v.boolean(),
        special: v.boolean(),

        price: v.number(),
        quantity: v.number(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            throw new Error("Unauthorized")
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            throw new Error("Unauthorized")
        }

        if (args.price < 0 || args.quantity < 0) {
            throw new Error("Invalid input, price, prep time and quantity cannot be negative")
        }

        if (args.image.length === 0) {
            throw new Error("Invalid input, image cannot be empty")
        }

        const isAvailable = args.quantity > 0

        const prepTimeString = args.prepTime.toString()

        const menuId = await ctx.db.insert("menus", {
            category: args.category,
            name: args.name,
            price: args.price,
            prepTime: prepTimeString,
            description: args.description,
            recommended: args.recommended,
            special: args.special,
            imageId: args.image,
            quantity: args.quantity,
            available: isAvailable,
            isArchived: false,
        })

        return menuId
    }
})

export const updateMenu = mutation({
    args: {
        id: v.id('menus'),
        image: v.optional(v.id("_storage")),
        category: v.optional(v.union(
            v.literal('Chicken'),
            v.literal('Pork'),
            v.literal('Pancit & Pasta'),
            v.literal('Extras'),
            v.literal('Beverages'),
            v.literal('Sizzling Plate'),
            v.literal('Super Silog Meals'),
            v.literal('Seafood'),
            v.literal('Veggies'),
        )),
        name: v.optional(v.string()),
        prepTime: v.optional(v.string()),
        description: v.optional(v.string()),
        recommended: v.optional(v.boolean()),
        special: v.optional(v.boolean()),
        price: v.optional(v.number()),
        quantity: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            throw new Error("Unauthorized")
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            throw new Error("Unauthorized")
        }

        if (args.id.length === 0) {
            throw new Error("Invalid input, id cannot be empty")
        }

        await ctx.db.patch(args.id, {
            category: args.category,
            name: args.name,
            price: args.price,
            prepTime: args.prepTime,
            description: args.description,
            recommended: args.recommended,
            special: args.special,
            imageId: args.image,
            quantity: args.quantity,
        })

        return args.id
    }
})

export const deleteMenu = mutation({
    args: {
        id: v.id('menus')
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            throw new Error("Unauthorized")
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            throw new Error("Unauthorized")
        }

        if (args.id.length === 0) {
            throw new Error("Invalid input, id cannot be empty")
        }

        await ctx.db.delete(args.id)

        return args.id
    }
})

export const archiveMenu = mutation({
    args: {
        id: v.id('menus'),
        isArchived: v.boolean(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            throw new Error("Unauthorized")
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            throw new Error("Unauthorized")
        }

        if (args.isArchived !== true && args.isArchived !== false) {
            throw new Error("Invalid action")
        }

       await ctx.db.patch(args.id, {
            isArchived: args.isArchived
        })

        return args.isArchived;
    }
})

export const personalizedRecommendation = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (userId == null) return null;

        const latestTransaction = await ctx.db.query('transactions').order('desc').first();

        if (!latestTransaction?.orders) return null;
        const categories: string[] = [];

        await asyncMap(latestTransaction.orders, async (orderId) => {
            const order = await ctx.db.get(orderId);
            const orderMenuId = order?.menuId;
            if (!orderMenuId) return null;
            const menu = await ctx.db.get(orderMenuId);
            const category = menu?.category;
            if (category && !categories.includes(category)) {
                categories.push(category);
            }
            return { category, orderId }; // Extract category and orderId
        });
        const topMenusByCategory = await asyncMap(categories, async (category) => {
            const menus = await ctx.db.query('menus').filter(q => q.eq(q.field('category'), category)).collect();

            const orderCounts = await asyncMap(menus, async (menu) => {
                const menuId = menu._id;
                const orders = await ctx.db.query('orders').filter(q => q.eq(q.field('menuId'), menuId)).collect();
                return {
                    menuId,
                    numberOfOrders: orders.length,
                };
            });

            const sortedOrderCounts = orderCounts.sort((a, b) => b.numberOfOrders - a.numberOfOrders);
            const topThreeMenus = sortedOrderCounts.slice(0, 3);
            const topThree = await asyncMap(topThreeMenus, async ({ menuId }) => {
                const menu = await ctx.db.get(menuId);
                const ratings = await getManyFrom(ctx.db, 'ratings', 'by_menu', menuId, "menuId");

                const ratingsWithUser = await Promise.all(
                    ratings.map(async (rating) => {
                        const user = await ctx.db.get(rating.userId);
                        return {
                            ...rating,
                            user: user ? user : null,
                        };
                    })
                );
          
                return {
                    ...menu,
                    ...(menu?.imageId === undefined ? {} : { url: await ctx.storage.getUrl(menu.imageId) }),
                    ratings: ratingsWithUser,
                };
            });


            return topThree
        });

        return topMenusByCategory;
    }
});
