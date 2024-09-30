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
import { locationSalesPerformanceData } from "../../../../data/chart-data"

const chartConfig = {
    value: {
        label: "Value",
    },
    alitatag: {
        label: "Alitatag",
        color: "#fef08a",
    },
    cuenca: {
        label: "Cuenca",
        color: "#ca8a04",
    },
    santaTeresita: {
        label: "Santa Teresita",
        color: "#eab308",
    },
} satisfies ChartConfig

export const LocationSalesPerformanceCard = () => {
    return (
        <Card className="col-span-full md:col-span-2 lg:col-span-1">
            <CardHeader>
                <CardTitle>Location Sales Performance</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-full pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={locationSalesPerformanceData} dataKey="value" label nameKey="location" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="location" />}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}