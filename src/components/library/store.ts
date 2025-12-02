import { configureStore } from '@reduxjs/toolkit';
import battleReducer from './battleSlice.ts';
import userReducer from './userSlice.ts';

export const store = configureStore({
  reducer: {
    battle: battleReducer,
    user: userReducer
  },
});

// Types for useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
