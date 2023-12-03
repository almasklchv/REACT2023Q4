import { createSlice } from '@reduxjs/toolkit';
import { User } from '../entities';

interface UserState {
  users: User[];
}

export const userSlice = createSlice({
  name: 'users',
  initialState: JSON.parse(localStorage.getItem('users') ?? '[]') as User[],
  reducers: {
    addUser: (state: User[], action) => {
      state.push(action.payload);
    },
  },
});

export const userSelector = (state: UserState) => state.users;

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
