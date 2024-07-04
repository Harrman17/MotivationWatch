import React from 'react'


export default function VideoDisplay({ videoLink, displayVideo}) {


  return (
    <div className='video-container flex justify-center items-center'>
      {displayVideo && <video autoPlay playsInline src={videoLink} className='h-5/6'/>}
    </div>
  )
}
