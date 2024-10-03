'use client'
import MenuPopover from '@/app/(landing-page)/_components/MenuPopover';
import { UserAvatar } from '@/app/dashboard/_components/user-avatar';
import { useCurrentUser } from '@/features/auth/api/use-current-user';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa'
import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import { useScroll } from '@/lib/hooks/useScrollToSection';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

function Header() {
  const pathname = usePathname();
  const { data, isLoading } = useCurrentUser()
  const [showNav, setShowNav] = useState(true);
  const {scrollY ,prevScrollY } = useScroll()
  const isLoggedIn = data?._id ? true : false
  const cartItems = useQuery(api.cartItems.getCartItems)
  
  useEffect(() => {
    if (scrollY > prevScrollY && Number(scrollY) > 100) {
        setShowNav(false);
    } else {
        setShowNav(true);
    }
}, [scrollY]);


  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: showNav ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className='flex fixed z-50 inset-0 justify-between items-center text-text px-24  h-24 w-full bg-white shadow-lg '>
      <h1 className='text-primary font-parisienne font-bold text-sm sm:text-lg md:text-xl lg:text-2xl'>Maristela&apos;s Restaurant</h1>
      <div className='flex items-center justify-between gap-x-6 '>
        <Link href={'/'} className={`${pathname === "/" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear'}{'${pathname === "/home" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>Home</Link>
        <MenuPopover />
        <Link href={'shop-detail'} className={`${pathname === "/shop-detail" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear'}{'${pathname === "/home" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>
          About Us
        </Link>

        <Link href={'/contact'} className={`${pathname === "/contact" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear'}{'${pathname === "/home" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>
          Contact
        </Link>
      </div>
      <div className="flex gap-x-6 text-3xl">
        <FaSearch />
       
          <Link href={'/cart'} className='text-primary relative'>
            <FaShoppingBag />
            {cartItems && cartItems.length > 0 &&
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 2}}
              transition={{ duration: 0.5 }}
              className='absolute size-5 top-[-2px] right-[-4px] flex items-center justify-center rounded-full bg-yellow text-white text-sm'>
              {cartItems.length || 0}
            </motion.div>
            }
          </Link>
      
        {/* <Link href={''} className='text-primary'><FaUser /></Link> */}
        {isLoggedIn ? (
          <UserAvatar />
        )
          : isLoading ? (<Loader2Icon className='w-6 h-6 animate-spin' />)
            : (
              <Link href={'/auth'} className='text-primary'>
                <FaUser />
              </Link>
            )}
      </div>
    </motion.nav>
  )
}

export default Header