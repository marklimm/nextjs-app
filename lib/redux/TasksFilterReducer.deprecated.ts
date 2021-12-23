//  I'm no longer using this file but keeping this file as an example of a non-generic reducer that I was using for the Tasks Filter before switching to searchFilterReducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SelectOption } from 'lib/types/SelectOption'

import { IsCompletedFilter } from 'lib/types/Task'
import { TShirtSize } from 'lib/types/Task'

export interface TasksFilterState {
  assignee: {
    assigneeOptions: SelectOption[]
    selectedAssignees: SelectOption[]
  }
  completed: {
    completedStatusOptions: SelectOption[]
    selectedCompletedOption: SelectOption
  }
  title: {
    searchString: string
  }
  tShirtSize: {
    tShirtSizeOptions: SelectOption[]
    selectedTShirtSizes: SelectOption[]
  }
}

const allOption: SelectOption = {
  label: IsCompletedFilter.ALL.toString(),
  value: IsCompletedFilter.ALL,
}

const initialState: TasksFilterState = {
  assignee: {
    assigneeOptions: [],
    selectedAssignees: [],
  },
  completed: {
    completedStatusOptions: [
      allOption,
      {
        label: IsCompletedFilter.NOT_COMPLETED.toString(),
        value: IsCompletedFilter.NOT_COMPLETED,
      },
      {
        label: IsCompletedFilter.COMPLETED.toString(),
        value: IsCompletedFilter.COMPLETED,
      },
    ],
    selectedCompletedOption: allOption,
  },
  title: {
    searchString: '',
  },
  tShirtSize: {
    tShirtSizeOptions: [
      {
        label: TShirtSize[TShirtSize.SMALL],
        value: TShirtSize.SMALL.toString(),
      },
      {
        label: TShirtSize[TShirtSize.MEDIUM],
        value: TShirtSize.MEDIUM.toString(),
      },
      {
        label: TShirtSize[TShirtSize.LARGE],
        value: TShirtSize.LARGE.toString(),
      },
    ],
    selectedTShirtSizes: [],
  },
}

const tasksFilterSlice = createSlice({
  name: 'TasksFilters',
  initialState,
  reducers: {
    setAssigneeOptions(state, action: PayloadAction<SelectOption[]>) {
      state.assignee.assigneeOptions = action.payload
    },
    setSelectedAssignees(state, action: PayloadAction<SelectOption[]>) {
      state.assignee.selectedAssignees = action.payload
    },
    setCompleted(state, action: PayloadAction<SelectOption>) {
      state.completed.selectedCompletedOption = action.payload
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title.searchString = action.payload
    },
    setTShirtSizes(state, action: PayloadAction<SelectOption[]>) {
      state.tShirtSize.selectedTShirtSizes = action.payload
    },
  },
})

export const {
  setAssigneeOptions,
  setSelectedAssignees,
  setCompleted,
  setTitle,
  setTShirtSizes,
} = tasksFilterSlice.actions

export default tasksFilterSlice.reducer
