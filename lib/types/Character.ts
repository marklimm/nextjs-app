import {
  Prisma,
  Character as PrismaCharacter,
  CharacterTag as PrismaCharacterTag,
} from '@prisma/client'

export type CharacterTerse = PrismaCharacter

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

export type CharacterTag = PrismaCharacterTag
