import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { getAuthUserId } from "@convex-dev/auth/server"
import { asyncMap } from "convex-helpers"

export const getNotifications = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (userId === null) {
            return []
        }

        const notifications = await ctx.db.query('notifications').filter(q => q.eq(q.field('userId'), userId)).order('desc').collect()

        return notifications
    }
})

export const markAsRead = mutation({
    args: { notificationId: v.id('notifications') },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.notificationId, { isRead: true })
    }
})

export const markAllAsRead = mutation({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)
        if (userId === null) {
            return
        }
        const notifications = await ctx.db.query('notifications').filter(q => q.eq(q.field('userId'), userId)).collect()
        await asyncMap(notifications, async (notification) => {
            await ctx.db.patch(notification._id, { isRead: true })
        })
    }
})

export const clearNotifications = mutation({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)
        if (userId === null) {
            return
        }
        const notifications = await ctx.db.query('notifications').filter(q => q.eq(q.field('userId'), userId)).collect()
        await asyncMap(notifications, async (notification) => {
            await ctx.db.delete(notification._id)
        })
    }
})
