'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import ProductCard from '@/components/ProductCard'
import { getAverage } from '@/lib/utils'
import Image from 'next/image'
import { SkeletonCard } from '@/components/SkeletonCard'
import { IoStarSharp } from "react-icons/io5";

function Recommendation() {
    const menus = useQuery(api.menus.allMenus)
    const recommendedMenus = menus?.filter(menu=> menu.recommended === true);
  return (
    <div className=''>
        <h1 className='text-3xl font-bold text-text text-center mb-5 flex gap-x-3'><IoStarSharp className='text-black'/>Chef&apos;s Recommendations <IoStarSharp className='text-black'/></h1>
        
            {recommendedMenus ?( 
                <div className="grid grid-cols-4 ">
                    {  recommendedMenus.map((menuItem)=>(
                        <ProductCard  
                            key={menuItem._id} 
                            title={menuItem.name} 
                            price={menuItem.price} 
                            average={getAverage({ ratings: menuItem.ratings })}>
                            
                            <Image src={menuItem.url ? menuItem.url : ""} alt={menuItem.name} height={100} width={100} className='h-40 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
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