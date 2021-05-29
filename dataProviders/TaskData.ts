import { Prisma } from '@prisma/client'
import prisma from './prisma'

import { Task } from 'lib/types/Task'

interface GetTasksQueryParam {
  assigneeIds?: string
  completedFlag?: string
  title?: string
  tShirtSizeIds?: string
}

/**
 * This function queries the Task prisma model, based on the given filter criteria
 * @param param0
 * @returns
 */
export const getTasks = async ({
  assigneeIds,
  completedFlag,
  title,
  tShirtSizeIds,
}: GetTasksQueryParam): Promise<Task[]> => {
  //  this is the filter criteria if there are no filter conditions (this returns all tasks)
  let taskFilterCriteria: Prisma.TaskFindManyArgs = {
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
    include: {
      assignedTo: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          imageUrl: true,
        },
      },
    },
  }

  const whereClauses = []

  if (assigneeIds) {
    //  user has chosen to filter by at least one assignee

    whereClauses.push({
      characterId: { in: assigneeIds.split(',').map((aId) => Number(aId)) },
    })
  }

  if (tShirtSizeIds) {
    //  user has chosen to filter by at least one t-shirt size

    whereClauses.push({
      tShirtSize: { in: tShirtSizeIds.split(',').map((tId) => Number(tId)) },
    })
  }

  if (title && title.length > 3) {
    //  user has chosen to filter by title
    //  don't start searching by title until the user has provided at least 4 characters to search on

    const titleClause = {
      title: {
        contains: title,
      },
    }

    whereClauses.push(titleClause)
  }

  if (completedFlag) {
    //  user has chosen to filter for tasks that are either completed or not completed

    whereClauses.push({
      isComplete: completedFlag.toLowerCase() === 'completed' ? true : false,
    })
  }

  if (whereClauses.length > 0) {
    const whereClause = whereClauses.reduce(
      (tempWhereClause, whereClause) => ({
        ...tempWhereClause,
        ...whereClause,
      }),
      {}
    )

    taskFilterCriteria = {
      ...taskFilterCriteria,
      ...{
        where: whereClause,
      },
    }
  }

  const taskResults = await prisma.task.findMany(taskFilterCriteria)

  return taskResults as Task[]
}
