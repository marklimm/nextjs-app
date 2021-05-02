import { NextApiRequest, NextApiResponse } from 'next'
import { Task } from 'lib/types/Task'
import { getTasks } from 'dataProviders/TaskData'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Task[]> => {
  if (req.method === 'GET') {
    //  when this route receives a GET request, retrieve the tasks from prisma and return them
    const tasks = await getTasks(req.query)
    res.status(200).json({ tasks })

    return tasks
  } else if (req.method === 'POST') {
    res.status(200).json({ status: 'success' })

    return []
  }
}

export default handler
