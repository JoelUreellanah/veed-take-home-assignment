import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Video } from "../types";
import { getConfig } from "@/lib/getConfig";

export interface VideosState {
  videos: Video[];
  total: number;
  loading: boolean;
  error: string | null;
  query: {
    search?: string;
    sortBy?: string;
    tags?: string[];
    startDate?: string;
    endDate?: string;
    page: number;
    pageSize: number;
  };
}

const initialState: VideosState = {
  videos: [],
  total: 0,
  loading: false,
  error: null,
  query: {
    page: 1,
    pageSize: 10,
  },
};

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (
    queryParams?: Record<string, string[] | string | number | undefined>
  ) => {
    const params = { ...queryParams };

    if (params.tags && Array.isArray(params.tags)) {
      params.tags = params.tags.length > 0 ? params.tags.join(",") : undefined;
    }

    const { data } = await axios.get(`${getConfig().apiUrl}/videos`, {
      params,
    });
    return data;
  }
);

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setQuery(state, action) {
      const updatedFilters = { ...state.query, ...action.payload, page: 1 };

      if (updatedFilters.tags && typeof updatedFilters.tags === "string") {
        updatedFilters.tags = updatedFilters.tags
          .split(",")
          .map((tag: string) => tag.trim());
      }

      state.query = updatedFilters;
    },
    setPage(state, action) {
      state.query.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.videos;
        state.total = action.payload.total;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching videos";
      });
  },
});

export const { setQuery, setPage } = videosSlice.actions;
export default videosSlice.reducer;
