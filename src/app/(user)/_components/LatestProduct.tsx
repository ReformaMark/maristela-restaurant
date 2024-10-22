'use client'
import React from 'react';
import SortedProductCard from './SortedProductCard';

function LatestProduct() {
 
  return (
    <div className='font-cairo'>
       <SortedProductCard latest={true}/>
    </div>
  )
}

export default LatestProduct