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
import { Skeleton } from "@/components/ui/skeleton"
import { useOrderPopularity } from "@/features/dashboard/api/use-order-popularity"
import { TrendingUp } from "lucide-react"
import { useMemo } from "react"
import { Label, Pie, PieChart } from "recharts"

export default function OrderStatusDistributionCard() {
    const { data, isLoading } = useOrderPopularity()
    const totalOrders = useMemo(() => {
        return data?.reduce((acc, curr) => acc + curr.value, 0) || 0
    }, [data])

    if (isLoading) return <Skeleton className="h-[200px] w-full" />
    if (!data || data.length === 0) return <div>No data available</div>

    const chartConfig = {
        Completed: {
            label: "Completed",
            color: "hsl(var(--chart-1))"
        },
        Cancelled: {
            label: "Cancelled",
            color: "hsl(var(--chart-2))"
        },
    } satisfies ChartConfig

    return (
        <Card className="flex flex-col h-fit">
            <CardHeader className="items-center pb-0">
                <CardTitle>Sales Distribution</CardTitle>
                <CardDescription>Total orders</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto my-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="orderType"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalOrders.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Orders
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Sales Distribution <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total of completed and cancelled orders
                </div>
            </CardFooter>
        </Card>
    )
}