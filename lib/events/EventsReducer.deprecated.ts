//  This file is no longer being used, but I've kept it as an example of a non-generic search filter

import { SelectOption } from 'lib/types/SelectOption'
import { EmotionTag, Event } from 'lib/types/Event'

//  This non-generic implementation of EventsReducer is no longer being used, this has been replaced with FilterReducer.  I'm keeping this file for reference though

/**
 * The part of EventsState that stores the currently selected filters
 */
interface EventsFilterState {
  startDate: string
  endDate: string

  emotionTags: SelectOption[]
}

/**
 * Events state, including all of the events, the currently filtered events, and all of the filters
 */
interface EventsState {
  allEvents: Event[]
  filteredEvents: Event[]

  filters: EventsFilterState
}

export const initialEventsFilterState: EventsState = {
  allEvents: [],
  filteredEvents: [],

  filters: {
    startDate: null,
    endDate: null,

    emotionTags: [],
  },
}

/**
 * A type of event filter action
 */
enum EventsFilterActionType {
  SetStartDate = 'set-start-date',
  SetEndDate = 'set-end-date',
  SetEmotionTags = 'set-emotion-tags',
}

interface SetStartDateAction {
  type: EventsFilterActionType.SetStartDate
  payload: {
    startDate: string
  }
}

interface SetEndDateAction {
  type: EventsFilterActionType.SetEndDate
  payload: {
    endDate: string
  }
}

interface SetEmotionTagsAction {
  type: EventsFilterActionType.SetEmotionTags
  payload: {
    emotionTags: SelectOption[]
  }
}

/**
 * An action that can be dispatch()-ed for the Events reducer
 */
type EventsFilterAction =
  | SetStartDateAction
  | SetEndDateAction
  | SetEmotionTagsAction

/**
 * The action creator for the SetStartDateAction
 * @param startDate
 */
export const setStartDate = (startDate = ''): SetStartDateAction => ({
  type: EventsFilterActionType.SetStartDate,
  payload: {
    startDate,
  },
})

/**
 * The action creator for the SetEndDateAction
 * @param endDate
 */
export const setEndDate = (endDate = ''): SetEndDateAction => ({
  type: EventsFilterActionType.SetEndDate,
  payload: {
    endDate,
  },
})

/**
 * The action creator for the SetEmotionTagsAction
 * @param emotionTags
 */
export const setEmotionTags = (
  emotionTags: SelectOption[]
): SetEmotionTagsAction => ({
  type: EventsFilterActionType.SetEmotionTags,
  payload: {
    emotionTags,
  },
})

/**
 * This function takes the current Events state and the updated filter state, runs the filters against the complete list of events, and returns the updated Events state
 * @param state
 */
const getUpdatedEventsState = (
  state: EventsState,
  filterState: EventsFilterState
): EventsState => {
  let filteredEvents = state.allEvents

  if (filterState.startDate) {
    filteredEvents = filteredEvents.filter(
      (e) => e.date > filterState.startDate
    )
  }

  if (filterState.endDate) {
    filteredEvents = filteredEvents.filter((e) => e.date < filterState.endDate)
  }

  if (filterState.emotionTags.length > 0) {
    filteredEvents = filteredEvents.filter((event) => {
      //  search for a match between the array of selected emotion tags and the array of tags on the current event
      const matchesWithSelectedTags = filterState.emotionTags.filter(
        (selectedEmotionTag) =>
          event.emotionTags.includes(EmotionTag[selectedEmotionTag.value])
      )

      return matchesWithSelectedTags.length > 0
    })
  }

  return {
    ...state,
    filteredEvents,

    filters: filterState,
  }
}

export const EventsFilterReducer = (
  state: EventsState,
  action: EventsFilterAction
): EventsState => {
  switch (action.type) {
    case EventsFilterActionType.SetStartDate:
      return getUpdatedEventsState(state, {
        ...state.filters,
        startDate: (action as SetStartDateAction).payload.startDate,
      })

    case EventsFilterActionType.SetEndDate:
      return getUpdatedEventsState(state, {
        ...state.filters,
        endDate: (action as SetEndDateAction).payload.endDate,
      })

    case EventsFilterActionType.SetEmotionTags:
      return getUpdatedEventsState(state, {
        ...state.filters,
        emotionTags: (action as SetEmotionTagsAction).payload.emotionTags,
      })
  }
}
