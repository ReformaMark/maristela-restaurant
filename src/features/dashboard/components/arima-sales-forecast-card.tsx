"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useArimaForecastData } from "../api/use-arima-forecast-data";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ArimaSalesForecastCard = () => {
    const [dateRange, setDateRange] = useState({
        startDate: Date.now() - (30 * 24 * 60 * 60 * 1000),
        endDate: Date.now()
    });
    const [viewMode, setViewMode] = useState<"recent" | "all">("recent");
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const forecastData = useArimaForecastData(
        viewMode === "all"
        ? {}
        : {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
        }
    );

    useEffect(() => {
        if (!forecastData || !Array.isArray(forecastData) || forecastData.length === 0) return;

        if (viewMode === "all" && isInitialLoad) {
            const firstDate = new Date(forecastData[0].date).getTime();
            const lastDate = new Date(forecastData[forecastData.length - 1].date).getTime();

            setDateRange({
                startDate: firstDate,
                endDate: lastDate
            });
            setIsInitialLoad(false);
        }
    }, [viewMode, isInitialLoad, forecastData]);

    const handleViewModeChange = (value: string) => {
        setViewMode(value as "recent" | "all");
        setIsInitialLoad(true); // Reset initial load flag when view mode changes
    };

    const handleDateRangeChange = ({ range }: {
        range: { from: Date; to: Date | undefined };
        rangeCompare?: { from: Date; to: Date | undefined }
    }) => {
        if (range.to) {
            // Only update date range if not in "all" view
            if (viewMode !== "all") {
                setDateRange({
                    startDate: range.from.getTime(),
                    endDate: range.to.getTime()
                });
            }
        }
    };


    const CardHeaderContent = () => (
        <div className="flex flex-row items-center justify-between">
            <CardTitle>ARIMA Sales Forecast</CardTitle>
            <div className="flex items-center gap-4">
                <Select value={viewMode} onValueChange={handleViewModeChange}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recent">Recent</SelectItem>
                        <SelectItem value="all">All Data</SelectItem>
                    </SelectContent>
                </Select>
                <DateRangePicker
                    initialDateFrom={new Date(dateRange.startDate)}
                    initialDateTo={new Date(dateRange.endDate)}
                    onUpdate={handleDateRangeChange}
                />
            </div>
        </div>
    );

    if (forecastData === undefined) {
        return (
            <Card>
                <CardHeader>
                    <CardHeaderContent />
                </CardHeader>
                <CardContent className="min-h-[400px] flex items-center justify-center">
                    <Skeleton className="h-[400px] w-full" />
                </CardContent>
            </Card>
        );
    }

    if (!forecastData || forecastData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardHeaderContent />
                </CardHeader>
                <CardContent className="min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <p className="text-lg text-muted-foreground">
                            No forecast data available for the selected date range.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Try selecting a different date range or view mode.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Get data based on view mode
    const displayData = viewMode === "recent"
        ? (forecastData ?? []).slice(-37)
        : (forecastData ?? []);

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardHeaderContent />
            </CardHeader>
            <CardContent>
                {displayData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={displayData}
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
                                interval={viewMode === "all" ? Math.floor(displayData.length / 10) : "preserveStartEnd"}
                            />
                            <YAxis
                                tickFormatter={(value) => formatPrice(value)}
                            />
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
                ) : (
                    <div className="h-[400px] flex items-center justify-center">
                        <p className="text-lg text-muted-foreground">
                            No data available for the selected date range
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}