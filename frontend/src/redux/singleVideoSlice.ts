import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Video } from '@/types';
import { getConfig } from '@/lib/getConfig';

interface SingleVideoState {
  video: Video | null;
  loading: boolean;
  error: string | null;
}

const initialState: SingleVideoState = {
  video: null,
  loading: false,
  error: null,
};

export const fetchSingleVideo = createAsyncThunk(
  'singleVideo/fetchSingleVideo',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${getConfig().apiUrl}/videos/${id}`,
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(
        error.response?.data?.message ?? 'Failed to load video',
      );
    }
  },
);

const singleVideoSlice = createSlice({
  name: 'singleVideo',
  initialState,
  reducers: {
    clearSingleVideo: state => {
      state.video = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSingleVideo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleVideo.fulfilled, (state, action) => {
        state.video = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleVideo.rejected, (state, action) => {
        state.error = (action.payload as string) ?? 'An error occurred';
        state.loading = false;
      });
  },
});

export const { clearSingleVideo } = singleVideoSlice.actions;
export default singleVideoSlice.reducer;
