import React, { useRef, useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'lib/redux/hooks'
import { SearchType } from 'lib/redux/searchFilters/filterTypes'
import {
  FilterActionType,
  TextFilterState,
} from 'lib/redux/searchFilters/searchFilterReducerTypes'
import { updateFilter } from 'lib/redux/searchFilters/searchFilterReducer'

interface TextboxProps {
  filterId: string
  label: string
  placeholder: string
  searchType: SearchType
}

export const Textbox = ({
  filterId,
  label,
  placeholder,
  searchType,
}: TextboxProps): JSX.Element => {
  const textboxFilterState = useAppSelector((state) => {
    return state.searchFilter[searchType].filterControlValues.find(
      (filter) => filter.id === filterId
    ) as TextFilterState
  })

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    //  when the redux textboxFilterState value changes then that sets the searchTerm (this allows the searchTerm to be reset back to empty string
    setSearchTerm(textboxFilterState.value)
  }, [textboxFilterState])

  const dispatch = useAppDispatch()

  const textChangeTimeoutRef = useRef<NodeJS.Timeout>()

  const onTextChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value

    setSearchTerm(value)

    //  cancel any previous timeout
    clearTimeout(textChangeTimeoutRef.current)

    textChangeTimeoutRef.current = setTimeout(() => {
      //  dispatch the text change

      //  don't search if the user has only typed 1-3 characters.  0 characters will remove the text filter control
      if (value.length > 0 && value.length < 4) {
        return
      }

      dispatch(
        updateFilter({
          searchType,
          filterActionType: FilterActionType.TextChanged,
          id: filterId,
          value,
        })
      )
    }, 300)
  }

  return (
    <div className='my-4'>
      <div className='font-bold mb-1'>{label}</div>
      <input
        type='text'
        value={searchTerm}
        className='p-2 border border-gray-300 rounded-md shadow-md focus:outline-none'
        onChange={onTextChanged}
        placeholder={placeholder}
      />
    </div>
  )
}

/**
 * This custom hook returns a debounced search term that is either (1) the initial value or (2) a value that has passed validation by not changing after `delay` milliseconds
 * @param searchTerm The current search string the user has typed in the UI
 * @param delay The amount of milliseconds that need to pass before `debouncedValue` is updated
 * @returns the debounced value
 */
export const useDebounce = (searchTerm = '', delay = 250): string => {
  //  Thanks to https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci for this debounce custom hook

  //  pass in the initial value of the searchTerm
  //  define the debounced value that will be returned by this function.  The debouncedValue has "passed this debounce validation" by not changing after `delay` milliseconds
  const [debouncedValue, setDebouncedValue] = useState(searchTerm)

  useEffect(() => {
    const handler = setTimeout(() => {
      //  after `delay` milliseconds, set the `debouncedValue`

      setDebouncedValue(searchTerm)
    }, delay)

    return () => {
      //  the searchTerm changed before `delay` milliseconds elapsed, therefore clear the previous timeout right before creating a new timeout (that will fun after `delay` milliseconds)
      clearTimeout(handler)
    }
  }, [searchTerm])

  //  the returned `debouncedValue` is either the initial value or a value that has "passed validation" by enduring for longer than `delay` milliseconds
  return debouncedValue
}
