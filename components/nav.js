import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import defaultLogo from '../assets/logo.png'
import { getStrapiMedia } from '../lib/api'
import ReactMarkdown from 'react-markdown'

const Nav = ({ global, heading, showLogo = true, contactpage }) => {
  let logo
  let image
  if (global) {
    logo = global.logo
    image = logo === null ? <img className='logo pt2' src={defaultLogo} /> : <Image className='logo pt2' src={getStrapiMedia(logo)} />
  }

  return (
    <div className='flex flex-column w-100 ttc f6 nav top-0'>
      <div className='flex w-100 ph5 pv4'>
        <div className='db dtc w-50 v-mid'>
          {showLogo &&
            <Link href='/'>
              {image}
            </Link>}
          {!showLogo &&
            <p className='mb3 f4 heading'>{heading}</p>}
        </div>
        <div className='db dtc w-100 tr v-mid pv3 details'>
          <Link href='/projects'>
            <a className='mh4 dib v-mid'>Projects</a>
          </Link>
          <Link href='/articles'>
            <a className='mh4 dib v-mid'>News</a>
          </Link>
          <Link href='/about'>
            <a className='mh4 dib v-mid'>About</a>
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
