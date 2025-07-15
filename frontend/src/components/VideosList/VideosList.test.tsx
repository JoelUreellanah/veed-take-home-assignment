import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import VideosList from "./VideosList";
import useVideos from "@/hooks/useVideos";
import { Video } from "@/types";

vi.mock("@/hooks/useVideos", () => ({
  default: vi.fn(),
}));

const mockVideos: Video[] = [
  {
    id: "v-001",
    duration: 100,
    title: "Sample Video 1",
    thumbnail_url: "https://picsum.photos/300/200",
    created_at: "2025-03-10T12:00:00Z",
    tags: ["tutorial", "education"],
    views: 5000,
  },
  {
    id: "v-002",
    duration: 200,
    title: "Sample Video 2",
    thumbnail_url: "https://picsum.photos/300/201",
    created_at: "2025-03-11T14:30:00Z",
    tags: ["coding", "javascript"],
    views: 12000,
  },
];

describe("VideosList component", () => {
  it("renders loading state", () => {
    vi.mocked(useVideos).mockReturnValue({
      total: 0,
      loading: true,
      videos: [],
      error: null,
    });

    render(<VideosList />);
    expect(screen.getByText(/Loading videos.../i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useVideos).mockReturnValue({
      total: 0,
      loading: false,
      videos: [],
      error: "Network Error",
    });

    render(<VideosList />);
    expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
  });

  it('renders "No videos found" message when no videos exist', () => {
    vi.mocked(useVideos).mockReturnValue({
      total: 0,
      loading: false,
      videos: [],
      error: null,
    });

    render(<VideosList />);
    expect(screen.getByText(/No videos found/i)).toBeInTheDocument();
  });

  it("renders video list correctly", () => {
    vi.mocked(useVideos).mockReturnValue({
      total: mockVideos.length,
      loading: false,
      videos: mockVideos,
      error: null,
    });

    render(<VideosList />);
    expect(screen.getByText(/Sample Video 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Video 2/i)).toBeInTheDocument();
  });

  it("renders the correct number of videos", () => {
    vi.mocked(useVideos).mockReturnValue({
      total: mockVideos.length,
      loading: false,
      videos: mockVideos,
      error: null,
    });

    render(<VideosList />);
    const videoCards = screen.getAllByRole("article");
    expect(videoCards.length).toBe(mockVideos.length);
  });
});
