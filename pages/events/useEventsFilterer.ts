import { useReducer } from 'react'
import { Event } from 'lib/types/Event'
import { SelectOption } from 'lib/types/SelectOption'

import {
  EventsFilterReducer,
  initialEventsFilterState,
  setStartDate,
  setEndDate,
  setEmotionTags,
} from './EventsReducer'

interface UseEventsFiltererResult {
  filteredEvents: Event[]
  selectedEmotionTags: SelectOption[]
  startDateSelected: (startDate?: string) => void
  endDateSelected: (startDate?: string) => void
  clearStartDate: () => void
  clearEndDate: () => void
  emotionTagSelected: (selectedOptions: SelectOption[]) => void
}

/**
 * A custom hook that defines the Event filtering event handlers and provides access to the current list of filtered events and the currently selected emotion tags
 * @param allEvents An array of all of the events
 */
export const useEventsFilterer = (
  allEvents: Event[]
): UseEventsFiltererResult => {
  const [state, dispatch] = useReducer(
    EventsFilterReducer,
    initialEventsFilterState,
    () => ({
      ...initialEventsFilterState,
      allEvents,
      filteredEvents: allEvents,
    })
  )

  const startDateSelected = (startDate = '') => {
    dispatch(setStartDate(startDate))
  }

  const endDateSelected = (endDate = '') => {
    dispatch(setEndDate(endDate))
  }

  const clearStartDate = () => {
    dispatch(setStartDate(null))
  }

  const clearEndDate = () => {
    dispatch(setEndDate(null))
  }

  const emotionTagSelected = (selectedOptions: SelectOption[]) => {
    dispatch(setEmotionTags(selectedOptions))
  }

  return {
    filteredEvents: state.filteredEvents,

    selectedEmotionTags: state.filters.emotionTags,

    startDateSelected,
    endDateSelected,
    clearStartDate,
    clearEndDate,
    emotionTagSelected,
  }
}
