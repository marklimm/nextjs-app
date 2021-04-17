import React, { FunctionComponent, useEffect, useState } from 'react'
import Head from 'next/head'

/**
 * This component defines the UI for the /writingPrompts route, which includes
 * @param param0
 * @returns
 */
const WritingPrompts: FunctionComponent = () => {
  const [writingPrompts, setWritingPrompts] = useState([])

  useEffect(() => {
    const getWritingPrompts = async () => {
      const response = await fetch('/api/writingPrompts', {})

      if (response.status >= 400) {
        console.log('there was some error', response.statusText)
        return
      }

      const data = await response.json()
      setWritingPrompts(data.writingPrompts)
    }

    getWritingPrompts()
  }, [])

  const makePostRequest = async () => {
    const postResponse = await fetch('/api/writingPrompts', {
      method: 'POST',
      body: JSON.stringify({
        stolen: 'data tapes',
      }),
    })

    if (postResponse.status >= 400) {
      console.log('there was some error', postResponse.statusText)
      return
    }

    const data = await postResponse.json()
    console.log('data', data)
  }

  return (
    <>
      <Head>
        <title>NextJS demo - Writing Prompts</title>
      </Head>
      <h1>Writing Prompts</h1>

      <div>
        This page has retrieves writing prompts from the server-side API
      </div>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
        onClick={makePostRequest}
      >
        Make POST request
      </button>
      <div className='mt-5'>
        {writingPrompts.map((wp) => {
          return <div key={wp.id}>{wp.text}</div>
        })}
      </div>
    </>
  )
}

export default WritingPrompts
