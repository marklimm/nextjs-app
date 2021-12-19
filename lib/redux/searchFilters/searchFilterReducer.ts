import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilterControlType, SearchType } from './filterTypes'
import {
  DateFilterState,
  DropdownFilterState,
  FilterActionType,
  FilterControlState,
  FilterState,
  SearchFilterPayload,
  TextFilterState,
} from './searchFilterReducerTypes'

/**
 * This non-generic searchFilterReducer.ts file knows all of the different search types
 */
const initialState: FilterState = {
  [SearchType.Characters]: {
    filterControlValues: [],
  },
  [SearchType.Events]: {
    filterControlValues: [],
  },
  [SearchType.Tasks]: {
    filterControlValues: [],
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

    if (
      filterToUpdate.type !== FilterControlType.DateSearch &&
      action.payload.value.length === 0
    ) {
      //  if the value of the filterControl has a length of 0 (is an empty array or an empty string) remove the entire filter value
      searchTypeFilterState.filterControlValues = searchTypeFilterState.filterControlValues.filter(
        (fc) => fc.id !== action.payload.id
      )
      return
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
