import React from 'react'
// import Articles from "../components/articles";
import Seo from '../components/seo'
import { fetchAPI } from '../lib/api'

const Home = ({ projects, categories, global }) => {
  console.log(projects, categories)
  return (
    <div categories={categories}>
      <Seo />
      <div className=''>
        <div className=''>
          <h1>{global.siteName}</h1>
          {/* <Articles articles={articles} /> */}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps () {
  // Run API calls in parallel
  const [categories] = await Promise.all([
    fetchAPI('/categories')
  ])

  return {
    props: { categories },
    revalidate: 1
  }
}

export default Home
