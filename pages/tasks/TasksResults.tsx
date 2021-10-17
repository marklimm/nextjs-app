import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'

// import { useAppSelector } from 'lib/redux/hooks'

import { LoadingState } from 'lib/types/LoadingState'
import { IsCompletedFilter, Task, TShirtSize } from 'lib/types/Task'
import { useSelector } from 'react-redux'
import { IReduxStore } from 'lib/redux/ReduxStore'

const TasksResults = (): JSX.Element => {
  const {
    completed: { selectedCompletedOption },
    title: { searchString },
    tShirtSize: { selectedTShirtSizes },
  } = useSelector<IReduxStore>((state) => {
    return state.tasksFilter
  })

  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.LOADING
  )

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const getTasks = async () => {
      // const assigneeIds =
      //   selectedAssigneeIds.map((a) => a.value).join(',') || ''

      const tShirtSizeIds =
        selectedTShirtSizes.map((a) => a.value).join(',') || ''

      // let queryTasksString = `/api/tasks?assigneeIds=${assigneeIds}&title=${debouncedTitleSearchString}&tShirtSizeIds=${tShirtSizeIds}`
      let queryTasksString = `/api/tasks?title=${searchString}&tShirtSizeIds=${tShirtSizeIds}`

      if (
        selectedCompletedOption.value === IsCompletedFilter.COMPLETED ||
        selectedCompletedOption.value === IsCompletedFilter.NOT_COMPLETED
      ) {
        queryTasksString += `&completedFlag=${selectedCompletedOption.value.toString()}`
      }

      setLoadingState(LoadingState.LOADING)

      console.log('----')
      console.log('queryTasksString', queryTasksString)
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
  }, [searchString, selectedCompletedOption, selectedTShirtSizes])

  return (
    <>
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
    </>
  )
}

export default TasksResults
