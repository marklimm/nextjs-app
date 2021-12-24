import React from 'react'

import {
  FilterControl,
  FilterControlType,
  SearchType,
} from 'lib/redux/searchFilters/filterTypes'
import { useAppDispatch } from 'lib/redux/hooks'
import { resetFilters } from 'lib/redux/searchFilters/searchFilterReducer'

import { Dropdown } from 'components/FilterPanel/Dropdown'
import { StartAndEndDatePicker } from 'components/FilterPanel/StartAndEndDatePicker'
import { Textbox } from './Textbox'
import { ListBox } from './ListBox'

export interface FilterPanelProps {
  searchType: SearchType
  filterControls: FilterControl[]
}

/**
 * A component used by different search types that renders a filter panel containing the given filterControls.  When the user sets a filter, that state changes gets dispatched to the redux store, which gets read by the component that renders the search results
 * @param param0
 * @returns
 */
export const FilterPanel = ({
  filterControls,
  searchType,
}: FilterPanelProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const resetFiltersClicked = () => {
    dispatch(
      resetFilters({
        searchType,
      })
    )
  }

  return (
    <div>
      {filterControls.map((filterControl) => {
        switch (filterControl.type) {
          case FilterControlType.Dropdown:
            return (
              <Dropdown
                key={filterControl.id}
                searchType={searchType}
                filterId={filterControl.id}
                label={filterControl.label}
                placeholder={filterControl.placeholder}
                selectOptions={filterControl.options}
              />
            )

          case FilterControlType.ListBox:
            return (
              <ListBox
                key={filterControl.id}
                searchType={searchType}
                filterId={filterControl.id}
                label={filterControl.label}
                allOptions={filterControl.options}
              />
            )

          case FilterControlType.DateSearch:
            return (
              <StartAndEndDatePicker
                key={filterControl.id}
                searchType={searchType}
                filterId={filterControl.id}
                label={filterControl.label}
              />
            )

          case FilterControlType.Text:
            return (
              <Textbox
                key={filterControl.id}
                searchType={searchType}
                filterId={filterControl.id}
                label={filterControl.label}
                placeholder={filterControl.placeholder}
              />
            )
        }
      })}

      <button
        className='focus:outline-none my-2 font-bold'
        onClick={resetFiltersClicked}
      >
        Reset filters
      </button>
    </div>
  )
}
