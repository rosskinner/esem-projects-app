import { useRouter } from 'next/router'
import close from '../assets/close.png'
const Subscribe = (props) => {
  const router = useRouter()
  const closeSubscribe = () => {
    props.onClose()
  }
  const getPath = () => {
    props.setSubscribePath(router.asPath)
  }
  return (
    <>
      <div className='sub fixed w-100 bottom-0 bg-esem flex flex-column flex-row-l justify-between items-center-l pv4 ph5 bt b--white'>
        <div>
          <h1 className='f5 f4-l pb4 pb0-l'>Keep up to date by signing up to our newsletter</h1>
        </div>
        <form className='js-cm-form flex flex-row flex-wrap' id='subForm' action='https://www.createsend.com/t/subscribeerror?description=' method='post' data-id='2BE4EF332AA2E32596E38B640E90561955A8B315044F5A9B9D62EDFCF9D23F2A1127BA936068698A1647B741C50B25CCA6CA4ECDE629B123E186098E8D42766D'>
          <div className='flex flex-row   mv3 ba b--white br-pill pl2 mr3'>
            <div className='w-50'>
              <input aria-label='Name' className='pv2 w-100' placeholder='Name' id='fieldName' maxLength='200' name='cm-name' />
            </div>
            <div className='w-50'>
              <input autoComplete='Email' placeholder='Email' aria-label='Email' className='js-cm-email-input qa-input-email pv2 ph3 bl b--white w-100' id='fieldEmail' maxLength='200' name='cm-jjudktr-jjudktr' required='' type='email' onChange={getPath} />
            </div>
          </div>
          <button className='b--white bg-white b--solid br-pill mv3 pv2 sign-up pointer dim' type='submit'>Sign Up</button>
        </form>
        <div className='absolute right-0 top-0 pa3 pointer' onClick={closeSubscribe}>
          <img src={close} />
        </div>
      </div>
      <script type='text/javascript' src='https://js.createsend1.com/javascript/copypastesubscribeformlogic.js' />
    </>
  )
}

export default Subscribe
