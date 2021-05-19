import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { LinkDropdown } from 'components/LinkDropdown/LinkDropdown'

import styles from './NavBar.module.scss'

export const NavBar: FunctionComponent = () => {
  return (
    <div className='p-4 flex justify-between bg-gray-200 border-t-2 border-b-2 border-gray-400'>
      <Link href='/'>
        <a className={`${styles.link}`}>Home</a>
      </Link>{' '}
      <Link href='/about'>
        <a className={`${styles.link}`}>About</a>
      </Link>{' '}
      <Link href='/planets'>
        <a className={styles.link}>Planets</a>
      </Link>{' '}
      <Link href='/characters'>
        <a className={styles.link}>Characters</a>
      </Link>
      <Link href='/tasks'>
        <a className={styles.link}>Tasks</a>
      </Link>
      <Link href='/starships'>
        <a className={styles.link}>Starships</a>
      </Link>
      <Link href='/events'>
        <a className={styles.link}>Events</a>
      </Link>
      <LinkDropdown />
      <Link href='/detentionBlock'>
        <a className={styles.link}>Detention Block</a>
      </Link>
      <Link href='/devblog'>
        <a className={styles.link}>Developer Blog</a>
      </Link>
    </div>
  )
}
