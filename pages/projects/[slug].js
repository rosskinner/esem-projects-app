import React from 'react'
// import Articles from "../components/articles";
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import Project from '../../components/projects'
import Tag from '../../components/tag'

const Projects = ({ projects, category, categories, projectpage }) => {
  console.log(projectpage)
  const seo = {
    metaTitle: projectpage.heading,
    metaDescription: projectpage.description
  }
  return (
    <>
    <div className='container mt6'>
      <p className='f2 pt6-l ph4 ph5-l'>{projectpage.heading}</p>
      <Tag categories={categories}>
        <Seo seo={seo} />
        <Project category={category} projects={category.projects} page={projectpage} />
      </Tag>
    </div>
      

    </>
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
