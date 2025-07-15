import { render, screen } from '@testing-library/react';
import DetailedVideo from './DetailedVideo';
import { describe, it, expect } from 'vitest';

const mockVideo = {
  id: 'v-001',
  title: 'Sample Video',
  thumbnail_url: 'https://picsum.photos/300/200',
  created_at: '2025-03-17T12:00:00Z',
  duration: 3665, // 1 hr 1 min 5 sec
  views: 12453,
  tags: ['tutorial', 'react', 'frontend'],
};

describe('DetailedVideo Component', () => {
  it('renders the video details correctly', () => {
    render(<DetailedVideo video={mockVideo} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Sample Video',
    );
    expect(screen.getByText(/tutorial/i)).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();
    expect(screen.getByText(/frontend/i)).toBeInTheDocument();
  });

  it('formats and displays the duration correctly', () => {
    render(<DetailedVideo video={mockVideo} />);
    expect(screen.getByText('1 hr 1 min 5 sec')).toBeInTheDocument();
  });

  it('renders the correct thumbnail image', () => {
    render(<DetailedVideo video={mockVideo} />);
    const image = screen.getByRole('img', { name: /Sample Video/i });
    expect(image).toHaveAttribute('src');
    expect(image.getAttribute('src')).toContain(
      encodeURIComponent(mockVideo.thumbnail_url),
    );
  });

  it('renders the watch now button with the correct link', () => {
    render(<DetailedVideo video={mockVideo} />);
    const watchButton = screen.getByRole('link', {
      name: /Back to main page/i,
    });
    expect(watchButton).toHaveAttribute('href', `/`);
  });
});
