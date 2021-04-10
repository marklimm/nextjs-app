import React, { FunctionComponent } from 'react'

import { SelectOption } from 'lib/types/SelectOption'
import { Dropdown } from 'components/FilterPanel/Dropdown'

interface FilterPanelProps {
  // allResults: T[]
  // filterReducer: (state: FilterState<T>, action: FilterAction) => FilterState<T>

  //  if this is a filter that will include a <Dropdown />/select filter type, then these two parameters will be passed in
  optionSelected?: (selectedOptions: SelectOption[]) => void
  selectOptions?: SelectOption[]
}

/**
 * A component intended to be used by different search types that renders various filter input controls based on the given parameters
 * @param param0
 * @returns
 */
export const FilterPanel: FunctionComponent<FilterPanelProps> = ({
  optionSelected,
  selectOptions,
}: FilterPanelProps) => {
  return (
    <div>
      FilterPanel.tsx
      {selectOptions?.length > 0 && optionSelected && (
        <Dropdown
          selectOptions={selectOptions}
          optionSelected={optionSelected}
        />
      )}
    </div>
  )
}
