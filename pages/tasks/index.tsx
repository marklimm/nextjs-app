import React, { FunctionComponent, useEffect, useState } from 'react'
import Head from 'next/head'

import { Task, TShirtSize } from 'lib/types/Task'
import { SelectOption } from 'lib/types/SelectOption'

import { Dropdown } from 'components/FilterPanel/Dropdown'

enum LoadingState {
  LOADING,
  DONE_LOADING,
  ERROR,
}

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

  const [assigneeOptions, setAssigneeOptions] = useState<SelectOption[]>([])
  const [tShirtSizes] = useState<SelectOption[]>([
    {
      label: TShirtSize[TShirtSize.SMALL],
      value: TShirtSize.SMALL,
    },
    {
      label: TShirtSize[TShirtSize.MEDIUM],
      value: TShirtSize.MEDIUM,
    },
    {
      label: TShirtSize[TShirtSize.LARGE],
      value: TShirtSize.LARGE,
    },
  ])

  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<
    SelectOption[]
  >([])

  const [selectedTShirtSizes, setSelectedTShirtSizes] = useState<
    SelectOption[]
  >([])

  const getTasks = async () => {
    const response = await fetch(
      `/api/tasks?assigneeIds=${selectedAssigneeIds}&tShirtSizeIds=${selectedTShirtSizes}`,
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

  const getCharactersTerse = async () => {
    const response = await fetch('/api/charactersTerse', {})

    if (response.status >= 400) {
      console.error('there was some error', response.statusText)

      setLoadingState(LoadingState.ERROR)
      return
    }

    const data = await response.json()

    const assigneeOptions = data.characters.map((character) => ({
      label: `${character.firstName} ${character.lastName}`,
      value: character.id.toString(),
    }))

    setAssigneeOptions(assigneeOptions)
  }

  useEffect(() => {
    const loadCharacters = async () => {
      await getCharactersTerse()

      setLoadingState(LoadingState.DONE_LOADING)
    }

    loadCharacters()
  }, [])

  useEffect(() => {
    getTasks()
  }, [selectedAssigneeIds, selectedTShirtSizes])

  const assigneeSelected = (selectedAssignees) => {
    const assigneeIds = selectedAssignees.map((a) => a.value).join(',') || ''
    setSelectedAssigneeIds(assigneeIds)
  }

  const tShirtSizeSelected = (selectedTShirtSizes) => {
    const tShirtSizeIds =
      selectedTShirtSizes.map((a) => a.value).join(',') || ''

    setSelectedTShirtSizes(tShirtSizeIds)
  }

  return (
    <>
      <Head>
        <title>NextJS demo - Tasks</title>
      </Head>
      <h1>Tasks</h1>

      <div>
        This page retrieves tasks by calling the server-side /tasks API and then
        does client-side rendering. Each reload of this page is querying the
        prisma DB on the backend
      </div>

      <div className='grid grid-cols-4 mt-4 items-start'>
        <div className='col-span-1 text-sm searchResultCard'>
          <Dropdown
            label={'Assignee'}
            selectOptions={assigneeOptions}
            optionSelected={assigneeSelected}
          />

          <Dropdown
            label={'T-shirt size'}
            selectOptions={tShirtSizes}
            optionSelected={tShirtSizeSelected}
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
