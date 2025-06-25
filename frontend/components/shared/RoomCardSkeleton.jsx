import React from 'react';

export default function RoomCardSkeleton() {
  return (
    <article className='room room-card skeleton-card'>
      <div className='img-container skeleton-img-container'>
        <div className='skeleton-shimmer skeleton-media' />
        <div className='skeleton-shimmer skeleton-price-badge' />
      </div>

      <div className='room-card-content'>
        <div className='skeleton-shimmer skeleton-title' />
        <div className='room-meta-chips'>
          <div className='skeleton-shimmer skeleton-chip' />
          <div className='skeleton-shimmer skeleton-chip' />
        </div>
      </div>
    </article>
  );
}
