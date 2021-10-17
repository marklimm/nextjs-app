import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useAppDispatch } from 'lib/redux/hooks'
import { setAssigneeOptions } from 'lib/redux/search/TasksFilterReducer'

/**
 * This custom hook retrieves the list of characters/assignees and sends them to the redux store on page load
 * @param
 * @returns
 */
export const useAssigneeSearch = (): void => {
  const dispatch = useAppDispatch()

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

    dispatch(setAssigneeOptions(assigneeOptions))
  }

  useEffect(() => {
    const loadCharacters = async () => {
      await getCharactersTerse()
    }

    loadCharacters()
  }, [])
}
