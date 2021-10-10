import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SelectOption } from 'lib/types/SelectOption'

import { IsCompletedFilter } from 'lib/types/Task'
import { TShirtSize } from 'lib/types/Task'

export interface TasksFilterState {
  assignee: {
    options: SelectOption[]
    selectedAssignees: SelectOption[]
  }
  completed: {
    options: SelectOption[]
    selectedOption: SelectOption
  }
  title: {
    searchString: string
  }
  tShirtSize: {
    options: SelectOption[]
    selectedTShirtSizes: SelectOption[]
  }
}

const allOption = {
  label: IsCompletedFilter.ALL.toString(),
  value: IsCompletedFilter.ALL,
}

const initialState: TasksFilterState = {
  assignee: {
    options: [],
    selectedAssignees: [],
  },
  completed: {
    options: [
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
    selectedOption: allOption,
  },
  title: {
    searchString: '',
  },
  tShirtSize: {
    options: [
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
    setCompleted(state, action: PayloadAction<SelectOption>) {
      state.completed.selectedOption = action.payload
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title.searchString = action.payload
    },
    setTShirtSizes(state, action: PayloadAction<SelectOption>) {
      state.tShirtSize.selectedTShirtSizes = action.payload
    },
  },
})

export const {
  setCompleted,
  setTitle,
  setTShirtSizes,
} = tasksFilterSlice.actions

export default tasksFilterSlice.reducer
