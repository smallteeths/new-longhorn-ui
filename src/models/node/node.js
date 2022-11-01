import { createSlice } from '@reduxjs/toolkit'

export const nodeSlice = createSlice({
  name: 'node',
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
export const { fetchData, setLoading } = nodeSlice.actions

export default nodeSlice.reducer