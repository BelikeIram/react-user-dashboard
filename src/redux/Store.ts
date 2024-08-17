// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userDetailsReducer from './userDetailsSlice'; // Adjust the path if needed

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
  },
});

// Type for Redux store state
export type RootState = ReturnType<typeof store.getState>;
// Type for dispatch
export type AppDispatch = typeof store.dispatch;
