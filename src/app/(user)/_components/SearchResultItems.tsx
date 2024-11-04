'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { SkeletonCard } from '@/components/SkeletonCard'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
import Logo from '@/../public/img/maristela.jpg'
function SearchResultItems({
    searchValue
}:{
    searchValue: string
}) {
    const allmenus = useQuery(api.menus.allMenus)
    const searchItem = allmenus?.filter(menu => menu.isArchived === false)
  const filteredSearch = searchItem?.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))

  
  return (
    <div className="min-h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
        {filteredSearch ? filteredSearch.length >= 1 ? filteredSearch.map((menuItem) =>(
             <ProductCard  
                key={menuItem._id} 
                title={menuItem.name} 
                price={menuItem.price}
                image={menuItem.url ? menuItem.url : Logo}
                description={menuItem.description}
                menuId={menuItem._id}
                ratings={menuItem.ratings}
                >
                
                <Image priority src={menuItem.url ? menuItem.url : Logo} alt={menuItem.name} height={200} width={200} className='h-32 md:h-52 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
            </ProductCard>
           
        )) : (
            <div className="">
                No items Found!
            </div>
        ) : (
            <div className="c contents w-full">
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
            </div>
        )}
    </div>
  )
}

export default SearchResultItems