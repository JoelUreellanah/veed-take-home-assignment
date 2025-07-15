import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import VideoCard from "./VideoCard";

const mockVideo = {
  id: "v-001",
  title: "Sample Video",
  thumbnail_url: "https://picsum.photos/300/200",
  created_at: "2025-03-10T12:00:00Z",
  tags: ["tutorial", "education"],
  views: 100500,
};

describe("VideoCard component", () => {
  it("renders video title", () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText(mockVideo.title)).toBeInTheDocument();
  });

  it("renders video thumbnail", () => {
    render(<VideoCard video={mockVideo} />);
    const image = screen.getByRole("img", { name: mockVideo.title });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", mockVideo.title);
  });

  it("displays correct view count", () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText(/100,500/i)).toBeInTheDocument();
  });

  it("renders correct upload date", () => {
    render(<VideoCard video={mockVideo} />);
    const formattedDate = new Date(mockVideo.created_at).toLocaleDateString(
      "en-NL"
    );
    expect(
      screen.getByText(`Uploaded on: ${formattedDate}`)
    ).toBeInTheDocument();
  });

  it("renders tags correctly", () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText(/tutorial/i)).toBeInTheDocument();
    expect(screen.getByText(/education/i)).toBeInTheDocument();
  });
});
