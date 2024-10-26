
'use client'
import { Id } from '../../../../../convex/_generated/dataModel'
import {  useMutation, useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Logo from '@/../public/img/maristela.jpg'
import Image from 'next/image'
import { formatDate, formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import RatingStars from '@/components/Stars'
import { statusIcons, StatusType } from '../_components/Orders'

function TransactionPage({
    params
}:{
    params: {
        orderId: Id<'transactions'>
    }
}) {
    
    const transaction = useQuery(api.transactions.getTransaction, {transactionid: params.orderId})
    const cancel = useMutation(api.transactions.cancelTransaction)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const Status = transaction?.status
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

    const handleCancel = () =>{
        if(!transaction){
            return null
        }
        toast.promise(cancel({transactionId: transaction._id}), {
            loading: 'Cancelling your order...',
            success: "Order cancelled successfully!",
            error: 'Error occurred while cancellingg your order.',
        })
       router.replace('/orders')
    }

  return (
    <div className='px-1 sm:px-10 md:px-15 lg:px-24 min-h-screen'>
        <div className="flex gap-x-3 items-center">
            <ArrowLeft onClick={()=> router.back()} className='border-yellow border-2 text-yellow p-1 rounded-full cursor-pointer size-8'/>
            <h1 className=' text-text font-semibold'>Order Status</h1>
        </div>
        <div className="flex w-full justify-between mt-5">
            <h1 className='text-[0.5rem] md:text-xs text-text'>Order Id: {transaction?._id}</h1>
            <Dialog>
                <DialogTrigger className='text-[0.5rem] md:text-sm text-yellow font-semibold'>View Reciept</DialogTrigger>
                <DialogContent className='max-w-3xl pt-10 max-h-screen overflow-auto text-xs md:text-lg'>
                    <DialogHeader >
                    <DialogTitle>Reciept</DialogTitle>
                    <div className='flex justify-between items-center border-yellow border-2 rounded-lg p-5 '>
                        <div className="flex items-center gap-x-5">
                            <Image src={Logo} alt='Logo' className=' size-16 object-cover'/>
                            <div className="">
                                <h1 className='hidden md:block text-primary font-bold text-xl font-parisienne'>Maristela&apos;s Restaurant</h1>
                                <h1 className='text-[0.5rem]'>sombrereriadesandoval@gmail.com</h1>
                            </div>
                        </div>
                        <div className="">
                            <h1>Concepcion Alitagtag, </h1>
                            <h1>Batangas, Philippines </h1>
                            <h1>0920 623 8834</h1>
                        </div>
                    </div>
                    <DialogDescription>
                       <div className="flex justify-between p-5 bg-gray-100 rounded-lg">
                        <div className="text-left text-xs md:text-lg">
                            <h1 className='font-semibold text-[0.5rem]'>Shipping information</h1>
                            <h1>{transaction?.shippingAddress?.firstname} {transaction?.shippingAddress?.lastName}</h1>
                            <h1>{transaction?.shippingAddress?.phoneNumber}</h1>
                            <h1>{transaction?.shippingAddress?.address}</h1>
                        </div>
                        <div className="text-right text-xs md:text-sm">
                            <h1 className='font-semibold'>Order Id: {transaction?._id}</h1>
                            <h1>{formatDate({convexDate: transaction? transaction._creationTime : 0})}</h1>
                            <h1>{transaction?.mop}</h1>
                        </div>
                       </div>
                       <div className="w-full space-y-2">
                        <div className="grid grid-cols-12 w-full py-2 border-b border-b-black">
                            <h1 className='col-span-6'>Product</h1>
                            <h1 className='col-span-2'>Price</h1>
                            <h1 className='col-span-2'>Quantity</h1>
                            <h1 className='col-span-2 text-right'>Total</h1>
                        </div>
                        {transaction?.orders.map((order)=>(
                            <div key={order._id}  className="grid grid-cols-12 w-full items-center py-3 border-b border-b-gray-100">
                                 <div className='col-span-6 flex gap-x-4 items-center'>
                                    <Image src={order ? order.url !== null ? order.url : "" : ""} alt='Image' width={200} height={200} className='size-10 object-contain'/>
                                    <h1>{order.menuName}</h1>
                                 </div>
                                <h1 className='col-span-2'>{formatPrice(order.menu? order.menu.price : 0)}</h1>
                                <h1 className='col-span-2'>{order.quantity}</h1>
                                <h1 className='col-span-2 text-right'>{formatPrice(order.totalPrice)}</h1>
                            </div>
                        ))}
                       </div>
                    </DialogDescription>
                    <div className='flex flex-col font-semibold'>
                        <div className='flex w-full justify-between'>
                            <h1>Subtotal</h1>
                            <h1>{formatPrice(computeCost(transaction?.orders))}</h1>
                        </div>
                        <div className='flex w-full justify-between'>
                            <h1>Shipping Fee</h1>
                            <h1>{formatPrice(80)}</h1>
                        </div>
                        <div className='flex w-full justify-between'>
                            <h1>Amount Due</h1>
                            <h1>{formatPrice(computeCost(transaction?.orders) + 80)}</h1>
                        </div>
                        <div className='flex w-full justify-between'>
                            <h1 className='text-lg'>Total</h1>
                            <h1 className='text-lg'>{formatPrice(computeCost(transaction?.orders) + 80)}</h1>
                        </div>
                    </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
        <div className="bg-white p-3 md:p-10 rounded-lg shadow-md">
            <div className="flex items-center justify-evenly gap-3 md:gap-6"> {/* Adjusted gap for better spacing */}
                {(['Pending', 'Confirmed', 'Out for Delivery', 'Completed', 'Cancelled'] as StatusType[]).map((status) => (
                    <div key={status} className="flex flex-col justify-center items-center">
                        <div className={`flex justify-center items-center bg-${Status === status ? "primary" : "gray-300"} ${Status === status ? "text-white" : "text-black"} size-10 md:size-20 rounded-full transition duration-300`}>
                            {statusIcons[status]}
                        </div>
                        <div className={`${Status === status ? "text-primary" : "text-gray-700"} text-xs md:text-sm mt-1`}>
                            {status}
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="w-full space-y-2">
                    {/* Header */}
                    <div className="grid grid-cols-12 w-full py-2 text-lg text-gray-700 border-b border-b-gray-300">
                        <h1 className='col-span-6 font-semibold'>Product</h1>
                        <h1 className='col-span-2 font-semibold'>Price</h1>
                        <h1 className='col-span-2 font-semibold'>Quantity</h1>
                        <h1 className='col-span-2 font-semibold text-right'>Total</h1>
                    </div>
                    {/* Order List */}
                    <div className="min-h-[50vh]">
                        {transaction?.orders.map((order) => (
                            <div key={order._id} className="py-3 text-sm border-b border-b-gray-100">
                                <div className="grid grid-cols-12 w-full items-center">
                                    <div className='col-span-6 flex gap-x-4 items-center'>
                                        <Image src={order.url || ''} alt='Image' width={200} height={200} className='size-10 object-contain rounded-md shadow-sm' />
                                        <h1 className="text-gray-800">{order.menuName}</h1>
                                    </div>
                                    <h1 className='col-span-2'>{formatPrice(order.menu?.price || 0)}</h1>
                                    <h1 className='col-span-2'>{order.quantity}</h1>
                                    <h1 className='col-span-2 text-right'>{formatPrice(order.totalPrice)}</h1>
                                </div>
                                {transaction.status === 'Completed' && (
                                    <div className="flex items-center gap-x-1 mt-2">
                                        <h1 className='text-gray-600 text-sm'>Rate this product:</h1>
                                        <RatingStars edit={true} size={30} menuId={order.menuId} transactionId={transaction._id} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Section */}
                <div className='flex flex-col font-semibold mt-4'>
                    <div className='flex w-full justify-between'>
                        <h1 className='text-gray-700'>Shipping Fee</h1>
                        <h1>{formatPrice(80)}</h1>
                    </div>
                    <div className='flex w-full justify-between'>
                        <h1 className='text-lg text-gray-800'>Total</h1>
                        <h1 className='text-lg text-gray-800'>{formatPrice(computeCost(transaction?.orders) + 80)}</h1>
                    </div>
                    {transaction && transaction.status === "Pending" && (
                        <div className="flex flex-col md:items-end md:justify-end mt-5">
                            <Dialog open={isOpen}>
                                <DialogTrigger>
                                    <Button variant={'destructive'} onClick={() => setIsOpen(true)}>Cancel Order</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Cancel Order?</DialogTitle>
                                        <DialogDescription>
                                            Once canceled, your order will not be processed or delivered. Please note that if your order is already confirmed, cancellation might not be possible.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant={'ghost'} onClick={() => setIsOpen(false)} className='w-full md:w-1/4'>No</Button>
                                        <Button variant={'destructive'} onClick={handleCancel} className='w-full md:w-1/4'>Yes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <h1 className='text-gray-600 text-xs text-right'>* You will not be able to cancel once the order is being confirmed.</h1>
                        </div>
                    )}
                </div>
            </div>

            
        </div>
    </div>
  )
}

export default TransactionPage