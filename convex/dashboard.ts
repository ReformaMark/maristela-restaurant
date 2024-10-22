import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const totalUsers = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            return null
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            return null
        }

        return (await ctx.db.query("users").filter((q) => q.neq(q.field("role"), "admin")).collect()).length
    }
})

export const totalOrders = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            return null
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            return null
        }

        return (await ctx.db.query("transactions").collect()).length
    }
})

export const totalProducts = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            return null
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            return null
        }

        return (await ctx.db.query("menus").collect()).length
    }
})

export const totalRevenue = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) {
            return null
        }

        const user = await ctx.db.get(userId)

        if (user?.role !== "admin") {
            return null
        }

        return (await ctx.db.query("orders")
            .filter((q) => q.eq(q.field("status"), "confirmed"))
            .collect()
        ).reduce((acc, order) => {
            return acc + order.totalPrice
        }, 0)
    }
})

export const topSellingProducts = query({
    handler: async (ctx) => {
        const limit = 5

        const products = await ctx.db
            .query("menus")
            .withIndex("by_totalUnitsSold")
            .order("desc")
            .take(limit);

        return Promise.all(
            products.map(async (product) => ({
                name: product.name,
                unitsSold: product.totalUnitsSold ?? 0,
                revenue: (product.totalUnitsSold ?? 0) * product.price,
                image: { url: product.imageId ? await ctx.storage.getUrl(product.imageId) : null },
                category: product.category
            }))
        )
    },
});


export const lowSellingProducts = query({
    handler: async (ctx) => {
        const limit = 5

        const products = await ctx.db
            .query("menus")
            .withIndex("by_totalUnitsSold")
            .order("asc")
            .take(limit);

        return Promise.all(
            products.map(async (product) => ({
                name: product.name,
                unitsSold: product.totalUnitsSold ?? 0,
                revenue: (product.totalUnitsSold ?? 0) * product.price,
                image: { url: product.imageId ? await ctx.storage.getUrl(product.imageId) : null },
                category: product.category,
            }))
        )
    },
});

export const getProductPopularity = query({
    args: {},
    handler: async (ctx) => {
        const menus = await ctx.db
            .query("menus")
            .withIndex("by_totalUnitsSold")
            .order("desc")
            .collect();

        return menus.map(menu => ({
            name: menu.name,
            totalUnitsSold: menu.totalUnitsSold || 0
        }))
    }
})

export const getOrderPopularity = query({
    args: {},
    handler: async (ctx) => {
        const transactions = await ctx.db
            .query("transactions")
            .filter((q) =>
                q.or(
                    q.eq(q.field("status"), "Completed"),
                    q.eq(q.field("status"), "Cancelled"),
                )
            )
            .collect()

        const statusCounts = {
            Completed: 0,
            Cancelled: 0
        };

        transactions.forEach(transaction => {
            statusCounts[transaction.status as keyof typeof statusCounts]++
        })

        const totalOrders = statusCounts.Completed + statusCounts.Cancelled;

        return [
            {
                orderType: "Completed",
                value: statusCounts.Completed,
                percentage: (statusCounts.Completed / totalOrders) * 100,
                fill: "#22c55e"
            },
            {
                orderType: "Cancelled",
                value: statusCounts.Cancelled,
                percentage: (statusCounts.Cancelled / totalOrders) * 100,
                fill: "#dc2626"
            }
        ]

    }
})

