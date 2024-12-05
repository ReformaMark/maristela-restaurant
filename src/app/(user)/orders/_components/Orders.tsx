'use client'
import { useMutation, useQuery } from 'convex/react'
import React, { useCallback, useState } from 'react'
import { api } from '../../../../../convex/_generated/api'
import { formatDate, formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Clock, Truck, Check, XCircle } from 'lucide-react';
import { Id } from '../../../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'

export type StatusType = 'Pending' | 'Confirmed' | 'Out for Delivery' | 'Completed' | 'Cancelled';
export const statusIcons: Record<StatusType, JSX.Element> = {
    Pending: <Clock className="w-5 h-5 md:size-16" />,
    Confirmed: <CheckCircle className="w-5 h-5 md:size-16" />,
    'Out for Delivery': <Truck className="w-5 h-5 md:size-16" />,
    Completed: <Check className="w-5 h-5 md:size-16" />,
    Cancelled: <XCircle className="w-5 h-5 md:size-16" />
};

function Orders() {
    const [limit, setLimit] = useState(10);
    const [cursor, setCursor] = useState<string | null>(null);
    const transactions = useQuery(api.transactions.getAllTransactionByUser, { limit, cursor: cursor || undefined});
    const pendingTransactions = transactions?.transactions.filter((transaction) => transaction?.status === 'Pending')
    const confirmedTransactions = transactions?.transactions.filter((transaction) => transaction?.status === 'Confirmed')
    const outForDeliveryTransactions = transactions?.transactions.filter((transaction) => transaction?.status === 'Out for Delivery')
    const completedTransactions = transactions?.transactions.filter((transaction) => transaction?.status === 'Completed')
    const cancelledTransactions = transactions?.transactions.filter((transaction) => transaction?.status === 'Cancelled')
    const router = useRouter()
 
    const loadMore = useCallback(() => {
        if (transactions?.continueCursor) {
        
          setLimit((prevLimit) => prevLimit + 10);
        }
      }, [transactions?.continueCursor, 10]);

   
    // eslint-disable-next-line
    const computeCost = (orders?: any[]) => {
        if (!orders) {
            return 0
        }
        return orders.reduce((total, order) => total + order.totalPrice, 0)
    }
   // eslint-disable-next-line
    const renderTransactionList = (transactions: any[] | undefined, icon: JSX.Element, status: string) => {
        if (!transactions) {
            return (
                <div className="flex items-center justify-center min-h-[200px]">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        <span className="text-sm text-gray-700 font-medium">Loading...</span>
                    </div>
                </div>
            )
        }

        if (transactions.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[200px] py-6">
                    {icon}
                    <p className="text-lg text-gray-600">No {status} Orders</p>
                    <p className="text-gray-500 text-center text-sm mt-1">
                        {status === 'Pending' ? (
                            <Link href="/menu" className="text-yellow hover:underline">Place a new order</Link>
                        ) : (
                            <>You can check back later for updates, or you can <Link href="/menu" className="text-yellow hover:underline">place a new order</Link> now!</>
                        )}
                    </p>
                </div>
            )
        }

        return ( 
            <div className="space-y-10">
                {transactions.map((transaction) => (
                    <div key={transaction?._id} className='grid grid-cols-12 justify-evenly w-full'>
                        {transaction.status === "Pending" && <div className='col-span-2 text-[0.5rem] text-center font-semibold md:text-sm'>{transaction?.queuingNumber || ""}</div>}
                        <div className={`${transaction.status === "Pending" ? "col-span-2" : "col-span-4"}  text-[0.6rem] md:text-sm`}>{transaction?.orderId}</div>
                        <div className='col-span-3 text-[0.5rem] md:text-sm'>{formatDate({convexDate: transaction?._creationTime ?? 0})}</div>
                        <div className='col-span-2 text-[0.5rem] md:text-sm'>{formatPrice(computeCost(transaction?.orders) + (status === 'Pending' ? 80 : 0))}</div>
                        <div className='col-span-2 text-[0.5rem] md:text-sm'>{transaction?.status}</div>
                        <div className='col-span-1 text-[0.5rem] md:text-sm'>
                            <Link href={`/orders/${transaction?._id}`} className='text-yellow'>View</Link>
                        </div>
                    </div>
                ))}
                <Button variant={'ghost'} className='w-full' onClick={loadMore}>See More...</Button>
            </div>
        )
    }

    return (
        <div className=''>
            <div className="flex gap-x-3 items-center">
                <ArrowLeft onClick={() => router.back()} className='border-yellow border-2 text-yellow p-1 rounded-full cursor-pointer size-8'/>
                <h1 className='text-sm text-black font-semibold md:text-2xl tracking-widest'>Order Transaction</h1> 
            </div>
            <Tabs defaultValue="Pending" className="w-full mt-2 md:mt-5 bg-white p-1 mdLp-5 rounded-md min-h-screen">
                <TabsList className='w-full bg-transparent md:border-b-black md:border-b rounded-none pb-5 justify-evenly'>
                    <TabsTrigger value="Pending" className='text-[0.5rem] md:text-lg py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary border-b-2'>Pending</TabsTrigger>
                    <TabsTrigger value="Confirmed" className='text-[0.5rem] md:text-lg py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary border-b-2'>Confirmed</TabsTrigger>
                    <TabsTrigger value="Out for delivery" className='text-[0.5rem] md:text-lg py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary border-b-2'>Out for delivery</TabsTrigger>
                    <TabsTrigger value="Completed" className='text-[0.5rem] md:text-lg py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary border-b-2'>Completed</TabsTrigger>
                    <TabsTrigger value="Cancelled" className='text-[0.5rem] md:text-lg py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary border-b-2'>Cancelled</TabsTrigger>
                </TabsList>

                {['Pending', 'Confirmed', 'Out for delivery', 'Completed', 'Cancelled'].map((status) => (
                    <TabsContent key={status} value={status}>
                        <div>
                            <div className='text-text w-full my-5'>
                                <div className='grid grid-cols-12 justify-evenly w-full'>
                                    {status === "Pending" && <div className='col-span-2 text-[0.6rem] text-center md:text-sm'>Queue No.</div>}
                                    <div className={`${status === "Pending" ? "col-span-2" : "col-span-4"}  text-[0.6rem] md:text-sm`}>Order ID</div>
                                    <div className='col-span-3 text-[0.6rem] md:text-sm'>Date</div>
                                    <div className='col-span-2 text-[0.6rem] md:text-sm'>Cost</div>
                                    <div className='col-span-2 text-[0.6rem] md:text-sm'>Status</div>
                                    <div className='col-span-1 text-[0.6rem] md:text-sm'></div>
                                </div>
                            </div>
                            <div className='space-y-10'>
                                {renderTransactionList(
                                    status === 'Pending' ? pendingTransactions :
                                    status === 'Confirmed' ? confirmedTransactions :
                                    status === 'Out for delivery' ? outForDeliveryTransactions :
                                    status === 'Completed' ? completedTransactions :
                                    cancelledTransactions,
                                    statusIcons[status as StatusType],
                                    status
                                )}                        
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default Orders