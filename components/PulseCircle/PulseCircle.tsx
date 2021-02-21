import { FunctionComponent } from 'react'

import styles from './PulseCircle.module.scss'

interface PulseCircleProps {}

export const PulseCircle: FunctionComponent<PulseCircleProps> = () => {
  return <div className={styles.pulseIndicator}></div>
}
