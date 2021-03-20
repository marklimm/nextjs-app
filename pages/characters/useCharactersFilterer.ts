import { useReducer } from 'react'
import { Character } from 'lib/types/Character'
import { SelectOption } from 'lib/types/SelectOption'

import {
  CharactersFilterReducer,
  initialCharactersFilterState,
  setCharacterTags,
} from './CharactersReducer'

export interface UseCharactersFiltererResult {
  filteredCharacters: Character[]
  selectedCharacterTags: SelectOption[]
  characterTagSelected: (selectedOptions: SelectOption[]) => void
}

/**
 * A custom hook that defines the Character filtering event handlers and provides access to the current list of filtered Characters and the currently selected emotion tags
 * @param allCharacters An array of all of the Characters
 */
export const useCharactersFilterer = (
  allCharacters: Character[]
): UseCharactersFiltererResult => {
  const [state, dispatch] = useReducer(
    CharactersFilterReducer,
    initialCharactersFilterState,
    () => ({
      ...initialCharactersFilterState,
      allCharacters,
      filteredCharacters: allCharacters,
    })
  )

  const characterTagSelected = (selectedOptions: SelectOption[]) => {
    dispatch(setCharacterTags(selectedOptions))
  }

  return {
    filteredCharacters: state.filteredCharacters,

    selectedCharacterTags: state.filters.characterTags,

    characterTagSelected,
  }
}
