import React, { useRef } from 'react'

import { SelectOption } from 'lib/types/SelectOption'
import {
  FilterControl,
  FilterControlType,
  SearchType,
} from 'lib/redux/searchFilters/filterTypes'
import { useAppDispatch } from 'lib/redux/hooks'
import { FilterActionType } from 'lib/redux/searchFilters/searchFilterReducerTypes'
import { updateFilter } from 'lib/redux/searchFilters/searchFilterReducer'

import { Dropdown } from 'components/FilterPanel/Dropdown'
import { StartAndEndDatePicker } from 'components/FilterPanel/StartAndEndDatePicker'
import { Textbox } from './Textbox'

export interface FilterPanelProps {
  searchType: SearchType
  filterControls: FilterControl[]
}

/**
 * A component used by different search types that renders a filter panel containing the given filterControls
 * @param param0
 * @returns
 */
export const FilterPanel = ({
  filterControls,
  searchType,
}: FilterPanelProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const dispatchOptionSelected = (
    filterControlId = '',
    selectedOptions: SelectOption[]
  ) => {
    dispatch(
      updateFilter({
        searchType,
        filterActionType: FilterActionType.OptionSelected,
        id: filterControlId,
        value: selectedOptions,
      })
    )
  }

  const textChangeTimeoutRef = useRef<NodeJS.Timeout>()
  const onTextChanged = (filterControlId = '', value = '') => {
    //  cancel any previous timeout
    clearTimeout(textChangeTimeoutRef.current)

    textChangeTimeoutRef.current = setTimeout(() => {
      //  dispatch text change

      //  don't search if the user has only typed 1 or 2 characters.  0 characters will remove the text filter control
      if (value.length === 1 || value.length === 2) {
        return
      }

      dispatch(
        updateFilter({
          searchType,
          filterActionType: FilterActionType.TextChanged,
          id: filterControlId,
          value,
        })
      )
    }, 300)
  }

  const setStartDate = (filterControlId = '', startDate = '') => {
    dispatch(
      updateFilter({
        searchType,
        filterActionType: FilterActionType.DateSelectedStart,
        id: filterControlId,
        value: startDate,
      })
    )
  }

  const setEndDate = (filterControlId = '', endDate = '') => {
    dispatch(
      updateFilter({
        searchType,
        filterActionType: FilterActionType.DateSelectedEnd,
        id: filterControlId,
        value: endDate,
      })
    )
  }

  return (
    <div>
      {filterControls.map((filterControl, index) => {
        switch (filterControl.type) {
          case FilterControlType.Dropdown:
            return (
              <Dropdown
                key={index}
                label={filterControl.label}
                placeholder={filterControl.placeholder}
                selectOptions={filterControl.options}
                optionSelected={(selectedOptions) =>
                  dispatchOptionSelected(filterControl.id, selectedOptions)
                }
              />
            )
          case FilterControlType.DateSearch:
            return (
              <StartAndEndDatePicker
                key={index}
                initialEndDate={''}
                initialStartDate={''}
                label={filterControl.label}
                endDateSelected={(endDate = '') =>
                  setEndDate(filterControl.id, endDate)
                }
                startDateSelected={(startDate = '') =>
                  setStartDate(filterControl.id, startDate)
                }
              />
            )

          case FilterControlType.Text:
            return (
              <Textbox
                key={index}
                label={filterControl.label}
                placeholder={filterControl.placeholder}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  onTextChanged(
                    filterControl.id,
                    (event.target as HTMLInputElement).value
                  )
                }
              />
            )
        }
      })}
    </div>
  )
}
