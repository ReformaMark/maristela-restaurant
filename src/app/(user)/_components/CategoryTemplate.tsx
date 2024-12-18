import React from 'react'
import { AugmentedMenu } from './Menus'
import { SkeletonCard } from '@/components/SkeletonCard'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import Logo from '@/../public/img/maristela.jpg'

function CategoryTemplate({
    menus,
    categoryName,

}:{
    menus?: AugmentedMenu[],
    categoryName: string,

}) {
  const filteredMenus =  menus?.filter(menu=> menu.category == categoryName);

  //if there is no item in the specific category.
  if(filteredMenus?.length === 0){
    return <div className="w-full flex justify-center items-center min-h-[50vh] text-center text-lg text-gray-500">No available menu in the category: {categoryName}</div>;
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
                        image={menuItem.url ? menuItem.url : Logo}
                        description={menuItem.description}
                        menuId={menuItem._id}
                        ratings={menuItem.ratings}
                        >
                        
                        <Image priority src={menuItem.url ? menuItem.url : Logo} alt={menuItem.name} height={200} width={200} className='h-32 md:h-52 w-full object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-linear'/>
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