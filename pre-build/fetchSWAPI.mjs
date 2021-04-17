'use strict'
import fs from 'fs'
import fetch from 'node-fetch'

/**
 * This is a "pre-build" NodeJS script that is meant to be run before this NextJS app is built.  This script fetches Star Wars data from the Star Wars API and writes the data to JSON files in this directory.  The JSON files are then read from when the NextJS app is statically built
 */

/**
 * The SWAPI data types that I want to retrieve and that are used by my NextJS app
 */
const SWAPIDdataTypes = ['films', 'people', 'planets', 'starships']

/**
 * This function returns an array of the complete set of one of the SWAPI data types
 * @param {string} swapiDataType The string type of SWAPI data (films, planets, starships, etc.)
 */
const getSWAPIDataType = async (swapiDataType) => {
  let items = []

  let swapiData = {
    next: `https://swapi.dev/api/${swapiDataType}/`,
    results: [],
  }

  do {
    console.log(`fetch(${swapiData.next})`)
    const fetchResponse = await fetch(swapiData.next)
    swapiData = await fetchResponse.json()
    items = [...items, ...swapiData.results]
  } while (swapiData.next)

  return items
}

/**
 * This function retrieves all of one data type's data in the form of a key-value object
 * @param {string} dataType The string type of SWAPI data (films, planets, starships, etc.)
 */
const getDataTypeCache = async (dataType = 'films') => {
  //  retrieve the list of the data
  const items = await getSWAPIDataType(dataType)

  //  convert the data from an array to an object
  const reducer = (accumulator, currentValue) => {
    accumulator[currentValue.url] = currentValue

    return accumulator
  }

  const itemsCache = items.reduce(reducer, {})
  return itemsCache
}

/**
 * This function queries the SWAPI API and writes out the results to individual JSON files
 */
const getSWAPIDataAndWriteToFiles = () => {
  SWAPIDdataTypes.forEach(async (key) => {
    const data = await getDataTypeCache(key)

    //  the 3rd parameter is used to insert white space to make the resulting string easier to read
    const output = JSON.stringify(data, null, 2)

    fs.writeFileSync(`pre-build/swapi-${key}.json`, output)
  })
}

getSWAPIDataAndWriteToFiles()
