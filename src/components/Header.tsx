'use client'
import MenuPopover from '@/app/(landing-page)/about/_components/MenuPopover';
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
import { FiMenu } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function Header() {
  const pathname = usePathname();
  const { data, isLoading } = useCurrentUser()
  const [showNav, setShowNav] = useState(true);
  const { scrollY, prevScrollY } = useScroll()
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
      className='fixed z-50 inset-0 flex justify-between items-center py-6  text-white px-5 sm:px-10 md:px-15 lg:px-24  h-fit w-full bg-white shadow-lg '>
      <div className="t transition-all duration-300 ease-in-out md:hidden">
        <Sheet>
          <SheetTrigger><FiMenu className='size-8 md:hidden text-text'/></SheetTrigger>
          <SheetContent side={'left'}>
            <SheetHeader>
              <SheetTitle className='border-b-2 border-b-gray-100 py-10'> <UserAvatar /></SheetTitle>
              <SheetDescription>
                <div className="">

                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <Link href={'/'} className='text-primary font-parisienne font-bold text-sm sm:text-lg md:text-xl lg:text-2xl'>Maristela&apos;s Restaurant</Link>
      {/* <Image src={Logo} alt='Logo' className='size-10 md:hidden'/> */}

      <div className='hidden md:flex items-center justify-between gap-x-6 '>
        <Link href={'/'} className={`${pathname === "/" ? "text-yellow" : "text-text"} hover:text-yellow text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>
          Home
        </Link>
        <MenuPopover />
        <Link href={'/about'} className={`${pathname === "/about" ? "text-yellow" : "text-text"} hover:text-yellow text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>
          About Us
        </Link>

        <Link href={'/contact'} className={`${pathname === "/contact" ? "text-yellow" : "text-text"} hover:text-yellow text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>
          Contact
        </Link>
      </div>
      <div className="flex gap-x-6 text-xs lg:text-3xl">
        <FaSearch className='hidden md:block text-text'/>
       
        <Link href={'/cart'} className='text-text relative'>
          <FaShoppingBag className='size-8 text-text'/>
          {cartItems && cartItems.length > 0 &&
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 2}}
            transition={{ duration: 0.5 }}
            className='absolute size-5 top-[-2px] right-[-4px] flex items-center justify-center rounded-full bg-yellow text-text text-sm'>
            {cartItems.length || 0}
          </motion.div>
          }
        </Link>

        {/* <Link href={''} className='text-primary'><FaUser /></Link> */}
        {isLoggedIn ? (
          <div className="hidden md:block">
            <UserAvatar />
          </div>
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