import { useState } from 'react'
import { getStrapiMedia } from '../lib/api'
import ReactMarkdown from 'react-markdown'
import CarouselItem from './carousel-item'
import YouTube from 'react-youtube'
import Vimeo from '@u-wave/react-vimeo'
import MediaOverlay from './media-overlay'

const Carousel = ({ media, setShowContent }) => {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  let fadeOut
  const showMedia = (e) => {
    // clearInterval(fadeOut)
    // hoverTimer()
    let newActive = active === media.length - 1 ? 0 : active + 1
    if (direction === 'Prev') {
      newActive = active === 0 ? media.length - 1 : active - 1
    }

    setActive(newActive)
  }
  // const hoverTimer = () => {
  //   fadeOut = setInterval(() => {
  //     const root = document.documentElement

  //     root.style.setProperty('--indicatorOpacity', 0)
  //     clearInterval(fadeOut)
  //   }, 2000)
  // }

  const mouseMove = (e) => {
    const half = window.innerWidth / 2
    let dir = 'Next'
    if (e.screenX < half) {
      dir = 'Prev'
    }
    if (direction !== dir)setDirection(dir)

    const root = document.documentElement
    // clearInterval(fadeOut)
    // hoverTimer()
    root.style.setProperty('--mouse-x', `${e.screenX}px`)
    root.style.setProperty('--mouse-y', `${e.screenY - 150}px`)
    root.style.setProperty('--indicatorOpacity', 1)
  }
  const mouseOut = () => {
    const root = document.documentElement
    root.style.setProperty('--indicatorOpacity', 0)
  }

  return (
    <>
      <div id='banner' className='w-100 flex flex-row justify-center items-center'>
        <div className='carousel-indicator f4 fancy'>
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
            const show = active === key ? 'active' : ''
            if (m.mime) {
              if (m.mime.includes('image')) {
                const mediaUrl = getStrapiMedia(m)
                // console.log(m)

                return (
                  <CarouselItem index={key} key={key} mouseMove={mouseMove} mouseOut={mouseOut} showMedia={showMedia} setShowContent={setShowContent} caption={m.caption} show={show}>
                    <img src={mediaUrl} alt={m.alternativeText} className='relative w-100 justify-center center contain' />
                  </CarouselItem>
                )
              } else {
                // console.log('not image', m)
                return (
                  <CarouselItem index={key} key={key} mouseMove={mouseMove} mouseOut={mouseOut} showMedia={showMedia} setShowContent={setShowContent} caption={m.caption} show={show} />
                )
              }
            } else {
              // console.log('not image', m)
              if (m.__component.includes('sound-cloud')) {
                return (
                  <CarouselItem index={key} key={key} mouseMove={mouseMove} mouseOut={mouseOut} showMedia={showMedia} setShowContent={setShowContent} caption={m.caption} show={show}>
                    <ReactMarkdown source={m.embed} escapeHtml={false} />
                  </CarouselItem>
                )
              } else {
                const id = m.link.split('/')
                if (m.link.includes('you')) {
                  const [target, setTarget] = useState('')
                  const [play, setPlay] = useState(false)
                  const onReady = (e) => {
                    setTarget(e.target)
                    // console.log('playVID')
                  }
                  const playVid = (e) => {
                    const width = window.innerWidth / parseFloat(
                      getComputedStyle(
                        document.querySelector('body')
                      )['font-size']
                    )

                    if (width < 30) setPlay(!play)
                  }
                  return (
                    <CarouselItem index={key} key={key} play={play} mouseMove={mouseMove} mouseOut={mouseOut} showMedia={showMedia} setShowContent={setShowContent} caption={m.caption} show={show} type='video' target={target}>

                      <YouTube
                        containerClassName='video w-100 justify-center center contain'
                        videoId={id[id.length - 1]}
                        opts={{ width: '100%', height: '100%', playerVars: { modestbranding: 1, controls: 0, loop: 1, enablejsapi: 1 } }}
                        onReady={onReady}
                      />
                      <div className='absolute w-100 h-100' />
                      <MediaOverlay key={key} show={show} onClick={playVid} play={play} />

                    </CarouselItem>
                  )
                } else {
                  const [target, setTarget] = useState('')
                  const [play, setPlay] = useState(false)
                  const onReady = (e) => {
                    setTarget(e)
                  }
                  const playVid = (e) => {
                    // console.log('playVID')
                    console.log(document.innerWidth)
                    const width = window.innerWidth / parseFloat(
                      getComputedStyle(
                        document.querySelector('body')
                      )['font-size']
                    )

                    if (width < 30) setPlay(!play)
                  }

                  return (
                    <CarouselItem index={key} play={play} key={key} mouseMove={mouseMove} mouseOut={mouseOut} showMedia={showMedia} setShowContent={setShowContent} caption={m.caption} show={show} type='video-vimeo' target={target}>

                      <Vimeo
                        video={id[id.length - 1]}
                        width='100%'
                        height='100%'
                        className='video w-100 justify-center center contain'
                        frameBorder='0'
                        allow='autoplay; fullscreen;'
                        allowFullScreen
                        loop
                        controls={false}
                        onReady={onReady}
                      />
                      <div className='absolute w-100 h-100' />
                      <MediaOverlay key={key} show={show} onClick={playVid} play={play} />
                    </CarouselItem>
                  )
                }
              }
            }
          })}
        </div>
      </div>

    </>
  )
}

export default Carousel
