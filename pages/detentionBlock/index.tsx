import React, { FunctionComponent } from 'react'
import Head from 'next/head'

import { DetentionBlock } from 'components/DetentionBlock/DetentionBlock'

const DetentionBlockUI: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>NextJS demo - Detention Block</title>
      </Head>

      <div className='grid grid-cols-2'>
        <div>
          <h1>Detention Block</h1>

          <DetentionBlock />
        </div>
        <div>
          <img
            src='/detention-block.webp'
            alt='Star Wars detention block'
            title='Star Wars detention block'
            className=''
          />
        </div>
      </div>
    </>
  )
}

export default DetentionBlockUI
