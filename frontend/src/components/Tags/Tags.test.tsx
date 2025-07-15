import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tags from './Tags';

describe('Tags component', () => {
  it('renders all tags correctly', () => {
    const mockTags = ['react', 'nextjs', 'tailwind'];

    render(<Tags tags={mockTags} />);

    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('#nextjs')).toBeInTheDocument();
    expect(screen.getByText('#tailwind')).toBeInTheDocument();
  });

  it('renders nothing when tags array is empty', () => {
    render(<Tags tags={[]} />);
    expect(screen.queryByRole('span')).not.toBeInTheDocument();
  });
});
