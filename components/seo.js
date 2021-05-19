import Head from 'next/head'
import { useContext } from 'react'
import { getStrapiMedia } from '../lib/api'
import { GlobalContext } from '../pages/_app'
import {useRouter} from 'next/router'

const Seo = ({ seo }) => {
  const { defaultSeo, siteName } = useContext(GlobalContext)
  const seoWithDefaults = {
    ...defaultSeo,
    ...seo
  }

  const router = useRouter()
  
  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: `${seoWithDefaults.metaTitle} | ${siteName}`
    // Get full image URL
    // shareImage: getStrapiMedia(seoWithDefaults.shareImage),
  }
  let shareImage = null
  if (fullSeo.shareImage) {
    const url = (fullSeo.shareImage.formats === null || Object.keys(fullSeo.shareImage.formats).length === 0) ? fullSeo.shareImage : (fullSeo.shareImage.formats.small ? fullSeo.shareImage.formats.small : fullSeo.shareImage)
    shareImage = getStrapiMedia(url)
  }

  const path = router.asPath

  

  return (
    <Head>
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <meta property='type' content='article' />
      <meta property='og:type' content='article' />
      <meta property='twitter:type' content='article' />

      <meta property='og:url' content={`https://esemprojects.com${router.asPath}`} />
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
      {fullSeo.shareImage && 
        <>
          <meta property='og:image' content={shareImage} />
          <meta name='twitter:image' content={shareImage} />
          <meta name='image' content={shareImage} />
        </>
      }


      <meta name='twitter:card' content='summary_large_image' />
      <link rel='canonical' href={`https://esemprojects.com${path}`} />
    </Head>
  )
}

export default Seo
