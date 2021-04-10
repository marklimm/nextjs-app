import React, { FunctionComponent, useReducer } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { getSortedMarkdownFiles } from 'lib/markdownParser'
import DisplayDate from 'components/DisplayDate/DisplayDate'

import { EmotionTag, EmotionTagLabels, Event } from 'lib/types/Event'
import { SelectOption } from 'lib/types/SelectOption'

import {
  FilterControlType,
  FilterPanel,
} from 'components/FilterPanel/FilterPanel'

import {
  FilterActions,
  FilterReducerFactory,
} from 'components/FilterPanel/FilterReducer'

interface EventsProps {
  allEvents: Event[]
  emotionTagOptions: SelectOption[]
}

const eventFilterReducerFactory = new FilterReducerFactory<Event>()

/**
 * This component defines the /events route, displaying the list of Star Wars events and a left-hand filter
 * @param EventsProps
 */
const Events: FunctionComponent<EventsProps> = ({
  allEvents,
  emotionTagOptions,
}: EventsProps) => {
  const [
    { filteredResults: filteredEvents },
    dispatch,
  ] = useReducer(eventFilterReducerFactory.getFilterReducer(), null, () =>
    eventFilterReducerFactory.getInitialFilterState(allEvents)
  )

  const emotionTagSelected = (selectedOptions: SelectOption[]) => {
    const itemMatchesTheSelectedOption = (
      event: Event,
      selectedOption: SelectOption
    ): boolean => {
      return event.emotionTags.includes(EmotionTag[selectedOption.value])
    }

    dispatch(
      FilterActions.createOptionSelectedAction(
        selectedOptions,
        itemMatchesTheSelectedOption
      )
    )
  }

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
          {/* this <EventsFilterBar /> works but it's non-generic */}
          {/* <EventsFilterBar
            emotionTagOptions={emotionTagOptions}
            selectedEmotionTags={selectedEmotionTags}
            startDateSelected={startDateSelected}
            endDateSelected={endDateSelected}
            clearStartDate={clearStartDate}
            clearEndDate={clearEndDate}
            emotionTagSelected={emotionTagSelected}
          /> */}

          {/* trying to create a <FilterPanel /> that can be used for all the different search types */}
          <FilterPanel
            filterControls={[
              {
                type: FilterControlType.Dropdown,
                optionSelected: emotionTagSelected,
                selectOptions: emotionTagOptions,
              },
            ]}
          />
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

  const emotionTagOptions = EmotionTagLabels.map((tag) => ({
    //  capitalize the first letter and lowercase the rest of the tag
    label: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
    value: tag,
  }))

  return {
    props: {
      allEvents,
      emotionTagOptions,
    },
  }
}

export default Events
