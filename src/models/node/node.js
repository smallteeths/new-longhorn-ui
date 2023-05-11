import { createSlice } from '@reduxjs/toolkit'
import { commonFetchData, commonSetLoading, commonSetWsStatus } from '../actions'

export const nodeSlice = createSlice({
  name: 'node',
  initialState: {
    name: 'node',
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
} = nodeSlice.actions

export default nodeSlice.reducer