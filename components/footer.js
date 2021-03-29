
import React from 'react'

const Footer = ({ global, pageProps }) => {
  console.log(global)
  return (
    <footer className='white flex flex-row w-100 pa4 pa5-l'>
      {/* {global.add} */}
      <div className='w-50'>
        © {global.siteName} 2021
      </div>
      {global.social &&
        <div className='w-50  flex flex-column flex-row-ns justify-end flex-wrap tr'>
          {global.social.facebook &&
            <a className='f6 details underline secondary-color pl3 ph3-ns' href={global.social.facebook} rel='noreferrer' target='_blank'>Facebook</a>}
          {global.social.instagram &&
            <a className='f6 details underline secondary-color pl3 ph3-ns' href={global.social.instagram} rel='noreferrer' target='_blank'>Instagram</a>}
          {global.social.twitter &&
            <a className='f6 details underline secondary-color pl3 ph3-ns' href={global.social.twitter} rel='noreferrer' target='_blank'>Twitter</a>}
          {global.social.linkedin &&
            <a className='f6 details underline secondary-color pl3 ph3-ns' href={global.social.linkedin} rel='noreferrer' target='_blank'>LinkedIn</a>}

        </div>}

    </footer>
  )
}

export default Footer
