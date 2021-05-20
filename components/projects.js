import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import smallButton from '../assets/small-button.png'
import largeButton from '../assets/large-button.png'
import { AnimateSharedLayout } from 'framer-motion'
const Card = dynamic(() => import('./card'))

// import cookieCutter from 'cookie-cutter'
// const cookieCutter = require('cookie-cutter')

const Projects = ({ projects, category, limit }) => {
  const [width, setWidth] = useState('w-25')
  const [loaded, setLoaded] = useState(false)
  const [pagination, setPagination] = useState(limit)
  const [height, setHeight] = useState(0)

  const toggleView = (e) => {
    setWidth(e.target.dataset.value)
    document.cookie = `esem-view=${e.target.dataset.value};`
  }

  useEffect(() => {
    const val = document.cookie.split('; ')
      .find(row => row.startsWith('esem-view='))
    const cachedWidth = val === undefined ? 'w-25' : val.split('=')[1]
    if (cachedWidth !== width) setWidth(cachedWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
  const handleScroll = () => {
    const scrollHeight = window.pageYOffset + window.innerHeight
    if (!loaded && pagination < projects.length) {
      if (scrollHeight >= document.body.offsetHeight - 60) {
        console.log(window.pageYOffset, window.innerHeight, document.body.offsetHeight)
        setLoaded(true)
        setPagination(pagination + limit)
        setHeight(document.body.offsetHeight - 60)
      }
    }
    if (scrollHeight > height && loaded) {
      setLoaded(false)
    }
  }

  return (
    <AnimateSharedLayout>

      <div className='w-100 w-20-ns w-25-l tr'>
        <img className={`dn dib-l pointer button ma2 small-${width}`} src={smallButton} alt='small-view' data-value='w-25' onClick={toggleView} />
        <img className={`dn dib-l pointer button ma2 large-${width}`} src={largeButton} alt='large-view' data-value='w-third' onClick={toggleView} />
      </div>

      <div
        className='projects w-100 flex flex-row flex-wrap pt6'
      >
        {projects.map((project, i) => {
          return (
            <Card width={width} key={i} index={i} project={project} category={category} path='/project' className={i <= (pagination - 1) ? 'db' : 'dn'} />
          )
        }
        )}
      </div>
    </AnimateSharedLayout>
  )
}

export default Projects
