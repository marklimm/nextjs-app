import { NextApiRequest, NextApiResponse } from 'next'
import { getCharactersTerse } from 'dataProviders/CharacterData'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    let characters = []

    try {
      //  when this route receives a GET request, retrieve the characters from prisma and return them
      characters = await getCharactersTerse()

      res.status(200).json({ characters })
    } catch (error) {
      res.status(500).json({
        message:
          'Server error attempting to retrieve the list of characters: ' +
          error,
      })
    }
  }
}

export default handler
