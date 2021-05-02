import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { getDenormalizedPlanets } from 'dataProviders/SWAPI/Planets'

import { PlanetCard } from './PlanetCard'
import { SWAPIPlanet } from 'lib/types/SWAPI'

import descriptionStyle from '../index.module.scss'

interface PlanetsProps {
  planets: SWAPIPlanet[]
}

const PlanetsUI: FunctionComponent<PlanetsProps> = ({
  planets,
}: PlanetsProps) => {
  return (
    <>
      <Head>
        <title>NextJS demo - Planets</title>
      </Head>
      <h1>Planets</h1>

      <div className={descriptionStyle.descriptionArea}>
        <div>
          This page displays information on various planets in the Star Wars
          universe!
        </div>
        <ul className='mt-2'>
          <li>The data is taken from the Star Wars API (https://swapi.dev/)</li>
          <li>
            I am using a pre-build script that fetch()-es the Star Wars data
            first and writes it to JSON files. Then when the nextjs build
            happens, this page is rendered at build time (static site
            generation)
          </li>
          <li>
            Movies and residents for each planet are also included in the
            results. This relational data is defined by the SWAPI API
          </li>
        </ul>
      </div>

      <div className='mt-2'>
        {planets &&
          planets.map((p) => (
            <div key={p.url}>
              <PlanetCard planet={p} />
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

export default PlanetsUI
