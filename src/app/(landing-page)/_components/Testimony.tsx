import Image from 'next/image'
import React from 'react'

import Testimonial from '@/../public/img/testimonial-1.jpg'
import { Star, StarHalf } from 'lucide-react'

function Testimony() {
  return (
    <div className='h-dvh py-10 px-24'>
        <h1 className='text-primary font-semibold text-lg text-center'>Our testimonial</h1>
        <h1 className='text-gray-600 font-extrabold text-5xl text-center tracking-wider'>Our Client Saying!</h1>
        <div className="mt-10 grid grid-cols-2 gap-x-10">
            <div className="bg-gray-100 rounded-xl p-5">
                <div className="border-b-2 border-b-gray-400 pb-5">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error labore sequi in debitis, qui corporis voluptas dignissimos numquam. Esse amet praesentium distinctio sit minus architecto cum assumenda, id quo nulla.</p>
                </div>
                <div className="flex items-center justify-between py-5">
                    <div className="flex gap-x-5">
                        <Image src={Testimonial} alt='' className='rounded-xl size-32'/>
                        <div className="text-xl font-bold text-text">
                            <h1>Ralph Juan</h1>
                            <div className="flex text-xl">
                                <Star fill='red' className=''/>
                                <Star fill='red'/>
                                <Star fill='red'/>
                                <StarHalf fill='red'/>
                            </div>                       
                        </div>
                    </div>
                    <h1 className='text-9xl font-extrabold text-yellow'>&apos;&apos;</h1>
                </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-5">
                <div className="border-b-2 border-b-gray-400 pb-5">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Legit nga solid talaga Error labore sequi in debitis, qui corporis voluptas dignissimos numquam.  Esse amet praesentium distinctio sit minus architecto cum assumenda, id quo nulla.</p>
                </div>
                <div className="flex items-center justify-between py-5">
                    <div className="flex gap-x-5">
                        <Image src={Testimonial} alt='' className='rounded-xl size-32'/>
                        <div className="text-xl font-bold text-text">
                            <h1>Emil dela Cruz</h1>
                            <div className="flex text-xl">
                                <Star fill='red' className=''/>
                                <Star fill='red'/>
                                <Star fill='red'/>
                                <StarHalf fill='red'/>
                            </div>                       
                        </div>
                    </div>
                    <h1 className='text-9xl font-extrabold text-yellow'>&apos;&apos;</h1>
                </div>
            </div>
           
        </div>
    </div>
  )
}

export default Testimony