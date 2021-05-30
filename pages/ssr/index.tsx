import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import descriptionStyle from '../index.module.scss'

interface RedditPost {
  author: string
  createdAt: string
  id: string
  permalink: string
  selftext: string
  title: string
  url: string
}

interface SSRProps {
  posts: RedditPost[]
  timestamp: string
}

const SSRUI: FunctionComponent<SSRProps> = ({ posts, timestamp }: SSRProps) => {
  return (
    <>
      <Head>
        <title>Server-side Rendering example</title>
        <meta
          name='description'
          content='An example of server-side rendering in NextJS'
        ></meta>
      </Head>
      <h1>Server-side rendering (SSR) example</h1>

      <div className={descriptionStyle.descriptionArea}>
        <div>
          This page demonstrates server-side rendering, which is intended to
          take user-specific information and process the individual request at
          request time. Right now this page is simply retrieving posts from the
          front page of the `/r/nextjs` subreddit
        </div>

        <div>
          <span className='font-bold'>
            When should we use server-side rendering?
          </span>
          <ul>
            <li>
              external users we want to market to --&gt; SSG because we want the
              fastest loading experience and populated page content for SEO
            </li>
            <li>
              registered users who are logged into our website --&gt; SSR
              because we want a fast experience but also have to retrieve
              user-specific information
            </li>
            <li>
              internal/employees looking at admin dashboards/views --&gt; CSR
              because we don&apos;t care about SEO, a loading icon is okay
            </li>
          </ul>
        </div>
      </div>

      <div className='mt-10 text-green-700'>
        This individual user request was handled by the server at: {timestamp}
      </div>

      <div className='w-2/3 mt-8'>
        <div className='text-2xl mb-4'>Top posts from the nextjs subreddit</div>
        {posts.map((post) => (
          <div key={post.id} className='mb-14'>
            <a
              href={post.permalink}
              target='_blank'
              rel='noreferrer'
              className='font-bold text-lg'
            >
              {post.title}
            </a>
            <div>{post.selftext}</div>
            by <span className='font-semibold'>{post.author}</span>
            <span> at {post.createdAt}</span>
          </div>
        ))}
      </div>
    </>
  )
}

const redditHostName = 'https://www.reddit.com'

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${redditHostName}/r/nextjs.json`)
  const data = await response.json()

  const posts: RedditPost[] = data.data.children
    .filter((e) => !!e.data.selftext)
    .map((postRecord) => {
      const post = postRecord.data

      return {
        author: post.author,
        createdAt: new Date(post.created_utc * 1000).toLocaleString(),
        id: post.id,
        permalink: `${redditHostName}${post.permalink}`,
        selftext: post.selftext,
        title: post.title,
        url: post.url,
      }
    })

  const timestamp = new Date().toLocaleString()

  return {
    props: {
      posts,
      timestamp,
    },
  }
}

export default SSRUI
