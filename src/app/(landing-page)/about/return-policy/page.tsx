"use client"
import React from 'react'
import Image from 'next/image'
import Logo from '@/../public/img/maristela-removebg1.png'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

function ReturnPolicy() {
  const router = useRouter()
  return (
    <div className="px-4 py-8 md:px-24 md:py-16 bg-gray-50 text-gray-800">
      <ArrowLeft onClick={() => router.back()} className='border-yellow border-2 text-yellow p-1 rounded-full cursor-pointer size-8'/>
      <div className="relative w-full bg-none md:bg-gray-50">
        <h1 className='absolute w-full text-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl sm:text-xl md:text-2xl lg:text-4xl tracking-wider text-center mb-5'>Maristela&apos;s Restaurant Return Policy</h1>
        <Image src={Logo} alt='' className='size-48 mx-auto opacity-40'/>
      </div> 
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-base leading-7">
            At Maristela&apos;s Restaurant, we are committed to providing high-quality food and ensuring customer satisfaction. This Return Policy outlines the conditions under which food returns and refunds are accepted.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Return Conditions</h2>
          <p className="text-base leading-7">
            Due to the perishable nature of food items, returns are only accepted if the food is found to be defective or not as described at the time of delivery. Please contact us immediately if you encounter any issues with your order.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Refund Process</h2>
          <p className="text-base leading-7">
            If a return is approved, we will process a refund to your original method of payment. Please note that we only accept Cash on Delivery (COD) payments, and refunds will be issued accordingly.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Exchanges</h2>
          <p className="text-base leading-7">
            We do not offer exchanges for food items. If you receive a defective or incorrect item, please contact us for a resolution.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p className="text-base leading-7">
            If you have any questions or concerns about our Return Policy, please contact us at sombrereriadesandoval@gmail.com.
          </p>
        </section>
      </div>
    </div>
  )
}

export default ReturnPolicy