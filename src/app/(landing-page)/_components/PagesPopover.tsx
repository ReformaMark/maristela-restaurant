'use client'

import { HoverPopover } from '@/components/ui/popover'
import Link from 'next/link'

import { PiCaretDown } from 'react-icons/pi'

function PagesPopover() {

  return (
    <HoverPopover 
    className='px-0'
    content={
    <div className='flex flex-col'>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Cart</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Checkout</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Testimonial</Link>
        <Link href={''} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>404 not found</Link>
    </div>
    }>
        <h1  className='hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear flex items-center'>
            Pages 
            <PiCaretDown className='ml-1' />
        </h1>
        
    </HoverPopover>
  )
}

export default PagesPopover