import React, { FunctionComponent } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'

import { getMarkdownFileData } from 'lib/markdownParser'

import styles from './index.module.scss'

interface HomePageProps {
  readmeContent: string
}

const HomePage: FunctionComponent<HomePageProps> = ({
  readmeContent,
}: HomePageProps) => {
  return (
    <>
      <Head>
        <title>NextJS demo - Home</title>
      </Head>
      <div className={styles.descriptionArea}>
        <h1>Welcome!</h1>
        <div>
          <div dangerouslySetInnerHTML={{ __html: readmeContent }} />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const readmeData = await getMarkdownFileData(
    '',
    'pages/landing-page-intro.md'
  )

  return {
    props: {
      readmeContent: readmeData.contentHtml,
    },
  }
}

export default HomePage
