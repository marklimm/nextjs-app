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
                Hello - my name is Mark Limm, and I&apos;m a web developer based
                in Northern VA. My primary focus is frontend development with
                javascript/typescript and react. I also have previous experience
                with C#/.NET/SQL Server. I graduated with a CS degree
              </div>
              <div>
                In my spare time, I enjoy working out, spending time with
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
                The initial motivation for this website was to learn nextJS. In
                addition to getting familiar with the concepts of rendering at
                build time, request time or on the client, there are a variety
                of recommended tools that come with working with nextJS/react.
                These include typescript, sass, prettier, prisma, tailwind CSS,
                headless UI, etc. This nextJS project integrates these modern
                web development tools into a single project
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
                <a href='https://swapi.dev/'>https://swapi.dev/</a>. As I worked
                on it more, I felt that the SWAPI data was a good start but that
                it could be more compelling. This led to me creating my own Star
                Wars data (Characters, Events, Tasks) and storing it in a SQLite
                DB file (with the prisma ORM) and markdown files.
              </div>
              <div>
                For a test data website I think Star Wars is as good a frame of
                reference as any, since most people are familiar with it.
                It&apos;s also easy for me to imagine various{' '}
                <a href='/tasks'>tasks</a> that a particular Star Wars{' '}
                <a href='/characters'>character</a> might have or the
                friendships between characters, so this makes it a good use case
                for modeling relational data. And since real-life Star Wars
                history goes back to 1977 there are plenty of{' '}
                <a href='/events'>events</a> to reference as well
              </div>
              <div>
                Working on this has been a nice low-pressure side project that I
                am currently working on. It&apos;s also been good for tracking
                what I&apos;ve been learning across both nextJS and other web
                development tools
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>

        <Disclosure defaultOpen={true}>
          <div className={styles.disclosure}>
            <Disclosure.Button className={styles.disclosureButton}>
              What resources did you use to learn nextJS?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                <ul>
                  <li>that react hooks course</li>
                  <li>Academind typescript course</li>
                  <li>NextJS official docs</li>
                </ul>
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>
      </div>
    </>
  )
}

export default About