export const getSalesForecast = query({
    handler: async (ctx) => {
        try {
            const userId = await getAuthUserId(ctx);
            if (!userId) {
                console.log("Error: No authenticated user found");
                return null;
            }

            const user = await ctx.db.get(userId);
            if (user?.role !== "admin") {
                console.log("Error: User is not an admin");
                return null;
            }

            const orders = await ctx.db
                .query("orders")
                .filter((q) => q.eq(q.field("status"), "confirmed"))
                .order("desc")
                .take(30);

            if (orders.length === 0) {
                console.log("Warning: No confirmed orders found");
                return [];
            }

            const salesByDate = new Map<string, number>();
            for (const order of orders) {
                const date = new Date(order.orderDate!).toISOString().split('T')[0];
                salesByDate.set(date, (salesByDate.get(date) || 0) + order.totalPrice);
            }

            const salesData = Array.from(salesByDate.entries())
                .map(([date, sales]) => ({ date, sales }))
                .sort((a, b) => a.date.localeCompare(b.date));

            // Simple Exponential Smoothing forecast
            const alpha = 0.3; // Smoothing factor
            let forecast = salesData[0].sales;
            const forecasts = salesData.map(({ date, sales }) => {
                forecast = alpha * sales + (1 - alpha) * forecast;
                return { date, sales, forecast };
            });

            // Generating future dates for prediction
            const lastDate = new Date(salesData[salesData.length - 1].date);
            for (let i = 1; i <= 7; i++) {
                const nextDate = new Date(lastDate);
                nextDate.setDate(lastDate.getDate() + i);
                forecasts.push({
                    date: nextDate.toISOString().split('T')[0],
                    sales: 0,
                    forecast,
                });
            }

            return forecasts;
        } catch (error) {
            console.error("Error in getSalesForecast:", error);
            return null;
        }
    }
});

export const getArimaSalesForecast = query({
  handler: async (ctx) => {
    try {
      const userId = await getAuthUserId(ctx);
      if (!userId) {
        console.log("Error: No authenticated user found");
        return null;
      }

      const user = await ctx.db.get(userId);
      if (user?.role !== "admin") {
        console.log("Error: User is not an admin");
        return null;
      }

      const orders = await ctx.db
        .query("orders")
        .filter((q) => q.eq(q.field("status"), "confirmed"))
        .order("desc")
        .take(30);

      if (orders.length === 0) {
        console.log("Warning: No confirmed orders found");
        return [];
      }

      const salesByDate = new Map<string, number>();
      for (const order of orders) {
        const date = new Date(order.orderDate!).toISOString().split('T')[0];
        salesByDate.set(date, (salesByDate.get(date) || 0) + order.totalPrice);
      }

      let salesData = Array.from(salesByDate.entries())
        .map(([date, sales]) => ({ date, sales }))
        .sort((a, b) => a.date.localeCompare(b.date));

      // Implement ARIMA-like model
      const phi1 = 0.7; // AR(1) coefficient
      const phi2 = 0.2; // AR(2) coefficient
      const theta = 0.5; // MA(1) coefficient
      const sigma = calculateStandardDeviation(salesData.map(d => d.sales));

      const forecasts = [];
      let prevSales = salesData[salesData.length - 2]?.sales ?? 0;
      let lastSales = salesData[salesData.length - 1]?.sales ?? 0;
      let lastError = 0;

      // Include historical data
      for (const { date, sales } of salesData) {
        forecasts.push({ date, sales, forecast: sales });
      }

      // Generate forecasts for the next 7 days
      const lastDate = new Date(salesData[salesData.length - 1]?.date ?? new Date());
      for (let i = 1; i <= 7; i++) {
        const nextDate = new Date(lastDate);
        nextDate.setDate(lastDate.getDate() + i);
        const forecast = phi1 * lastSales + phi2 * prevSales + theta * lastError + generateNormalNoise(0, sigma);
        const roundedForecast = Math.max(0, Math.round(forecast)); // Ensure non-negative integer forecast
        forecasts.push({
          date: nextDate.toISOString().split('T')[0],
          sales: null, // No actual sales for future dates
          forecast: roundedForecast,
        });
        lastError = roundedForecast - forecast;
        prevSales = lastSales;
        lastSales = roundedForecast;
      }

      return forecasts;
    } catch (error) {
      console.error("Error in getArimaSalesForecast:", error);
      return null;
    }
  }
});

// Helper functions for ARIMA model
function calculateStandardDeviation(values: number[]): number {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
  const variance = squaredDiffs.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.sqrt(variance);
}

function generateNormalNoise(mean: number, stdDev: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
