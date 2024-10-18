'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import ProductCard from '@/components/ProductCard'
import { getAverage } from '@/lib/utils'
import Image from 'next/image'
import { SkeletonCard } from '@/components/SkeletonCard'
import { IoStarSharp } from "react-icons/io5";

function Recommendation() {
    const menus = useQuery(api.menus.allMenus)
    const recommendedMenus = menus?.filter(menu=> menu.recommended === true && menu.special === false);
  return (
    <div className='shadow-md p-5'>
        <h1 className='text-2xl font-bold text-white text-center mb-5 flex items-center px-2 justify-around bg-black rounded-xl border-y-2 border-y-gray-100 py-3 gap-x-3'>
            <IoStarSharp className='text-white'/>
            Chef&apos;s Recommendations 
            <IoStarSharp className='text-white'/>
        </h1>
        
            {recommendedMenus ?( 
                <div className="grid grid-cols-2 md:grid-cols-4 ">
                    {  recommendedMenus.map((menuItem)=>(
                        <ProductCard  
                            key={menuItem._id} 
                            title={menuItem.name} 
                            price={menuItem.price} 
                            menuId={menuItem._id}
                            average={getAverage({ ratings: menuItem.ratings })}
                            image={menuItem.url ? menuItem.url : ""}
                            ratings={menuItem.ratings}
                            >
                            
                            <Image src={menuItem.url ? menuItem.url : ""} alt={menuItem.name} height={200} width={200} className='h-32 md:h-52 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
                        </ProductCard>
                    ))}
                </div>
            ):(
                <div className="grid grid-cols-4 gap-x-3 ">
                    <SkeletonCard/>
                    <SkeletonCard/>
                    <SkeletonCard/>
                    <SkeletonCard/>
               
                </div>
            )}
       
    </div>
  )
}

export default Recommendation