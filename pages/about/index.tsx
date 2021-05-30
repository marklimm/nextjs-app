import React, { FunctionComponent } from 'react'
import Head from 'next/head'

import { Disclosure } from '@headlessui/react'

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
              What is this?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                Thanks for visiting my site! &nbsp;This website is my way of
                learning NextJS while also getting familiar with modern web
                development tools (like prettier, prisma, tailwind, headless UI,
                etc.). &nbsp;I wanted to incorporate these tools all together in
                a single project to learn about any potential integration
                issues. &nbsp;This website demonstrates how NextJS allows
                content to be rendered at build time, request time or on the
                client-side and is built with react hooks and typescript.
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
                <a href='https://swapi.dev/'>https://swapi.dev/</a>. &nbsp;The
                SWAPI data provides a good start, but as I fleshed out the
                website more, I noticed that the data could be more compelling.
                &nbsp;This led to me creating my own Star Wars data (Characters,
                Events, Tasks) and storing it in either a hosted postgres DB
                (accessible via the prisma ORM) or markdown files.
              </div>
              <div>
                For modeling test relational data, I think Star Wars is a good
                frame of reference, since most people are familiar with it!
                &nbsp;It&apos;s easy for me to imagine{' '}
                <a href='/tasks'>tasks</a> that a particular Star Wars{' '}
                <a href='/characters'>character</a> might have or the
                friendships between characters. &nbsp;And real-life Star Wars
                history goes back to 1977 so there are plenty of note-worthy
                Star Wars <a href='/events'>events</a> to reference as well
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>

        <Disclosure defaultOpen={true}>
          <div className={styles.disclosure}>
            <Disclosure.Button className={styles.disclosureButton}>
              Did you use an existing/third-party CSS template/layout for this
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
              Who are you?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                I&apos;m a web developer based in Northern VA. &nbsp;My primary
                focus is full stack development with javascript/typescript and
                react. &nbsp;I currently work in downtown DC. &nbsp;Places
                I&apos;ve worked at include smaller startups, non-profits and a
                federal contractor, working on both internal admin tools as well
                as outward-facing UIs. &nbsp;I have also done previous work in
                C#/.NET/SQL Server. &nbsp;I graduated with a computer science
                degree from the University of Maryland
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
              What are some of your previous side projects?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                My previous projects include:
                <br />
                <ul>
                  <li>
                    a top comments dashboard that pulls top user comments from
                    various popular websites leveraging the disqus API -{' '}
                    <a href='https://github.com/marklimm/top-comments'>
                      https://github.com/marklimm/top-comments
                    </a>
                  </li>
                  <li>
                    a realtime leaderboard for my company&apos;s &quot;pi
                    day&quot; pie-in-the-face challenge. &nbsp;Voting was done
                    by employees to determine which managers would get a pie in
                    the face! &nbsp;The standings updated in realtime and
                    increased user engagement in the event -{' '}
                    <a href='https://github.com/marklimm/pi-day'>
                      https://github.com/marklimm/pi-day
                    </a>
                  </li>
                  <li>
                    a realtime event sign in application that used firebase to
                    track attendees as they signed in -{' '}
                    <a href='https://github.com/marklimm/pie-sign-in'>
                      https://github.com/marklimm/pie-sign-in
                    </a>
                  </li>
                  <li>
                    a ruby CLI application that allowed a user to play
                    tic-tac-toe against my tic-tac-toe-playing algorithm -{' '}
                    <a href='https://github.com/marklimm/ruby-TicTacToe'>
                      https://github.com/marklimm/ruby-TicTacToe
                    </a>
                  </li>
                </ul>
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
                    <a href='https://nextjs.org/docs/getting-started'>
                      https://nextjs.org/docs/getting-started
                    </a>{' '}
                    - the nextJS official docs were a friendly intro
                  </li>
                  <li>
                    <a href='https://pro.academind.com/p/nextjs-react-the-complete-guide'>
                      https://pro.academind.com/p/nextjs-react-the-complete-guide
                    </a>{' '}
                    - this academind nextJS course was really helpful
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
              What are your favorite Star Wars movies?
            </Disclosure.Button>
            <Disclosure.Panel className={styles.disclosurePanel}>
              <div>
                I like Empire Strikes Back, A New Hope, Rogue One, Solo and
                Phantom Menace.
              </div>
            </Disclosure.Panel>
          </div>
        </Disclosure>
      </div>
    </>
  )
}

export default About
