import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createShippinngAddress = mutation({
    args: {
        userId: v.id('users'),
        firstname: v.string(),
        lastName: v.string(),
        streetAddress: v.string(),
        apartmmentNumer: v.string(),
        address:v.string(),
        phoneNumber: v.string(),
    },
    handler: async (ctx, args) => {
        const shippingId = await ctx.db.insert("shippingAddress", {
            userId: args.userId,
            firstname: args.firstname,
            lastName: args.lastName,
            streetAddress: args.streetAddress,
            apartmmentNumer: args.apartmmentNumer,
            address: args.address,
            phoneNumber: args.phoneNumber,
        })

        return shippingId

    },
});