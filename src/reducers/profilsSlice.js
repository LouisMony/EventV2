import { createSlice } from '@reduxjs/toolkit'

export const profilsSlice = createSlice({
    name: 'profils',
    initialState: {
      data: null
    },
    reducers: {
      loadProfils: (state, action) => {
        state.data = action.payload
      }
    }
  })
  
  export const { loadProfils } = profilsSlice.actions
  
  export default profilsSlice.reducer