import { FunctionComponent, useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { SelectOption } from 'lib/types/SelectOption'

import { StartAndEndDatePicker } from 'components/StartAndEndDatePicker/StartAndEndDatePicker'
import { EmotionTag, Event } from 'lib/types/Event'

interface EventsFilterBarProps {
  allEvents: Event[]
  emotionTagOptions: SelectOption[]
  onFilterUpdated: (filteredEvents: Event[]) => void
}

/**
 * The left-hand filter bar for the /events route
 * @param EventsFilterBarProps
 */
export const EventsFilterBar: FunctionComponent<EventsFilterBarProps> = ({
  allEvents,
  emotionTagOptions,
  onFilterUpdated
}) => {
  const allEventsRef = useRef(allEvents)

  const initialStartDate = ''
  const initialEndDate = ''

  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)

  //  I could try converting these filter fields to a reducer

  const [selectedEmotionTags, setSelectedEmotionTags] = useState<
    SelectOption[]
  >([])

  useEffect(() => {
    let filteredEvents = allEventsRef.current

    if (startDate) {
      filteredEvents = filteredEvents.filter(e => e.date > startDate)
    }

    if (endDate) {
      filteredEvents = filteredEvents.filter(e => e.date < endDate)
    }

    if (selectedEmotionTags.length > 0) {
      filteredEvents = filteredEvents.filter(event => {
        //  search for a match between the array of selected emotion tags and the array of tags on the current event
        const matchesWithSelectedTags = selectedEmotionTags.filter(
          selectedEmotionTag =>
            event.emotionTags.includes(EmotionTag[selectedEmotionTag.value])
        )

        return matchesWithSelectedTags.length > 0
      })
    }

    onFilterUpdated(filteredEvents)
  }, [startDate, endDate, selectedEmotionTags])

  const startDateSelected = startDate => {
    setStartDate(startDate)
  }

  const endDateSelected = endDate => {
    setEndDate(endDate)
  }

  const clearStartDate = () => {
    setStartDate('')
  }

  const clearEndDate = () => {
    setEndDate('')
  }

  const emotionTagSelected = selectedOption => {
    setSelectedEmotionTags(selectedOption)
  }

  return (
    <div>
      <h1 className=' text-base mb-3'>Filter events by:</h1>
      <StartAndEndDatePicker
        clearEndDate={clearEndDate}
        clearStartDate={clearStartDate}
        initialEndDate={initialEndDate}
        initialStartDate={initialStartDate}
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
