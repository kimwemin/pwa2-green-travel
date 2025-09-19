import { createSlice } from "@reduxjs/toolkit";
import { accommodationIndex } from "../thunks/accommodationThunk.js";


const accommodationSlice = createSlice({
  name: 'accommodationSlice',
  initialState: {
    accommodationList: [],
  },
  reducers: {
    setList: (state, action) => {
      state.accommodationList = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(accommodationIndex.fulfilled, (state, action) => {
        state.accommodationList = [...action.payload.items.item];
      })
      .addMatcher(
        action => action.type.startsWith('accommodationSlice/') && action.type.endsWith('/pending'),
        state => {
          console.log('처리중입니다.');
        }
      )
      .addMatcher(
        action => action.type.startsWith('accommodationSlice/') && action.type.endsWith('/rejected'),
        (state, action) => {
          console.error('에러', action.error);
        }
      )
  }
});

export const { setList } = accommodationSlice.actions;

export default accommodationSlice.reducer;