"use client"

import { Card } from "@/components/ui/card"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { AccuracyChart } from "./accuracy-chart"

// interface SalesData {
//     date: string;
//     sales: number;
//     forecast: number;
// }

// Updated calculation helper functions
// function calculateMAPE(actualData: SalesData[], forecastData: SalesData[]) {
//     // Ensure we have data to compare
//     if (!actualData.length || !forecastData.length) return 0;

//     // Calculate percentage errors for each day
//     let totalPercentageError = 0;
//     let validDays = 0;

//     actualData.forEach((actual, index) => {
//       if (actual.sales > 0) { // Only include days with actual sales
//         const percentError = Math.abs((actual.sales - actual.forecast) / actual.sales) * 100;
//         if (!isNaN(percentError)) {
//           totalPercentageError += percentError;
//           validDays++;
//         }
//       }
//     });

//     // Return average percentage error
//     return validDays > 0 ? totalPercentageError / validDays : 0;
//   }

//   function calculateRMSE(actualData: SalesData[], forecastData: SalesData[]) {
//     // Ensure we have data to compare
//     if (!actualData.length || !forecastData.length) return 0;

//     // Calculate squared errors for each day
//     let sumSquaredErrors = 0;
//     let validDays = 0;

//     actualData.forEach((actual, index) => {
//       if (actual.sales > 0) { // Only include days with actual sales
//         const squaredError = Math.pow(actual.sales - actual.forecast, 2);
//         if (!isNaN(squaredError)) {
//           sumSquaredErrors += squaredError;
//           validDays++;
//         }
//       }
//     });

//     // Return root mean squared error
//     return validDays > 0 ? Math.sqrt(sumSquaredErrors / validDays) : 0;
//   }

interface MonthlyData {
    month: string;
    actualSales: number;
    forecastedSales: number;
}

function calculateAverageAccuracy(data: MonthlyData[] | undefined): string {
    if (!data || data.length === 0) return "0.00";

    const accuracies = data.map(month => {
        const variance = Math.abs(month.forecastedSales - month.actualSales);
        return (1 - variance / month.actualSales) * 100;
    });

    const averageAccuracy = accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
    return averageAccuracy.toFixed(2);
}

function findHighestMonth(data: MonthlyData[] | undefined): string {
    if (!data || data.length === 0) return "No data available";

    const highestMonth = data.reduce((highest, current) => {
        return current.actualSales > highest.actualSales ? current : highest;
    }, data[0]);

    const date = new Date(highestMonth.month + "-01");
    const monthYear = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return `${monthYear} (₱${highestMonth.actualSales.toLocaleString()})`;
}

function findMostAccurateForecast(data: MonthlyData[] | undefined): string {
    if (!data || data.length === 0) return "No data available";

    const mostAccurate = data.reduce((best, current) => {
        const currentVariance = Math.abs(
            ((current.forecastedSales - current.actualSales) / current.actualSales) * 100
        );
        const bestVariance = Math.abs(
            ((best.forecastedSales - best.actualSales) / best.actualSales) * 100
        );
        return currentVariance < bestVariance ? current : best;
    }, data[0]);

    const date = new Date(mostAccurate.month + "-01");
    const monthYear = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
    const accuracy = (
        100 - Math.abs(
            ((mostAccurate.forecastedSales - mostAccurate.actualSales) / mostAccurate.actualSales) * 100
        )
    ).toFixed(2);

    return `${monthYear} (${accuracy}% accurate)`;
}


