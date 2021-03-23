import React from 'react'
// import Articles from "../components/articles";
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import ReactMarkdown from 'react-markdown'
import Card from '../../components/card'
import Thumbnail from '../../components/thumbnail'

const Projects = ({ aboutpage, contactpage, teamMembers, clients, awards }) => {
  console.log(contactpage)
  const seo = {
    metaTitle: aboutpage.heading,
    metaDescription: aboutpage.content
  }

  return (
    <>
      <div className='container'>
        <Seo seo={seo} />
        <div className='mh5 pt6 flex flex-wrap f4'>

          <div className='w-70 mb7 pr5'>
            <p className='f2'>About</p>
            <span className='details'>
              <ReactMarkdown source={aboutpage.content} escapeHtml={false} />
            </span>

          </div>
          <div className='w-100'>
            <div className='w-100 mb7'>
              <p className='f2'>{aboutpage.heading}</p>
              <span className='details f6'>
                <ReactMarkdown source={aboutpage.teamContent} escapeHtml={false} />
              </span>
              <div className='projects w-100 flex flex-row flex-wrap mv5'>
                {teamMembers.map((person, i) => {
                  return (
                    <Card width='w-third' key={i} index={i} project={person} category={person.role} link={false} />
                  )
                })}
              </div>
            </div>

            <div className='w-100 f4 mb7'>
              <p className='f2'>Our Services</p>
              <span className='details flex flex-row flex-wrap'>
                {aboutpage.services.map((service, i) => {
                  return (
                    <div className='w-third pr5 mb3' key={i}>
                      <p className='f6'>{service.title}</p>
                      <ReactMarkdown source={service.content} escapeHtml={false} />
                    </div>

                  )
                })}
              </span>
            </div>

            <div className='w-100 f4 mb7'>
              <p className='f2'>Awards</p>
              <p className='w-70 details f6'>{aboutpage.awardsContent}</p>
              <div className='projects flex flex-row flex-wrap mv5 details f4'>
                {awards.map((award, i) => {
                  return (
                    <div key={i} className='w-third pr5 mb3'>
                      <p>{award.title}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='w-100 f4 mb7 '>
              <p className='f2'>Clients</p>
              <p className='w-70 details f6'>{aboutpage.clientContent}</p>
              <div className='mv5 w-70 flex flex-wrap details'>
                {clients.map((client, i) => {
                  return (
                    <Thumbnail className='w-third pr6' key={i} index={i} item={client} />
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps ({ params }) {
  // Run API calls in parallel
  const [aboutpage, contactpage, teamMembers, clients, awards] = await Promise.all([
    fetchAPI('/about-page'),
    fetchAPI('/contact-page'),
    fetchAPI('/team-members'),
    fetchAPI('/clients'),
    fetchAPI('/awards')
  ])

  return {
    props: { aboutpage, contactpage, teamMembers, clients, awards },
    revalidate: 1
  }
}

export default Projects
