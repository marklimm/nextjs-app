import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import {
  getFilmsCache,
  getPeopleCache,
  getPlanets,
  getSinglePlanet
} from 'dataProviders/SWAPIData'

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
  const planets = await getPlanets()

  const planetPaths = planets.map(p => `/planets/${p.name.toLowerCase()}/`)
  return {
    paths: planetPaths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const planet = await getSinglePlanet(params.planet)

  //  retrieve all of the people and all of the films, so that we can hydrate each of the planets.  This is what I have to do to display the related data in the search results.  This is in contrast to graphql where this would be easier
  const peopleCache = await getPeopleCache()
  const filmsCache = await getFilmsCache()

  const denormalizedPlanet = {
    ...planet,
    films: planet.films.map(filmUrl => filmsCache[filmUrl]),
    people: planet.residents.map(personUrl => peopleCache[personUrl])
  }

  return {
    props: {
      planet: denormalizedPlanet
    }
  }
}

export default RenderPlanet
