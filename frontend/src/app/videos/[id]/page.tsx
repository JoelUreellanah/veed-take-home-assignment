'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import useSingleVideo from '@/hooks/useSingleVideo';
import DetailedVideo from '@/components/DetailedVideo/DetailedVideo';
import DetailedVideoLoader from '@/components/DetailedVideo/DetailedVideoLoader';

export default function VideoDetails() {
  const { id } = useParams();
  const { video, loading, error } = useSingleVideo(id as string);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsLoaded(true);
    }
  }, [loading]);

  if (isLoaded && error) {
    return notFound();
  }

  if (loading || !video) {
    return <DetailedVideoLoader />;
  }

  return (
    <>
      <DetailedVideo video={video} />
    </>
  );
}
