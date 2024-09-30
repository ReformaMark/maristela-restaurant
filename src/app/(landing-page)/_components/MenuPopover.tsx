'use client'

import { HoverPopover } from '@/components/ui/popover'
import Link from 'next/link'

import { PiCaretDown } from 'react-icons/pi'

function MenuPopover() {

  return (
    <HoverPopover 
    className='px-0'
    content={
    <div className='flex flex-col'>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Chicken</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Pork</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Family Meals</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Pancit & Pasta</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Extras</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Beverages</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Sizzling Plate</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Super Silog Meals</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Seafood</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Veggies</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Special</Link>
    </div>
    }>
        <h1  className='hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear flex items-center'>
            Menu 
            <PiCaretDown className='ml-1' />
        </h1>
        
    </HoverPopover>
  )
}

export default MenuPopover