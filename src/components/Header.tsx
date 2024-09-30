'use client'
import PagesPopover from '@/app/(landing-page)/_components/PagesPopover';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa'


function Header() {
    const pathname = usePathname();

  return (
    <nav className='flex sticky justify-between items-center text-text px-24 py-6 w-full bg-whtre shadow-lg '>
        <h1 className='text-primary font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>Fruitables</h1>
        <div className='flex items-center justify-between gap-x-6 '>
            <Link href={'/'} className={`${pathname === "/" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear'}{'${pathname === "/home" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>Home</Link>
            <Link href={'shop'} className={`${pathname === "/shop" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear'}{'${pathname === "/home" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>Shop</Link>
            <Link href={'shop-detail'} className={`${pathname === "/shop-detail" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear'}{'${pathname === "/home" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>Shop Detail</Link>
            <PagesPopover/>
            <Link href={'/contact'} className={`${pathname === "/contact" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear'}{'${pathname === "/home" ? "text-primary" : "text-text"} hover:text-primary text-xs font-thin md:text-lg lg:text-lg transition-colors duration-300 ease-linear`}>Contact</Link>
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