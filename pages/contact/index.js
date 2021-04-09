import React from 'react'
// import Articles from "../components/articles";
import Seo from '../../components/seo'
import { fetchAPI } from '../../lib/api'
import ReactMarkdown from 'react-markdown'

const Contact = ({ contactpage }) => {
  console.log(contactpage)
  const seo = {
    metaTitle: contactpage.heading,
    metaDescription: 'contact'
  }

  return (
    <>
      <div className='container contact mt7'>
        <Seo seo={seo} />
        <div className='mh5 pt6 flex flex-wrap'>
          <div className='w-100 f2 mb7'>
            <p>{contactpage.heading}</p>
          </div>

          <div className='w-30 f4 mb7 details'>
            {contactpage.Contact.map((contact, i) => {
              return (
                <div key={i} className=' mb3'>
                  <p>{contact.heading}</p>
                  <p>{contact.name}</p>
                  <a href={`mailto: ${contact.email}`}>{contact.email}</a>
                </div>
              )
            })}

          </div>
          <div className='w-30 f4 mb7 details'>
            <ReactMarkdown source={contactpage.address} />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps ({ params }) {
  // Run API calls in parallel
  const contactpage = await fetchAPI('/contact-page')

  return {
    props: { contactpage },
    revalidate: 1
  }
}

export default Contact
