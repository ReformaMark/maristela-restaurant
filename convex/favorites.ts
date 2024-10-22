import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { getManyFrom } from "convex-helpers/server/relationships";
import { asyncMap } from "convex-helpers";
import { v } from "convex/values";

export const getAllfavorites = query({
    handler: async(ctx)=>{
        const userId = await getAuthUserId(ctx)

        if (userId === null) {
            return null
        }

        const bareFavoriteItems = await getManyFrom(ctx.db, 'favorites', 'by_userId', userId);
        const favoritesItems = await asyncMap(bareFavoriteItems, async (item)=> {
            if(item.menuId) {
                const menu = await ctx.db.get(item.menuId)
                if(!menu){
                    return null
                }
                const ratings = await getManyFrom(ctx.db, 'ratings', 'by_menu', menu?._id, "menuId");
                const ratingsWithUser = await Promise.all(
                    ratings.map(async (rating) => {
                        const user = await ctx.db.get(rating.userId); // Fetch the user document
                        return {
                            ...rating,
                            user: user ? user : null, // Include the user document, or null if not found
                        };
                    })
                );
            
                return { 
                    ...item,
                    menu, 
                    ratings: ratingsWithUser,
                    ...(menu?.imageId) ?
                    {url: await ctx.storage.getUrl(menu?.imageId)} : ""
                }
            } else {
                return null
            }
        })
        return favoritesItems
    }
})

export const addFavorites = mutation({
    args:{
        menuId: v.id('menus'),
        
    },
    handler: async(ctx, args)=>{
        const userId = await getAuthUserId(ctx)
        if(!userId){
            return null
        } 
        const favorites = await getManyFrom(ctx.db, 'favorites', 'by_userId', userId);
        const existing = favorites.find(f => f.menuId === args.menuId)

        if(!existing) {
            const fav = await ctx.db.insert('favorites',{
                menuId: args.menuId,
                userId: userId
            })

            const favorite = await ctx.db.get(fav)
            if(favorite === null || !favorite.menuId){
                return null
            }
            const menu = await ctx.db.get(favorite.menuId)
            if(!menu){
                return null
            }
            const ratings = await getManyFrom(ctx.db, 'ratings', 'by_menu', menu?._id, "menuId");
            const ratingsWithUser = await Promise.all(
                ratings.map(async (rating) => {
                    const user = await ctx.db.get(rating.userId); // Fetch the user document
                    return {
                        ...rating,
                        user: user ? user : null, // Include the user document, or null if not found
                    };
                })
            );
            return {
                ...favorite,
                ...(menu.imageId === undefined)
                ? ""
                : { url: await ctx.storage.getUrl(menu.imageId) },
                menu: {...menu,ratings: ratingsWithUser},

            }
        } 
    }
})