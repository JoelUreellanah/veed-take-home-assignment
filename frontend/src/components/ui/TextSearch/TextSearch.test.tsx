import { describe, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TextSearch from './TextSearch';

describe('TextSearch component', () => {
  const mockOnChange = vi.fn();

  it('renders placeholder correctly', () => {
    render(
      <TextSearch
        placeholder="Search videos..."
        value=""
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByPlaceholderText('Search videos...')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    render(
      <TextSearch
        placeholder="Search videos..."
        value=""
        onChange={mockOnChange}
      />,
    );

    const input = screen.getByPlaceholderText('Search videos...');
    fireEvent.change(input, { target: { value: 'Test Video' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object)); // Ensuring event object is received
  });

  it('applies additional classes properly', () => {
    render(
      <TextSearch
        placeholder="Type here..."
        value=""
        onChange={mockOnChange}
        className="custom-class"
      />,
    );

    const input = screen.getByPlaceholderText('Type here...');
    expect(input.parentElement).toHaveClass('custom-class');
  });
});
