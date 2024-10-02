
import React from 'react'
import {
    Card,
    CardContent,
 
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from './ui/button'
import { FaCheck, FaShoppingBag } from 'react-icons/fa'

import Stars from '@/components/Stars' 
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { toast, Toaster } from 'sonner'
 

function ProductCard({
    children,
    title,
    goodFor,
    price,
    average,
    menuId,
}:{
    children: React.ReactNode,
    title: string,
    goodFor?: string;
    price:number,
    average: number,
    menuId?: Id<"menus">
}) {

  const addToCartItem = useMutation(api.cartItems.addToCart)
  const cartItems = useQuery(api.cartItems.getCartItems)

  const handleAddToCart = async () => {
    toast.promise(
      addToCartItem({menuId}),
      {
        loading: 'Loading...',
        success: (data) => {
          return `${data?.name}has been added to the cart`;
        },
        error: 'Error adding item to cart',
      }
    );
  };

  const isAlreadyAdded = () =>{
    const isExisting = cartItems?.find((item)=> item?.menu?._id === menuId)
    if(isExisting) {

      return true
    } else {
      return false
    }

  }
  
  return (
    
      <Card className='shadow-sm hover:shadow-lg rounded-3xl bg-gray-100 p-0 h-fit transition-all duration-500 ease-in'>
          <CardHeader className='border-b-2 border-gray-100 mb-3 p-0'>
            <CardContent className='p-0'>
                {children}
            </CardContent>
              <CardTitle className='text-xl font-medium text-center'>{title}</CardTitle>
              <h1 className='text-center text-sm'>{goodFor}</h1>
              <div className="flex justify-center items-center gap-x-3">
                <Stars edit={false} average={average}/>
              
              </div>
          </CardHeader>
          <CardFooter className='flex flex-col items-center'>
            <h1 className='font-semibold text-xl mb-3'>₱ {price}</h1>
            { isAlreadyAdded() ? (
              <Button disabled onClick={handleAddToCart} variant={'outline'} className=' border-2 border-yellow hover:border-primary text-yellow hover:text-primary font-semibold flex items-center gap-x-3'> 
                <FaCheck className=''/>
                Added to cart
              </Button>
              ) : (
                <Button onClick={handleAddToCart} variant={'outline'} className=' border-2 border-yellow hover:border-primary text-yellow hover:text-primary font-semibold flex items-center gap-x-3'> 
                <FaShoppingBag /> 
                Add to cart
              </Button>
            )}
          </CardFooter>
          <Toaster/>
      </Card>
   
  )
}

export default ProductCard