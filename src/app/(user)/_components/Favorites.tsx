'use client'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
function Favorites() {
    const favorites = useQuery(api.favorites.getAllfavorites)
  return (
    <div className="w-full px-3 md:px-24 mb-10">
      <h1 className='w-full text-xl md:text-2xl font-bold text-primary text-center mb-5 flex gap-x-3'>Favorites</h1>
      <div className='grid grid-cols-1 md:grid-cols-4 '>
          
          {favorites ? favorites.length >= 1 ? favorites.map((menuItem)=>(
              <ProductCard  
                key={menuItem?._id} 
                title={menuItem?.menu?.name || ""} 
                price={menuItem?.menu?.price || 0}
                image={menuItem?.url ? menuItem.url : ""}
                description={menuItem?.menu?.description}
                menuId={menuItem?.menuId}
                ratings={menuItem? menuItem.ratings : []}
                >
                  
                <Image src={menuItem?.url ? menuItem.url : ""} alt={menuItem?.menu.name || ''} height={200} width={200} className='h-32 md:h-52 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
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