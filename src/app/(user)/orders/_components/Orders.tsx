'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import { formatDate, formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Clock, Truck, Check, XCircle } from 'lucide-react';

export type StatusType = 'Pending' | 'Confirmed' | 'Out for Delivery' | 'Completed' | 'Cancelled';
export const statusIcons: Record<StatusType, JSX.Element> = {
    Pending: <Clock className="w-5 h-5 md:size-16" />,
    Confirmed: <CheckCircle className="w-5 h-5 md:size-16" />,
    'Out for Delivery': <Truck className="w-5 h-5 md:size-16" />,
    Completed: <Check className="w-5 h-5 md:size-16" />,
    Cancelled: <XCircle className="w-5 h-5 md:size-16" />
};
function Orders() {
    const transactions = useQuery(api.transactions.getTransactions)
    const router = useRouter()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const computeCost = (orders?: any[]) => {
        return orders ? orders.reduce((total, order) => total + order.totalPrice, 0) : 0
    }

    return (
        <div className='max-w-screen-lg mx-auto md:p-5'>
            <div className="flex gap-x-3 items-center mb-4">
                <ArrowLeft onClick={() => router.back()} className='border-yellow-500 border-2 text-yellow-500 p-1 rounded-full cursor-pointer size-8 hover:bg-yellow-100 transition-all' />
                <h1 className='text-sm text-black font-semibold md:text-2xl tracking-widest'>Order Transactions</h1>
            </div>
            <Tabs defaultValue="Pending" className="w-full p-2 md:p-4 rounded-md shadow-md">
                <TabsList className='flex bg-transparent md:justify-evenly mb-10 mt-5'>
                    {(['Pending', 'Confirmed', 'Out for Delivery', 'Completed', 'Cancelled'] as StatusType[]).map((status) => (
                        <TabsTrigger 
                            key={status} 
                            value={status} 
                            className={`flex flex-col justify-center items-center transition-colors duration-300
                                        text-text text-sm md:text-lg font-semibold 
                                        data-[state=active]:text-yellow  md:p-3`}>
                            
                            {/* Circular Status Indicator */}
                            <div className={`flex justify-center items-center hover:scale-105 md:p-2 text-white size-10 md:w-12 md:h-12 rounded-full bg-primary 
                                             transition duration-300`}>
                                {statusIcons[status]} {/* Replace with your actual icon components */}
                            </div>

                            {/* Status Label */}
                            <span className={`text-[0.6rem] md:text-lg`}>
                                {status}
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                {['Pending', 'Confirmed', 'Out for Delivery', 'Completed', 'Cancelled'].map((status) => (
                    <TabsContent key={status} value={status}>
                        <div className='my-4'>
                            <div className='grid grid-cols-12 text-xs md:text-sm font-semibold mb-2 text-gray-600'>
                                <div className='col-span-4'>Order ID</div>
                                <div className='col-span-3'>Date</div>
                                <div className='col-span-2'>Cost</div>
                                <div className='col-span-2'>Status</div>
                                <div className='col-span-1'></div>
                            </div>
                            <div className='space-y-3'>
                                {transactions && transactions.filter(transaction => transaction?.status === status).length > 0 ? (
                                    transactions.filter(transaction => transaction?.status === status).map(transaction => (
                                        <div key={transaction?._id} className='grid grid-cols-12 text-sm py-2 bg-gray-50 rounded-md md:p-3 shadow-sm hover:shadow-lg transition-all duration-200'>
                                            <div className='text-[0.45rem] md:text-sm col-span-4'>{transaction?._id}</div>
                                            <div className='text-[0.45rem] md:text-sm col-span-3'>{formatDate({ convexDate: transaction?._creationTime || 0 })}</div>
                                            <div className='text-[0.55rem] md:text-lg col-span-2'>{formatPrice(computeCost(transaction?.orders) + (status === 'Pending' ? 80 : 0))}</div>
                                            <div className='text-[0.55rem] md:text-lg col-span-2'>{transaction?.status}</div>
                                            <div className='col-span-1'>
                                                <Link href={`/orders/${transaction?._id}`} className='text-[0.5rem] md:text-lg text-yellow-500 hover:underline'>View</Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='text-center text-gray-500'>No {status} transactions.</div>
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
