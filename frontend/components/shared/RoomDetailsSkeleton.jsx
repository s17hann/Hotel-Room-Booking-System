import React from 'react';

export default function RoomDetailsSkeleton() {
  return (
    <div className='room-details-skeleton-wrapper' aria-busy='true' aria-label='Loading room details'>
      {/* Hero Banner Skeleton */}
      <div className='skeleton-hero-banner'>
        <div className='skeleton-shimmer skeleton-hero-title' />
        <div className='skeleton-shimmer skeleton-hero-subtitle' />
      </div>

      <div className='single-room' style={{ paddingTop: '2.5rem' }}>
        {/* Images Grid Skeleton */}
        <div className='single-room-images'>
          {[1, 2, 3].map((item) => (
            <div key={`detail-img-skeleton-${item}`} className='single-room-image-wrapper'>
              <div className='skeleton-shimmer skeleton-media-large' />
            </div>
          ))}
        </div>

        {/* Room Info Grid Skeleton */}
        <div className='single-room-info'>
          <article className='desc'>
            <div className='skeleton-shimmer skeleton-heading-sm' />
            <div className='skeleton-shimmer skeleton-text-line' />
            <div className='skeleton-shimmer skeleton-text-line' />
            <div className='skeleton-shimmer skeleton-text-line' style={{ width: '80%' }} />
          </article>

          <article className='info'>
            <div className='skeleton-shimmer skeleton-heading-sm' />
            <div className='skeleton-shimmer skeleton-info-row' />
            <div className='skeleton-shimmer skeleton-info-row' />
            <div className='skeleton-shimmer skeleton-info-row' />
            <div className='skeleton-shimmer skeleton-btn-large' />
          </article>
        </div>
      </div>
    </div>
  );
}
