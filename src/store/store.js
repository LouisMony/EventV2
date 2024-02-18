import { configureStore } from '@reduxjs/toolkit';
import contentSlice from '../reducers/eventSlice';
import inscriptionSlice from '../reducers/inscriptionSlice';

export default configureStore({
  reducer: {
    events: contentSlice,
    inscriptions: inscriptionSlice
  }
})