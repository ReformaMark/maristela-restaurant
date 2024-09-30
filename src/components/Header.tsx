'use client'
import MenuPopover from '@/app/(landing-page)/_components/MenuPopover';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa'


function Header() {
    const pathname = usePathname();

  return (
    <nav className='flex absolute z-50 inset-0 justify-between items-center text-text px-24  h-24 w-full bg-white shadow-lg '>
        <h1 className='text-primary font-parisienne font-bold text-sm sm:text-lg md:text-xl lg:text-2xl'>Maristela&apos;s Restaurant</h1>
        <div className='flex items-center justify-between gap-x-6 '>
            <Link href={'/'} className={`${pathname === "/" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear'}{'${pathname === "/home" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>Home</Link>
            <MenuPopover/>
            <Link href={'shop-detail'} className={`${pathname === "/shop-detail" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear'}{'${pathname === "/home" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>
              About Us
            </Link>
           
            <Link href={'/contact'} className={`${pathname === "/contact" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear'}{'${pathname === "/home" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>
              Contact
            </Link>
        </div>
        <div className="flex gap-x-6 text-3xl">
            <FaSearch />
            <Link href={''} className='text-primary'><FaShoppingBag /></Link>
            <Link href={''} className='text-primary'><FaUser /></Link>
        </div>

    </nav>
  )
}

export default Header