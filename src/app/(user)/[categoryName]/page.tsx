'use client'
import Image from 'next/image'
import React from 'react'
import Logo from '@/../public/img/maristela-removebg1.png'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import CategoryTemplate from '../_components/CategoryTemplate'
import { MenuCategoryType } from '../../../../data/menu-data'
import Filters from '../_components/Filters'
import SearchAndMenu from '../_components/SearchAndMenu'
function CategoryPage({
    params
}:{
    params: {
        categoryName: MenuCategoryType
    }
}) {
    const allmenus = useQuery(api.menus.allMenus)
    const menus = allmenus?.filter(menu => menu.isArchived === false)
    const formattedCategoryName = params.categoryName.replace(/%20/g, ' ') .replace(/%26/g, '&'); 

  return (
    <div className='relative px-3 md:pt-16 sm:px-10 md:px-15 lg:px-24'>
      <SearchAndMenu/>
      <div className="relative w-full bg-none md:bg-gray-50">
        <h1 className='absolute w-full text-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl sm:text-xl md:text-2xl lg:text-4xl tracking-wider text-center mb-5'>Maristela&apos;s Restaurant Menu</h1>
        <Image src={Logo} alt='' className='size-48 mx-auto opacity-40'/>
      </div> 
      <Filters/>
      <CategoryTemplate menus={menus} categoryName={formattedCategoryName}/>
    </div>
  )
}

export default CategoryPage