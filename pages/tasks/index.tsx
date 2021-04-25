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

  const getTasks = async (selectedAssignees: SelectOption[] = []) => {
    const assigneeIdsStr = selectedAssignees.map((a) => a.value).join(',') || ''

    const response = await fetch(`/api/tasks?assigneeIds=${assigneeIdsStr}`, {})

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
    const loadTasksAndCharacters = async () => {
      await getTasks()
      await getCharactersTerse()

      setLoadingState(LoadingState.DONE_LOADING)
    }

    loadTasksAndCharacters()
  }, [])

  const assigneeSelected = (selectedAssignees) => {
    console.log('assignee selected', selectedAssignees)

    getTasks(selectedAssignees)
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
        </div>

        <div className='col-span-3 ml-8'>
          {loadingState === LoadingState.LOADING && <div>Loading ...</div>}
          {loadingState === LoadingState.DONE_LOADING && tasks.length === 0 && (
            <div>There are currently no tasks.</div>
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
