import { describe, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

vi.mock('@/hooks/reduxHooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Pagination component', () => {
  let mockDispatch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockDispatch = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockReturnValue({
      query: { page: 2, pageSize: 10 },
      total: 50,
    });

    mockDispatch.mockClear();
  });

  it('disables "Prev" button on first page', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      query: { page: 1, pageSize: 10 },
      total: 50,
    });

    render(<Pagination />);
    expect(screen.getByRole('button', { name: /Previous page/i })).toBeDisabled();
  });

  it('disables "Next" button on last page', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      query: { page: 5, pageSize: 10 },
      total: 50,
    });

    render(<Pagination />);
    expect(screen.getByRole('button', { name: /Next page/i })).toBeDisabled();
  });

  it('calls dispatch when clicking "Next"', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      query: { page: 2, pageSize: 10 },
      total: 50,
    });

    render(<Pagination />);
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(mockDispatch).toHaveBeenCalledTimes(2); // setPage & fetchVideos
  });

  it('calls dispatch when clicking "Prev"', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      query: { page: 3, pageSize: 10 },
      total: 50,
    });

    render(<Pagination />);
    fireEvent.click(screen.getByRole('button', { name: /Prev/i }));
    expect(mockDispatch).toHaveBeenCalledTimes(2); // setPage & fetchVideos
  });
});
