
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
import { FaCheck, FaCrown, FaMinus, FaPlus } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Doc, Id } from '../../convex/_generated/dataModel'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import { IoStarSharp } from 'react-icons/io5'
import { Star } from 'lucide-react'
import { formatDate, formatPrice } from '@/lib/utils'
import Image from 'next/image'
import ReactStars from 'react-stars'
 
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
    average,
    menuId,
    signature,
    recommend,
    ratings,
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
    ratings: RatingWithUser[]

}) {

  const addToCartItem = useMutation(api.cartItems.addToCart);
  const cartItems = useQuery(api.cartItems.getCartItems);
  const user = useQuery(api.users.current);
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1) 
  const sortedRatings = ratings.sort((a, b) => b._creationTime - a._creationTime);

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
            <CardHeader className='border-b-2 border-gray-100 p-0 pb-2'>
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
                <div className='flex justify-between px-2 items-center text-lg md:text-xl font-semibold text-center  mb-0'>
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
                </div>
            </CardHeader>
            <Toaster/>
        </Card>
      </DialogTrigger>
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
            <h1 className='px-5 text-sm mb-3 mt-10'>Ratings</h1>
          {sortedRatings.length >= 1 ? sortedRatings.slice(0, 5).map((rating)=>(
            <div key={rating._id} className="flex gap-x-3 items-center border-b border-gray-100 py-2 px-5 bg-gray-100 shadow-md mb-1">
              <div className="text-center">
                <Avatar className='o outline-1 outline-black'>
                  <AvatarImage src="" />
                  <AvatarFallback>{rating.user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h1 className='text-text text-xs'>{rating.user?.name}</h1>
              </div>
              <div className="">
                <ReactStars count={5} size={20} value={rating.stars} edit={false} half={true} />
                <p className='text-xs text-text'>{rating.feedbackMessage}</p>
              </div>
              <div className="ml-auto">
                <h1 className='text-text text-[0.6rem]'>{formatDate({convexDate:rating._creationTime})}</h1>
              </div>
            </div>
          )):(
            <div className="my-5">
              <h1 className='text-text text-xs text-center'>No reviews.</h1>
            </div>
          )}
          
          </div>
          
          <div className='fixed flex justify-between px-20 items-center bottom-0 bg-white border-t-2  border-t-black py-5 w-full'>
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