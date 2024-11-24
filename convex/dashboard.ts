import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

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
                return null;
            }

            const user = await ctx.db.get(userId);
            if (user?.role !== "admin") {
                return null;
            }

            const orders = await ctx.db
                .query("orders")
                .filter((q) => q.eq(q.field("status"), "confirmed"))
                .order("desc")
                .take(30);

            if (orders.length === 0) {
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
    args: {
        startDate: v.optional(v.number()),  // Unix timestamp in ms
        endDate: v.optional(v.number()),    // Unix timestamp in ms
    },
    handler: async (ctx, { startDate, endDate }) => {
        try {
            const userId = await getAuthUserId(ctx);
            if (!userId) return null;

            const user = await ctx.db.get(userId);
            if (user?.role !== "admin") return null;

            // Get all orders if no date range is provided (for "all" view)
            const orders = await ctx.db
                .query("orders")
                .withIndex("by_orderDate")
                .filter((q) => {
                    const baseFilter = q.eq(q.field("status"), "confirmed");
                    
                    // If no dates provided, return all confirmed orders
                    if (!startDate || !endDate) return baseFilter;
                    
                    // Otherwise, filter by date range
                    return q.and(
                        baseFilter,
                        q.gte(q.field("orderDate"), startDate),
                        q.lte(q.field("orderDate"), endDate)
                    );
                })
                .order("asc")
                .collect();

            if (orders.length === 0) return [];

            // Group sales by date
            const salesByDate = new Map<string, number>();
            for (const order of orders) {
                const date = new Date(order.orderDate!).toISOString().split('T')[0];
                salesByDate.set(date, (salesByDate.get(date) || 0) + order.totalPrice);
            }

            // Convert to array and sort by date
            let salesData = Array.from(salesByDate.entries())
                .map(([date, sales]) => ({ date, sales }))
                .sort((a, b) => a.date.localeCompare(b.date));

            // Fill in missing dates with 0 sales
            const filledSalesData = fillMissingDates(salesData);

            // Extract sales values for ARIMA model
            const salesValues = filledSalesData.map(d => d.sales);

            // ARIMA model parameters
            const p = 1; // AR order
            const d = 1; // Differencing order
            const q = 1; // MA order

            // Perform differencing
            const diffedSales = difference(salesValues, d);

            // Estimate AR and MA coefficients
            const arCoeff = estimateARCoefficients(diffedSales, p);
            const maCoeff = estimateMACoefficients(diffedSales, q);

            // Generate forecasts
            const forecastSteps = 7; // 7 days forecast
            const forecast = generateForecast(diffedSales, arCoeff, maCoeff, forecastSteps);

            // Reverse differencing to get final forecast
            const finalForecast = inverseDifference(forecast, salesValues.slice(-d), d);

            // Combine historical data with forecasts
            const forecasts = filledSalesData.map(({ date, sales }) => ({
                date,
                sales,
                forecast: sales // Use actual sales for historical data
            }));

            // Add future forecasts
            const lastDate = new Date(filledSalesData[filledSalesData.length - 1].date);
            const lastKnownSales = salesValues[salesValues.length - 1];

            // Generate future forecasts
            for (let i = 0; i < forecastSteps; i++) {
                const nextDate = new Date(lastDate);
                nextDate.setDate(lastDate.getDate() + i + 1);
                
                // Calculate base forecast
                let baseForecast = Math.max(0, Math.round(finalForecast[i]));

                // Weight the forecast with last known sales
                const weightLastKnown = Math.max(0, 1 - i / forecastSteps);
                baseForecast = Math.round(
                    baseForecast * (1 - weightLastKnown) + 
                    lastKnownSales * weightLastKnown
                );

                // Add some random variation (±10%)
                const randomFactor = 0.9 + Math.random() * 0.2;
                
                forecasts.push({
                    date: nextDate.toISOString().split('T')[0],
                    sales: 0, // No actual sales for future dates
                    forecast: Math.round(baseForecast * randomFactor)
                });
            }

            return forecasts;

        } catch (error) {
            console.error("Error in getArimaSalesForecast:", error);
            return null;
        }
    }
});
// Helper functions

function fillMissingDates(salesData: { date: string; sales: number }[]) {
    const filledData = [];
    let currentDate = new Date(salesData[0].date);
    const endDate = new Date(salesData[salesData.length - 1].date);

    while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        const existingData = salesData.find(d => d.date === dateString);
        filledData.push({
            date: dateString,
            sales: existingData ? existingData.sales : 0
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
}

function difference(data: number[], order: number): number[] {
    for (let i = 0; i < order; i++) {
        data = data.slice(1).map((v, i) => v - data[i]);
    }

    return data;
}

function inverseDifference(forecast: number[], lastValues: number[], order: number): number[] {
    for (let i = order - 1; i >= 0; i--) {
        forecast = forecast.map((v, j) => v + (lastValues[i] || forecast[j - 1] || 0));
    }
    return forecast;
}

function estimateARCoefficients(data: number[], order: number): number[] {
    // Simple estimation using correlation
    const coeff = [];
    for (let i = 1; i <= order; i++) {
        const correlation = calculateCorrelation(data.slice(0, -i), data.slice(i));
        coeff.push(correlation);
    }
    return coeff;
}

function estimateMACoefficients(data: number[], order: number): number[] {
    // Simple estimation using autocorrelation of residuals
    const residuals = calculateResiduals(data);
    const coeff = [];
    for (let i = 1; i <= order; i++) {
        const correlation = calculateCorrelation(residuals.slice(0, -i), residuals.slice(i));
        coeff.push(correlation);
    }
    return coeff;
}

function calculateCorrelation(x: number[], y: number[]): number {
    const n = Math.min(x.length, y.length);
    let sum_x = 0, sum_y = 0, sum_xy = 0, sum_x2 = 0, sum_y2 = 0;
    for (let i = 0; i < n; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += x[i] * y[i];
        sum_x2 += x[i] * x[i];
        sum_y2 += y[i] * y[i];
    }
    return (n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y));
}

function calculateResiduals(data: number[]): number[] {
    const mean = data.reduce((a, b) => a + b) / data.length;
    return data.map(v => v - mean);
}

function generateForecast(data: number[], arCoeff: number[], maCoeff: number[], steps: number): number[] {
    const forecast = [];
    const errors = calculateResiduals(data);
    for (let i = 0; i < steps; i++) {
        let forecastValue = 0;
        for (let j = 0; j < arCoeff.length; j++) {
            forecastValue += arCoeff[j] * (data[data.length - 1 - j] || forecast[i - 1 - j] || 0);
        }
        for (let j = 0; j < maCoeff.length; j++) {
            forecastValue += maCoeff[j] * (errors[errors.length - 1 - j] || 0);
        }
        forecast.push(forecastValue);
    }
    return forecast;
}

function calculateMovingAverage(data: number[], windowSize: number): number[] {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const window = data.slice(Math.max(0, i - windowSize + 1), i + 1);
        const avg = window.reduce((sum, val) => sum + val, 0) / window.length;
        result.push(avg);
    }
    return result;
}

function calculateStandardDeviation(data: number[]): number {
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / data.length;
    return Math.sqrt(variance);
}
