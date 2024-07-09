import React from 'react'


export default function VideoDisplay({ videoLink, displayVideo, onEnded}) {


  return (
    <div className='video-container flex justify-center items-center'>
      {displayVideo && <video autoPlay playsInline src={videoLink} className='h-5/6' onEnded={onEnded}/>}
    </div>
  )
}
