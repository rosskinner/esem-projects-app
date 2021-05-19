import Link from 'next/link'

import moment from 'moment'

const ArticleBanner = ({ article }) => {
  return (
    <div className='w-100 w-25-l pt6 fixed-l'>
      <div className='w-100 ph4 ph5-l pt4 mb3'>
        <h1 className='mb3 f2 heading mv4'>{article.title}</h1>
        <h2 className='mt0 f6'>{article.description}</h2>
      </div>

      <div className='w-100 flex flex-column'>

        <div className='w-100 project-panel ph4 ph5-l'>
          <div className='w-100 pv2 v-mid flex'>
            <div className='w-100'>
              {article.team_member && <Link as={`/about/${article.team_member.slug}`} href='/about/[id]'><p className='mv0 details f6 underline'>by {article.team_member.name}</p></Link>}
              {article.date &&
                <p className='f6'>
                  <strong>
                    <span>{moment(article.date).format('YYD MMM YYYYYY')}</span>
                  </strong>
                </p>}
              {article.project &&
                <div className='mt5'>
                  <p className='f6 b'>Related Project</p>
                  <div className='flex flex-column'>
                    <div className='f6'>
                      <Link scroll={false} as={`/project/${article.project.slug}`} href='/project/[id]'>
                        <a className='mv0 f6 details underline'>{article.project.title}</a>

                      </Link>
                    </div>
                  </div>
                </div>}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ArticleBanner
