'use client'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Logo from '@/../public/img/maristela.jpg'

function Favorites() {
    const favorites = useQuery(api.favorites.getAllfavorites)
    const router = useRouter()
  return (
    <div className="w-full px-3 md:px-24 mb-10 space-y-5">
      <div className="flex gap-x-3 items-center">
            <ArrowLeft onClick={()=> router.back()} className='border-yellow border-2 text-yellow p-1 rounded-full cursor-pointer size-8'/>
            <h1 className='text-black font-semibold text-2xl tracking-widest'>Favorites</h1> 
        </div>
    
      <div className='grid grid-cols-1 md:grid-cols-4 '>
          
          {favorites ? favorites.length >= 1 ? favorites.map((menuItem)=>(
              <ProductCard  
                key={menuItem?._id} 
                title={menuItem?.menu?.name || ""} 
                price={menuItem?.menu?.price || 0}
                image={menuItem?.url ? menuItem.url : Logo}
                description={menuItem?.menu?.description}
                menuId={menuItem?.menuId}
                ratings={menuItem? menuItem.ratings : []}
              
                >
                  
                <Image src={menuItem?.url ? menuItem.url : Logo} alt={menuItem?.menu.name || ''} height={200} width={200} className='h-32 md:h-52 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
              </ProductCard>
          )) : (
              <div className="text-center text-gray-500 text-sm">No added favorites.</div>
          ) :(
              <></>
          )}
        
      </div>
    </div>
  )
}

export default Favorites