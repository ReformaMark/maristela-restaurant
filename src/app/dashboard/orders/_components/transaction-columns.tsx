"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CalculateOrder } from "@/lib/types"
import { calculateTotal, formatPrice, statusColors } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { transactionData } from "../../../../../data/transactions-data"

export const transactionColumns: ColumnDef<typeof transactionData[0]>[] = [
    {
        accessorKey: "_id",
        header: "Order ID",
    },
    {
        accessorKey: "_creationTime",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return new Date(row.getValue("_creationTime")).toLocaleDateString()
        },
    },
    {
        accessorKey: "user.name",
        header: "Customer",
    },
    {
        accessorKey: "orders",
        header: "Total",
        cell: ({ row }) => {
            const total = calculateTotal(row.original.orders.map((order) => ({
                ...order,
                familyMeal: order.familyMeal ? { price: order.familyMeal.price } : null,
            } as CalculateOrder)))

            return formatPrice(total)
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as keyof typeof statusColors
            return (
                <Badge className={statusColors[status]}>
                    {status}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const transaction = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(transaction._id)}
                        >
                            Copy transaction ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View transaction details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]