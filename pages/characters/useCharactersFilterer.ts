import { useReducer } from 'react'
import { Character } from 'lib/types/Character'
import { SelectOption } from 'lib/types/SelectOption'

import {
  DropdownFilter,
  FilterControl,
  FilterControlType,
} from 'components/FilterPanel/FilterTypes'

import {
  FilterActions,
  FilterReducerFactory,
} from 'components/FilterPanel/FilterReducer'

export interface UseCharactersFiltererResult {
  filteredCharacters: Character[]
  filterControls: FilterControl[]
}

enum FilteringOn {
  CharacterTags = 'character-tags',
}

const characterFilterReducerFactory = new FilterReducerFactory<Character>()

/**
 * A custom hook that defines the Character filtering event handlers and provides access to the current list of filtered Characters and the currently selected emotion tags
 * @param allCharacters An array of all of the Characters
 */
export const useCharactersFilterer = (
  allCharacters: Character[],
  characterTagOptions: SelectOption[]
): UseCharactersFiltererResult => {
  const filterControls: FilterControl[] = [
    {
      type: FilterControlType.Dropdown,
      id: FilteringOn.CharacterTags,
      label: 'Tags',

      selectOptions: characterTagOptions,
    },
  ]

  const [
    { filteredResults: filteredCharacters },
    dispatch,
  ] = useReducer(characterFilterReducerFactory.filterReducer, null, () =>
    characterFilterReducerFactory.getInitialState(allCharacters, filterControls)
  )

  const characterTagSelected = (selectedOptions: SelectOption[]) => {
    const itemMatchesTheSelectedOption = (
      character: Character,
      selectedOption: SelectOption
    ): boolean => {
      return character.tags
        .map((t) => t.id.toString())
        .includes(selectedOption.value)
    }

    dispatch(
      FilterActions.optionSelected<Character>(
        FilteringOn.CharacterTags,
        selectedOptions,
        itemMatchesTheSelectedOption
      )
    )
  }

  //  add on the event handler now that it's defined
  const characterTagFilter = filterControls[0] as DropdownFilter
  characterTagFilter.optionSelected = characterTagSelected

  return {
    filteredCharacters,
    filterControls,
  }
}
