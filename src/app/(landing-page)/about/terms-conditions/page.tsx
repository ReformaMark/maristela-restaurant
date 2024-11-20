"use client"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Logo from '@/../public/img/maristela-removebg1.png'
import Image from 'next/image'

const TermCondition = () => {
    const router = useRouter()
  return (
    <div className="px-4 py-8 md:px-24 md:py-16 bg-gray-50 text-gray-800">
        <ArrowLeft onClick={()=> router.back()} className='border-yellow border-2 text-yellow p-1 rounded-full cursor-pointer size-8'/>
        <div className="relative w-full bg-none md:bg-gray-50">
            <h1 className='absolute w-full text-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl sm:text-xl md:text-2xl lg:text-4xl tracking-wider text-center mb-5'>Maristela&apos;s Restaurant Terms and Conditions</h1>
            <Image src={Logo} alt='' className='size-48 mx-auto opacity-40'/>
        </div> 
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-base leading-7">
            Welcome to Maristela&apos;s Restaurant. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
          <p className="text-base leading-7">
            Other than the content you own, under these Terms, Maristela&apos;s Restaurant and/or its licensors own all the intellectual property rights and materials contained in this Website.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Restrictions</h2>
          <p className="text-base leading-7">
            You are specifically restricted from all of the following:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Publishing any Website material in any other media</li>
            <li>Selling, sublicensing and/or otherwise commercializing any Website material</li>
            <li>Publicly performing and/or showing any Website material</li>
            <li>Using this Website in any way that is or may be damaging to this Website</li>
            <li>Using this Website in any way that impacts user access to this Website</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Your Privacy</h2>
          <p className="text-base leading-7">
            Please read our <span onClick={()=> router.push('/about/privacy-policy')} className='underline cursor-pointer text-primary'>Privacy Policy</span>.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p className="text-base leading-7">
            In no event shall Maristela&apos;s Restaurant, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website.
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermCondition