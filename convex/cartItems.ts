
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getManyFrom } from "convex-helpers/server/relationships";
import { asyncMap } from "convex-helpers";

export const addToCart = mutation({
    args: {
        menuId: v.optional(v.id('menus')),
        familyMealId: v.optional(v.id('familyMeals')),
        quantity: v.number()

    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)
        console.log(userId)

        if(userId){
            const cartItems = await getManyFrom(ctx.db, 'cartItems', 'by_userId', userId);
            const isExisting = cartItems.find((item)=>item.menuId === args.menuId)
            if(!isExisting){
                const cartItem = await ctx.db.insert("cartItems", { 
                    menuId: args.menuId, 
                    familyMealId:args.familyMealId,
                    userId: userId,
                    quantity: +args.quantity,
                });
                const item = await ctx.db.get(cartItem);
                const id = item?.menuId
                if(id){
                    const menuName = await ctx.db.get(id)
                    return menuName;
                }
            } else {
               await ctx.db.patch(isExisting._id, {quantity: isExisting.quantity+args.quantity})
               if(isExisting.menuId){
                const menuName = await ctx.db.get(isExisting.menuId)
                return menuName
                }
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
            if(cartItem){
                if(cartItem.quantity > 1) {
                    await ctx.db.patch(args.cartItemId, {quantity: cartItem?.quantity - 1})
                } else {
                    await ctx.db.delete(args.cartItemId)
                }
            }
        }
        if(args.operation.toLowerCase() === "add"){
            const cartItem = await ctx.db.get(args.cartItemId)
            if(cartItem)
            
            return await ctx.db.patch(args.cartItemId, {quantity: cartItem?.quantity + 1}) 
            
        }
    }
})

export const deleteCartItems = mutation({
    args:{
        cartItemsId: v.id('cartItems')
    },
    handler: async(ctx, args) =>{
        await ctx.db.delete(args.cartItemsId)
    }
})