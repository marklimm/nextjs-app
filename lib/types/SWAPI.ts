/**
 * Planet data from the Star Wars API
 */
export interface SWAPIPlanet {
  name: string

  //  films is an array of film urls, while filmsObjects is the SWAPIFilm type
  films: string[]
  filmsObjects: SWAPIFilm[]

  //  residents is an array of SWAPI person urls, while people is the SWAPIPerson type
  residents: string[]
  people: SWAPIPerson[]

  climate: string
  diameter: string
  gravity: string
  orbital_period: string
  population: string
  rotation_period: string
  surface_water: string
  terrain: string
  url: string
}

/**
 * Starship data from the Star Wars API
 */
export interface SWAPIStarship {
  name: string

  //  films is an array of film urls, while filmsObjects is the SWAPIFilm type
  films: string[]
  filmsObjects: SWAPIFilm[]

  manufacturer: string
  cost_in_credits: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  length: string
  max_atmosphering_speed: string
  starship_class: string
  url: string
}

interface SWAPIPerson {
  url: string
  name: string
}

interface SWAPIFilm {
  url: string
  title: string
  release_date: string
}

/**
 * The key-value object that contains many SWAPIPlanet(s) / SWAPIStarship(s)
 */
export interface SWAPIObject {
  [key: string]: SWAPIPlanet | SWAPIStarship
}
