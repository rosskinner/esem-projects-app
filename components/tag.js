
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Tag = ({ children, categories, seo }) => {
  // console.log('Tag categories', categories)
  const active = useRouter().query.slug
  console.log(active)
  return (
    <div className='mh5 flex flex-row flex-wrap'>
      <div className='w-100 w-50-ns'>
        <li className='dib mv3'>
          <Link href='/projects'>
            <a className={`ba bw1 b--white br-pill pv2 ph3 f6 mr3 mb3 ${active === undefined ? 'tag-active' : ''}`}>All</a>
          </Link>
        </li>
        {categories.map((category) => {
          const activeButton = active === category.slug ? 'tag-active' : ''
          return (
            <li className='dib mv3' key={category.id}>
              <Link as={`/projects/${category.slug}`} href='/projects/[id]'>
                <a className={`ttc ba bw1 b--white br-pill pv2 ph3 f6 mr3 mb3 ${activeButton}`}>{category.name}</a>
              </Link>
            </li>
          )
        })}
      </div>
      {children}
    </div>
  )
}

export default Tag
