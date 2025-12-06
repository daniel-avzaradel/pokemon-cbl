import { configureStore } from '@reduxjs/toolkit';
import battleReducer from './battleSlice.js';
import userReducer from './userSlice.js';
import libraryReducer from './librarySlice.js';

export const store = configureStore({
  reducer: {
    battle: battleReducer,
    user: userReducer,
    library: libraryReducer
  },
});

// Types for useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
