import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faForwardStep } from '@fortawesome/free-solid-svg-icons';


export default function Motivate({ videoPlayer, displayVideo, hashRandomVideo }) {


  return (
    <div className='flex fixed bottom-3 right-2 p-8 mt-20'>
      { displayVideo && <FontAwesomeIcon className={`h-9 cursor-pointer ${displayVideo ? "text-primary" : "text-accent"}`} icon={faForwardStep} onClick={hashRandomVideo}/> }
      <FontAwesomeIcon className={`h-9 ml-10 cursor-pointer ${displayVideo ? "text-primary" : "text-accent"}`} icon={faFire} onClick={videoPlayer} />
    </div>
  );
}
