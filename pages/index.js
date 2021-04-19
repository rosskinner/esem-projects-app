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
    console.log('enter')
    setAnimate(false)
  }

  const mouseLeave = (e) => {
    setAnimate(true)
    console.log('exit')
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
              let show = 'o-0'
              let hover = ''
              if (current === i) show = 'o-100'
              if (current === i && !animate) hover = 'hover'

              return (
                <Link
                  key={i} as={`project/${project.slug}`} href='project/[id]'
                >
                  <div className={`home-mask absolute cover ${show} ${hover} aspect-ratio aspect-ratio--8x5 pointer`}>

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
              <clipPath id='clip' clipPathUnits='objectBoundingBox' transform='scale(0.00350877193, 0.00518134715)'>
                <path d='M0 192.096V0H116V49H56.5V70H116V118.5H56.5V141.5H116V192.096H0Z' fill='white' />
                <path d='M195.5 143V192.096H141V0H216.5C238.964 0 249.636 6.82399 262.5 17C275.364 27.176 284.5 48.688 284.5 70C284.5 91.312 278.864 111.48 266 123C253.136 134.52 239.964 143.5 217.5 143.5L195.5 143ZM195.5 93.024H203.5C213.484 93.024 218.276 92.684 222.5 87.5C226.724 82.316 228.5 77.872 228.5 70C228.5 61.168 228.224 59.876 224 54.5C219.776 49.124 214.484 49 204.5 49H195.5V93.024Z' fill='white' />
              </clipPath>
            </svg>

            <svg className={`logo-outline ${outline}`} width='100%' viewBox='0 0 285 193'>
              <path d='M0 192.096V0H116V49H56.5V70H116V118.5H56.5V141.5H116V192.096H0Z' fill='white' />
              <path d='M195.5 143V192.096H141V0H216.5C238.964 0 249.636 6.82399 262.5 17C275.364 27.176 284.5 48.688 284.5 70C284.5 91.312 278.864 111.48 266 123C253.136 134.52 239.964 143.5 217.5 143.5L195.5 143ZM195.5 93.024H203.5C213.484 93.024 218.276 92.684 222.5 87.5C226.724 82.316 228.5 77.872 228.5 70C228.5 61.168 228.224 59.876 224 54.5C219.776 49.124 214.484 49 204.5 49H195.5V93.024Z' fill='white' />
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
