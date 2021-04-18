import { Prisma } from '@prisma/client'

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
