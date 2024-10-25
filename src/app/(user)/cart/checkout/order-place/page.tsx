'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion'

function OrderPlacePage() {
    const router = useRouter()
  return (
    <motion.div
    className='h-[80vh] w-full flex flex-col justify-center items-center space-y-10'
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
>
    <motion.div
        className="bg-green-600 rounded-full p-5 flex justify-center items-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1.1 }}
        transition={{
            type: "spring",
            stiffness: 120,
            damping: 8,
            duration: 0.5
        }}
        whileHover={{ scale: 1.2 }}
    >
        <FaCheck className='text-white text-5xl' />
    </motion.div>
    
    <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
    >
        <h1 className='text-2xl font-extrabold font-serif'>Thank You For Ordering!</h1>
    </motion.div>

    <motion.div
        className="flex justify-between items-center mt-5 space-x-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
    >
        <Button
            variant={'outline'}
            onClick={() => router.push('/')}
            className='uppercase font-medium bg-white text-black text-sm hover:scale-110 transition-all duration-300 ease-in'
           
        >
            Order Again
        </Button>
        <Button
            variant={'default'}
            onClick={() => router.push('/orders')}
            className='uppercase font-medium text-sm hover:scale-110 transition-all duration-300 ease-in'
            
        >
            View my orders
        </Button>
    </motion.div>
</motion.div>
  )
}

export default OrderPlacePage