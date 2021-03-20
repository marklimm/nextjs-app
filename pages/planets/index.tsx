import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { getDenormalizedPlanets } from 'dataProviders/SWAPI/Planets'

import { Planet } from './Planet'
import { SWAPIPlanet } from 'lib/types/SWAPI'

interface PlanetsProps {
  planets: SWAPIPlanet[]
}

const Planets: FunctionComponent<PlanetsProps> = ({
  planets,
}: PlanetsProps) => {
  return (
    <>
      <Head>
        <title>NextJS demo - Planets</title>
      </Head>
      <h1>Planets</h1>

      <div className=''>
        {planets &&
          planets.map((p) => (
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
      planets: denormalizedPlanets,
    },
  }
}

export default Planets
