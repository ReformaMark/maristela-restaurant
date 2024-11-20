
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/../public/img/maristela.jpg'
import { FaCopyright, FaFacebook } from 'react-icons/fa'
import { PiMessengerLogo } from 'react-icons/pi'
function Footer() {
  return (
    <footer className='w-full min-h-40 border-t-2 bg-gray-100 border-t-gray-100 px-2 py-5 md:px-24 md:py-10'>
      <div className="flex justify-between items-center border-b-2 border-b-yellow pb-5 px-3 md:px-0">
        <div className="flex items-center gap-x-5">
          <Image src={Logo} alt='Logo' className=' size-20 object-cover'/>
          <h1 className='hidden md:block text-primary font-bold text-xl font-parisienne'>Maristela&apos;s Restaurant</h1>
        </div>
        <div className="flex item-center gap-x-5 text-xl ">
          <Link href={'https://www.facebook.com/profile.php?id=100063877757731&mibextid=qi2Omg'} className=''><FaFacebook className='size-10 text-text'/></Link>
          <Link href={'https://www.facebook.com/messages/t/108393114270124'} className=''><PiMessengerLogo className='size-10 text-text'/></Link>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between py-3">
        <div className="flex justify-center items-center">
            <span className="text-light flex gap-x-2 items-center">
              <FaCopyright/>
              <a href="#" className='text-yellow'> Maristela&apos;s Restaurant</a>, All right reserved.
            </span>
        </div>
        <div className="grid grid-cols-2 md:flex gap-3 justify-center px-3 mb-3">
          <div className="flex flex-col">
            <h1 className='font-semibold text-lg mb-3'>Restaurant Info</h1>
            <Link href={'/about'} className='text-text hover:text-primary'>About Us</Link>
            <Link href={'/about/privacy-policy'} className='text-text hover:text-primary'>Privacy & Policy</Link>
            <Link href={'/about/terms-conditions'} className='text-text hover:text-primary'>Terms & Condition</Link>
            <Link href={'/about/return-policy'} className='text-text hover:text-primary'>Return Policy</Link>
            <Link href={'/about/faqs'} className='text-text hover:text-primary'>FAQs & Help</Link>
          </div>
          <div className="flex flex-col">
            <h1 className='font-semibold text-lg mb-3'>Account</h1>
            <Link href={'/favorites'} className='text-text hover:text-primary'>Favorites</Link>
            <Link href={'/cart'} className='text-text hover:text-primary'>Cart</Link>
            <Link href={'/orders'} className='text-text hover:text-primary'>Orders</Link>
        
          </div>
          <div className="flex flex-col">
            <h1 className='font-semibold text-lg mb-3'>Contact</h1>
            <Link href={'https://www.google.com/maps/place/Concepcion,+Alitagtag,+Batangas/@13.8682168,121.0127276,16z/data=!3m1!4b1!4m6!3m5!1s0x33bd0c2422d270db:0x78ca88962e6b1423!8m2!3d13.8688814!4d121.0177415!16s%2Fg%2F11f0wlxvzl?entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D'} className='text-text hover:text-primary'>Address: Concepcion Alitagtag, Batangas, Alitagtag, Philippines</Link>
            <Link href={'mailto:sombrereriadesandoval@gmail.com'} className='text-text hover:text-primary'>Email: sombrereriadesandoval@gmail.com</Link>
            <h1 className='text-text hover:text-primary'>Phone: 0920 623 8834</h1>
            
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer