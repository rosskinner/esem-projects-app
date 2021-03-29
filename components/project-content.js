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

      <div className='w-100 w-50-l project-panel vh-100 ph4 ph5-l pb4 pb5-l'>
        <div className='w-100 w-75-l pv4 v-mid flex'>
          <div className='w-90'>
            <h1 className='mb3 f4 heading'>{project.title}</h1>
            <p className='f6'>
              <strong>
                <Moment format='YYYY'>{project.year}</Moment>
              </strong>
            </p>
          </div>
          <div className='w-10 closeButton f4 f2-l fancy '>Close</div>
        </div>
        <div className='project-details w-100 h-100 flex flex-column relative pb6'>

          <div className='w-100 details f4'>
            <ReactMarkdown source={project.body} escapeHtml={false} />
          </div>
          <div className='w-100 f6 flex flex-wrap  flex-row'>
            <div className='w-100 project-det flex flex-column flex-row-l flex-wrap'>

              <ReactMarkdown source={project.details} escapeHtml={false} />
            </div>
            {project.team &&
              <div className='w-100 project-team mt6 flex flex-column flex-row-l flex-wrap'>
                <ReactMarkdown source={project.team} escapeHtml={false} />
              </div>}

          </div>
          {project.articles.length > 0 &&
            <div className='mt5'>
              <p className='f4 details secondary-color'>Want to read even more?</p>
              <div className='flex flex-row'>
                {project.articles.map((article, key) => {
                  console.log(article)
                  return (
                    <div className='f6' key={key}>
                      <Link as={`/article/${article.slug}`} href='/article/[id]'>
                        <a className='underline'>{article.title}</a>
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
