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
            const orderDate = row.original.orders[0].orderDate;
            if (orderDate) {
                const formattedDate = format(new Date(orderDate), 'MM/dd/yyyy');
                return formattedDate;
            }
            return 'N/A';
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