interface TagProps {
  tags: string[];
}

export default function Tags({ tags }: TagProps) {
  return (
    <div className="my-2 flex flex-wrap gap-1">
      {tags.map(tag => (
        <span
          key={tag}
          className="text-xs rounded-full text-primary font-semibold dark:text-light-gray"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
