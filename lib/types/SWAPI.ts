/**
 * Planet data from the Star Wars API
 */
export interface SWAPIPlanet {
  name: string
  films: string[]
  residents: string[]
}

/**
 * Starship data from the Star Wars API
 */
export interface SWAPIStarship {
  name: string
  films: string[]
}

/**
 * The key-value object that contains many SWAPIPlanet(s) / SWAPIStarship(s)
 */
export interface SWAPIObject {
  [key: string]: SWAPIPlanet | SWAPIStarship
}
