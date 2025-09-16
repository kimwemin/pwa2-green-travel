import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axiosConfig.js";
import axios from "axios";
import { dateCalculater } from "../../utils/dateCalculater.js";
import { dateFormatter } from "../../utils/dateFormatterUtil.js";

const festivalIndex = createAsyncThunk(
  'festivalSlice/festivalIndex',
  // 아래 파라미터에는 arg(아규먼트, 외부주입 파라미터), thunkAPI(redux 관련 도구들이 객체 형태로 있는 파라미터)를 받을 수 있다.
  // async (arg, thunkAPI) {}
  // 아래 코드에서 아규먼트를 사용하지 않음에도 코드가 정상작동 하는 것은 자바스크립트의 특징이다. 다른 코드에서는 오버로딩이라는 기법으로 작성해야 한다.(ex. 자바)
  async (arg, thunkAPI) => {
    // state 접근 방법
    const state = thunkAPI.getState();
    // 동적인 eventStartDate 설정
    // eventStartDate 값이 될 상수 선언 = 포맷설정함수(timestamp만큼 과거 날짜 계산 함수(timestamp 설정))
    const pastDateYMD = dateFormatter.formatDateToYMD(dateCalculater.getPastDate((1000*60*60*24*30)));

    const url = `${axiosConfig.BASE_URL}/searchFestival2`;
    const config = {
      params: {
        serviceKey: axiosConfig.SERVICE_KEY,
        MobileOS: axiosConfig.MOBILE_OS,
        MobileApp: axiosConfig.MOBILE_App,
        _type: axiosConfig.TYPE,
        arrange: axiosConfig.ARRANGE,
        numOfRows: axiosConfig.NUM_OF_ROWS,
        pageNo: state.festival.page + 1,
        eventStartDate: pastDateYMD,
      }
    }

    const response = await axios.get(url, config);

    return response.data.response.body;
  }
);

export { festivalIndex };