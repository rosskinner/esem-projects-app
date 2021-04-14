import Vimeo from '@u-wave/react-vimeo'
import React, { useState } from 'react'
import YouTube from 'react-youtube'
import MediaOverlay from './media-overlay'

const Video = ({ video }) => {
  // console.log('video', video)
  const [target, setTarget] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  const onReady = (e) => {
    const type = video.link.includes('you') ? 'youtube' : 'vimeo'
    if (type === 'youtube') setTarget(e.target)
    if (type === 'vimeo') setTarget(e)
  }

  const playVid = (e) => {
    console.log(video, target)
    const type = video.link.includes('you') ? 'youtube' : 'vimeo'
    if (target) {
      if (type === 'vimeo' && isPlaying) {
        setIsPlaying(false)
        target.pause()
      } else if (type === 'youtube' && isPlaying) {
        setIsPlaying(false)
        console.log('pausevideo')
        target.pauseVideo()
      }

      if (type === 'youtube' && !isPlaying) {
        setIsPlaying(true)
        target.playVideo()
      } else if (type === 'youtube' && !isPlaying) {
        target.pauseVideo()
        setIsPlaying(false)
      }

      if (type === 'vimeo' && !isPlaying) {
        target.play().then(() => {
          setIsPlaying(true)
        })
      } else if (type === 'youube' && isPlaying) {
        setIsPlaying(false)
        target.pause()
      }
    }
  }

  const id = video.link.split('/')

  return (
    <>
      <div id='' className='w-100 pr5-l pv3 pv4-l'>

        {video.link.includes('you') &&

          <div className='relative'>
            <YouTube
              containerClassName='video-container w-100 justify-center center contain'
              videoId={id[id.length - 1]}
              opts={{ width: '100%', height: '100%', playerVars: { modestbranding: 1, controls: 0, loop: 1, enablejsapi: 1 } }}
              onReady={onReady}
            />

            <MediaOverlay show={isPlaying ? 'active' : ''} onClick={playVid} />
          </div>}

        {video.link.includes('vimeo') &&
          <div className='relative'>
            <Vimeo
              video={id[id.length - 1]}
              width='100%'
              height='100%'
              className='video-container w-100 justify-center center contain'
              frameBorder='0'
              allow='autoplay; fullscreen;'
              allowFullScreen
              loop
              controls={false}
              onReady={onReady}
            />

            <MediaOverlay show={isPlaying ? 'active' : ''} onClick={playVid} />
          </div>}
        <p className='f7 pl2 pl0-n'>{video.caption}</p>

      </div>
    </>
  )
}

export default Video
