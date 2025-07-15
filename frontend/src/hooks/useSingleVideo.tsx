import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchSingleVideo, clearSingleVideo } from '@/redux/singleVideoSlice';

export default function useSingleVideo(id: string) {
  const dispatch = useAppDispatch();
  const { video, loading, error } = useAppSelector(state => state.singleVideo);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleVideo(id));
    }

    return () => {
      dispatch(clearSingleVideo());
    };
  }, [id, dispatch]);

  return { video, loading, error };
}
