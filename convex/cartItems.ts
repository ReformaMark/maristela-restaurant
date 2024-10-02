
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const addToCart = mutation({
    args: {
        menuId: v.optional(v.id('menus')),
        familyMealId: v.optional(v.id('familyMeals'))

    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)
        console.log(userId)
        if(userId){
            
            const cartItem = await ctx.db.insert("cartItems", { 
                menuId: args.menuId, 
                familyMealId:args.familyMealId,
                userId: userId,
                quantity: +1,
            });
            const item = await ctx.db.get(cartItem);
            const id = item?.menuId
            if(id){
                const menuName = await ctx.db.get(id)
                return menuName;
            }
            
        } else {
            return null
        }
    },
});