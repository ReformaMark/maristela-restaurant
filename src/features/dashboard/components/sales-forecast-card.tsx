"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useForecastData } from "../api/use-forecast-data";

export const SalesForecastCard = () => {
    const { data: forecastData, isLoading } = useForecastData()

    if (isLoading) {
        <Card>
            <CardContent>
                Loading...
            </CardContent>
        </Card>
    }

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>
                    Simple Exponential Smoothing forecast
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={forecastData ?? []}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid stroke="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => formatPrice(value as number)}
                            labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Actual Sales" />
                        <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecast" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
