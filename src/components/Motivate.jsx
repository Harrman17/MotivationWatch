import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faForwardStep } from '@fortawesome/free-solid-svg-icons';


export default function Motivate({ motivatetest, displayVideo }) {
  return (
    <div className='flex fixed bottom-2 right-8 p-8 '>
      { displayVideo && <FontAwesomeIcon className='text-accent h-9' icon={faForwardStep} /> }
      <FontAwesomeIcon className='text-accent h-9 ml-10' icon={faFire} onClick={motivatetest} />
    </div>
  );
}
