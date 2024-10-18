import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";
import { getManyFrom } from "convex-helpers/server/relationships";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTransaction = mutation({
  args: {
    orders: v.array(v.id('orders')),
    mop: v.string(),
    status: v.union(
      v.literal('Pending'),
      v.literal('Confirmed'),
      v.literal('Out for Delivery'),
      v.literal('Completed'),
      v.literal('Cancelled'),
    ),
    userId: v.id('users'),
    shippingId: v.id('shippingAddress')
  },
  handler: async (ctx, args) => {
    const transactionId = await ctx.db.insert("transactions", {
      orders: args.orders,
      mop: args.mop,
      status: args.status,
      userId: args.userId,
      shippingId: args.shippingId
    })

    return transactionId

  },
});

export const getAllTransactions = query({
  args: {

  },
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)

    if (userId === null) {
      return null
    }

    const user = await ctx.db.get(userId)

    if (user?.role !== "admin") {
      return null
    }

    const transactions = await ctx.db
      .query("transactions")
      .order("desc")
      .collect()


    const transactionWithDetails = await Promise.all(transactions.map(async (transaction) => {
      const user = await ctx.db.get(transaction.userId)
      const shippingAddress = await ctx.db.get(transaction.shippingId)
      const orders = await Promise.all(transaction.orders.map(async (orderId) => {
        const order = await ctx.db.get(orderId)
        const menuItem = order?.menuId ? await ctx.db.get(order.menuId) : null
        const familyMeal = order?.familyMealId ? await ctx.db.get(order.familyMealId) : null
        return {
          ...order,
          menuItem,
          familyMeal,
        }
      }))

      return {
        ...transaction,
        user,
        shippingAddress,
        orders,
      }
    }))

    return transactionWithDetails
  }
})

export const cancelTransaction = mutation({
  args: {
    transactionId: v.id('transactions')
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (userId !== null) {
      const transaction = await ctx.db.get(args.transactionId)
      if (transaction && transaction?.status === "Pending") {
        await ctx.db.patch(args.transactionId, { status: "Cancelled" });

      } else {

      }
    } else {

    }
  }
})

export const getTransactions = query({

  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (userId !== null) {

      const bareTransactions = await getManyFrom(ctx.db, 'transactions', 'by_userId', userId);

      const sortedTransactions = bareTransactions.sort((a, b) => b._creationTime - a._creationTime);

      const transactions = await asyncMap(sortedTransactions, async (transaction) => {

        if (transaction.orders) {
          const orders = await Promise.all(transaction.orders.map(async (orderId) => {
            const order = await ctx.db.get(orderId); // Fetch order details

            if (order === null) {
              return null
            }
            if (!order.menuId) {
              return null
            }
            // Fetch menu details using menuId from the order
            const menu = await ctx.db.get(order.menuId);


            return {
              ...order,
              menu: menu ? menu : null, // Attach menu details
              ...(menu?.imageId) ?
                { url: await ctx.storage.getUrl(menu?.imageId) } : ""
            };
          }));

          const shippingAddress = await ctx.db.get(transaction.shippingId);

          return {
            ...transaction,
            orders,
            shippingAddress: shippingAddress
          }
        }
      })

      return transactions
    } else {
      return null
    }

  }

})

export const getTransaction = query({
  args: {
    transactionid: v.id('transactions')
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId !== null) {
      // Fetch the transaction
      const transaction = await ctx.db.get(args.transactionid);

      if (transaction === null) {
        return null;
      }

      // Fetch orders and their associated menu details
      const orders = await Promise.all(
        transaction.orders.map(async (orderId) => {
          const order = await ctx.db.get(orderId); // Fetch order details

          if (order === null || !order.menuId) {
            return null;
          }

          // Fetch menu details using menuId from the order
          const menu = await ctx.db.get(order.menuId);

          return {
            ...order,
            menu: menu ? menu : null, // Attach menu details
            url: menu?.imageId ? await ctx.storage.getUrl(menu.imageId) : null // Attach image URL if available
          };
        })
      );

      // Fetch shipping address
      const shippingAddress = await ctx.db.get(transaction.shippingId);

      // Return the complete transaction object
      return {
        ...transaction,
        orders: orders.filter(order => order !== null), // Ensure only valid orders are included
        shippingAddress
      };
    } else {
      return null;
    }
  }
});

export const handleTransactionStatus = mutation({
  args: {
    transactionId: v.id("transactions"),
    status: v.union(
      v.literal('Pending'),
      v.literal('Confirmed'),
      v.literal('Out for Delivery'),
      v.literal('Completed'),
      v.literal('Cancelled'),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)

    if (userId === null) {
      throw new Error("Unauthorized")
    }

    const user = await ctx.db.get(userId)

    if (user?.role !== "admin") {
      throw new Error("Unauthorized")
    }

    const currentTransaction = await ctx.db.get(args.transactionId)

    if (currentTransaction?.status === "Completed" || currentTransaction?.status === "Cancelled") {
      throw new Error("Invalid Action")
    }

    if (currentTransaction?.status === "Confirmed" && args.status === "Pending") {
      throw new Error("Invalid Action, transaction is already confirmed") // how to fetch this error message in the frontend?
    }

    if (currentTransaction?.status === "Out for Delivery" && args.status === "Confirmed" || args.status === "Pending") {
      throw new Error("invalid Action, transaction is already out for delivery")
    }

    const transactionId = await ctx.db.patch(args.transactionId, {
      status: args.status,
    })

    return transactionId
  }
})