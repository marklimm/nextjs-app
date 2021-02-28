import { Prisma } from '@prisma/client'

//  define the Person type using the Prisma-generated Person type
export type Person = Prisma.PersonGetPayload<{
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
