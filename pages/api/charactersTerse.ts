import { NextApiRequest, NextApiResponse } from 'next'
import { Character } from 'lib/types/Character'
import { getCharactersTerse } from 'dataProviders/CharacterData'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Character[]> => {
  if (req.method === 'GET') {
    //  when this route receives a GET request, retrieve the characters from prisma and return them
    const characters = await getCharactersTerse()
    res.status(200).json({ characters })

    return characters
  }
}

export default handler
