import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { allOption } from 'lib/types/Task'

import {
  CharacterFilterFields,
  EventFilterFields,
  FilterControlType,
  SearchType,
  TaskFilterFields,
} from './filterTypes'
import {
  DateFilterState,
  DropdownFilterState,
  FilterActionType,
  FilterState,
  ListBoxFilterState,
  ResetFiltersPayload,
  SearchFilterPayload,
  TextFilterState,
} from './searchFilterReducerTypes'

/**
 * This non-generic searchFilterReducer.ts file stores the state of all the different search types
 */
const initialState: FilterState = {
  [SearchType.Characters]: {
    filterControlValues: [
      {
        type: FilterControlType.Dropdown,
        id: CharacterFilterFields.CharacterTags,
        selectedOptions: [],
      },
      {
        type: FilterControlType.Dropdown,
        id: CharacterFilterFields.Friends,
        selectedOptions: [],
      },
      {
        type: FilterControlType.Text,
        id: CharacterFilterFields.Name,
        value: '',
      },
      {
        type: FilterControlType.Text,
        id: CharacterFilterFields.Bio,
        value: '',
      },
    ],
  },
  [SearchType.Events]: {
    filterControlValues: [
      {
        type: FilterControlType.Dropdown,
        id: EventFilterFields.EmotionTags,
        selectedOptions: [],
      },
      {
        type: FilterControlType.DateSearch,
        id: EventFilterFields.Timestamp,
        endDate: '',
        startDate: '',
      },
    ],
  },
  [SearchType.Tasks]: {
    //  the ListBox filter control is unique in that it gets put into filter state by default and remains in filter state
    filterControlValues: [
      {
        type: FilterControlType.Text,
        id: TaskFilterFields.Title,
        value: '',
      },
      {
        type: FilterControlType.Dropdown,
        id: TaskFilterFields.Assignee,
        selectedOptions: [],
      },
      {
        type: FilterControlType.Dropdown,
        id: TaskFilterFields.TShirtSize,
        selectedOptions: [],
      },
      {
        type: FilterControlType.ListBox,
        id: TaskFilterFields.Completed,
        selectedOption: allOption,
      },
    ],
  },
}

/**
 * This reducer is used to reset all the filters back to their default values
 * @param state
 * @param action
 */
export const resetFiltersReducer = (
  state: FilterState,
  action: PayloadAction<ResetFiltersPayload>
): void => {
  const searchTypeFilterState = state[action.payload.searchType]

  searchTypeFilterState.filterControlValues.forEach((fc) => {
    switch (fc.type) {
      case FilterControlType.Text:
        fc.value = ''
        break

      case FilterControlType.ListBox:
        fc.selectedOption = allOption
        break

      case FilterControlType.Dropdown:
        fc.selectedOptions = []
        break

      case FilterControlType.DateSearch:
        fc.endDate = fc.startDate = ''
        break
    }
  })
}

/**
 * This reducer updates the state of the search filter options.  We're using createSlice() so state is changed by directly setting the properties
 * @param state
 * @param action
 * @returns
 */
export const updateFilterReducer = (
  state: FilterState,
  action: PayloadAction<SearchFilterPayload>
): void => {
  const searchTypeFilterState = state[action.payload.searchType]

  const filterToUpdate = searchTypeFilterState.filterControlValues.find(
    (fc) => fc.id === action.payload.id
  )
  switch (action.payload.filterActionType) {
    case FilterActionType.OptionSelected:
      filterToUpdate.type = FilterControlType.Dropdown
      ;(filterToUpdate as DropdownFilterState).selectedOptions =
        action.payload.value
      break

    case FilterActionType.RadioOptionSelected:
      filterToUpdate.type = FilterControlType.ListBox
      ;(filterToUpdate as ListBoxFilterState).selectedOption =
        action.payload.value
      break

    case FilterActionType.TextChanged:
      filterToUpdate.type = FilterControlType.Text
      ;(filterToUpdate as TextFilterState).value = action.payload.value
      break

    case FilterActionType.DateSelectedStart:
      filterToUpdate.type = FilterControlType.DateSearch
      ;(filterToUpdate as DateFilterState).startDate = action.payload.value
      break

    case FilterActionType.DateSelectedEnd:
      filterToUpdate.type = FilterControlType.DateSearch
      ;(filterToUpdate as DateFilterState).endDate = action.payload.value
      break
  }
}

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    resetFilters: resetFiltersReducer,
    updateFilter: updateFilterReducer,
  },
})

export const { resetFilters, updateFilter } = searchFilterSlice.actions

export default searchFilterSlice.reducer
