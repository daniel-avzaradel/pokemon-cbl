import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, UserData } from '../../App';

const initialState: UserData = {
  username: '',
  arena: [],
  battleDeck: [],
  coins: 0,
  collection: [],
  profilePicture: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData | null>) {
      return state = action.payload ?? initialState;
    }
  },
});

export const {
  setUser
} = userSlice.actions;

export default userSlice.reducer;
