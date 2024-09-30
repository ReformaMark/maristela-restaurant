import Image from 'next/image'
import React from 'react'
import Pata from '@/../public/img/pata.png'
function Subhero() {
  return (
    <div className='h-[50vh] px-24 py-10 flex '>
        <div className="flex flex-col item-center text-center w-1/2">
            <Image src={Pata} alt='Pata' className='object-contain size-64'/>
           
        </div>
        <div className="">
            <h1 className='text-4xl text-text font-bold'>Maristela&apos;s Crispy Pata</h1>
            <p className='text-text text-lg text-center my-5'>The well known Maristela&apos;s Crispy Pata was the curation of Bernabe Sandoval; maristela&apos;s grandfather. After years of trial and error, experimentation and ingredient hunting, he found the perfect recipe.</p>
            <p className='text-text text-lg text-center'>Enjoy the crispy cutside and the tender meat that seperates from the bone. With every dip in the sauce. Maristela&apos;s Crispy Pata is irrisistable.</p>
        </div>
    </div>
  )
}

export default Subhero