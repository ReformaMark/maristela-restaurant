"use client"
import Image from 'next/image'
import React from 'react'
import Logo from '@/../public/img/maristela-removebg1.png'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PrivacyPolicy = () => {
    const router = useRouter()
  return (
    <div className="px-4 py-8 md:px-24 md:py-16 bg-gray-50 text-gray-800">
        <ArrowLeft onClick={()=> router.back()} className='border-yellow border-2 text-yellow p-1 rounded-full cursor-pointer size-8'/>
        <div className="relative w-full bg-none md:bg-gray-50">
            <h1 className='absolute w-full text-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl sm:text-xl md:text-2xl lg:text-4xl tracking-wider text-center mb-5'>Maristela&apos;s Restaurant Privacy Policy</h1>
            <Image src={Logo} alt='' className='size-48 mx-auto opacity-40'/>
        </div> 
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-base leading-7">
            At Maristela&apos;s Restaurant, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="text-base leading-7">
            We may collect personal information such as your name, email address, phone number, and payment details when you make a reservation or place an order. We also collect non-personal information such as your browser type, IP address, and pages visited.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="text-base leading-7">
            We use your personal information to process your orders, manage reservations, and improve our services. We may also use your information to send you promotional materials and updates about our restaurant.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
          <p className="text-base leading-7">
            We do not sell or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Security</h2>
          <p className="text-base leading-7">
            We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Your Consent</h2>
          <p className="text-base leading-7">
            By using our website, you consent to our Privacy Policy.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Our Privacy Policy</h2>
          <p className="text-base leading-7">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="text-base leading-7">
            If you have any questions about our Privacy Policy, please contact us at sombrereriadesandoval@gmail.com.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicy