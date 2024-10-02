'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import Image from 'next/image'

function CartItems() {
    const cartartItems = useQuery(api.cartItems.getCartItems)
  return (
    <div>
        {cartartItems ? cartartItems.map((item)=>(
            <div key={item?._id} className="">
                <Image src={item?.url ? item.url : ""} width={100} height={100} alt={item?.name || ''} className='size-10'/>
                <h1>{item?.name}</h1>
            </div>
        )):(
            <></>
        )}
    </div>
  )
}

export default CartItems