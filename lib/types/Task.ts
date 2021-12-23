import { Prisma } from '@prisma/client'
import { SelectOption } from './SelectOption'

//  define the Task type using the Prisma-generated Task type
export type Task = Prisma.TaskGetPayload<{
  include: {
    assignedTo: {
      select: {
        id: true
        firstName: true
        lastName: true
        imageUrl: true
      }
    }
  }
}>

/**
 * The search options when filtering by a Task's `isComplete` flag
 */
export enum IsCompletedFilter {
  ALL = 'All Tasks',
  COMPLETED = 'Completed',
  NOT_COMPLETED = 'Not Completed',
}

/**
 * The enum of "t-shirt sizes" representing the overall difficulty of a Task
 */
export enum TShirtSize {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
}

/**
 * Represents the initial completed status that shows "ALL" Tasks regardless of completion status
 */
export const allOption: SelectOption = {
  label: IsCompletedFilter.ALL.toString(),
  value: IsCompletedFilter.ALL,
}
