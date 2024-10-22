"use client"

import { useState, useEffect } from 'react'
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
import { TrendingUp, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart')
    const itemsPerPage = 10

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

    if (isLoading) return <div>Loading...</div>
    if (!data || data.length === 0) return <div>No data available</div>

    const filteredData = data
        .filter(item => item.totalUnitsSold > 0 && item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b.totalUnitsSold - a.totalUnitsSold)

    const pageCount = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const chartData = paginatedData.map((item, index) => ({
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

    return (
        <Card className="col-span-full md:col-span-2">
            <CardHeader>
                <CardTitle>Product Popularity</CardTitle>
                <CardDescription>All products by sales</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setViewMode(viewMode === 'chart' ? 'table' : 'chart')}
                    >
                        {viewMode === 'chart' ? 'Table View' : 'Chart View'}
                    </Button>
                </div>

                {viewMode === 'chart' ? (
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
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead className="text-right">Total Units Sold</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((item) => (
                                <TableRow key={item.name}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-right">{item.totalUnitsSold}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                <div className="flex justify-between items-center mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                    </Button>
                    <span>
                        Page {currentPage} of {pageCount}
                    </span>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                        disabled={currentPage === pageCount}
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Product sales ranking <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing {paginatedData.length} out of {filteredData.length} products
                </div>
            </CardFooter>
        </Card>
    )
}