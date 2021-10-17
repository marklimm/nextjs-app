import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import tasksFilterReducer from './search/TasksFilterReducer'

const reducer = combineReducers({
  tasksFilter: tasksFilterReducer,
})

const ReduxStore = configureStore({
  reducer,
})

//  following https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
export type IReduxStore = ReturnType<typeof reducer>
export type AppDispatch = typeof ReduxStore.dispatch

export default ReduxStore
