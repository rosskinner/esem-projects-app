import App from 'next/app'
import Head from 'next/head'
import { createContext, useEffect } from 'react'
import { getStrapiMedia, fetchAPI } from '../lib/api'
import Nav from '../components/nav'
import 'tachyons'
import '../styles/globals.css'
import Footer from '../components/footer'
// Store Strapi Global object in context
export const GlobalContext = createContext({})

const EsemApp = ({ Component, pageProps }) => {
  const { global } = pageProps

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--secondary-color', global.secondaryColor)
  })

  return (
    <>
      <Head>
        {global.favicon &&
          <link rel='shortcut icon' href={getStrapiMedia(global.favicon)} />}
      </Head>
      <div className='white'>
        <Nav {...pageProps} />
        <GlobalContext.Provider value={global}>
          <Component {...pageProps} />
        </GlobalContext.Provider>
      </div>

      <Footer global={global} pageProps={pageProps} />

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
  const [global, proj, contactpage] = await Promise.all([
    fetchAPI('/global'),
    fetchAPI('/projects'),
    fetchAPI('/contact-page')
  ])

  const projects = proj.sort((a, b) => {
    return new Date(a.year).getTime() -
        new Date(b.year).getTime()
  }).reverse()
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global, projects, contactpage } }
}

export default EsemApp
