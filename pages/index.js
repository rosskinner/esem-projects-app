import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Seo from '../components/seo'
import { fetchAPI, getStrapiMedia } from '../lib/api'
// import Paper from '../components/paper'

const Home = ({ category, global }) => {
  const [current, setCurrent] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [play, setPlay] = useState(false)
  const [suspend, setSuspend] = useState(false)

  useEffect(() => {
    let changeProj
    const time = play ? 10000 : 6000
    if (animate) {
      changeProj = setInterval(function () {
        setCurrent(current => current === category.projects.length - 1 ? 0 : current + 1)
      }, time)
    }

    return () => {
      clearInterval(changeProj)
    }
  }, [animate])

  const checkLoaded = (e) => {
    setLoaded(true)
  }

  const onPlay = () => {
    // console.log('play')
    setLoaded(true)
    setPlay(true)
  }
  const checkSuspended = () => {
    if (!play) {
      setSuspend(true)
      setLoaded(true)
    }
  }

  const mouseEnter = (e) => {
    setAnimate(false)
  }

  const mouseLeave = (e) => {
    setAnimate(true)
  }

  let outline

  if (!animate) {
    outline = 'hover'
  }
  // console.log('loaded', loaded)

  return (
    <div>
      <Seo />
      {category.projects.map((project, i) => {
        const url = (project.collectionImage.formats === null || Object.keys(project.collectionImage.formats).length === 0) ? project.collectionImage : project.collectionImage.formats.medium
        let imgSrc = getStrapiMedia(url)
        if (url.mime.includes('video')) imgSrc = imgSrc.split('upload')[0] += 'upload/q_auto:good' + imgSrc.split('upload')[1]
        let fallback = ''

        const remove = imgSrc.split('/')
        remove[remove.length - 1] = url.hash + '.png'
        fallback = remove.join('/')

        return (
          <div key={i} className={`${current === i ? 'db' : 'dn'}`}>
            {url.mime.includes('image') &&
              <Image
                className={`absolute w-100 h-100 bg-home fixed ${outline} `} src={imgSrc}
                layout='fill'
                objectFit='cover'
                alt={url.alternativeText}
              />}
            {url.mime.includes('video') &&
              <Image
                className={`absolute w-100 h-100 bg-home fixed ${outline} `} src={fallback}
                layout='fill'
                objectFit='cover'
                alt={url.alternativeText}
              />}

            {url.mime.includes('video') &&
              <video
                autoPlay
                loop
                playsInline
                preload='auto'
                muted
                className={`home-video absolute w-100 h-100 bg-home fixed ${play ? outline : 'o-0'}`} src={imgSrc}
                alt={url.alternativeText}
                onSuspend={checkSuspended}
              />}

          </div>
        )
      })}

      <div className='home-container relative pt6 relative w-90 w-70-l center'>
        <div className='w-100 h-100 flex items-center'>
          <div className='w-100 aspect-ratio aspect-ratio--home center' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>

            {category.projects.map((project, i) => {
              const url = (project.collectionImage.formats === null || Object.keys(project.collectionImage.formats).length === 0) ? project.collectionImage : project.collectionImage.formats.medium
              let imgSrc = getStrapiMedia(url)
              let show = 'o-0 below'
              let hover = ''
              if (current === i) show = 'o-100 above'
              if (current === i && !animate) hover = 'hover'
              if (url.mime.includes('video')) imgSrc = imgSrc.split('upload')[0] += 'upload/q_auto:good' + imgSrc.split('upload')[1]
              let fallback = ''

              const remove = imgSrc.split('/')
              remove[remove.length - 1] = url.hash + '.png'
              fallback = remove.join('/')

              return (
                <Link
                  key={i} as='about' href='about'
                >
                  <div className={`home-mask absolute cover ${show} ${hover} aspect-ratio aspect-ratio--home-item pointer`}>

                    {url.mime.includes('image') &&
                      <Image
                        className='home-image aspect-ratio--object cover' src={imgSrc}
                        layout='fill'
                        objectFit='cover'
                        alt={url.alternativeText}
                        onLoad={checkLoaded}
                      />}

                    {url.mime.includes('video') &&
                      <Image
                        className='home-image aspect-ratio--object cover' src={fallback}
                        layout='fill'
                        objectFit='cover'
                        alt={url.alternativeText}
                        onLoad={checkLoaded}
                      />}
                    {url.mime.includes('video') &&
                      <div className={`home-image aspect-ratio--object cover ${play ? 'o-1' : 'o-0'}`}>
                        <video
                          autoPlay
                          loop
                          playsInline
                          preload='auto'
                          muted
                          src={imgSrc}
                          alt={url.alternativeText}
                          onPlay={onPlay}
                          className='vid cover w-100 h-100'
                          onCanPlay={checkLoaded}
                          onSuspend={checkSuspended}
                        />
                      </div>}

                    <div className={`home-image aspect-ratio--object cover bg-white ${!loaded ? 'o-1' : 'o-0'}`} />

                  </div>

                </Link>
              )
            })}

            <svg className='home-svg'>
              <clipPath id='clip' clipPathUnits='objectBoundingBox' viewBox='0 0 288 195' transform='scale(0.003472222222, 0.005128205128)'>
                <path d='M0 0.343262V194.948H115.196V143.994H55.3153V122.658H115.196V71.506H55.3153V51.4956H115.196V0.343262H0Z' fill='white' />
                <path d='M198.302 50.9656V96.2871H207.102C219.607 96.2871 230.26 88.7998 230.26 73.6263C230.26 58.7179 219.607 50.9656 207.102 50.9656H198.302ZM142.391 0.343262H207.896C258.712 0.343262 287.23 33.9369 287.23 73.3613C287.23 112.786 259.572 148.036 207.896 148.036H198.302V194.948H142.391V0.343262Z' fill='white' />
              </clipPath>
            </svg>

            <svg className={`logo-outline pointer ${outline}`} width='100%' viewBox='0 0 288 195'>
              <path d='M0 0.343262V194.948H115.196V143.994H55.3153V122.658H115.196V71.506H55.3153V51.4956H115.196V0.343262H0Z' fill='white' />
              <path d='M198.302 50.9656V96.2871H207.102C219.607 96.2871 230.26 88.7998 230.26 73.6263C230.26 58.7179 219.607 50.9656 207.102 50.9656H198.302ZM142.391 0.343262H207.896C258.712 0.343262 287.23 33.9369 287.23 73.3613C287.23 112.786 259.572 148.036 207.896 148.036H198.302V194.948H142.391V0.343262Z' fill='white' />
            </svg>

          </div>
        </div>

      </div>
    </div>
  )
}

export async function getStaticProps () {
  // Run API calls in parallel
  let category = await fetchAPI('/categories?slug=featured')
  category = category[0]

  return {
    props: { category },
    revalidate: 1
  }
}

export default Home
