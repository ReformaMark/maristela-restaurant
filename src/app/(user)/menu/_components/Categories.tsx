'use client'
import { useQuery } from 'convex/react'
import Link from 'next/link'
import React from 'react'
import { api } from '../../../../../convex/_generated/api'

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
    <div className=''>
        <h1 className='text-primary text-xl font-semibold px-3'>Categories</h1>
        <div className="py-3 ">
            <ul>
                <Link href={'/'} className="flex justify-between items-center px-6 py-1 hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <li>Pork</li>
                    <h1>({numberOfPork()})</h1>
                </Link>
                <Link href={'/'} className="flex justify-between items-center px-6 py-1 hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <li>Chicken</li>
                    <h1>({numberOfChicken()})</h1>
                </Link>
                <Link href={'/'} className="flex justify-between items-center px-6 py-1 hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <li>Pancit & Pasta</li>
                    <h1>({numberOfPP()})</h1>
                </Link>
                <Link href={'/'} className="flex justify-between items-center px-6 py-1 hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <li>Extras</li>
                    <h1>({numberOfExtras()})</h1>
                </Link>
                <Link href={'/'} className="flex justify-between items-center px-6 py-1 hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <li>Beverages</li>
                    <h1>({numberOfBeverages()})</h1>
                </Link>
                <Link href={'/'} className="flex justify-between items-center px-6 py-1 hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <li>Sizzling Plate</li>
                    <h1>({numberOfSP()})</h1>
                </Link>
                <Link href={'/'} className="flex justify-between items-center px-6 py-1 hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <li>Super Silog Meals</li>
                    <h1>({numberOfSSM()})</h1>
                </Link>
                <Link href={'/'} className="flex justify-between items-center px-6 py-1 hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <li>Seafood</li>
                    <h1>({numberOfSeafood()})</h1>
                </Link>
                <Link href={'/'} className="flex justify-between items-center px-6 py-1 hover:text-primary text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                    <li>Veggies</li>
                    <h1>({numberOfVeggies()})</h1>
                </Link>
                
            </ul>
        </div>
    </div>
  )
}

export default Categories