import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getPeople = async () => {
  const peopleResults = await prisma.person.findMany({
    orderBy: [
      {
        firstName: 'asc'
      },
      {
        lastName: 'asc'
      }
    ],
    include: {
      posts: {
        orderBy: {
          updatedAt: 'desc'
        }
      },
      tags: {
        orderBy: {
          name: 'asc'
        }
      },
      friends: {
        orderBy: [
          {
            firstName: 'asc'
          },
          {
            lastName: 'asc'
          }
        ],
        select: {
          id: true,
          firstName: true,
          lastName: true
        }
      }
    }
  })

  //  format the prisma-generated createdAt/updatedAt fields.  This prevents an error from being thrown
  const people = peopleResults.map(p => {
    return {
      ...p,
      posts: p.posts.map(t => {
        return {
          ...t,
          createdAt: JSON.parse(JSON.stringify(t.createdAt)),
          updatedAt: JSON.parse(JSON.stringify(t.updatedAt))
        }
      }),
      tags: p.tags.map(t => {
        return {
          ...t,
          createdAt: JSON.parse(JSON.stringify(t.createdAt)),
          updatedAt: JSON.parse(JSON.stringify(t.updatedAt))
        }
      })
    }
  })

  return people
}

export const getPerson = async (personId = '') => {
  const personData = await prisma.person.findUnique({
    where: {
      id: Number(personId)
    },
    include: {
      posts: true,
      tags: {
        orderBy: {
          name: 'asc'
        }
      },
      friends: {
        orderBy: [
          {
            firstName: 'asc'
          },
          {
            lastName: 'asc'
          }
        ],
        select: {
          id: true,
          firstName: true,
          lastName: true
        }
      }
    }
  })

  //  format the prisma-generated createdAt/updatedAt fields.  This prevents an error from being thrown
  return {
    ...personData,
    posts: personData.posts.map(t => {
      return {
        ...t,
        createdAt: JSON.parse(JSON.stringify(t.createdAt)),
        updatedAt: JSON.parse(JSON.stringify(t.updatedAt))
      }
    }),
    tags: personData.tags.map(t => {
      return {
        ...t,
        createdAt: JSON.parse(JSON.stringify(t.createdAt)),
        updatedAt: JSON.parse(JSON.stringify(t.updatedAt))
      }
    })
  }
}
