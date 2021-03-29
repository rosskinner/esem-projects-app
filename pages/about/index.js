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
        <div className='pt6-l flex flex-wrap f4'>

          <div className=' ph4 ph5-l w-100 w-70-l mb4 mb7-l pr5'>
            <p className='f2 '>About</p>

            <ReactMarkdown className='details f4' source={aboutpage.content} escapeHtml={false} />

          </div>
          <div className='w-100'>
            <div className='w-100 mb4 mb7-l  ph4 ph5-l flex flex-column flex-row-l'>
              <div className='w-100 w-25-l'>
                <p className='f2'>{aboutpage.heading}</p>
                <span className='details f6'>
                  <ReactMarkdown source={aboutpage.teamContent} escapeHtml={false} />
                </span>
              </div>

              <div className='projects flex flex-column w-100 flex-row-ns flex-wrap mv3 mv5-l pt4 w-75'>
                {teamMembers.map((person, i) => {
                  return (
                    <Card width='w-third' key={i} index={i} project={person} category={person.role} link={false} description />
                  )
                })}
              </div>
            </div>

            <div className='w-100 f4 ph4 ph5-l mb4 mb7-l flex flex-column'>
              <div className='w-100 w-25-l'>
                <p className='f2'>Our Services</p>

              </div>

              <span className='details flex flex-column flex-row-l flex-wrap w-100'>
                {aboutpage.services.map((service, i) => {
                  return (
                    <div className='w-100 flex flex-column flex-row-l ph4-l mv3 pt4 f4 service' key={i}>
                      <div className='w-100 w-25-l'>
                        <p className='pl3-l secondary-color'>0{i + 1}.</p>
                      </div>
                      <p className='w-100 w-25-l ph3-l'>{service.title}</p>
                      <ReactMarkdown className='w-100 w-50-l pl4-l' source={service.content} escapeHtml={false} />
                    </div>

                  )
                })}
              </span>
            </div>

            <div className='w-100  pt4 pb5 f4 mb4 mb7-l ph4 ph5-l color-block'>
              <div className='w-100'>
                <p className='f2'>Awards</p>

              </div>
              <div className='projects w-100 flex flex-column flex-row-l flex-wrap mv5-l pt3-l details f4 w-75'>
                <div className='w-100 w-25-l mb3'>
                  <span className='details f6'>{aboutpage.awardsContent}</span>
                </div>
                {awards.map((award, i) => {
                  return (
                    <div key={i} className='w-100 w-25-l ph4-l mb3'>
                      <a className='f4 details' href={award.link} rel='noreferrer' target='_blank'>{award.title}</a>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='w-100 f4  ph4 ph5-ns mb7 flex flex-column flex-row-l'>
              <div className='w-100 w-25-l'>
                <p className='f2'>Clients</p>
                <p className='w-100 w-70-l details f6'>{aboutpage.clientContent}</p>
              </div>
              <div className='mv3 w-100 w-75-l flex flex-row flex-wrap details mv5'>
                {clients.map((client, i) => {
                  return (
                    <Thumbnail className='w-sixth mv3 mv0-l ph2-ns ph4-l center' key={i} index={i} item={client} />
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
