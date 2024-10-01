
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

import Stars from '@/components/Stars' 
 

function ProductCard({
    children,
    title,
    goodFor,
    price,
    average,
}:{
    children: React.ReactNode,
    title: string,
    goodFor?: string;
    price:number,
    average: number,
    
}) {
  return (
    
      <Card className='shadow-sm hover:shadow-lg rounded-3xl bg-gray-100 p-0 h-fit transition-all duration-500 ease-in'>
          <CardHeader className='border-b-2 border-gray-100 mb-3 p-0'>
            <CardContent className='p-0'>
                {children}
            </CardContent>
              <CardTitle className='text-xl font-medium text-center'>{title}</CardTitle>
              <h1 className='text-center text-sm'>{goodFor}</h1>
              <div className="flex justify-center items-center gap-x-3">
                <Stars edit={false} average={average}/>
              
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