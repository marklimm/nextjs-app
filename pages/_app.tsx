import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'

import { Header } from 'components/Header/Header'
import { NavBar } from 'components/NavBar/NavBar'

import { DetentionBlockWrapper } from 'state/DetentionBlockContext'

//  this was my previous way of bringing in tailwind which worked locally, but would lead to tailwind CSS classes being purged on production for a SSR-ed page
// import 'tailwindcss/tailwind.css'

//  this works for both local and prod (required tailwind css classes aren't unexpectedly missing for the SSR page)
import './tailwind.scss'

//  import global styles following https://nextjs.org/docs/basic-features/built-in-css-support
import 'scss/app.scss'

//  import global markdown styles
import 'scss/markdownContent.scss'

const MyApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  return (
    <>
      <Head>
        <title>NextJS demo website</title>
        <link rel='icon' href='/stormtrooper.ico' />
      </Head>
      <div className='flex flex-col h-screen'>
        <Header />
        <NavBar />
        <div className='flex-grow p-5'>
          {/* wrap every route with our react context */}
          <DetentionBlockWrapper>
            <Component {...pageProps} />
          </DetentionBlockWrapper>
        </div>
        <NavBar />
      </div>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
