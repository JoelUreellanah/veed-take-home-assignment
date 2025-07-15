import { Video } from "@/types";
import VideoCard from "@/components/VideosList/VideoCard";
import useVideos from "@/hooks/useVideos";

export default function VideosList() {
  const { loading, videos, error } = useVideos();

  if (loading) return <div className="p-8">Loading videos...</div>;
  if (error) return <div className="p-8">Error: {error}</div>;
  if (videos.length === 0)
    return <div className="p-4 text-center">No videos found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2 px-4">
      {videos.map((video: Video) => (
        <VideoCard video={video} key={video.id} />
      ))}
    </div>
  );
}
