import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'

import { useAppSelector } from 'lib/redux/hooks'
import { LoadingState } from 'lib/types/LoadingState'
import { IsCompletedFilter, Task, TShirtSize } from 'lib/types/Task'
import {
  FilterControlType,
  SearchType,
  TaskFilterFields,
} from 'lib/redux/searchFilters/filterTypes'

const TasksResults = (): JSX.Element => {
  const { filterControlValues } = useAppSelector((state) => {
    return state.searchFilter[SearchType.Tasks]
  })

  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.LOADING
  )

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const getTasks = async () => {
      let queryTasksString = `/api/tasks?`

      filterControlValues.forEach((filter) => {
        //  why do I need to do a switch-case inside of a switch-case?  The outer switch-case allows us to have a strongly typed `filter` variable based on the type of filter control and the inner switch-case updates the appropriate part of `queryTasksString`

        switch (filter.type) {
          case FilterControlType.Text:
            {
              switch (filter.id) {
                case TaskFilterFields.Title: {
                  queryTasksString += `&title=${filter.value}`
                  break
                }
              }
            }

            break

          case FilterControlType.Dropdown:
            {
              const selectedIds =
                filter.selectedOptions
                  .map((assignee) => assignee.value)
                  .join(',') || ''

              switch (filter.id) {
                case TaskFilterFields.Assignee: {
                  queryTasksString += `&assigneeIds=${selectedIds}`
                  break
                }

                case TaskFilterFields.TShirtSize: {
                  queryTasksString += `&tShirtSizeIds=${selectedIds}`
                  break
                }
              }
            }
            break

          case FilterControlType.ListBox:
            {
              switch (filter.id) {
                case TaskFilterFields.Completed: {
                  if (
                    filter.selectedOption.value ===
                      IsCompletedFilter.COMPLETED ||
                    filter.selectedOption.value ===
                      IsCompletedFilter.NOT_COMPLETED
                  ) {
                    queryTasksString += `&completedFlag=${filter.selectedOption.value.toString()}`
                  }
                  break
                }
              }
            }
            break
        }
      })

      setLoadingState(LoadingState.LOADING)

      const response = await fetch(queryTasksString)

      if (response.status >= 400) {
        const errorData = await response.json()

        console.error('server error: ', errorData.message)

        toast.error(`Error: ${errorData.message}`)

        setLoadingState(LoadingState.ERROR)
        return
      }

      const data = await response.json()
      setTasks(data.tasks)

      setLoadingState(LoadingState.DONE_LOADING)
    }

    getTasks()
  }, [filterControlValues])

  return (
    <>
      {loadingState === LoadingState.LOADING && <div>Loading ...</div>}
      {loadingState === LoadingState.DONE_LOADING && tasks.length === 0 && (
        <div>There are no tasks that match the current search criteria</div>
      )}
      {loadingState === LoadingState.DONE_LOADING &&
        tasks.map((task) => {
          return (
            <div key={task.id} className='searchResultCard'>
              <span className='text-lg'>{task.title}</span>

              <div className='text-sm mt-2'>{task.description}</div>

              <div className='text-sm flex items-center'>
                <div className='mr-3'>Assigned to: </div>

                {task.assignedTo.imageUrl && (
                  <div className='mr-2'>
                    <Image
                      src={`/characters/${task.assignedTo.imageUrl}`}
                      alt={`${task.assignedTo.firstName} ${task.assignedTo.lastName}`}
                      width={50}
                      height={50}
                      className='rounded-full'
                    />
                  </div>
                )}
                <div className='font-bold'>
                  {task.assignedTo.firstName + ' ' + task.assignedTo.lastName}
                </div>
              </div>

              <div className='text-sm mt-2'>
                T-shirt size: {TShirtSize[task.tShirtSize]}
              </div>
              <div className='text-sm mt-2'>
                Completed:{' '}
                <span
                  className={`${
                    task.isComplete ? 'text-green-700' : 'text-red-700'
                  } font-bold`}
                >
                  {task.isComplete ? 'YES' : 'NO'}
                </span>
              </div>
            </div>
          )
        })}
    </>
  )
}

export default TasksResults
