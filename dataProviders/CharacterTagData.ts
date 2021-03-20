import { PrismaClient } from '@prisma/client'
import { CharacterTag } from 'lib/types/CharacterTag'

const prisma = new PrismaClient()

export const getCharacterTags = async (): Promise<CharacterTag[]> => {
  const tagResults = await prisma.tag.findMany({
    orderBy: [
      {
        name: 'asc',
      },
    ],
  })

  const tags = tagResults.map((tag) => {
    return {
      ...tag,
      createdAt: JSON.parse(JSON.stringify(tag.createdAt)),
      updatedAt: JSON.parse(JSON.stringify(tag.updatedAt)),
    }
  })

  return tags
}
