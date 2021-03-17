
import React from 'react'
import Link from 'next/link'

const Tag = ({ children, categories, seo }) => {
  // console.log('Tag categories', categories)
  return (
    <div className='mh5 flex flex-row flex-wrap'>
      <div className='pt6 w-100 w-50-ns'>
        <li className='dib mv3'>
          <Link href='/projects'>
            <a className='ba bw1 b--white br-pill pv2 ph3 f6 mr3 mb3'>All</a>
          </Link>
        </li>
        {categories.map((category) => {
          return (
            <li className='dib mv3' key={category.id}>
              <Link as={`/category/${category.slug}`} href='/category/[id]'>
                <a className='ttc ba bw1 b--white br-pill pv2 ph3 f6 mr3 mb3'>{category.name}</a>
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
