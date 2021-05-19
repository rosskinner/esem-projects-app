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
        <h1 className='f2 pt5-l ph4 ph5-l'>News</h1>
        <Tag categories={tags} path='articles'>
          <Seo seo={seo} />
          <ArticlesCard articles={articles} tag={tag} tags={tags} />
        </Tag>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const tags = await fetchAPI('/tags')

  const paths = {
    paths: tags.map((tag) => ({
      params: {
        slug: tag.slug,
      }
    })),
    fallback: false,
  }
  return paths
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
  const tag = (await fetchAPI(`/tags?slug=${params.slug}`))[0]
  return {
    props: { articles, tags, tag },
    revalidate: 1
  }

  
}

export default Articles