export function ModelValidation() {
    // December 2023 for actual data - start at midnight UTC
    const actualStartDate = new Date('2023-12-01T00:00:00Z').getTime()
    const actualEndDate = new Date('2023-12-31T23:59:59Z').getTime()

    // January 2024 for forecast validation - start at midnight UTC
    const forecastStartDate = new Date('2024-01-01T00:00:00Z').getTime()
    const forecastEndDate = new Date('2024-01-31T23:59:59Z').getTime()

    const validationData = useQuery(api.arimaValidation.getValidationData, {
        actualStartDate,
        actualEndDate,
        forecastStartDate,
        forecastEndDate
    })

    const monthlyData = useQuery(api.arimaValidation.getMonthlyPerformance)

    if (validationData === undefined) {
        return <div className="flex justify-center items-center p-8">
            <p className="text-muted-foreground">Loading validation data...</p>
        </div>
    }

    if (validationData === null) {
        return <div className="flex justify-center items-center p-8">
            <p className="text-red-500">Error loading forecast data. Please try again.</p>
        </div>
    }

    if (validationData === null) {
        return <div className="flex justify-center items-center p-8">
            <p className="text-red-500">Error loading forecast data. Please try again.</p>
        </div>
    }

    // Calculate metrics using both actual and forecast data
    //  const mape = calculateMAPE(validationData.actual, validationData.forecast)
    //  const rmse = calculateRMSE(validationData.actual, validationData.forecast)

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Model Validation Study</h2>
                <p className="text-muted-foreground mb-6">
                    Comparing December 2023 actual sales with January 2024 forecasted values
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-medium mb-2">December 2023 - Actual Sales</h3>
                        <AccuracyChart data={validationData.actual} type="actual" />
                    </div>
                    <div>
                        <h3 className="font-medium mb-2">January 2024 - Forecasted Sales</h3>
                        <AccuracyChart data={validationData.forecast} type="forecast" />
                    </div>
                </div>
            </Card>

            <Tabs defaultValue="parameters" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="parameters">Model Parameters</TabsTrigger>
                    <TabsTrigger value="methodology">Methodology</TabsTrigger>
                    <TabsTrigger value="historical">Historical Performance</TabsTrigger>
                    {/* <TabsTrigger value="limitations">Limitations & Considerations</TabsTrigger> */}
                </TabsList>

                <TabsContent value="parameters">
                    <Card className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">ARIMA Model Parameters (1,1,1)</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium">Parameter Selection Rationale</h3>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-4">
                                    <li className="space-y-2">
                                        <strong>p = 1 (Autoregressive Order)</strong>
                                        <p className="ml-6">
                                            We chose p=1 because restaurant sales typically show strong dependency on the previous day&apos;s performance.
                                            This captures important patterns like day-to-day customer behavior and inventory cycles, while avoiding
                                            overfitting that might occur with higher orders.
                                        </p>
                                    </li>
                                    <li className="space-y-2">
                                        <strong>d = 1 (Differencing Order)</strong>
                                        <p className="ml-6">
                                            First-order differencing was selected after analyzing the sales time series data, which showed
                                            non-stationarity in mean but relatively stable variance. This transformation helps in:
                                            <ul className="list-disc list-inside ml-4 mt-2">
                                                <li>Removing linear trends in the data</li>
                                                <li>Handling daily seasonality patterns</li>
                                                <li>Stabilizing the mean of the time series</li>
                                            </ul>
                                        </p>
                                    </li>
                                    <li className="space-y-2">
                                        <strong>q = 1 (Moving Average Order)</strong>
                                        <p className="ml-6">
                                            The first-order moving average component helps capture short-term random fluctuations and
                                            local patterns in sales. This is particularly important for restaurant data where recent
                                            shocks (like weather events or local activities) can influence immediate future sales.
                                        </p>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-medium">Model Validation Process</h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    These parameters were selected through a rigorous process involving:
                                </p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-2">
                                    <li>Analysis of historical sales patterns and seasonality</li>
                                    <li>Testing multiple parameter combinations (Grid Search)</li>
                                    <li>Cross-validation using different time periods</li>
                                    <li>Evaluation of forecast accuracy metrics</li>
                                </ul>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-medium">Business Context</h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    The ARIMA(1,1,1) model balances complexity with practical utility for restaurant sales forecasting:
                                </p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-2">
                                    <li>Simple enough for quick updates as new data arrives</li>
                                    <li>Robust enough to capture key business patterns</li>
                                    <li>Flexible enough to adapt to changing conditions</li>
                                    <li>Practical for both short-term and medium-term forecasting</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="methodology">
                    <Card className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Forecasting Methodology</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium">Random Variation (±10%)</h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    The ±10% random variation is incorporated to account for:
                                </p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-2">
                                    <li>Natural daily fluctuations in customer behavior</li>
                                    <li>Unexpected external factors (weather, local events)</li>
                                    <li>Variations in menu item availability</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium">Data Processing</h3>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-2">
                                    <li>Missing dates filled with zero sales</li>
                                    <li>Data sorted chronologically</li>
                                    <li>First-order differencing applied (d=1)</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="historical">
                    <Card className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Historical Model Performance</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium mb-4">Monthly Sales Performance</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-border">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Month</th>
                                                <th className="px-4 py-2 text-right text-sm font-medium text-muted-foreground">Actual Sales</th>
                                                <th className="px-4 py-2 text-right text-sm font-medium text-muted-foreground">Forecasted Sales</th>
                                                <th className="px-4 py-2 text-right text-sm font-medium text-muted-foreground">Variance</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {monthlyData?.map((data) => {
                                                const variance = ((data.forecastedSales - data.actualSales) / data.actualSales * 100).toFixed(2);
                                                const date = new Date(data.month + "-01").toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long'
                                                });

                                                return (
                                                    <tr key={data.month}>
                                                        <td className="px-4 py-2 text-sm">{date}</td>
                                                        <td className="px-4 py-2 text-sm text-right">₱{data.actualSales.toLocaleString()}</td>
                                                        <td className="px-4 py-2 text-sm text-right">₱{data.forecastedSales.toLocaleString()}</td>
                                                        <td className={`px-4 py-2 text-sm text-right ${Number(variance) > 0 ? 'text-green-600' : 'text-red-600'
                                                            }`}>
                                                            {variance}%
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-medium">Key Insights</h3>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-2">
                                    <li>Average forecast accuracy: {
                                        monthlyData ? calculateAverageAccuracy(monthlyData as MonthlyData[]) : "0.00"
                                    }%</li>
                                    <li>Highest performing month: {
                                        monthlyData ? findHighestMonth(monthlyData as MonthlyData[]) : "No data available"
                                    }</li>
                                    <li>Most accurate forecast: {
                                        monthlyData ? findMostAccurateForecast(monthlyData as MonthlyData[]) : "No data available"
                                    }</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                {/* <TabsContent value="limitations">
                    <Card className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Model Limitations & Considerations</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium">Current Limitations</h3>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-2">
                                    <li>Does not account for special events or holidays</li>
                                    <li>Limited historical data may affect accuracy</li>
                                    <li>Assumes consistent business operations</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium">Future Improvements</h3>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-2">
                                    <li>Integration of seasonal factors</li>
                                    <li>Dynamic parameter optimization</li>
                                    <li>Incorporation of external factors (weather, events)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium">Model Performance</h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    The current implementation shows promising results for short-term forecasting (1-7 days),
                                    with decreasing accuracy for longer forecast horizons. The model performs best during
                                    periods of stable business operations and regular customer patterns.
                                </p>
                            </div>
                        </div>
                    </Card>
                </TabsContent> */}
            </Tabs>
        </div>
    )
}