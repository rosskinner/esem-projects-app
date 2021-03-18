import App from 'next/app'
import Head from 'next/head'
import { createContext } from 'react'
import { getStrapiMedia, fetchAPI } from '../lib/api'
import Nav from '../components/nav'
import 'tachyons'
import '../styles/globals.css'

// Store Strapi Global object in context
export const GlobalContext = createContext({})

const EsemApp = ({ Component, pageProps }) => {
  const { global } = pageProps

  return (
    <>
      <Head>
        {global.favicon &&
          <link rel='shortcut icon' href={getStrapiMedia(global.favicon)} />}
      </Head>
      <div className='white'>
        <Nav {...pageProps} />
        <div className='container'>
          <GlobalContext.Provider value={global}>
            <Component {...pageProps} />
          </GlobalContext.Provider>
        </div>
      </div>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
EsemApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const global = await fetchAPI('/global')

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } }
}

export default EsemApp
