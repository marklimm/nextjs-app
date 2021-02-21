// @ts-nocheck
//  disabling typescript for this file since I didn't bother typing the planets data that comes back from the Star Wars API

import { FunctionComponent } from 'react'
import Link from 'next/link'
import DisplayDate from 'components/DisplayDate/DisplayDate'

import styles from './index.module.scss'

interface PlanetsProps {
  planet: {}
}

export const Planet: FunctionComponent<PlanetsProps> = ({ planet }) => {
  return (
    <div className='searchResultCard text-sm'>
      <Link href={`/planets/${planet.name.toLowerCase()}`}>
        <a className='text-lg font-semibold'>{planet.name}</a>
      </Link>

      <div className='grid grid-cols-3 mt-2'>
        <div>
          <span className={styles.label}>Climate:</span> {planet.climate}
        </div>

        <div>
          <span className={styles.label}>Diameter:</span> {planet.diameter}
        </div>
        <div>
          <span className={styles.label}>Gravity:</span> {planet.gravity}
        </div>
        <div>
          <span className={styles.label}>Orbital Period:</span>
          {planet.orbital_period}
        </div>
        <div>
          <span className={styles.label}>Population:</span> {planet.population}
        </div>
        <div>
          <span className={styles.label}>Rotation Period:</span>{' '}
          {planet.rotation_period}
        </div>
        <div>
          <span className={styles.label}>Surface Water:</span>{' '}
          {planet.surface_water}
        </div>
        <div>
          <span className={styles.label}>Terrain:</span> {planet.terrain}
        </div>
      </div>

      <div className='grid grid-cols-2 mt-4'>
        <div>
          {planet.people.length > 0 && (
            <>
              <span className={styles.label}>Residents:</span>
              <br />
              {planet.people.map(person => (
                <div key={person.url}>{person.name}</div>
              ))}
            </>
          )}
        </div>
        <div>
          {planet.films.length > 0 && (
            <>
              <span className={styles.label}>Appeared in:</span>
              <br />
              {planet.films.map(f => (
                <div key={f.url}>
                  {f.title} - <DisplayDate dateString={f.release_date} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
