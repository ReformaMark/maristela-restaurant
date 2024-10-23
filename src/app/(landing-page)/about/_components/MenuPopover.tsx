'use client'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GiHamburgerMenu } from "react-icons/gi";

function MenuPopover() {

  return (
    <Accordion type="single" collapsible className=''>
    <AccordionItem value="item-1 relative">
      <AccordionTrigger className='text-white bg-primary font-bold px-10 font-cairo text-lg py-2'>
        <GiHamburgerMenu /> All menu
      </AccordionTrigger>
      <AccordionContent className='border-gray-200 border border-t-0 py-3 left-0 w-full bg-white z-50'>
        <div className='flex flex-col space-y-3 w-full'>
          <Link href={'/Chicken'} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Chicken</Link>
          <Link href={'/Pork'} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Pork</Link>
          <Link href={'/Pancit & Pasta'} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Pancit & Pasta</Link>
          <Link href={'/Extras'} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Extras</Link>
          <Link href={'/Beverages'} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Beverages</Link>
          <Link href={'/Sizzling Plate'} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Sizzling Plate</Link>
          <Link href={'/Super Silog Meals'} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Super Silog Meals</Link>
          <Link href={'/Seafood'} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Seafood</Link>
          <Link href={'/Veggies'} className='hover:text-primary px-3 py-1 min-w-40 hover:bg-yellow w-full'>Veggies</Link>
        </div>
      </AccordionContent>

    </AccordionItem>
  </Accordion>
  
  )
}

export default MenuPopover