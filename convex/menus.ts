
import { query } from "./_generated/server";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
import {getAll,getOneFrom,getManyFrom,getManyVia,
} from "convex-helpers/server/relationships";

  export const allMenus = query({
    handler: async (ctx) => {
        const menus = await ctx.db.query("menus").collect();
        
        return Promise.all(menus.map(async (menu) => {
            const ratings = await getManyFrom(ctx.db, 'ratings', 'by_menu', menu._id, "menuId");
            return {
                ...menu,
                ...(menu.imageId === undefined)
                    ? ""
                    : { url: await ctx.storage.getUrl(menu.imageId) },
                ratings
            };
        }));
    }
});
