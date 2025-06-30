/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

import { Empty, Result } from 'antd';
import axios from 'axios';
import getConfig from 'next/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Banner from '../../components/home/Banner';
import Hero from '../../components/home/Hero';
import MainLayout from '../../components/layout';
import RoomFilter from '../../components/rooms/RoomsFilter';
import RoomList from '../../components/rooms/RoomsList';
import RoomGridSkeleton from '../../components/shared/RoomGridSkeleton';
import { formattedLocalRooms } from '../../data/rooms';

const { publicRuntimeConfig } = getConfig();

function Rooms(props) {
  const initialRooms = (props?.rooms?.data?.rows?.length > 0)
    ? props.rooms.data.rows
    : formattedLocalRooms;

  const [ourRooms, setOurRooms] = useState(initialRooms);
  const [ourFilteredRooms, setOurFilteredRooms] = useState(initialRooms);

  // if props rooms exists to setOurRooms
  useEffect(() => {
    if (props?.rooms?.data?.rows?.length > 0) {
      setOurRooms(props.rooms.data.rows);
      setOurFilteredRooms(props.rooms.data.rows);
    } else {
      setOurRooms(formattedLocalRooms);
      setOurFilteredRooms(formattedLocalRooms);
    }
  }, [props]);

  return (
    <MainLayout title='Beach Resort ― Rooms'>
      <Hero hero='roomsHero'>
        <Banner title='our rooms'>
          <Link className='btn-primary' href='/'>
            return home
          </Link>
        </Banner>
      </Hero>

      {/* rooms listing with modern skeleton loader */}
      {ourFilteredRooms && ourFilteredRooms.length > 0 ? (
        <>
          <RoomFilter
            ourRooms={ourRooms}
            setOurFilteredRooms={setOurFilteredRooms}
          />
          <RoomList
            rooms={ourFilteredRooms}
          />
        </>
      ) : !props?.rooms && !props?.error ? (
        <section className='rooms-list' style={{ marginTop: '2rem' }}>
          <RoomGridSkeleton count={6} className='rooms-list-center' />
        </section>
      ) : (
        <Empty
          className='mt-10'
          description={(<span>Sorry! Any data was not found.</span>)}
        />
      )}
    </MainLayout>
  );
}

export async function getServerSideProps() {
  try {
    const apiBaseUrl = publicRuntimeConfig?.API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:5001';
    const response = await axios.get(`${apiBaseUrl}/api/v1/all-rooms-list`);
    const rooms = response?.data?.result || null;

    return {
      props: {
        rooms,
        error: null
      }
    };
  } catch (err) {
    const errorMessage = err?.response?.data?.message || err?.message || 'Failed to fetch rooms';
    return {
      props: {
        rooms: null,
        error: { message: errorMessage }
      }
    };
  }
}

export default Rooms;
