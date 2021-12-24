import React, { FunctionComponent } from 'react'
import { useDetentionBlockContext } from 'state/DetentionBlockContext'

import styles from './DetentionBlock.module.scss'

/**
 * This component displays the shared "detention block" data that is stored in a React Context
 */
export const DetentionBlock: FunctionComponent = () => {
  const detentionBlockContext = useDetentionBlockContext()

  return (
    <div className='max-w-md'>
      <div className=''>
        The below table shows &quot;detention block situation&quot; data that is
        shared between multiple page routes by using React Context. Clicking on
        the &quot;Change Situation&quot; button will randomly change the
        application-wide shared state
      </div>
      <table className='mt-2 table-fixed'>
        <thead>
          <tr>
            <th className={`${styles.cell} w-32`}>Cell block</th>
            <th className={`${styles.cell} w-48`}>Situation</th>
          </tr>
        </thead>
        <tbody>
          {detentionBlockContext.detentionBlocks.length > 0 &&
            detentionBlockContext.detentionBlocks.map((b) => (
              <tr key={b.id}>
                <td className={styles.cell}>{b.id}</td>
                <td className={styles.cell}>{b.situation}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <button
        className='mt-2 bg-gray-700 p-2 rounded-md text-sm text-white hover:text-yellow-400 hover:bg-red-700'
        onClick={detentionBlockContext.changeSituation}
      >
        Change situation
      </button>
    </div>
  )
}
