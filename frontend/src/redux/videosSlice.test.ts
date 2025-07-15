import { describe, it, expect } from 'vitest';
import { fetchVideos, setQuery, setPage } from '@/redux/videosSlice';
import videosReducer, { VideosState } from '@/redux/videosSlice';

const initialState: VideosState = {
  videos: [],
  total: 0,
  loading: false,
  error: null,
  query: {
    page: 1,
    pageSize: 10,
  },
};

const mockVideos = [
  {
    id: 'v-001',
    title: 'Sample Video',
    thumbnail_url: 'https://picsum.photos/300/200',
    created_at: '2024-04-01T12:00:00Z',
    duration: 120,
    views: 5000,
    tags: ['education', 'coding'],
  },
];

describe('videosSlice reducer', () => {
  it('should return the initial state', () => {
    const state = videosReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should handle fetchVideos.pending', () => {
    const state = videosReducer(initialState, {
      type: fetchVideos.pending.type,
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchVideos.fulfilled', () => {
    const state = videosReducer(initialState, {
      type: fetchVideos.fulfilled.type,
      payload: { videos: mockVideos, total: 1 },
    });

    expect(state.loading).toBe(false);
    expect(state.videos).toEqual(mockVideos);
    expect(state.total).toBe(1);
    expect(state.error).toBe(null);
  });

  it('should handle fetchVideos.rejected', () => {
    const errorMessage = 'Failed to fetch videos';
    const state = videosReducer(initialState, {
      type: fetchVideos.rejected.type,
      error: { message: errorMessage },
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.videos).toEqual([]);
  });

  it('should update query when setQuery is called', () => {
    const newQuery = { search: 'React', page: 2, pageSize: 5 };
    const state = videosReducer(initialState, setQuery(newQuery));

    expect(state.query.search).toBe('React');
    expect(state.query.page).toBe(1); // Page should reset to 1
    expect(state.query.pageSize).toBe(5);
  });

  it('should update page when setPage is called', () => {
    const state = videosReducer(initialState, setPage(3));
    expect(state.query.page).toBe(3);
  });
});
