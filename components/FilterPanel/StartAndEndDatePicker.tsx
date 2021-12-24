import React, { useEffect, useRef } from 'react'

import { useAppDispatch, useAppSelector } from 'lib/redux/hooks'
import { SearchType } from 'lib/redux/searchFilters/filterTypes'

import {
  FilterActionType,
  DateFilterState,
} from 'lib/redux/searchFilters/searchFilterReducerTypes'
import { updateFilter } from 'lib/redux/searchFilters/searchFilterReducer'

//  adding `vaadin-date-picker` to IntrinsicElements to resolve a typescript error
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'vaadin-date-picker': Record<string, unknown>
      'vaadin-date-picker-date-picker': Record<string, unknown>
      'vaadin-date-picker-date-text-field': Record<string, unknown>
    }
  }
}

export interface StartAndEndDatePickerProps {
  filterId: string

  label: string

  searchType: SearchType
}

/**
 * Component that renders the start and end date pickers within the set of filters
 * @param StartAndEndDatePickerProps
 */
export const StartAndEndDatePicker = ({
  filterId,
  label,
  searchType,
}: StartAndEndDatePickerProps): JSX.Element => {
  //  in order for maxDate to actually take effect for the vaadin-date-picker, I have to ensure that the maxDate passed in is in YYYY-MM-DD format, which is why I'm slice()-ing below
  const maxDate = useRef(new Date().toJSON().slice(0, -14))
  const minDate = useRef('2015-01-01')

  const startDatePicker = useRef(null)
  const endDatePicker = useRef(null)

  const dateFilterState = useAppSelector((state) => {
    return state.searchFilter[searchType].filterControlValues.find(
      (filter) => filter.id === filterId
    ) as DateFilterState
  })

  const dispatch = useAppDispatch()

  const startDateChanged = (startDate) => {
    dispatch(
      updateFilter({
        searchType,
        filterActionType: FilterActionType.DateSelectedStart,
        id: filterId,
        value: startDate,
      })
    )
  }

  const endDateChanged = (endDate) => {
    dispatch(
      updateFilter({
        searchType,
        filterActionType: FilterActionType.DateSelectedEnd,
        id: filterId,
        value: endDate,
      })
    )
  }

  const startDateChangedHandler = (event) => {
    startDateChanged(event.detail.value)
  }

  const endDateChangedHandler = (event) => {
    endDateChanged(event.detail.value)
  }

  useEffect(() => {
    //  import the web component on the client-side with this import()
    import('node_modules/@vaadin/vaadin-date-picker/vaadin-date-picker.js')

    //  define an event handler for the date picker's `value-changed` event
    startDatePicker.current.addEventListener(
      'value-changed',
      startDateChangedHandler
    )

    endDatePicker.current.addEventListener(
      'value-changed',
      endDateChangedHandler
    )

    return () => {
      if (!startDatePicker.current) {
        return
      }

      startDatePicker.current.removeEventListener(
        'value-changed',
        startDateChangedHandler
      )
      endDatePicker.current.removeEventListener(
        'value-changed',
        endDateChangedHandler
      )
    }
  }, [])

  return (
    <div className='my-4'>
      {/* because this web component isn't a react "controlled component", the data flow is slightly different because when the user selects a date/time, the date/time is immediately updated in this web component, and doesn't rely on the parent component to provide the new value (as is typically the case with unidirectional data flow) */}

      <div className='font-bold mb-1'>{label}</div>

      <div className='ml-5'>
        Start Date:
        <br />
        <vaadin-date-picker
          style={{ width: '10rem' }}
          ref={startDatePicker}
          date-placeholder='Start Date'
          max={maxDate.current}
          min={minDate.current}
          value={dateFilterState.startDate}
        ></vaadin-date-picker>
        <a
          className='ml-3 cursor-pointer'
          onClick={(event) => {
            event.preventDefault()

            startDateChanged('')
          }}
        >
          Clear
        </a>
      </div>

      <div className='mt-3 ml-5'>
        End Date:
        <br />
        <vaadin-date-picker
          ref={endDatePicker}
          style={{ width: '10rem' }}
          date-placeholder='End Date'
          max={maxDate.current}
          min={minDate.current}
          value={dateFilterState.endDate}
        ></vaadin-date-picker>
        <a
          className='ml-3 cursor-pointer'
          onClick={(event) => {
            event.preventDefault()

            endDateChanged('')
          }}
        >
          Clear
        </a>
      </div>
    </div>
  )
}
