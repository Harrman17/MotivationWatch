import React from 'react'



export default function Header({ displayVideo }) {

  return (
    <div className={`h-20 flex justify-center items-center transition duration-1000 ${displayVideo ? "bg-dark" : "bg-primary"}`}>
      <h1 className='font-inter italic text-2xl text-accent'>Motivation</h1>
      <h1 className='font-inter italic text-2xl text-white'>Watch</h1>
    </div>
  )
}




