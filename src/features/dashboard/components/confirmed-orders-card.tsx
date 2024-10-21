"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2Icon, Users2Icon } from "lucide-react";
import { useAllConfirmedTransactions } from "../api/use-all-confirmed-transactions";

export const ConfirmedOrdersCard = () => {
    const { data, isLoading } = useAllConfirmedTransactions()

    if (isLoading) {
        return <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
    }

    const filteredData = data?.length

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 bg-primary rounded-t-md text-white">
                <CardTitle className="text-sm font-medium">
                    Confirmed Orders
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