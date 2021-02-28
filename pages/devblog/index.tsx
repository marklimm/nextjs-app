import { FunctionComponent } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'

import { Post } from 'lib/types/Post'
import { getSortedMarkdownFiles } from 'lib/markdownParser'

import { DevBlogPost } from './devBlogPost'

interface DevBlogProps {
  devBlogPosts: Post[]
}

const DevBlog: FunctionComponent<DevBlogProps> = ({ devBlogPosts }) => {
  return (
    <>
      <Head>
        <title>NextJS demo - Developer blog</title>
      </Head>

      <h1>Developer Blog</h1>

      <div className='w-2/3'>
        {devBlogPosts.length > 0 &&
          devBlogPosts.map(post => (
            <div key={post.id} className='mb-8'>
              <DevBlogPost devBlogPost={post} />
            </div>
          ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const devBlogPosts = await getSortedMarkdownFiles('data/devblog')
  const lastTenPosts = devBlogPosts.slice(0, 20)

  return {
    props: {
      devBlogPosts: lastTenPosts
    }
  }
}

export default DevBlog
