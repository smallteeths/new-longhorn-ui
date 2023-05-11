import { createSlice } from '@reduxjs/toolkit'
import { commonFetchData, commonSetLoading, commonSetWsStatus } from '../actions'

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    name: 'setting',
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
} = settingSlice.actions

export default settingSlice.reducer