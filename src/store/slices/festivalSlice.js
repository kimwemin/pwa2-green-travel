import { createSlice } from "@reduxjs/toolkit";
import { festivalIndex } from "../thunks/festivalThunk.js";

const festivalSlice = createSlice({
  name: 'festivalSlice',
  initialState: {
    // 페스티벌 리스트
    // list: null, // 배열이 들어갈 예정, 객체나 배열은 null || 빈 객체나 배열로 초기화 할 수 있다. 어떤 것으로 초기화 하냐에 따라 이후 로직들이 달라진다.
    list: [],
    // 현재 페이지 번호
    page: 1,
    // 스크롤 이벤트 디바운싱 제어 플래그
    scrollEventFlg: true,
  },
  reducers: {
    // setList(state, action) {
    //   state.list = action.payload;
    // }
    setScrollEventFlg: (state, action) => {
      state.scrollEventFlg = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(festivalIndex.fulfilled, (state, action) => {
        // console.log(action.payload, action.type);
        // if(state.list !== null) {
        //   // 페이지 추가 처리
        //   state.list = [...state.list, ...action.payload.items.item];
        //   state.page = action.payload.pageNo;
        // } else {
          //   // 초기 페이지 처리
          //   state.list = action.payload.items.item;
          // }

          // API 내 모든 정보가 소진되었을 때 이후 스크롤 이벤트를 멈추는 디바운싱 처리
          if(action.payload.items?.item) {
            state.list = [...state.list, ...action.payload.items.item];
            state.page = action.payload.pageNo;
            state.scrollEventFlg = true;
          } else {
            state.scrollEventFlg = false;
          }
        })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          console.log('처리중입니다.');
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          console.error('에러에러.', action.error);
        }
      );
  }
});

// export는 객체 형태로 내보냄, 받을 때 무조건 디스트럭쳐링 문법으로 받아야함
export const { setScrollEventFlg } = festivalSlice.actions;

// export default 그냥 내보냄, 받을 때 디스트럭쳐링 문법으로 받을 수 없음
export default festivalSlice.reducer; // 스토어에서 사용하기 위함