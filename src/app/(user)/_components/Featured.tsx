'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
import { SkeletonCard } from '@/components/SkeletonCard'
import { motion } from 'framer-motion'
import Logo from '@/../public/img/maristela.jpg'
function Featured() {
    const allmenus = useQuery(api.menus.allMenus)
    const menus = allmenus?.filter(menu => menu.isArchived === false)
    const recommendedMenus = menus?.filter(menu=> menu.recommended === true || menu.special === true);
  return (
    <div className='p-2 md:p-5'>
        
            {recommendedMenus ?( 
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
               className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 justify-center">
                    {  recommendedMenus.map((menuItem)=>(
                        <ProductCard  
                            key={menuItem._id} 
                            title={menuItem.name} 
                            price={menuItem.price} 
                            menuId={menuItem._id}
                            image={menuItem.url ? menuItem.url : Logo}
                            ratings={menuItem.ratings}
                            >
                            
                            <Image priority src={menuItem.url ? menuItem.url : Logo} alt={menuItem.name} height={200} width={200} className='h-32 md:h-52 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
                        </ProductCard>
                    ))}
                </motion.div>
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

export default Featured