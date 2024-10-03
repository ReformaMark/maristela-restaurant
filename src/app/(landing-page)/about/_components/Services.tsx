import React from 'react'
import { MdOutlineRestaurantMenu, MdTakeoutDining } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { TbCalendarTime } from "react-icons/tb";
import Image from 'next/image';
import Restaurant from '@/../public/img/restaurant.jpg'
import {motion} from 'framer-motion'
function Services() {
  return (
    <div className='h-fit bg-primary text-white px-24 py-10'>
        <h1 className='lg:text-5xl tracking-widest font-bold'>Services</h1>
        <div className="grid grid-cols-2 gap-x-10 flex-row-reverse items-center border-2 border-white rounded-xl p-5">
            <div className="">
                <motion.p 
                     initial={{ x: 100, opacity: 0 }}
                     whileInView={{opacity: 1, x: 0}}
                     transition={{
                         duration: 0.9,
                         ease: [0.4, 0.0, 0.2, 1],
                     }}
                    className='text-lg text-justify self-start'
                >
                    Welcome to Maristela&apos;s Restaurant! We proudly offer a range of services to enhance your dining experience. Enjoy our delicious catering options for your special events, ensuring your guests savor every bite. For a seamless visit, we recommend making a reservation, especially during peak times. Don’t forget to check out our special promotions, where you can enjoy exclusive deals and themed nights. Join us for an unforgettable culinary experience!
                </motion.p>
                <Image src={Restaurant} alt="" className="w-full h-44 object-cover rounded-lg mt-5"/>
            </div>
            <div className="">  
                <div className="">        
                    <div className='flex items-center gap-x-3 text-white rounded-full'> 
                        <FaBowlFood className='size-14'/>
                        <motion.h1 
                            initial={{opacity: 0,x: -50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5,ease: [0.4, 0.0, 0.2, 1]}}
                            className='text-lg font-semibold text-yellow'
                        >
                            Dine-In
                        </motion.h1>
                    </div>
                    <motion.p 
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{
                            delay: 0.2,
                            duration: 0.9,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className='text-sm font-light pl-20'>
                            - You can enjoy meals in a comfortable restaurant setting, often with table service.
                    </motion.p>
                </div> 
                <div className=""> 
                    <div className='flex  items-center gap-x-3 text-white rounded-full'>
                        <MdTakeoutDining className='size-14'/>
                        <motion.h1 
                            initial={{opacity: 0,x: -50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5,ease: [0.4, 0.0, 0.2, 1]}}
                            className='text-lg font-semibold text-yellow'
                        >
                            Takeout/To-Go
                        </motion.h1>
                    
                    </div>    
                    <motion.p 
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{
                            delay: 0.4,
                            duration: 0.9,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className='text-sm font-light pl-20'
                    >
                        - You can order food to take home, often with packaging for easy transport.
                    </motion.p>      
                </div>
                <div className="">
                    <div className='flex  items-center  gap-x-3 text-white rounded-full'>
                        <MdDeliveryDining className='size-14'/>
                        <motion.h1 
                            initial={{opacity: 0,x: -50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5,ease: [0.4, 0.0, 0.2, 1]}}
                            className='text-lg font-semibold text-yellow'
                        >
                            Delivery
                        </motion.h1>                    
                    </div>
                    <motion.p 
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{opacity: 1, x: 0}}
                      transition={{
                          delay: 0.6,
                          duration: 0.9,
                          ease: [0.4, 0.0, 0.2, 1],
                      }}                 
                        className='text-sm font-light pl-20'
                    >
                        - Enjoy our delicious dishes delivered right to your door for a convenient dining experience.
                    </motion.p>
                </div>
                <div className="">
                    <div className='flex items-center gap-x-3 text-white rounded-full'>
                        <TbCalendarTime className='size-14'/>
                        <motion.h1 
                            initial={{opacity: 0,x: -50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5,ease: [0.4, 0.0, 0.2, 1]}}
                            className='text-lg font-semibold text-yellow'
                        >
                            Reservation
                        </motion.h1>
                    </div>
                    <motion.p 
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{
                            delay: 0.8,
                            duration: 0.9,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className='text-sm font-light pl-20'
                    >- Ensure a seamless visit by making a reservation, especially during peak hours.
                    </motion.p>
                </div>
                <div className="">
                    <div className='flex items-center gap-x-3 text-white rounded-full'>
                        <MdOutlineRestaurantMenu className='size-14'/>
                        <motion.h1 
                            initial={{opacity: 0,x: -50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5,ease: [0.4, 0.0, 0.2, 1]}}
                            className='text-lg font-semibold text-yellow'
                        >
                            Catering
                        </motion.h1>
                    </div>
                    <motion.p 
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{
                            delay: 1,
                            duration: 0.9,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className='text-sm font-light pl-20'
                    >
                        - Let us cater your events with a customized menu that delights your guests.
                    </motion.p>
                </div>
        
            </div>
        </div>
       
       
    </div>
  )
}

export default Services