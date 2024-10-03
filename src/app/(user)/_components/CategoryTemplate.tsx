import React from 'react'
import { AugmentedMenu } from './Menus'
import { SkeletonCard } from '@/components/SkeletonCard'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { getAverage } from '@/lib/utils'
import { MenuCategoryType } from '../../../../data/menu-data'

function CategoryTemplate({
    menus,
    categoryName,

}:{
    menus?: AugmentedMenu[],
    categoryName: MenuCategoryType,

}) {
  const filteredMenus =  menus?.filter(menu=> menu.category == categoryName);

  //if there is no item in the specific category.
  if(filteredMenus?.length === 0){
    return
  }

  return (
    <div className='mt-5 shadow-md p-5'>
    <h1 className='text-xl md:text-3xl font-bold text-primary text-center mb-5 flex gap-x-3'>{categoryName}</h1>
    
        {filteredMenus ?( 
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
                {  filteredMenus.map((menuItem)=>(
                    <ProductCard  
                        key={menuItem._id} 
                        title={menuItem.name} 
                        price={menuItem.price} 
                        menuId={menuItem._id}
                        signature={menuItem.special}
                        recommend={menuItem.recommended}
                        average={getAverage({ratings: menuItem.ratings })}
                        >
                        
                        <Image src={menuItem.url ? menuItem.url : ""} alt={menuItem.name} height={200} width={200} className='h-32 md:h-52 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
                    </ProductCard>
                ))}
            </div>
        ):(
            <div className="grid grid-cols-5 gap-x-3 ">
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
           
            </div>
        )}
   
  </div>
  )
}

export default CategoryTemplate