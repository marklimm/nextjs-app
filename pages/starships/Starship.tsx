// @ts-nocheck
//  disabling typescript for this file since I didn't bother typing the starships data that comes back from the Star Wars API

import { FunctionComponent } from 'react'

import styles from './index.module.scss'

interface StarshipProps {
  starship: {}
}

export const Starship: FunctionComponent<StarshipProps> = ({ starship }) => {
  return (
    <div className='searchResultCard'>
      <span className='text-lg font-semibold'>{starship.name}</span>

      <br />
      <span>Manufacturer: {starship.manufacturer}</span>
      <div className='grid grid-cols-3 mt-4'>
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
    </div>
  )
}
