"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import { useProductPopularity } from "@/features/dashboard/api/use-product-popularity";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const COLORS = [
    "#FF6384", // Pink
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
    "#FF6384", // Pink (repeated for more than 6 items)
    "#36A2EB", // Blue (repeated for more than 6 items)
];

export const ProductPopularityCard = () => {
    const { data, isLoading } = useProductPopularity();
    const [viewType, setViewType] = useState<'bar' | 'pie'>('bar');

    if (isLoading) return <div>Loading...</div>;
    if (!data || data.length === 0) return <div>No data available</div>;

    const chartData = data
        .filter(item => item.totalUnitsSold > 0)
        .map((item, index) => ({
            name: item.name,
            sales: item.totalUnitsSold || 0,
            color: COLORS[index % COLORS.length],
        }));

    const chartConfig = chartData.reduce((acc, item) => {
        acc[item.name] = {
            label: item.name,
            color: item.color,
        };
        return acc;
    }, {} as ChartConfig);

    const renderBarChart = () => (
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                    <Bar dataKey="sales" radius={8}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList dataKey="sales" position="top" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );

    const renderPieChart = () => (
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="sales"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    );

    return (
        <Card className="col-span-full lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Product Popularity</CardTitle>
                <div className="space-x-2">
                    <Button
                        variant={viewType === 'bar' ? 'default' : 'outline'}
                        onClick={() => setViewType('bar')}
                    >
                        Bar
                    </Button>
                    <Button
                        variant={viewType === 'pie' ? 'default' : 'outline'}
                        onClick={() => setViewType('pie')}
                    >
                        Pie
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {viewType === 'bar' ? renderBarChart() : renderPieChart()}
            </CardContent>
        </Card>
    );
};