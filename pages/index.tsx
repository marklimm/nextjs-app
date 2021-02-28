import Head from 'next/head'
import Link from 'next/link'

import styles from './index.module.scss'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>NextJS demo - Home</title>
      </Head>
      <div className={styles.homePage}>
        <div>
          This is a NextJS app that retrieves data from various data sources:
          <ul>
            <li>
              The{' '}
              <Link href='/events'>
                <a className={(styles.link, styles.route)}>Events</a>
              </Link>{' '}
              and{' '}
              <Link href='/devblog'>
                <a className={(styles.link, styles.route)}>Developer Blog</a>
              </Link>{' '}
              pages pull their data from local markdown (.md) files
            </li>
            <li>
              The{' '}
              <Link href='/characters'>
                <a className={(styles.link, styles.route)}>Characters</a>
              </Link>{' '}
              page pulls data from a local sqlite DB file using the Prisma ORM (
              <Link href='https://www.prisma.io/'>
                <a className={styles.link}>https://www.prisma.io/</a>
              </Link>
              )
            </li>
            <li>
              The{' '}
              <Link href='/planets'>
                <a className={(styles.link, styles.route)}>Planets</a>
              </Link>{' '}
              and{' '}
              <Link href='/starships'>
                <a className={(styles.link, styles.route)}>Starships</a>
              </Link>{' '}
              pages pull their data from the Star Wars API (
              <Link href='https://swapi.dev/'>
                <a className={styles.link}>https://swapi.dev/</a>
              </Link>
              )
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default HomePage
