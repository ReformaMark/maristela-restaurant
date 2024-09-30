import ProductCard from '@/components/ProductCard'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Logo from '@/../public/img/crispy_pata.jpg'
const dummyData = [
  {
    title: "product1",
    price: 100,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam consequatur ea quidem dolor, dolore quia ratione necessitatibus sapiente harum dolores cupiditate quaerat laborum laudantium sit veniam natus illo? Ut."
  },
  {
    title: "product1",
    price: 100,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam consequatur ea quidem dolor, dolore quia ratione necessitatibus sapiente harum dolores cupiditate quaerat laborum laudantium sit veniam natus illo? Ut."
  },
  {
    title: "product1",
    price: 100,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam consequatur ea quidem dolor, dolore quia ratione necessitatibus sapiente harum dolores cupiditate quaerat laborum laudantium sit veniam natus illo? Ut."
  },
  
]
function BestSeller() {
  return (
    <div className='px-24 py-10 h-screen '>
      <div className="flex justify-center items-center gap-x-10">
        <Star className='size-16'/>
        <h1 className='text-center font-sans font-bold text-5xl tracking-widest flex'>Our Bestsellers </h1>
        <Star className='size-16'/>
      </div>
      <div className="border-2 p-5 grid grid-cols-3 gap-5 rounded-xl border-primary mt-5 shadow-xl">
        {dummyData.map(product=> (
          <ProductCard key={product.title} title={product.title} price={product.price} description={product.description}>
            <Image src={Logo} alt='' className='object-cover h-32 w-full'/>
          </ProductCard>
        ))}
      </div>
    </div>
  )
}

export default BestSeller