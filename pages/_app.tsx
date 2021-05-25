import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

//  styling the toastr taking cues from https://fkhadra.github.io/react-toastify/how-to-style#css-classes-as-function
const contextClass = {
  // success: "bg-blue-600",
  error: 'bg-red-700',
  info: 'bg-gray-600',
  // warning: "bg-orange-400",
  default: 'bg-indigo-600',
  // dark: "bg-white-600 font-gray-300",
}

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

        {/* CSS classes taken from https://fkhadra.github.io/react-toastify/how-to-style#css-classes-as-function */}
        <ToastContainer
          position='bottom-center'
          autoClose={30000}
          hideProgressBar={true}
          className='w-2/4'
          // style={{ width: '50%' }}

          toastClassName={({ type }) =>
            contextClass[type || 'default'] +
            ' relative flex mt-3 p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
          }
        />
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
