'use client'
import { UserAvatar } from '@/app/dashboard/_components/user-avatar';
import { useCurrentUser } from '@/features/auth/api/use-current-user';
import {  Loader2Icon, LogOutIcon } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import {  FaHeart, FaShoppingBag, FaUser } from 'react-icons/fa'
import { motion } from "framer-motion"
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { FiMenu } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MdEmail } from 'react-icons/md';
import { formatPrice } from '@/lib/utils';
import SocialMedias from './SocialMedias';
import { useAuthActions } from '@convex-dev/auth/react';
import { toast } from 'sonner';

function Header() {
  const pathname = usePathname();
  const { data, isLoading } = useCurrentUser()
  const isLoggedIn = data?._id ? true : false
  const cartItems = useQuery(api.cartItems.getCartItems)
  const favorites = useQuery(api.favorites.getAllfavorites)
  const { signOut } = useAuthActions()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Signed out successfully")
    } catch (error) {
      console.error(error)
      toast.error("Failed to sign out")
    }
  }

  const subTotal = cartItems && cartItems.reduce((accumulator, item) => {
    return accumulator + ((item?.menu?.price||0) * (item?.quantity || 0)) ;
  }, 0);
  return (
    <div className="">
      <div className="md:flex hidden  bg-[#f5f5f5] sm:px-10 md:px-15 lg:px-24 py-4 text-sm">
        <div className="flex gap-x-3 items-center border-r pr-6 border-r-gray-300">
          <MdEmail />
          <h1 className='text-sm'>sombrereriadesandoval@gmail.com</h1>
        </div>
        <div className="flex items-center pl-6">
          <h1>Free Shipping for all Order of {formatPrice(500)}</h1>
        </div>
       <SocialMedias size='size-7'/>
        <div className="flex items-center pl-6 gap-x-1">
          {isLoggedIn ? (
            <div className="hidden md:block">
              <UserAvatar />
            </div>
          )
          : isLoading ? (<Loader2Icon className='w-6 h-6 animate-spin' />)
            : (
              <Link href={'/auth'} className='text-primary flex gap-x-1 items-center'>
                <FaUser />
                <h1 className='text-xs'>Login</h1>
              </Link>
            )}
        </div>
      </div>
      <div className="flex justify-between px-3 items-center py-5  transition-all duration-300 ease-in-out md:hidden">
        <Link href={'/'} className='text-black font-cairo text-xl font-extrabold'>Maristela&apos;s Restaurant</Link>
        <Sheet>
          <SheetTrigger><FiMenu className='size-8 md:hidden text-black'/></SheetTrigger>
          <SheetContent className='flex flex-col justify-between' side={'left'}>
            <SheetHeader>
              <SheetTitle className='border-b-2 border-b-gray-100 py-10'> <Link href={'/'} className='text-black font-cairo text-lg font-extrabold'>Maristela&apos;s Restaurant</Link></SheetTitle>
              <SheetDescription>
                <div className="text-center  space-y-5">
                {isLoggedIn ? (
                  <div className="flex gap-x-6 text-xs lg:text-3xl">
                      <Link href={'/cart'} className='text-black relative'>
                      <FaHeart className='size-7 text-black'/>
                      {favorites && favorites.length > 0 && (
                        <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: 2}}
                        transition={{ duration: 0.5 }}
                        className='absolute size-4 top-[-5px] right-[-6px] flex items-center justify-center rounded-full bg-yellow text-white text-sm'>
                        {favorites.length || 0}
                      </motion.div>
                      )}
                    
                    </Link>

                    <Link href={'/cart'} className='text-black relative'>
                      <FaShoppingBag className='size-7 text-black'/>
                      {cartItems && cartItems.length > 0 &&
                      <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: 2}}
                      transition={{ duration: 0.5 }}
                      className='absolute size-4 p-2 top-[-5px] right-[-6px] flex items-center justify-center rounded-full bg-yellow text-white text-sm'>
                        {cartItems.length || 0}
                      </motion.div>
                      }
                    </Link>

                  
                    <div className="flex items-center">
                      <h1 className="text-lg  font-cairo text-gray-500">item: <span className='font-bold text-black'>{formatPrice(subTotal || 0)}</span></h1>
                    </div>
                  </div>
                  ):(
                    <div className="">

                    </div>
                  )}
                  {isLoggedIn ? (
                    <div className="block">
                      <UserAvatar />
                    </div>
                  )
                  : isLoading ? (<Loader2Icon className='w-6 h-6 animate-spin' />)
                    : (
                      <Link href={'/auth'} className='text-primary flex gax-x-1 items-center'>
                        <FaUser />
                        <h1 className='text-xs'>Login</h1>
                      </Link>
                  )}
                  <div className='space-y-5 flex flex-col items-start justify-start '>
                    <Link href={'/'} className={`${pathname === "/" ? "text-yellow" : "text-black"} hover:text-yellow tracking-wider text-lg uppercase font-cairo  md:text-[1rem] lg:text-[1rem] transition-colors duration-300 ease-linear`}>
                      Home
                    </Link>
                    <Link href={'/menu'} className={`${pathname === "/menu" ? "text-yellow" : "text-black"} hover:text-yellow tracking-wider text-lg uppercase font-cairo  md:text-[1rem] lg:text-[1rem] transition-colors duration-300 ease-linear`}>
                      Menu
                    </Link>
                
                    <Link href={'/about'} className={`${pathname === "/about" ? "text-yellow" : "text-black"} hover:text-yellow tracking-wider text-lg uppercase font-cairo  md:text-lg lg:text-[1rem] transition-colors duration-300 ease-linear`}>
                      About Us
                    </Link>
                    <Link href={'/orders'} className={`${pathname === "/about" ? "text-yellow" : "text-black"} hover:text-yellow tracking-wider text-lg uppercase font-cairo  md:text-lg lg:text-[1rem] transition-colors duration-300 ease-linear`}>
                      Orders
                    </Link>
                    
                  </div>

                  <SocialMedias cn='ml-0 items-start' size='size-7'/>

                  <div className="space-y-5 text-sm">
                    <div className="flex gap-x-3 items-center ">
                      <MdEmail className='size-5'/>
                      <h1 className='text-xs'>sombrereriadesandoval@gmail.com</h1>
                    </div>
                    <div className="">
                      <h1>Free Shipping for all Order of {formatPrice(500)}</h1>
                    </div>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className='mt-20'>
              <div onClick={handleSignOut} className="flex gap-x-5">
                <LogOutIcon  className="size-4 mr-2 " />
                Log out
              </div>
          </SheetFooter>
          </SheetContent>
          
        </Sheet>
      </div>
    
    <motion.nav
      className='flex font-cairo justify-center md:justify-between items-center py-6  text-white px-5 sm:px-10 md:px-15 lg:px-24  h-fit w-full bg-white'>
      
      <Link href={'/'} className='hidden md:block text-black font-cairo font-bold text-sm sm:text-lg'>Maristela&apos;s Restaurant</Link>
      {/* <Image src={Logo} alt='Logo' className='size-10 md:hidden'/> */}

      <div className='hidden md:flex items-center justify-between gap-x-10 '>
        <Link href={'/'} className={`${pathname === "/" ? "text-yellow" : "text-black"} hover:text-yellow tracking-wider text-xs uppercase font-cairo font-semibold md:text-[1rem] lg:text-[1rem] transition-colors duration-300 ease-linear`}>
          Home
        </Link>
        <Link href={'/menu'} className={`${pathname === "/menu" ? "text-yellow" : "text-black"} hover:text-yellow tracking-wider text-xs uppercase font-cairo font-semibold md:text-[1rem] lg:text-[1rem] transition-colors duration-300 ease-linear`}>
          Menu
        </Link>
     
        <Link href={'/about'} className={`${pathname === "/about" ? "text-yellow" : "text-black"} hover:text-yellow tracking-wider text-xs uppercase font-cairo font-semibold  md:text-lg lg:text-[1rem] transition-colors duration-300 ease-linear`}>
          About Us
        </Link>

      </div>
      {isLoggedIn ? (
        <div className="flex gap-x-6 text-xs lg:text-3xl">
          
          <Link href={'/favorites'} className='text-black relative'>
            <FaHeart className='size-5 text-black'/>
            {favorites && favorites.length > 0 && (
              <motion.div
              initial={{ y: 0 }}
              animate={{ y: 2}}
              transition={{ duration: 0.5 }}
              className='absolute size-3 top-[-5px] right-[-4px] flex items-center justify-center rounded-full bg-yellow text-white text-sm'>
              {favorites.length || 0}
            </motion.div>
            )}
          
          </Link>

          <Link href={'/cart'} className='text-black relative'>
            <FaShoppingBag className='size-5 text-black'/>
            {cartItems && cartItems.length > 0 &&
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 2}}
              transition={{ duration: 0.5 }}
              className='absolute size-3 p-2 top-[-5px] right-[-4px] flex items-center justify-center rounded-full bg-yellow text-white text-sm'>
              {cartItems.length || 0}
            </motion.div>
            }
          </Link>

          <div className="flex items-center">
            <h1 className="text-xs  font-cairo text-gray-500">item: <span className='font-bold text-black'>{formatPrice(subTotal || 0)}</span></h1>
          </div>

          {/* <Link href={''} className='text-primary'><FaUser /></Link> */}
          {/* {isLoggedIn ? (
            <div className="hidden md:block">
              <UserAvatar />
            </div>
          )
            : isLoading ? (<Loader2Icon className='w-6 h-6 animate-spin' />)
              : (
                <Link href={'/auth'} className='text-primary'>
                  <FaUser />
                </Link>
              )} */}
        </div>
        ):(
          <div className="">
            
          </div>
        )}
    </motion.nav>
    </div>
  )
}

export default Header