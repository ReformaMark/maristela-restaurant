'use client'
import React from 'react'
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from 'convex/react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getAverage } from '@/lib/utils';
import { SkeletonCard } from '@/components/SkeletonCard';
import { FaCrown } from 'react-icons/fa';
import { motion } from 'framer-motion'

function Special() {
    const menus = useQuery(api.menus.allMenus)

  
  return (
    <div className=''>
        <h1 className='text-3xl font-bold text-yellow text-center mb-5 flex items-center justify-center gap-x-3'><FaCrown className='text-black'/>Special <FaCrown className='text-black'/></h1>
        
            {menus ? (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }} 
                    className="grid grid-cols-3 gap-x-3">
                    {menus?.map((menuItem)=>(
                        <ProductCard  
                            key={menuItem._id} 
                            title={menuItem.name} 
                            price={menuItem.price} 
                            menuId={menuItem._id}
                            average={getAverage({ ratings: menuItem.ratings })}>
                        
                            <Image src={menuItem.url ? menuItem.url : ""} alt={menuItem.name} height={100} width={100} className='h-40 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
                        </ProductCard>
                    ))}
                </motion.div>
            ) : (
                <div className="grid grid-cols-3 gap-x-3 ">
                    <SkeletonCard/>
                    <SkeletonCard/>
                    <SkeletonCard/>
               
                </div>
            )}
            
           
       
    </div>
  )
}

export default Special