interface VideoViewsProps {
  views: number;
}

export default function VideoViews({ views }: VideoViewsProps) {
  return (
    <div
      className="flex items-center gap-1 text-muted-foreground text-sm transition-opacity duration-300"
      title={`Views: ${views.toLocaleString()}`}
    >
      <p className="text-xs text-muted mt-1">{views.toLocaleString()} views</p>
    </div>
  );
}
