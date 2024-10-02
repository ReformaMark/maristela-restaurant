'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { toast, Toaster } from 'sonner'
import QtyBtn from './QtyBtn'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function CartItems() {
    const cartartItems = useQuery(api.cartItems.getCartItems)
    const router = useRouter()

    //calculate the total price of an item
    function calcTotal(quantity?:number,price?:number){
        return quantity && price ? quantity * price : 0
    }

    //calculate the total price of all the items in the cart
    const subTotal = cartartItems && cartartItems.reduce((accumulator, item) => {
        return accumulator + (item?.price || 0) ;
    }, 0);
  return (
    <div className='px-48 text-text'>
        <h1 className='text-primary font-bold text-xl mb-5 text-center uppercase'>Shopping Cart</h1>
        <h1 className='text-text text-xs mb-2'>You have {cartartItems?.length} item(s) in your order.</h1>
        <div className="border-gray-200 border-2 text-text shadow-sm font-thin text-lg  grid grid-cols-12">
            <h1 className='c col-span-5 pl-10 border-r-2 border-gray-100'>Name</h1>
            <h1 className='c col-span-2 pl-10 border-r-2 border-gray-100'>Price</h1>
            <h1 className='c col-span-2 pl-10 border-r-2 border-gray-100'>QTY.</h1>
            <h1 className='c col-span-2 pl-10 border-r-2 border-gray-100'>Total</h1>
            <h1 className='c col-span-1'></h1>
        </div>
        <div className="min-h-[60vh] max-h-[60vh] overflow-y-scroll border-x-2 border-gray-200">
        {cartartItems ? cartartItems.map((item)=>(
            <div key={item?._id} className="grid shadow-sm grid-cols-12 items-center w-full h-fit pl-5 border-b-2 border-b-gray-200  py-2">
                <div className="flex items-center gap-x-2 col-span-5">
                    <Image src={item?.url ? item.url : ""} width={100} height={100} alt={item?.name || ''} className='s size-20 p-2 shadow-md'/>
                    <div className="">
                        <h1>{item?.name}</h1>
                    </div>
                </div>
               
                <h1  className='c col-span-2 pl-5'>₱ {item?.price?.toFixed(2)}</h1>
                <QtyBtn quantity={item?.quantity}/>
                <h1  className='c col-span-2 pl-5'>₱ {calcTotal(item?.quantity,item?.price).toFixed(2)}</h1>
                <IoClose  className='c col-span-1 hover:text-primary transition-colors duration-300 ease-in-out cursor-pointer ml-5' onClick={() => toast.error(`${item?.name} was removed from your cart!`)}/>
                <Toaster richColors/>
            </div>
        )):(
            <></>
        )}
        </div>
        <div className="w-full px-10 py-5 border-2 border-gray-200">
            <h1 className='text-right text-black font-medium uppercase'>Subtotal  -  ₱ {subTotal?.toFixed(2)}</h1>
            <div className="flex justify-between items-center mt-5">
                <Button variant={'outline'} onClick={()=> router.back()} className='uppercase font-medium bg-white text-black text-sm'>Continue shopping</Button>
                <Button variant={'default'} className='uppercase font-medium text-sm'>Checkout</Button>
            </div>
        </div>
    </div>
  )
}

export default CartItems