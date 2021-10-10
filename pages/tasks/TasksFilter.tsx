import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Dropdown } from 'components/FilterPanel/Dropdown'
import { ListBox } from 'components/FilterPanel/ListBox'
import { Textbox } from 'components/FilterPanel/Textbox'

import { IReduxStore } from 'lib/redux/ReduxStore'

import {
  setCompleted,
  setTitle,
  setTShirtSizes,
} from 'lib/redux/search/TasksFilterReducer'
import { SelectOption } from 'lib/types/SelectOption'
import { useDebounce } from 'components/FilterPanel/Textbox'

export const TasksFilter: React.FC = (): JSX.Element => {
  const dispatch = useDispatch()

  const {
    completed: {
      options: completedStatusOptions,
      selectedOption: selectedCompletedOption,
    },
    tShirtSize: { options: tShirtSizeOptions, selectedTShirtSize },
  } = useSelector<IReduxStore>((state) => {
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

    setTShirtSizes([])

    setCompletedFlag(completedStatusOptions[0])

    setTitleSearchString('')
  }

  const setCompletedFlag = (selectedOption: SelectOption) => {
    dispatch(setCompleted(selectedOption))
  }

  const titleSearchStringChanged = (event) => {
    setTitleSearchString(event.target.value)
  }

  const setTShirtSizes = (selectedTShirtSizes: SelectOption[]) => {
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
        optionSelected={setTShirtSizes}
        placeholder={'T-shirt size'}
        value={selectedTShirtSize}
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
