import React from 'react'

const Audio = ({ audio, caption }) => {
  console.log('audio', audio)
  return (
    <>
      <div id='' className='w-100'>
        {audio}
      </div>
    </>
  )
}

export default Audio
