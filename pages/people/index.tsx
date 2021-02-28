import React, { FunctionComponent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

// import { Tag } from 'node_modules/.prisma/client/index'
import { Person } from 'lib/types/Person'

import { getPeople } from 'dataProviders/PeopleData'
// import { getTags } from 'dataProviders/TagData'

// import { PeopleFilterBar } from 'components/FilterBar/PeopleFilterBar'

import styles from './index.module.scss'

export interface PeopleProps {
  allPeople: Person[]
  // tags: Tag[]
}

const People: FunctionComponent<PeopleProps> = ({ allPeople }) => {
  const [people, setPeople] = useState(allPeople)

  const onFilterUpdated = (filteredPeople: Person[]) => {
    setPeople(filteredPeople)
  }

  return (
    <>
      <Head>
        <title>Star Wars Characters</title>
      </Head>
      <h1>Star Wars Characters</h1>

      <div className='mt-2'>
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
          {/* <PeopleFilterBar
            allPeople={allPeople}
            tags={tags}
            onFilterUpdated={onFilterUpdated}
          /> */}
        </div>

        <div className='col-span-3 ml-8'>
          {people &&
            people.map(person => (
              <div key={person.id} className='searchResultCard'>
                <Link href={`/people/${person.id}`}>
                  <a target='_blank'>
                    {person.firstName} {person.lastName}
                  </a>
                </Link>

                {person.tags.length > 0 && (
                  <div className='mb-1'>
                    {person.tags.map(t => (
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
                          {person.firstName}'s latest post:{' '}
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
                        t => t.firstName + (t.lastName ? ' ' + t.lastName : '')
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
  // const tags = await getTags()

  return {
    props: {
      allPeople: people
      // tags
    }
  }
}

export default People
