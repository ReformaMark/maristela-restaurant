
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getManyFrom } from "convex-helpers/server/relationships";
import { asyncMap } from "convex-helpers";

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

export const getCartItems = query({
    handler: async (ctx)=>{
        const userId = await getAuthUserId(ctx)
        if(userId !== null ){
           
            const bareCartItems = await getManyFrom(ctx.db, 'cartItems', 'by_userId', userId);
         
            const cartItems = await asyncMap(bareCartItems, async (cartItem)=> {
                if(cartItem.menuId) {
                    const menu = await ctx.db.get(cartItem.menuId)
                
                    return { 
                        ...cartItem,
                        menu, 
                        ...(menu?.imageId) ?
                        {url: await ctx.storage.getUrl(menu?.imageId)} : ""
                    }
                }
            })

            return cartItems
        } else {
            return null
        }
    }
})

export const addSubtract = mutation({
    args:{
        operation: v.string(),
        cartItemId: v.id('cartItems')
    },
    handler: async (ctx, args)=>{
        if(args.operation.toLowerCase() === "subtract"){
            const cartItem = await ctx.db.get(args.cartItemId)
            if(cartItem)
             cartItem && cartItem.quantity > 1 ?
               await ctx.db.patch(args.cartItemId, {quantity: cartItem?.quantity - 1}) :
               await ctx.db.delete(args.cartItemId)

        }
        if(args.operation.toLowerCase() === "add"){
            const cartItem = await ctx.db.get(args.cartItemId)
            if(cartItem)
            
            return await ctx.db.patch(args.cartItemId, {quantity: cartItem?.quantity + 1}) 
            
        }
    }
})