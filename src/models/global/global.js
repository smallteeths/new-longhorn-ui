import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isPhoneSize: false
  },
  reducers: {
    setIsPhoneSize: (state, action) => {
      return {
        ...state,
        isPhoneSize: action.payload
      };
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsPhoneSize } = globalSlice.actions

export default globalSlice.reducer