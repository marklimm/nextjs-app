import { PrismaClient } from '@prisma/client'
import { Task } from 'lib/types/Task'

const prisma = new PrismaClient()

export const getTasks = async (): Promise<Task[]> => {
  const taskResults = await prisma.task.findMany({
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
  })

  return taskResults
}
