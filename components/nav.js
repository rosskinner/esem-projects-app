import React from 'react'
import Link from 'next/link'
import defaultLogo from '../assets/logo.png'
import { getStrapiMedia } from '../lib/api'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'

const Nav = ({ global, heading, description, showLogo = true, contactpage }) => {
  let logo
  let image
  // console.log(global)
  if (global) {
    logo = global.logo
    // console.log(logo)
    image = logo === null ? <img className=' logo pt2 pointer' src={defaultLogo} /> : <img className='logo pt2 pointer' alt={logo.alternativeText} src={getStrapiMedia(logo)} />
  }

  console.log('global', global, image)

  const active = useRouter().pathname
  console.log('active', active)

  return (
    <div className='flex flex-column w-100 ttc f6 nav top-0'>
      <div className='flex w-100 ph5 pv4'>
        <div className='db dtc w-50 v-mid relative'>
          <Link className='relative' href='/'>
            {image}
          </Link>

          {!showLogo &&
            <div className=''>
              <h1 className='mb3 f4 heading'>{heading}</h1>
              <span className='mt0'>{description}</span>
            </div>}
        </div>
        <div className='db dtc w-100 tr v-mid pv3 details'>
          <Link href='/projects'>
            <a className={`mh4 dib v-mid ${active.includes('projects') ? 'nav-active' : ''}`}>Projects</a>
          </Link>
          <Link href='/articles'>
            <a className={`mh4 dib v-mid ${active.includes('articles') ? 'nav-active' : ''}`}>News</a>
          </Link>
          <Link href='/about'>
            <a className={`mh4 dib v-mid ${active.includes('about') ? 'nav-active' : ''}`}>About</a>
          </Link>
          {/* <Link href='/contact'>
            <a className='ml4 dib v-mid'>Contact</a>
          </Link> */}
        </div>
      </div>
      {showLogo &&
        <div className='flex flex-row justify-end nav-contact details'>
          {contactpage.Contact.map((contact, i) => {
            return (
              <div key={i} className='pb3 pt3 ph4'>
                <p className='pb2'>{contact.heading}</p>
                <p>{contact.name}</p>
                <a className=' ttl' href={`mailto: ${contact.email}`}>{contact.email}</a>
              </div>
            )
          })}
          <div className='pb3 pt3 ph4'>
            <ReactMarkdown source={contactpage.address} />
          </div>

        </div>}
    </div>
  )
}

export default Nav
