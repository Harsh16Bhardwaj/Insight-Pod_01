import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  preferences: {
    genres: [],  // Store selected genres
    subgenres: {},  // Store selected subgenres per genre
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // Store the token
      state.preferences = action.payload.preferences || initialState.preferences; // Set user preferences if available
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.preferences = initialState.preferences; // Reset preferences
    },
    setPreferences: (state, action) => {
      state.preferences = action.payload;  // Update preferences
    },
  },
});

export const { login, logout, setPreferences } = authSlice.actions;

export default authSlice.reducer;
