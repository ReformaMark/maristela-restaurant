import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createShippinngAddress = mutation({
    args: {
       
        firstname: v.string(),
        lastName: v.string(),
        streetAddress: v.string(),
        apartmentNumber: v.string(),
        barangay: v.string(),
        municipality: v.string(),
        province: v.string(),
        address:v.string(),
        phoneNumber: v.string(),
        isSaved: v.boolean(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)
        if (userId === null) return
        const shippingId = await ctx.db.insert("shippingAddress", {
            userId: userId,
            firstname: args.firstname,
            lastName: args.lastName,
            streetAddress: args.streetAddress,
            apartmmentNumer: args.apartmentNumber,
            barangay: args.barangay,
            muncipality: args.municipality,
            province: args.province,
            address: args.address,
            phoneNumber: args.phoneNumber,
            isSaved: args.isSaved,
        })

        return shippingId

    },
});

export const getShippingAddresses = query({
 
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)
        console.log(userId)
        if (userId === null) return
        const shippingAddresses = await ctx.db.query("shippingAddress")
        .filter(q => q.eq(q.field("userId"), userId))
        .filter(q => q.eq(q.field("isSaved"), true))
        .collect()
        
        return shippingAddresses 
    }
});

export const updateShippingAddress = mutation({
    args: {
        shippingId: v.id('shippingAddress'),
        isSaved: v.boolean(),
    },
    handler: async (ctx, args) => {
        const updatedShippingAddress = await ctx.db.patch(args.shippingId, {
            isSaved: args.isSaved
        })
        return updatedShippingAddress
    }
})  
