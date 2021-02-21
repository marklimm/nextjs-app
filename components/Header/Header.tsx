import React, { FunctionComponent } from 'react'

export const Header: FunctionComponent = () => {
  return (
    <div className='flex p-2 bg-gray-200 border-t border-gray-700'>
      <img
        src='/stormtrooper-logo.png'
        alt='Stormtrooper logo'
        className='h-24'
      />
      <span className='self-center pl-6 text-lg'>
        This is a static website generated with NextJS
      </span>
    </div>
  )
}
