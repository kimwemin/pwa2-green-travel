import { configureStore } from "@reduxjs/toolkit";
import festivalReducer from './slices/festivalSlice.js';
import festivalShowReducer from './slices/festivalShowSlice.js';
import accommodationReducer from './slices/accommodationSlice.js';

export default configureStore({
  reducer: {
    festival: festivalReducer,
    festivalShow: festivalShowReducer,
    accommodation: accommodationReducer,
  }
});