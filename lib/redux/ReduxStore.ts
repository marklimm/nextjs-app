import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import tasksFilterReducer, {
  TasksFilterState,
} from './search/TasksFilterReducer'

const reducer = combineReducers({
  tasksFilter: tasksFilterReducer,
})

const ReduxStore = configureStore({
  reducer,
})

export interface IReduxStore {
  tasksFilter: TasksFilterState
}

export default ReduxStore
