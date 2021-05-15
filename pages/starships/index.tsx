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
            I am using a pre-build script that fetch()-es the Star Wars data
            first and writes it to JSON files. Then when the nextjs build
            happens, this page is rendered at build time (static site
            generation)
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
