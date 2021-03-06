import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { Menu } from '@headlessui/react'

import styles from '../NavBar/NavBar.module.scss'
import linkDropdownStyles from './LinkDropdown.module.scss'

export const LinkDropdown: FunctionComponent = () => {
  return (
    <div className=''>
      <Menu as='div' className='relative inline-block text-left'>
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                as='a'
                className='inline-flex justify-center cursor-pointer'
              >
                Render types
              </Menu.Button>
            </div>

            {open && (
              <div>
                {/* I tried using a <Transition /> like it shows in the headless UI example but I kept getting console errors */}
                {/* I'm specifying a z-index of 10 `z-10` so that this menu appears above the detention block image which is rendered at runtime (since it's using nextjs image optimization) */}
                <Menu.Items
                  as='div'
                  className='absolute focus:outline-none w-52 p-1 mt-3 bg-white rounded-md shadow-lg ring-2 ring-gray-300 z-10'
                >
                  <Menu.Item as='div' className={linkDropdownStyles.menuItem}>
                    <Link href='/ssr'>
                      <a className={styles.link}>Server-side rendering</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item as='div' className={linkDropdownStyles.menuItem}>
                    <Link href='/isr'>
                      <a className={styles.link}>
                        Incremental static regeneration
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item as='div' className={linkDropdownStyles.menuItem}>
                    <Link href='/tasks'>
                      <a className={styles.link}>Client-side rendering</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item as='div' className={linkDropdownStyles.menuItem}>
                    <Link href='/characters'>
                      <a className={styles.link}>Static Site generation</a>
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </div>
            )}
          </>
        )}
      </Menu>
    </div>
  )
}
