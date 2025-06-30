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
import React from 'react';
import Banner from '../components/home/Banner';
import FeaturedRooms from '../components/home/FeaturedRooms';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import MainLayout from '../components/layout';
import RoomGridSkeleton from '../components/shared/RoomGridSkeleton';
import Title from '../components/home/Title';

const { publicRuntimeConfig } = getConfig();

function Home(props) {
  return (
    <MainLayout title='Beach Resort ― Home'>
      <Hero>
        <Banner
          title='luxurious rooms'
          subtitle='deluxe rooms starting at $299'
        >
          <Link href='/rooms' className='btn-primary'>
            our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />

      {/* featured rooms */}
      {!props?.featuredRooms && !props?.error ? (
        <section className='featured-rooms'>
          <Title title='featured rooms' />
          <RoomGridSkeleton count={3} />
        </section>
      ) : props?.featuredRooms?.data?.rows?.length === 0 ? (
        <Empty
          className='mt-10'
          description={(<span>Sorry! Any data was not found.</span>)}
        />
      ) : props?.error ? (
        <Result
          title='Failed to fetch'
          subTitle={props?.error?.message || 'Sorry! Something went wrong. App server error'}
          status='error'
        />
      ) : (
        <FeaturedRooms
          featuredRoom={props?.featuredRooms?.data?.rows}
        />
      )}
    </MainLayout>
  );
}

export async function getServerSideProps() {
  try {
    const apiBaseUrl = publicRuntimeConfig?.API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:5000';
    const response = await axios.get(`${apiBaseUrl}/api/v1/featured-rooms-list`);
    const featuredRooms = response?.data?.result || null;

    return {
      props: {
        featuredRooms,
        error: null
      }
    };
  } catch (err) {
    const errorMessage = err?.response?.data?.message || err?.message || 'Failed to fetch featured rooms';
    return {
      props: {
        featuredRooms: null,
        error: { message: errorMessage }
      }
    };
  }
}

export default Home;
