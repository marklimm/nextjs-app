import React, { createContext, useCallback, useContext, useState } from 'react'

/**
 * The current situation in the detention block
 */
export enum Situation {
  MAINTENANCE = 'Maintenance',
  INSPECTION = 'Inspection',

  /**
   * Han Solo disguised as stormtrooper: "Situation: normal ..."
   */
  NORMAL = 'Normal',

  TRANSPORT = 'Prisoner Transport',
  ELEVATED = 'Elevated',
  DANGER = 'Danger',
}

interface DetentionBlock {
  id: string
  situation: Situation
}

interface DetentionBlockState {
  detentionBlocks: DetentionBlock[]
  changeSituation: () => void
}

const initialDetentionBlockState: DetentionBlockState = {
  detentionBlocks: [
    {
      id: 'A',
      situation: Situation.NORMAL,
    },
    {
      id: 'B',
      situation: Situation.NORMAL,
    },
    {
      id: 'C',
      situation: Situation.NORMAL,
    },
    {
      id: 'D',
      situation: Situation.NORMAL,
    },
  ],
  changeSituation: () => {
    return
  },
}

const situationKeys = Object.keys(Situation)

/**
 * this function returns a randomly-selected "Situation" value
 * @returns
 */
const getRandomSituation = (): Situation => {
  const selectedRandomNumber = Math.floor(Math.random() * situationKeys.length)

  return Situation[situationKeys[selectedRandomNumber]]
}

const DetentionBlockContext = createContext(initialDetentionBlockState)

interface DetentionBlockWrapperProps {
  children: React.ReactNode
}

export const DetentionBlockWrapper = (props: DetentionBlockWrapperProps) => {
  //  app-wide shared state that will be stored in React Context
  const [detentionBlockState, setDetentionBlockState] = useState(
    initialDetentionBlockState
  )

  /**
   * This function randomly changes the detention block state
   */
  const changeSituation = useCallback(() => {
    setDetentionBlockState((state) => ({
      ...state,
      detentionBlocks: state.detentionBlocks.map((b) => ({
        ...b,
        situation: getRandomSituation(),
      })),
    }))
  }, [])

  return (
    <DetentionBlockContext.Provider
      value={{
        ...detentionBlockState,
        changeSituation,
      }}
    >
      {props.children}
    </DetentionBlockContext.Provider>
  )
}

/**
 * This function returns the DetentionBlockContext
 * @returns
 */
export const useDetentionBlockContext = (): DetentionBlockState => {
  return useContext(DetentionBlockContext)
}
