import React from 'react'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'



export default function Header({ displayVideo, displayInfoIcon }) {

  return (
    <div className={`h-20 flex justify-center items-center transition duration-1000 ${displayVideo ? "" : "bg-primary"}`}>
      <div className='flex'>
        <h1 className={`font-inter italic text-2xl text-accent transition duration-1000 ${displayVideo ? "text-opacity-25" : ""}`}>Motivation</h1>
        <h1 className={`font-inter italic text-2xl text-white transition duration-1000 ${displayVideo ? "text-opacity-25" : ""}`}>Watch</h1>
      </div>
      {displayInfoIcon && 
      <Link to="/info" className='absolute right-6'>
        <FontAwesomeIcon to="/info" icon={faInfo} className={`text-accent text-xl transition duration-1000 ${displayVideo ? "text-opacity-25" : ""}`}/>
      </Link> }
    </div>
  )
}




