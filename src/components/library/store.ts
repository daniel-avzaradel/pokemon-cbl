import { configureStore } from '@reduxjs/toolkit';
import battleReducer from './battleSlice.ts';

export const store = configureStore({
  reducer: {
    battle: battleReducer,
  },
});

// Types for useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
