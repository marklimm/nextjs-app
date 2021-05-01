import React, { FunctionComponent } from 'react'

export const Header: FunctionComponent = () => {
  return (
    <div className='flex p-2 bg-gray-200 border-t-2 border-gray-400'>
      <img
        src='/stormtrooper-logo.png'
        alt='Stormtrooper logo'
        title='Stormtrooper logo'
        className='h-24'
      />
      <span className='self-center pl-6 text-lg'>
        Welcome to my static website generated with NextJS!
      </span>
    </div>
  )
}
