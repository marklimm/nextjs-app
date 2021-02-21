import React, { FunctionComponent } from 'react'
import Link from 'next/link'

import styles from './NavBar.module.scss'

export const NavBar: FunctionComponent = () => {
  return (
    <div className='p-4 flex justify-between bg-gray-200 border-t border-b border-gray-700'>
      <Link href='/'>
        <a className={`${styles.link}`}>Home</a>
      </Link>{' '}
      <Link href='/planets'>
        <a className={styles.link}>Planets</a>
      </Link>{' '}
      <Link href='/people'>
        <a className={styles.link}>Characters</a>
      </Link>
      <Link href='/starships'>
        <a className={styles.link}>Starships</a>
      </Link>
      <Link href='/events'>
        <a className={styles.link}>Events</a>
      </Link>
      <Link href='/devblog'>
        <a className={styles.link}>Developer Blog</a>
      </Link>
    </div>
  )
}
