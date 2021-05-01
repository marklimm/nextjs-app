import React, { FunctionComponent } from 'react'
import Select from 'react-select'

import { SelectOption } from 'lib/types/SelectOption'

interface DropdownProps {
  label: string
  optionSelected: (selectedOptions: SelectOption[]) => void
  placeholder: string
  selectOptions: SelectOption[]
  value: SelectOption[]
}

export const Dropdown: FunctionComponent<DropdownProps> = ({
  label,
  optionSelected,
  placeholder,
  selectOptions,
  value,
}: DropdownProps) => {
  return (
    <div className='my-4'>
      <div className='font-bold mb-1'>{label}</div>
      <Select
        // styles={customStyles}
        value={value}
        isMulti
        onChange={optionSelected}
        options={selectOptions}
        placeholder={placeholder}
        instanceId='random-id-to-resolve-error-https://stackoverflow.com/questions/61290173/react-select-how-do-i-resolve-warning-prop-id-did-not-match'
      />
    </div>
  )
}
