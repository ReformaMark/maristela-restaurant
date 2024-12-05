"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns';
import { calculateTotal, formatPrice, statusColors } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { TransactionWithDetails } from "../../../../../data/transactions-data"

export const transactionColumns: ColumnDef<TransactionWithDetails>[] = [
    {
        accessorKey: "orderId",
        header: () => {
            return <div>Transaction ID</div>
        },
        cell: ({ row }) => {
            return <div>{row.original.orderId}</div>
        },
    },
    {
        accessorKey: "_creationTime",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} // Changed from 'desc' to 'asc'
            >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const timestamp = row.original._creationTime;
            return format(new Date(timestamp), 'MM/dd/yyyy');
        },
        sortingFn: (rowA, rowB) => {
            const aTime = parseFloat(String(rowA.original._creationTime));
            const bTime = parseFloat(String(rowB.original._creationTime));
            return bTime - aTime; // Reverse the comparison for ascending order
        },
    },
    {
        accessorKey: "user.name",
        header: "Customer",
        cell: ({ row }) => {
            return <div>
                {row.original.user?.name} {row.original.user?.lastName}
            </div>
        },
    },
    {
        accessorKey: "orders",
        header: "Total",
        cell: ({ row }) => {
            const shippingFee = 80

            const total = calculateTotal(row.original.orders) + shippingFee

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
]