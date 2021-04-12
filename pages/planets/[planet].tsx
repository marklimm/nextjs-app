import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'

import {
  getDenormalizedPlanet,
  getPlanetPaths,
} from 'dataProviders/SWAPI/Planets'
import { PlanetCard } from './PlanetCard'
import { SWAPIPlanet } from 'lib/types/SWAPI'

interface RenderPlanetProps {
  planet: SWAPIPlanet
}

const PlanetUI: FunctionComponent<RenderPlanetProps> = ({
  planet,
}: RenderPlanetProps) => {
  return (
    <>
      <Head>
        <title>Planet: {planet?.name}</title>
      </Head>
      {!planet && <div>No planet data was returned</div>}

      {planet && <PlanetCard planet={planet} />}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPlanetPaths(),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const denormalizedPlanet = getDenormalizedPlanet(
    typeof params.planet === 'string' ? params.planet : params.planet[0]
  )
  return {
    props: {
      planet: denormalizedPlanet,
    },
  }
}

export default PlanetUI
