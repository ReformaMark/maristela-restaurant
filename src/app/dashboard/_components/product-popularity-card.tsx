"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart"

import { productPopularityData } from "../../../../data/chart-data"

const chartConfig = {
    productA: {
        label: "Product A",
        color: "#4c0519",
    },
    productB: {
        label: "Product B",
        color: "#e11d48",
    },
    productC: {
        label: "Product C",
        color: "#fda4af",
    },
    productD: {
        label: "Product D",
        color: "#f43f5e",
    },
    productE: {
        label: "Product E",
        color: "#9f1239",
    },
} satisfies ChartConfig

// const chartData = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//     desktop: {
//         label: "Desktop",
//         color: "#2563eb",
//     },
//     mobile: {
//         label: "Mobile",
//         color: "#60a5fa",
//     },
// } satisfies ChartConfig


export const ProductPopularityCard = () => {
    return (
        <Card className="col-span-full lg:col-span-2">
            <CardHeader>
                <CardTitle>Product Popularity</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={productPopularityData}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />

                        <ChartTooltip content={<ChartTooltipContent />} />

                        <ChartLegend content={<ChartLegendContent />} />

                        <Bar dataKey="productA" fill="var(--color-productA)" radius={4} />
                        <Bar dataKey="productB" fill="var(--color-productB)" radius={4} />
                        <Bar dataKey="productC" fill="var(--color-productC)" radius={4} />
                        <Bar dataKey="productD" fill="var(--color-productD)" radius={4} />
                        <Bar dataKey="productE" fill="var(--color-productE)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}