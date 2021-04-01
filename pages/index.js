import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import Articles from "../components/articles";
import Seo from '../components/seo'
import { fetchAPI, getStrapiMedia } from '../lib/api'

const Home = ({ category, global }) => {
  
  // const [enterPos, setEnterPos] = useState({x: 0, y: 0})
  const [loaded, setLoaded] = useState(false)
  const [drag, setDrag] = useState(false)
  const [lastPos, setLastPos] = useState(0)
  const [click, setClick] = useState(false)
  const router = useRouter()



  useEffect(() => {
    const height = document.getElementsByClassName('image-container')[0].clientHeight
    const width = document.getElementsByClassName('image-container')[0].clientWidth
    // console.log('height', h)
    // setHeight(h)
    // setWidth(w)

    category.projects.map((project, i) => {
      const url = project.collectionImage.formats === null ? project.collectionImage : project.collectionImage.formats.medium

      const imgHeight = ((url.height / url.width) * 300)
      const maxHeight = height - imgHeight
      const minHeight = 0
      const maxWidth = ((width / category.projects.length) * (i + 1)) - 300
      const minWidth = ((width / category.projects.length) * i)
      const posY = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)
      const posX = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth)
      project.pos = {}
      project.pos.height = imgHeight
      project.pos.x = posX
      project.pos.y = posY
      if(i === category.projects.length - 1) setLoaded(true)
    })
    // console.log(project)

  },[])

  const onMouseMove = (e) => {
    // console.log(e)
    if (drag) {
      const elPos = parseInt(e.target.style.left.split('px')[0])
      // const offset = e.screenX - elPos
      const offset = e.screenX - lastPos
      console.log(e.screenX, lastPos)
      setLastPos(e.screenX)
      
      e.target.style.left = `${elPos + offset}px`
      setClick(true)
    }
    
  }

  const onMouseDown = (e) => {
    setLastPos(e.screenX)
    setDrag(true)
    setClick(false)
    
    // setEnterPos({x: e.screenX, y: e.screenY})
  }

  const onMouseUp = (e) => {
    
    
    if (!click) {
      console.log(e)
      console.log(e.target.dataset)
      router.push(e.target.dataset.href, e.target.dataset.as)
      
    }
    setDrag(false)  
      setClick(false)  
  }

  const handleClick = (e) => {
    console.log(e)
    
  }

  const onMouseLeave = () => {
    setDrag(false)
  }
  return (
    <div>
      <Seo />
      <div className='home-container relative'>
        <div className='baskerville title tc'>
          <h1>{global.defaultSeo.metaDescription} {global.defaultSeo.metaDescription} {global.defaultSeo.metaDescription} {global.defaultSeo.metaDescription} {global.defaultSeo.metaDescription} {global.defaultSeo.metaDescription}</h1>
        </div>
        <div className='absolute w-100 h-100 image-container'>
          {/* <Articles articles={articles} /> */}
          {loaded &&
            <>
              {category.projects.map((project, i) => {
              const url = project.collectionImage.formats === null ? project.collectionImage : project.collectionImage.formats.medium
              const imgSrc = getStrapiMedia(url)

              // const imgHeight = ((url.height / url.width) * 300)
              // const maxHeight = height - imgHeight
              // const minHeight = 0
              // const maxWidth  =  ((width / category.projects.length) * (i + 1)) - 300
              // const minWidth  =  ((width / category.projects.length) * i)
              // const posY = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)
              // const posX = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth)

              return (
                // <Link key={i} >
                  <div key ={i} data-as={`project/${project.slug}`} data-href='project/[id]' className='absolute cover' width='300px' height={`${project.pos.height}px`} style={{width: '300px', height: `${project.pos.height}px`, top: `${project.pos.y}px`, left: `${project.pos.x}px`, backgroundImage: `url(${imgSrc})`}}  
                  onMouseMove={onMouseMove} 
                  onMouseDown={onMouseDown} 
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseLeave} >
                    {/* <img width='300px' src={imgSrc} /> */}
                  </div>
                // </Link>
              )
            })}
            </>
          }
          
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
