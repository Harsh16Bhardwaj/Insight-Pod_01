import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  initialPodcasts: [], // This will store the initially fetched podcasts
  searchedPodcasts: [], // This will store the searched podcasts
  loading: false,
  error: null,
};

// Create a slice
const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    // Set the initially fetched podcasts
    setInitialPodcasts: (state, action) => {
      state.initialPodcasts = action.payload;
    },

    // Set the searched podcasts
    setSearchedPodcasts: (state, action) => {
      state.searchedPodcasts = action.payload;
    },

    // Set loading state
    setLoading: (state) => {
      state.loading = true;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Clear error state
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export the actions
export const { setInitialPodcasts, setSearchedPodcasts, setLoading, setError, clearError } = podcastSlice.actions;

// Export the reducer to add to the store
export default podcastSlice.reducer;
