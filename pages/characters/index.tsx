import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { getCharacters } from 'dataProviders/PeopleData'
import { getCharacterTags } from 'dataProviders/CharacterTagData'
import { SelectOption } from 'lib/types/SelectOption'
import { Character } from 'lib/types/Character'

import { FilterPanel } from 'components/FilterPanel/FilterPanel'

import { useCharactersFilterer } from './useCharactersFilterer'

export interface CharactersProps {
  allCharacters: Character[]
  characterTagOptions: SelectOption[]
}

/**
 * This component defines the UI for the /characters route, which includes a filters panel and the Characters search results
 * @param param0
 * @returns
 */
const Characters: FunctionComponent<CharactersProps> = ({
  allCharacters,
  characterTagOptions,
}: CharactersProps) => {
  //  we use the useCharactersFilterer custom hook to get the filters and filtered search results
  const { filterControls, filteredCharacters } = useCharactersFilterer(
    allCharacters,
    characterTagOptions
  )

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
          <FilterPanel filterControls={filterControls} />
        </div>

        <div className='col-span-3 ml-8'>
          {filteredCharacters &&
            filteredCharacters.map((character) => (
              <div key={character.id} className='searchResultCard'>
                <Link href={`/people/${character.id}`}>
                  <a target='_blank'>
                    {character.firstName} {character.lastName}
                  </a>
                </Link>

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
                  <div className='my-4 mx-5 text-sm rounded-md p-3 bg-white'>
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
  const characters = await getCharacters()
  const characterTags = await getCharacterTags()

  const characterTagOptions = characterTags.map((tag) => ({
    label: tag.name,
    value: tag.id.toString(),
  }))

  return {
    props: {
      allCharacters: characters,
      characterTagOptions,
    },
  }
}

export default Characters
