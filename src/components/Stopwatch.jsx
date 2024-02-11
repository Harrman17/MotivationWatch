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
    <div className='flex flex-col justify-center items-center text-white'>
      <div className='bg-test flex flex-col'>
        <h1 className='font-inter text-3xl'>{minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}</h1>
        <div>
          <button className='font-inter' onClick={reset}>RESET</button>
          <button onClick={StartStop} className='font-inter'>{isRunning ? 'STOP' : 'START'}</button>
        </div>
      </div>
    </div>
  )
}
