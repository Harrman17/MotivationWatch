import React , { useState, useEffect } from 'react'


export default function Stopwatch() {

  const [seconds,setSeconds] = useState(0)
  const [isRunning,setIsRunning] = useState(false)
  const [minutes,setMinutes] = useState(0)

  let interval
  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1)
      }, 1000)

      return () => clearInterval(interval)
  }
}, [isRunning])

  useEffect(() => {
    if (seconds === 20) {
      setSeconds(0)
      setMinutes(prevMinute => prevMinute + 1)
    }
  }, [seconds])

  const StartStop = () => {
    setIsRunning(!isRunning)
  }

  const reset = () => {
    setIsRunning(false)
    setMinutes(0)
    setSeconds(0)
  }

  return (
    <div className='flex justify-center mt-32'>
      <div className='font-inter text-white'>
        <h1 className='text-9xl text-center'>{minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}</h1>
        <div className='flex justify-center gap-28 mt-12'>
          <button className='bg-primary border-accent border-2 h-16 w-48 rounded-2xl text-2xl' onClick={reset}>RESET</button>
          <button onClick={StartStop} className='bg-accent h-16 w-48 rounded-2xl text-2xl'>{isRunning ? 'STOP' : 'START'}</button>
        </div>
      </div>
    </div>
  )
}
