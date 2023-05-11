import { createSlice } from '@reduxjs/toolkit'
import { commonFetchData, commonSetLoading, commonSetWsStatus } from '../actions'

export const volumeSlice = createSlice({
  name: 'volume',
  initialState: {
    name: 'volume',
    loading: false,
    wsStatus: false,
    data: [],
  },
  reducers: {
    fetchData: commonFetchData,
    setLoading: commonSetLoading,
    setWsStatus: commonSetWsStatus,
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchData,
  setLoading,
  setWsStatus
} = volumeSlice.actions

export default volumeSlice.reducer