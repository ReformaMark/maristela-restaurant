import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createShippinngAddress = mutation({
    args: {
        userId: v.id('users'),
        firstname: v.string(),
        lastName: v.string(),
        streetAddress: v.string(),
        apartmentNumber: v.string(),
        address:v.string(),
        phoneNumber: v.string(),
    },
    handler: async (ctx, args) => {
        const shippingId = await ctx.db.insert("shippingAddress", {
            userId: args.userId,
            firstname: args.firstname,
            lastName: args.lastName,
            streetAddress: args.streetAddress,
            apartmmentNumer: args.apartmentNumber,
            address: args.address,
            phoneNumber: args.phoneNumber,
        })

        return shippingId

    },
});

export const getShippingAddresses = query({
    args: {
        userId: v.id('users'),
    },
    handler: async (ctx, args) => {
        const shippingAddresses = await ctx.db.query("shippingAddress").filter(q => q.eq(q.field("userId"), args.userId)).collect()
        return shippingAddresses
    }
})