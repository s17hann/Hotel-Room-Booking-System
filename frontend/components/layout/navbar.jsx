/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaAlignRight } from 'react-icons/fa';
import { getSessionToken, getSessionUser } from '../../utils/authentication';
import UserPopover from './popover';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = getSessionUser();
  const token = getSessionToken();
  const router = useRouter();

  return (
    <nav className='navbar modern-navbar'>
      <div className='nav-center'>
        <div className='nav-header'>
          {/* app logo */}
          <Link href='/' className='nav-brand'>
            <img src='/images/svg/logo.svg' alt='Beach Resort' className='nav-logo-img' />
          </Link>

          {/* navbar toggle button */}
          <button
            className='nav-btn'
            onClick={() => setIsOpen(!isOpen)}
            type='button'
            aria-label='Toggle navigation menu'
          >
            <FaAlignRight className='nav-icon' />
          </button>
        </div>

        {/* navbar links */}
        <ul className={isOpen ? 'nav-links show-nav' : 'nav-links'}>
          <li>
            <Link
              href='/'
              className={router.pathname === '/' ? 'active-nav-link' : ''}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/rooms'
              className={router.pathname.startsWith('/rooms') ? 'active-nav-link' : ''}
              onClick={() => setIsOpen(false)}
            >
              Rooms & Suites
            </Link>
          </li>
        </ul>

        {/* navbar action & user auth */}
        <div className='nav-actions'>
          {user?.id && token ? (
            <UserPopover />
          ) : (
            <Button
              className='nav-login-btn'
              onClick={() => router.push('/auth/login')}
              type='primary'
              size='middle'
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
