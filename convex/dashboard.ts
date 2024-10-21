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
            const userId = await getAuthUserId(ctx)
            if (!userId) {
                console.log("Error: No authenticated user found");
                return null;
            }

            const user = await ctx.db.get(userId)
            if (user?.role !== "admin") {
                console.log("Error: User is not an admin");
                return null;
            }

            const transactions = await ctx.db
                .query("transactions")
                .filter((q) => q.eq(q.field("status"), "Completed"))
                .order("desc")
                .collect()

            if (transactions.length === 0) {
                console.log("Warning: No completed transactions found");
            }

            const salesByDate = await Promise.all(
                transactions.map(async (transaction) => {
                    try {
                        const orders = await Promise.all(
                            transaction.orders.map((orderId) => ctx.db.get(orderId))
                        );
                        const totalSales = orders.reduce((sum, order) => sum + (order?.totalPrice || 0), 0);
                        const date = new Date(orders[0]?.orderDate || 0).toISOString().split('T')[0];
                        return { date, sales: totalSales }
                    } catch (error) {
                        console.error("Error processing transaction:", error);
                        return null;
                    }
                })
            )

            const validSalesByDate = salesByDate.filter(sale => sale !== null);

            if (validSalesByDate.length === 0) {
                console.log("Error: No valid sales data found");
                return null;
            }

            const aggregatedSales = validSalesByDate.reduce((acc, { date, sales }) => {
                acc[date] = (acc[date] || 0) + sales
                return acc
            }, {} as Record<string, number>)

            const salesData = Object.entries(aggregatedSales)
                .map(([date, sales]) => ({ date, sales }))
                .sort((a, b) => a.date.localeCompare(b.date))

            // Simple Exponential Smoothing forecast
            const alpha = 0.3 // Smoothing factor
            let forecast = salesData[0].sales
            const forecasts = salesData.map(({ date, sales }) => {
                forecast = alpha * sales + (1 - alpha) * forecast;
                return { date, sales, forecast }
            })

            // Generating future dates for prediction
            const lastDate = new Date(salesData[salesData.length - 1].date)
            for (let i = 1; i <= 7; i++) {
                const nextDate = new Date(lastDate)
                nextDate.setDate(lastDate.getDate() + i)
                forecasts.push({
                    date: nextDate.toISOString().split('T')[0],
                    sales: 0,
                    forecast,
                })
            }

            return forecasts;
        } catch (error) {
            console.error("Error in getSalesForecast:", error);
            return null;
        }
    }
})