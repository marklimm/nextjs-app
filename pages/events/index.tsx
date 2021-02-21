import Head from 'next/head'
import { GetStaticProps } from 'next'
import { FunctionComponent, useEffect, useState } from 'react'

import { getSortedMarkdownFiles } from 'lib/markdownParser'
import DisplayDate from 'components/DisplayDate/DisplayDate'
import { Event } from 'lib/types/Event'

// import { EventsFilterBar } from 'components/FilterBar/EventsFilterBar'

interface EventsProps {
  allEvents: Event[]
}

const Events: FunctionComponent<EventsProps> = ({ allEvents }) => {
  const [events, setEvents] = useState(allEvents)

  const onFilterUpdated = (filteredEvents: Event[]) => {
    setEvents(filteredEvents)
  }

  return (
    <>
      <Head>
        <title>Star Wars Events</title>
      </Head>
      <h1 className='text-3xl'>Star Wars Events</h1>
      <div>
        Please use the left hand sidebar to search for various events in Star
        Wars history
      </div>

      <div className='grid grid-cols-4 mt-4 items-start'>
        <div className='col-span-1 text-sm searchResultCard'>
          {/* <EventsFilterBar
            allEvents={allEvents}
            onFilterUpdated={onFilterUpdated}
          /> */}
        </div>

        <div className='col-span-3 ml-8'>
          {events.length > 0 &&
            events.map(event => {
              return (
                <div key={event.id} className='searchResultCard'>
                  <div className='text-lg'>{event.title}</div>
                  <div className='text-sm text-blue-500'>
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
      allEvents
    }
  }
}

export default Events
