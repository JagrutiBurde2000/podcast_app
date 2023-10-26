import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import podcastReducer from "./slices/podcastSlice";
// import episodeReducer from "./slices/episodeReducer"
export default configureStore({
  reducer: {
    user: userReducer,
    podcasts: podcastReducer,
//    episode: episodeReducer,
  },
});