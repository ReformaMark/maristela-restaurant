import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from './ui/button'



function ProductCard({
    children,
    title,
    description,
    price
}:{
    children: React.ReactNode,
    title: string,
    description: string,
    price:number
    
}) {
  return (
    <Card className='shadow-sm'>
        <CardHeader className='border-b-2 border-gray-100 mb-3'>
          <CardContent>
              {children}
          </CardContent>
            <CardTitle>{title}</CardTitle>
            <CardDescription className='line-clamp-4'>{description}</CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-between'>
          <h1 className='font-semibold '>₱ {price}</h1>
          <Button variant={'default'} className='bg-yellow text-white'>Add to cart</Button>
        </CardFooter>
    </Card>
  )
}

export default ProductCard