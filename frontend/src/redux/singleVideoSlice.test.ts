import { describe, it, expect } from 'vitest';
import { fetchSingleVideo, clearSingleVideo } from '@/redux/singleVideoSlice';
import singleVideoReducer from '@/redux/singleVideoSlice';
import { Video } from '@/types';

const initialState = {
  video: null,
  loading: false,
  error: null,
};

const mockVideo: Video = {
  id: 'v-001',
  title: 'Test Video',
  thumbnail_url: 'https://picsum.photos/300/200',
  created_at: '2024-04-01T12:00:00Z',
  duration: 120,
  views: 5000,
  tags: ['education', 'coding'],
};

describe('singleVideoSlice reducer', () => {
  it('should handle initial state', () => {
    const state = singleVideoReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should handle fetchSingleVideo.pending', () => {
    const state = singleVideoReducer(initialState, {
      type: fetchSingleVideo.pending.type,
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchSingleVideo.fulfilled', () => {
    const state = singleVideoReducer(initialState, {
      type: fetchSingleVideo.fulfilled.type,
      payload: mockVideo,
    });
    expect(state.loading).toBe(false);
    expect(state.video).toEqual(mockVideo);
    expect(state.error).toBe(null);
  });

  it('should handle fetchSingleVideo.rejected', () => {
    const errorMessage = 'Failed to load video';
    const state = singleVideoReducer(initialState, {
      type: fetchSingleVideo.rejected.type,
      payload: errorMessage,
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.video).toBe(null);
  });

  it('should handle clearSingleVideo', () => {
    const modifiedState = {
      video: mockVideo,
      loading: false,
      error: null,
    };

    const state = singleVideoReducer(modifiedState, clearSingleVideo());
    expect(state).toEqual(initialState);
  });
});
