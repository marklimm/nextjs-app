import { SelectOption } from 'lib/types/SelectOption'

//  This file contains the possible filter types (search by dropdown, search by date, etc.) that can be placed within the <FilterPanel />

export enum FilterControlType {
  DateSearch = 'date-search',
  Dropdown = 'dropdown',
}

export interface DateSearchFilter {
  type: FilterControlType.DateSearch
  id: string

  startDateSelected?: (string) => void
  endDateSelected?: (string) => void
  clearStartDate?: () => void
  clearEndDate?: () => void
}

export interface DropdownFilter {
  type: FilterControlType.Dropdown
  id: string
  label: string

  optionSelected?: (selectedOptions: SelectOption[]) => void
  selectOptions?: SelectOption[]
}

export type FilterControl = DropdownFilter | DateSearchFilter
