"use client"

import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAllTransactions } from "@/features/transactions/api/use-all-transactions"
import { calculateTotal, formatPrice } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { transactionColumns } from "./transaction-columns"

export const TransactionCard = () => {
    const { data, isLoading } = useAllTransactions()
    const [selectedTransaction, setSelectedTransaction] = useState(data?.[0])

    useEffect(() => {
        setSelectedTransaction(data?.[0])
    }, [data])

    if (isLoading) return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Loader2Icon
                    className="mr-2 h-4 w-4 animate-spin"
                />
            </div>
        </div>
    )

    if (!data) return <div>
        No data.
    </div>



    const fullName = selectedTransaction?.user?.name + " " + selectedTransaction?.user?.lastName
    const shippingFee = 80



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
                        <DataTable
                            //@ts-expect-error need to know how to get exact type
                            columns={transactionColumns}
                            data={data}
                            filter="name"
                            onRowClick={(row) => setSelectedTransaction(row)}
                        />
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
                        <div className="grid gap-3">
                            <h3 className="font-semibold mb-2">
                                Order Details
                            </h3>

                            {selectedTransaction?.orders.map((order) => (
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

                            {/* <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span>
                                    {formatPrice((calculateTotal(selectedTransaction?.orders ?? []) * 0.1).toFixed(2))}
                                </span>
                            </div> */}

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
                                    <span>{fullName}</span>
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
                                    <dd>{selectedTransaction?.user?.phone}</dd>
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