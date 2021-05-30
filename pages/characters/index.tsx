import React, { FunctionComponent } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { getCharacters } from 'dataProviders/CharacterData'
import { getCharacterTags } from 'dataProviders/CharacterTagData'

import { useCharactersFilterer } from 'lib/characters/useCharactersFilterer'
import { SelectOption } from 'lib/types/SelectOption'
import { Character } from 'lib/types/Character'

import { FilterPanel } from 'components/FilterPanel/FilterPanel'

import descriptionStyle from '../index.module.scss'

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

  //  I don't know if there's a way to implement "Reset Filters" with the current setup.  I'm rendering <FilterPanel /> the first time but not re-rendering it again as the user makes filter changes, I believe because I don't want to rebuild the entire filter panel just because one value changed.  And also the belief that I should be able to just pass in configuration into <FilterPanel /> and it should be able to render different combinations of filters without me having to explicitly hard code the filters for each route (/characters, /events, etc.)

  return (
    <>
      <Head>
        <title>NextJS demo - Characters</title>
      </Head>
      <h1>Characters</h1>

      <div className={descriptionStyle.descriptionArea}>
        <div>
          This page displays information on Characters in the Star Wars
          universe!
        </div>
        <ul>
          <li>
            The characters data on this page is retrieved via prisma from a
            hosted postgres DB
          </li>
          <li>
            The data is statically rendered and the server is NOT queried as the
            user is selecting filter options
          </li>
          <li>
            The same FilterPanel component renders the left-hand filter panels
            for both the /characters and /events routes
          </li>
          <li>
            The schema for the three supporting prisma models (Character,
            CharacterPost and CharacterTag) are defined in a schema.prisma text
            file.
          </li>
          <li>
            NextJS image optimization is used for each of the character
            thumbnail images
          </li>
        </ul>

        <div className='mt-4'>
          The following relational data gets pulled in for each character
          <ul>
            <li>Tags - many Characters to many Tags relationship</li>
            <li>Posts - one Character to many Posts relationship</li>
            <li>
              Friends - many Characters to many Characters self-relationship
            </li>
          </ul>
        </div>
      </div>

      <div className='grid grid-cols-4 mt-4 items-start'>
        <div className='col-span-1 text-sm searchResultCard'>
          <FilterPanel filterControls={filterControls} />
        </div>

        <div className='col-span-3 ml-8'>
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
                          (t) =>
                            t.firstName + (t.lastName ? ' ' + t.lastName : '')
                        )
                        .join(', ')}
                    </span>
                  )}
                </div>
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
