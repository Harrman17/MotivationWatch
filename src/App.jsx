import React, { useState, useEffect } from 'react'
import './index.css'
import Stopwatch from './components/Stopwatch'
import Header from './components/Header'
import VideoDisplay from './components/VideoDisplay'
import Motivate from './components/Motivate'
import Info from './components/Info'
import { Routes, Route } from 'react-router-dom'


export default function App() {    
    
      const [displayVideo, setDisplayVideo] = useState(false)
      const [videoLink, setVideoLink] = useState("")
      const [map, setMap] = useState(new Map())
      const [motivateToggle, setMotivateToggle] = useState(false)
      const [videoLinksFile, setVideoLinksFile] = useState([])
      const [videoLinksLoaded, setVideoLinksLoaded] = useState(false)

      const [isRunning, setIsRunning] = useState(false) // for stopwatch

      // Fetch VideoLinks.json from public folder
      useEffect(() => {
        fetch('/VideoLinks.json')
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to load video links')
            }
            return response.json()
          })
          .then(data => {
            setVideoLinksFile(data)
            setVideoLinksLoaded(true)
            console.log(`Loaded ${data.length} video links`)
          })
          .catch(error => {
            console.error('Error loading video links:', error)
            setVideoLinksLoaded(true) // Set to true even on error to prevent infinite loading
          })
      }, [])

      function getRandomIndex() {
        if (videoLinksFile.length === 0) return 0
        return Math.floor(Math.random() * videoLinksFile.length)
      }

      function hashRandomVideo() {
        if (!videoLinksLoaded || videoLinksFile.length === 0) {
          console.log("Video links not loaded yet")
          return
        }

        console.log("Videos Count:", videoLinksFile.length)
        let randomIndex = getRandomIndex()

        while (map.has(randomIndex)) { // if the map already has the index, call a new one so that we don't repeat videos
          randomIndex = getRandomIndex()
        }
    
         
        setMap(prevMap => { // creates a new map and sets it with the new index
          const newMap = new Map(prevMap) // with the old map inside so we don't lose the previous indexes
          newMap.set(randomIndex, true) // sets the newly generated index
          console.log(map)
          return newMap
        })

        setVideoLink(videoLinksFile[randomIndex])
        setDisplayVideo(true)

        if (map.size == videoLinksFile.length - 1) {
          setMap(new Map())
        }
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

    const StartStop = () => {
      setIsRunning(!isRunning)
    }

    const handleKeyDown = (e) => {
      if (e.code == 'Space') {
        e.preventDefault()
        StartStop()
        videoPlayer()
      }

      window.removeEventListener('keydown', handleKeyDown)
    }

    window.addEventListener('keydown', handleKeyDown)


    return (
        <div>
          <Routes>
            <Route path='/' element={
            <>
              <Header displayVideo={displayVideo} displayInfoIcon={true}/>
              <Stopwatch displayVideo={displayVideo} motivateToggle={motivateToggle} setMotivateToggle={setMotivateToggle} StartStop={StartStop} isRunning={isRunning} setIsRunning={setIsRunning}/> 
              <VideoDisplay displayVideo={displayVideo} videoLink={videoLink} onEnded={hashRandomVideo}/> 
              <Motivate hashRandomVideo={hashRandomVideo} displayVideo={displayVideo} videoPlayer={videoPlayer}/>
            </>
            }/>
            <Route path='Info' element={
              <>
                <Header displayInfoIcon={false}/>
                <Info /> 
              </> 
            }/>
          </Routes>  
        </div>
    )
}

