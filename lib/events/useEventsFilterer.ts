import { useReducer } from 'react'

import { EmotionTag, EmotionTagLabels, Event } from 'lib/types/Event'

import { SelectOption } from 'lib/types/SelectOption'

import {
  FilterActions,
  FilterReducerFactory,
} from 'components/FilterPanel/FilterReducer'

import {
  DateSearchFilter,
  DropdownFilter,
  FilterControl,
  FilterControlType,
} from 'components/FilterPanel/FilterTypes'

interface UseEventsFiltererResult {
  filteredEvents: Event[]
  filterControls: FilterControl[]
}

const emotionTagOptions = EmotionTagLabels.map((tag) => ({
  //  capitalize the first letter and lowercase the rest of the tag
  label: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
  value: tag,
}))

enum FilteringOn {
  EmotionTags = 'emotion-tags',
  Timestamp = 'timestamp',
}

const filterControls: FilterControl[] = [
  {
    type: FilterControlType.Dropdown,
    id: FilteringOn.EmotionTags,
    label: 'Emotions',
    placeholder: 'Emotions',

    selectOptions: emotionTagOptions,
  },
  {
    type: FilterControlType.DateSearch,
    id: FilteringOn.Timestamp,
    label: 'Timestamp',
  },
]

const eventFilterReducerFactory = new FilterReducerFactory<Event>()

/**
 * A custom hook that defines the Event filtering event handlers and provides access to the current list of filtered events and the currently selected emotion tags
 * @param allEvents An array of all of the events
 */
export const useEventsFilterer = (
  allEvents: Event[]
): UseEventsFiltererResult => {
  const [
    { filteredResults: filteredEvents },
    dispatch,
  ] = useReducer(eventFilterReducerFactory.filterReducer, null, () =>
    eventFilterReducerFactory.getInitialState(allEvents, filterControls)
  )

  const emotionTagSelected = (selectedOptions: SelectOption[]) => {
    const itemMatchesTheSelectedOption = (
      event: Event,
      selectedOption: SelectOption
    ): boolean => {
      return event.emotionTags.includes(EmotionTag[selectedOption.value])
    }

    dispatch(
      FilterActions.optionSelected(
        FilteringOn.EmotionTags,
        selectedOptions,
        itemMatchesTheSelectedOption
      )
    )
  }

  const startDateSelected = (startDate = '') => {
    dispatch(FilterActions.setStartDate(FilteringOn.Timestamp, startDate))
  }

  const endDateSelected = (endDate = '') => {
    dispatch(FilterActions.setEndDate(FilteringOn.Timestamp, endDate))
  }

  const clearStartDate = () => {
    dispatch(FilterActions.setStartDate(FilteringOn.Timestamp, null))
  }

  const clearEndDate = () => {
    dispatch(FilterActions.setEndDate(FilteringOn.Timestamp, null))
  }

  //  I'm not sure if there is a better way of handling this.  Below I'm specifying the filter controls to pass into <FilterPanel /> because I don't have the event handlers themselves until this point.  There probably is a better way of handling this.  This is because I have to define useReducer() (a react hook) at the top of the function, and I don't get the dispatch object until after that useReducer() returns, and the dispatch is needed to define the event handlers
  const emotionTagFilter = filterControls[0] as DropdownFilter
  emotionTagFilter.optionSelected = emotionTagSelected

  const timestampFilter = filterControls[1] as DateSearchFilter
  timestampFilter.startDateSelected = startDateSelected
  timestampFilter.endDateSelected = endDateSelected
  timestampFilter.clearStartDate = clearStartDate
  timestampFilter.clearEndDate = clearEndDate

  return {
    filteredEvents,
    filterControls,
  }
}
