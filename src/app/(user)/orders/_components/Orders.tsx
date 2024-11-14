'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import { formatDate, formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Package, XCircleIcon } from 'lucide-react'
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
    const pendingTransactions = transactions?.filter(( transaction)=> transaction?.status === 'Pending')
    const confirmedTransactions = transactions?.filter(( transaction)=> transaction?.status === 'Confirmed')
    const OutfordeliveryTransactions = transactions?.filter(( transaction)=> transaction?.status === 'Out for Delivery')
    const completedTransactions = transactions?.filter(( transaction)=> transaction?.status === 'Completed')
    const cancelledTransactions = transactions?.filter(( transaction)=> transaction?.status === 'Cancelled')
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const computeCost = (orders?: any[]) =>{
        let cost = 0
        if(!orders){
            return 0
        }
        orders.map((order)=>{
            cost += order.totalPrice
        })
        return cost
    }
  return (
    <div className=''>
        <div className="flex gap-x-3 items-center">
            <ArrowLeft onClick={()=> router.back()} className='border-yellow border-2 text-yellow p-1 rounded-full cursor-pointer size-8'/>
            <h1 className='text-sm text-black font-semibold md:text-2xl tracking-widest'>Order Transaction</h1> 
        </div>
         <Tabs defaultValue="Pending" className="w-full mt-2 md:mt-5 bg-white p-1  mdLp-5 rounded-md min-h-screen">
          <TabsList className='w-full bg-transparent md:border-b-black md:border-b rounded-none pb-5 justify-evenly'>
            <TabsTrigger value="Pending" className='text-[0.5rem] md:text-lg py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary border-b-2  '>Pending</TabsTrigger>
            <TabsTrigger value="Confirmed"  className='text-[0.5rem] md:text-lg py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary border-b-2  '>Confirmed</TabsTrigger>
            <TabsTrigger value="Out for delivery" className='text-[0.5rem] md:text-lg py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary border-b-2 '>Out for delivery</TabsTrigger>
            <TabsTrigger value="Completed" className='text-[0.5rem] md:text-lg py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary border-b-2  '>Completed</TabsTrigger>
            <TabsTrigger value="Cancelled" className='text-[0.5rem] md:text-lg py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary border-b-2  '>Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value="Pending">
            <div>
                <div className='text-text w-full my-5'>
                    <div className='grid grid-cols-12 justify-evenly w-full'>
                        <div className='col-span-4 text-[0.6rem] md:text-sm'>Order ID</div>
                        <div className='col-span-3 text-[0.6rem] md:text-sm'>Date</div>
                        <div className='col-span-2 text-[0.6rem] md:text-sm'>Cost</div>
                        <div className='col-span-2 text-[0.6rem] md:text-sm'>Status</div>
                        <div className='col-span-1 text-[0.6rem] md:text-sm'></div>
                    </div> 
                </div>
                <div className='space-y-5'>
                    {pendingTransactions ? 
                    pendingTransactions.length >= 1 ? 
                    pendingTransactions.map((transaction)=>(
                        <div key={transaction?._id} className='grid grid-cols-12 justify-evenly w-full'>
                          <div className='col-span-4 text-[0.4rem] md:text-sm'>{transaction?._id}</div>
                          <div className='col-span-3 text-[0.5rem] md:text-sm'>{formatDate({convexDate: transaction? transaction._creationTime : 0})}</div>
                          <div className='col-span-2 text-[0.5rem] md:text-sm'>{formatPrice(computeCost(transaction?.orders) + 80)}</div>
                          <div className='col-span-2 text-[0.5rem] md:text-sm'>{transaction?.status}</div>
                          <div className='col-span-1 text-[0.5rem] md:text-sm'>
                            <Link href={`/orders/${transaction?._id}`} className='text-yellow'>View</Link>
                          </div>
                      </div>
                    )) : (
                        <div className="flex flex-col items-center justify-center min-h-[200px] py-6">
                            <Clock className="size-10 md:size-20 text-gray-500" />
                            <p className="text-lg  text-gray-600">No Pending Orders</p>
                            <p className="text-gray-500 text-center text-sm mt-1">
                                <Link href="/menu" className="text-yellow hover:underline">Place a new order</Link> now!
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center min-h-[200px]">
                            <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            <span className="text-sm text-gray-700 font-medium">Loading...</span>
                            </div>
                        </div>
                    )}
                  
                </div>
            </div>
          </TabsContent>
          <TabsContent value="Confirmed">
            <div>
                <div className='text-text w-full my-5'>
                    <div className='grid grid-cols-12 justify-evenly w-full'>
                        <div className='col-span-4 text-[0.4rem] md:text-sm'>Order ID</div>
                        <div className='col-span-3 text-[0.5rem] md:text-sm'>Date</div>
                        <div className='col-span-2 text-[0.5rem] md:text-sm'>Cost</div>
                        <div className='col-span-2 text-[0.5rem] md:text-sm'>Status</div>
                        <div className='col-span-1 text-[0.5rem] md:text-sm'></div>
                    </div>
                </div>
                <div className='space-y-5'>
                    {confirmedTransactions ? confirmedTransactions.length >= 1 ? confirmedTransactions.map((transaction)=>(
                        <div key={transaction?._id} className='grid grid-cols-12 justify-evenly w-full'>
                          <div className='col-span-4 text-[0.4rem] md:text-sm'>{transaction?._id}</div>
                          <div className='col-span-3 text-[0.5rem] md:text-sm'>{formatDate({convexDate: transaction? transaction._creationTime : 0})}</div>
                          <div className='col-span-2 text-[0.5rem] md:text-sm'>{formatPrice(computeCost(transaction?.orders))}</div>
                          <div className='col-span-2 text-[0.5rem] md:text-sm'>{transaction?.status}</div>
                          <div className='col-span-1 text-[0.5rem] md:text-sm'>
                            <Link href={`/orders/${transaction?._id}`} className='text-yellow'>View</Link>
                          </div>
                      </div>
                    )) : (
                        <div className="flex flex-col items-center justify-center min-h-[200px] py-6">
                            <CheckCircle className="size-10 md:size-20 text-gray-500" />
                            <p className="text-lg  text-gray-600">No Confirmed Orders</p>
                            <p className="text-gray-500 text-center text-sm mt-1">
                                You can check back later for updates, or you can <Link href="/menu" className="text-yellow hover:underline">place a new order</Link> now!
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center min-h-[200px]">
                            <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            <span className="text-sm text-gray-700 font-medium">Loading...</span>
                            </div>
                        </div>
                    )}
                  
                </div>
            </div>
          </TabsContent>
          <TabsContent value="Out for delivery">
            <div>
                <div className='text-text w-full my-5'>
                    <div className='grid grid-cols-12 justify-evenly w-full'>
                        <div className='col-span-4 text-[0.4rem] md:text-sm'>Order ID</div>
                        <div className='col-span-3 text-[0.5rem] md:text-sm'>Date</div>
                        <div className='col-span-2 text-[0.5rem] md:text-sm'>Cost</div>
                        <div className='col-span-2 text-[0.5rem] md:text-sm'>Status</div>
                        <div className='col-span-1 text-[0.5rem] md:text-sm'></div>
                    </div>
                </div>
                <div className='space-y-5'>
                    {OutfordeliveryTransactions ? OutfordeliveryTransactions.length >= 1 ? OutfordeliveryTransactions.map((transaction)=>(
                        <div key={transaction?._id} className='grid grid-cols-12 justify-evenly w-full'>
                          <div className='col-span-4 text-[0.4rem] md:text-sm'>{transaction?._id}</div>
                          <div className='col-span-3 text-[0.4rem] md:text-sm'>{formatDate({convexDate: transaction? transaction._creationTime : 0})}</div>
                          <div className='col-span-2 text-[0.5rem] md:text-sm'>{formatPrice(computeCost(transaction?.orders))}</div>
                          <div className='col-span-2 text-[0.5rem] md:text-sm'>{transaction?.status}</div>
                          <div className='col-span-1 text-[0.5rem] md:text-sm'>
                            <Link href={`/orders/${transaction?._id}`} className='text-yellow'>View</Link>
                          </div>
                      </div>
                    )): (
                        <div className="flex flex-col items-center justify-center min-h-[200px] py-6">
                            <Truck className="size-10 md:size-20 text-gray-500" />
                            <p className="text-lg  text-gray-600">No Out for Delivery Orders</p>
                            <p className="text-gray-500 text-center text-sm mt-1">
                                You can check back later for updates, or you can <Link href="/menu" className="text-yellow hover:underline">place a new order</Link> now!
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center min-h-[200px]">
                            <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            <span className="text-sm text-gray-700 font-medium">Loading...</span>
                            </div>
                        </div>
                    )}
                  
                </div>
            </div>
          </TabsContent>
          <TabsContent value="Completed">
            <div >
                <div className='text-text w-full my-5'>
                    <div className='grid grid-cols-12 justify-evenly w-full'>
                        <div className='col-span-4 text-[0.4rem] md:text-sm'>Order ID</div>
                        <div className='col-span-3 text-[0.4rem] md:text-sm'>Date</div>
                        <div className='col-span-2 text-[0.5rem] md:text-sm'>Cost</div>
                        <div className='col-span-2 text-[0.5rem] md:text-sm'>Status</div>
                        <div className='col-span-1 text-[0.5rem] md:text-sm'></div>
                    </div>
                </div>
                <div className='space-y-5'>
                    {completedTransactions ? completedTransactions.length >= 1 ? completedTransactions.map((transaction)=>(
                        <div key={transaction?._id} className='grid grid-cols-12 justify-evenly w-full'>
                          <div className='col-span-4 text-[0.4rem] md:text-sm'>{transaction?._id}</div>
                          <div className='col-span-3 text-[0.4rem] md:text-sm'>{formatDate({convexDate: transaction? transaction._creationTime : 0})}</div>
                          <div className='col-span-2 text-[0.5rem] md:text-sm'>{formatPrice(computeCost(transaction?.orders))}</div>
                          <div className='col-span-2 text-[0.5rem] md:text-sm'>{transaction?.status}</div>
                          <div className='col-span-1 text-[0.5rem] md:text-sm'>
                            <Link href={`/orders/${transaction?._id}`} className='text-yellow'>View</Link>
                          </div>
                      </div>
                    )): (
                        <div className="flex flex-col items-center justify-center min-h-[200px] py-6">
                            <Package  className="size-10 md:size-20 text-gray-500" />
                            <p className="text-lg  text-gray-600">No Completed Orders</p>
                            <p className="text-gray-500 text-center text-sm mt-1">
                                You can check back later for updates, or you can <Link href="/menu" className="text-yellow hover:underline">place a new order</Link> now!
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center min-h-[200px]">
                            <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            <span className="text-sm text-gray-700 font-medium">Loading...</span>
                            </div>
                        </div>
                    )}
                  
                </div>
            </div>
          </TabsContent>
          <TabsContent value="Cancelled">
            <div >
                <div className='text-text w-full my-5'>
                    <div className='grid grid-cols-12 justify-evenly w-full'>
                        <div className='col-span-4'>Order ID</div>
                        <div className='col-span-3 text-[0.4rem] md:text-sm'>Date</div>
                        <div className='col-span-2 text-[0.5rem] md:text-sm'>Cost</div>
                        <div className='col-span-2 text-[0.5rem] md:text-sm'>Status</div>
                        <div className='col-span-1 text-[0.5rem] md:text-sm'></div>
                    </div>
                </div>
                <div className='space-y-5'>
                    {cancelledTransactions ? cancelledTransactions.length >= 1 ? cancelledTransactions.map((transaction)=>(
                        <div key={transaction?._id} className='grid grid-cols-12 justify-evenly w-full'>
                          <div className='col-span-4 text-[0.4rem] md:text-sm'>{transaction?._id}</div>
                          <div className='col-span-3 text-[0.4rem] md:text-sm'>{formatDate({convexDate: transaction? transaction._creationTime : 0})}</div>
                          <div className='col-span-2 text-[0.5rem] md:text-sm'>{formatPrice(computeCost(transaction?.orders))}</div>
                          <div className='col-span-2 text-[0.5rem] md:text-sm'>{transaction?.status}</div>
                          <div className='col-span-1 text-[0.5rem] md:text-sm'>
                            <Link href={`/orders/${transaction?._id}`} className='text-yellow'>View</Link>
                          </div>
                      </div>
                    )): (
                        <div className="flex flex-col items-center justify-center min-h-[200px] py-6">
                            <XCircleIcon className="size-10 md:size-20 text-gray-500" />
                            <p className="text-lg  text-gray-600">No Cancelled Orders</p>
                            <p className="text-gray-500 text-center text-sm mt-1">
                                You can check back later for updates, or you can <Link href="/menu" className="text-yellow hover:underline">place a new order</Link> now!
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center min-h-[200px]">
                            <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            <span className="text-sm text-gray-700 font-medium">Loading...</span>
                            </div>
                        </div>
                    )}
                  
                </div>
            </div>
          </TabsContent>
        </Tabs>
    </div>
  )
}

export default Orders