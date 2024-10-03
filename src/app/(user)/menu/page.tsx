import React from 'react'
import Special from './_components/Special'
import Filters from './_components/Filters'
import Recommendation from './_components/Recommendation'
import Menus from './_components/Menus'
import Image from 'next/image'
import Logo from '@/../public/img/maristela-removebg1.png'
function MenuPage() {
  return (
    <div className='pt-32 px-24'>
      <div className="relative w-full bg-gray-50">
        <h1 className='absolute text-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-4xl tracking-wider text-center mb-5'>Maristela&apos;s Restaurant Menu</h1>
        <Image src={Logo} alt='' className='size-48 mx-auto opacity-40'/>
      </div>
      <div className="">
        
        <Filters/>
        <div className="pb-10 mt-10">
          <Special/>
        </div>
        <Menus/>
      </div>
     
    </div>
  )
}

export default MenuPage