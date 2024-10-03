import { useMutation } from 'convex/react';
import React from 'react'
import { FaMinus } from 'react-icons/fa'
import { FaPlus } from "react-icons/fa6";
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

function QtyBtn({
    quantity,
    cartItemId
}:{
    quantity?:number,
    cartItemId?: Id<'cartItems'>

}) {
    const addSubtract = useMutation(api.cartItems.addSubtract)
    
    if(!cartItemId){
        return
    }
  return (
    <div className='c col-span-2 pl-0 md:pl-5 text-xs md:text-lg flex items-center gap-x-2'>
        <FaMinus 
            onClick={()=>addSubtract({operation:"subtract", cartItemId})}
            className='px-1 md:px-2 border border-gray-200 text-sm size-7 cursor-pointer'
        />
        {quantity}
        <FaPlus
            onClick={()=>addSubtract({operation:"add", cartItemId})} 
            className='px-1 md:px-2 border border-gray-200 text-sm size-7 cursor-pointer'
        />
    </div>
  )
}

export default QtyBtn