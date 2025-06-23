/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBed, FaUserFriends, FaVectorSquare } from 'react-icons/fa';

const DEFAULT_ROOM_IMAGE = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80';

function Room({ room }) {
  const [imgSrc, setImgSrc] = useState(
    room?.room_images?.[0]?.url || '/images/jpeg/room-1.jpeg'
  );

  return (
    <article className='room room-card'>
      <div className='img-container'>
        <Image
          src={imgSrc}
          alt={room?.room_name || 'Hotel luxury room'}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          className='room-image'
          onError={() => setImgSrc(DEFAULT_ROOM_IMAGE)}
        />

        <div className='price-top'>
          <h6>{`$${room?.room_price || 0}`}</h6>
          <p>per night</p>
        </div>

        {room?.room_type && (
          <div className='room-type-badge'>
            <span>{room.room_type}</span>
          </div>
        )}

        <Link
          className='btn-primary room-link'
          href={`/rooms/${room?.room_slug || ''}`}
        >
          View Details
        </Link>
      </div>

      <div className='room-card-content'>
        <p className='room-info'>
          {room?.room_name}
        </p>

        <div className='room-meta-chips'>
          <span className='room-chip'>
            <FaUserFriends className='room-chip-icon' />
            {room?.room_capacity > 1 ? `${room?.room_capacity} Guests` : '1 Guest'}
          </span>
          <span className='room-chip'>
            <FaVectorSquare className='room-chip-icon' />
            {`${room?.room_size || 250} SQFT`}
          </span>
          {room?.allow_pets && (
            <span className='room-chip pet-friendly'>
              Pet Friendly
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default Room;
