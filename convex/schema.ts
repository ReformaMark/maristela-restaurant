import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    users: defineTable({
        image: v.optional(v.string()),
        email: v.optional(v.string()),
        emailVerificationTime: v.optional(v.number()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        isAnonymous: v.optional(v.boolean()),
        name: v.string(),
        lastName: v.optional(v.string()),
        role: v.union(v.literal("user"), v.literal("admin")),
        address: v.optional(v.string()),
        cartItems: v.optional(v.array(v.id('cart'))),
        ratings: v.optional(v.array(v.id("ratings"))),
        orders: v.optional(v.array(v.id("orders"))),
        transactions: v.optional(v.array(v.id("transactions"))),
    }),
    menus: defineTable({
        imageId: v.optional(v.id('_storage')),
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
        available: v.boolean(),
        price: v.number(),
        special: v.optional(v.boolean()),
        recommended: v.optional(v.boolean()),
        prepTime: v.optional(v.string()),
        description: v.optional(v.string()),
        quantity: v.optional(v.number()),
    }).index('by_name', ['name']),
    familyMeals: defineTable({
        menus: v.array(v.id('menus')),
        price: v.number(),
        goodFor: v.string(),
    }),
    orders: defineTable({
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
    }).index('by_user', ['userId']),
    transactions: defineTable({
        orders: v.array(v.id('orders')),
        mop: v.string(),
        userId: v.id('users'),
    }),
    ratings: defineTable({
        stars: v.optional(v.number()),
        feedbackMessage: v.optional(v.string()),
        userId: v.id("users"),
        menuId: v.id('menus')
    }).index('by_menu', ['menuId']),

    cartItems: defineTable({
        menuId: v.optional(v.id('menus')),
        familyMealId: v.optional(v.id('familyMeals')),
        quantity: v.number(),
        userId: v.id('users'),
    })
})

export default schema;