import React, { useEffect } from 'react'

const CarouselItem = ({ children, show, mouseMove, mouseOut, showMedia, setShowContent, type, caption, target }) => {
  useEffect(() => {
    if (target) {
      if (show === 'active' && type === 'video') {
        // console.log(children.props.src)
        console.log('PLAY')
        target.playVideo()
      } else if (show === '' && type === 'video') {
        target.pauseVideo()
      }

      if (show === 'active' && type === 'video-vimeo') {
        console.log('PLAY VIMEO')
        target.play()
      } else if (show === '' && type === 'video-vimeo') {
        target.pause()
      }
    }
  }, [show])
  return (
    <div className={`hero-image-container w-100 h-100 flex flex-column media ${show}`}>
      <div className='hero-image justify-center center flex' onMouseMove={mouseMove} onMouseLeave={mouseOut} onClick={showMedia}>
        {children}
      </div>
      <div className='w-100 ph5 pv4 flex details'>
        <div className='w-70 dib v-mid'>
          <span className='detail f6 i'>{caption}</span>
        </div>
        <div className='w-30 tr dib v-mid'>
          <span className='mt0 bb bw1 b--white pointer' onClick={setShowContent}>Read more...</span>
        </div>
      </div>
    </div>
  )
}

export default CarouselItem
