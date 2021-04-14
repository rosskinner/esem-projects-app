import { useEffect, useState } from 'react'
import { getStrapiMedia } from '../lib/api'
import Image from 'next/image'
import { m, useAnimation, LazyMotion, domAnimation } from 'framer-motion'




const Img = ({ media }) => {
  const [totalHeight, setTotalHeight] = useState(0)
  let width = 'w-100'
  let cols = 1
  if (media.length > 1) {
    width = 'w-100 w-50-l'
    cols = 2
  }
  const animationVariants = {
    initial: { opacity: 0 },
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
        {media.map((me, key) => {
          const [loaded, setLoaded] = useState(false)
          const animationControls = useAnimation()
          // console.log(m)
          const url = (me.formats === null || Object.keys(me.formats).length === 0) ? me : me.formats.large
          const mediaUrl = getStrapiMedia(url)
          let ratio = '8x5'
          
          if (me.width < me.height) ratio = '8x10'
          
          useEffect(() => {
            if(loaded){
              animationControls.start("visible")
            }
          },[loaded])
          
          const checkLoaded = (e) => {
            setLoaded(e.target.complete && e.target.naturalHeight !== 0)
          }
          return (


            <LazyMotion key={key} features={domAnimation}>


              <m.div key={key} className={`relative image-padding ${width}`}
              initial='initial'
              animate={animationControls}
              variants={animationVariants}
              transition={{ ease: "easeIn", duration: 1 }}>
                <div  className={`aspect-ratio aspect-ratio--${ratio}`}>
                  <Image className='background-image cover center aspect-ratio--object' src={mediaUrl} layout='fill' objectFit='cover'
                    alt={me.alternativeText}
                    title={me.caption}
                    onLoad={checkLoaded}
            />
                </div>
                
                  <div className='f8 caption pt2 pl2 pl0-l'><span>{me.caption}</span></div>
                
                
              </m.div>
            </LazyMotion>

          )
        })}
      </div>

    </div>
  )
}

export default Img
