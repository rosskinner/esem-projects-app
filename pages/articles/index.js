import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import ArticlesCard from '../../components/articles'
import Tag from '../../components/tag'

const Articles = ({ articles, tags, tag }) => {
  const seo = {
    metaTitle: 'Stories',
    metaDescription: 'Stories'
  }

  return (
    <>
      <div className='container pt6'>
        <h1 className='f2 pt5-l ph4 ph5-l mv4'>Stories</h1>
        <Tag categories={tags} path='articles'>
          <Seo seo={seo} />
          <ArticlesCard articles={articles} tags={tags} limit={12} />
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
