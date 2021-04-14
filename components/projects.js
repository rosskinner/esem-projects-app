import React, { useEffect, useState } from 'react'
import Card from './card'
import smallButton from '../assets/small-button.png'
import largeButton from '../assets/large-button.png'
import { AnimateSharedLayout, motion } from 'framer-motion'

// import cookieCutter from 'cookie-cutter'
// const cookieCutter = require('cookie-cutter')

const Projects = ({ projects, category }) => {
  const [width, setWidth] = useState('w-25')

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

  return (
    <AnimateSharedLayout>

      <div className='w-100 w-20-ns w-50-l tr'>
        <img className={`dn dib-l pointer button ma2 small-${width}`} src={smallButton} alt='small-view' data-value='w-25' onClick={toggleView} />
        <img className={`dn dib-l pointer button ma2 large-${width}`} src={largeButton} alt='large-view' data-value='w-third' onClick={toggleView} />
      </div>

      <div
        className='projects w-100 flex flex-row flex-wrap pt6'
      >
        {projects.map((project, i) => {
          return (
            <Card width={width} key={i} index={i} project={project} category={category} path='/project' />
          )
        }
        )}
      </div>
    </AnimateSharedLayout>
  )
}

export default Projects
