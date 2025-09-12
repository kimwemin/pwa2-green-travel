import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axiosConfig.js";
import axios from "axios";

const festivalIndex = createAsyncThunk(
  'festivalSlice/festivalIndex',
  async () => {
    const url = `${axiosConfig.baseUrl}/searchFestival2`;
    const config = {
      params: {
        serviceKey: axiosConfig.serviceKey,
        MobileOS: axiosConfig.MobileOS,
        MobileApp: axiosConfig.MobileApp,
        _type: axiosConfig.type,
        arrange: axiosConfig.arrange,
        eventStartDate: '20250401'
      }
    }

    const response = await axios.get(url, config);

    return response.data.response.body;
  }
);

export { festivalIndex };