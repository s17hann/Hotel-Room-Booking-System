/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

import React from 'react';

function Loading({ text = 'Loading details...' }) {
  return (
    <div className='loading modern-loading-container' role='status' aria-live='polite'>
      <div className='luxury-spinner-ring'>
        <div className='luxury-spinner-inner' />
      </div>
      <h4 className='loading-title'>{text}</h4>
      <div className='skeleton-shimmer loading-shimmer-bar' />
    </div>
  );
}

export default Loading;
