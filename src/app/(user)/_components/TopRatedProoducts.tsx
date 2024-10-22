'use client'
import React from 'react'

import SortedProductCard from './SortedProductCard';

function TopRatedProducts() {
    
   
  return (
    <div className='font-cairo'>
      <SortedProductCard topRated={true}/>
    </div>
  )
}

export default TopRatedProducts