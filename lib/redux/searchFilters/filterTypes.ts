import { SelectOption } from 'lib/types/SelectOption'

/**
 * All the possible search types that use searchFilterReducer.ts
 */
export enum SearchType {
  Characters = 'search-characters',
  Events = 'search-events',

  //  I need to convert over tasks, assuming the above 2 go well
  Tasks = 'search-tasks',
}

/**
 * All the possible filter control types
 */
export enum FilterControlType {
  DateSearch = 'date-search',
  Dropdown = 'dropdown',
  ListBox = 'listbox',
  Text = 'text',
}

//  ----------------------------------------
//  Below are the possible filter types (search by dropdown, search by date, etc.) that can be placed within the <FilterPanel />.  These types tell the <FilterPanel /> what the filter controls are.  They don't deal with the changeable reducer state that is handled by the types in searchFilterReducerTypes.ts

export interface DateSearchFilter {
  type: FilterControlType.DateSearch
  id: string
  label: string
}

export interface DropdownFilter {
  type: FilterControlType.Dropdown
  id: string
  label: string
  placeholder: string

  options: SelectOption[]
}

export interface ListBoxFilter {
  type: FilterControlType.ListBox
  id: string
  label: string
  placeholder: string

  options: SelectOption[]
}

export interface TextFilter {
  type: FilterControlType.Text
  id: string
  label: string
  placeholder: string
}

export type FilterControl =
  | DropdownFilter
  | DateSearchFilter
  | ListBoxFilter
  | TextFilter

//  below are the specific filters used by all the different search types

/**
 * The characters search filter fields
 */
export enum CharacterFilterFields {
  Bio = 'bio',
  CharacterTags = 'character-tags',
  Friends = 'friends',
  Name = 'name',
}

/**
 * The events search filter fields
 */
export enum EventFilterFields {
  EmotionTags = 'emotion-tags',
  Timestamp = 'timestamp',
}

/**
 * The task search filter fields
 */
export enum TaskFilterFields {
  Title = 'title',
  Assignee = 'assignee',
  TShirtSize = 't-shirtSize',
  Completed = 'completed',
}
