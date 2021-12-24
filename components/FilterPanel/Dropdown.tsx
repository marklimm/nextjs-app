import React, { FunctionComponent } from 'react'
import Select from 'react-select'

import { useAppDispatch, useAppSelector } from 'lib/redux/hooks'
import { SelectOption } from 'lib/types/SelectOption'

import { SearchType } from 'lib/redux/searchFilters/filterTypes'
import {
  FilterActionType,
  DropdownFilterState,
} from 'lib/redux/searchFilters/searchFilterReducerTypes'
import { updateFilter } from 'lib/redux/searchFilters/searchFilterReducer'

interface DropdownProps {
  filterId: string
  label: string
  placeholder: string
  searchType: SearchType
  selectOptions: SelectOption[]
}

export const Dropdown: FunctionComponent<DropdownProps> = ({
  label,
  filterId,
  placeholder,
  searchType,
  selectOptions,
}: DropdownProps) => {
  const dispatch = useAppDispatch()

  const dropdownFilterState = useAppSelector((state) => {
    return state.searchFilter[searchType].filterControlValues.find(
      (filter) => filter.id === filterId
    ) as DropdownFilterState
  })

  const optionSelected = (selectedOptions) => {
    dispatch(
      updateFilter({
        searchType,
        filterActionType: FilterActionType.OptionSelected,
        id: filterId,
        value: selectedOptions,
      })
    )
  }

  return (
    <div className='my-4'>
      <div className='font-bold mb-1'>{label}</div>
      <Select
        // styles={customStyles}
        value={dropdownFilterState.selectedOptions}
        isMulti
        onChange={optionSelected}
        options={selectOptions}
        placeholder={placeholder}
        instanceId={`random-id-to-resolve-error-https://stackoverflow.com/questions/61290173/react-select-how-do-i-resolve-warning-prop-id-did-not-match-${label}`}
      />
    </div>
  )
}
