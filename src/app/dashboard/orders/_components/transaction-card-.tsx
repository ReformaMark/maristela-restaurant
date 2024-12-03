"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAllTransactions } from "@/features/transactions/api/use-all-transactions"
import { calculateTotal, formatPrice } from "@/lib/utils"
import { useConvexMutation } from "@convex-dev/react-query"
import { useMutation } from "@tanstack/react-query"
import { ConvexError } from "convex/values"
import { CheckCircle, Clock, Package, RefreshCcw, Search, Truck, XCircleIcon } from "lucide-react"
import { Fragment, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"
import { transactionColumns } from "./transaction-columns"

type TransactionType = NonNullable<ReturnType<typeof useAllTransactions>['data']>[number];

export const TransactionCard = () => {
    const { data, isLoading, hasMore, loadMore, searchTransaction, resetSearch, isSearchActive, searchError } = useAllTransactions()
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionType | null>(null)
    const [activeTab, setActiveTab] = useState("new")
    const [searchInput, setSearchInput] = useState("")

    const filteredTransactions = useMemo(() => {
        if (activeTab === "new") {
            return data?.filter(t => ["Pending", "Confirmed", "Out for Delivery"].includes(t.status))
        } else {
            return data?.filter(t => ["Completed", "Cancelled"].includes(t.status))
        }
    }, [data, activeTab])

    const { mutate, isPending } = useMutation({
        mutationFn: useConvexMutation(api.transactions.handleTransactionStatus),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
            toast.success(`${data.message}`)
        },
        onError: (error) => {
            let errorMessage = "Failed to update transaction";
            if (error instanceof ConvexError) {
                errorMessage = error.data;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            toast.error(errorMessage)
        }
    })

    const handleStatusChange = async (newStatus: "Pending" | "Confirmed" | "Out for Delivery" | "Completed" | "Cancelled") => {
        if (selectedTransaction) {
            await mutate({
                status: newStatus,
                transactionId: selectedTransaction._id as Id<"transactions">
            })

            setSelectedTransaction(prev => prev ? { ...prev, status: newStatus } : null)
        }
    }

    const handleSearch = () => {
        if (searchInput) {
            try {
                searchTransaction(searchInput as Id<"transactions">)
            } catch (error) {
                toast.error("Invalid transaction ID. Please enter a valid ID.")
                console.error("Search error:", error)
            }
        } else {
            toast.error("Please enter a transaction ID to search.")
        }
    }

    const handleReset = () => {
        resetSearch();
        setSearchInput("");
    }

    // useEffect(() => {
    //     setSelectedTransaction(data?.[0])
    // }, [data])

    useEffect(() => {
        if (searchError) {
            toast.error("Transaction not found. Please try a different ID.");
            resetSearch();
        }
    }, [searchError, resetSearch]);

    if (isLoading) return (
        // create a skeleton of the table
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Skeleton className="w-full h-[1000px]" />
            </div>
            <div className="lg:col-span-1">
                <Skeleton className="w-full h-[750px]" />
            </div>
        </div>
    )

    if (!data) return <div>
        No data.
    </div>

    const fullName = selectedTransaction?.user?.name + " " + selectedTransaction?.user?.lastName
    const shippingFullName = selectedTransaction?.shippingAddress?.firstname + " " + selectedTransaction?.shippingAddress?.lastName
    const shippingFee = 80

    const renderStatusWizard = () => {
        const statuses = ['Pending', 'Confirmed', 'Out for Delivery', 'Completed', 'Cancelled']
        const currentIndex = statuses.indexOf(selectedTransaction?.status as string)

        return (
            <div className="flex flex-row items-center justify-between mb-4 text-sm">
                {statuses.map((status, index) => (
                    <Fragment key={status}>
                        <div className="flex flex-col items-center mb-2 sm:mb-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentIndex ? 'bg-primary' : 'bg-gray-300'}`}>
                                {index === 0 && <Clock className="w-5 h-5 text-white" />}
                                {index === 1 && <CheckCircle className="w-5 h-5 text-white" />}
                                {index === 2 && <Truck className="w-5 h-5 text-white" />}
                                {index === 3 && <Package className="w-5 h-5 text-white" />}
                                {index === 4 && <XCircleIcon className="w-5 h-5 text-white" />}
                            </div>
                            <span className="text-xs mt-1 text-center">
                                {status}
                            </span>
                        </div>
                        {index < statuses.length - 1 && (
                            <div className={`hidden sm:block flex-1 h-1 ${index < currentIndex ? 'bg-primary' : 'bg-gray-300'}`} />
                        )}
                    </Fragment>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Recent Transactions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2 mb-4">
                            <Input
                                placeholder="Search by Transaction ID"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <Button onClick={handleSearch}>
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                            <Button onClick={handleReset} variant="outline" disabled={!isSearchActive}>
                                <RefreshCcw className="h-4 w-4 mr-2" />
                                Reset
                            </Button>
                        </div>
                        {isSearchActive ? (
                            <DataTable
                                // @ts-expect-error minor type mismatch
                                columns={transactionColumns}
                                data={data as TransactionType[]}
                                onRowClick={(row) => setSelectedTransaction(row)}
                            />
                        ) : (
                            <Tabs defaultValue="new" className="w-full" onValueChange={(value) => setActiveTab(value)}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="new">New Orders</TabsTrigger>
                                    <TabsTrigger value="completed">Completed & Cancelled</TabsTrigger>
                                </TabsList>
                                <TabsContent value="new">
                                    <DataTable
                                        // @ts-expect-error minor type mismatch
                                        columns={transactionColumns}
                                        data={filteredTransactions as TransactionType[]}
                                        onRowClick={(row) => setSelectedTransaction(row)}
                                        filter="status"
                                    />
                                </TabsContent>
                                <TabsContent value="completed">
                                    <DataTable
                                        // @ts-expect-error minor type mismatch
                                        columns={transactionColumns}
                                        data={filteredTransactions as TransactionType[]}
                                        onRowClick={(row) => setSelectedTransaction(row)}
                                        filter="status"
                                    />
                                </TabsContent>
                            </Tabs>
                        )}
                        {hasMore && !isSearchActive && (
                            <Button onClick={loadMore} className="mt-4">
                                Load More
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card className='text-card-foreground overflow-hidden'>
                    <CardHeader className="flex flex-col items-start bg-muted/50 truncate">
                        <CardTitle className='flex justify-between items-center truncate'>
                            <div className="flex-1 min-w-0">
                                <span className="truncate">Order # {selectedTransaction?._id}</span>
                            </div>
                        </CardTitle>
                        {selectedTransaction?._creationTime !== undefined ? (
                            <p className="text-sm text-muted-foreground">
                                Date: {new Date(selectedTransaction?._creationTime).toLocaleDateString()}
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Date: Unknown
                            </p>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4 p-6 text-sm">
                        {selectedTransaction?.status === "Pending" || selectedTransaction?.status === "Confirmed" || selectedTransaction?.status === "Out for Delivery" ? (
                            <div className="text-black">
                                {renderStatusWizard()}
                                <Select
                                    value={selectedTransaction?.status}
                                    onValueChange={handleStatusChange}
                                    disabled={isPending}
                                >
                                    <SelectTrigger className="w-full text-black">
                                        <SelectValue placeholder="Change status" />
                                    </SelectTrigger>
                                    <SelectContent className="text-black">
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                                            <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : selectedTransaction?.status === "Completed" ? (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Completed Order</strong>
                                <span className="block sm:inline"> This order is completed.</span>
                            </div>
                        ) : (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Cancelled Order</strong>
                                <span className="block sm:inline"> This order has been cancelled.</span>
                            </div>
                        )}

                        <div className="grid gap-3">
                            <h3 className="font-semibold mb-2">
                                Order Details
                            </h3>

                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {selectedTransaction?.orders.map((order: any) => (
                                <div
                                    key={order._id}
                                    className="flex justify-between"
                                >
                                    <span className="text-muted-foreground">{order.menuItem ? order.menuItem.name : order?.familyMeal?.price} x {order.quantity}</span>
                                    <span>{formatPrice(((order?.menuItem?.price || 0) * (order?.quantity ?? 0)))}</span>
                                </div>
                            ))}
                        </div>

                        <Separator className="my-2" />

                        <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span>
                                    {formatPrice(calculateTotal(selectedTransaction?.orders ?? [])?.toFixed(2))}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Shipping fee</span>
                                <span>
                                    {formatPrice(shippingFee)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between font-semibold">
                                <span>Total</span>
                                <span>
                                    {formatPrice((calculateTotal(selectedTransaction?.orders ?? []) + shippingFee).toFixed(2))}
                                </span>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <h3 className="font-semibold mb-2">
                                    Shipping Information
                                </h3>
                                <address className="grid gap-0.5 not-italic text-muted-foreground">
                                    <span>{shippingFullName}</span>
                                    <span>{selectedTransaction?.shippingAddress?.address}</span>
                                    {/* <span>{selectedTransaction?.shippingAddress?.city}, {selectedTransaction?.shippingAddress?.state} {selectedTransaction?.shippingAddress?.zip}</span> */}
                                </address>
                            </div>

                            <div className="grid auto-rows-max gap-3">
                                <h3 className="font-semibold mb-2">
                                    Billing Information
                                </h3>
                                <div className="text-muted-foreground">
                                    Same as shipping address
                                </div>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid gap-3">
                            <h3 className="font-semibold">Customer Information</h3>
                            <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Customer
                                    </dt>
                                    <dd>{fullName}</dd>
                                </div>

                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Email
                                    </dt>
                                    <dd>{selectedTransaction?.user?.email}</dd>
                                </div>

                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Phone
                                    </dt>
                                    <dd>{selectedTransaction?.shippingAddress?.phoneNumber}</dd>
                                </div>
                            </dl>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid gap-3">
                            <h3 className="font-semibold">Payment Information</h3>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                                <span className="ml-2">
                                    {selectedTransaction?.mop.toUpperCase()}
                                </span>
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                        <p className="text-sm text-muted-foreground">
                            Updated {new Date(selectedTransaction?._creationTime ?? 0).toLocaleDateString()}
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
