import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosConfig from "../../configs/axiosConfig.js";

const accommodationIndex = createAsyncThunk(
  'accommodationSlice/accommodationIndex',
  async () => {
    const url = `${axiosConfig.BASE_URL}/searchStay2`;
    const config = {
      params: {
        MobileOS: axiosConfig.MOBILE_OS,
        MobileApp: axiosConfig.MOBILE_App,
        serviceKey: axiosConfig.SERVICE_KEY,
        _type: axiosConfig.TYPE,
        numOfRows: axiosConfig.NUM_OF_ROWS,
        arrange: axiosConfig.ARRANGE,
      }
    }

    const response = await axios.get(url, config);

    return response.data.response.body;
  }
);

export { accommodationIndex };