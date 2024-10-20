"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import { useOrderPopularity } from "@/features/dashboard/api/use-order-popularity";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

export const OrderStatusDistributionCard = () => {
    const { data, isLoading } = useOrderPopularity()

    if (isLoading) return <div>Loading...</div>;
    if (!data || data.length === 0) return <div>No data available</div>;

    const chartConfig = {
        Completed: {
            label: "Completed",
            color: "blue"
        },
        Cancelled: {
            label: "Cancelled",
            color: "red"
        },
    } satisfies ChartConfig

    return (
        <Card className="col-span-full md:col-span-2 lg:col-span-1">
            <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-full pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="orderType"
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={150}
                                fill="#8884d8"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend content={<ChartLegendContent />} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}