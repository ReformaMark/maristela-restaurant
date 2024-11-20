
import React from 'react'
import { Star } from 'lucide-react'

function Testimony() {
  return (
    <div className='h-dvh py-10 px-24'>
        <h1 className='text-primary font-semibold text-lg text-center'>Testimonials</h1>
        <h1 className='text-gray-600 font-extrabold text-5xl text-center tracking-wider'>What Our Clients Are Saying</h1>
        <div className="mt-10 grid grid-cols-2 gap-x-10">
            <div className="bg-gray-100 rounded-xl p-5">
                <div className="border-b-2 border-b-gray-400 pb-5">
                    <p>&quot;The food at Maristela&apos;s Restaurant is absolutely amazing! The flavors are authentic and the presentation is beautiful. I highly recommend the Crispy Pata!&quot;</p>
                </div>
                <div className="flex items-center justify-between py-5">
                    <div className="flex gap-x-5">
                        
                        <div className="text-xl font-bold text-gray-800">
                            <h1>Ralph Juan</h1>
                            <div className="flex text-xl text-yellow-500">
                                <Star fill='yellow'/>
                                <Star fill='yellow'/>
                                <Star fill='yellow'/>
                                <Star fill='yellow'/>
                                <Star fill='yellow'/>
                            </div>                       
                        </div>
                    </div>
                    <h1 className='text-9xl font-extrabold text-yellow-500'>&apos;&apos;</h1>
                </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-5">
                <div className="border-b-2 border-b-gray-400 pb-5">
                    <p>&quot;I had a wonderful dining experience at Maristela&apos;s. The Baby Back Ribs were tender and flavorful. The staff was friendly and attentive. Will definitely come back!&quot;</p>
                </div>
                <div className="flex items-center justify-between py-5">
                    <div className="flex gap-x-5">
                      
                        <div className="text-xl font-bold text-gray-800">
                            <h1>Emil dela Cruz</h1>
                            <div className="flex text-xl text-yellow-500">
                                <Star fill='yellow'/>
                                <Star fill='yellow'/>
                                <Star fill='yellow'/>
                                <Star fill='yellow'/>
                                <Star fill='yellow'/>
                            </div>                       
                        </div>
                    </div>
                    <h1 className='text-9xl font-extrabold text-yellow-500'>&apos;&apos;</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimony