import React from 'react'
// import Articles from "../components/articles";
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import Project from '../../components/projects'
import Tag from '../../components/tag'

const Projects = ({ projects, category, categories, projectpage }) => {
  
  const seo = {
    metaTitle: `${projectpage.heading}: ${category}`,
    metaDescription: projectpage.description
  }
  return (

    <div className='container pt6'>
      <h1 className='f2 pt5-l ph4 ph5-l'>{projectpage.heading}</h1>
      <Tag categories={categories} path='projects'>
        <Seo seo={seo} />
        <Project category={category} projects={projects} page={projectpage} />
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
  const [ categories, projectpage] = await Promise.all([
    // fetchAPI('/projects'),
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
