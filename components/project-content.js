import Link from 'next/link'
import moment from 'moment'

const ProjectContent = ({ className, project, showContent, setShowContent }) => {
  return (
    <div className={`${className} wrap`}>
      <div className='w-100 ph4 ph5-l pt4 mb3'>
        <h1 className='mb3 f2 heading mv4'>{project.title}</h1>
        <h2 className='mt0 f6'>{project.description}</h2>
      </div>
      <div className='w-100 flex flex-column'>

        <div className='w-100 project-panel ph4 ph5-l'>
          <div className='w-100 pv2 v-mid flex'>
            <div className='w-100'>
              <p className='f6'>
                <strong>
                  {/* <Moment>{project.year}</Moment> */}
                  <span>{moment(project.year).format('YYYY')}</span>
                </strong>
              </p>
              {project.articles.length > 0 &&
                <div className='mt5 dn db-l'>
                  <p className='f6 details'>Read More</p>
                  <div className='flex flex-column pb4'>
                    {project.articles.map((article, key) => {
                      return (
                        <div className='f6 bold pb3' key={key}>
                          <Link legacyBehavior scroll={false} as={`/article/${article.slug}`} href='/article/[id]'>
                            <a className='underline'>{article.title}</a>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>}

              <Link legacyBehavior href='/projects'>
                <a className='underline db mb2 f6'> {'< Back to Projects'}</a>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectContent
