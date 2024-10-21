"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useProductPopularity } from "@/features/dashboard/api/use-product-popularity"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-4))",
]

export default function ProductPopularityCard() {
    const { data, isLoading } = useProductPopularity()

    if (isLoading) return <div>Loading...</div>
    if (!data || data.length === 0) return <div>No data available</div>

    const chartData = data
        .filter(item => item.totalUnitsSold > 0)
        .sort((a, b) => b.totalUnitsSold - a.totalUnitsSold)
        .slice(0, 10) // Only show top 10 products
        .map((item, index) => ({
            name: item.name,
            sales: item.totalUnitsSold || 0,
            color: COLORS[index % COLORS.length],
        }))

    const chartConfig = chartData.reduce((acc, item) => {
        acc[item.name] = {
            label: item.name,
            color: item.color,
        }
        return acc
    }, {} as ChartConfig)

    console.log(chartConfig)

    // const renderBarChart = () => (
    //     <ResponsiveContainer width="100%" height={300}>
    //         <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
    //             <XAxis type="number" />
    //             <YAxis type="category" dataKey="name" width={100} />
    //             <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
    //             <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
    //                 {chartData.map((entry, index) => (
    //                     <Cell key={`cell-${index}`} fill={entry.color} />
    //                 ))}
    //             </Bar>
    //         </BarChart>
    //     </ResponsiveContainer>
    // )

    // const renderPieChart = () => (
    //     <ResponsiveContainer width="100%" height={300}>
    //         <PieChart>
    //             <Pie
    //                 data={chartData}
    //                 dataKey="sales"
    //                 cx="50%"
    //                 cy="50%"
    //                 outerRadius={80}
    //                 fill="hsl(var(--chart-1))"
    //                 labelLine={false}
    //                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
    //             >
    //                 {chartData.map((entry, index) => (
    //                     <Cell key={`cell-${index}`} fill={entry.color} />
    //                 ))}
    //             </Pie>
    //             <ChartTooltip content={<ChartTooltipContent />} />
    //         </PieChart>
    //     </ResponsiveContainer>
    // )

    return (
        <Card className="col-span-full md:col-span-2">
            <CardHeader>
                <CardTitle>Product Popularity</CardTitle>
                <CardDescription>Top 10 products by sales</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="sales" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="sales"
                            layout="vertical"
                            fill="hsl(var(--chart-4))"
                            radius={4}
                        >
                            <LabelList
                                dataKey="name"
                                position="insideLeft"
                                offset={8}
                                className="fill-[--color-label] hidden sm:block"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="sales"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Most sold products <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing top 10 products by sales
                </div>
            </CardFooter>
        </Card>
    )
}