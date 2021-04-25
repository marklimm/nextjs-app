import { PrismaClient } from '@prisma/client'
import { Task } from 'lib/types/Task'

const prisma = new PrismaClient()

interface GetTasksQueryParam {
  assigneeIds?: string
}

/**
 * This function queries the Task prisma model, based on the given filter criteria
 * @param param0
 * @returns
 */
export const getTasks = async ({
  assigneeIds,
}: GetTasksQueryParam): Promise<Task[]> => {
  //  this is the filter criteria if there are no filter conditions (this returns all tasks)
  let taskFilterCriteria = {
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

  if (assigneeIds) {
    //  user has chosen to filter by at least one assignee

    const assigneeORClause = {
      where: {
        OR: assigneeIds.split(',').map((aId) => {
          return {
            characterId: Number(aId),
          }
        }),
      },
    }

    taskFilterCriteria = {
      ...taskFilterCriteria,
      ...assigneeORClause,
    }
  }

  const taskResults = await prisma.task.findMany(taskFilterCriteria)

  return taskResults
}
