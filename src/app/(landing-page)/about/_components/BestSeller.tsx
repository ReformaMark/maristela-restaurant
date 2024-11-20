'use client'
import ProductCard from '@/components/ProductCard'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {motion} from 'framer-motion'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import Logo from '@/../public/img/maristela.jpg'

function BestSeller() {
  const menus = useQuery(api.menus.allMenus)
  const crispyPata = menus?.find(menu=> menu.name === 'Crispy Pata');
  const babyBackRibs = menus?.find(menu=> menu.name === 'Baby Back Ribs');
  const crispyKareKare = menus?.find(menu=> menu.name === 'Crispy Kare Kare');
  return (
    <div className='px-24 py-10 h-screen '>
      <div className="flex justify-center items-center gap-x-10">
        <Star className='size-16'/>
        <h1 className='text-center font-sans font-bold text-5xl tracking-widest flex'>Our Bestsellers </h1>
        <Star className='size-16'/>
      </div>
      <div className="border-2 p-5 grid grid-cols-3 gap-5 rounded-xl border-primary mt-5 shadow-xl">
        {crispyPata && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{opacity: 1, x: 0}}
            transition={{
              duration: 0.9,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            key={crispyPata._id}  
            className=""
          >
            <ProductCard ratings={crispyPata.ratings} image={crispyPata.url ? crispyPata.url : Logo}  title={crispyPata.name} price={crispyPata.price} >
              <Image priority src={crispyPata.url ? crispyPata.url : Logo} width={500} height={500} alt={crispyPata.name} className='object-cover h-44 w-full bg-yellow rounded-3xl hover:scale-105 transition-all duration-500 ease-in'/>
            </ProductCard>
          </motion.div>
         
        )}
        {babyBackRibs && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{opacity: 1, x: 0}}
            transition={{
              duration: 0.9,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            key={babyBackRibs._id}  
            className=""
          >
            <ProductCard ratings={babyBackRibs.ratings} image={babyBackRibs.url ? babyBackRibs.url : Logo}  title={babyBackRibs.name} price={babyBackRibs.price} >
              <Image priority src={babyBackRibs.url ? babyBackRibs.url : Logo} width={500} height={500} alt={babyBackRibs.name} className='object-cover h-44 w-full bg-yellow rounded-3xl hover:scale-105 transition-all duration-500 ease-in'/>
            </ProductCard>
          </motion.div>
         
        )}
        {crispyKareKare && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{opacity: 1, x: 0}}
            transition={{
              duration: 0.9,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            key={crispyKareKare._id}  
            className=""
          >
            <ProductCard ratings={crispyKareKare.ratings} image={crispyKareKare.url ? crispyKareKare.url : Logo}  title={crispyKareKare.name} price={crispyKareKare.price} >
              <Image priority src={crispyKareKare.url ? crispyKareKare.url : Logo} width={500} height={500} alt={crispyKareKare.name} className='object-cover h-44 w-full bg-yellow rounded-3xl hover:scale-105 transition-all duration-500 ease-in'/>
            </ProductCard>
          </motion.div>
         
        )}
      </div>
    </div>
  )
}

export default BestSeller