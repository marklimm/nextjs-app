import Head from 'next/head'
import { GetStaticProps } from 'next'

import {
  getFilmsCache,
  getPeopleCache,
  getPlanets
} from 'dataProviders/SWAPIData'

import { Planet } from './Planet'

import styles from './index.module.scss'

const Planets = ({ planets }) => {
  return (
    <>
      <Head>
        <title>NextJS demo - Planets</title>
      </Head>
      <h2>Star Wars Planets</h2>

      <div className='mt-5'>
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
  //  retrieve all of the planets as an array
  const planets = await getPlanets()

  //  retrieve all of the people and all of the films, so that we can hydrate each of the planets.  This is what I have to do to display the related data in the search results.  This is in contrast to graphql where this would be easier
  const peopleCache = await getPeopleCache()
  const filmsCache = await getFilmsCache()

  const denormalizedPlanets = planets.map(planet => {
    return {
      ...planet,
      films: planet.films.map(filmUrl => filmsCache[filmUrl]),
      people: planet.residents.map(personUrl => peopleCache[personUrl])
    }
  })

  return {
    props: {
      planets: denormalizedPlanets
    }
  }
}

export default Planets
