import React from 'react'
import Special from './_components/Special'
import Filters from './_components/Filters'
import Recommendation from './_components/Recommendation'

function MenuPage() {
  return (
    <div className='pt-32 px-24'>
      <h1 className='text-text font-bold text-4xl tracking-wider text-center mb-5'>Maristela&apos;s Restaurant Menu</h1>
        <div className=" flex justify-start gap-x-10">
          <Filters/>
          <div className="">
            <Special/>
            <Recommendation/>
            <Special/>
            <Special/>
            <Special/>
            <Special/>
            <Special/>

          </div>
        </div>
    </div>
  )
}

export default MenuPage