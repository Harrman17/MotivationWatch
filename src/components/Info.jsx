import React from 'react'
import { Link } from 'react-router-dom'



export default function Info() {

  return (
    <div className='flex-col justify-center items-center px-1 sm:px-[400px] h-screen text-white bg-primary'>
        <h2 className='info-titles'>Where do the motivational videos come from?</h2>
        <p className='info-paragraphs'>Every video you see is taken from a private Instagram collection that I've made and update regularly, these are videos that resonate with me and that I think could either motivate or be beneficial in any way to my users.</p>
        <br/>
        <h2 className='info-titles'>You've uploaded one of my videos and I want it taken down.</h2>
        <p className='info-paragraphs'>All videos uploaded to the website are public on Instagram, however if you'd like your post taken down please fill the <a className='text-accent underline' href="https://docs.google.com/forms/d/e/1FAIpQLSdUGXE4QAysXtlmLzHCdWyrZzgZvmmQKV3V9FwsfQjSZPhsNg/viewform" target='_blank'>request to remove form</a>.</p>
        <br/>
        <h2 className='info-titles'>I want a motivational video uploaded!</h2>
        <p className='info-paragraphs'>Thank you for considering a contribution, all videos submitted are reviewed and then added accordingly through the <a className='text-accent underline' href="https://docs.google.com/forms/d/e/1FAIpQLSfMNzltsTKoWaN3rjFiRgbMSjusz_Q0fc0Y-3-Ul-0si39rLg/viewform?usp=dialog" target='_blank'>request to add form</a>.</p>
    </div>
  )
}