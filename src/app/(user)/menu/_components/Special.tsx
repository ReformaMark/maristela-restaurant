'use client'
import React from 'react'
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from 'convex/react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getAverage } from '@/lib/utils';

function Special() {
    const menus = useQuery(api.menus.allMenus)

  
  return (
    <div className=''>
        <h1 className='text-3xl font-bold text-yellow text-center mb-5'>Our Special Menus</h1>
        <div className="grid grid-cols-3 ">
            {menus ? menus?.map((menuItem)=>(
                <ProductCard  
                    key={menuItem._id} 
                    title={menuItem.name} 
                    price={menuItem.price} 
                    menuId={menuItem._id}
                    average={getAverage({ ratings: menuItem.ratings })}>
                
                    <Image src={menuItem.url ? menuItem.url : ""} alt={menuItem.name} height={100} width={100} className='h-40 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
                </ProductCard>
            )) : (
                <h1>Loading ...</h1>
            )}
        </div>
    </div>
  )
}

export default Special