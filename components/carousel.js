import { useState } from 'react'
import { getStrapiMedia } from '../lib/api'

const Carousel = ({ media }) => {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)

  const showMedia = (e) => {
    let newActive = active === media.length - 1 ? 0 : active + 1
    if (direction === 'Prev') {
      newActive = active === 0 ? media.length - 1 : active - 1
    }

    setActive(newActive)
  }

  const mouseMove = (e) => {
    const half = window.innerWidth / 2
    let dir = 'Next'
    if (e.screenX < half) {
      dir = 'Prev'
    }
    if (direction !== dir)setDirection(dir)

    const root = document.documentElement
    root.style.setProperty('--mouse-x', `${e.screenX}px`)
    root.style.setProperty('--mouse-y', `${e.screenY - 150}px`)
    root.style.setProperty('--showIndicator', 'visible')
  }
  const mouseOut = () => {
    const root = document.documentElement
    root.style.setProperty('--showIndicator', 'hidden')
  }

  return (
    <>
      <div id='banner' className='w-100 flex flex-row justify-center items-center' onClick={showMedia} onMouseMove={mouseMove} onMouseLeave={mouseOut}>
        <div className='carousel-indicator f2 fancy'>
          <div>
            {direction === 'Prev' &&
              <span className='mr3 ttc'>{direction}</span>}

            <span>{active + 1} of {media.length}</span>
            {direction === 'Next' &&
              <span className='ml3 ttc'>{direction}</span>}
          </div>
          <div />
        </div>

        <div className='w-100 carousel-container relative ph5 flex flex-column'>
          {media.map((m, key) => {
            if (m.mime) {
              if (m.mime.includes('image')) {
                const mediaUrl = getStrapiMedia(m)
                const show = active === key ? 'active' : ''
                return (
                  <div className='hero-image center justify-center flex' key={key}>
                    <img src={mediaUrl} className={`relative w-100 justify-center center contain media ${show}`} />
                  </div>
                )
                // return <div key={key} style={{ backgroundImage: `url(${mediaUrl})` }} className={`hero-image bg-center contain aspect-ratio--object media ${show}`} />
              } else {
                return <div key={key} />
              }
            } else {
              return <div key={key} />
            }
          })}
        </div>
      </div>

    </>
  )
}

export default Carousel
