import { getStrapiMedia } from '../lib/api'

const Images = ({ media }) => {
  console.log(media)

  return (
    <>
      <div id='banner' className='w-100 flex flex-row justify-center items-center'>
        <div className='w-70'>
          <div className='aspect-ratio aspect-ratio--4x3'>
            {media.map((m, key) => {
              const mediaUrl = getStrapiMedia(m)

              return <div key={key} style={{ backgroundImage: `url(${mediaUrl})` }} className='hero-image bg-center contain aspect-ratio--object' />
            })}
          </div>
        </div>
      </div>

    </>
  )
}

export default Images
