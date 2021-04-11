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

  const active = useRouter().pathname

  return (
    <div className='flex flex-column w-100 ttc f6 nav top-0 fixed'>
      <div className='flex w-100 ph4 ph5-l pv4'>
        <div className='db dtc w-50 v-mid relative'>
          {showLogo &&
            <Link className='relative' href='/'>
              {image}
            </Link>}
        </div>

        <div className='db dtc w-100 w-50-l tr v-mid pv3 details '>
          <div>
            <Link href='/projects'>
              <a className={`mh3 mh4-l dib v-mid ${active.includes('projects') ? 'nav-active' : ''}`}>Projects</a>
            </Link>
            <Link href='/articles'>
              <a className={`mh3 mh4-l dib v-mid ${active.includes('articles') ? 'nav-active' : ''}`}>News</a>
            </Link>
            <Link href='/about'>
              <a className={`ml3 ml4-l dib v-mid ${active.includes('about') ? 'nav-active' : ''}`}>About</a>
            </Link>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Nav
