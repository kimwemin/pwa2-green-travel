import { createSlice } from "@reduxjs/toolkit";
import { festivalIndex } from "../thunks/festivalThunk.js";

const festivalSlice = createSlice({
  name: 'festivalSlice',
  initialState: {
    // 페스티벌 리스트
    list: null, // 배열이 들어갈 예정, 객체나 배열은 null || 빈 객체나 배열로 초기화 할 수 있다.
  },
  reducers: {
    setList(state, action) {
      state.list = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(festivalIndex.fulfilled, (state, action) => {
        console.log(action.payload, action.type);
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          console.log('처리중입니다.');
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        state => {
          console.error('에러에러.');
        }
      );
  }
});

// export는 객체 형태로 내보냄, 받을 때 무조건 디스트럭쳐링 문법으로 받아야함
export const { setList } = festivalSlice.actions;

// export default 그냥 내보냄, 받을 때 디스트럭쳐링 문법으로 받을 수 없음
export default festivalSlice.reducer; // 스토어에서 사용하기 위함