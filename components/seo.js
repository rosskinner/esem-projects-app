import Head from 'next/head'
import { useContext } from 'react'
import { getStrapiMedia } from '../lib/api'
import { GlobalContext } from '../pages/_app'

const Seo = ({ seo }) => {
  const { defaultSeo, siteName } = useContext(GlobalContext)
  const seoWithDefaults = {
    ...defaultSeo,
    ...seo
  }
  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: `${seoWithDefaults.metaTitle} | ${siteName}`
    // Get full image URL
    // shareImage: getStrapiMedia(seoWithDefaults.shareImage),
  }

  const shareImage = getStrapiMedia(fullSeo.shareImage)

  return (
    <Head>
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property='og:title' content={fullSeo.metaTitle} />
          <meta name='twitter:title' content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name='description' content={fullSeo.metaDescription} />
          <meta property='og:description' content={fullSeo.metaDescription} />
          <meta name='twitter:description' content={fullSeo.metaDescription} />
        </>
      )}
      {shareImage && (
        <>
          <meta property='og:image' content={shareImage} />
          <meta name='twitter:image' content={shareImage} />
          <meta name='image' content={shareImage} />
        </>
      )}
      {fullSeo.article && <meta property='og:type' content='article' />}

      {fullSeo.project && <meta property='og:type' content='project' />}
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  )
}

export default Seo