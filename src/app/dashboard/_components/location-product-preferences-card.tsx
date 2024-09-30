"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { mockData } from "../../../../data/chart-data"
import { useMemo, useState } from "react"

export const LocationProductPreferencesCard = () => {

    // const productDataLabel = mockData.map(({ product }) => product)

    const chartConfig = {
        // product: {
        //     label: productDataLabel, // fix instead of array make it single label that spreads the array
        //     color: "var(--color-product)",
        // },
        alitatag: {
            label: "Alitatag",
            color: "#eab308",
        },
        cuenca: {
            label: "Cuenca",
            color: "#fde047",
        },
        santaTeresita: {
            label: "Santa Teresita",
            color: "#a16207",
        }
    } satisfies ChartConfig

    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("alitatag")

    const total = useMemo(() => ({
        alitatag: mockData.reduce((acc, curr) => acc + curr.alitatag, 0),
        cuenca: mockData.reduce((acc, curr) => acc + curr.cuenca, 0),
        santaTeresita: mockData.reduce((acc, curr) => acc + curr.santaTeresita, 0)
    }), [])

    console.log(JSON.stringify(mockData, null, 2))

    return (
        <Card className="col-span-full md:col-span-2">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Location Product Preferences</CardTitle>
                    <CardDescription>
                        Showing total of sales for the 3 branches
                    </CardDescription>
                </div>
                <div className="flex">
                    {["alitatag", "cuenca", "santaTeresita"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none">
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={mockData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="product" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} hide />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                />
                            }
                        />
                        {/* TODO: Put legend */}
                        {/* <ChartLegend
                            content={<ChartLegendContent nameKey="product" />}
                        /> */}
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}