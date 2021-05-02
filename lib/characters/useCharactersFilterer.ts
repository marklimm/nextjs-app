import { useReducer } from 'react'
import { Character } from 'lib/types/Character'
import { SelectOption } from 'lib/types/SelectOption'

import {
  DropdownFilter,
  FilterControl,
  FilterControlType,
  TextFilter,
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
  Bio = 'bio',
  CharacterTags = 'character-tags',
  Friends = 'friends',
  Name = 'name',
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
  const friendOptions: SelectOption[] = allCharacters.map((c) => ({
    label: `${c.firstName} ${c.lastName}`,
    value: c.id.toString(),
  }))

  const filterControls: FilterControl[] = [
    {
      type: FilterControlType.Dropdown,
      id: FilteringOn.CharacterTags,
      label: 'Tags',
      placeholder: 'Character Tags',

      selectOptions: characterTagOptions,
    },
    {
      type: FilterControlType.Dropdown,
      id: FilteringOn.Friends,
      label: 'Friends',
      placeholder: 'Friends with',

      selectOptions: friendOptions,
    },
    {
      type: FilterControlType.Text,
      id: FilteringOn.Name,
      label: 'Name',
      placeholder: 'Name',
    },
    {
      type: FilterControlType.Text,
      id: FilteringOn.Bio,
      label: 'Bio',
      placeholder: 'Bio keyword',
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

  const friendSelected = (selectedOptions: SelectOption[]) => {
    const itemMatchesTheSelectedOption = (
      character: Character,
      selectedOption: SelectOption
    ): boolean => {
      return character.friends
        .map((f) => f.id.toString())
        .includes(selectedOption.value)
    }

    dispatch(
      FilterActions.optionSelected<Character>(
        FilteringOn.Friends,
        selectedOptions,
        itemMatchesTheSelectedOption
      )
    )
  }

  let nameSearchTimeout, bioSearchTimeout

  const nameSearchTermChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const itemMatchesTheSearchTerm = (
      character: Character,
      searchTerm: string
    ): boolean => {
      return (
        character.firstName.toLowerCase().indexOf(searchTerm) > -1 ||
        character.lastName.toLowerCase().indexOf(searchTerm) > -1
      )
    }

    //  clear out any previous name search timeout
    clearTimeout(nameSearchTimeout)

    const nameSearchTerm = event.currentTarget.value

    nameSearchTimeout = setTimeout(() => {
      //  dispatch after the user has finished typing their name search term
      dispatch(
        FilterActions.textChanged(
          FilteringOn.Name,
          nameSearchTerm,
          itemMatchesTheSearchTerm
        )
      )
    }, 250)
  }

  const bioSearchTermChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const itemMatchesTheSearchTerm = (
      character: Character,
      searchTerm: string
    ): boolean => {
      return character.bio.toLowerCase().indexOf(searchTerm) > -1
    }

    //  clear out any previous bio search timeout
    clearTimeout(bioSearchTimeout)

    const bioSearchTerm = event.currentTarget.value

    bioSearchTimeout = setTimeout(() => {
      //  dispatch after the user has finished typing their bio search term
      dispatch(
        FilterActions.textChanged(
          FilteringOn.Bio,
          bioSearchTerm,
          itemMatchesTheSearchTerm
        )
      )
    }, 250)
  }

  //  add on the event handlers now that they are defined
  const characterTagFilter = filterControls[0] as DropdownFilter
  characterTagFilter.optionSelected = characterTagSelected

  const friendFilter = filterControls[1] as DropdownFilter
  friendFilter.optionSelected = friendSelected

  const nameFilter = filterControls[2] as TextFilter
  nameFilter.textChanged = nameSearchTermChanged

  const bioFilter = filterControls[3] as TextFilter
  bioFilter.textChanged = bioSearchTermChanged

  return {
    filteredCharacters,
    filterControls,
  }
}
