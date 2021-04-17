import { NextApiRequest, NextApiResponse } from 'next'

const writingPrompts = [
  {
    id: 1,
    text:
      "Freezing cold out there but I have to go rescue my friend who's out there in it",
  },
  {
    id: 2,
    text: 'So I can drive a speeder, does that mean I can pilot an X-Wing?',
  },
  {
    id: 3,
    text: "I need your help Luke, I'm too old for this",
  },
  {
    id: 4,
    text: "They're about to find me, where can I stash these data tapes?",
  },
]

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'GET') {
    res.status(200).json({ writingPrompts })
  } else if (req.method === 'POST') {
    console.log('req.body', req.body)
    res.status(200).json({ status: 'success' })
  }
}

export default handler
