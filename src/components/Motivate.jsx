import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import VideoLinks from '/src/VideoLinks.json'

export default function Motivate() {

  const [displayVideo, setdisplayVideo] = useState(false)
  const [displayLink, setDisplayLink] = useState()

  function randomVideo() {
    setdisplayVideo(true)
    setDisplayLink(VideoLinks[Math.floor(Math.random() * VideoLinks.length)])
    console.log(displayLink)
  }
 

  return (
    <div className='fixed bottom-2 right-8 p-8'>
      <FontAwesomeIcon className='text-accent h-9' icon={faFire} onClick={randomVideo}/>
    </div>
  )
}
