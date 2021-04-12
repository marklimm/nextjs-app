import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { getSortedMarkdownFiles } from 'lib/markdownParser'
import { Event } from 'lib/types/Event'

import DisplayDate from 'components/DisplayDate/DisplayDate'

import { FilterPanel } from 'components/FilterPanel/FilterPanel'

import { useEventsFilterer } from './useEventsFilterer'

interface EventsProps {
  allEvents: Event[]
}

/**
 * This component defines the /events route, displaying the list of Star Wars events and a left-hand filter
 * @param EventsProps
 */
const Events: FunctionComponent<EventsProps> = ({ allEvents }: EventsProps) => {
  const { filterControls, filteredEvents } = useEventsFilterer(allEvents)

  return (
    <>
      <Head>
        <title>NextJS demo - Events</title>
      </Head>
      <h1>Events</h1>
      <div className='mt-2'>
        Please use the left hand sidebar to search for various events in Star
        Wars history
      </div>

      <div className='mt-2'>
        The list of filtered events and the selected filters are stored in a
        dedicated Events reducer state, which is accessed via the useReducer()
        hook
      </div>

      <div className='grid grid-cols-4 mt-4 items-start'>
        <div className='col-span-1 text-sm searchResultCard'>
          <FilterPanel filterControls={filterControls} />
        </div>

        <div className='col-span-3 ml-8'>
          {filteredEvents.length > 0 &&
            filteredEvents.map((event) => {
              return (
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
              )
            })}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allEvents = await getSortedMarkdownFiles('data/events')

  return {
    props: {
      allEvents,
    },
  }
}

export default Events
