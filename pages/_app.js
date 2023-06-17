import App from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

import { createContext, useEffect, useState } from 'react'
import { getStrapiMedia, fetchAPI } from '../lib/api'
import Nav from '../components/nav'
import 'tachyons'
import '../styles/globals.css'
import Footer from '../components/footer'
import { LazyMotion, AnimatePresence, m, domAnimation } from 'framer-motion'
import Subscribe from '../components/subscribe'


// Store Strapi Global object in context
export const GlobalContext = createContext({})

const EsemApp = ({ Component, pageProps, router }) => {
  const { global } = pageProps
  const [scroll, setScroll] = useState(true)
  const [subscribed, setSubscribed] = useState(false)

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
    if (router.pathname !== '/about') {
      window.scroll({
        top: 0
      })
    }

    if (router.asPath === '/about#team') {
      const element = document.getElementById('team')

      element.scrollIntoView({ block: 'center' })
    }
  }

  const closeSub = () => {
    setSubscribed(true)
  }

  const subscribePath = (path) => {
    console.log('subscribePath', path, document.cookie)
    document.cookie = `pathname=${path};path=/;max-age=max-age-in-seconds=7776000;`
  }

  const subscription = () => {
    console.log(document.cookie)
    document.cookie = 'subscribed=true;path=/;max-age=max-age-in-seconds=7776000'
  }

  useEffect(() => {
    function handleScroll (e) {
      const top = (window.scrollY < 100)
      if (scroll !== top) {
        setScroll(top)
      }
    }
    window.addEventListener('scroll', handleScroll, false)

    const cookie = document.cookie.split('; ')
      .find(row => row.startsWith('subscribed'))
    if (cookie) {
      const sub = cookie.split('=')[1]
      setSubscribed(sub)
    }

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
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HDWHVM1K5L" strategy="afterInteractive"></Script>
      <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-HDWHVM1K5L');
        `
        }
        
      </Script>
      <div className='white'>
        <Nav {...pageProps} scroll={scroll} />
        <GlobalContext.Provider value={global}>
          <LazyMotion features={domAnimation}>

            <AnimatePresence exitBeforeEnter onExitComplete={handExitComplete}>
              <m.div className='motion-container' key={router.route} initial='initial' animate='in' exit='out' variants={pageTransition}>
                <Component {...pageProps} scroll={scroll} subscription={subscription} />
              </m.div>
            </AnimatePresence>
          </LazyMotion>
        </GlobalContext.Provider>
        {!subscribed && <Subscribe onClose={closeSub} setSubscribePath={subscribePath} />}
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
