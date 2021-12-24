import React from 'react'

import { EmotionTag, Event } from 'lib/types/Event'
import {
  EventFilterFields,
  FilterControlType,
  SearchType,
} from 'lib/redux/searchFilters/filterTypes'
import { useAppSelector } from 'lib/redux/hooks'

import DisplayDate from 'components/DisplayDate/DisplayDate'

export interface EventsResultsProps {
  allEvents: Event[]
}

export const EventsResults = ({
  allEvents,
}: EventsResultsProps): JSX.Element => {
  let filteredEvents = allEvents

  const { filterControlValues } = useAppSelector((state) => {
    return state.searchFilter[SearchType.Events]
  })

  /**
   * This function filters the events based on the values in `filterControlValues`
   */
  const filterResults = () => {
    filterControlValues.forEach((filterControl) => {
      switch (filterControl.type) {
        case FilterControlType.Dropdown: {
          //  if there are no filter options selected --> return all events
          if (filterControl.selectedOptions.length === 0) {
            break
          }

          filteredEvents = filteredEvents.filter((event) => {
            if (filterControl.id === EventFilterFields.EmotionTags) {
              const matchingEmotions = filterControl.selectedOptions.filter(
                (selectedOption) => {
                  return event.emotionTags.includes(
                    EmotionTag[selectedOption.value]
                  )
                }
              )

              return matchingEmotions.length > 0
            }
          })

          break
        }

        case FilterControlType.DateSearch: {
          if (filterControl.startDate) {
            filteredEvents = filteredEvents.filter(
              (e: { date: string }) => e.date > filterControl.startDate
            )
          }

          if (filterControl.endDate) {
            filteredEvents = filteredEvents.filter(
              (e: { date: string }) => e.date < filterControl.endDate
            )
          }

          break
        }
      }
    })
  }

  if (filterControlValues.length > 0) {
    filterResults()
  }

  return (
    <>
      {filteredEvents &&
        filteredEvents.map((event) => (
          <div key={event.id} className='searchResultCard'>
            <div className='text-lg'>{event.title}</div>
            <div className='text-sm text-red-600'>
              <DisplayDate dateString={event.date} />
            </div>
            Tags: {event.emotionTags.join(', ')}
            <div
              className={`markdownContent text-sm mt-2`}
              dangerouslySetInnerHTML={{ __html: event.contentHtml }}
            />
          </div>
        ))}
    </>
  )
}
