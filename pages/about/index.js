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
    metaDescription: aboutpage.aboutcontent
  }

  return (
    <>
      <div className='container'>
        <Seo seo={seo} />
        <div className='mh5 pt6 flex flex-wrap'>
          <div className='w-70 f2 mb7 pr5'>
            <span className=''>
              <ReactMarkdown source={aboutpage.content} escapeHtml={false} />
            </span>

          </div>
          <div className='w-30 contact'>
            <div className='w-100 f2 mb5 mt4'>
              <p>{contactpage.heading}</p>
            </div>

            <div className='w-100 f4 mb7 details'>
              {contactpage.Contact.map((contact, i) => {
                return (
                  <div key={i} className=' mb3'>
                    <p>{contact.heading}</p>
                    <p>{contact.name}</p>
                    <a href={`mailto: ${contact.email}`}>{contact.email}</a>
                  </div>
                )
              })}
              <ReactMarkdown className='mv4' source={contactpage.address} />
            </div>
          </div>
          <div className='details w-100'>
            <div className='w-100 f3 mb7'>
              <p className='f2'>{aboutpage.heading}</p>
              <span className='details f4'>
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
                      <p className='f3'>{service.title}</p>
                      <ReactMarkdown source={service.content} escapeHtml={false} />
                    </div>

                  )
                })}
              </span>
            </div>

            <div className='w-100 f4 mb7'>
              <p className='f2'>Awards</p>
              <p className='w-70'>{aboutpage.awardsContent}</p>
              <div className='projects flex flex-row flex-wrap mv5 f4'>
                {awards.map((award, i) => {
                  return (
                    <div key={i} className='w-third pr5 mb3'>
                      <p>{award.title}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='w-100 f4 mb7'>
              <p className='f2'>Clients</p>
              <p className='w-70'>{aboutpage.clientContent}</p>
              <div className='mv5 w-70 flex flex-wrap'>
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
