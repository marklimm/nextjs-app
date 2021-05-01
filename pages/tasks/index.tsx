import React, { FunctionComponent, useEffect, useState } from 'react'
import Head from 'next/head'

import { LoadingState } from 'lib/types/LoadingState'
import { Task, TShirtSize } from 'lib/types/Task'

import { Dropdown } from 'components/FilterPanel/Dropdown'
import { Textbox } from 'components/FilterPanel/Textbox'

import { useAssigneeSearch } from './useAssigneeSearch'
import { useTitleSearch } from './useTitleSearch'
import { useTShirtSearch } from './useTShirtSearch'

/**
 * This component defines the UI for the /tasks route, which includes displaying the list of tasks
 *
 * @returns
 */
const Tasks: FunctionComponent = (): JSX.Element => {
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.LOADING
  )
  const [tasks, setTasks] = useState<Task[]>([])

  const {
    debouncedTitleSearchString,
    setTitleSearchString,
    titleSearchString,
    titleSearchStringChanged,
  } = useTitleSearch()

  const {
    assigneeOptions,
    assigneeSelected,
    selectedAssigneeIds,
    setSelectedAssigneeIds,
  } = useAssigneeSearch(setLoadingState)

  const {
    selectedTShirtSizes,
    setSelectedTShirtSizes,
    tShirtSizes,
    tShirtSizeSelected,
  } = useTShirtSearch()

  useEffect(() => {
    const getTasks = async () => {
      const assigneeIds =
        selectedAssigneeIds.map((a) => a.value).join(',') || ''

      const tShirtSizeIds =
        selectedTShirtSizes.map((a) => a.value).join(',') || ''

      const response = await fetch(
        `/api/tasks?assigneeIds=${assigneeIds}&title=${debouncedTitleSearchString}&tShirtSizeIds=${tShirtSizeIds}`,
        {}
      )

      if (response.status >= 400) {
        console.error('there was some error', response.statusText)

        setLoadingState(LoadingState.ERROR)
        return
      }

      const data = await response.json()
      setTasks(data.tasks)
    }

    getTasks()
  }, [selectedAssigneeIds, debouncedTitleSearchString, selectedTShirtSizes])

  const resetFilters = (event) => {
    event.preventDefault()

    setSelectedAssigneeIds([])
    setSelectedTShirtSizes([])
    setTitleSearchString('')
  }

  return (
    <>
      <Head>
        <title>NextJS demo - Tasks</title>
      </Head>
      <h1>Tasks</h1>

      <div>This page displays various Tasks that Star Wars characters have</div>

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
          The title text search is debounced so that the API isn&apos;t queried
          until the user has finished typing
        </li>
      </ul>

      <div className='grid grid-cols-4 mt-4 items-start'>
        <div className='col-span-1 text-sm searchResultCard'>
          <a href='#' className='text-blue-800' onClick={resetFilters}>
            Reset filters
          </a>

          <Textbox
            label={'Title search'}
            onChange={titleSearchStringChanged}
            placeholder={'Title search'}
            value={titleSearchString}
          />

          <Dropdown
            label={'Assignee'}
            selectOptions={assigneeOptions}
            optionSelected={assigneeSelected}
            placeholder={'Assigned to'}
            value={selectedAssigneeIds}
          />

          <Dropdown
            label={'T-shirt size'}
            selectOptions={tShirtSizes}
            optionSelected={tShirtSizeSelected}
            placeholder={'T-shirt size'}
            value={selectedTShirtSizes}
          />
        </div>

        <div className='col-span-3 ml-8'>
          {loadingState === LoadingState.LOADING && <div>Loading ...</div>}
          {loadingState === LoadingState.DONE_LOADING && tasks.length === 0 && (
            <div>There are no tasks that match the current search criteria</div>
          )}
          {loadingState === LoadingState.DONE_LOADING &&
            tasks.map((t) => {
              return (
                <div key={t.id} className='searchResultCard'>
                  <span className='text-lg'>{t.title}</span>

                  <div className='text-sm'>
                    <span>Assigned to: </span>
                    <span className='font-bold'>
                      {t.assignedTo.firstName + ' ' + t.assignedTo.lastName}
                    </span>
                  </div>

                  <div className='text-sm mt-2'>{t.description}</div>
                  <div className='text-sm mt-2'>
                    T-shirt size: {TShirtSize[t.tShirtSize]}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default Tasks
