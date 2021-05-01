import React, { FunctionComponent } from 'react'

import { FilterControl, FilterControlType } from './FilterTypes'

import { Dropdown } from 'components/FilterPanel/Dropdown'
import { StartAndEndDatePicker } from 'components/StartAndEndDatePicker/StartAndEndDatePicker'
import { Textbox } from './Textbox'

interface FilterPanelProps {
  filterControls: FilterControl[]
}

/**
 * A component intended to be used by different search types that renders a filter panel containing the given filterControls
 * @param param0
 * @returns
 */
const UnMemoizedFilterPanel: FunctionComponent<FilterPanelProps> = ({
  filterControls,
}: FilterPanelProps) => {
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
                selectOptions={filterControl.selectOptions}
                optionSelected={filterControl.optionSelected}
                // value={[]}
              />
            )
          case FilterControlType.DateSearch:
            return (
              <StartAndEndDatePicker
                key={index}
                clearEndDate={filterControl.clearEndDate}
                clearStartDate={filterControl.clearStartDate}
                initialEndDate={''}
                initialStartDate={''}
                label={filterControl.label}
                endDateSelected={filterControl.endDateSelected}
                startDateSelected={filterControl.startDateSelected}
              />
            )

          case FilterControlType.Text:
            return (
              <Textbox
                key={index}
                label={filterControl.label}
                placeholder={filterControl.placeholder}
                onChange={filterControl.textChanged}
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
