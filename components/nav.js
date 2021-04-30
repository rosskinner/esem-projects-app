import React from 'react'
import Link from 'next/link'
import defaultLogo from '../assets/logo.png'
import { getStrapiMedia } from '../lib/api'
import { useRouter } from 'next/router'

const Nav = ({ global, showLogo = true, scroll }) => {
  let logo
  let image

  if (global) {
    logo = global.logo
    image = logo === null ? <img className=' logo pt2 pointer' src={defaultLogo} /> : <img className='logo pt2 pointer' alt={logo.alternativeText} src={getStrapiMedia(logo)} />
  }

  const active = useRouter().pathname

  return (
    <div className={`flex flex-column w-100 ttc f6 nav top-0 fixed ${scroll ? 'bg-nav' : ''}`}>
      <div className='flex w-100 ph4 ph5-l pv4'>
        <div className='db dtc w-50 v-mid relative'>
          {showLogo &&
            <Link scroll={false} className='relative' href='/'>
              {/* {image} */}
              <svg className='logo pointer' alt='Esem Projects Logo' viewBox='0 0 397 434'>
                {/* <path d="M0 192.096V0H116V51H56.5V70H116V119.5H56.5V141.5H116V192.096H0Z" fill="white"/>
              <path d="M194.5 143.5V192.096H140V0H215.5C237.964 0 251 8 261 17.5C273.864 27.676 282.5 48.688 282.5 70C282.5 91.312 276.701 110.869 266 122.5C254.5 135 238.964 143.5 216.5 143.5H194.5ZM194.5 92.5H202.5C212.484 92.5 216.276 90.184 220.5 85C224.724 79.816 225.5 77 225.5 71.5C225.5 66 224.224 61.376 220 56C216.5 52 210.5 51 203.5 51H194.5V92.5Z" fill="white"/> */}
                <path d='M396.54 5.65751L380.289 0L231.792 427.732L248.043 433.389L396.54 5.65751Z' fill='white' />
                <path d='M0 118.343V312.948H115.196V261.994H55.3153V240.658H115.196V189.506H55.3153V169.496H115.196V118.343H0Z' fill='white' />
                <path d='M198.302 168.966V214.287H207.102C219.607 214.287 230.26 206.8 230.26 191.626C230.26 176.718 219.607 168.966 207.102 168.966H198.302ZM142.391 118.343H207.896C258.712 118.343 287.23 151.937 287.23 191.361C287.23 230.786 259.572 266.036 207.896 266.036H198.302V312.948H142.391V118.343Z' fill='white' />
              </svg>
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
