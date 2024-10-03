import Image from 'next/image'
import React from 'react'
import Pata from '@/../public/img/pata.png'
import {motion} from 'framer-motion'
function Subhero() {
  return (
    <div className='h-[50vh] px-24 py-10 flex overflow-hidden'>
        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           whileInView={{opacity: 1, x: 0}}
           transition={{
             duration: 0.9,
             ease: [0.4, 0.0, 0.2, 1],
           }}
          className="flex flex-col item-center text-center w-1/2"
        >
            <Image src={Pata} alt='Pata' className='object-contain size-64'/>
           
        </motion.div>
        <div className="">
            <motion.h1 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{opacity: 1, x: 0}}
              transition={{
                duration: 0.9,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className='text-4xl text-text font-bold'>
                Maristela&apos;s Crispy Pata
              </motion.h1>
            <motion.p
               initial={{ x: 100, opacity: 0 }}
               whileInView={{opacity: 1, x: 0}}
               transition={{
                 duration: 0.9,
                 ease: [0.4, 0.0, 0.2, 1],
               }}
              className='text-text text-lg text-center my-5'
            >
              The well known Maristela&apos;s Crispy Pata was the curation of Bernabe Sandoval; maristela&apos;s grandfather. After years of trial and error, experimentation and ingredient hunting, he found the perfect recipe.
            </motion.p>
            <motion.p 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{opacity: 1, x: 0}}
                transition={{
                  duration: 0.9,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className='text-text text-lg text-center'>
                Enjoy the crispy cutside and the tender meat that seperates from the bone. With every dip in the sauce. Maristela&apos;s Crispy Pata is irrisistable.
              </motion.p>
        </div>
    </div>
  )
}

export default Subhero