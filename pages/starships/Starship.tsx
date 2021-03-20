import React, { FunctionComponent } from 'react'

import DisplayDate from 'components/DisplayDate/DisplayDate'

import styles from './index.module.scss'
import { SWAPIStarship } from 'lib/types/SWAPI'

interface StarshipProps {
  starship: SWAPIStarship
}

export const Starship: FunctionComponent<StarshipProps> = ({
  starship,
}: StarshipProps) => {
  return (
    <div className='searchResultCard'>
      <span className='text-lg font-semibold'>{starship.name}</span>

      <br />
      <span>Manufacturer: {starship.manufacturer}</span>
      <div className='grid grid-cols-3 mt-4 text-sm'>
        <div>
          <span className={styles.label}>Cost:</span> {starship.cost_in_credits}
        </div>

        <div>
          <span className={styles.label}>Crew:</span> {starship.crew}
        </div>
        <div>
          <span className={styles.label}>Passengers:</span>{' '}
          {starship.passengers}
        </div>
        <div>
          <span className={styles.label}>Cargo Capacity:</span>{' '}
          {starship.cargo_capacity}
        </div>
        <div>
          <span className={styles.label}>Consumables:</span>{' '}
          {starship.consumables}
        </div>
        <div>
          <span className={styles.label}>Hyperdrive Rating:</span>{' '}
          {starship.hyperdrive_rating}
        </div>
        <div>
          <span className={styles.label}>Length:</span> {starship.length}
        </div>
        <div>
          <span className={styles.label}>Max speed:</span>{' '}
          {starship.max_atmosphering_speed}
        </div>
        <div>
          <span className={styles.label}>Starship class:</span>{' '}
          {starship.starship_class}
        </div>
      </div>

      <div className='grid grid-cols-2 mt-4 text-sm'>
        <div></div>
        <div>
          {starship.films.length > 0 && (
            <>
              <span className={styles.label}>Appeared in:</span>
              <br />
              {starship.filmsObjects.map((f) => (
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
