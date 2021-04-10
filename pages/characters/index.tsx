import React, { FunctionComponent, useReducer } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { getPeople } from 'dataProviders/PeopleData'
import { getCharacterTags } from 'dataProviders/CharacterTagData'
import { SelectOption } from 'lib/types/SelectOption'
import { Character } from 'lib/types/Character'

import {
  FilterControlType,
  FilterPanel,
} from 'components/FilterPanel/FilterPanel'

import {
  FilterActions,
  FilterReducerFactory,
} from 'components/FilterPanel/FilterReducer'

export interface PeopleProps {
  allPeople: Character[]
  characterTagOptions: SelectOption[]
}

const characterFilterReducerFactory = new FilterReducerFactory<Character>()

const Characters: FunctionComponent<PeopleProps> = ({
  allPeople,
  characterTagOptions,
}: PeopleProps) => {
  const [
    { filteredResults: filteredCharacters },
    dispatch,
  ] = useReducer(characterFilterReducerFactory.getFilterReducer(), null, () =>
    characterFilterReducerFactory.getInitialFilterState(allPeople)
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
      FilterActions.createOptionSelectedAction<Character>(
        selectedOptions,
        itemMatchesTheSelectedOption
      )
    )
  }

  return (
    <>
      <Head>
        <title>NextJS demo - Characters</title>
      </Head>
      <h1>Characters</h1>

      <div>
        The characters data on this page is retrieved from a local sqlite DB
        file using the Prisma ORM. In addition, the following relational data
        gets pulled in for each character
        <ul>
          <li>Tags - many Persons to many Tags relationship</li>
          <li>Posts - one Person to many Posts relationship</li>
          <li>Friends - many Persons to many Persons self-relation</li>
        </ul>
      </div>

      <div className='grid grid-cols-4 mt-4 items-start'>
        <div className='col-span-1 text-sm searchResultCard'>
          {/* <CharacterFilterBar
            characterTagOptions={characterTagOptions}
            selectedCharacterTags={selectedCharacterTags}
            characterTagSelected={characterTagSelected}
          /> */}

          <FilterPanel
            filterControls={[
              {
                type: FilterControlType.Dropdown,
                optionSelected: characterTagSelected,
                selectOptions: characterTagOptions,
              },
            ]}
          />
        </div>

        <div className='col-span-3 ml-8'>
          {filteredCharacters &&
            filteredCharacters.map((person) => (
              <div key={person.id} className='searchResultCard'>
                <Link href={`/people/${person.id}`}>
                  <a target='_blank'>
                    {person.firstName} {person.lastName}
                  </a>
                </Link>

                {person.tags.length > 0 && (
                  <div className='mb-1'>
                    {person.tags.map((t) => (
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
                <div className='text-sm mt-2'>{person.bio}</div>
                {person.posts.length > 0 && (
                  <div>
                    {person.posts.length > 0 && (
                      <div className='my-4 mx-5 text-sm rounded-md p-3 bg-white'>
                        <span className='font-bold'>
                          {person.firstName}&apos;s latest post:{' '}
                        </span>
                        <span>{person.posts[0].body}</span>
                      </div>
                    )}
                  </div>
                )}
                {person.friends.length > 0 && (
                  <span className='text-sm'>
                    Friends:{' '}
                    {person.friends
                      .map(
                        (t) =>
                          t.firstName + (t.lastName ? ' ' + t.lastName : '')
                      )
                      .join(', ')}
                  </span>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const people = await getPeople()
  const characterTags = await getCharacterTags()

  const characterTagOptions = characterTags.map((tag) => ({
    label: tag.name,
    value: tag.id.toString(),
  }))

  return {
    props: {
      allPeople: people,
      characterTagOptions,
    },
  }
}

export default Characters
