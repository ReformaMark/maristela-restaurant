
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
    getAll,
    getOneFrom,
    getManyFrom,
    getManyVia,
} from "convex-helpers/server/relationships";
import { getAuthUserId } from "@convex-dev/auth/server";
import { menuCategories } from "../data/menu-data";

export const allMenus = query({
    handler: async (ctx) => {
        const menus = await ctx.db.query("menus").collect();

        return Promise.all(menus.map(async (menu) => {
            const ratings = await getManyFrom(ctx.db, 'ratings', 'by_menu', menu._id, "menuId");
            return {
                ...menu,
                ...(menu.imageId === undefined)
                    ? ""
                    : { url: await ctx.storage.getUrl(menu.imageId) },
                ratings
            };
        }));
    }
});

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
        })

        return menuId
    }
})
