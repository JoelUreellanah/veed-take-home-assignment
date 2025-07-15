"use client";

import useVideos from "@/hooks/useVideos";
import VideosList from "@/components/VideosList/VideosList";
import Pagination from "@/components/Pagination/Pagination";
import SelectInput from "../ui/SelectInput/SelectInput";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { SORT_BY } from "@/constants/sortOptions";
import { fetchVideos, setQuery } from "@/redux/videosSlice";

export default function VideosSection() {
  const dispatch = useAppDispatch();
  const { total } = useVideos();
  const { query } = useAppSelector((state) => state.videos);
  const [sortBy, setSortBy] = useState(query.sortBy || SORT_BY.NEWEST);

  useEffect(() => {
    setSortBy((prev) =>
      prev !== query.sortBy ? query.sortBy || SORT_BY.NEWEST : prev
    );
  }, [query]);

  const onSortByChange = (value: string) => {
    setSortBy(value);

    const newFilters = {
      search: query.search?.trim() || "",
      sortBy: value,
      page: 1,
    };

    dispatch(setQuery(newFilters));
    dispatch(fetchVideos(newFilters));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-row items-center justify-end w-full p-4">
          <p className="text-sm text-muted mr-1">
            Total videos: {total} - Sort By:{" "}
          </p>
          <SelectInput
            value={sortBy}
            onChange={onSortByChange}
            options={[
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
            ]}
          />
        </div>
      </div>
      <VideosList />
      {total > 1 && (
        <div className="flex justify-center my-8">
          <Pagination />
        </div>
      )}
    </>
  );
}
