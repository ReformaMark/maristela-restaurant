"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import { Users2Icon } from "lucide-react";
import { useCountRevenue } from "../api/use-count-revenue";


export const TotalRevenueCard = () => {
    const { data, isLoading } = useCountRevenue()

    if (isLoading) {
        return <Skeleton className="h-32 w-full" />
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 bg-primary rounded-t-md text-white">
                <CardTitle className="text-sm font-medium">
                    Total Revenue
                </CardTitle>
                <Users2Icon className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent className="pt-3">
                <div className="text-2xl font-bold">
                    {formatPrice(data as number)}
                </div>
                <p className="text-xs opacity-80">
                    +12% from last month
                </p>
            </CardContent>
        </Card>
    )
}