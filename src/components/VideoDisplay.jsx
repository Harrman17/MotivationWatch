import React from 'react'


export default function VideoDisplay({ videoLink, displayVideo, onEnded}) {


  return (
    <div className={`video-container lg:flex justify-center items-center transition duration-1000 ${displayVideo ? "bg-dark" : "bg-primary"}`}>
      {displayVideo && <video autoPlay playsInline src={videoLink} className={`h-5/6 ${displayVideo ? "opacity-100" : ""}`} onEnded={onEnded}/>}
    </div>
  )
}
