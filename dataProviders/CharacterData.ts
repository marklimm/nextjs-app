import { PrismaClient } from '@prisma/client'
import { Character } from 'lib/types/Character'

const prisma = new PrismaClient()

export const getCharacters = async (): Promise<Character[]> => {
  const characterResults = await prisma.character.findMany({
    orderBy: [
      {
        firstName: 'asc',
      },
      {
        lastName: 'asc',
      },
    ],
    include: {
      posts: {
        orderBy: {
          updatedAt: 'desc',
        },
      },
      tags: {
        orderBy: {
          name: 'asc',
        },
      },
      friends: {
        orderBy: [
          {
            firstName: 'asc',
          },
          {
            lastName: 'asc',
          },
        ],
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })

  //  format the prisma-generated createdAt/updatedAt fields.  This prevents an error from being thrown
  const characters = characterResults.map((p) => {
    return {
      ...p,
      posts: p.posts.map((t) => {
        return {
          ...t,
          createdAt: JSON.parse(JSON.stringify(t.createdAt)),
          updatedAt: JSON.parse(JSON.stringify(t.updatedAt)),
        }
      }),
      tags: p.tags.map((t) => {
        return {
          ...t,
          createdAt: JSON.parse(JSON.stringify(t.createdAt)),
          updatedAt: JSON.parse(JSON.stringify(t.updatedAt)),
        }
      }),
    }
  })

  return characters
}

/**
 * Retrieves the characters but only their id, first and last names
 * @returns
 */
export const getCharactersTerse = async (): Promise<Character[]> => {
  const characters = await prisma.character.findMany({
    orderBy: [
      {
        firstName: 'asc',
      },
      {
        lastName: 'asc',
      },
    ],
  })

  return characters
}

export const getCharacter = async (personId = ''): Promise<Character> => {
  const characterData = await prisma.character.findUnique({
    where: {
      id: Number(personId),
    },
    include: {
      posts: true,
      tags: {
        orderBy: {
          name: 'asc',
        },
      },
      friends: {
        orderBy: [
          {
            firstName: 'asc',
          },
          {
            lastName: 'asc',
          },
        ],
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })

  //  format the prisma-generated createdAt/updatedAt fields.  This prevents an error from being thrown
  return {
    ...characterData,
    posts: characterData.posts.map((t) => {
      return {
        ...t,
        createdAt: JSON.parse(JSON.stringify(t.createdAt)),
        updatedAt: JSON.parse(JSON.stringify(t.updatedAt)),
      }
    }),
    tags: characterData.tags.map((t) => {
      return {
        ...t,
        createdAt: JSON.parse(JSON.stringify(t.createdAt)),
        updatedAt: JSON.parse(JSON.stringify(t.updatedAt)),
      }
    }),
  }
}
