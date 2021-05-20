import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { PulseCircle } from 'components/PulseCircle/PulseCircle'

import descriptionStyle from '../index.module.scss'
// import styles from './index.module.scss'

interface ISRProps {
  timestamp: string
}

const ISRUI: FunctionComponent<ISRProps> = ({ timestamp }: ISRProps) => {
  return (
    <>
      <Head>
        <title>Incremental Static Regeneration</title>
      </Head>
      <h1>Incremental Static Regeneration</h1>

      <div className={descriptionStyle.descriptionArea}>
        <div className='flex items-center'>
          <PulseCircle />
          <span>
            This page retrieves a timestamp using incremental static
            regeneration
          </span>
        </div>

        <div>This page was last updated on {timestamp}</div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const timestamp = new Date().toLocaleString()

  return {
    props: {
      timestamp,
    },

    //  using incremental static regeneration, this page will revalidate at most once every 5 minutes (300 seconds)
    revalidate: 300,
  }
}

export default ISRUI
