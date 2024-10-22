'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import { formatDate, formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'


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
                        <div className='text-center'>No Pending transactions.</div>
                    ) : (
                        <>Loading...</>
                    )}
                  
                </div>
            </div>
          </TabsContent>
          <TabsContent value="Confirmed">
            <div>
                <div className='text-text w-full my-5'>
                    <div className='grid grid-cols-12 justify-evenly w-full'>
                        <div className='col-span-4'>Order ID</div>
                        <div className='col-span-3'>Date</div>
                        <div className='col-span-2'>Cost</div>
                        <div className='col-span-2'>Status</div>
                        <div className='col-span-1'></div>
                    </div>
                </div>
                <div className='space-y-5'>
                    {confirmedTransactions ? confirmedTransactions.length >= 1 ? confirmedTransactions.map((transaction)=>(
                        <div key={transaction?._id} className='grid grid-cols-12 justify-evenly w-full'>
                          <div className='col-span-4'>{transaction?._id}</div>
                          <div className='col-span-3'>{formatDate({convexDate: transaction? transaction._creationTime : 0})}</div>
                          <div className='col-span-2'>{formatPrice(computeCost(transaction?.orders))}</div>
                          <div className='col-span-2'>{transaction?.status}</div>
                          <div className='col-span-1'>
                            <Link href={`/orders/${transaction?._id}`} className='text-yellow'>View</Link>
                          </div>
                      </div>
                    )) : (
                        <div className='text-center'>No Confirmed transactions.</div>
                    ) : (
                        <>Loading...</>
                    )}
                  
                </div>
            </div>
          </TabsContent>
          <TabsContent value="Out for delivery">
            <div>
                <div className='text-text w-full my-5'>
                    <div className='grid grid-cols-12 justify-evenly w-full'>
                        <div className='col-span-4'>Order ID</div>
                        <div className='col-span-3'>Date</div>
                        <div className='col-span-2'>Cost</div>
                        <div className='col-span-2'>Status</div>
                        <div className='col-span-1'></div>
                    </div>
                </div>
                <div className='space-y-5'>
                    {OutfordeliveryTransactions ? OutfordeliveryTransactions.length >= 1 ? OutfordeliveryTransactions.map((transaction)=>(
                        <div key={transaction?._id} className='grid grid-cols-12 justify-evenly w-full'>
                          <div className='col-span-4'>{transaction?._id}</div>
                          <div className='col-span-3'>{formatDate({convexDate: transaction? transaction._creationTime : 0})}</div>
                          <div className='col-span-2'>{formatPrice(computeCost(transaction?.orders))}</div>
                          <div className='col-span-2'>{transaction?.status}</div>
                          <div className='col-span-1'>
                            <Link href={`/orders/${transaction?._id}`} className='text-yellow'>View</Link>
                          </div>
                      </div>
                    )): (
                        <div className='text-center'>No out for delivery transactions.</div>
                    ) : (
                        <>Loading...</>
                    )}
                  
                </div>
            </div>
          </TabsContent>
          <TabsContent value="Completed">
            <div >
                <div className='text-text w-full my-5'>
                    <div className='grid grid-cols-12 justify-evenly w-full'>
                        <div className='col-span-4'>Order ID</div>
                        <div className='col-span-3'>Date</div>
                        <div className='col-span-2'>Cost</div>
                        <div className='col-span-2'>Status</div>
                        <div className='col-span-1'></div>
                    </div>
                </div>
                <div className='space-y-5'>
                    {completedTransactions ? completedTransactions.length >= 1 ? completedTransactions.map((transaction)=>(
                        <div key={transaction?._id} className='grid grid-cols-12 justify-evenly w-full'>
                          <div className='col-span-4'>{transaction?._id}</div>
                          <div className='col-span-3'>{formatDate({convexDate: transaction? transaction._creationTime : 0})}</div>
                          <div className='col-span-2'>{formatPrice(computeCost(transaction?.orders))}</div>
                          <div className='col-span-2'>{transaction?.status}</div>
                          <div className='col-span-1'>
                            <Link href={`/orders/${transaction?._id}`} className='text-yellow'>View</Link>
                          </div>
                      </div>
                    )): (
                        <div className='text-center'>No Completed transactions.</div>
                    ) : (
                        <>Loading...</>
                    )}
                  
                </div>
            </div>
          </TabsContent>
          <TabsContent value="Cancelled">
            <div >
                <div className='text-text w-full my-5'>
                    <div className='grid grid-cols-12 justify-evenly w-full'>
                        <div className='col-span-4'>Order ID</div>
                        <div className='col-span-3'>Date</div>
                        <div className='col-span-2'>Cost</div>
                        <div className='col-span-2'>Status</div>
                        <div className='col-span-1'></div>
                    </div>
                </div>
                <div className='space-y-5'>
                    {cancelledTransactions ? cancelledTransactions.length >= 1 ? cancelledTransactions.map((transaction)=>(
                        <div key={transaction?._id} className='grid grid-cols-12 justify-evenly w-full'>
                          <div className='col-span-4'>{transaction?._id}</div>
                          <div className='col-span-3'>{formatDate({convexDate: transaction? transaction._creationTime : 0})}</div>
                          <div className='col-span-2'>{formatPrice(computeCost(transaction?.orders))}</div>
                          <div className='col-span-2'>{transaction?.status}</div>
                          <div className='col-span-1'>
                            <Link href={`/orders/${transaction?._id}`} className='text-yellow'>View</Link>
                          </div>
                      </div>
                    )): (
                        <div className='text-center'>No Cancelled transactions.</div>
                    ) : (
                        <>Loading...</>
                    )}
                  
                </div>
            </div>
          </TabsContent>
        </Tabs>
        {/* {transactions ? transactions.map((transaction)=>(
            <Link href={`/orders/${transaction?._id}`} key={transaction?._id} className="">
                {transaction?.orders.map((order)=>(
                    <div key={order?._id} className="bg-white border-2 border-gray-300 p-5 shadow-md rounded-md space-y-3">
                        <div className="flex justify-between">
                            <h1 className='text-text text-xs md:text-sm'>Order Id : {transaction._id}</h1>
                            <h1 className='text-text text-xs md:text-sm'>{transaction.status}</h1>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="flex items-center gap-x-3">
                                <Image  src={order?.url ? order.url : ''} alt='' width={400} height={400} className='object-contain size-10'/>
                                <h1 className='text-text text-xs md:text-sm'>{order?.menuName}</h1>
                                <h1 className='text-text text-xs md:text-sm'>x {order?.quantity}</h1>
                            
                            </div>
                            <div className="">
                                <div className="flex items-center gap-x-2">
                                    <CiLocationOn />
                                    <h1 className='text-text text-xs md:text-sm'>{transaction.shippingAddress?.address}</h1>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <CiPhone />
                                    <h1 className='text-text text-xs md:text-sm'>{transaction.shippingAddress?.phoneNumber}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <h1 className='text-text text-xs'>{formatDate({convexDate:transaction._creationTime})}</h1>
                        </div>
                    </div>
                     
                ))}
            </Link>
        )):(
            <div className="">

            </div>
        )} */}
    </div>
  )
}

export default Orders