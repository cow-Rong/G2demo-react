import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  status: 200,
  msg: '',
  page: 1,
  size: 10,
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setTabelPlacement: (state: any, { payload }) => {
      state.tablePlacement = payload
    },
  },
  extraReducers: {
  },
})
