import { createSlice } from '@reduxjs/toolkit'

export const inscriptionSlice = createSlice({
    name: 'inscriptions',
    initialState: {
      data: null
    },
    reducers: {
      loadInscriptions: (state, action) => {
        state.data = action.payload
      }
    }
  })
  
  export const { loadInscriptions } = inscriptionSlice.actions
  
  export default inscriptionSlice.reducer