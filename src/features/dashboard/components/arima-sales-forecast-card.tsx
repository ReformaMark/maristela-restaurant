"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useArimaForecastData } from "../api/use-arima-forecast-data";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export const ArimaSalesForecastCard = () => {
    const [dateRange, setDateRange] = useState({
        startDate: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
        endDate: Date.now()
    });

    const forecastData = useArimaForecastData({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
    });

    const handleDateRangeChange = ({ range }: { 
        range: { from: Date; to: Date | undefined }; 
        rangeCompare?: { from: Date; to: Date | undefined } 
    }) => {
        if (range.to) { // Only update if we have both dates
            setDateRange({
                startDate: range.from.getTime(),
                endDate: range.to.getTime()
            });
        }
    };

    if (forecastData === undefined) {
        return <Skeleton className="h-[400px] w-full" />
    }

    if (forecastData === null) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>ARIMA Sales Forecast</CardTitle>
                    <DateRangePicker
                        initialDateFrom={new Date(dateRange.startDate)}
                        initialDateTo={new Date(dateRange.endDate)}
                        onUpdate={handleDateRangeChange}
                    />
                </CardHeader>
                <CardContent>
                    Error loading forecast data. Please try again later.
                </CardContent>
            </Card>
        )
    }

    if (!forecastData || forecastData.length === 0) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>ARIMA Sales Forecast</CardTitle>
                    <DateRangePicker
                        initialDateFrom={new Date(dateRange.startDate)}
                        initialDateTo={new Date(dateRange.endDate)}
                        onUpdate={handleDateRangeChange}
                    />
                </CardHeader>
                <CardContent className="flex h-[400px] items-center justify-center">
                    <p className="text-lg text-muted-foreground">
                        No forecast data available at this time.
                    </p>
                </CardContent>
            </Card>
        )
    }

    // Filter the data to show only the forecast period
    const filteredData = forecastData.slice(-37);

    return (
        <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>ARIMA Sales Forecast</CardTitle>
                <DateRangePicker
                    initialDateFrom={new Date(dateRange.startDate)}
                    initialDateTo={new Date(dateRange.endDate)}
                    onUpdate={handleDateRangeChange}
                />
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={filteredData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid stroke="3 3" />
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
