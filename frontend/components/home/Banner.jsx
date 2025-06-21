/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

import React from 'react';

function Banner({ children, title, subtitle }) {
  return (
    <div className='banner luxury-banner'>
      <div className='banner-kicker'>LUXURY RESORT & RETREAT</div>
      <h1 className='banner-title'>{title}</h1>
      <div className='banner-accent-line' />
      <p className='banner-subtitle'>{subtitle}</p>
      <div className='banner-actions'>{children}</div>
    </div>
  );
}

export default Banner;
