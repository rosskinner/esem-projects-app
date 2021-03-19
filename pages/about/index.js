import React from 'react'
// import Articles from "../components/articles";
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import ReactMarkdown from 'react-markdown'
import Card from '../../components/card'

const Projects = ({ aboutpage, teamMembers, clients, awards }) => {
  console.log(aboutpage, teamMembers)
  const seo = {
    metaTitle: aboutpage.heading,
    metaDescription: aboutpage.aboutcontent
  }

  return (
    <>
      <div className='container'>
        <Seo seo={seo} />
        <div className='mh5 pt6 flex flex-wrap'>
          <div className='w-50 fancy f2'>
            <ReactMarkdown source={aboutpage.aboutContent} escapeHtml={false} />
          </div>
          <div className='w-50' />
          <div className='w-50 f2'>
            <p>{aboutpage.heading}</p>
            <p>{aboutpage.directorsContent}</p>

          </div>
          <div className='projects w-50 flex flex-row flex-wrap mt6'>
            {teamMembers.map((person, i) => {
              if (person.type === 'Director') {
                return (
                  <div className='w-50' key={i}>
                    <Card width='w-third' index={i} project={person} category={person.role} team />
                  </div>
                )
              }
              return <div key={i} />
            })}
          </div>
          <div className='w-50 f2'>
            <p>{aboutpage.teamContent}</p>

          </div>
          <div className='projects w-50 flex flex-row flex-wrap mt6'>
            {teamMembers.map((person, i) => {
              if (person.type === 'Team') {
                return (
                  <div key={i} className='w-50'>
                    <Card width='w-third' index={i} project={person} category={person.role} team />
                  </div>
                )
              }
              return <div key={i} />
            })}
          </div>

          <div className='w-50 f2'>
            <p>{aboutpage.awardsContent}</p>

          </div>
          <div className='projects w-50 flex flex-row flex-wrap mt6'>
            {awards.map((award, i) => {
              return (
                <div key={i} className='w-50'>
                  <Card width='w-third' index={i} project={award} category={award.role} team />
                </div>
              )
            })}
          </div>

          <div className='w-50 f2'>
            <p>{aboutpage.clientContent}</p>

          </div>
          <div className='projects w-50 flex flex-row flex-wrap mt6'>
            {clients.map((client, i) => {
              return (
                <div key={i} className='w-50'>
                  <Card width='w-third' index={i} project={client} category={client} team />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps ({ params }) {
  // Run API calls in parallel
  const [aboutpage, teamMembers, clients, awards] = await Promise.all([
    fetchAPI('/about-page'),
    fetchAPI('/team-members'),
    fetchAPI('/clients'),
    fetchAPI('/awards')
  ])

  return {
    props: { aboutpage, teamMembers, clients, awards },
    revalidate: 1
  }
}

export default Projects
