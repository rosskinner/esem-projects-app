import React from 'react'
import ReactMarkdown from 'react-markdown'
import { getStrapiMedia } from '../lib/api'

const Article = ({ article }) => {
  const imageUrl = getStrapiMedia(article.collectionImage)
  return (
    <>
      <div id='banner' className='w-100 flex flex-row justify-center items-center'>
        <div className='w-70'>
          <div className='aspect-ratio aspect-ratio--4x3'>
            <div style={{ backgroundImage: `url(${imageUrl})` }} className='hero-image bg-center contain aspect-ratio--object' />
          </div>
        </div>
      </div>
      <div className='project-content ph5 mt6 f3'>
        <div className='w-100'>
          <p className='mb3 project-title'>{article.title}</p>
          <p className='fancy project-description mt0'>{article.description}</p>
        </div>
        <div className='details w-100 flex mt6'>

          <ReactMarkdown source={article.content} escapeHtml={false} />
        </div>
      </div>
    </>
  )
}

export default Article
