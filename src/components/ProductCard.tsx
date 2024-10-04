
import React, { useState } from 'react'
import {
    Card,
    CardContent,
 
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { FaCheck, FaCrown, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa'

import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import { IoStarSharp } from 'react-icons/io5'
import { Star } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
 

function ProductCard({
    children,
    title,
    // goodFor,
    description,
    image,
    price,
    average,
    menuId,
    signature,
    recommend,
}:{
    children: React.ReactNode,
    title: string,
    // goodFor?: string;
    description?:string,
    image: string,
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
  const [quantity, setQuantity] = useState<number>(1) 


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

  const handleQuantity = (operation: "add"| "subtract")=>{
    if(quantity < 1 && operation=== 'subtract'){
      return
    }
    if(operation === 'add'){
      setQuantity(quantity + 1)
    }
    if(operation === 'subtract'){
      setQuantity(quantity - 1)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
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
                <CardTitle className='flex justify-center items-center text-lg md:text-xl font-semibold text-center min-h-14 mb-0'>{title}</CardTitle>
                <div className="flex justify-between items-center px-2">
                  <div className="flex items-center">
                    <h1 className='text-center text-text text-lg md:text-xl'>{average}/5</h1> 
                    <Star fill='yellow' color='yellow'/>
                  </div>
                  <h1 className='font-medium text-xl'>{formatPrice(price)}</h1>
                </div>
                
            </CardHeader>
            <CardFooter className='flex flex-col items-center'>
            </CardFooter>
            <Toaster/>
        </Card>
      </DialogTrigger>
      <DialogContent className='p-0 max-w-3xl  ' >
        <div className="relative overflow-auto max-h-[90vh] pb-20">
          <DialogHeader className='p-0 h-full'>
            <div className='p-0'>
             
                <Image 
                  src={image} 
                  alt={title}
                  width={1000}
                  height={1000}
                  className='object-cover w-full h-1/3 rounded-lg'
                />
            
              
              <div className="px-5">
                <h1 className='text-2xl mb-2'>{title}</h1>
                <h1>{formatPrice(price)}</h1>
              </div>
            </div>
            <DialogDescription>
              <h1>{description}</h1>
            </DialogDescription>
          </DialogHeader>
          <div className='fixed flex justify-between px-10 items-center bottom-0 bg-white border-t-2  border-t-black py-2 w-full'>
            <div className=' text-xs md:text-lg flex items-center gap-x-2'>
                <FaMinus 
                    onClick={()=>handleQuantity('subtract')}
                    className='px-1 md:px-2 border border-gray-200 text-sm size-7 cursor-pointer'
                />
                {quantity}
                <FaPlus
                    onClick={()=>handleQuantity('add')}
                    className='px-1 md:px-2 border border-gray-200 text-sm size-7 cursor-pointer'
                />
            </div>
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
          </div>
        </div>
       
      </DialogContent>
    </Dialog>
     
   
  )
}

export default ProductCard