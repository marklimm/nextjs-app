import { NextApiRequest, NextApiResponse } from 'next'
import { Task } from 'lib/types/Task'
import { getTasks } from 'dataProviders/TaskData'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Task[]> => {
  if (req.method === 'GET') {
    //  when this route receives a GET request, retrieve the tasks from prisma and return them
    let tasks = []

    try {
      tasks = await getTasks(req.query)
      res.status(200).json({ tasks })
    } catch (error) {
      res.status(500).json({
        message: 'Server error attempting to retrieve the list of tasks',
      })
    }
  } else if (req.method === 'POST') {
    res.status(200).json({ status: 'success' })
  }
}

export default handler
