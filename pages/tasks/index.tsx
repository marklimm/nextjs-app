import React, { FunctionComponent } from 'react'
import Head from 'next/head'

import { Provider } from 'react-redux'

// import { useAssigneeSearch } from 'lib/tasks/useAssigneeSearch'

import ReduxStore from 'lib/redux/ReduxStore'

import descriptionStyle from '../index.module.scss'

import { TasksFilter } from './TasksFilter'
import { TasksResults } from './TasksResults'

/**
 * This component defines the UI for the /tasks route, which includes displaying the list of tasks
 *
 * @returns
 */
const Tasks: FunctionComponent = (): JSX.Element => {
  // const {
  //   assigneeOptions,
  //   assigneeSelected,
  //   selectedAssigneeIds,
  //   setSelectedAssigneeIds,
  // } = useAssigneeSearch()

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
        <Provider store={ReduxStore}>
          <div className='col-span-1 text-sm searchResultCard'>
            <TasksFilter />
          </div>

          <div className='col-span-3 ml-8'>
            <TasksResults />
          </div>
        </Provider>
      </div>
    </>
  )
}

export default Tasks
