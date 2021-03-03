import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'

import {
  getDenormalizedPlanet,
  getPlanetPaths
} from 'dataProviders/SWAPI/Planets'
import { Planet } from './Planet'

const RenderPlanet = ({ planet }) => {
  return (
    <>
      <Head>
        <title>Planet: {planet?.name}</title>
      </Head>
      {!planet && <div>No planet data was returned</div>}

      {planet && <Planet planet={planet} />}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPlanetPaths(),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const denormalizedPlanet = getDenormalizedPlanet(params.planet)
  return {
    props: {
      planet: denormalizedPlanet
    }
  }
}

export default RenderPlanet
