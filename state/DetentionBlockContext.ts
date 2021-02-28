import { createContext } from 'react'

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
  DANGER = 'Danger'
}

interface DetentionBlock {
  id: string
  situation: Situation
}

interface DetentionBlockState {
  detentionBlocks: DetentionBlock[]
  changeSituation: () => void
}

export const initialDetentionBlockState: DetentionBlockState = {
  detentionBlocks: [
    {
      id: 'A',
      situation: Situation.NORMAL
    },
    {
      id: 'B',
      situation: Situation.NORMAL
    },
    {
      id: 'C',
      situation: Situation.NORMAL
    },
    {
      id: 'D',
      situation: Situation.NORMAL
    }
  ],
  changeSituation: () => {}
}

const situationKeys = Object.keys(Situation)

export const getRandomSituation = () => {
  const selectedRandomNumber = Math.floor(Math.random() * situationKeys.length)

  return Situation[situationKeys[selectedRandomNumber]]
}

export const DetentionBlockContext = createContext(initialDetentionBlockState)
