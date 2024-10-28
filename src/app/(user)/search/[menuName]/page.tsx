import React from 'react'
import SearchAndMenu from '../../_components/SearchAndMenu'
import SearchResultItems from '../../_components/SearchResultItems';

function SearchPage({params}:{params:{menuName:string}}) {
  const formattedParams = params.menuName.replace(/%20/g, ' ') .replace(/%26/g, '&'); 

  return (
    <div className='relative px-3 md:pt-16 sm:px-10 md:px-15 lg:px-24'>
        <SearchAndMenu/>
       
       
        <h1 className='text-xl md:text-xl font-bold text-primary text-center my-5 flex gap-x-3'>Search Result:</h1>
        <div className="">
          <SearchResultItems searchValue={formattedParams}/>
        </div>
    </div>
  )
}

export default SearchPage