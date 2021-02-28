import { useCallback, useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'

import { Header } from 'components/Header/Header'
import { NavBar } from 'components/NavBar/NavBar'

import {
  DetentionBlockContext,
  getRandomSituation,
  initialDetentionBlockState
} from 'state/DetentionBlockContext'

//  import tailwind
import 'tailwindcss/tailwind.css'

//  import global styles following https://nextjs.org/docs/basic-features/built-in-css-support
import 'scss/app.scss'

//  import global markdown styles
import 'scss/markdownContent.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  //  app-wide shared state that will be stored in React Context
  const [detentionBlockState, setDetentionBlockState] = useState(
    initialDetentionBlockState
  )

  /**
   * This function randomly changes the detention block state
   */
  const changeSituation = useCallback(() => {
    setDetentionBlockState(state => ({
      ...state,
      detentionBlocks: state.detentionBlocks.map(b => ({
        ...b,
        situation: getRandomSituation()
      }))
    }))
  }, [])

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
          <DetentionBlockContext.Provider
            value={{
              ...detentionBlockState,
              changeSituation
            }}
          >
            <Component {...pageProps} />
          </DetentionBlockContext.Provider>
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
