/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

import { Button } from 'antd';
import axios from 'axios';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import Banner from '../../components/home/Banner';
import MainLayout from '../../components/layout';
import StyledHero from '../../components/rooms/StyledHero';
import Loading from '../../components/shared/Loading';
import RoomDetailsSkeleton from '../../components/shared/RoomDetailsSkeleton';
import OrderPlaceModal from '../../components/utilities/OrderPlaceModal';
import RoomReviewList from '../../components/utilities/RoomReviewList';
import { getSessionToken, getSessionUser } from '../../utils/authentication';
import notificationWithIcon from '../../utils/notification';
import { formattedLocalRooms } from '../../data/rooms';

const { publicRuntimeConfig } = getConfig();

function RoomPreview(props) {
  const currentRoom = props?.room?.data || props?.room;
  const [bookingModal, setBookingModal] = useState({ open: false, roomId: null });
  const token = getSessionToken();
  const user = getSessionUser();
  const router = useRouter();

  // function to handle place booking order
  const handleOrder = () => {
    if (!token && !user) {
      notificationWithIcon('error', 'ERROR', 'Please Registration/Login first to place an order.');
      router.push('/auth/login');
    } else {
      setBookingModal((prevState) => (
        { ...prevState, open: true, roomId: currentRoom?.id || currentRoom?._id }
      ));
    }
  };

  return (
    <>
      <MainLayout title={`Beach Resort ― ${currentRoom?.room_name || 'Room'} Preview`}>
        {!currentRoom && !props?.error ? (
          <RoomDetailsSkeleton />
        ) : !currentRoom && props?.error ? (
          <div className='error'>
            <h3>{props?.error?.message || 'No such room could be found!'}</h3>
            <Link className='btn-primary' href='/rooms'>
              Back to rooms
            </Link>
          </div>
        ) : (
          <>
            <StyledHero>
              <Banner title={`${currentRoom?.room_name || 'Luxurious'} room`}>
                <Link className='btn-primary' href='/rooms'>
                  Back to rooms
                </Link>
              </Banner>
            </StyledHero>

            <section className='single-room'>
              <div className='single-room-images'>
                {currentRoom?.room_images?.map((item) => (
                  <div key={uniqueId()} className='single-room-image-wrapper'>
                    <Image
                      src={item?.url || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'}
                      alt={currentRoom?.room_name || 'Room photo'}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className='single-room-image'
                    />
                  </div>
                ))}
              </div>

              <div className='single-room-info'>
                <article className='desc'>
                  <h3>Details:</h3>
                  <p>{currentRoom?.room_description || 'Experience world-class luxury and comfort with panoramic views and bespoke amenities.'}</p>
                </article>

                <article className='info'>
                  <h3>Information:</h3>
                  <h6>
                    {`Price : $ ${currentRoom?.room_price || 0}`}
                  </h6>
                  <h6>
                    {`Size : ${currentRoom?.room_size || 0} SQFT`}
                  </h6>
                  <h6>
                    Max capacity :
                    {' '}
                    {currentRoom?.room_capacity > 1
                      ? `${currentRoom?.room_capacity} people`
                      : `${currentRoom?.room_capacity || 1} person`}
                  </h6>
                  <h6>{currentRoom?.allow_pets ? 'pets allowed' : 'no pets allowed'}</h6>
                  <h6>{currentRoom?.provide_breakfast && 'free breakfast included'}</h6>

                  {currentRoom?.room_status === 'available' || !currentRoom?.room_status ? (
                    <Button
                      className='btn-primary'
                      type='default'
                      size='large'
                      onClick={handleOrder}
                    >
                      Place Room Booking Order
                    </Button>
                  ) : (
                    <Button
                      className='btn-primary'
                      type='default'
                      size='large'
                      disabled
                    >
                      Room Unavailable! Can&#39;t Place Order
                    </Button>
                  )}
                </article>
              </div>

              {/* room extra facilities */}
              {currentRoom?.extra_facilities?.length > 0 && (
                <section className='room-extras' style={{ width: '90vw', maxWidth: '1200px', margin: '3rem auto 0' }}>
                  <h6>Extras & Amenities:</h6>
                  <ul className='extras'>
                    {currentRoom.extra_facilities.map((item) => (
                      <li key={uniqueId()}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* room reviews list */}
              <div className='single-room-images'>
                {(currentRoom?.id || currentRoom?._id) && (
                  <RoomReviewList roomId={currentRoom?.id || currentRoom?._id} />
                )}
              </div>
            </section>
          </>
        )}
      </MainLayout>

      {/* room booking order place modal */}
      {bookingModal.open && (
        <OrderPlaceModal
          bookingModal={bookingModal}
          setBookingModal={setBookingModal}
        />
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const localRoom = formattedLocalRooms.find((r) => r.room_slug === ctx.query.slug) || null;

  try {
    const apiBaseUrl = publicRuntimeConfig?.API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:5001';
    const response = await axios.get(
      `${apiBaseUrl}/api/v1/get-room-by-id-or-slug-name/${ctx.query.slug}`
    );
    const room = response?.data?.result || (localRoom ? { data: localRoom } : null);

    return {
      props: {
        room,
        error: null
      }
    };
  } catch (err) {
    if (localRoom) {
      return {
        props: {
          room: { data: localRoom },
          error: null
        }
      };
    }

    const errorMessage = err?.response?.data?.message || err?.message || 'Failed to fetch room details';
    return {
      props: {
        room: null,
        error: { message: errorMessage }
      }
    };
  }
}

export default RoomPreview;
