import React from 'react'
import Link from 'next/link'
import defaultLogo from '../assets/logo.png'
import { getStrapiMedia } from '../lib/api'
import { useRouter } from 'next/router'

const Nav = ({ global, showLogo = true }) => {
  let logo
  let image

  if (global) {
    logo = global.logo
    image = logo === null ? <img className=' logo pt2 pointer' src={defaultLogo} /> : <img className='logo pt2 pointer' alt={logo.alternativeText} src={getStrapiMedia(logo)} />
  }

  const active = useRouter().pathname
  let bg = ''
  if (active === '/') bg = 'bg-nav'

  return (
    <div className={`flex flex-column w-100 ttc f6 nav top-0 fixed ${bg}`}>
      <div className='flex w-100 ph4 ph5-l pv4'>
        <div className='db dtc w-50 v-mid relative'>
          {showLogo &&
            <Link scroll={false} className='relative' href='/'>
              {image}
            </Link>}
        </div>

        <div className='db dtc w-100 w-50-l tr v-mid pv3 details '>
          <div>
            <Link scroll={false} href='/projects'>
              <a className={`mh3 mh4-l dib v-mid nav-item ${active.includes('projects') ? 'nav-active' : ''}`}>Projects</a>
            </Link>
            <Link scroll={false} href='/articles'>
              <a className={`mh3 mh4-l dib v-mid nav-item ${active.includes('articles') ? 'nav-active' : ''}`}>News</a>
            </Link>
            <Link scroll={false} href='/about'>
              <a className={`ml3 ml4-l dib v-mid nav-item ${active.includes('about') ? 'nav-active' : ''}`}>About</a>
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Nav
