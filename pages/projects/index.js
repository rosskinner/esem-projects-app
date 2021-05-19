import React from 'react'
// import Articles from "../components/articles";
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import Project from '../../components/projects'
import Tag from '../../components/tag'

const Projects = ({ projects, categories, projectpage }) => {
  const seo = {
    metaTitle: projectpage.heading,
    metaDescription: projectpage.description
  }

  return (

    <div className='container pt6'>
      <h1 className='f2 pt5-l ph4 ph5-l mv4'>{projectpage.heading}</h1>
      <Tag categories={categories} path='projects'>
        <Seo seo={seo} />
        <Project projects={projects} page={projectpage} />
      </Tag>
    </div>

  )
}

export async function getStaticProps ({ params }) {
  // Run API calls in parallel
  const [categories, projectpage] = await Promise.all([
    // fetchAPI('/projects'),
    fetchAPI('/categories'),
    fetchAPI('/project-page')
  ])

  return {
    props: { categories, projectpage },
    revalidate: 1
  }
}

export default Projects
