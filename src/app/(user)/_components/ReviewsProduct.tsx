'use client'
;
import React from 'react'
import SortedProductCard from './SortedProductCard';

function ReviewsProduct() {
   
  return (
    <div className='font-cairo'>
       <SortedProductCard topReviews={true}/>
    </div>
  )
}

export default ReviewsProduct