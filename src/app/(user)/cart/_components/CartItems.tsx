'use client'
import { useMutation, useQuery } from 'convex/react'
import React, { useState } from 'react'
import { api } from '../../../../../convex/_generated/api'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { toast } from 'sonner'
import QtyBtn from './QtyBtn'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import { FaBasketShopping } from 'react-icons/fa6'
import Logo from '@/../public/img/maristela.jpg'
import { Id } from '../../../../../convex/_generated/dataModel'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,

  } from "@/components/ui/dialog"

function CartItems() {
    const cartItmes = useQuery(api.cartItems.getCartItems)
    const removeItem = useMutation(api.cartItems.deleteCartItems)
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [removing, setRemoving] = useState<boolean>(false)
 
    //calculate the total price of an item
    function calcTotal(quantity?:number,price?:number){
        return quantity && price ? quantity * price : 0
    }

    //calculate the total price of all the items in the cart
    const subTotal = cartItmes && cartItmes.reduce((accumulator, item) => {
        return accumulator + ((item?.menu?.price||0) * (item?.quantity || 0)) ;
    }, 0);

    const handleRemoveToCart = (cartItemId:Id<'cartItems'> | undefined, menuName: string | undefined) =>{
        try {
            if(cartItemId){
                setRemoving(true)
                toast.promise(removeItem({cartItemsId: cartItemId}),{
                 
                    loading: 'Removing...',
                    success: () => {
                        return `${menuName} has been removed to your basket`;
                    },
                    error: 'Error removing item to your basket',
                
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsOpen(false)
            setRemoving(false)
        }
    }
  return (
    <div className='px- sm:px-20 md:px-32 lg:px-48 text-text'>
        <h1 className='text-primary font-bold text-xl mb-5 text-center uppercase'>Order Basket</h1>
        <h1 className='text-text text-[0.5rem] md:text-sm mb-2'>You have {cartItmes?.length} item(s) in your order.</h1>
        <div className="border-gray-200 border-2 text-text shadow-sm font-thin text-xs md:text-lg py-1 grid grid-cols-12">
            <h1 className='c col-span-5 pl-3 md:pl-10 border-r-2 border-gray-100'>Name</h1>
            <h1 className='c col-span-2 pl-3 md:pl-10 border-r-2 border-gray-100'>Price</h1>
            <h1 className='c col-span-2 pl-3 md:pl-10 border-r-2 border-gray-100'>QTY.</h1>
            <h1 className='c col-span-2 pl-3 md:pl-10 border-r-2 border-gray-100'>Total</h1>
            <h1 className='c col-span-1'></h1>
        </div>
        <div className="min-h-[60vh] max-h-[60vh] overflow-y-scroll border-x-2 border-gray-200">
        {cartItmes ? cartItmes.length >= 1 ? cartItmes.map((item)=>(
            <div key={item?._id} className="grid shadow-sm grid-cols-12 items-center w-full h-fit pl-1 md:pl-5 border-b-2 border-b-gray-200  py-2">
                <div className="flex items-center gap-x-2 col-span-5">
                    <Image priority src={item?.url ? item.url : Logo} width={100} height={100} alt={item?.menu?.name || ''} className='size-12 md:size-20 p-1 md:p-2 shadow-md'/>
                    <div className="text-[0.5rem] md:text-lg">
                        <h1 className=''>{item?.menu?.name}</h1>
                    </div>
                </div>
                <h1  className='col-span-2 text-xs md:text-lg pl-1 md:pl-5'>{formatPrice(item?.menu?.price || 0)}</h1>
                <QtyBtn cartItemId={item?._id} quantity={item?.quantity}/>
                <h1  className='col-span-2 text-xs md:text-lg pl-3 md:pl-5'>{formatPrice(calcTotal(item?.quantity,item?.menu?.price))}</h1>
                
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <IoClose onClick={()=>setIsOpen(true)} className='col-span-1 hover:text-primary transition-colors duration-300 ease-in-out cursor-pointer ml-2 md:ml-5'/>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove {item?.menu?.name}?</DialogTitle>
                        <DialogDescription>
                        Are you sure you want to remove this item from your cart? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setIsOpen(false)} // Set your close dialog function here
                        >
                        Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            onClick={()=>handleRemoveToCart(item?._id, item?.menu?.name)} // Set your remove item function here
                            disabled={removing}
                        >
                        Remove
                        </button>
                    </div>
                    </DialogContent>
                </Dialog>
            </div>
        )):(
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
            <FaBasketShopping className="text-gray-400 text-6xl" />
            <h2 className="text-xl font-semibold text-gray-700">Your order basket is empty</h2>
            <p className="text-gray-500">It seems you haven&apos;t added any delicious items to your basket yet!</p>
            <Button
                onClick={() => router.push('/menu')}
                className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors"
            >
               Order Now
            </Button>
            </div>
        ) : (
           <></>
        )}
        </div>
        <div className="w-full px-2 md:px-10 py-5 border-2 border-gray-200">
            <h1 className='text-right text-black font-medium uppercase'>Subtotal  -  {formatPrice(subTotal || 0)}</h1>
            <div className="flex justify-between items-center mt-5">
                <Button variant={'outline'} onClick={()=> router.push('/')} className='uppercase font-medium bg-white text-black text-sm'>Return to Menu</Button>
                <Button disabled={cartItmes && cartItmes?.length >= 1 ? false : true} variant={'default'} onClick={()=> router.push('/cart/checkout')} className='uppercase font-medium text-sm'>Checkout</Button>
            </div>
        </div>
    </div>
  )
}

export default CartItems