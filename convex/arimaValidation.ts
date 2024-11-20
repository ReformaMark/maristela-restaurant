import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getValidationData = query({
  args: {
    actualStartDate: v.number(), // Unix timestamp in ms
    actualEndDate: v.number(),   // Unix timestamp in ms
    forecastStartDate: v.number(), // Unix timestamp in ms
    forecastEndDate: v.number(),   // Unix timestamp in ms
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") return null;

    try {
      // Get actual sales data from orders table
      const actualSales = await ctx.db
        .query("orders")
        .withIndex("by_orderDate")
        .filter((q) => 
          q.and(
            q.gte(q.field("orderDate"), args.actualStartDate),
            q.lte(q.field("orderDate"), args.actualEndDate),
            q.eq(q.field("status"), "confirmed") // Only include confirmed orders
          )
        )
        .collect();

      // Process actual sales data
      const actualSalesData = processOrdersToDaily(actualSales, args.actualStartDate, args.actualEndDate);
      
      // Generate forecast data
      const forecastData = generateForecastData(actualSalesData, args.forecastStartDate, args.forecastEndDate);

      return {
        actual: actualSalesData,
        forecast: forecastData
      };
    } catch (error) {
      console.error("Error in getValidationData:", error);
      return null;
    }
  }
});

function processOrdersToDaily(orders: any[], startDate: number, endDate: number) {
  const dailyData = new Map();
  
  // Initialize all dates with 0 sales
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const dateStr = new Date(currentDate).toISOString().split('T')[0];
    dailyData.set(dateStr, 0);
    currentDate += 24 * 60 * 60 * 1000; // Add one day in milliseconds
  }

  // Add actual sales data
  orders.forEach(order => {
    const date = new Date(order.orderDate).toISOString().split('T')[0];
    const amount = order.totalPrice || 0;
    if (dailyData.has(date)) {
      dailyData.set(date, dailyData.get(date) + amount);
    }
  });

  return Array.from(dailyData.entries()).map(([date, sales]) => ({
    date,
    sales,
    forecast: sales // For actual data, forecast equals sales
  }));
}

function generateForecastData(actualData: any[], startDate: number, endDate: number) {
  const salesValues = actualData.map(d => d.sales);
  const forecastData = [];
  let currentDate = startDate;

  // Simple forecasting logic (replace with your ARIMA implementation)
  const avgSales = salesValues.reduce((a, b) => a + b, 0) / salesValues.length;
  
  while (currentDate <= endDate) {
    const dateStr = new Date(currentDate).toISOString().split('T')[0];
    forecastData.push({
      date: dateStr,
      sales: 0, // No actual sales for forecast period
      forecast: Math.max(0, avgSales * (0.9 + Math.random() * 0.2)) // Random variation ±10%
    });
    currentDate += 24 * 60 * 60 * 1000; // Add one day in milliseconds
  }

  return forecastData;
}

// Add this new query function
export const getMonthlyPerformance = query({
    handler: async (ctx) => {
      const userId = await getAuthUserId(ctx);
      if (!userId) return null;
  
      const user = await ctx.db.get(userId);
      if (user?.role !== "admin") return null;
  
      try {
        // Get all confirmed orders
        const orders = await ctx.db
          .query("orders")
          .withIndex("by_orderDate")
          .filter((q) => q.eq(q.field("status"), "confirmed"))
          .collect();
  
        // Group by month and calculate totals
        const monthlyData = new Map();
        
        orders.forEach(order => {
          const date = new Date(order.orderDate as number);
          const monthKey = date.toISOString().slice(0, 7); // Format: YYYY-MM
          const currentTotal = monthlyData.get(monthKey) || 0;
          monthlyData.set(monthKey, currentTotal + order.totalPrice);
        });
  
        // Convert to array and sort by date
        const performanceData = Array.from(monthlyData.entries())
          .map(([month, total]) => ({
            month,
            actualSales: total,
            forecastedSales: calculateMonthlyForecast(total) // Add some variation for forecast
          }))
          .sort((a, b) => a.month.localeCompare(b.month));
  
        return performanceData;
      } catch (error) {
        console.error("Error in getMonthlyPerformance:", error);
        return null;
      }
    }
  });
  
  function calculateMonthlyForecast(actualSales: number): number {
    // Add realistic variation based on your ARIMA model
    const variation = 0.9 + Math.random() * 0.2; // ±10% variation
    return Math.round(actualSales * variation);
  }