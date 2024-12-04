import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";


export const rateMenu = mutation({
    args:{
        stars: v.number(),
        feedbackMessage: v.optional(v.string()),
        menuId: v.id('menus'),
        transactionId: v.id('transactions'),
        isAnonymous: v.boolean()
    },
    handler: async (ctx,args)=>{
        const userId = await getAuthUserId(ctx)
       
        if(!userId){
            return null
        }

        await ctx.db.insert('ratings', { 
            stars: args.stars, 
            feedbackMessage: args.feedbackMessage, 
            menuId: args.menuId,
            userId: userId,
            transactionid: args.transactionId,
            isAnonymous: args.isAnonymous
        })
    }
})


export const getRating = query({
    args:{
        transactionId: v.optional(v.id('transactions')),
        menuId: v.optional(v.id('menus')),
    },
    handler: async (ctx, args)=>{
        console.log(args.transactionId)
        const rating = await ctx.db.query('ratings')     
        .filter((q)=> q.eq(q.field('menuId'), args.menuId))
        .filter((q) => q.eq(q.field('transactionid'), args.transactionId))
        .collect();
        const sortedRatings = rating.sort((a, b) => b._creationTime - a._creationTime);
        console.log(sortedRatings[0])
        return sortedRatings[0]
    }
})

export const getRatings = query({
    args: {
        menuId: v.id('menus'),
    },
    handler: async (ctx, args) => {
        const ratings = await ctx.db.query('ratings')
            .filter((q) => q.eq(q.field('menuId'), args.menuId))
            .order('desc')
            .collect();

        if (ratings.length === 0) return null; // Return null if there are no ratings

        const menu = await ctx.db.get(args.menuId);
        const menuImageId = menu?.imageId;
        if (!menuImageId) return null; // Return null if there is no menu image

        const imageUrl = menuImageId ? await ctx.storage.getUrl(menuImageId) : null;

        const ratingsWithUser = await Promise.all(
            ratings.map(async (rating) => {
                const user = await ctx.db.get(rating.userId);
                return {
                    ...rating,
                    user,
                    menu: {
                        ...menu,
                        imageUrl
                    }
                };
            })
        );

        return ratingsWithUser;
    }
})

