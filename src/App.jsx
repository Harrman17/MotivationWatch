import React, { useState } from 'react'
import './index.css'
import Stopwatch from './components/Stopwatch'
import Header from './components/Header'
import VideoDisplay from './components/VideoDisplay'
import Motivate from './components/Motivate'
import VideoLinksFile from '/src/VideoLinks.json'

export default function App() {    
    
      const [displayVideo, setDisplayVideo] = useState(false)
      const [videoLink, setVideoLink] = useState("")
      const [map, setMap] = useState(new Map())

      function getRandomIndex() {
        return Math.floor(Math.random() * VideoLinksFile.length)
      }

      function hashRandomVideo() {
        let randomIndex = getRandomIndex()

        while (map.has(randomIndex)) { // if the map already has the index, call a new one
          randomIndex = getRandomIndex()
        } 
    

        setMap(prevMap => { // creates a new map and sets it with the new index
          const newMap = new Map(prevMap)
          newMap.set(randomIndex)
          return newMap
        })

        setVideoLink(VideoLinksFile[randomIndex])
        setDisplayVideo(true)

        }



    return (
        <div>
            <Header />
            <Stopwatch />
            <VideoDisplay displayVideo={displayVideo} videoLink={videoLink} onEnded={hashRandomVideo}/>
            <Motivate hashRandomVideo={hashRandomVideo}/>
        </div>
    )
}

