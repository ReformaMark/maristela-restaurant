import React from 'react'
import Menus from '../_components/Menus'
import SearchAndMenu from '../_components/SearchAndMenu'
import Image from 'next/image'
import Logo from '@/../public/img/maristela-removebg1.png'

function Menu() {
  return (
    <div className='relative px-3 md:pt-16 sm:px-10 md:px-15 lg:px-24'>
        <SearchAndMenu/>
        <div className="relative w-full bg-none md:bg-gray-50">
            <h1 className='absolute w-full text-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl sm:text-xl md:text-2xl lg:text-4xl tracking-wider text-center mb-5'>Maristela&apos;s Restaurant Menu</h1>
            <Image src={Logo} alt='' className='size-48 mx-auto opacity-40'/>
        </div> 
        <Menus/>
    </div>
  )
}

export default Menu