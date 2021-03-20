import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { getDenormalizedStarships } from 'dataProviders/SWAPI/Starships'

import { PulseCircle } from 'components/PulseCircle/PulseCircle'
import { Starship } from './Starship'
import { SWAPIStarship } from 'lib/types/SWAPI'

interface StarShipsProps {
  starships: SWAPIStarship[]
}

const Starships: FunctionComponent<StarShipsProps> = ({
  starships,
}: StarShipsProps) => {
  return (
    <>
      <Head>
        <title>Star Wars Starships</title>
      </Head>
      <h1>Starships</h1>
      <div className='flex items-center'>
        <PulseCircle />
        <span>
          This page uses getServerSideProps(), meaning it will re-render for
          each server request
        </span>
      </div>
      <div className='mt-2'>
        {starships &&
          starships.map((s) => (
            <div key={s.url}>
              <Starship starship={s} />
            </div>
          ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const starships = getDenormalizedStarships()

  return {
    props: {
      starships,
    },
  }
}

export default Starships
