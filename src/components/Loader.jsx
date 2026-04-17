import { memo } from 'react';

/**
 * Skeleton loader cards for product listing.
 * Renders a grid of placeholder cards with shimmer animation.
 */
function Loader({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-4 space-y-4">
          {/* Image skeleton */}
          <div className="skeleton h-48 w-full rounded-lg" />
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
          </div>
          {/* Price skeleton */}
          <div className="skeleton h-6 w-1/3" />
          {/* Button skeleton */}
          <div className="skeleton h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default memo(Loader);
