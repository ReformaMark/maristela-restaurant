import React from 'react'
import { FaMinus } from 'react-icons/fa'
import { FaPlus } from "react-icons/fa6";

function QtyBtn({quantity}:{quantity?:number}) {
  return (
    <div className='c col-span-2 pl-5 flex items-center gap-x-2'>
        <FaMinus className='px-2 border border-gray-200 text-sm size-7 cursor-pointer'/>
        {quantity}
        <FaPlus className='px-2 border border-gray-200 text-sm size-7 cursor-pointer'/>
    </div>
  )
}

export default QtyBtn