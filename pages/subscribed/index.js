import Link from 'next/link'
import { useEffect } from 'react'

const Subscribed = () => {
  useEffect(() => {
    document.cookie = 'subscribed=true;max-age=max-age-in-seconds=7776000'
  })
  return (
    <div className='container pt6 flex flex-column items-center justify-center tc f3'>
      <h1 className='f2 pt5-l ph4 ph5-l mv4'>Thank you!</h1>
      <div className='ph4'>
        <p>
          Your subscription has been confirmed. You've been added to our list and will hear from us soon.
        </p>
        <Link scroll={false} href='/'>
          <p className='pointer underline'>
            Click here to go back.
          </p>
        </Link>

      </div>

    </div>

  )
}

export default Subscribed
