import { Prisma } from '@prisma/client'

//  define the Task type using the Prisma-generated Task type
export type Task = Prisma.TaskGetPayload<{
  include: {
    assignedTo: {
      select: {
        id: true
        firstName: true
        lastName: true
      }
    }
  }
}>

/**
 * The enum of "t-shirt sizes" representing the overall difficulty of a Task
 */
export enum TShirtSize {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
}
