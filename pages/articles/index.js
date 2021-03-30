import React from 'react'
// import Articles from "../components/articles";
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import ArticlesCard from '../../components/articles'
import Tag from '../../components/tag'

const Articles = ({ articles, tags }) => {
  const seo = {
    metaTitle: 'News',
    metaDescription: 'News'
  }

  return (
    <>
      <div className='container'>
        <p className='f2 pt6-l ph4 ph5-l'>News</p>
        <Tag categories={tags}>
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
    return new Date(a.published_at).getTime() -
        new Date(b.published_at).getTime()
  }).reverse()
  return {
    props: { articles, tags },
    revalidate: 1
  }
}

export default Articles
