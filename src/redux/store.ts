import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { homeSlice } from 'src/features/home/reducer-slice'

const rootReducer = combineReducers({
  home:homeSlice.reducer
})

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
