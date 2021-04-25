import { Prisma, PrismaClient } from '@prisma/client'
import { Task } from 'lib/types/Task'

const prisma = new PrismaClient()

interface GetTasksQueryParam {
  assigneeIds?: string
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

  if (title) {
    //  user has chosen to filter by title

    const titleClause = {
      title: {
        contains: title,
        mode: 'insensitive',
      },
    }

    whereClauses.push(titleClause)
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
