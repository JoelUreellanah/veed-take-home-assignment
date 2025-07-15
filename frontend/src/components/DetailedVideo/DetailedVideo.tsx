import Image from "next/image";
import Tags from "@/components/Tags/Tags";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DetailedVideoProps {
  video: {
    title: string;
    thumbnail_url: string;
    tags: string[];
    created_at: string;
    views: number;
    duration: number;
  };
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const formattedHours = hours > 0 ? `${hours} hr ` : "";
  const formattedMinutes = minutes > 0 ? `${minutes} min ` : "";
  const formattedSeconds = seconds > 0 ? `${seconds} sec` : "";

  return `${formattedHours}${formattedMinutes}${formattedSeconds}`.trim();
};

export default function DetailedVideo({ video }: DetailedVideoProps) {
  return (
    <div className="px-4 lg:px-0">
      <div className="mt-6">
        <Button
          className="w-full sm:w-auto ml-auto"
          asChild
          variant="secondary"
        >
          <Link href="/">← Back to Main Page</Link>
        </Button>
      </div>
      <h1 className="py-4">{video.title}</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Image
          priority
          width="300"
          height="200"
          src={video.thumbnail_url}
          alt={video.title}
          className="w-[400] h-auto rounded-lg mt-4"
        />

        <div className="p-2">
          <Tags tags={video.tags} />
          <p className="text-sm text-muted mt-2">
            <b>Date:</b> {formatDate(video.created_at)}
          </p>
          <p className="text-sm text-muted mt-2">
            <b>Views:</b> {video.views.toLocaleString()}
          </p>

          <p className="text-sm text-muted mt-2">
            <b>Duration:</b> {formatDuration(video.duration)}
          </p>
        </div>
      </div>
    </div>
  );
}
