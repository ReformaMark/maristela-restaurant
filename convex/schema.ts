import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    users: defineTable({
        image: v.optional(v.string()),
        email: v.string(),
        emailVerificationTime: v.optional(v.number()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        isAnonymous: v.optional(v.boolean()),
        name: v.string(),
        lastName: v.optional(v.string()),
        role: v.union(v.literal("user"), v.literal("admin")),
        address: v.optional(v.string()),
        cartItems: v.optional(v.array(v.id('cartItems'))),
        ratings: v.optional(v.array(v.id("ratings"))),
        orders: v.optional(v.array(v.id("orders"))),
        transactions: v.optional(v.array(v.id("transactions"))),
        verificationToken: v.optional(v.string()),
        verificationTokenExpiry: v.optional(v.number()),
        resetToken: v.optional(v.string()),
        resetTokenExpiry: v.optional(v.number()),
        isVerified: v.optional(v.boolean()),
    }).index('email', ['email']),
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
            v.literal('Desserts'),
            v.literal('Silog Meals'),
            v.literal('Special'),
        ),
        name: v.string(),
        available: v.boolean(),
        price: v.number(),
        special: v.optional(v.boolean()),
        recommended: v.optional(v.boolean()),
        prepTime: v.optional(v.string()),
        description: v.optional(v.string()),
        quantity: v.optional(v.number()),
        isArchived: v.optional(v.boolean()),
        totalUnitsSold: v.optional(v.number()),
    })
        .index('by_name', ['name'])
        .index('by_totalUnitsSold', ['totalUnitsSold'])
        .searchIndex("search_name", {
            searchField: "name",
            filterFields: ["name"],
        }),

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
        orderDate: v.optional(v.number()),
    }).index('by_user', ['userId']).index('by_orderDate', ['orderDate']),

    transactions: defineTable({
        orders: v.array(v.id('orders')),
        mop: v.string(),
        status: v.union(
            v.literal('Pending'),
            v.literal('Confirmed'),
            v.literal('Out for Delivery'),
            v.literal('Completed'),
            v.literal('Cancelled'),
        ),
        userId: v.id('users'),
        shippingId: v.id('shippingAddress'),
    }).index('by_shippingId', ['shippingId']).index('by_userId', ['userId']),

    ratings: defineTable({
        stars: v.optional(v.number()),
        feedbackMessage: v.optional(v.string()),
        userId: v.id("users"),
        menuId: v.id('menus'),
        transactionid: v.id('transactions')
    }).index('by_menu', ['menuId']),

    cartItems: defineTable({
        menuId: v.optional(v.id('menus')),
        familyMealId: v.optional(v.id('familyMeals')),
        quantity: v.number(),
        userId: v.id('users'),
    }).index('by_menuId', ['menuId']).index('by_familyMealId', ['familyMealId']).index('by_userId', ['userId']),
    favorites: defineTable({
        menuId: v.optional(v.id('menus')),
        familyMealId: v.optional(v.id('familyMeals')),
        userId: v.id('users'),
    }).index('by_menuId', ['menuId']).index('by_familyMealId', ['familyMealId']).index('by_userId', ['userId']),

    shippingAddress: defineTable({
        userId: v.id('users'),
        firstname: v.string(),
        lastName: v.string(),
        streetAddress: v.string(),
        barangay: v.string(),
        muncipality: v.string(),
        province: v.string(),
        apartmmentNumer: v.optional(v.string()),
        address: v.string(),
        phoneNumber: v.string(),

    }).index('by_userId', ['userId'])
})

export default schema;