import fs from 'fs'
import { SWAPIObject, SWAPIStarship } from 'lib/types/SWAPI'

/**
 * Reads in the SWAPI Planets data from the JSON files that were built up by the pre-build script
 */
const getStarshipsData = () => {
  //  read the Star Wars API data from the JSON files that were built prior to the build.  The file path I need to pass in is relative to the root of this website, not this particular page
  let starshipsRaw = fs.readFileSync('pre-build/swapi-starships.json')
  let filmsRaw = fs.readFileSync('pre-build/swapi-films.json')

  const starshipsObj = JSON.parse(starshipsRaw.toString()) as SWAPIObject
  const filmsObj = JSON.parse(filmsRaw.toString())

  return {
    starshipsObj,
    filmsObj
  }
}

/**
 * This function returns all of the SWAPI starships
 */
export const getDenormalizedStarships = () => {
  const { starshipsObj, filmsObj } = getStarshipsData()

  const starships = Object.keys(starshipsObj).map(key => {
    const starship = starshipsObj[key] as SWAPIStarship

    return {
      ...starship,
      films: starship.films.map(starshipUrl => filmsObj[starshipUrl])
    }
  })

  return starships
}
