"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useArimaForecastData } from "../api/use-arima-forecast-data";

export const ArimaSalesForecastCard = () => {
    const { data: forecastData, isLoading, error } = useArimaForecastData()

    if (isLoading) {
        return (
            <Card>
                <CardContent>
                    Loading...
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardContent>
                    Error loading forecast data. Please try again later.
                </CardContent>
            </Card>
        )
    }

    if (!forecastData || forecastData.length === 0) {
        return (
            <Card>
                <CardContent>
                    No forecast data available for the last 30 days.
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>ARIMA Sales Forecast (Latest 30 transactions + 7 Days Prediction)</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={forecastData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            interval="preserveStartEnd"
                        />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => formatPrice(value as number)}
                            labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#8884d8"
                            name="Actual Sales"
                            strokeWidth={2}
                            dot={{ r: 1 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="forecast"
                            stroke="#82ca9d"
                            name="ARIMA Forecast"
                            strokeWidth={2}
                            strokeDasharray="3 3"
                            dot={{ r: 1 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
