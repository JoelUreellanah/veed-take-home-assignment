import Tags from "@/components/Tags/Tags";
import VideoViews from "./VideoViews";
import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail_url: string;
    created_at: string;
    tags: string[];
    views: number;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/videos/${video.id}`} className="block">
      <article
        key={video.id}
        className="relative overflow-hidden
                   transition-transform hover:scale-[1.02] hover:shadow-xxl duration-300
                   flex flex-col group cursor-pointer h-96"
      >
        <Image
          width={300}
          height={200}
          src={video.thumbnail_url}
          alt={video.title}
          priority
          className="w-full h-48 object-cover rounded-lg"
        />

        <div className="pt-4 flex flex-col flex-grow overflow-hidden">
          <h4 className="font-semibold text-lg line-clamp-2">{video.title}</h4>

          <p className="text-xs text-muted mt-1">
            Uploaded on:{" "}
            {new Date(video.created_at).toLocaleDateString("en-NL")}
          </p>
          <VideoViews views={video.views} />
          <div className="my-2 flex flex-wrap gap-1 overflow-hidden">
            <Tags tags={video.tags} />
          </div>
        </div>
      </article>
    </Link>
  );
}
