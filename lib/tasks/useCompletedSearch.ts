import { useState } from 'react'
import { SelectOption } from 'lib/types/SelectOption'

import { IsCompletedFilter } from 'lib/types/Task'

interface UseCompletedSearchReturnType {
  completedFlag: SelectOption
  completedFlagOptions: SelectOption[]
  setCompletedFlag: (SelectOption) => void
}

/**
 * This custom hook stores the user-specified completed filter when filtering Tasks by whether they have been completed or not
 * @returns
 */
export const useCompletedSearch = (): UseCompletedSearchReturnType => {
  const [completedFlagOptions] = useState<SelectOption[]>([
    {
      label: IsCompletedFilter.ALL.toString(),
      value: IsCompletedFilter.ALL,
    },
    {
      label: IsCompletedFilter.NOT_COMPLETED.toString(),
      value: IsCompletedFilter.NOT_COMPLETED,
    },
    {
      label: IsCompletedFilter.COMPLETED.toString(),
      value: IsCompletedFilter.COMPLETED,
    },
  ])

  const [completedFlag, setCompletedFlag] = useState<SelectOption>(
    () => completedFlagOptions[0]
  )

  return {
    completedFlag,
    completedFlagOptions,
    setCompletedFlag,
  }
}
