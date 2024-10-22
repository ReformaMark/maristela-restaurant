
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
  
  } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { FaHeart, FaMinus, FaPlus } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Doc, Id } from '../../convex/_generated/dataModel'
import { toast, Toaster } from 'sonner'
import { usePathname, useRouter } from 'next/navigation'

import { formatDate, formatPrice } from '@/lib/utils'
import Image from 'next/image'
import ReactStars from 'react-stars'
import { motion } from 'framer-motion'
import { IoBagAddSharp } from 'react-icons/io5'
 
export type RatingWithUser = Doc<'ratings'> & {
  user: Doc<'users'> | null;
};

function ProductCard({
    children,
    title,
    // goodFor,
    description,
    image,
    price,
    menuId,

    ratings,
}:{
    children: React.ReactNode,
    title: string,
    // goodFor?: string;
    description?:string,
    image: string,
    price:number,
   
    menuId?: Id<"menus">,

    ratings: RatingWithUser[]

}) {

  const addToCartItem = useMutation(api.cartItems.addToCart);
  const addToFavorites = useMutation(api.favorites.addFavorites)
  const getFavorites = useQuery(api.favorites.getAllfavorites)
  const isExisting = getFavorites?.find(f => f?.menuId === menuId) 
  // const cartItems = useQuery(api.cartItems.getCartItems);
  const user = useQuery(api.users.current);
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1) 
  const sortedRatings = ratings.sort((a, b) => b._creationTime - a._creationTime);
  const pathname = usePathname()
  const handleAddToCart = async () => {
    toast.promise(
      addToCartItem({menuId, quantity}),
      {
        loading: 'Loading...',
        success: (data) => {
          return `${data?.name} has been added to the cart`;
        },
        error: 'Error adding item to cart',
      }
    );
  };

  // const isAlreadyAdded = () =>{
  //   const isExisting = cartItems?.find((item)=> item?.menu?._id === menuId)
  //   if(isExisting) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

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

  const handleAddToFavorites = async (menuId?: Id<'menus'>) =>{
    if(!menuId){

    } else {
      toast.promise(
        addToFavorites({menuId}),
        {
          loading: 'Loading...',
          success: (data) => {
            return `${data?.menu.name} has been added to your favorites`;
          },
          error: 'Error adding item to your favorites',
        }
      );
    }
  }

  return (
    <Dialog >
        <Card className='relative overflow-hidden shadow-none rounded-3xl bg-gwhite p-0 h-fit transition-all duration-500 ease-in'>
            <CardHeader className='border-b-2 border-gray-100 p-0 pb-2 md:space-y-5 shadow-none'>
              <CardContent className='p-0 relative shadow-none'>
                  {children}
              </CardContent>
                {/* <div className='flex justify-between px-2 items-center text-lg md:text-xl font-semibold text-center  mb-0'>
                  <h1 className='w-10/12 text-left text-sm md:text-lg font-semibold font-sans line-clamp-1'>{title}</h1>
                  <div className="flex items-center">
                    <h1 className=' text-text text-sm md:text-sm'>{average}/5</h1> 
                    <Star className='size-5' fill='yellow' color='yellow'/>
                  </div>
                  
                </div>
                <p className='text-xs text-text line-clamp-2 text-left px-3 min-h-10'>{description}</p>
                <div className="flex justify-between items-center px-2">
                  
                  <h1 className='font-thin text-sm'>for {formatPrice(price)}</h1>
                  { user ? isAlreadyAdded() ? (
                    <Button disabled onClick={handleAddToCart} variant={'outline'} className='rounded-full border border-text hover:border-primary text-text hover:text-primary font-semibold flex items-center '> 
                      <FaCheck className=''/>
                    </Button>
                    ) : (
                      <Button onClick={()=>{}} variant={'outline'} className='rounded-full  border border-text hover:border-primary text-text hover:text-primary font-semibold flex items-center '> 
                     <FaPlus />
                    </Button>
                  ) : (
                    <Button onClick={()=> router.push('/auth')} variant={'outline'} className='rounded-full  border border-text hover:border-primary text-text hover:text-primary font-semibold flex items-center '> 
                     <FaPlus />
                    </Button>
                  )}
                </div> */}
                 <motion.div 
                  className={`flex ${pathname === "/favorites" ? "justify-end" : "justify-between"} md:hidden  px-5 gap-x-3 items-center inset-0 `}>
                      <FaHeart onClick={()=> handleAddToFavorites(menuId)} className={`${pathname === '/favorites' ? "hidden": "block"} ${isExisting ? "hidden" : "block"} bg-white p-2 rounded-full size-10 hover:rotate-[360deg] hover:bg-yellow hover:text-white shadow-md transition-all duration-500 ease-linear`}/>
                      <DialogTrigger><IoBagAddSharp className='bg-white p-2 rounded-full size-10 hover:rotate-[360deg] hover:bg-yellow hover:text-white shadow-md transition-all duration-500 ease-linear'/></DialogTrigger>
                </motion.div>
                <div className="font-cairo space-y-3">
                  <h1 className='text-center text-xs md:text-lg'>{title}</h1>
                  <h1 className='text-sm md:text-lg text-center font-bold'>{formatPrice(price)}</h1>
                </div>
            </CardHeader>
            <Toaster/>
           
            <motion.div 
              initial={{opacity:0, y:30}}
              whileHover={{ opacity: 1, y:20 }}
              className="absolute hidden md:flex justify-between px-5 gap-x-3 items-center inset-0 w-full h-full ">
                  <div className={`${pathname === "/favorites" ? "hidden" : "block"} ${isExisting ? "hidden" : "block"}`}><FaHeart onClick={()=> handleAddToFavorites(menuId)} className='bg-white p-2 rounded-full size-10 hover:rotate-[360deg] hover:bg-yellow hover:text-white shadow-md transition-all duration-500 ease-linear'/></div>
                  <DialogTrigger><IoBagAddSharp className='bg-white p-2 rounded-full size-10 hover:rotate-[360deg] hover:bg-yellow hover:text-white shadow-md transition-all duration-500 ease-linear'/></DialogTrigger>
            </motion.div>
        </Card>
      
      <DialogContent className='p-0 max-w-3xl  ' >
        <div className="relative overflow-auto max-h-[90vh] pb-20">
          <div className='p-0 h-full overflow-auto'>
            <div className="h-1/2 ">
              <Image 
                src={image} 
                alt={title}
                width={1000}
                height={1000}
                className='object-cover w-full h-full rounded-lg'
              />
            </div>
            <div className="px-5">
              <h1 className='text-2xl mb-2'>{title}</h1>
              <h1>{formatPrice(price)}</h1>
              <p className='text-sm text-text'>{description}</p>
            </div>
            <h1 className='px-5 text-sm mb-3 mt-10'>Other people&apos;s review(s) - {ratings.length}</h1>
            <div className="grid grid-cols-2 px-5 gap-x-5 grid-rows-1 overflow-auto">
          {sortedRatings.length >= 1 ? sortedRatings.slice(0, 5).map((rating)=>(
            <div key={rating._id} className="border-b border-gray-100 py-2 px-5 bg-gray-100 shadow-md mb-1">
              <div className="flex gap-x-3 items-center">
                <div className="text-center">
                  <Avatar className='o outline-1 outline-black'>
                    <AvatarImage src="" />
                    <AvatarFallback>{rating.user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h1 className='text-text text-xs'>{rating.user?.name}</h1>
                </div>
                <div className="">
                  <ReactStars count={5} size={10} value={rating.stars} edit={false} half={true} />
                  <p className='text-[0.6rem] md:text-xs text-text line-clamp-3'>{rating.feedbackMessage}</p>
                </div>
              </div>
              <div className="ml-auto text-right mt-3">
                <h1 className='text-text text-[0.4rem] md:text-xs'>{formatDate({convexDate:rating._creationTime})}</h1>
              </div>
            </div>
          )):(
            <div className="my-5">
              <h1 className='text-text text-xs text-center'>No reviews.</h1>
            </div>
          )}
          </div>
          </div>
          
          <div className='fixed flex justify-between px-5 md:px-20 items-center bottom-0 bg-white border-t-2  border-t-gray-400 py-5 w-full'>
            <div className=' text-xs md:text-lg flex items-center gap-x-2'>
                <FaMinus 
                    onClick={()=>handleQuantity('subtract')}
                    className='px-1 md:px-2 rounded-full  border border-gray-200 text-sm size-7 cursor-pointer'
                />
                {quantity}
                <FaPlus
                    onClick={()=>handleQuantity('add')}
                    className='px-1 md:px-2 rounded-full border border-gray-200 text-sm size-7 cursor-pointer'
                />
            </div>
            { user ?  (
                <Button onClick={handleAddToCart} variant={'outline'} className=' w-2/3  hover:text-primary text-white bg-primary hover:scale-105 font-semibold flex items-center gap-x-3'> 
                Add to cart
              </Button>
            ) : (
              <Button onClick={()=> router.push('/auth')} variant={'outline'} className=' border-2 border-yellow hover:border-primary text-yellow hover:text-primary font-semibold flex items-center gap-x-3'> 
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