//  the types of SWAPI data that I'm rendering in this app
enum SWAPIDataType {
  Films = 'films',
  People = 'people',
  Planets = 'planets',
  Starships = 'starships'
}

//  -------------------
//  get all items of a data type

//  retrieves all of the instances of one data type (people, planets, films, etc.) from the Star Wars API
export const getSWAPIDataType = async (dt: SWAPIDataType) => {
  let items = []

  let swapiData = {
    next: `https://swapi.dev/api/${dt.toString()}/`,
    results: []
  }

  do {
    console.log(`fetch(${swapiData.next})`)
    const fetchResponse = await fetch(swapiData.next)
    swapiData = await fetchResponse.json()

    items = [...items, ...swapiData.results]
  } while (!!swapiData.next)

  return items
}

//  these functions retrieve the data types as an array
export const getFilms = async () => getSWAPIDataType(SWAPIDataType.Films)
export const getPlanets = async () => getSWAPIDataType(SWAPIDataType.Planets)
export const getPeople = async () => getSWAPIDataType(SWAPIDataType.People)
export const getStarships = async () =>
  getSWAPIDataType(SWAPIDataType.Starships)

const mapper = {
  [SWAPIDataType.Films]: getFilms,
  [SWAPIDataType.Planets]: getPlanets,
  [SWAPIDataType.People]: getPeople,
  [SWAPIDataType.Starships]: getStarships
}

//  retrieves all of one data type's data in the form of a key-value object
export const getDataTypeCache = async (dataType: SWAPIDataType) => {
  //  retrieve the list of the data
  const getListOfDataType = mapper[dataType]
  const items = await getListOfDataType()

  //  convert the data from an array to an object
  const reducer = (accumulator, currentValue) => {
    accumulator[currentValue.url] = currentValue

    return accumulator
  }

  const itemsCache = items.reduce(reducer, {})
  return itemsCache
}

//  these functions retrieve the data types as an object
export const getFilmsCache = async () => getDataTypeCache(SWAPIDataType.Films)
export const getPeopleCache = async () => getDataTypeCache(SWAPIDataType.People)
export const getPlanetsCache = async () =>
  getDataTypeCache(SWAPIDataType.Planets)
export const getStarshipsCache = async () =>
  getDataTypeCache(SWAPIDataType.Starships)

//  ----------
//  get a single item of a data type

const getItem = async (dt: SWAPIDataType, searchParam: string | string[]) => {
  console.log(
    `fetch(https://swapi.dev/api/${dt.toString()}/?search=${searchParam})`
  )
  const response = await fetch(
    `https://swapi.dev/api/${dt.toString()}/?search=${searchParam}`
  )

  const itemData = await response.json()
  const item = itemData.results[0]

  return item
}

export const getSinglePlanet = async (searchParam: string | string[]) =>
  getItem(SWAPIDataType.Planets, searchParam)

//  so this seems to work, but I'm thinking this needs to be cached better because both the /planets and /planets/:id routes are retrieving every person and every film and I obviously want to make sure those calls don't happen more often than they should
//  IOW I'd want to make it so that when the site is being built that the cache for each of the data types is only built out once and then re-used every time
//  I guess the test would be to actually build the app and see how often the fetch() calls are made?
