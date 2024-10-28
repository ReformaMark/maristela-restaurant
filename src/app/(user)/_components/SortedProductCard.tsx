'use client'
import { useMutation, useQuery } from 'convex/react';
import React, { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import Image from 'next/image';
import { formatDate, formatPrice, getAverage } from '@/lib/utils';
import {motion} from 'framer-motion';
import { FaHeart, FaMinus, FaPlus } from 'react-icons/fa';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Id } from '../../../../convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { RatingWithUser } from '@/components/ProductCard';
import ReactStars from 'react-stars';
import { Star } from 'lucide-react';
import { IoBagAddSharp } from 'react-icons/io5';

function SortedProductCard({
    latest,
    topRated,
    topReviews
}:{
    latest?:boolean,
    topRated?:boolean,
    topReviews?:boolean
}) {
    const allmenus = useQuery(api.menus.allMenus);
    const menus = allmenus?.filter(menu => menu.isArchived === false)
    const addToCartItem = useMutation(api.cartItems.addToCart);
    const addToFavorites = useMutation(api.favorites.addFavorites)
    const getFavorites = useQuery(api.favorites.getAllfavorites)
    const user = useQuery(api.users.current);
    const router = useRouter();
    const [quantity, setQuantity] = useState<number>(1) 
    const sortedProducts =  () =>{
        if(latest){
            const latest =  menus?.sort((a, b) => b._creationTime - a._creationTime).slice(0, 3);
              return latest
        } else if(topRated){
            const topRatedProduct = menus?.sort((a, b) =>  getAverage({ratings: b.ratings })  - getAverage({ratings: a.ratings })).slice(0, 3);
              return topRatedProduct
        } else {
            const highestReviews = menus?.sort((a, b) => b.ratings.length - a.ratings.length).slice(0, 3);
              return highestReviews
        }
    }
    const isExisting = (menuId: Id<'menus'>) =>{
       const exist =  getFavorites?.find(f => f?.menuId === menuId)

       return exist
    }

    const sortedRatings = (ratings: RatingWithUser[]) =>{
        const sortedRatings = ratings.sort((a, b) => b._creationTime - a._creationTime);
        return sortedRatings
    }
  const handleAddToCart = async (menuId: Id<'menus'>) => {
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

  const handleAddToFavorites = async (menuId: Id<'menus'>) =>{
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
  
    <div className='font-cairo w-full '>
        {latest && (
            <h1 className='text-2xl font-extrabold'>Latest Products</h1>
        )}
        {topRated && (
            <h1 className='text-2xl font-extrabold'>Rated Products</h1>
        )}
        {topReviews && (
            <h1 className='text-2xl font-extrabold'>Review Products</h1>
        )}
        <div className="space-y-5 mt-10">
        {sortedProducts() ? sortedProducts()?.map((product)=>(
            <div key={product._id} className="relative flex gap-x-5 pr-3 justify-between md:justify-start items-center">
                <div className="flex gap-x-5  items-center">
                  <Image src={product.url || ""} alt={product.name} width={300} height={300} className='size-20 object-contain'/>
                  <div className="">
                      <h1 className='text-lg'>{product.name}</h1>
                      <h1 className='text-lg font-bold'>{formatPrice(product.price)}</h1>
                      {latest && (
                          <h1 className='text-xs text-gray-500'>{formatDate({convexDate: product._creationTime})}</h1>
                      )}
                      {topRated && (
                          <h1 className='text-xs text-gray-500 flex items-center'>Ratings : {getAverage({ratings:product.ratings})} <Star color='yellow' fill='yellow' size={14}/></h1>
                      )}
                      {topReviews && (
                          <h1 className='text-xs text-gray-500'>Reviews : {product.ratings.length}</h1>
                      )}
                  </div>
                </div>
                <motion.div 
                    
                    className="flex md:hidden flex-col gap-2 "
                >
                  <FaHeart onClick={()=>handleAddToFavorites(product._id)} className={`${isExisting(product._id) ? "hidden": "block"} bg-white p-2 rounded-full size-7 hover:rotate-[360deg] hover:bg-yellow hover:text-white shadow-md transition-all duration-500 ease-linear`}/>
                  <Dialog >
                  <DialogTrigger><IoBagAddSharp className='bg-white p-2 rounded-full size-7 hover:rotate-[360deg] hover:bg-yellow hover:text-white shadow-md transition-all duration-500 ease-linear'/></DialogTrigger>
                  <DialogContent className='p-0 max-w-3xl  ' >
                        <div className="relative overflow-auto max-h-[90vh] pb-20">
                        <div className='p-0 h-full overflow-auto'>
                            <div className="h-1/2 ">
                            <Image 
                                src={product.url || ''} 
                                alt={product.name}
                                width={1000}
                                height={1000}
                                className='object-cover w-full h-full rounded-lg'
                            />
                            </div>
                            <div className="px-5">
                            <h1 className='text-2xl mb-2'>{product.name}</h1>
                            <h1>{formatPrice(product.price)}</h1>
                            <p className='text-sm text-text'>{product.description}</p>
                            </div>
                            <h1 className='px-5 text-sm mb-3 mt-10'>Other people&apos;s review(s) - {product.ratings.length}</h1>
                            <div className="grid grid-cols-2 grid-rows-1 overflow-auto gap-x-5 px-5">
                        {sortedRatings(product.ratings).length >= 1 ? sortedRatings(product.ratings)?.slice(0, 5).map((rating)=>(
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
                                <Button onClick={()=> handleAddToCart(product._id)} variant={'outline'} className=' w-2/3  hover:text-primary text-white bg-primary hover:scale-105 font-semibold flex items-center gap-x-3'> 
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
                </motion.div>
                <motion.div 
                    initial={{opacity:0, x:-30}}
                    whileHover={{ opacity: 1, x:-20 }}
                    className="hidden md:absolute md:flex flex-col gap-2 md:justify-end md:items-end md:top-0 md:right-0 size-full"
                >
                  <FaHeart onClick={()=>handleAddToFavorites(product._id)} className={`${isExisting(product._id) ? "hidden": "block"} bg-white p-2 rounded-full size-7 hover:rotate-[360deg] hover:bg-yellow hover:text-white shadow-md transition-all duration-500 ease-linear`}/>
                  <Dialog >
                  <DialogTrigger><IoBagAddSharp className='bg-white p-2 rounded-full size-7 hover:rotate-[360deg] hover:bg-yellow hover:text-white shadow-md transition-all duration-500 ease-linear'/></DialogTrigger>
                  <DialogContent className='p-0 max-w-3xl  ' >
                        <div className="relative overflow-auto max-h-[90vh] pb-20">
                        <div className='p-0 h-full overflow-auto'>
                            <div className="h-1/2 ">
                            <Image 
                                src={product.url || ''} 
                                alt={product.name}
                                width={1000}
                                height={1000}
                                className='object-cover w-full h-full rounded-lg'
                            />
                            </div>
                            <div className="px-5">
                            <h1 className='text-2xl mb-2'>{product.name}</h1>
                            <h1>{formatPrice(product.price)}</h1>
                            <p className='text-sm text-text'>{product.description}</p>
                            </div>
                            <h1 className='px-5 text-sm mb-3 mt-10'>Other people&apos;s review(s) - {product.ratings.length}</h1>
                            <div className="grid grid-cols-2 grid-rows-1 overflow-auto gap-x-5 px-5">
                        {sortedRatings(product.ratings).length >= 1 ? sortedRatings(product.ratings)?.slice(0, 5).map((rating)=>(
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
                                <Button onClick={()=> handleAddToCart(product._id)} variant={'outline'} className=' w-2/3  hover:text-primary text-white bg-primary hover:scale-105 font-semibold flex items-center gap-x-3'> 
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
                </motion.div>
            </div>
        )):(
            <></>
        )}
        </div>
        
    </div>
   
  )
}

export default SortedProductCard