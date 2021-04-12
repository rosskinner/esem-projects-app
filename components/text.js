import React from 'react'
import ReactMarkdown from 'react-markdown'

const Text = ({ text }) => {
  return (
    <>
      <div className='w-100 mw8 pv4 pl4 pr4 pl0-l pr5-l details f4'>
        <ReactMarkdown source={text} escapeHtml={false} />
      </div>

      {/* <div className='w-100 flex flex-row pv5 pr5 details f4'>
        <ReactMarkdown className='w-50' source={text} escapeHtml={false} />
      </div> */}
    </>
  )
}

export default Text
