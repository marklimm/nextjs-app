import React from 'react'
import Image from 'next/image'

import { useAppSelector } from 'lib/redux/hooks'
import { Character } from 'lib/types/Character'

import {
  FilterControlType,
  SearchType,
} from 'lib/redux/searchFilters/filterTypes'

export enum CharacterFilterFields {
  Bio = 'bio',
  CharacterTags = 'character-tags',
  Friends = 'friends',
  Name = 'name',
}

export interface CharactersResultsProps {
  allCharacters: Character[]
}

export const CharactersResults = ({
  allCharacters,
}: CharactersResultsProps): JSX.Element => {
  let filteredCharacters = allCharacters

  const { filterControlValues } = useAppSelector((state) => {
    return state.searchFilter[SearchType.Characters]
  })

  /**
   * This function filters the characters based on the values in `filterControlValues`
   */
  const filterResults = () => {
    filterControlValues.forEach((filterControl) => {
      switch (filterControl.type) {
        case FilterControlType.Text: {
          const searchTerm = filterControl.value.toLowerCase()

          filteredCharacters = filteredCharacters.filter((character) => {
            if (filterControl.id === CharacterFilterFields.Name) {
              return (
                character.firstName.toLowerCase().indexOf(searchTerm) > -1 ||
                character.lastName.toLowerCase().indexOf(searchTerm) > -1
              )
            } else if (filterControl.id === CharacterFilterFields.Bio) {
              return character.bio.toLowerCase().indexOf(searchTerm) > -1
            }
          })

          break
        }

        case FilterControlType.Dropdown: {
          filteredCharacters = filteredCharacters.filter((character) => {
            if (filterControl.id === CharacterFilterFields.Friends) {
              const matchingFriends = filterControl.selectedOptions.filter(
                (selectedOption) => {
                  //  we need to convert the string to an int for `selectOption.value`
                  return character.friends.find(
                    (friend) => friend.id === parseInt(selectedOption.value)
                  )
                }
              )

              return matchingFriends.length > 0
            } else if (
              filterControl.id === CharacterFilterFields.CharacterTags
            ) {
              const matchingTags = filterControl.selectedOptions.filter(
                (selectedOption) => {
                  //  we need to convert the string to an int for `selectOption.value`
                  return character.tags.find(
                    (tag) => tag.id === parseInt(selectedOption.value)
                  )
                }
              )

              return matchingTags.length > 0
            }
          })

          break
        }
      }
    })
  }

  if (filterControlValues.length > 0) {
    filterResults()
  }

  return (
    <>
      {filteredCharacters &&
        filteredCharacters.map((character) => (
          <div key={character.id} className='searchResultCard flex'>
            {character.imageUrl && (
              <div
                className='relative mr-3'
                style={{
                  minWidth: '200px',
                  maxHeight: '200px',
                }}
              >
                <Image
                  src={`/characters/${character.imageUrl}`}
                  alt={`${character.firstName} ${character.lastName}`}
                  layout='fill'
                  objectFit='fill'
                  className='rounded-sm'
                />
              </div>
            )}

            <div>
              <div className='mb-2 text-lg'>
                {character.firstName} {character.lastName}
              </div>

              {character.tags.length > 0 && (
                <div className='mb-1'>
                  {character.tags.map((t) => (
                    <span
                      key={t.id}
                      className='text-xs rounded-xl py-1 px-2 mr-2 bg-white border border-gray-300'
                      title={t.description}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              )}
              <div className='text-sm mt-2'>{character.bio}</div>
              {character.posts.length > 0 && (
                <div className='my-4 text-sm rounded-md p-3 bg-white'>
                  <span className='font-bold'>
                    {character.firstName}&apos;s latest post:{' '}
                  </span>
                  <span>{character.posts[0].body}</span>
                </div>
              )}
              {character.friends.length > 0 && (
                <span className='text-sm'>
                  Friends:{' '}
                  {character.friends
                    .map(
                      (t) => t.firstName + (t.lastName ? ' ' + t.lastName : '')
                    )
                    .join(', ')}
                </span>
              )}
            </div>
          </div>
        ))}
    </>
  )
}
