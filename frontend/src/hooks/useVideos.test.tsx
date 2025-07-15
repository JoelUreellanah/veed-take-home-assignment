import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useVideos from '@/hooks/useVideos';
import { fetchVideos } from '@/redux/videosSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

// Mock Redux Hooks
vi.mock('@/hooks/reduxHooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('@/redux/videosSlice', () => ({
  fetchVideos: vi.fn(),
}));

describe('useVideos hook', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockReturnValue({
      videos: [],
      total: 0,
      loading: false,
      error: null,
      query: { page: 1, pageSize: 10 },
    });

    mockDispatch.mockClear();
  });

  it('dispatches fetchVideos on mount', () => {
    renderHook(() => useVideos());
    expect(mockDispatch).toHaveBeenCalledWith(
      fetchVideos({ page: 1, pageSize: 10 }),
    );
  });

  it('returns correct Redux state', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      videos: [{ id: 'v-001', title: 'Test Video' }],
      total: 1,
      loading: false,
      error: null,
      query: { page: 1, pageSize: 10 },
    });

    const { result } = renderHook(() => useVideos());
    expect(result.current.videos).toEqual([
      { id: 'v-001', title: 'Test Video' },
    ]);
    expect(result.current.total).toBe(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('does not dispatch fetchVideos if query does not change', () => {
    const { rerender } = renderHook(() => useVideos());
    mockDispatch.mockClear();
    rerender(); // Simulate re-render without query change
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
