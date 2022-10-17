import { createSlice } from '@reduxjs/toolkit'

export const nodeSlice = createSlice({
  name: 'node',
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
export const { fetchData } = nodeSlice.actions

export default nodeSlice.reducer