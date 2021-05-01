import React, { FunctionComponent, useState, useEffect } from 'react'

interface TextboxProps {
  label: string
  onChange: (event: React.FormEvent<HTMLInputElement>) => void
  placeholder: string
  value: string
}

export const Textbox: FunctionComponent<TextboxProps> = ({
  label,
  onChange,
  placeholder,
  value,
}: TextboxProps) => {
  return (
    <div className='my-4'>
      <div className='font-bold mb-1'>{label}</div>
      <input
        type='text'
        value={value}
        className='p-2 border border-gray-300 rounded'
        onChange={onChange}
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
