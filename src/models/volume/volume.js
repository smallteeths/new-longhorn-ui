import { createSlice } from '@reduxjs/toolkit'

export const volumeSlice = createSlice({
  name: 'volume',
  initialState: {
    data: [],
  },
  reducers: {
    fetchData: (state, action) => {
      return {
        data: action.payload
      };
    }
  },
})

// Action creators are generated for each case reducer function
export const { fetchData } = volumeSlice.actions

export default volumeSlice.reducer