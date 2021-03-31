import React, { useEffect, useState } from 'react'

const CarouselItem = ({ index, children, play, show, mouseMove, mouseOut, showMedia, setShowContent, type, caption, target, className }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    if (target) {
      if (type === 'video-vimeo' && isPlaying) {
        setIsPlaying(false)
        target.pause()
      } else if (type === 'video' && isPlaying) {
        setIsPlaying(false)
        target.pauseVideo()
      }

      if ((show === 'active' && type === 'video') || (play && type === 'video')) {
        setIsPlaying(true)
        target.playVideo()
      } else if (((show === '' && type === 'video') || (!play && type === 'video')) && isPlaying) {
        target.pauseVideo()
        setIsPlaying(false)
      }

      if ((show === 'active' && type === 'video-vimeo') || (play && type === 'video-vimeo')) {
        target.play().then(() => {
          setIsPlaying(true)
        })
      } else if (((show === '' && type === 'video-vimeo') || (!play && type === 'video-vimeo')) && isPlaying) {
        setIsPlaying(false)
        target.pause()
      }
    }
  }, [show, target, play])
  useEffect(() => {
    return () => {
      if (target && isPlaying) {
        if (type === 'video-vimeo') {
          target.pause()
        } else if (type === 'video') {
          target.pauseVideo()
        }
        setIsPlaying(false)
      }
    }
  }, [])
  return (
    <div className={`hero-image-container w-100 h-100 flex flex-wrap media ${show}`}>
      <div className='hero-image w-100 justify-center center flex' onMouseMove={mouseMove} onMouseLeave={mouseOut} onClick={showMedia}>
        {children}
      </div>
      <div className='w-100 ph5 pv4 flex details'>
        <div className='w-100 w-70-l dib v-mid'>
          <span className='detail f6 i'>{caption}</span>
        </div>
        <div className='w-30 tr dn dib-l v-mid'>
          <span className='mt0 underline pointer secondary-color' onClick={setShowContent}>Read more...</span>

        </div>
      </div>
    </div>
  )
}

export default CarouselItem
