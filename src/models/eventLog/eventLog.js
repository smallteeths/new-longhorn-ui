import { createSlice } from '@reduxjs/toolkit'

export const eventLogSlice = createSlice({
  name: 'eventLog',
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    fetchData: (state, action) => {
      return {
        ...state,
        data: action.payload
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload
      };
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetchData, setLoading } = eventLogSlice.actions

export default eventLogSlice.reducer