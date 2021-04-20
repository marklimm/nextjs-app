// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CharactersDataSeeder } = require('./seed/CharactersDataSeeder.js')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')

//  immediately execute this main() function
;(async function main() {
  const prismaClient = new PrismaClient()

  const characterDataSeeder = new CharactersDataSeeder(prismaClient)

  try {
    await characterDataSeeder.seedAllCharacterData()
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await characterDataSeeder.disconnect()
  }
})()
