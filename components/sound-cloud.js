
import ReactMarkdown from 'react-markdown'

const SoundCloud = ({ embed }) => {
  return (
    <div className='ph5 w-50'>
      <ReactMarkdown source={embed} escapeHtml={false} />
    </div>
  )
}

export default SoundCloud
