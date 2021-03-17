import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import defaultLogo from '../assets/logo.png'
import { getStrapiMedia } from '../lib/api'

const Nav = ({ global }) => {
  const { logo } = global
  const image = logo === null ? <img className='logo pt2' src={defaultLogo} /> : <Image className='logo pt2' src={getStrapiMedia(logo)} />
  return (
    <div className='flex w-100 pv4 ph5 ttc f6'>
      <div className='db dtc w-50 v-mid'>
        <Link href='/'>
          {image}
        </Link>
      </div>
      <div className='db dtc w-100 tr v-mid pv3'>
        <Link href='/projects'>
          <a className='mh4 dib v-mid'>Projects</a>
        </Link>
        <Link href='/about'>
          <a className='mh4 dib v-mid'>About</a>
        </Link>
        <Link href='/contact'>
          <a className='ml4 dib v-mid'>Contact</a>
        </Link>
      </div>
    </div>
  )
}

export default Nav
