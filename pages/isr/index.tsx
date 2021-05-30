import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { format } from 'date-fns'

import { PulseCircle } from 'components/PulseCircle/PulseCircle'

import descriptionStyle from '../index.module.scss'
// import styles from './index.module.scss'

interface ISRProps {
  localDateTimeString: string
}

const ISRUI: FunctionComponent<ISRProps> = ({ localDateTimeString }: ISRProps) => {
  return (
    <>
      <Head>
        <title>Incremental Static Regeneration</title>
        <meta
          name='description'
          content='A very basic example of incremental static regeneration in NextJS'
        ></meta>
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

        <div>This page was last updated on {localDateTimeString}</div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  //  get the UTC datetime as a string
  const utcTimeString = new Date().toISOString()

  //  convert to the local timezone
  const localDateTime = new Date(utcTimeString)

  //  format the datetime
  const localDateTimeString = format(localDateTime, 'LLLL d, yyyy pp')

  return {
    props: {
      localDateTimeString,
    },

    //  using incremental static regeneration, this page will revalidate at most once every 5 minutes (300 seconds)
    revalidate: 300,
  }
}

export default ISRUI
