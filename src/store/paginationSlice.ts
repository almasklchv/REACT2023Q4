import { createSlice } from '@reduxjs/toolkit';

export interface PaginationSlice {
  pagination: {
    pageNumber: number;
  };
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    pageNumber: 1,
  },
  reducers: {
    setPageNumber(state, action) {
      state.pageNumber = action.payload.pageNumber;
    },
  },
});

export const { setPageNumber } = paginationSlice.actions;

export default paginationSlice.reducer;
