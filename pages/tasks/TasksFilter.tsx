import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'lib/redux/hooks'

import { Dropdown } from 'components/FilterPanel/Dropdown'
import { ListBox } from 'components/FilterPanel/ListBox'
import { Textbox } from 'components/FilterPanel/Textbox'

import {
  setCompleted,
  setTitle,
  setTShirtSizes,
} from 'lib/redux/search/TasksFilterReducer'
import { SelectOption } from 'lib/types/SelectOption'
import { useDebounce } from 'components/FilterPanel/Textbox'

const TasksFilter = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const {
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

  const resetFilters = (event) => {
    event.preventDefault()

    // setSelectedAssigneeIds([])

    setTShirtSizesHandler([])

    setCompletedFlag(completedStatusOptions[0])

    setTitleSearchString('')
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
      {/* 
      <Dropdown
        label={'Assignee'}
        selectOptions={assigneeOptions}
        optionSelected={assigneeSelected}
        placeholder={'Assigned to'}
        value={selectedAssigneeIds}
      />
*/}
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
