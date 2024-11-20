import Link from 'next/link'
import React from 'react'
import { FaFacebook } from 'react-icons/fa'
import { PiMessengerLogo } from 'react-icons/pi'

function SocialMedias({cn, size}:{cn?:string, size?:string}) {
  return (
    <div className={`${cn} flex ml-auto items-center gap-x-3 border-r pr-6 border-r-gray-300`}>
        <Link href={'https://www.facebook.com/profile.php?id=100063877757731&mibextid=qi2Omg'} className=''><FaFacebook className={size}/></Link>
        <Link href={'https://www.facebook.com/messages/t/108393114270124'} className=''><PiMessengerLogo className={size}/></Link>
  </div>
  )
}

export default SocialMedias