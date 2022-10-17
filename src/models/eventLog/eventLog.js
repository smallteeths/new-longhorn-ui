import { createSlice } from '@reduxjs/toolkit'

export const eventLogSlice = createSlice({
  name: 'eventLog',
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
export const { fetchData } = eventLogSlice.actions

export default eventLogSlice.reducer