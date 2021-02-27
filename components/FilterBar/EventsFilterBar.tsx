import { FunctionComponent } from 'react'
import Select from 'react-select'
import { SelectOption } from 'lib/types/SelectOption'

import { StartAndEndDatePicker } from 'components/StartAndEndDatePicker/StartAndEndDatePicker'

interface EventsFilterBarProps {
  emotionTagOptions: SelectOption[]

  selectedEmotionTags: SelectOption[]

  startDateSelected: (string) => void
  endDateSelected: (string) => void
  clearStartDate: () => void
  clearEndDate: () => void
  emotionTagSelected: (selectedOptions: SelectOption[]) => void
}

/**
 * The left-hand filter bar for the /events route
 * @param EventsFilterBarProps
 */
export const EventsFilterBar: FunctionComponent<EventsFilterBarProps> = ({
  emotionTagOptions,
  selectedEmotionTags,

  startDateSelected,
  endDateSelected,
  clearStartDate,
  clearEndDate,
  emotionTagSelected
}) => {
  return (
    <div>
      <h1 className='text-base mb-3'>Filter events by:</h1>
      <StartAndEndDatePicker
        clearEndDate={clearEndDate}
        clearStartDate={clearStartDate}
        initialEndDate={''}
        initialStartDate={''}
        endDateSelected={endDateSelected}
        startDateSelected={startDateSelected}
      />

      <h1 className='mt-3'>Emotion:</h1>
      <Select
        className='mt-1'
        // styles={customStyles}
        value={selectedEmotionTags}
        isMulti
        onChange={emotionTagSelected}
        options={emotionTagOptions}
        placeholder='Emotions to search on ...'
        instanceId='random-id-to-resolve-error-https://stackoverflow.com/questions/61290173/react-select-how-do-i-resolve-warning-prop-id-did-not-match'
      />
    </div>
  )
}
