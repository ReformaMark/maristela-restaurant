'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

function OrderPlacePage() {
    const router = useRouter()
  return (
    <div className='h-[80vh] w-dvw flex flex-col justify-center items-center space-y-10'>
        <div className="bg-green-600 rounded-full p-5 flex justify-center items-center size-20">
            <FaCheck className='text-white size-10'/>
        </div>
        <div className="">
            <h1 className='text-2xl font-extrabold font-serif'>Thank You For Ordering!</h1>

            <div className="flex justify-between items-center mt-5">
                <Button variant={'outline'} onClick={()=> router.push('/')} className='uppercase font-medium bg-white text-black text-sm'>Order Again</Button>
                <Button variant={'default'} onClick={()=> router.push('/orders')} className='uppercase font-medium text-sm'>View my orders</Button>
          
            </div>
        </div>
    </div>
  )
}

export default OrderPlacePage