import { SelectOption } from 'lib/types/SelectOption'
import { Character } from 'lib/types/Character'
import { Event } from 'lib/types/Event'

/**
 * The filter reducer's state
 */
interface FilterState<T> {
  allResults: T[]
  filteredResults: T[]

  //  to support multiple dropdowns per SearchType, there might have to be a key-value mapping of all the select option types that an individual "SearchType" can have
}

enum FilterActionType {
  OptionSelected = 'option-selected',
}

/**
 * interface for the redux action of selecting a dropdown value within the FilterPanel
 */
interface OptionSelectedAction<T> {
  type: FilterActionType.OptionSelected
  payload: {
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

type FilterAction<T> = OptionSelectedAction<T>

/**
 * This class contains action creators for the FilterReducer.  I'm questioning whether this class is really necessary, can't I just call the action creator functions directly?
 */
export class FilterActions {
  public static createOptionSelectedAction = <
    SearchType extends Character | Event
  >(
    selectedOptions: SelectOption[],
    itemMatchesTheSelectedOption: (
      item: SearchType,
      selectedOption: SelectOption
    ) => boolean
  ): OptionSelectedAction<SearchType> => ({
    type: FilterActionType.OptionSelected,
    payload: {
      selectedOptions,
      itemMatchesTheSelectedOption,
    },
  })
}

/**
 * A generic class that returns a FilterReducer for the specified SearchType
 */
export class FilterReducerFactory<SearchType extends Character | Event> {
  public getInitialFilterState = (
    allResults: SearchType[]
  ): FilterState<SearchType> => ({
    allResults,
    filteredResults: allResults,
  })

  public getFilterReducer = () => (
    state: FilterState<SearchType>,
    action: FilterAction<SearchType>
  ): FilterState<SearchType> => {
    let filteredResults = state.allResults

    switch (action.type) {
      case FilterActionType.OptionSelected:
        if (action.payload.selectedOptions.length > 0) {
          filteredResults = filteredResults.filter((result) => {
            //  use the given itemMatchesTheSelectedOption() method to determine if the given search result has a match with the list of selectedOptions
            const matchingTagOptions = action.payload.selectedOptions.filter(
              (selectedOption) => {
                return action.payload.itemMatchesTheSelectedOption(
                  result,
                  selectedOption
                )
              }
            )

            return matchingTagOptions.length > 0
          })
        }

        return {
          ...state,
          filteredResults,
        }
    }
  }
}
