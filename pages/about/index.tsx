import React, { FunctionComponent } from 'react'
import { Disclosure } from '@headlessui/react'

import Head from 'next/head'

import description from '../index.module.scss'
import styles from './about.module.scss'

const About: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>NextJS demo - About</title>
      </Head>

      <div className={description.descriptionArea}>
        <Disclosure defaultOpen={true}>
          <div className={styles.disclosure}>
            <Disclosure.Button className={styles.disclosureButton}>
              Who are you?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                Hello - I&apos;m a web developer based in Northern VA. &nbsp;My
                primary focus is frontend development with javascript/typescript
                and react. &nbsp;I&apos;m currently working remotely for a news
                publisher in the DC area. &nbsp;Places I&apos;ve worked at
                include smaller startups, non-profits and fed contractors.
                &nbsp;I also have previous experience with C#/.NET/SQL Server.
                &nbsp;I graduated with a CS degree
              </div>
              <div>
                In my spare time I enjoy working out, spending time with
                friends, following pro basketball and reading
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>

        <Disclosure defaultOpen={true}>
          <div className={styles.disclosure}>
            <Disclosure.Button className={styles.disclosureButton}>
              What is this?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                The initial motivation for this website was to learn nextJS.
                &nbsp;In addition to getting familiar with the concepts of
                rendering at build time, request time or on the client, there
                are a variety of recommended tools that come with working with
                nextJS/react. These include typescript, sass, prettier, prisma,
                tailwind CSS, headless UI, etc. &nbsp;I created this website as
                a way to integrate these tools into a single project
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>

        <Disclosure defaultOpen={true}>
          <div className={styles.disclosure}>
            <Disclosure.Button className={styles.disclosureButton}>
              Why a Star Wars website?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                My original plan was just to build a static nextJS website that
                fetch()-es and statically renders data from the Star Wars API{' '}
                <a href='https://swapi.dev/'>https://swapi.dev/</a>. &nbsp;As I
                worked on it more, I felt that the SWAPI data was a good start
                but that the data could be more compelling. &nbsp;This led to me
                creating my own Star Wars data (Characters, Events, Tasks) and
                storing it in a postgres DB file (with the prisma ORM) and
                markdown files.
              </div>
              <div>
                For modeling test relational data, I think Star Wars is as good
                a frame of reference as any, since most people are familiar with
                it. &nbsp;It&apos;s also easy for me to imagine various{' '}
                <a href='/tasks'>tasks</a> that a particular Star Wars{' '}
                <a href='/characters'>character</a> might have or the
                friendships between characters. &nbsp;And since real-life Star
                Wars history goes back to 1977 there are plenty of note-worthy
                Star Wars <a href='/events'>events</a> to reference as well
              </div>
              <div>
                Working on this project continues to be a nice low pressure side
                project. &nbsp;It&apos;s been good for tracking my progress
                learning nextJS and other web development tools
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>

        <Disclosure defaultOpen={true}>
          <div className={styles.disclosure}>
            <Disclosure.Button className={styles.disclosureButton}>
              Did you use an existing/third-party CSS theme/layout for this
              website?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                Nope! &nbsp;For better or worse this entire website was
                hand-written by me using tailwind CSS and its provided flexbox
                and CSS grid classes
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>

        <Disclosure defaultOpen={true}>
          <div className={styles.disclosure}>
            <Disclosure.Button className={styles.disclosureButton}>
              What were some of the resources you used to learn nextJS?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                <ul>
                  <li>
                    <a href='https://ui.dev/react-hooks/'>
                      https://ui.dev/react-hooks/
                    </a>{' '}
                    - this Tyler McGinnis video course helped me get more
                    comfortable with react hooks, a great resource in addition
                    to the official react docs
                  </li>
                  <li>
                    <a href='https://pro.academind.com/p/understanding-typescript'>
                      https://pro.academind.com/p/understanding-typescript
                    </a>{' '}
                    - this academind course was helpful for learning typescript
                  </li>
                  <li>
                    <a href='https://pro.academind.com/p/nextjs-react-the-complete-guide'>
                      https://pro.academind.com/p/nextjs-react-the-complete-guide
                    </a>{' '}
                    - I&apos;m currently midway through this academind nextJS
                    course
                  </li>
                  <li>
                    <a href='https://nextjs.org/docs/getting-started'>
                      https://nextjs.org/docs/getting-started
                    </a>{' '}
                    - the nextJS official docs were a friendly intro
                  </li>
                </ul>
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>

        <Disclosure defaultOpen={true}>
          <div className={styles.disclosure}>
            <Disclosure.Button className={styles.disclosureButton}>
              What does the 404 page look like?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                Check it out right <a href='/invalid-link'>here</a>!
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>

        <Disclosure defaultOpen={true}>
          <div className={styles.disclosure}>
            <Disclosure.Button className={styles.disclosureButton}>
              What&apos;s your favorite Star Wars movie?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                My favorites are Empire Strikes Back, Rogue One and A New Hope.
                &nbsp;But I do get a lot of nostalgia from Phantom Menace, which
                has the pod racing scene and the best lightsaber battle!
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>
      </div>
    </>
  )
}

export default About
