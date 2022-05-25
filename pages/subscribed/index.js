import { useRouter } from 'next/router'
import { useEffect } from 'react'
const Subscribed = () => {
  const router = useRouter()
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
        <p className='pointer underline' onClick={() => router.back()}>
          Click here to go back.
        </p>

      </div>

    </div>

  )
}

export default Subscribed
