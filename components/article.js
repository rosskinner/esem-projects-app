import React from 'react'
import ReactMarkdown from 'react-markdown'
import { getStrapiURL, getStrapiMedia } from '../lib/api'
import Moment from 'react-moment'

const Article = ({ article }) => {
  const imageUrl = getStrapiMedia(article.collectionImage)
  return (
    <>
      <div id='' className='w-100 flex flex-row justify-center items-center'>
        <div className='w-70'>
          <div className='aspect-ratio aspect-ratio--4x3'>
            <div style={{ backgroundImage: `url(${imageUrl})` }} className='hero-image bg-center contain aspect-ratio--object' />
          </div>
        </div>
      </div>
      <div className='article-content details f4 mt6 w-100 ph5 flex flex-row'>
        <div className='w-third mt4'>
          <p className='mb3'>{article.title}</p>
          <p className='fancy mt0'>{article.description}</p>
          <div className='mv4 f6'>
            <p className='mv0'>by {article.team_member.name}</p>
            <Moment format='D MMM YYYY'>{article.published_at}</Moment>
          </div>
        </div>
        <div className='details f4 w-two-thirds flex flex-column mt4'>
          <ReactMarkdown source={article.content} transformImageUri={(uri) => `${getStrapiURL()}${uri}`} linkTarget='_blank' escapeHtml={false} />
        </div>
      </div>
    </>
  )
}

export default Article
