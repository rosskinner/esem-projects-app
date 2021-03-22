import React from 'react'
import ReactMarkdown from 'react-markdown'
import Moment from 'react-moment'

const ProjectContent = ({ project, showContent, setShowContent }) => {
  const mouseMove = (e) => {
    const root = document.documentElement
    root.style.setProperty('--mouse-x', `${e.screenX - 50}px`)
    root.style.setProperty('--mouse-y', `${e.screenY - 130}px`)
    root.style.setProperty('--showClose', 'visible')
  }
  const mouseOut = () => {
    const root = document.documentElement
    root.style.setProperty('--showClose', 'hidden')
  }
  return (
    <div className={`project-content f4 fixed ${showContent ? 'active' : 'inactive'}`} onMouseMove={mouseMove} onMouseOut={mouseOut} onClick={() => setShowContent(!showContent)}>
      <div className='closeButton f2 fancy '>Close</div>
      <div className='w-50 project-panel vh-100 ph5'>
        <div className='w-100 pv4'>
          <p className='mb3 f4'>{project.title}</p>
          <p className='f6'>
            <strong>
              <Moment format='YYYY'>{project.year}</Moment>
            </strong>
          </p>
        </div>
        <div className='project-details w-100 h-100 flex flex-column relative pb6'>

          <div className='w-100 details'>
            <ReactMarkdown source={project.body} escapeHtml={false} />
          </div>
          <div className='w-100 f6 flex flex-wrap flex-row'>
            <div className='w-50'>

              <ReactMarkdown source={project.details} escapeHtml={false} />
            </div>
            {project.team &&
              <div className='w-50'>
                <ReactMarkdown source={project.team} escapeHtml={false} />
              </div>}

          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectContent
