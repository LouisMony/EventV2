import { configureStore } from '@reduxjs/toolkit';
import contentSlice from '../reducers/eventSlice';

export default configureStore({
  reducer: {
    events: contentSlice,
  }
})