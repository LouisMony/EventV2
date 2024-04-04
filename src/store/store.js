import { configureStore } from '@reduxjs/toolkit';
import contentSlice from '../reducers/eventSlice';
import inscriptionSlice from '../reducers/inscriptionSlice';
import profilsSlice from '../reducers/profilsSlice';

export default configureStore({
  reducer: {
    events: contentSlice,
    inscriptions: inscriptionSlice,
    profils: profilsSlice
  }
})