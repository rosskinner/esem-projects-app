import ReactMarkdown from 'react-markdown'

const Audio = ({ audio, caption }) => {
  return (
    <>
      <div className='w-100 audio pv4 pl4 pr4 pl0-l pr5-l details f4'>
        <ReactMarkdown source={audio.embed} escapeHtml={false} />
      </div>
    </>
  )
}

export default Audio
