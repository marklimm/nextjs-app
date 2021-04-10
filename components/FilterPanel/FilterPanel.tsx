import React, { FunctionComponent } from 'react'

import { SelectOption } from 'lib/types/SelectOption'
import { Dropdown } from 'components/FilterPanel/Dropdown'

export enum FilterControlType {
  DateSearch = 'date-search',
  Dropdown = 'dropdown',
}

interface DateSearch {
  type: FilterControlType.DateSearch
  something: string
}

interface Dropdown {
  type: FilterControlType.Dropdown
  optionSelected: (selectedOptions: SelectOption[]) => void
  selectOptions: SelectOption[]
}

type FilterControl = Dropdown | DateSearch

interface FilterPanelProps {
  filterControls: FilterControl[]
}

/**
 * A component intended to be used by different search types that renders various filter input controls based on the given parameters
 * @param param0
 * @returns
 */
const UnMemoizedFilterPanel: FunctionComponent<FilterPanelProps> = ({
  filterControls,
}: FilterPanelProps) => {
  return (
    <div>
      FilterPanel.tsx
      {filterControls.map((filterControl, index) => {
        console.log('filterControl', filterControl)
        if (filterControl.type === FilterControlType.Dropdown) {
          return (
            <Dropdown
              key={index}
              selectOptions={filterControl.selectOptions}
              optionSelected={filterControl.optionSelected}
            />
          )
        }
      })}
    </div>
  )
}

export const FilterPanel = React.memo(UnMemoizedFilterPanel, () => {
  //  my attempt to stop the re-render, this does seem to stop the re-render, meaning that the <FilterPanel /> will only be built on the initial load and does NOT get re-rendered as the user is selecting filter options
  return true
})
