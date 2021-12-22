import { SelectOption } from 'lib/types/SelectOption'
import { FilterControlType, SearchType } from './filterTypes'

//  -----------------------------------------
//  The below interfaces are used for defining search filter state

export interface DateFilterState {
  type: FilterControlType.DateSearch

  /**
   * A unique identifier for this particular date filter
   */
  id: string

  endDate: string
  startDate: string
}

export interface DropdownFilterState {
  type: FilterControlType.Dropdown

  /**
   * A unique identifier for this particular dropdown filter
   */
  id: string

  selectedOptions: SelectOption[]
}

export interface TextFilterState {
  type: FilterControlType.Text

  id: string
  value: string
}

export type FilterControlState =
  | DateFilterState
  | DropdownFilterState
  | TextFilterState

// /**
//  * The search filter reducer's state.  This contains the current state of all the different search filters
//  */
export interface FilterState {
  [SearchType.Characters]: {
    filterControlValues: FilterControlState[]
  }
  [SearchType.Events]: {
    filterControlValues: FilterControlState[]
  }
  [SearchType.Tasks]: {
    filterControlValues: FilterControlState[]
  }
}

//  -------------------------
//  the below interfaces are redux reducer actions that change the filter state

export enum FilterActionType {
  DateSelectedEnd = 'date-selected-end',
  DateSelectedStart = 'date-selected-start',

  OptionSelected = 'option-selected',
  TextChanged = 'text-changed',
}

/**
 * The common fields used in a redux filter action payload
 */
type SearchFilterPayloadBase = {
  /**
   * The search type (Characters/Events, etc.)
   */
  searchType: SearchType

  /**
   * The particular filter
   */
  id: string
}

type OptionSelectedPayload = SearchFilterPayloadBase & {
  filterActionType: FilterActionType.OptionSelected
  value: SelectOption[]
}

type TextChangedPayload = SearchFilterPayloadBase & {
  filterActionType: FilterActionType.TextChanged
  value: string
}

type DateSelectedStartPayload = SearchFilterPayloadBase & {
  filterActionType: FilterActionType.DateSelectedStart
  value: string
}

type DateSelectedEndPayload = SearchFilterPayloadBase & {
  filterActionType: FilterActionType.DateSelectedEnd
  value: string
}

export type SearchFilterPayload =
  | OptionSelectedPayload
  | DateSelectedEndPayload
  | DateSelectedStartPayload
  | TextChangedPayload
