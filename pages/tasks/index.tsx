import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { toast } from 'react-toastify'

import { allOption, IsCompletedFilter, TShirtSize } from 'lib/types/Task'
import {
  DropdownFilter,
  FilterControl,
  FilterControlType,
  SearchType,
  TaskFilterFields,
} from 'lib/redux/searchFilters/filterTypes'

import { FilterPanel } from 'components/FilterPanel/FilterPanel'
import TasksResults from 'components/Tasks/TasksResults'

import descriptionStyle from '../index.module.scss'
import { SelectOption } from 'lib/types/SelectOption'

/**
 * This component defines the UI for the /tasks route, which includes displaying the list of tasks and the left hand filter panel
 *
 * @returns
 */
const Tasks = (): JSX.Element => {
  const [filterControls, setFilterControls] = useState<FilterControl[]>([
    {
      type: FilterControlType.Text,
      id: TaskFilterFields.Title,
      label: 'Title',
      placeholder: 'Title',
    },
    {
      type: FilterControlType.Dropdown,
      id: TaskFilterFields.Assignee,
      label: 'Assignee',
      placeholder: 'Assignee',

      //  this options array will get populated by getCharactersTerse(), but is first passed in an empty array on the initial rendering
      options: [],
    },
    {
      type: FilterControlType.Dropdown,
      id: TaskFilterFields.TShirtSize,
      label: 'T-shirt size',
      placeholder: 'T-shirt size',

      options: [
        {
          label: TShirtSize[TShirtSize.SMALL],
          value: TShirtSize.SMALL.toString(),
        },
        {
          label: TShirtSize[TShirtSize.MEDIUM],
          value: TShirtSize.MEDIUM.toString(),
        },
        {
          label: TShirtSize[TShirtSize.LARGE],
          value: TShirtSize.LARGE.toString(),
        },
      ],
    },
    {
      type: FilterControlType.ListBox,
      id: TaskFilterFields.Completed,
      label: 'Completed status',
      placeholder: 'Completed status',

      options: [
        allOption,
        {
          label: IsCompletedFilter.NOT_COMPLETED.toString(),
          value: IsCompletedFilter.NOT_COMPLETED,
        },
        {
          label: IsCompletedFilter.COMPLETED.toString(),
          value: IsCompletedFilter.COMPLETED,
        },
      ],
    },
  ])

  useEffect(() => {
    //  on page load retrieve a terse list of all the characters from the server via an ajax call (to match how the tasks themselves are pulled via CSR)
    //  we could possibly pull in the list of characters at build time but since this route is doing CSR for the Tasks I thought I'd also retrieve the characters with CSR to match

    const getCharactersTerse = async () => {
      const response = await fetch('/api/charactersTerse', {})

      if (response.status >= 400) {
        const errorData = await response.json()

        console.error('server error: ', errorData.message)

        toast.error(`Error: ${errorData.message}`)
        return
      }

      const data = await response.json()

      const assigneeOptions: SelectOption[] = data.characters.map(
        (character) => ({
          label: `${character.firstName} ${character.lastName}`,
          value: character.id.toString(),
        })
      )

      //  update the assignee filter with the list of assignee options
      setFilterControls((filterControls) => {
        return filterControls.map((filter) => {
          if (filter.id !== TaskFilterFields.Assignee) {
            return filter
          }

          ;(filter as DropdownFilter).options = assigneeOptions

          return filter
        })
      })
    }

    getCharactersTerse()
  }, [])

  return (
    <>
      <Head>
        <title>NextJS demo - Tasks</title>
        <meta
          name='description'
          content='A filterable list of data using client-side rendering in NextJS'
        ></meta>
      </Head>
      <h1>Tasks</h1>

      <div className={descriptionStyle.descriptionArea}>
        <div>
          This page displays various Tasks that Star Wars characters have
        </div>

        <ul className='mt-2'>
          <li>
            This page retrieves tasks by calling the server-side /tasks API and
            then does client-side rendering
          </li>
          <li>
            Every time the user changes the search criteria a new query to the
            database is being made
          </li>
          <li>The data is not statically rendered</li>
          <li>
            The title text search is debounced so that the API isn&apos;t
            queried until the user has finished typing
          </li>
          <li>
            NextJS image optimization is used for each of the character
            thumbnail images
          </li>
        </ul>
      </div>

      <div className='grid grid-cols-4 mt-4 items-start'>
        <div className='col-span-1 text-sm searchResultCard'>
          <FilterPanel
            searchType={SearchType.Tasks}
            filterControls={filterControls}
          />
        </div>

        <div className='col-span-3 ml-8'>
          <TasksResults />
        </div>
      </div>
    </>
  )
}

export default Tasks
