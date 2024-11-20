"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { formatPrice } from "@/lib/utils"

interface SalesData {
  date: string
  sales: number
  forecast?: number
}

interface AccuracyChartProps {
  data?: SalesData[]
  type: "actual" | "forecast"
}

export function AccuracyChart({ data, type }: AccuracyChartProps) {
  if (!data) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-muted-foreground">Loading chart data...</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTooltipValue = (value: number) => {
    return formatPrice(value)
  }

  const getChartColor = () => {
    return type === "actual" ? "#8884d8" : "#82ca9d"
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
            tickMargin={8}
            className="text-xs"
          />
          <YAxis
            tickFormatter={formatTooltipValue}
            tick={{ fontSize: 12 }}
            tickMargin={8}
            className="text-xs"
          />
          <Tooltip
            formatter={(value: number) => [formatTooltipValue(value), type === "actual" ? "Actual Sales" : "Forecasted Sales"]}
            labelFormatter={(label) => `Date: ${formatDate(label)}`}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={type === "actual" ? "sales" : "forecast"}
            name={type === "actual" ? "Actual Sales" : "Forecasted Sales"}
            stroke={getChartColor()}
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}