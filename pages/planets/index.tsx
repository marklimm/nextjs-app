import Head from 'next/head'
import { GetStaticProps } from 'next'

import { getDenormalizedPlanets } from 'dataProviders/SWAPI/Planets'

import { Planet } from './Planet'

import styles from './index.module.scss'

const Planets = ({ planets }) => {
  return (
    <>
      <Head>
        <title>NextJS demo - Planets</title>
      </Head>
      <h1>Planets</h1>

      <div className=''>
        {planets &&
          planets.map(p => (
            <div key={p.url}>
              <Planet planet={p} />
            </div>
          ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const denormalizedPlanets = getDenormalizedPlanets()

  return {
    props: {
      planets: denormalizedPlanets
    }
  }
}

export default Planets
