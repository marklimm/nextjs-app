import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { getStarships } from 'dataProviders/SWAPIData'

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
  const starships = await getStarships()

  return {
    props: {
      starships
    }
  }
}

export default Starships
