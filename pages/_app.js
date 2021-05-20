import App from 'next/app'
import Head from 'next/head'
import { createContext, useEffect, useState } from 'react'
import { getStrapiMedia, fetchAPI } from '../lib/api'
import Nav from '../components/nav'
import 'tachyons'
import '../styles/globals.css'
import Footer from '../components/footer'
import { LazyMotion, AnimatePresence, m, domAnimation } from 'framer-motion'

// Store Strapi Global object in context
export const GlobalContext = createContext({})

const EsemApp = ({ Component, pageProps, router }) => {
  const { global } = pageProps
  const [scroll, setScroll] = useState(true)

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

  useEffect(() => {
    function handleScroll (e) {
      const top = (window.scrollY < 100)
      if (scroll !== top) {
        setScroll(top)
      }
    }
    window.addEventListener('scroll', handleScroll, false)
    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [scroll])

  return (
    <>
      <Head>
        {global.favicon &&
          <link rel='shortcut icon' href={getStrapiMedia(global.favicon)} />}
        <link href={getStrapiMedia(global.favicon)} rel='apple-touch-icon' />

      </Head>
      <div className='white'>
        <Nav {...pageProps} scroll={scroll} />
        <GlobalContext.Provider value={global}>
          <LazyMotion features={domAnimation}>

            <AnimatePresence exitBeforeEnter onExitComplete={handExitComplete}>
              <m.div className='motion-container' key={router.route} initial='initial' animate='in' exit='out' variants={pageTransition}>
                <Component {...pageProps} scroll={scroll} />
              </m.div>
            </AnimatePresence>
          </LazyMotion>
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
  const [global, contactpage] = await Promise.all([
    fetchAPI('/global'),
    fetchAPI('/contact-page')
  ])
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global, contactpage } }
}

export default EsemApp
