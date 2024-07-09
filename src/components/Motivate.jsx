import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

export default function Motivate({ hashRandomVideo }) {
  return (
    <div className='fixed bottom-2 right-8 p-8'>
      <FontAwesomeIcon className='text-accent h-9' icon={faFire} onClick={hashRandomVideo} />
    </div>
  );
}
