
import { useRouter } from 'next/router'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const Footer = ({ global, contactpage }) => {
  const route = useRouter().pathname
  let position = ''
  if (route === '/') position = 'footer-fixed'
  return (
    <footer className={`white flex flex-column w-100 pa4 pa5-l ${position}`}>
      <div className='flex flex-row w-100 nav-contact details f6 justify-between'>
        <div className='pb3 pr4-ns'>
          <ReactMarkdown source={contactpage.address} />
        </div>

        {contactpage.Contact.map((contact, i) => {
          return (
            <div key={i} className='pb3'>
              <a className=' ttl' href={`mailto: ${contact.email}`}>{contact.email}</a>
            </div>
          )
        })}

      </div>

      <div className='flex flex-row justify-between'>
        {/* {global.add} */}
        <div className='w-50 w-20-ns'>
          © {global.siteName} 2021
        </div>

        {global.social &&
          <div className='w-50  flex flex-column flex-row-ns justify-end flex-wrap tr'>
            {global.social.facebook &&
              <a className='f6 details underline secondary-color pl3' href={global.social.facebook} rel='noreferrer' target='_blank'>Facebook</a>}
            {global.social.instagram &&
              <a className='f6 details underline secondary-color pl3' href={global.social.instagram} rel='noreferrer' target='_blank'>Instagram</a>}
            {global.social.twitter &&
              <a className='f6 details underline secondary-color pl3' href={global.social.twitter} rel='noreferrer' target='_blank'>Twitter</a>}
            {global.social.linkedin &&
              <a className='f6 details underline secondary-color pl3' href={global.social.linkedin} rel='noreferrer' target='_blank'>LinkedIn</a>}

          </div>}
      </div>

    </footer>
  )
}

export default Footer
