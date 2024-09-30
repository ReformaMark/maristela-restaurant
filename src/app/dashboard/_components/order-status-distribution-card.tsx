"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { orderStatusData } from "../../../../data/chart-data"

// orderStatusData

const chartConfig = {
    value: {
        label: "Value",
    },
    pending: {
        label: "Pending",
        color: "#fda4af",
    },
    processing: {
        label: "Processing",
        color: "#f43f5e",
    },
    shipped: {
        label: "Shipped",
        color: "#be123c",
    },
    delivered: {
        label: "Delivered",
        color: "#fb7185",
    },
} satisfies ChartConfig

export const OrderStatusDistributionCard = () => {
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
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={orderStatusData} dataKey="value" label nameKey="orderType" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="orderType" />}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}