import MenuPopover from '@/app/(landing-page)/about/_components/MenuPopover'
import React from 'react'
import Search from './Search'
import { FaPhoneAlt } from 'react-icons/fa'

function SearchAndMenu() {
  return (
    <section className='space-y-5 md:space-y-0 md:grid grid-cols-12 gap-y-5 gap-x-10 py-5 md:absolute h-fit inset-0 w-full z-50 px-3 sm:px-10 md:px-15 lg:px-24 max-w-full'>
        <div className="col-span-12 md:col-span-3">
          <MenuPopover/>
        </div>

        <div className="col-span-12 md:col-span-6">
          <Search/>
        </div>
        <div className="col-span-12 md:col-span-3 flex gap-x-2 justify-start md:justify-end">
          <div className="h-12 w-12  bg-gray-200 p-1 rounded-full flex items-center justify-center">
            <FaPhoneAlt className='size-5 text-black'/>
          </div>
          <div className="">
            <h1 className='text-lg '>0920 623 8834</h1>
            <h1 className='text-sm text-gray-400'>support 24/7 time</h1>
          </div>
        </div>
      </section>
  )
}

export default SearchAndMenu