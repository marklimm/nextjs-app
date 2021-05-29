import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Custom404: FunctionComponent = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-xl mb-2'>
          404 - Sorry, we could not find that page!
        </h1>

        <span className='mb-2'>
          But feel free to check out the above links or head back to the&nbsp;
          <Link href={`/`}>
            <a>Home page</a>
          </Link>
        </span>

        <Image
          src='/technical-difficulties.jpg'
          alt='Star Wars technical difficulties image'
          width='987'
          height='555'
        />
      </div>
    </>
  )
}

export default Custom404
