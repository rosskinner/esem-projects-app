import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Seo from '../components/seo'
import { fetchAPI, getStrapiMedia } from '../lib/api'
// import Paper from '../components/paper'

const Home = ({ category, global }) => {
  const [current, setCurrent] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    let changeProj
    if (animate) {
      changeProj = setInterval(function () {
        setCurrent(current => current === category.projects.length - 1 ? 0 : current + 1)
      }, 1000)
    }

    return () => {
      clearInterval(changeProj)
    }
  }, [animate])

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

  const selectedUrl = (category.projects[current].collectionImage.formats === null || Object.keys(category.projects[current].collectionImage.formats).length === 0) ? category.projects[current].collectionImage : category.projects[current].collectionImage.formats.medium
  const imgSrcSelected = getStrapiMedia(selectedUrl)
  const background = { backgroundImage: `url(${imgSrcSelected})` }

  return (
    <div>
      <Seo />
      <div>
        {selectedUrl.mime.includes('image') &&
          <Image
            className={`absolute w-100 h-100 bg-home ${outline}`} src={imgSrcSelected}
            layout='fill'
            objectFit='cover'
            alt={selectedUrl.alternativeText}
          />}

        {selectedUrl.mime.includes('video') &&
          <video
            autoPlay
            loop
            playsInline
            preload='auto'
            muted
            className={`home-video absolute w-100 h-100 bg-home ${outline}`} src={imgSrcSelected}
            alt={selectedUrl.alternativeText}
          />}
      </div>
    
      <div className='home-container relative pt6 relative w-90 w-70-l center'>
        <div className='w-100 h-100 flex items-center'>
          <div className='w-100 aspect-ratio aspect-ratio--home center' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>

            {category.projects.map((project, i) => {
              const url = (project.collectionImage.formats === null || Object.keys(project.collectionImage.formats).length === 0) ? project.collectionImage : project.collectionImage.formats.medium
              const imgSrc = getStrapiMedia(url)
              let show = 'o-0 below'
              let hover = ''
              if (current === i) show = 'o-100 above'
              if (current === i && !animate) hover = 'hover'

              return (
                <Link
                  key={i} as={`project/${project.slug}`} href='project/[id]'
                >
                  <div className={`home-mask absolute cover ${show} ${hover} aspect-ratio aspect-ratio--home-item pointer`}>

                    {url.mime.includes('image') &&
                      <Image
                        className='home-image aspect-ratio--object cover' src={imgSrc}
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
                        className='home-image aspect-ratio--object cover' src={imgSrc}
                        alt={url.alternativeText}
                      />}

                  </div>

                </Link>
              )
            })}

            <svg className='home-svg'>
              <clipPath id='clip' clipPathUnits='objectBoundingBox' viewBox="0 0 397 434" transform='scale(0.002518891688, 0.002304147465)'>
                {/* <path d="M0 192.096V0H116V51H56.5V70H116V119.5H56.5V141.5H116V192.096H0Z" fill="white"/>
                <path d="M194.5 143.5V192.096H140V0H215.5C237.964 0 251 8 261 17.5C273.864 27.676 282.5 48.688 282.5 70C282.5 91.312 276.701 110.869 266 122.5C254.5 135 238.964 143.5 216.5 143.5H194.5ZM194.5 92.5H202.5C212.484 92.5 216.276 90.184 220.5 85C224.724 79.816 225.5 77 225.5 71.5C225.5 66 224.224 61.376 220 56C216.5 52 210.5 51 203.5 51H194.5V92.5Z" fill="white"/> */}
                <path d="M396.54 5.65751L380.289 0L231.792 427.732L248.043 433.389L396.54 5.65751Z" fill="white"/>
<path d="M0 118.343V312.948H115.196V261.994H55.3153V240.658H115.196V189.506H55.3153V169.496H115.196V118.343H0Z" fill="white"/>
<path d="M198.302 168.966V214.287H207.102C219.607 214.287 230.26 206.8 230.26 191.626C230.26 176.718 219.607 168.966 207.102 168.966H198.302ZM142.391 118.343H207.896C258.712 118.343 287.23 151.937 287.23 191.361C287.23 230.786 259.572 266.036 207.896 266.036H198.302V312.948H142.391V118.343Z" fill="white"/>
              </clipPath>
            </svg>

            <svg className={`logo-outline ${outline}`} width='100%' viewBox="0 0 397 434">
              {/* <path d="M0 192.096V0H116V51H56.5V70H116V119.5H56.5V141.5H116V192.096H0Z" fill="white"/>
              <path d="M194.5 143.5V192.096H140V0H215.5C237.964 0 251 8 261 17.5C273.864 27.676 282.5 48.688 282.5 70C282.5 91.312 276.701 110.869 266 122.5C254.5 135 238.964 143.5 216.5 143.5H194.5ZM194.5 92.5H202.5C212.484 92.5 216.276 90.184 220.5 85C224.724 79.816 225.5 77 225.5 71.5C225.5 66 224.224 61.376 220 56C216.5 52 210.5 51 203.5 51H194.5V92.5Z" fill="white"/> */}
              <path d="M396.54 5.65751L380.289 0L231.792 427.732L248.043 433.389L396.54 5.65751Z" fill="white"/>
<path d="M0 118.343V312.948H115.196V261.994H55.3153V240.658H115.196V189.506H55.3153V169.496H115.196V118.343H0Z" fill="white"/>
<path d="M198.302 168.966V214.287H207.102C219.607 214.287 230.26 206.8 230.26 191.626C230.26 176.718 219.607 168.966 207.102 168.966H198.302ZM142.391 118.343H207.896C258.712 118.343 287.23 151.937 287.23 191.361C287.23 230.786 259.572 266.036 207.896 266.036H198.302V312.948H142.391V118.343Z" fill="white"/>
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
