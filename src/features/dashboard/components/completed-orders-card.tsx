"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users2Icon } from "lucide-react";
import { useAllCompletedTransactions } from "../api/use-all-completed-transactions";

export const CompletedOrdersCard = () => {
    const { data, isLoading } = useAllCompletedTransactions()

    if (isLoading) {
        return <Skeleton className="h-32 w-full" />
    }

    const filteredData = data?.length

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 bg-primary rounded-t-md text-white">
                <CardTitle className="text-sm font-medium">
                    Completed Orders
                </CardTitle>
                <Users2Icon className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent className="pt-3">
                <div className="text-2xl font-bold">
                    {filteredData}
                </div>
                <p className="text-xs opacity-80">
                    +2.5% from last month
                </p>
            </CardContent>
        </Card>
    )
}