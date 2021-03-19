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
      <div className='container'>
        <Tag categories={categories}>
          <Seo seo={seo} />
          <Project projects={projects} />
        </Tag>
      </div>
    </>
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
