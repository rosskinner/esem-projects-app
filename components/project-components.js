import dynamic from 'next/dynamic'
const Img = dynamic(() => import('./image'))
const Text = dynamic(() => import('./text'))
const Video = dynamic(() => import('./video'))
const Audio = dynamic(() => import('./audio'))

const ProjectComponents = ({ media }) => {
  return (
    <>
      {media.map((m, key) => {
        if (m.__component.includes('video-images')) {
          return (
            <Img key={key} media={m.media} index={key} />
          )
        } else if (m.__component.includes('text')) {
          return (
            <Text key={key} text={m.text} />
          )
        } else if (m.__component.includes('vimeo')) {
          return (
            <Video key={key} video={m} />
          )
        } else if (m.__component.includes('sound-cloud')) {
          return (
            <Audio key={key} audio={m} caption={m.caption} />
          )
        } else {
          return <div key={key} />
        }
      })}
    </>
  )
}

export default ProjectComponents
