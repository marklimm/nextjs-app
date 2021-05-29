import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { DetentionBlock } from 'components/DetentionBlock/DetentionBlock'
import { toast } from 'react-toastify'

const DetentionBlockUI: FunctionComponent = () => {
  const openToastr = () => {
    toast.info('toastr opened!')
  }

  return (
    <>
      <Head>
        <title>NextJS demo - Detention Block</title>
      </Head>

      <div className='grid grid-cols-2'>
        <div>
          <h1>Detention Block</h1>

          <DetentionBlock />

          <button
            className='mt-5 bg-indigo-800 focus:outline-none p-2 rounded-md text-sm text-white hover:text-yellow-400 hover:bg-red-700'
            onClick={openToastr}
          >
            Open toastr
          </button>
        </div>

        {/* setting `position: relative` on this <div> is necessary in order for the below <Image /> to not fill up the entire page, since it is set to `layout: fill`.  Documentation at https://nextjs.org/docs/api-reference/next/image#layout */}
        <div style={{ position: 'relative' }}>
          <Image
            src='/detention-block.webp'
            alt='Star Wars detention block'
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
    </>
  )
}

export default DetentionBlockUI
