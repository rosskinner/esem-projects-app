export function getStrapiURL(path ='') {
    console.log('process.env.NEXT_PUBLIC_STRAPI_API_URL', process.env.NEXT_PUBLIC_STRAPI_API_URL)
    return `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
    }${path}`
  }
  
  // Helper to make GET requests to Strapi
  export async function fetchAPI(path) {
    const requestUrl = getStrapiURL(path)
    const response = await fetch(requestUrl)
    const data = await response.json()
    return data
  }

  export function getStrapiMedia(media) {
    const imageUrl = media.url.startsWith('/')
      ? getStrapiURL(media.url)
      : media.url;
    return imageUrl;
  }
