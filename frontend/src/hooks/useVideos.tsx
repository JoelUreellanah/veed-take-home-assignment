import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { fetchVideos } from '@/redux/videosSlice';

export default function useVideos() {
  const dispatch = useAppDispatch();
  const { videos, total, loading, error, query } = useAppSelector(
    state => state.videos,
  );

  useEffect(() => {
    dispatch(fetchVideos(query));
  }, [dispatch, query]);

  return { videos, total, loading, error };
}
