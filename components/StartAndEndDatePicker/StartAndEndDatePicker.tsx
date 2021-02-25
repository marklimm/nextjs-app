import { FunctionComponent, useEffect, useRef } from 'react'

//  adding `vaadin-date-picker` to IntrinsicElements to resolve a typescript error
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vaadin-date-picker': any
      'vaadin-date-picker-date-picker': any
      'vaadin-date-picker-date-text-field': any
    }
  }
}

export interface StartAndEndDatePickerProps {
  clearEndDate: () => void
  clearStartDate: () => void

  initialEndDate: string
  initialStartDate: string

  endDateSelected: (string) => void
  startDateSelected: (string) => void
}

/**
 * Component that renders the start and end date pickers within the set of filters
 * @param StartAndEndDatePickerProps
 */
export const StartAndEndDatePicker: FunctionComponent<StartAndEndDatePickerProps> = ({
  clearEndDate,
  clearStartDate,
  endDateSelected,
  startDateSelected,
  initialEndDate,
  initialStartDate
}) => {
  //  in order for maxDate to actually take effect for the vaadin-date-picker, I have to ensure that the maxDate passed in is in YYYY-MM-DD format, which is why I'm slice()-ing below
  const maxDate = useRef(new Date().toJSON().slice(0, -14))
  const minDate = useRef('2015-01-01')

  const startDatePicker = useRef(null)
  const endDatePicker = useRef(null)

  useEffect(() => {
    //  import the web component on the client-side with this import()
    import('node_modules/@vaadin/vaadin-date-picker/vaadin-date-picker.js')

    //  define an event handler for the date picker's `value-changed` event
    startDatePicker.current.addEventListener('value-changed', event => {
      startDateSelected(event.detail.value)
    })

    endDatePicker.current.addEventListener('value-changed', event => {
      endDateSelected(event.detail.value)
    })
  }, [])

  return (
    <div>
      {/* because this web component isn't a react "controlled component", the data flow is slightly different because when the user selects a date/time, the date/time is immediately updated in this web component, and doesn't rely on the parent component to provide the new value (as is typically the case with unidirectional data flow) */}

      <div>
        Start Date:
        <br />
        <vaadin-date-picker
          style={{ width: '10rem' }}
          ref={startDatePicker}
          date-placeholder='Start Date'
          max={maxDate.current}
          min={minDate.current}
          value={initialStartDate}
        ></vaadin-date-picker>
        <a
          className='ml-3 cursor-pointer'
          onClick={event => {
            event.preventDefault()
            startDatePicker.current.value = ''
            clearStartDate()
          }}
        >
          Clear
        </a>
      </div>

      <div className='mt-3'>
        End Date:
        <br />
        <vaadin-date-picker
          ref={endDatePicker}
          style={{ width: '10rem' }}
          date-placeholder='End Date'
          max={maxDate.current}
          min={minDate.current}
          value={initialEndDate}
        ></vaadin-date-picker>
        <a
          className='ml-3 cursor-pointer'
          onClick={event => {
            event.preventDefault()
            endDatePicker.current.value = ''
            clearEndDate()
          }}
        >
          Clear
        </a>
      </div>
    </div>
  )
}
