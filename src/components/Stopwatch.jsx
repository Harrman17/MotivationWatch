import React , { useState, useEffect } from 'react'


export default function Stopwatch({ displayVideo, StartStop, isRunning, setIsRunning }) {

  const [seconds,setSeconds] = useState(0)
  const [minutes,setMinutes] = useState(0)
  const [hours,setHours] = useState(0)

  
  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1)
      }, 1000)

      return () => clearInterval(interval)
  }
}, [isRunning])

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0)
      setMinutes(prevMinute => prevMinute + 1)
    }
  }, [seconds])

  useEffect(() => {
    if (minutes === 60) {
      setMinutes(0)
      setHours(prevMinute => prevMinute + 1)
    }
  }, [minutes])


  const reset = () => {
    setIsRunning(false)
    setMinutes(0)
    setSeconds(0)
    setHours(0)
  }



  return (
    <div className='flex justify-center items-center mt-[30%] sm:mt-[10%]'>
      <div className='font-inter text-white'>
        <h1 className="text-9xl sm:text-[150px] text-center">{hours < 10 && hours !== 0 ? '0' : ''}{hours > 0 ? hours : ''}{hours !== 0 ? ':' : ''}{minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}</h1>
        <div className='flex justify-center gap-12 mt-12 lg:gap-32'>
          <button className={`bg-primary border-accent border-2 h-20 w-36 rounded-2xl text-2xl transition duration-1000 lg:h-18 lg:w-48 ${displayVideo ? "opacity-25" : ""}`} style={{boxShadow: '9px 7px 3px #1C1D1D'}} onClick={reset}>RESET</button>
          <button onClick={StartStop} className={`bg-accent h-20 w-36 rounded-2xl text-2xl transition duration-1000 lg:h-18 lg:w-48 ${displayVideo ? "opacity-25" : ""}`} style={{boxShadow: '9px 7px 3px #1C1D1D'}}>{isRunning ? 'STOP' : 'START'}</button>
        </div>
      </div>
    </div>
  )
}
