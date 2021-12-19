import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { EmotionTagLabels, Event } from 'lib/types/Event'
import { getSortedMarkdownFiles } from 'lib/markdownParser'

import {
  FilterControl,
  FilterControlType,
  SearchType,
} from 'lib/redux/searchFilters/filterTypes'

import {
  EventFilterFields,
  EventsResults,
} from 'components/Events/EventsResults'

import { FilterPanel } from 'components/FilterPanel/FilterPanel'

import descriptionStyle from '../index.module.scss'

interface EventsProps {
  allEvents: Event[]
  filterControls: FilterControl[]
}

/**
 * This component defines the /events route, displaying the list of Star Wars events and a left-hand filter
 * @param EventsProps
 */
const Events = ({ allEvents, filterControls }: EventsProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>NextJS demo - Events</title>
        <meta
          name='description'
          content='A statically-rendered and filterable list of records created from markdown files'
        ></meta>
      </Head>
      <h1>Events</h1>

      <div className={descriptionStyle.descriptionArea}>
        <div>
          This page displays information on various events (real and made up) in
          Star Wars history!
        </div>

        <ul>
          <li>
            You have the option of searching by &quot;emotion&quot; and
            timestamp of when the event happened
          </li>

          <li>
            The list of filtered events and the selected filters are stored in a
            dedicated Events reducer state, which is accessed via the
            useReducer() hook
          </li>
          <li>
            The data is statically rendered and the server is NOT queried as the
            user is selecting filter options
          </li>
          <li>
            The same FilterPanel component renders the left-hand filter panels
            for both the /characters and /events routes
          </li>
        </ul>
      </div>

      <div className='grid grid-cols-4 mt-4 items-start'>
        <div className='col-span-1 text-sm searchResultCard'>
          <FilterPanel
            searchType={SearchType.Events}
            filterControls={filterControls}
          />
        </div>

        <div className='col-span-3 ml-8'>
          <EventsResults allEvents={allEvents} />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allEvents = await getSortedMarkdownFiles('data/events')

  const emotionTagOptions = EmotionTagLabels.map((tag) => ({
    //  capitalize the first letter and lowercase the rest of the tag
    label: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
    value: tag,
  }))

  const filterControls: FilterControl[] = [
    {
      type: FilterControlType.Dropdown,
      id: EventFilterFields.EmotionTags,
      label: 'Emotions',
      placeholder: 'Emotions',

      options: emotionTagOptions,
    },
    {
      type: FilterControlType.DateSearch,
      id: EventFilterFields.Timestamp,
      label: 'Timestamp',
    },
  ]

  return {
    props: {
      allEvents,
      filterControls,
    },
  }
}

export default Events
