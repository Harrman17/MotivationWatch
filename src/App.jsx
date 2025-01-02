import React, { useState, useEffect } from 'react'
import './index.css'
import Stopwatch from './components/Stopwatch'
import Header from './components/Header'
import VideoDisplay from './components/VideoDisplay'
import Motivate from './components/Motivate'
import Info from './components/Info'
import VideoLinksFile from '../videosScraper/VideoLinks.json'
import { Routes, Route } from 'react-router-dom'


export default function App() {    
    
      const [displayVideo, setDisplayVideo] = useState(false)
      const [videoLink, setVideoLink] = useState("")
      const [map, setMap] = useState(new Map())
      const [motivateToggle, setMotivateToggle] = useState(false)

      function getRandomIndex() {
        return Math.floor(Math.random() * VideoLinksFile.length)
      }

      function hashRandomVideo() {
        console.log("called")
        let randomIndex = getRandomIndex()

        while (map.has(randomIndex)) { // if the map already has the index, call a new one
          randomIndex = getRandomIndex()
        }
    
         
        setMap(prevMap => { // creates a new map and sets it with the new index
          const newMap = new Map(prevMap) // with the old map inside so we don't lose the previous indexes
          newMap.set(randomIndex) // sets the newly generated index
          return newMap
        })

        setVideoLink(VideoLinksFile[randomIndex])
        setDisplayVideo(true)
    }

    function videoPlayer() {
      setMotivateToggle(!motivateToggle)
    }

    useEffect(() => {
      if (motivateToggle) {
        hashRandomVideo()
      } else {
        setDisplayVideo(false)
      }
    },[motivateToggle])


    return (
        <div>
          <Routes>
            <Route path='/' element={
            <>
              <Header displayVideo={displayVideo}/>
              <Stopwatch displayVideo={displayVideo} motivateToggle={motivateToggle} setMotivateToggle={setMotivateToggle}/> 
              <VideoDisplay displayVideo={displayVideo} videoLink={videoLink} onEnded={hashRandomVideo}/> 
              <Motivate hashRandomVideo={hashRandomVideo} displayVideo={displayVideo} videoPlayer={videoPlayer}/>
            </>
            }/>
            <Route path='Info' element={
              <>
                <Header />
                <Info /> 
              </> 
            }/>
          </Routes>  
        </div>
    )
}

