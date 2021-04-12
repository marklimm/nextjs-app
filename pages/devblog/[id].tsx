import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllMarkdownFileIds, getMarkdownFileData } from 'lib/markdownParser'

import { DevBlogPost } from './devBlogPost'
import { Post } from 'lib/types/Post'

interface PostUIProps {
  postData: Post
}

const PostUI: FunctionComponent<PostUIProps> = ({ postData }: PostUIProps) => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <DevBlogPost devBlogPost={postData} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllMarkdownFileIds('data/devblog')

  //  /posts/[id].tsx and /planets/[planet].tsx are using 2 different formats for getStaticPaths() and they both work!
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getMarkdownFileData('data/devblog', `${params.id}.md`)

  return {
    props: {
      postData,
    },
  }
}

export default PostUI
