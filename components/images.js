import { getStrapiMedia } from '../lib/api'

const Images = ({ media }) => {
  console.log(media)
  // media.map((m, key) => {
  //   console.log(m)
  //   // const position = 'w-100'
  //   // if (m.width < m.height)
  //   m.position = 'w-100'
  //   if (key > 0) {
  //     const prev = media[key - 1]

  //     if (prev.width < prev.height && m.width < m.height && ((key % 2 - 1) === 0)) {
  //       prev.position = 'w-50'
  //       m.position = 'w-50'
  //     }
  //   }
  // })
  return (
    <>
      {media.map((m, key) => {
        const mediaUrl = getStrapiMedia(m)
        console.log(m)

        if (m.mime.includes('image')) {
          return <img className={`${m.position} dib v-mid`} key={key} src={mediaUrl} />
        } else {
          return <video controls src={mediaUrl} />
        }
      })}
    </>
  )
}

export default Images
