import React from 'react'
import ReactMarkdown from 'react-markdown'
import { getStrapiURL, getStrapiMedia } from '../lib/api'
import Moment from 'react-moment'
import Link from 'next/link'

const Article = ({ article }) => {
  const imageUrl = getStrapiMedia(article.collectionImage)
  console.log('article', article)
  return (
    <>
      <div id='' className='w-100 flex flex-row justify-center items-center'>
        <div className='w-70'>

          <div className='aspect-ratio aspect-ratio--4x3'>
            <img src={imageUrl} alt={imageUrl.alternativeText} className='card-img contain aspect-ratio--object' />
          </div>
        </div>
      </div>
      <div className='article-content f4 mt6 w-100 ph5 flex flex-row'>
        <div className='w-third mt4'>
          <h1 className='mb3'>{article.title}</h1>
          <h2 className='mt0 f6'>{article.description}</h2>
          <div className='mv4 f6'>
            <p className='mv0 details'>by {article.team_member.name}</p>
            <Moment format='D MMM YYYY'>{article.published_at}</Moment>
          </div>

          <div className='mv4'>
            <p className='f4 secondary-color'>Read about the project?</p>
            <Link as={`/project/${article.project.slug}`} href='/project/[id]'>
              <a className='mv0 f6 details underline'>{article.project.title}</a>
            </Link>

          </div>
        </div>
        <div className='details f4 w-two-thirds flex flex-column mt4 details'>
          <ReactMarkdown source={article.content} transformImageUri={(uri) => `${getStrapiURL()}${uri}`} linkTarget='_blank' escapeHtml={false} />
        </div>
      </div>
    </>
  )
}

export default Article
