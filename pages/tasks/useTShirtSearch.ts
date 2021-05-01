import { useState } from 'react'
import { SelectOption } from 'lib/types/SelectOption'

import { TShirtSize } from 'lib/types/Task'

interface UseTShirtSearchReturnType {
  tShirtSizes: SelectOption[]
  tShirtSizeSelected: (selectedTShirtSizes: SelectOption[]) => void
  selectedTShirtSizes: SelectOption[]
  setSelectedTShirtSizes: (selectedTShirtSizes: SelectOption[]) => void
}

/**
 * This custom hook stores the user-specified T-shirt size when filtering Tasks by T-shirt size
 * @returns
 */
export const useTShirtSearch = (): UseTShirtSearchReturnType => {
  const [tShirtSizes] = useState<SelectOption[]>([
    {
      label: TShirtSize[TShirtSize.SMALL],
      value: TShirtSize.SMALL.toString(),
    },
    {
      label: TShirtSize[TShirtSize.MEDIUM],
      value: TShirtSize.MEDIUM.toString(),
    },
    {
      label: TShirtSize[TShirtSize.LARGE],
      value: TShirtSize.LARGE.toString(),
    },
  ])

  const [selectedTShirtSizes, setSelectedTShirtSizes] = useState<
    SelectOption[]
  >([])

  const tShirtSizeSelected = (selectedTShirtSizes: SelectOption[]) => {
    setSelectedTShirtSizes(selectedTShirtSizes)
  }

  return {
    selectedTShirtSizes,
    setSelectedTShirtSizes,
    tShirtSizes,
    tShirtSizeSelected,
  }
}
