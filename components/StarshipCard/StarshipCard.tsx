import React, { FunctionComponent } from 'react'

import DisplayDate from 'components/DisplayDate/DisplayDate'

import { SWAPIStarship } from 'lib/types/SWAPI'

interface StarshipCardProps {
  labelStyle: string
  starship: SWAPIStarship
}

export const StarshipCard: FunctionComponent<StarshipCardProps> = ({
  labelStyle,
  starship,
}: StarshipCardProps) => {
  return (
    <div className='searchResultCard'>
      <span className='text-lg font-semibold'>{starship.name}</span>

      <br />
      <span>Manufacturer: {starship.manufacturer}</span>
      <div className='grid grid-cols-3 mt-4 text-sm'>
        <div>
          <span className={labelStyle}>Cost:</span> {starship.cost_in_credits}
        </div>

        <div>
          <span className={labelStyle}>Crew:</span> {starship.crew}
        </div>
        <div>
          <span className={labelStyle}>Passengers:</span> {starship.passengers}
        </div>
        <div>
          <span className={labelStyle}>Cargo Capacity:</span>{' '}
          {starship.cargo_capacity}
        </div>
        <div>
          <span className={labelStyle}>Consumables:</span>{' '}
          {starship.consumables}
        </div>
        <div>
          <span className={labelStyle}>Hyperdrive Rating:</span>{' '}
          {starship.hyperdrive_rating}
        </div>
        <div>
          <span className={labelStyle}>Length:</span> {starship.length}
        </div>
        <div>
          <span className={labelStyle}>Max speed:</span>{' '}
          {starship.max_atmosphering_speed}
        </div>
        <div>
          <span className={labelStyle}>Starship class:</span>{' '}
          {starship.starship_class}
        </div>
      </div>

      <div className='grid grid-cols-2 mt-4 text-sm'>
        <div></div>
        <div>
          {starship.films.length > 0 && (
            <>
              <span className={labelStyle}>Appeared in:</span>
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
