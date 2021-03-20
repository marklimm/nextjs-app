import { SelectOption } from 'lib/types/SelectOption'
import { Character } from 'lib/types/Character'

/**
 * The part of CharactersState that stores the currently selected filters
 */
interface CharactersFilterState {
  characterTags: SelectOption[]
}

/**
 * Characters state, including all of the Characters, the currently filtered Characters, and all of the filters
 */
interface CharactersState {
  allCharacters: Character[]
  filteredCharacters: Character[]

  filters: CharactersFilterState
}

export const initialCharactersFilterState: CharactersState = {
  allCharacters: [],
  filteredCharacters: [],

  filters: {
    characterTags: [],
  },
}

/**
 * A type of Character filter action
 */
enum CharactersFilterActionType {
  SetCharacterTags = 'set-character-tags',
}

interface SetCharacterTagsAction {
  type: CharactersFilterActionType.SetCharacterTags
  payload: {
    characterTags: SelectOption[]
  }
}

/**
 * An action that can be dispatch()-ed for the Characters reducer
 */
type CharactersFilterAction = SetCharacterTagsAction

/**
 * The action creator for the setCharacterTagsAction
 * @param characterTags
 */
export const setCharacterTags = (
  characterTags: SelectOption[]
): SetCharacterTagsAction => ({
  type: CharactersFilterActionType.SetCharacterTags,
  payload: {
    characterTags,
  },
})

/**
 * This function takes the current Characters state and the updated filter state, runs the filters against the complete list of Characters, and returns the updated Characters state
 * @param state
 */
const getUpdatedCharactersState = (
  state: CharactersState,
  filterState: CharactersFilterState
): CharactersState => {
  let filteredCharacters = state.allCharacters

  if (filterState.characterTags.length > 0) {
    filteredCharacters = filteredCharacters.filter((character) => {
      //  search for a match between the array of selected characterTags and the array of characterTags on the current Character
      const matchingcharacterTags = filterState.characterTags.filter(
        (selectedTag) => {
          return character.tags
            .map((t) => t.id.toString())
            .includes(selectedTag.value)
        }
      )

      return matchingcharacterTags.length > 0
    })
  }

  return {
    ...state,
    filteredCharacters,

    filters: filterState,
  }
}

export const CharactersFilterReducer = (
  state: CharactersState,
  action: CharactersFilterAction
): CharactersState => {
  switch (action.type) {
    case CharactersFilterActionType.SetCharacterTags:
      return getUpdatedCharactersState(state, {
        ...state.filters,
        characterTags: (action as SetCharacterTagsAction).payload.characterTags,
      })
  }
}
