import { createSlice } from '@reduxjs/toolkit'
import { commonFetchData, commonSetLoading, commonSetWsStatus } from '../actions'

export const eventLogSlice = createSlice({
  name: 'eventLog',
  initialState: {
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
} = eventLogSlice.actions

export default eventLogSlice.reducer