//  This file is no longer being used, but I'm keeping this as an example of a non-generic filter component

import React, { useEffect, useState } from 'react'

import {
  setSelectedAssignees,
  setCompleted,
  setTitle,
  setTShirtSizes,
} from 'lib/redux/TasksFilterReducer'

import { SelectOption } from 'lib/types/SelectOption'
import { useAppDispatch, useAppSelector } from 'lib/redux/hooks'
import { useAssigneeSearch } from 'lib/tasks/useAssigneeSearch'

import { Dropdown } from 'components/FilterPanel/Dropdown'
import { ListBox } from 'components/FilterPanel/ListBox'
import { Textbox } from 'components/FilterPanel/Textbox'
import { useDebounce } from 'components/FilterPanel/Textbox'

/**
 * This component is hard-coded ... I'm wondering if I can convert this to use the generic <FilterPanel /> instead
 * @returns
 */
const TasksFilter = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const {
    assignee: { assigneeOptions, selectedAssignees },
    completed: { completedStatusOptions, selectedCompletedOption },
    tShirtSize: { selectedTShirtSizes, tShirtSizeOptions },
  } = useAppSelector((state) => {
    return state.tasksFilter
  })

  //  title search string
  const [titleSearchString, setTitleSearchString] = useState('')
  const debouncedTitleSearchString = useDebounce(titleSearchString, 300)
  useEffect(() => {
    dispatch(setTitle(debouncedTitleSearchString))
  }, [debouncedTitleSearchString])

  //  retrieve the list of characters/assignees for tasks
  useAssigneeSearch()

  const resetFilters = (event) => {
    event.preventDefault()

    setAssigneesHandler([])

    setTShirtSizesHandler([])

    setCompletedFlag(completedStatusOptions[0])

    setTitleSearchString('')
  }

  const setAssigneesHandler = (selectedAssignees: SelectOption[]) => {
    dispatch(setSelectedAssignees(selectedAssignees))
  }

  const setCompletedFlag = (selectedOption: SelectOption) => {
    dispatch(setCompleted(selectedOption))
  }

  const titleSearchStringChanged = (event) => {
    setTitleSearchString(event.target.value)
  }

  const setTShirtSizesHandler = (selectedTShirtSizes: SelectOption[]) => {
    dispatch(setTShirtSizes(selectedTShirtSizes))
  }

  return (
    <>
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
        optionSelected={setAssigneesHandler}
        placeholder={'Assigned to'}
        value={selectedAssignees}
      />

      <Dropdown
        label={'T-shirt size'}
        selectOptions={tShirtSizeOptions}
        optionSelected={setTShirtSizesHandler}
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
        allOptions={completedStatusOptions}
        selectedOption={selectedCompletedOption}
        setSelectedOption={setCompletedFlag}
      />
    </>
  )
}

export default TasksFilter
