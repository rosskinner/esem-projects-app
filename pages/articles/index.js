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
  const [articles, tags] = await Promise.all([
    fetchAPI('/articles'),
    fetchAPI('/tags')

  ])

  return {
    props: { articles, tags },
    revalidate: 1
  }
}

export default Articles
