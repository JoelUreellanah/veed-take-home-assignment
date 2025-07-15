"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchVideos, setQuery } from "@/redux/videosSlice";
import TextSearch from "@/components/ui/TextSearch/TextSearch";
import { SORT_BY } from "@/constants/sortOptions";
import { Plus } from "lucide-react";
import Link from "next/link";

const defaultFilters = {
  search: "",
  sortBy: SORT_BY.NEWEST,
  tags: "",
  page: 1,
};

export default function VideosSearch() {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.videos);
  const [search, setSearch] = useState(query.search || defaultFilters.search);

  const handleApplyFilters = () => {
    const newFilters = {
      search: search?.trim() || "",
      page: 1,
    };

    dispatch(setQuery(newFilters));
    dispatch(fetchVideos(newFilters));
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trimStart());
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleApplyFilters();
  };

  useEffect(() => {
    setSearch((prev) => (prev !== query.search ? query.search || "" : prev));
  }, [query]);

  return (
    <form className="flex flex-col gap-6 p-4" onSubmit={onSubmit}>
      <div className="flex justify-center items-center gap-4">
        <TextSearch
          placeholder="Search videos..."
          value={search}
          onChange={onSearchChange}
          className="w-full max-w-md"
        />
        <Link href={`/videos/new`} className="block">
          <Plus className="h-6 w-6" />
        </Link>
      </div>
    </form>
  );
}
