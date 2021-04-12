import { SelectOption } from 'lib/types/SelectOption'
import { Character } from 'lib/types/Character'
import { Event } from 'lib/types/Event'
import { FilterControl, FilterControlType } from './FilterTypes'

interface DateFilterState {
  type: FilterControlType.DateSearch

  //  a unique identifier for the value that is being searched on
  id: string

  endDate: string
  startDate: string
}

interface DropdownFilterState {
  type: FilterControlType.Dropdown

  //  a unique identifier for the value that is being searched on
  id: string

  selectedOptions: SelectOption[]

  /**
   * This function is needed in order to know how to compare the selected options with items in the list
   */
  itemMatchesTheSelectedOption?: (
    item: unknown,
    selectedOption: SelectOption
  ) => boolean
}

type FilterControlState = DateFilterState | DropdownFilterState

/**
 * The filter reducer's state
 */
interface FilterState<T> {
  allResults: T[]
  filteredResults: T[]

  filterControlStates: FilterControlState[]
}

enum FilterActionType {
  DateSelectedEnd = 'date-selected-end',
  DateSelectedStart = 'date-selected-start',

  OptionSelected = 'option-selected',
}

interface DateSelectedStartAction {
  type: FilterActionType.DateSelectedStart
  payload: {
    id: string
    startDate: string
  }
}

interface DateSelectedEndAction {
  type: FilterActionType.DateSelectedEnd
  payload: {
    id: string
    endDate: string
  }
}

/**
 * interface for the redux action of selecting a dropdown value within the FilterPanel
 */
interface OptionSelectedAction<T> {
  type: FilterActionType.OptionSelected
  payload: {
    id: string
    /**
     * This function is "telling" the FilterReducer how to determine if a given search result has a match within the given selectedOption
     */
    itemMatchesTheSelectedOption: (
      item: T,
      selectedOption: SelectOption
    ) => boolean
    selectedOptions: SelectOption[]
  }
}

type FilterAction<T> =
  | OptionSelectedAction<T>
  | DateSelectedEndAction
  | DateSelectedStartAction

/**
 * This class contains action creators for the FilterReducer.  I'm questioning whether this class is really necessary, can't I just call the action creator functions directly?
 */
export class FilterActions {
  public static optionSelected = <SearchType extends Character | Event>(
    id = '',
    selectedOptions: SelectOption[],
    itemMatchesTheSelectedOption: (
      item: SearchType,
      selectedOption: SelectOption
    ) => boolean
  ): OptionSelectedAction<SearchType> => ({
    type: FilterActionType.OptionSelected,
    payload: {
      id,
      selectedOptions,
      itemMatchesTheSelectedOption,
    },
  })

  /**
   * Returns the redux action that gets dispatched when the user chooses to filter by an end date
   * @param id the ID of the specific filter that was changed
   * @param endDate the user-specified endDate
   * @returns DateSelectedEndAction
   */
  public static setEndDate = (
    id = '',
    endDate = ''
  ): DateSelectedEndAction => ({
    type: FilterActionType.DateSelectedEnd,
    payload: {
      id,
      endDate,
    },
  })

  /**
   * Returns the redux action that gets dispatched when the user chooses to filter by a start date
   * @param id the ID of the specific filter that was changed
   * @param startDate the user-specified startDate
   * @returns DateSelectedStartAction
   */
  public static setStartDate = (
    id = '',
    startDate = ''
  ): DateSelectedStartAction => ({
    type: FilterActionType.DateSelectedStart,
    payload: {
      id,
      startDate,
    },
  })
}

/**
 * A generic class that returns a FilterReducer for the specified SearchType.  It seems like the only reason to use a class is to share the <SearchType> ?
 */
export class FilterReducerFactory<SearchType extends Character | Event> {
  /**
   * This function takes the "instructions" (that specify the filter controls that should be displayed) and converts those into the initial redux state for each of the filter controls
   * @param filterControls
   * @returns
   */
  private getInitialFiltersState = (
    filterControls: FilterControl[]
  ): FilterControlState[] => {
    const initialFilterStates = filterControls.map((fc) => {
      switch (fc.type) {
        case FilterControlType.DateSearch: {
          return {
            type: FilterControlType.DateSearch,
            id: fc.id,

            endDate: '',
            startDate: '',
          } as DateFilterState
        }

        case FilterControlType.Dropdown: {
          return {
            type: FilterControlType.Dropdown,
            id: fc.id,

            selectedOptions: [],
          } as DropdownFilterState
        }
      }
    })

    return initialFilterStates
  }

  /**
   * This function builds the initial state of the reducer, which includes all of the search results and the current state of the filter controls
   * @param allResults
   * @param filterControls
   * @returns
   */
  public getInitialState = (
    allResults: SearchType[],
    filterControls: FilterControl[]
  ): FilterState<SearchType> => {
    return {
      allResults,
      filteredResults: allResults,

      filterControlStates: this.getInitialFiltersState(filterControls),
    }
  }

  /**
   * This function is the heart of the FilterReducer.  It filters all of the possible results against the currently selected filters
   * @param state
   * @param filterControlStates
   * @returns
   */
  private getUpdatedEventsState = (
    state: FilterState<SearchType>,
    filterControlStates: FilterControlState[]
  ): FilterState<SearchType> => {
    let filteredResults = state.allResults

    filterControlStates.forEach((filterControl) => {
      switch (filterControl.type) {
        case FilterControlType.DateSearch:
          if (filterControl.startDate) {
            filteredResults = filteredResults.filter(
              (e: SearchType & { date: string }) =>
                e.date > filterControl.startDate
            )
          }

          if (filterControl.endDate) {
            filteredResults = filteredResults.filter(
              (e: SearchType & { date: string }) =>
                e.date < filterControl.endDate
            )
          }

          break

        case FilterControlType.Dropdown:
          if (filterControl.selectedOptions.length > 0) {
            filteredResults = filteredResults.filter((result) => {
              const matchingOptions = filterControl.selectedOptions.filter(
                (selectedOption) => {
                  //  use the function that was passed in in order to check if there's a match between the SelectedOption and the current item
                  return filterControl.itemMatchesTheSelectedOption(
                    result,
                    selectedOption
                  )
                }
              )

              return matchingOptions.length > 0
            })
          }

          break
      }
    })

    return {
      ...state,
      filteredResults,

      filterControlStates,
    }
  }

  public filterReducer = (
    state: FilterState<SearchType>,
    action: FilterAction<SearchType>
  ): FilterState<SearchType> => {
    //  update the filter that changed
    const updatedFilterControls = state.filterControlStates.map((fc) => {
      if (action.payload.id !== fc.id) {
        return fc
      }

      return {
        ...fc,
        ...action.payload,
      }
    })

    //  apply the updated filters to the search results
    return this.getUpdatedEventsState(state, updatedFilterControls)
  }
}
