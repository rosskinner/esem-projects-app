import React from 'react'
// import Articles from "../components/articles";
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import Project from '../../components/projects'
import Tag from '../../components/tag'

const Projects = ({ projects, categories, projectpage }) => {
  console.log(projectpage)
  const seo = {
    metaTitle: projectpage.heading,
    metaDescription: projectpage.description
  }
  return (
    <>
      <Tag categories={categories}>
        <Seo seo={seo} />
        <Project width='w-25' projects={projects} />
      </Tag>

    </>
  )
}

export async function getStaticProps () {
  // Run API calls in parallel
  const [projects, categories, projectpage] = await Promise.all([
    fetchAPI('/projects'),
    fetchAPI('/categories'),
    fetchAPI('/project-page')
  ])

  return {
    props: { projects, categories, projectpage },
    revalidate: 1
  }
}

export default Projects
