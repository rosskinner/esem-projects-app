import React, { useState } from 'react'
import Card from './card'
import smallButton from '../assets/small-button.png'
import largeButton from '../assets/large-button.png'

const Projects = ({ projects }) => {
  const [width, setWidth] = useState('w-25')

  const toggleView = (e) => {
    setWidth(e.target.dataset.value)
    console.log()
    // children[1].props.width = e.target.dataset.value
  }
  return (
    <>
      <div className='w-100 w-50-ns pt6 tr'>
        <img className='pointer' src={smallButton} data-value='w-25' onClick={toggleView} />
        <img className='pointer' src={largeButton} data-value='w-third' onClick={toggleView} />
      </div>
      <div className='projects w-100 flex flex-row flex-wrap mt6'>
        {projects.map((project, i) => (
          <Card width={width} key={i} project={project} />
        ))}
      </div>
    </>
  )
}

export default Projects
