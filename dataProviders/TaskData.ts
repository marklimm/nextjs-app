import { Prisma, PrismaClient } from '@prisma/client'
import { Task } from 'lib/types/Task'

const prisma = new PrismaClient()

interface GetTasksQueryParam {
  assigneeIds?: string
  showCompleted?: string
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
  showCompleted,
  title,
  tShirtSizeIds,
}: GetTasksQueryParam): Promise<Task[]> => {
  console.log('in getTasks', assigneeIds, title, tShirtSizeIds)
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

  if (showCompleted === 'true') {
    //  user has chosen to only show the completed tasks

    whereClauses.push({
      isComplete: true,
    })
  }

  console.log('whereClauses', whereClauses)

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

  console.log('taskFilterCriteria', taskFilterCriteria)

  const taskResults = await prisma.task.findMany(taskFilterCriteria)

  return taskResults as Task[]
}
