import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import ArticlesCard from '../../components/articles'
import Tag from '../../components/tag'

const Articles = ({ tags, tag }) => {
  const seo = {
    metaTitle: `Stories: ${tag.name}`,
    metaDescription: `Stories: ${tag.name}`
  }

  return (
    <>
      <div className='container pt6'>
        <h1 className='f2 pt5-l ph4 ph5-l mv4'>Stories</h1>
        <Tag categories={tags} path='articles'>
          <Seo seo={seo} />
          <ArticlesCard articles={tag.articles} tag={tag} tags={tags} limit={12} />
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
  const tags = await fetchAPI('/tags')

  const tag = (await fetchAPI(`/tags?slug=${params.slug}`))[0]
  return {
    props: { tags, tag },
    revalidate: 1
  }

  
}

export default Articles
