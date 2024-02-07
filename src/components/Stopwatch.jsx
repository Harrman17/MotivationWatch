import React , { useState, useEffect } from 'react'


export default function Stopwatch() {

  const [time,setTime] = useState(0)
  const [isRunning,setIsRunning] = useState(false)

  let interval
  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)

      return () => clearInterval(interval)
  }
}, [isRunning])

  const StartStop = () => {
    setIsRunning(!isRunning)
  }


  return (
    <div className='flex flex-col justify-center items-center text-white'>
      <h1 className='font-inter text-3xl'>{time}</h1>
      <button onClick={StartStop}>test</button>
    </div>
  )
}
