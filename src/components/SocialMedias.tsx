import React from 'react'
import { FaFacebook, FaTiktok } from 'react-icons/fa'
import { PiMessengerLogo } from 'react-icons/pi'

function SocialMedias({cn, size}:{cn?:string, size?:string}) {
  return (
    <div className={`${cn} flex ml-auto items-center gap-x-3 border-r pr-6 border-r-gray-300`}>
        <FaFacebook className={size}/>
        <FaTiktok className={size}/>
        <PiMessengerLogo className={size}/>
  </div>
  )
}

export default SocialMedias