import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import Articles from "../components/articles";
import Seo from '../components/seo'
import { fetchAPI, getStrapiMedia } from '../lib/api'
import Canvas from '../components/canvas'

const Home = ({ category, global }) => {
  
  // const [enterPos, setEnterPos] = useState({x: 0, y: 0})
  const [loaded, setLoaded] = useState(false)
  const [drag, setDrag] = useState(false)
  const [lastPos, setLastPos] = useState({x: 0, y: 0})
  const [click, setClick] = useState(false)
  const [selectedProject, setSelectedProject] = useState('')
  const router = useRouter()
  const projectLinks = [{text: 'create', projectId: 0}, {text: 'curious', projectId: 1}, {text: 'inclusive', projectId: 2}]
  const letters = new Canvas(projectLinks)

  useEffect(() => {
    const height = document.getElementsByClassName('image-container')[0].clientHeight
    const width = document.getElementsByClassName('image-container')[0].clientWidth
    // console.log('height', h)
    // setHeight(h)
    // setWidth(w)

    category.projects.map((project, i) => {
      const url = (project.collectionImage.formats === null || Object.keys(project.collectionImage.formats).length === 0) ? project.collectionImage : project.collectionImage.formats.medium
      
      const imgHeight = ((url.height / url.width) * 300)
      const maxHeight = height - imgHeight
      const minHeight = 0
      const maxWidth = ((width / category.projects.length) * (i + 1)) - 300
      const minWidth = ((width / category.projects.length) * i)
      const posY = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)
      const posX = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth)
      project.pos = {}
      project.pos.height = imgHeight
      // project.pos.x = posX
      // project.pos.y = posY
      setLastPos({x: project.pos.x, y: project.pos.y})
      if(i === category.projects.length - 1) setLoaded(true)
    })
    
    letters.init()
    // console.log(letters)

  }, [loaded])

  const onMouseMove = (e) => {
    // console.log(e)
    if (drag) {
      const elPos = {left: parseInt(e.target.style.left.split('px')[0]), top: parseInt(e.target.style.top.split('px')[0])}
      // const offset = e.screenX - elPos
      const offset = {left: e.screenX - lastPos.x, top: e.screenY - lastPos.y}
      // console.log(elPos.top, e.screenY - lastPos.y)
      setLastPos({x: e.screenX, y: e.screenY})
      
      e.target.style.left = `${elPos.left + offset.left}px`
      e.target.style.top = `${elPos.top + offset.top}px`
      setClick(true)
    }
    
    
    
  }

  const onMouseMoveCanvas = (e) => {
    // console.log(letters)
    letters.move(e)
    const root = document.documentElement
    root.style.setProperty('--mouse-x', `${e.screenX}px`)
    root.style.setProperty('--mouse-y', `${e.screenY - 150}px`)

    if (selectedProject !== letters.selectedWord) setSelectedProject(letters.selectedWord)
    // console.log(letters.selectedWord)
  }

  const onMouseDown = (e) => {
    setLastPos({x: e.screenX, y: e.screenY})
    e.target.style.zIndex = 100
    setDrag(true)
    setClick(false)
    
    // setEnterPos({x: e.screenX, y: e.screenY})
  }

  const onMouseUp = (e) => {
    if (!click) {
      console.log(e.target.dataset)
      router.push(e.target.dataset.href, e.target.dataset.as)
    }
    e.target.style.zIndex = 1
    setDrag(false)
    setClick(false)
  }

  // const handleClick = (e) => {
  //   console.log(e)
  // }

  const onMouseLeave = () => {
    setDrag(false)
  }
  return (
    <div>
      <Seo />
      <div className='home-container pt6 relative'>
        <div className='baskerville title tc'>
          <h1 id='home-text' className='dn'>{global.defaultSeo.metaDescription}</h1>
        </div>
        <div className='absolute w-100 h-100 image-container'>
          <canvas id='stage' onMouseMove={onMouseMoveCanvas}/>  
        </div>
      </div>
      {loaded &&
            <>
              {category.projects.map((project, i) => {
              const url = (project.collectionImage.formats === null || Object.keys(project.collectionImage.formats).length === 0) ? project.collectionImage : project.collectionImage.formats.medium
              const imgSrc = getStrapiMedia(url)

              return (
                  <div key ={i} data-as={`project/${project.slug}`} data-href='project/[id]' className={`absolute cover home-image ${selectedProject === i ? 'db': 'dn'}`} width='300px' height={`${project.pos.height}px`} style={{width: '300px', height: `${project.pos.height}px`, backgroundImage: `url(${imgSrc})`}}  
                  // onMouseMove={onMouseMove} 
                  // onMouseDown={onMouseDown} 
                  // onMouseUp={onMouseUp}
                  // onMouseLeave={onMouseLeave}
                  // onMouseOut={onMouseLeave} 
                  >
                  </div>
              )
            })}
            </>
          }
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
