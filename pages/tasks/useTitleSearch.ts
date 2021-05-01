import { useState } from 'react'
import { useDebounce } from 'components/FilterPanel/Textbox'

interface UseTitleSearchReturnType {
  debouncedTitleSearchString: string
  setTitleSearchString: (string) => void
  titleSearchString: string
  titleSearchStringChanged: (string) => void
}

/**
 * This custom hook stores the user-specified title search string when the user is searching Tasks by their title
 */
export const useTitleSearch = (): UseTitleSearchReturnType => {
  //  the actual title search string that the user is currently seeing on screen
  const [titleSearchString, setTitleSearchString] = useState<string>('')

  //  the debounced title search string that will actually trigger an API call after a specified delay
  const debouncedTitleSearchString = useDebounce(titleSearchString, 300)

  const titleSearchStringChanged = (event) => {
    setTitleSearchString(event.target.value)
  }

  return {
    debouncedTitleSearchString,
    setTitleSearchString,
    titleSearchString,
    titleSearchStringChanged,
  }
}
