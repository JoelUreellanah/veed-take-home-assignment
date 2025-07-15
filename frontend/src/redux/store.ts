import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "./videosSlice";
import addVideoReduxer from "./addVideoSlice";
import singleVideoReducer from "./singleVideoSlice";

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    addVideo: addVideoReduxer,
    singleVideo: singleVideoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
