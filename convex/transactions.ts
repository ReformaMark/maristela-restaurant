import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";
import { getManyFrom } from "convex-helpers/server/relationships";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getPendingTransactions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (user?.role !== "admin") {
      return null;
    }

    const transactions = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("status"), "Pending"))
      .collect();

    return transactions;
  }
})

export const getConfirmedTransactions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (user?.role !== "admin") {
      return null;
    }

    const transactions = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("status"), "Confirmed"))
      .collect();

    return transactions;
  }
})

export const getOutForDeliveryTransactions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (user?.role !== "admin") {
      return null;
    }

    const transactions = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("status"), "Out for Delivery"))
      .collect();

    return transactions;
  }
})

export const getCompletedTransactions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (user?.role !== "admin") {
      return null;
    }

    const transactions = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("status"), "Completed"))
      .collect();

    return transactions;
  }
})

export const getCancelledTransactions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (user?.role !== "admin") {
      return null;
    }

    const transactions = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("status"), "Cancelled"))
      .collect();

    return transactions;
  }
})


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
    // Generate a unique order ID
    const generateOrderId = () => {
      const chars = '123456789';
      const chars2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const chars3 = 'abcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < 6; i++) {
        const charSet = i % 3 === 0 ? chars : i % 3 === 1 ? chars2 : chars3;
        result += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      return `Order#:${result}`;
    };

    // Check if orderId already exists
    let orderId = generateOrderId();
    let isUnique = false;
    
    while (!isUnique) {
      orderId = generateOrderId();
      const existing = await ctx.db
        .query("transactions")
        .filter(q => q.eq(q.field("orderId"), orderId))
        .first();
      
      if (!existing) {
        isUnique = true;
      }
    }

    const transactionId = await ctx.db.insert("transactions", {
      orders: args.orders,
      mop: args.mop,
      status: args.status,
      userId: args.userId,
      shippingId: args.shippingId,
      orderId: orderId
    });

    return transactionId;
  },
});

export const getAllTransactions = query({
  args: {
    limit: v.number(),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (user?.role !== "admin") {
      return null;
    }

    const transactions = await ctx.db
      .query("transactions")
      .order("desc")
      .paginate({ numItems: args.limit, cursor: args.cursor || null });

    const transactionWithDetails = await Promise.all(
      transactions.page.map(async (transaction) => {
        const user = await ctx.db.get(transaction.userId);
        const shippingAddress = await ctx.db.get(transaction.shippingId);
        const orders = await Promise.all(
          transaction.orders.map(async (orderId) => {
            const order = await ctx.db.get(orderId);
            const menuItem = order?.menuId ? await ctx.db.get(order.menuId) : null;
            const familyMeal = order?.familyMealId ? await ctx.db.get(order.familyMealId) : null;
            return {
              ...order,
              menuItem,
              familyMeal,
            };
          })
        );

        return {
          ...transaction,
          user,
          shippingAddress,
          orders,
        };
      })
    );

    return {
      transactions: transactionWithDetails,
      continueCursor: transactions.continueCursor,
    };
  },
});

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
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db.get(userId);

    if (user?.role !== "admin") {
      throw new ConvexError("Unauthorized");
    }

    const currentTransaction = await ctx.db.get(args.transactionId);

    if (!currentTransaction) {
      throw new ConvexError("Transaction not found");
    }

    if (currentTransaction.status === "Completed" || currentTransaction.status === "Cancelled") {
      throw new ConvexError("Invalid Action: Transaction is already completed or cancelled");
    }

    if (currentTransaction.status === "Confirmed" && args.status === "Pending") {
      throw new ConvexError("Invalid Action: Transaction is already confirmed");
    }

    if (currentTransaction.status === "Out for Delivery" && (args.status === "Confirmed" || args.status === "Pending")) {
      throw new ConvexError("Invalid Action: Transaction is already out for delivery");
    }

    if (currentTransaction.status === "Pending" && (args.status === "Completed" || args.status === "Out for Delivery")) {
      throw new ConvexError("Transaction is only at pending, confirm it first");
    }

    // If the new status is "Confirmed", we need to check stock and update totalUnitsSold
    if (args.status === "Confirmed") {
      let insufficientStockItems = [];

      for (const orderId of currentTransaction.orders) {
        const order = await ctx.db.get(orderId);
        if (!order) continue;

        const menuItem = await ctx.db.get(order.menuId as Id<"menus">);
        if (!menuItem) continue;

        // Check if there's enough stock
        if ((menuItem.quantity as number) < order.quantity) {
          insufficientStockItems.push(menuItem.name);
        }
      }

      if (insufficientStockItems.length > 0) {
        // Cancel the transaction if there's not enough stock for any item
        await ctx.db.patch(args.transactionId, { status: "Cancelled" });
        // throw new ConvexError(`Insufficient stock for: ${insufficientStockItems.join(", ")}. Transaction cancelled.`);

        return {
          status: "Cancelled",
          message: `Insufficient stock for: ${insufficientStockItems.join(", ")}. Transaction cancelled.`,
        }
      }

      // If we have sufficient stock for all items, proceed with updating quantities
      for (const orderId of currentTransaction.orders) {
        const order = await ctx.db.get(orderId);
        if (!order) continue;

        const menuItem = await ctx.db.get(order.menuId as Id<"menus">);
        if (!menuItem) continue;

        // Update the menu item's quantity and totalUnitsSold
        await ctx.db.patch(order.menuId as Id<"menus">, {
          quantity: (menuItem.quantity as number) - order.quantity,
          totalUnitsSold: ((menuItem.totalUnitsSold as number) || 0) + order.quantity,
        });
      }
    }

    // Update the transaction status and order status if completed
    const updatedTransactionId = await ctx.db.patch(args.transactionId, {
      status: args.status,
    });

    await ctx.db.insert('notifications', {
      userId: currentTransaction.userId,
      message: `Your order with an id of ${currentTransaction.orderId} has been ${args.status}`,
      isRead: false,
      orderId: args.transactionId,
   
    })

    if (args.status === "Completed") {
      for (const orderId of currentTransaction.orders) {
        await ctx.db.patch(orderId, {
          status: "confirmed",
        });
      }
    }

    return {
      transaction: updatedTransactionId,
      message: "Transaction status updated successfully",
    };
  }
});

export const getTransactionById = query({
  args: { transactionId: v.id("transactions") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const currentUser = await ctx.db.get(userId);

    if (currentUser?.role !== "admin") {
      return null;
    }

    const transaction = await ctx.db.get(args.transactionId);

    if (!transaction) {
      return null;
    }

    // Fetch related data
    const user = await ctx.db.get(transaction.userId);
    const shippingAddress = await ctx.db.get(transaction.shippingId);
    const orders = await Promise.all(
      transaction.orders.map(async (orderId) => {
        const order = await ctx.db.get(orderId);
        const menuItem = order?.menuId ? await ctx.db.get(order.menuId) : null;
        const familyMeal = order?.familyMealId ? await ctx.db.get(order.familyMealId) : null;
        return {
          ...order,
          menuItem,
          familyMeal,
        };
      })
    );

    return {
      ...transaction,
      user,
      shippingAddress,
      orders,
    };
  },
});
