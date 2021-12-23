import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { allOption } from 'lib/types/Task'

import { FilterControlType, SearchType, TaskFilterFields } from './filterTypes'
import {
  DateFilterState,
  DropdownFilterState,
  FilterActionType,
  FilterControlState,
  FilterState,
  ListBoxFilterState,
  SearchFilterPayload,
  TextFilterState,
} from './searchFilterReducerTypes'

/**
 * This non-generic searchFilterReducer.ts file stores the state of all the different search types
 */
const initialState: FilterState = {
  [SearchType.Characters]: {
    filterControlValues: [],
  },
  [SearchType.Events]: {
    filterControlValues: [],
  },
  [SearchType.Tasks]: {
    //  the ListBox filter control is unique in that it gets put into filter state by default and remains in filter state
    filterControlValues: [
      {
        type: FilterControlType.ListBox,
        id: TaskFilterFields.Completed,
        selectedOption: allOption,
      },
    ],
  },
}

/**
 * This function changes the redux state.  We're using createSlice() so state is changed by directly setting the properties
 * @param filterToUpdate
 * @param payload
 */
const updateFilterValue = (
  filterToUpdate: FilterControlState,
  payload: SearchFilterPayload
) => {
  switch (payload.filterActionType) {
    case FilterActionType.OptionSelected:
      filterToUpdate.type = FilterControlType.Dropdown
      ;(filterToUpdate as DropdownFilterState).selectedOptions = payload.value
      break

    case FilterActionType.RadioOptionSelected:
      filterToUpdate.type = FilterControlType.ListBox
      ;(filterToUpdate as ListBoxFilterState).selectedOption = payload.value
      break

    case FilterActionType.TextChanged:
      filterToUpdate.type = FilterControlType.Text
      ;(filterToUpdate as TextFilterState).value = payload.value
      break

    case FilterActionType.DateSelectedStart:
      filterToUpdate.type = FilterControlType.DateSearch
      ;(filterToUpdate as DateFilterState).startDate = payload.value
      break

    case FilterActionType.DateSelectedEnd:
      filterToUpdate.type = FilterControlType.DateSearch
      ;(filterToUpdate as DateFilterState).endDate = payload.value
      break
  }
}

/**
 * This reducer updates the state of the search filter options
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

  if (!filterToUpdate) {
    //  this options filter isn't in the redux store yet

    const newFilter: Partial<FilterControlState> = {
      id: action.payload.id,
    }

    updateFilterValue(newFilter as FilterControlState, action.payload)

    searchTypeFilterState.filterControlValues.push(
      newFilter as FilterControlState
    )
  } else {
    //  this particular filter was already set previously

    switch (action.payload.filterActionType) {
      case FilterActionType.OptionSelected:
      case FilterActionType.TextChanged:
        if (action.payload.value.length === 0) {
          //  for dropdown or text filter types --> if the value of the filterControl has a length of 0 (is an empty array or an empty string) remove the entire filter value
          searchTypeFilterState.filterControlValues = searchTypeFilterState.filterControlValues.filter(
            (fc) => fc.id !== action.payload.id
          )
          return
        }
    }

    updateFilterValue(filterToUpdate, action.payload)
  }
}

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    updateFilter: updateFilterReducer,
  },
})

export const { updateFilter } = searchFilterSlice.actions

export default searchFilterSlice.reducer
