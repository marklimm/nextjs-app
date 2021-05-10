//  following this example https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/lib/prisma.ts and https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices to avoid calling `new PrismaClient()` too many times and "exhausting my database connection limit"

import { PrismaClient } from '@prisma/client'

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

if (process.env.NODE_ENV === 'production') {
  global.prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
}
export default global.prisma
