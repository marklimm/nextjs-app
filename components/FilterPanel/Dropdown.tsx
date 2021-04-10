import React, { FunctionComponent } from 'react'
import Select from 'react-select'

import { SelectOption } from 'lib/types/SelectOption'

interface DropdownProps {
  optionSelected: (selectedOptions: SelectOption[]) => void
  selectOptions: SelectOption[]
}

export const Dropdown: FunctionComponent<DropdownProps> = ({
  optionSelected,
  selectOptions,
}: DropdownProps) => {
  return (
    <Select
      // styles={customStyles}
      // value={selectedCharacterTags}
      isMulti
      onChange={optionSelected}
      options={selectOptions}
      placeholder='select options to search on ...'
      instanceId='random-id-to-resolve-error-https://stackoverflow.com/questions/61290173/react-select-how-do-i-resolve-warning-prop-id-did-not-match'
    />
  )
}
