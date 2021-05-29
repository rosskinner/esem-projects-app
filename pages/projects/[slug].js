import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import Project from '../../components/projects'
import Tag from '../../components/tag'

const Projects = ({ category, categories, projectpage }) => {
  
  const seo = {
    metaTitle: `${projectpage.heading}: ${category.name}`,
    metaDescription: `${category.name}: ${projectpage.description}`
  }
  
  const projects = category.projects.sort((a, b) => {
    return new Date(a.year).getTime() -
        new Date(b.year).getTime()
  }).reverse()

  return (

    <div className='container pt6'>
      <h1 className='f2 pt5-l ph4 ph5-l mv4'>{projectpage.heading}</h1>
      <Tag categories={categories} path='projects'>
        <Seo seo={seo} />
        <Project category={category} projects={projects} page={projectpage} limit={12} />
      </Tag>
    </div>
  )
}

export async function getStaticPaths() {
  const categories = await fetchAPI('/categories')

  const paths = {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      }
    })),
    fallback: false,
  }
  return paths
}

export async function getStaticProps ({params}) {
  // Run API calls in parallel
  const [categories, projectpage] = await Promise.all([
    fetchAPI('/categories'),
    fetchAPI('/project-page')
  ])

  const category = (await fetchAPI(`/categories?slug=${params.slug}`))[0]

  return {
    props: { categories, category,  projectpage },
    revalidate: 1
  }
}

export default Projects
