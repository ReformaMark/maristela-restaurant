import React from 'react'
import Special from './_components/Special'
import Filters from './_components/Filters'
import Recommendation from './_components/Recommendation'

function MenuPage() {
  return (
    <div className='pt-32 px-24'>
      <h1 className='text-primary font-bold text-4xl tracking-wider text-center mb-5'>Maristela&apos;s Restaurant Menu</h1>
        <div className=" flex justify-start gap-x-10">
          <Filters/>
          <div className="s space-y-14 pb-10 ">
            <Special/>
            <Recommendation/>

          </div>
        </div>
    </div>
  )
}

export default MenuPage