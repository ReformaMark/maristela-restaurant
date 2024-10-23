import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";


export const rateMenu = mutation({
    args:{
        stars: v.number(),
        feedbackMessage: v.optional(v.string()),
        menuId: v.id('menus'),
        transactionId: v.id('transactions')
    },
    handler: async (ctx,args)=>{
        const userId = await getAuthUserId(ctx)
       
        // const isRated = await ctx.db.query('ratings')
        //     .filter((q)=> q.eq(q.field('menuId'), args.menuId && q.eq(q.field('transactionid'), args.transactionId)))
        //     .collect();
      
            if(!userId){
                return null
            }

            await ctx.db.insert('ratings', {
                stars: args.stars, 
                feedbackMessage: args.feedbackMessage, 
                menuId: args.menuId,
                userId: userId,
                transactionid: args.transactionId
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