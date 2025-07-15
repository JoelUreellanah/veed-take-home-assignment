import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig } from "@/lib/getConfig";

interface AddVideoState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AddVideoState = {
  status: "idle",
  error: null,
};

export const addVideo = createAsyncThunk(
  "videos/addVideo",
  async (videoData: { title: string; tags?: string[] }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${getConfig().apiUrl}/videos`,
        videoData
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message || "Failed to create video"
        );
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);

const addVideoSlice = createSlice({
  name: "addVideo",
  initialState,
  reducers: {
    resetAddVideoState(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addVideo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addVideo.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetAddVideoState } = addVideoSlice.actions;
export default addVideoSlice.reducer;
