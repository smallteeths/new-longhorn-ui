export const commonFetchData = (state, action) => {
  return {
    ...state,
    data: action.payload
  }
}

export const commonSetLoading =  (state, action) => {
  return {
    ...state,
    loading: action.payload
  }
}

export const commonSetWsStatus =  (state, action) => {
  return {
    ...state,
    wsStatus: action.payload
  }
}
