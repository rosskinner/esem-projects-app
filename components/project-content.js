import React from 'react'
import ReactMarkdown from 'react-markdown'
import Moment from 'react-moment'
import Link from 'next/link'

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
    <div className={`project-content fixed ${showContent ? 'active' : 'inactive'}`} onMouseMove={mouseMove} onMouseOut={mouseOut} onClick={() => setShowContent(!showContent)}>
      <div className='closeButton f2 fancy '>Close</div>
      <div className='w-50 project-panel vh-100 ph5'>
        <div className='w-75 pv4 v-mid'>
          <h1 className='mb3 f4 heading'>{project.title}</h1>
          <p className='f6'>
            <strong>
              <Moment format='YYYY'>{project.year}</Moment>
            </strong>
          </p>
        </div>
        <div className='project-details w-100 h-100 flex flex-column relative pb6'>

          <div className='w-100 details f4'>
            <ReactMarkdown source={project.body} escapeHtml={false} />
          </div>
          <div className='w-100 f6 flex flex-wrap flex-row'>
            <div className='w-50 pr3'>

              <ReactMarkdown source={project.details} escapeHtml={false} />
            </div>
            {project.team &&
              <div className='w-50'>
                <ReactMarkdown source={project.team} escapeHtml={false} />
              </div>}

          </div>
          {project.articles.length > 0 &&
            <div className='mt5'>
              <p className='f4 details'>Want to read even more?</p>
              <div className='flex flex-row'>
                {project.articles.map((article, key) => {
                  console.log(article)
                  return (
                    <div className='f6' key={key}>
                      <Link as={`/article/${article.slug}`} href='/article/[id]'>
                        <a>{article.title}</a>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>}

        </div>
      </div>
    </div>
  )
}

export default ProjectContent
