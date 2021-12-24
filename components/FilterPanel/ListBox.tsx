import React from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { SelectOption } from 'lib/types/SelectOption'
import { useAppDispatch, useAppSelector } from 'lib/redux/hooks'

import { SearchType } from 'lib/redux/searchFilters/filterTypes'
import {
  FilterActionType,
  ListBoxFilterState,
} from 'lib/redux/searchFilters/searchFilterReducerTypes'
import { updateFilter } from 'lib/redux/searchFilters/searchFilterReducer'

interface ListBoxProps {
  allOptions: SelectOption[]
  filterId: string
  label: string
  searchType: SearchType
}

//  Note that I called this component <ListBox />, but the headless UI component is <Listbox />

export const ListBox = ({
  allOptions,
  filterId,
  label,
  searchType,
}: ListBoxProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const listboxFilterState = useAppSelector((state) => {
    return state.searchFilter[searchType].filterControlValues.find(
      (filter) => filter.id === filterId
    ) as ListBoxFilterState
  })

  const setSelectedOption = (selectedOption: SelectOption) => {
    dispatch(
      updateFilter({
        searchType,
        filterActionType: FilterActionType.RadioOptionSelected,
        id: filterId,
        value: selectedOption,
      })
    )
  }

  return (
    <div className='my-4'>
      <div className='font-bold mb-1'>{label}</div>

      <Listbox
        value={listboxFilterState.selectedOption.value}
        onChange={(selectedValue) => {
          const selectedOption = allOptions.find(
            (o) => o.value === selectedValue
          )

          setSelectedOption(selectedOption)
        }}
      >
        {({ open }) => (
          <>
            <Listbox.Button className='w-1/2 py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md focus:outline-none border border-gray-300'>
              {listboxFilterState.selectedOption.label}
            </Listbox.Button>

            <Transition
              show={open}
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-100 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Listbox.Options
                static
                className='absolute overflow-auto mt-1 bg-white rounded-lg shadow-md max-h-60 border border-gray-300 '
              >
                {allOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    // disabled={person.unavailable}
                    className={({ active }) =>
                      `${active ? 'text-white bg-indigo-800' : 'text-gray-700'}
                          cursor-default select-none relative py-2 pl-10 pr-7 rounded-lg`
                    }
                  >
                    {option.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  )
}
