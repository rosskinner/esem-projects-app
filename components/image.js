import { useEffect, useState } from 'react'
import { getStrapiMedia } from '../lib/api'
import Image from 'next/image'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'



const Img = ({ media }) => {
  const [totalHeight, setTotalHeight] = useState(0)
  let width = 'w-100'
  let cols = 1
  if (media.length > 1) {
    width = 'w-100 w-50-l'
    cols = 2
  }
  const animationVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}
  
  const handleResize = () => {
    let tHeight = 0
    const widthEm = window.innerWidth / parseFloat(
      getComputedStyle(
        document.querySelector('body')
      )['font-size']
    )
        
    if (widthEm < 60) {
      setTotalHeight(0)

    } else {
      media.map((m, key) => {
        m.index = key
        m.orientation = 'landscape'
  
        let ratio = 0.625
        if (m.width < m.height) {
          m.orientation = 'portrait'
          ratio = 1.25
  
          
        }
        
        const width = ((window.innerWidth * 0.75) / cols) - ((2*16)*3)
        m.newHeight = width*ratio + (2*16)*2
        tHeight += m.newHeight 
      })
  
      let checkHeight = 0
      let halfHeight = tHeight/2
      let remainder = 0
      let setHeight = 0
      let found = false
  
      media.map((m, key) => {
        checkHeight += m.newHeight
        if(!found) {
          if (checkHeight > halfHeight) {
            found = true
            remainder = checkHeight - halfHeight
          }
          if(remainder > m.newHeight/2) {
            setHeight = halfHeight + m.newHeight/2
          } else {
            setHeight = checkHeight
          }
        }
      })
      if (media.length === 1) {
        setHeight = media[0].newHeight
      }
  
  
        setTotalHeight(setHeight)
    }
    
    

    
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
    
  })

  const style = totalHeight === 0 ? {height:'auto'} : {maxHeight :`${totalHeight}px`}

  return (
    <div className={`flex flex-column`} >
      
      <div style={style} className={`w-100 flex flex-column flex-wrap `}>
        {media.map((m, key) => {
          const [loaded, setLoaded] = useState(false)
          const animationControls = useAnimation()

          const mediaUrl = getStrapiMedia(m)
          let ratio = '8x5'
          
          if (m.width < m.height) ratio = '8x10'
          
          useEffect(() => {
            if(loaded){
              animationControls.start("visible")
            }
          },[loaded])
          
          return (

            <AnimatePresence key={key} >


            <motion.div className={`relative image-padding ${width}`}
            initial={'hidden'}
            animate={animationControls}
            variants={animationVariants}
            transition={{ ease: "easeIn", duration: 1 }}>
              <div className={`aspect-ratio aspect-ratio--${ratio}`}>
                {/* <div style={{ backgroundImage: `url(${mediaUrl})` }} className='background-image cover center aspect-ratio--object' /> */}
                <Image className='background-image cover center aspect-ratio--object' src={mediaUrl} layout='fill' objectFit='cover'
                  alt={mediaUrl.alternativeText}
                  onLoad={() => setLoaded(true)}
          />
              </div>
              <div className='f8 caption pt2 pl2 pl0-l'>{m.caption}</div>
            </motion.div>
            </AnimatePresence>
          )
        })}
      </div>

    </div>
  )
}

export default Img
