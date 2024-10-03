'use client'
import { useQuery } from 'convex/react'
import Link from 'next/link'
import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import Image from 'next/image'
import Pasta from '@/../public/img/CANTON_BIHON-removebg-preview.png'
import Silog from '@/../public/img/CHICKSILOG-removebg-preview.png'
import Pork from '@/../public/img/CRISPY_PATA-removebg-preview.png'
import Chicken from '@/../public/img/HOMESTYLE_CHICKEN-removebg-preview.png'
import Beverages from '@/../public/img/ICED_TEA-removebg-preview.png'
import Extra from '@/../public/img/JAVA_RICE_PLATTER-removebg-preview.png'
import Desserts from '@/../public/img/LECHE_FLAN-removebg-preview.png'
import Vegggies from '@/../public/img/PINAKBET-removebg-preview.png'
import Seafood from '@/../public/img/SINIGANG_NA_MAYA_MAYA-removebg-preview.png'
import SizzlingPlate from '@/../public/img/SIZZLING_TANIGUE-removebg-preview.png'

function Categories() {
    const menus = useQuery(api.menus.allMenus);

    const numberOfPork = ()=>{
        return menus?.filter((menu)=> menu.category === 'Pork').length
    }
    const numberOfChicken = ()=>{
        return menus?.filter((menu)=> menu.category === 'Chicken').length
    }
    const numberOfPP = ()=>{
        return menus?.filter((menu)=> menu.category === 'Pancit & Pasta').length
    }
    const numberOfExtras = ()=>{
        return menus?.filter((menu)=> menu.category === 'Extras').length
    }
    const numberOfBeverages = ()=>{
        return menus?.filter((menu)=> menu.category === 'Beverages').length
    }
    const numberOfSP = ()=>{
        return menus?.filter((menu)=> menu.category === 'Sizzling Plate').length
    }
    const numberOfSSM= ()=>{
        return menus?.filter((menu)=> menu.category === 'Super Silog Meals').length
    }
    const numberOfSeafood = ()=>{
        return menus?.filter((menu)=> menu.category === 'Seafood').length
    }
    const numberOfVeggies = ()=>{
        return menus?.filter((menu)=> menu.category === 'Veggies').length
    }
  return (
    <div className='drop-shadow-md'>
        <h1 className='text-primary text-xl font-semibold px-3'>Categories</h1>
        <div className="pb-3 ">
            <ul className='grid grid-cols-9 gap-x-3'>
                <Link href={'/'} className=" hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <Image src={Pork} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Pork</li>
                        <h1>({numberOfPork()})</h1>
                    </div>
                </Link>
                <Link href={'/'} className=" hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <Image src={Chicken} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Chicken</li>
                        <h1>({numberOfChicken()})</h1>
                    </div>
                </Link>
                <Link href={'/'} className=" hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <Image src={Pasta} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Pancit & Pasta</li>
                        <h1>({numberOfPP()})</h1>
                    </div>
                </Link>
                <Link href={'/'} className=" hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <Image src={Extra} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Extras</li>
                        <h1>({numberOfExtras()})</h1>
                    </div>
                </Link>
                <Link href={'/'} className=" hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <Image src={Beverages} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Beverages</li>
                        <h1>({numberOfBeverages()})</h1>
                    </div>
                </Link>
                <Link href={'/'} className=" hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <Image src={SizzlingPlate} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Sizzling Plate</li>
                        <h1>({numberOfSP()})</h1>
                    </div>
                </Link>
                <Link href={'/'} className=" hover:text-primary  text-text text-lg font-medium transition-all duration-400 ease-in-out">
                    <Image src={Silog} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Silog Meals</li> 
                        <h1>({numberOfSSM()})</h1>
                    </div>
                </Link>
                <Link href={'/'} className=" hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <Image src={Seafood} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Seafood</li>
                        <h1>({numberOfSeafood()})</h1>
                    </div>
                </Link>
                <Link href={'/'} className=" hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <Image src={Vegggies} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Veggies</li>
                        <h1>({numberOfVeggies()})</h1>
                    </div>
                </Link>
                <Link href={'/'} className=" hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <Image src={Desserts} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Desserts</li>
                        <h1>({numberOfVeggies()})</h1>
                    </div>
                </Link>
                <Link href={'/'} className=" hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <Image src={Vegggies} alt='Pork' width={200} height={200} className='s size-32 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                    <div className="flex justify-center gap-x-1 items-center mt-[-30px] text-xs">
                        <li>Family Meals</li>
                        <h1>({numberOfVeggies()})</h1>
                    </div>
                </Link>
                
            </ul>
        </div>
    </div>
  )
}

export default Categories