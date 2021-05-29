import React, { FunctionComponent, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { toast } from 'react-toastify'

import { LoadingState } from 'lib/types/LoadingState'
import { IsCompletedFilter, Task, TShirtSize } from 'lib/types/Task'

import { useAssigneeSearch } from 'lib/tasks/useAssigneeSearch'
import { useCompletedSearch } from 'lib/tasks/useCompletedSearch'
import { useTitleSearch } from 'lib/tasks/useTitleSearch'
import { useTShirtSearch } from 'lib/tasks/useTShirtSearch'

import { Dropdown } from 'components/FilterPanel/Dropdown'
import { ListBox } from 'components/FilterPanel/ListBox'
import { Textbox } from 'components/FilterPanel/Textbox'

import descriptionStyle from '../index.module.scss'

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
    completedFlag,
    completedFlagOptions,
    setCompletedFlag,
  } = useCompletedSearch()

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

      let queryTasksString = `/api/tasks?assigneeIds=${assigneeIds}&title=${debouncedTitleSearchString}&tShirtSizeIds=${tShirtSizeIds}`

      if (
        completedFlag.value === IsCompletedFilter.COMPLETED ||
        completedFlag.value === IsCompletedFilter.NOT_COMPLETED
      ) {
        queryTasksString += `&completedFlag=${completedFlag.value.toString()}`
      }

      const response = await fetch(queryTasksString, {})

      if (response.status >= 400) {
        const errorData = await response.json()

        console.error('server error: ', errorData.message)

        toast.error(`Error: ${errorData.message}`)

        setLoadingState(LoadingState.ERROR)
        return
      }

      const data = await response.json()
      setTasks(data.tasks)
    }

    getTasks()
  }, [
    completedFlag,
    debouncedTitleSearchString,
    selectedAssigneeIds,
    selectedTShirtSizes,
  ])

  const resetFilters = (event) => {
    event.preventDefault()

    setSelectedAssigneeIds([])
    setSelectedTShirtSizes([])
    setCompletedFlag(completedFlagOptions[0])
    setTitleSearchString('')
  }

  return (
    <>
      <Head>
        <title>NextJS demo - Tasks</title>
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
        </ul>
      </div>

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

          {/* <Toggle /> is only good if you only have 2 options */}
          {/* <Toggle
            label={'Completed Tasks'}
            enabled={showCompletedTasks}
            setEnabled={setShowCompletedTasks}
          /> */}

          <ListBox
            label={'Completed Status'}
            allOptions={completedFlagOptions}
            selectedOption={completedFlag}
            setSelectedOption={setCompletedFlag}
          />
        </div>

        <div className='col-span-3 ml-8'>
          {loadingState === LoadingState.LOADING && <div>Loading ...</div>}
          {loadingState === LoadingState.DONE_LOADING && tasks.length === 0 && (
            <div>There are no tasks that match the current search criteria</div>
          )}
          {loadingState === LoadingState.DONE_LOADING &&
            // tasks.length > 0 &&
            tasks.map((t) => {
              return (
                <div key={t.id} className='searchResultCard'>
                  <span className='text-lg'>{t.title}</span>

                  <div className='text-sm mt-2'>{t.description}</div>

                  <div className='text-sm flex items-center'>
                    <div className='mr-3'>Assigned to: </div>

                    {t.assignedTo.imageUrl && (
                      <div className='mr-2'>
                        <Image
                          src={`/characters/${t.assignedTo.imageUrl}`}
                          alt={`${t.assignedTo.firstName} ${t.assignedTo.lastName}`}
                          width={50}
                          height={50}
                          className='rounded-full'
                        />
                      </div>
                    )}
                    <div className='font-bold'>
                      {t.assignedTo.firstName + ' ' + t.assignedTo.lastName}
                    </div>
                  </div>

                  <div className='text-sm mt-2'>
                    T-shirt size: {TShirtSize[t.tShirtSize]}
                  </div>
                  <div className='text-sm mt-2'>
                    Completed:{' '}
                    <span
                      className={`${
                        t.isComplete ? 'text-green-700' : 'text-red-700'
                      } font-bold`}
                    >
                      {t.isComplete ? 'YES' : 'NO'}
                    </span>
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
