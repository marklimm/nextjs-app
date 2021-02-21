import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

import { PulseCircle } from 'components/PulseCircle/PulseCircle'

import { Starship } from './Starship'

import styles from './index.module.scss'

const Starships = ({ starships }) => {
  return (
    <>
      <Head>
        <title>Star Wars Starships</title>
      </Head>
      <h2>Star Wars Starships</h2>
      <div className='flex items-center'>
        <PulseCircle />
        <span>
          This page uses getServerSideProps(), meaning it will re-render for
          each server request
        </span>
      </div>
      <div className='mt-5'>
        {starships &&
          starships.map(s => (
            <div key={s.url}>
              <Starship starship={s} />
            </div>
          ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const fetch1 = await fetch('https://swapi.dev/api/starships/')
  const page1Response = await fetch1.json()

  const fetch2 = await fetch(page1Response.next)
  const page2Response = await fetch2.json()

  return {
    props: {
      starships: [...page1Response.results, ...page2Response.results]
    }
  }
}

export default Starships
