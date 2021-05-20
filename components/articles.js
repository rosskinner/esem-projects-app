import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import smallButton from '../assets/small-button.png'
import largeButton from '../assets/large-button.png'
const Card = dynamic(() => import('./card'))

const Articles = ({ articles, tag, limit }) => {
  const [width, setWidth] = useState('w-25')
  const [loaded, setLoaded] = useState(false)
  const [pagination, setPagination] = useState(limit)
  const [height, setHeight] = useState(0)
  const toggleView = (e) => {
    setWidth(e.target.dataset.value)
    document.cookie = `esem-view=${e.target.dataset.value};`
  }

  useEffect(() => {
    const val = document.cookie.split('; ')
      .find(row => row.startsWith('esem-view='))
    const cachedWidth = val === undefined ? 'w-25' : val.split('=')[1]
    if (cachedWidth !== width) setWidth(cachedWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
  const handleScroll = () => {
    const scrollHeight = window.pageYOffset + window.innerHeight
    if (!loaded && pagination < articles.length) {
      if (scrollHeight >= document.body.offsetHeight - 60) {
        setLoaded(true)
        setPagination(pagination + limit)
        setHeight(document.body.offsetHeight - 60)
      }
    }
    if (scrollHeight > height && loaded) {
      setLoaded(false)
    }
  }
  return (

    <>
      <div className='w-100  w-20-ns w-25-l tr'>
        <img className={`dn dib-ns pointer button ma2 small-${width}`} src={smallButton} alt='small-view' data-value='w-25' onClick={toggleView} />
        <img className={`dn dib-ns pointer button ma2 large-${width}`} src={largeButton} alt='large-view' data-value='w-third' onClick={toggleView} />
      </div>
      <div className='articles w-100 flex flex-row flex-wrap pt6'>
        {articles.map((article, i) => {
          if (i <= (pagination - 1)) {
            return (
              <Card width={width} key={i} index={i} project={article} category={tag} path='/article' />
            )
          } else {
            return (
              <div key={i} />
            )
          }
        })}
        {articles.length < 1 &&
          <div>Sorry, no news today.</div>}
      </div>
    </>
  )
}

export default Articles
