import React from 'react'
import Moment from 'react-moment'
import Link from 'next/link'

const ProjectContent = ({ className, project, showContent, setShowContent }) => {
  return (
    <div className={className}>
      <div className='w-100 ph4 ph5-l pt4 mb3'>
        <h1 className='mb3 f2 heading'>{project.title}</h1>
        <span className='mt0 f6'>{project.description}</span>
      </div>
      <div className='w-100 flex flex-column'>

        <div className='w-100 project-panel ph4 ph5-l'>
          <div className='w-100 pv2 v-mid flex'>
            <div className='w-100'>
              <p className='f6'>
                <strong>
                  <Moment format='YYYY'>{project.year}</Moment>
                </strong>
              </p>
              {project.articles.length > 0 &&
                <div className='mt5'>
                  <p className='f6 details secondary-color'>Want to read even more?</p>
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
      </div>
    </div>
  )
}

export default ProjectContent
