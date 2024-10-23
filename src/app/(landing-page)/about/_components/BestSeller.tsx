'use client'
import ProductCard from '@/components/ProductCard'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {motion} from 'framer-motion'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

function BestSeller() {
  const menus = useQuery(api.menus.allMenus)
  const signature = menus?.filter((menu)=> menu.special === true )
  return (
    <div className='px-24 py-10 h-screen '>
      <div className="flex justify-center items-center gap-x-10">
        <Star className='size-16'/>
        <h1 className='text-center font-sans font-bold text-5xl tracking-widest flex'>Our Bestsellers </h1>
        <Star className='size-16'/>
      </div>
      <div className="border-2 p-5 grid grid-cols-3 gap-5 rounded-xl border-primary mt-5 shadow-xl">
        {signature && signature.map(menu=> (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{opacity: 1, x: 0}}
            transition={{
              duration: 0.9,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            key={menu._id}  
            className=""
          >
            <ProductCard ratings={menu.ratings} image={menu.url ? menu.url : ""}  title={menu.name} price={menu.price} >
              <Image src={menu.url ? menu.url : ""} alt={menu.name} className='object-cover h-44 w-full bg-yellow rounded-3xl hover:scale-105 transition-all duration-500 ease-in'/>
            </ProductCard>
          </motion.div>
         
        ))}
      </div>
    </div>
  )
}

export default BestSeller