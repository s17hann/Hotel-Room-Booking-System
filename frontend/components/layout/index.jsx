/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

import Head from 'next/head';
import React from 'react';
import Footers from './footers';
import Navbar from './navbar';

function MainLayout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title || 'Beach Resort'}</title>
        <meta name='description' content='Beach Resort ― Luxury Hotel & Room Booking System' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
        <link href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap' rel='stylesheet' />
      </Head>

      <Navbar />
      <main style={{ overflow: 'auto' }}>
        {children}
      </main>
      <Footers />
    </>
  );
}

export default MainLayout;
