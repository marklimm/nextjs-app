import React, { FunctionComponent } from 'react'
import Image from 'next/image'

export const Header: FunctionComponent = () => {
  return (
    <div className='flex p-2 bg-gray-200 border-t-2 border-gray-400'>
      <Image
        src='/stormtrooper-logo.png'
        alt='Stormtrooper logo'
        width='96'
        height='96'
      />

      <span className='self-center pl-6 text-lg'>
        Welcome to my NextJS website!
      </span>
    </div>
  )
}
