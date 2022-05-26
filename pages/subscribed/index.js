import Link from 'next/link'
import { useEffect, useState } from 'react'

const Subscribed = (props) => {
  const [path, setPath] = useState('/')

  useEffect(() => {
    props.subscription()

    const cookie = document.cookie.split('; ')
      .find(row => row.startsWith('pathname'))
    if (cookie) {
      const sub = cookie.split('=')[1]
      console.log(sub)
      setPath(sub)
    }
  })
  return (
    <div className='container pt6 flex flex-column items-center justify-center tc f3'>
      <h1 className='f2 pt5-l ph4 ph5-l mv4'>Thank you!</h1>
      <div className='ph4'>
        <p>
          Your subscription has been confirmed. You've been added to our list and will hear from us soon.
        </p>
        <Link scroll={false} href={path}>
          <p className='pointer underline'>
            Click here to go back.
          </p>
        </Link>

      </div>

    </div>

  )
}

export default Subscribed
