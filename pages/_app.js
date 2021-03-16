import App from "next/app";
import Head from "next/head";
import '../styles/globals.css';
import { createContext } from "react";
import { getStrapiMedia, fetchAPI } from "../lib/api";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const EsemApp = ({ Component, pageProps }) => {
  const { global } = pageProps;

  return (
    <>
      <Head>
        {global &&
          <link rel="shortcut icon" href={getStrapiMedia(global.Favicon)} />
        }
        
      </Head>
      <GlobalContext.Provider value={global}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
EsemApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const global = await fetchAPI('/global');
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default EsemApp;