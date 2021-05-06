import { Prisma } from '@prisma/client'

export type CharacterTerse = Prisma.Character

//  define the Character type using the Prisma-generated Character type
export type Character = Prisma.CharacterGetPayload<{
  include: {
    posts: true
    tags: true
    friends: {
      select: {
        id: true
        firstName: true
        lastName: true
      }
    }
  }
}>

export type CharacterTag = Prisma.CharacterTag
