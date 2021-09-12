import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { getDenormalizedStarships } from 'dataProviders/SWAPI/Starships'

import { PulseCircle } from 'components/PulseCircle/PulseCircle'
import { StarshipCard } from 'components/StarshipCard/StarshipCard'
import { SWAPIStarship } from 'lib/types/SWAPI'

import descriptionStyle from '../index.module.scss'
import styles from './index.module.scss'

interface StarShipsProps {
  starships: SWAPIStarship[]
}

const StarshipsUI: FunctionComponent<StarShipsProps> = ({
  starships,
}: StarShipsProps) => {
  return (
    <>
      <Head>
        <title>Star Wars Starships</title>
        <meta
          name='description'
          content='A statically rendered list of Star Wars API (SWAPI) data'
        ></meta>
      </Head>
      <h1>Starships</h1>

      <div className={descriptionStyle.descriptionArea}>
        <div className='flex items-center'>
          <PulseCircle />
          <span>
            This page displays information on various starships in the Star Wars
            universe!
          </span>
        </div>

        <ul>
          <li>The data is taken from the Star Wars API (https://swapi.dev/)</li>
          <li>
            A pre-build script was ran that fetch()-ed the Star Wars API data
            and then wrote the data out to JSON files (which happened 1 time).
            Then when the nextjs build happens (which happens multiple times),
            this page gets rendered at build time (static site generation) by
            reading from one of those JSON files
          </li>
          <li>
            Movies for each starship are also included in the results. This
            relational data is defined by the SWAPI API
          </li>
        </ul>
      </div>

      <div className='mt-2'>
        {starships &&
          starships.map((s) => (
            <div key={s.url}>
              <StarshipCard starship={s} labelStyle={styles.label} />
            </div>
          ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const starships = getDenormalizedStarships()

  return {
    props: {
      starships,
    },
  }
}

export default StarshipsUI
