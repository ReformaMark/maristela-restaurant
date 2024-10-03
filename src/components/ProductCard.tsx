
import React from 'react'
import {
    Card,
    CardContent,
 
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from './ui/button'
import { FaCheck, FaCrown, FaShoppingBag } from 'react-icons/fa'

import Stars from '@/components/Stars' 
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import { IoStarSharp } from 'react-icons/io5'
 

function ProductCard({
    children,
    title,
    goodFor,
    price,
    average,
    menuId,
    signature,
    recommend
}:{
    children: React.ReactNode,
    title: string,
    goodFor?: string;
    price:number,
    average: number,
    menuId?: Id<"menus">,
    signature?: boolean,
    recommend?: boolean,

}) {

  const addToCartItem = useMutation(api.cartItems.addToCart);
  const cartItems = useQuery(api.cartItems.getCartItems);
  const user = useQuery(api.users.current);
  const router = useRouter();


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
            <CardContent className='p-0 relative'>
                {children}
                {signature === true && (
                  <div className=' bg-transparent absolute top-3 right-2'>
                     <FaCrown className='text-white size-5'/>
                  </div>
                )}
                {recommend === true && (
                  <div className=' bg-transparent absolute top-3 right-2'>
                      <IoStarSharp className='text-white size-5'/>
                  </div>
                )}
            </CardContent>
              <CardTitle className='text-xl font-medium text-center'>{title}</CardTitle>
              <h1 className='text-center text-sm'>{goodFor}</h1>
              <div className="flex justify-center items-center gap-x-3">
                <Stars edit={false} average={average}/>
              
              </div>
          </CardHeader>
          <CardFooter className='flex flex-col items-center'>
            <h1 className='font-semibold text-xl mb-3'>₱ {price}</h1>
            { user ? isAlreadyAdded() ? (
              <Button disabled onClick={handleAddToCart} variant={'outline'} className=' border-2 border-yellow hover:border-primary text-yellow hover:text-primary font-semibold flex items-center gap-x-3'> 
                <FaCheck className=''/>
                Added to cart
              </Button>
              ) : (
                <Button onClick={handleAddToCart} variant={'outline'} className=' border-2 border-yellow hover:border-primary text-yellow hover:text-primary font-semibold flex items-center gap-x-3'> 
                <FaShoppingBag /> 
                Add to cart
              </Button>
            ) : (
              <Button onClick={()=> router.push('/auth')} variant={'outline'} className=' border-2 border-yellow hover:border-primary text-yellow hover:text-primary font-semibold flex items-center gap-x-3'> 
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