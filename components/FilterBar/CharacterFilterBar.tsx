import { FunctionComponent } from 'react'
import Select from 'react-select'
import { SelectOption } from 'lib/types/SelectOption'

// import useDebounce from './useDebounce'

interface CharacterFilterBarProps {
  characterTagOptions: SelectOption[]
  selectedCharacterTags: SelectOption[]

  characterTagSelected: (selectedOptions: SelectOption[]) => void
}

export const CharacterFilterBar: FunctionComponent<CharacterFilterBarProps> = ({
  characterTagOptions,
  selectedCharacterTags,

  characterTagSelected
}) => {
  return (
    <div>
      {/* <div className='mb-1 text-sm'>Search by Text:</div>
      <input
        type='text'
        value={searchString}
        onChange={searchStringChanged}
        className='border border-gray-300 rounded px-2 py-1'
      /> */}

      <div className='mt-5 mb-1 text-sm'>Search by Tag:</div>

      <div>
        <Select
          // styles={customStyles}
          value={selectedCharacterTags}
          isMulti
          onChange={characterTagSelected}
          options={characterTagOptions}
          placeholder='characterTags to search on ...'
          instanceId='random-id-to-resolve-error-https://stackoverflow.com/questions/61290173/react-select-how-do-i-resolve-warning-prop-id-did-not-match'
        />
      </div>
    </div>
  )
}
