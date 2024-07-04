import React, { useState } from 'react'
import './index.css'
import Stopwatch from './components/Stopwatch'
import Header from './components/Header'
import VideoDisplay from './components/VideoDisplay'
import Motivate from './components/Motivate'
import VideoLinks from '/src/VideoLinks.json'

export default function App() {    
    
      const [displayVideo, setDisplayVideo] = useState(false)
      const [videoLink, setVideoLink] = useState("")
    
      function randomVideo() {
        setDisplayVideo(true)
        setVideoLink(VideoLinks[Math.floor(Math.random() * VideoLinks.length)])
    
        console.log(videoLink)
        console.log(displayVideo)
      }


    return (
        <div>
            <Header />
             <Stopwatch />
            <VideoDisplay displayVideo={displayVideo} videoLink={videoLink}/>
            <Motivate randomVideo={randomVideo}/>
        </div>
    )
}

