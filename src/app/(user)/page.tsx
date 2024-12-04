import React from 'react'
import Image from 'next/image'
import Logo from '@/../public/img/maristela-removebg1.png'
import Link from 'next/link'
import Categories from './_components/Categories'
import FeaturedProducts from './_components/FeaturedProducts'
import LatestProduct from './_components/LatestProduct'
import TopRatedProducts from './_components/TopRatedProoducts'
import ReviewsProduct from './_components/ReviewsProduct'
import SearchAndMenu from './_components/SearchAndMenu'
import PersonalizedRecommendation from './_components/PersonalizedRecommendation'


function MenuPage() {
  return (
    <div className=' px-3 sm:px-10 md:px-15 lg:px-24 relative md:pt-16 space-y-10 overflow-hidden pb-10'>

      <SearchAndMenu/>

      <section className="relative w-full md:w-3/4 ml-auto h-fit md:h-[70vh] max-h-[70vh] bg-gray-100 md:grid grid-cols-2 items-center p-10 rounded-lg">
        <div className="absolute md:relative">
          <div className='text-yellow font-bold sm:text-sm md:text-lg lg:text-xl mb-2 '>Legacy that will satisfy!</div>
          <div className='text-4xl mb-5 font-cairo font-bold'>Home for the best crispy pata in town</div>
          <Link href={'/menu'} className='bg-primary text-white mt-10 px-5 py-3 text-lg font-bold'>
            Order now
          </Link>
        </div>
        
        <div className="">
            <Image 
              src={Logo} 
              alt='Maristela Restaurant Logo' 
              className='size-full object-cover'
            />
        </div>
      </section>

      <section className='w-full my-10'>
        <Categories/>
      </section>
      {/* Personalized Recommendations */}
      <section>
        <PersonalizedRecommendation/>
      </section>
      <section>
        <FeaturedProducts/>
      </section>
      <section className='grid grid-cols-1 gap-y-10 md:grid-cols-3 mb-10'>
        {/* Latest products */}
        <LatestProduct/>
        {/* Highest average rating score */}
        <TopRatedProducts/>
        {/* Highest number of reviews */}
        <ReviewsProduct/>
      </section>

    </div>
  )
}

export default MenuPage