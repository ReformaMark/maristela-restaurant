"use client"
import { ColumnDef } from "@tanstack/react-table";
import { MenuDataWithRatings } from "../../../../../data/menu-data";

import {
    CheckIcon,
    MoreHorizontal,
    PencilIcon,
    Trash2Icon,
    XIcon,
} from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";
import { EditProductModal } from "./edit-product-modal";

export const EditColumns: ColumnDef<MenuDataWithRatings>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.name}
                </div>
            )
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = row.original.price

            const formattedPrice = new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })

            return (
                <span>
                    {formattedPrice.format(price)}
                </span>
            )
        }
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <span className="max-w-[200px] truncate">{row.original.description}</span>
        ),
    },
    {
        accessorKey: "prepTime",
        header: "Prep Time",
    },
    {
        accessorKey: "recommended",
        header: "Recommended",
        cell: ({ row }) => (
            <span className="flex justify-center">
                {row.original.recommended ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                    <XIcon className="h-5 w-5 text-red-500" />
                )}
            </span>
        ),
    },
    {
        accessorKey: "special",
        header: "Special",
        cell: ({ row }) => (
            <span className="flex justify-center">
                {row.original.special ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                    <XIcon className="h-5 w-5 text-red-500" />
                )}
            </span>
        ),
    },
    {
        accessorKey: "available",
        header: "Available",
        cell: ({ row }) => (
            <span className="flex justify-center">
                {row.original.available ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                    <XIcon className="h-5 w-5 text-red-500" />
                )}
            </span>
        )
    },
    {
        id: "actions",
        header: "Actions",
        cell: function Cell({ row }) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const [ConfirmDialog, confirm] = useConfirm(
                "Are you sure?",
                "This will delete the product permanently.",
            )
            const [editOpen, setEditOpen] = useState(false)

            const { mutate: deleteProduct, isPending } = useMutation({
                mutationFn: useConvexMutation(api.menus.deleteMenu),
                onSuccess: () => {
                    toast.success('Product deleted successfully')
                },
                onError: (error) => {
                    console.error(error)

                }
            })

            const productData = row.original

            const handleDelete = async () => {
                const ok = await confirm()

                if (!ok) return

                deleteProduct({
                    id: productData._id
                })
            }

            return (
                <>
                    <ConfirmDialog />

                    <EditProductModal
                        productData={productData}
                        editOpen={editOpen}
                        setEditOpen={() => setEditOpen(!editOpen)}
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => setEditOpen(true)}
                                className="text-yellow cursor-pointer"
                            >
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={handleDelete}
                                className="text-red-600 cursor-pointer"
                                disabled={isPending}
                            >
                                <Trash2Icon className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        }
    },
]