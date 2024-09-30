import React from 'react'
import { MdOutlineRestaurantMenu, MdTakeoutDining } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { TbCalendarTime } from "react-icons/tb";
import Image from 'next/image';
import Restaurant from '@/../public/img/restaurant.jpg'

function Services() {
  return (
    <div className='h-fit bg-primary text-white px-24 py-10'>
        <h1 className='lg:text-5xl tracking-widest font-bold'>Services</h1>
        <div className="grid grid-cols-2 gap-x-10 flex-row-reverse items-center border-2 border-white rounded-xl p-5">
            <div className="">
                <p className='text-lg text-justify self-start'>Welcome to Maristela&apos;s Restaurant! We proudly offer a range of services to enhance your dining experience. Enjoy our delicious catering options for your special events, ensuring your guests savor every bite. For a seamless visit, we recommend making a reservation, especially during peak times. Don’t forget to check out our special promotions, where you can enjoy exclusive deals and themed nights. Join us for an unforgettable culinary experience!</p>
                <Image src={Restaurant} alt="" className="w-full h-44 object-cover rounded-lg mt-5"/>
            </div>
            <div className="">  
                <div className="">        
                    <div className='flex items-center gap-x-3 text-white rounded-full'> 
                        <FaBowlFood className='size-14'/>
                        <h1 className='text-lg font-semibold text-yellow'>Dine-In</h1>
                    </div>
                    <p className='text-sm font-light pl-20'>- You can enjoy meals in a comfortable restaurant setting, often with table service.</p>
                </div> 
                <div className=""> 
                    <div className='flex  items-center gap-x-3 text-white rounded-full'>
                        <MdTakeoutDining className='size-14'/>
                        <h1 className='text-lg font-semibold text-yellow'>Takeout/To-Go</h1>
                    
                    </div>    
                    <p className='text-sm font-light pl-20'>- You can order food to take home, often with packaging for easy transport.</p>      
                </div>
                <div className="">
                    <div className='flex  items-center  gap-x-3 text-white rounded-full'>
                        <MdDeliveryDining className='size-14'/>
                        <h1 className='text-lg font-semibold text-yellow'>Delivery</h1>                    
                    </div>
                    <p className='text-sm font-light pl-20'>- Enjoy our delicious dishes delivered right to your door for a convenient dining experience.</p>
                </div>
                <div className="">
                    <div className='flex items-center gap-x-3 text-white rounded-full'>
                        <TbCalendarTime className='size-14'/>
                        <h1 className='text-lg font-semibold text-yellow'>Reservation</h1>
                    </div>
                    <p className='text-sm font-light pl-20'>- Ensure a seamless visit by making a reservation, especially during peak hours.</p>
                </div>
                <div className="">
                    <div className='flex items-center gap-x-3 text-white rounded-full'>
                        <MdOutlineRestaurantMenu className='size-14'/>
                        <h1 className='text-lg font-semibold text-yellow'>Catering</h1>
                    </div>
                    <p className='text-sm font-light pl-20'>- Let us cater your events with a customized menu that delights your guests.</p>
                </div>
        
            </div>
        </div>
       
       
    </div>
  )
}

export default Services