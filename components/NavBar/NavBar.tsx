import React from 'react'
import Link from 'next/link'
import { LinkDropdown } from 'components/LinkDropdown/LinkDropdown'

import styles from './NavBar.module.scss'

export const NavBar = (): JSX.Element => {
  return (
    // this outer div styles the box that contains the navigation links
    <div className='p-4 bg-gray-200 h-full xl:h-auto'>
      {/* this inner div controls the layout of each navigation link */}
      {/* this nav bar has a fixed width and height on smaller screen sizes, but width/height is set to 'auto' on larger screen sizes */}
      {/* also renders as a column on smaller screens but as a row on larger screens */}
      <div className='justify-between flex flex-col w-36 h-96 xl:flex-row xl:w-auto xl:h-auto'>
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
    </div>
  )
}
