'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import ProductCard from '@/components/ProductCard'
import Logo from '@/../public/img/maristela.jpg'
import Image from 'next/image'

export default function PersonalizedRecommendation() {
    const personalizedRecommendation = useQuery(api.menus.personalizedRecommendation)
  return (
    <div>
        <h1 className="font-cairo font-extrabold text-2xl text-gray-800">Popular Picks for You</h1>
        <p className="text-gray-600 mt-2">
            Explore selections inspired by your recent choices, featuring the best flavors and refreshing experiences our guests enjoy!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
        {personalizedRecommendation && personalizedRecommendation?.length > 0 ? personalizedRecommendation.map((rec) => (
            <div className='contents' key={rec?.[0]?._id} >
                {rec?.map((item)=>(
                    <ProductCard  
                        key={item?._id} 
                        title={item?.name || ''} 
                        price={item?.price|| 0}
                        image={item?.url ? item.url : Logo}
                        description={item?.description}
                        menuId={item?._id}
                        ratings={item? item.ratings : []}
                        >
                        <Image priority src={item?.url ? item.url : Logo} alt={item?.name || ''} height={200} width={200} className='h-32 md:h-52 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
                        <h1 className='absolute top-0 left-0 text-[0.5rem] md:text-xs text-left px-3 mt-3 font-bold text-white bg-green-500 py-1 rounded-r-md'>Best Sellers in <span className='text-primary'>{item.category}</span></h1>
                    </ProductCard>
                ))}
            </div>
        )): (
            <></>
        )}
        </div>
    </div>
  )
}