import { createSlice } from '@reduxjs/toolkit'

export const eventSlice = createSlice({
    name: 'events',
    initialState: {
      data: null
    },
    reducers: {
      loadEvents: (state, action) => {
        state.data = action.payload
      }
    }
  })
  
  export const { loadEvents } = eventSlice.actions
  
  export default eventSlice.reducer