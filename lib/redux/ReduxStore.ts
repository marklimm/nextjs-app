import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import searchFilterReducer from './searchFilters/searchFilterReducer'

const reducer = combineReducers({
  searchFilter: searchFilterReducer,
})

const ReduxStore = configureStore({
  reducer,
})

//  following https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
export type IReduxStore = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch

export default ReduxStore
