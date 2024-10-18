'use client'
import React from 'react'
import { api } from "../../../../convex/_generated/api";
import { useQuery } from 'convex/react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getAverage } from '@/lib/utils';
import { SkeletonCard } from '@/components/SkeletonCard';
import { FaCrown } from 'react-icons/fa';
import { motion } from 'framer-motion'

function Special() {
    const menus = useQuery(api.menus.allMenus)
    const specialMenus =  menus?.filter(menu=> menu.special === true);
  return (
    <div className='shadow-md p-2 md:p-5 w-full'>
       
       <h1 className='text-2xl font-bold text-white text-center mb-5 flex items-center justify-around bg-black rounded-xl border-y-2 border-y-gray-100 py-3 gap-x-3'>
            <FaCrown className='text-white size-5 md:size-5 lg:size-10'/>
            Signature Dishes
            <FaCrown className='text-white size-5 md:size-5 lg:size-10'/>
        </h1>
        {specialMenus ? (
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
                viewport={{once: true}}
                className="grid grid-cols-2 md:grid-cols-3 gap-x-3 justify-center">
                {specialMenus?.map((menuItem)=>(
                    <ProductCard  
                        key={menuItem._id} 
                        title={menuItem.name} 
                        price={menuItem.price} 
                        menuId={menuItem._id}
                        ratings={menuItem.ratings}
                        average={getAverage({ ratings: menuItem.ratings })}
                        image={menuItem.url ? menuItem.url : ""}
                    >
                    
                        <Image src={menuItem.url ? menuItem.url : ""} alt={menuItem.name} height={400} width={400} className='h-32 md:h-52 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
                    </ProductCard>
                ))}
            </motion.div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 ">
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
            
            </div>
        )}
    </div>
  )
}

export default Special