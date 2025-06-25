import React from 'react';
import RoomCardSkeleton from './RoomCardSkeleton';

export default function RoomGridSkeleton({ count = 3, className = 'featured-rooms-center' }) {
  const items = Array.from({ length: count }, (_, index) => index);

  return (
    <div className={className} aria-busy='true' aria-label='Loading rooms'>
      {items.map((key) => (
        <RoomCardSkeleton key={`skeleton-room-${key}`} />
      ))}
    </div>
  );
}
