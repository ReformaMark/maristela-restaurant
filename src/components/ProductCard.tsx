
import React from 'react'
import {
    Card,
    CardContent,
 
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from './ui/button'
import { FaShoppingBag } from 'react-icons/fa'
import { StarIcon } from 'lucide-react'
 

function ProductCard({
    children,
    title,
   
    price
}:{
    children: React.ReactNode,
    title: string,
   
    price:number
    
}) {
  return (
    
      <Card className='shadow-sm rounded-3xl bg-gray-100 p-0 h-fit transition-all duration-500 ease-in'>
          <CardHeader className='border-b-2 border-gray-100 mb-3 p-0'>
            <CardContent className='p-0'>
                {children}
            </CardContent>
              <CardTitle className='text-xl font-medium text-center'>{title}</CardTitle>
              <div className="flex justify-center items-center gap-x-3">
                <StarIcon fill='red'/>
                <StarIcon fill='red'/>
                <StarIcon fill='red'/>
                <StarIcon fill='red'/>
                <StarIcon fill='red'/>
              </div>
          </CardHeader>
          <CardFooter className='flex flex-col items-center'>
            <h1 className='font-semibold text-xl mb-3'>₱ {price}</h1>
            <Button variant={'outline'} className=' border-2 border-yellow hover:border-primary text-yellow hover:text-primary font-semibold flex items-center gap-x-3'> <FaShoppingBag /> Add to cart</Button>
          </CardFooter>
      </Card>
   
  )
}

export default ProductCard