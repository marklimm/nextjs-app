import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'

import { getCharacters } from 'dataProviders/CharacterData'
import { getCharacterTags } from 'dataProviders/CharacterTagData'

import { SelectOption } from 'lib/types/SelectOption'
import { Character } from 'lib/types/Character'
import {
  FilterControl,
  FilterControlType,
  SearchType,
} from 'lib/redux/searchFilters/filterTypes'

import { FilterPanel } from 'components/FilterPanel/FilterPanel'

import {
  CharacterFilterFields,
  CharactersResults,
} from 'components/Characters/CharactersResults'

import descriptionStyle from '../index.module.scss'

export interface CharactersProps {
  allCharacters: Character[]
  filterControls: FilterControl[]
}

/**
 * This component defines the UI for the /characters route, which includes a filters panel and the Characters search results
 * @param param0
 * @returns
 */
const Characters = ({
  allCharacters,
  filterControls,
}: CharactersProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>NextJS demo - Characters</title>
        <meta
          name='description'
          content='An example of NextJS static site generation with relational data'
        ></meta>
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
          <FilterPanel
            searchType={SearchType.Characters}
            filterControls={filterControls}
          />
        </div>

        <div className='col-span-3 ml-8'>
          <CharactersResults allCharacters={allCharacters} />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const characters = await getCharacters()
  const characterTags = await getCharacterTags()

  const characterTagOptions: SelectOption[] = characterTags.map((tag) => ({
    label: tag.name,
    value: tag.id.toString(),
  }))

  const friendOptions: SelectOption[] = characters.map((c) => ({
    label: `${c.firstName} ${c.lastName}`,
    value: c.id.toString(),
  }))

  const filterControls: FilterControl[] = [
    {
      type: FilterControlType.Dropdown,
      id: CharacterFilterFields.CharacterTags,
      label: 'Tags',
      placeholder: 'Character Tags',

      options: characterTagOptions,
    },
    {
      type: FilterControlType.Dropdown,
      id: CharacterFilterFields.Friends,
      label: 'Friends',
      placeholder: 'Friends with',

      options: friendOptions,
    },
    {
      type: FilterControlType.Text,
      id: CharacterFilterFields.Name,
      label: 'Name',
      placeholder: 'Name',
    },
    {
      type: FilterControlType.Text,
      id: CharacterFilterFields.Bio,
      label: 'Bio',
      placeholder: 'Bio keyword',
    },
  ]

  return {
    props: {
      allCharacters: characters,
      filterControls,
    },
  }
}

export default Characters
