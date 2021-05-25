import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { SelectOption } from 'lib/types/SelectOption'

import { LoadingState } from 'lib/types/LoadingState'

interface UseAssigneeSearchReturnType {
  assigneeOptions: SelectOption[]
  assigneeSelected: (selectedAssignees: SelectOption[]) => void
  selectedAssigneeIds: SelectOption[]
  setSelectedAssigneeIds: (selectedAssigneeIds: SelectOption[]) => void
}

/**
 * This custom hook stores the user-specified assignees when the user is searching Tasks by their assignee
 * @param setLoadingState
 * @returns
 */
export const useAssigneeSearch = (
  setLoadingState: (LoadingState) => void
): UseAssigneeSearchReturnType => {
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

      setLoadingState(LoadingState.ERROR)
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

      //  since this is retrieve (I believe) the list of characters/assignees to filter on in the left-hand filter div, then I'm thinking that this setLoadingState() should not be here but instead be in /pages/tasks/index.tsx, because this deals with loading the list of tasks, not the list of characters/assignees
      setLoadingState(LoadingState.DONE_LOADING)
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
