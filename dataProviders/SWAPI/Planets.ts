import fs from 'fs'
import { SWAPIObject, SWAPIPlanet } from 'lib/types/SWAPI'

/**
 * Retrieves the planet paths information necessary for getStaticPaths()
 */
export const getPlanetPaths = () => {
  const planetsRaw = fs.readFileSync('pre-build/swapi-planets.json')
  const planetsObj = JSON.parse(planetsRaw.toString())

  const planetPaths = Object.keys(planetsObj).map(key => {
    const planet = planetsObj[key]
    return `/planets/${planet.name.toLowerCase()}/`
  })

  return planetPaths
}

/**
 * Reads in the SWAPI Planets data from the JSON files that were built up by the pre-build script
 */
const getPlanetsData = () => {
  //  read the Star Wars API data from the JSON files that were built prior to the build.  The file path I need to pass in is relative to the root of this website, not this particular page
  let planetsRaw = fs.readFileSync('pre-build/swapi-planets.json')
  let filmsRaw = fs.readFileSync('pre-build/swapi-films.json')
  let peopleRaw = fs.readFileSync('pre-build/swapi-people.json')

  const planetsObj = JSON.parse(planetsRaw.toString()) as SWAPIObject
  const filmsObj = JSON.parse(filmsRaw.toString())
  const peopleObj = JSON.parse(peopleRaw.toString())

  return {
    planetsObj,
    filmsObj,
    peopleObj
  }
}

/**
 * This function returns an individual SWAPI planet, along with its related films and residents/people data
 * @param planetParam The planet search parameter
 */
export const getDenormalizedPlanet = planetParam => {
  const { planetsObj, filmsObj, peopleObj } = getPlanetsData()

  const planet = Object.values(planetsObj).find(
    p => p.name.toLowerCase() === planetParam
  ) as SWAPIPlanet

  const denormalizedPlanet = {
    ...planet,
    films: planet.films.map(filmUrl => filmsObj[filmUrl]),
    people: planet.residents.map(personUrl => peopleObj[personUrl])
  }

  return denormalizedPlanet
}

/**
 * This function returns all of the SWAPI planets, including each planet's films and residents/people data
 */
export const getDenormalizedPlanets = () => {
  const { planetsObj, filmsObj, peopleObj } = getPlanetsData()

  const denormalizedPlanets = Object.keys(planetsObj).map(key => {
    const planet = planetsObj[key] as SWAPIPlanet

    return {
      ...planet,
      films: planet.films.map(filmUrl => filmsObj[filmUrl]),
      people: planet.residents.map(personUrl => peopleObj[personUrl])
    }
  })

  return denormalizedPlanets
}
