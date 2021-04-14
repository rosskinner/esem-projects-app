import App from 'next/app'
import Head from 'next/head'
import { createContext, useEffect } from 'react'
import { getStrapiMedia, fetchAPI } from '../lib/api'
import Nav from '../components/nav'
import 'tachyons'
import '../styles/globals.css'
import Footer from '../components/footer'
import { AnimatePresence, motion } from 'framer-motion'
// Store Strapi Global object in context
export const GlobalContext = createContext({})

const EsemApp = ({ Component, pageProps, router }) => {
  const { global } = pageProps

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--secondary-color', global.secondaryColor)
  })

  const pageTransition = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  }

  const handExitComplete = () => {
    // Get the hash from the url

    // Smooth scroll to that elment
    window.scroll({
      top: 0
    })
  }

  return (
    <>
      <Head>
        {global.favicon &&
          <link rel='shortcut icon' href={getStrapiMedia(global.favicon)} />}
      </Head>
      <div className='white'>
        <Nav {...pageProps} />
        <GlobalContext.Provider value={global}>
          <AnimatePresence exitBeforeEnter onExitComplete={handExitComplete}>
            <motion.div key={router.route} initial='initial' animate='in' exit='out' variants={pageTransition}>
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </GlobalContext.Provider>
        <Footer {...pageProps} />
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
