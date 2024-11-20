import Image from 'next/image'
import React from 'react'
import Logo from '@/../public/img/maristela-removebg1.png'

function ContactUs() {
  return (
    <div className=" p-6 bg-gray-50">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-10 text-gray-800">Contact Us</h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 border-2 border-yellow-500 rounded-lg p-6 bg-white shadow-lg">
        <div className="flex items-center gap-4">
          <Image src={Logo} alt="Logo" width={64} height={64} className="rounded-full" />
          <div>
            <h2 className="hidden md:block text-primary font-bold text-2xl">Maristela&apos;s Restaurant</h2>
            <p className="text-sm text-gray-600">sombrereriadesandoval@gmail.com</p>
          </div>
        </div>
        <div className="text-center md:text-left">
          <p className="text-lg text-gray-700">Concepcion Alitagtag,</p>
          <p className="text-lg text-gray-700">Batangas, Philippines</p>
          <p className="text-lg text-gray-700">0920 623 8834</p>
        </div>
      </div>
    </div>
  )
}

export default ContactUs