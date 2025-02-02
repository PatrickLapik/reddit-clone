import React, { useEffect, useRef } from 'react';

interface InfiniteScrollObserverProps {
  onVisible: () => void;
  isLoading: boolean;
  hasMore: boolean;
  threshold?: number;
  rootMargin?: string;
}

const InfiniteScrollObserver: React.FC<InfiniteScrollObserverProps> = ({
  onVisible,
  isLoading,
  hasMore,
  threshold = 1.0,
  rootMargin = '20px'
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      {
        root: null,
        rootMargin,
        threshold
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading, hasMore, onVisible, rootMargin, threshold]);

  return (
    <div ref={observerRef} className="text-center p-4">
      {isLoading ? <p>Loading more...</p> : !hasMore && <p>No more items to load.</p>}
    </div>
  );
};

export default InfiniteScrollObserver;

