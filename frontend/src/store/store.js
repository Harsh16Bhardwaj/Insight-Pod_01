import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import podcastReducer from "./slices/podcastSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    podcast: podcastReducer, // Add more reducers as needed
  },
});

export default store;
