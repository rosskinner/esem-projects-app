import React from 'react'
// import Articles from "../components/articles";
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import ArticlesCard from '../../components/articles'
import Tag from '../../components/tag'

const Articles = ({ articles, tags, tag }) => {
  const seo = {
    metaTitle: 'News',
    metaDescription: 'News'
  }

  return (
    <>
      <div className='container pt6'>
        <p className='f2 pt6-l ph4 ph5-l'>News</p>
        <Tag categories={tags} path='articles'>
          <Seo seo={seo} />
          <ArticlesCard articles={articles} tags={tags} />
        </Tag>
      </div>
    </>
  )
}

export async function getStaticProps ({ params }) {
  // Run API calls in parallel
  const [art, tags] = await Promise.all([
    fetchAPI('/articles'),
    fetchAPI('/tags')

  ])

  const articles = art.sort((a, b) => {
    return new Date(a.date).getTime() -
        new Date(b.date).getTime()
  }).reverse()
  return {
    props: { articles, tags },
    revalidate: 1
  }
}

export default Articles
