import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { SelectOption } from 'lib/types/SelectOption'

interface UseAssigneeSearchReturnType {
  assigneeOptions: SelectOption[]
  assigneeSelected: (selectedAssignees: SelectOption[]) => void
  selectedAssigneeIds: SelectOption[]
  setSelectedAssigneeIds: (selectedAssigneeIds: SelectOption[]) => void
}

/**
 * This custom hook stores the user-specified assignees when the user is searching Tasks by their assignee
 * @param
 * @returns
 */
export const useAssigneeSearch = (): UseAssigneeSearchReturnType => {
  const [assigneeOptions, setAssigneeOptions] = useState<SelectOption[]>([])

  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<
    SelectOption[]
  >([])

  const getCharactersTerse = async () => {
    const response = await fetch('/api/charactersTerse', {})

    if (response.status >= 400) {
      const errorData = await response.json()

      console.error('server error: ', errorData.message)

      toast.error(`Error: ${errorData.message}`)
      return
    }

    const data = await response.json()

    const assigneeOptions = data.characters.map((character) => ({
      label: `${character.firstName} ${character.lastName}`,
      value: character.id.toString(),
    }))

    setAssigneeOptions(assigneeOptions)
  }

  useEffect(() => {
    const loadCharacters = async () => {
      await getCharactersTerse()
    }

    loadCharacters()
  }, [])

  const assigneeSelected = (selectedAssignees: SelectOption[]) => {
    setSelectedAssigneeIds(selectedAssignees)
  }

  return {
    assigneeOptions,
    assigneeSelected,
    selectedAssigneeIds,
    setSelectedAssigneeIds,
  }
}
