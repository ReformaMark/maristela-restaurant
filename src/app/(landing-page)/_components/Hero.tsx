import Image from 'next/image'
import React from 'react'
import HeroBg from '../../../../public/img/hero-img.jpg'
import Logo from '@/../public/img/maristela-removebg1.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <div className="relative flex bg-hero-img bg-cover bg-center h-screen">
      <div className="size-full ">
        <Image 
          src={HeroBg} 
          alt='' 
          className='objecct-cover size-full' />
      </div>
      <div className="absolute inset-0 size-full  flex items-center px-24 ">
        <motion.div 
         initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{opacity: 1, y: 0}}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      
        className="w-1/2">
          <h4 className='text-yellow font-bold mb-2 text-xl '>Legacy that will satisfy!</h4>
          <h1 className='text-6xl text-primary font-bold'>Home for the best crispy pata in town</h1>
          <Link href={'/menu'} className=''>
            <Button variant={'destructive'} className='mt-10 rouded-2xl py-2 px-5 bg-yellow text-xl tracking-wider font-semibold uppercase'>Order now!</Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{opacity: 1, y: 0}}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
       
          className="w-1/2 p-32 pr-0 flex justify-center items-start"
          >        
          <Image 
            src={Logo} 
            alt='Maristela Restaurant Logo' 
            className='size-full object-cover'/>
        </motion.div>
        
      </div>
    </div>
  )
}

export default Hero