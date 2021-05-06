import { CharactersDataSeeder } from './seed/CharactersDataSeeder'
import { TasksDataSeeder } from './seed/TasksDataSeeder'

import { PrismaClient } from '@prisma/client'

//  immediately execute this main() function
;(async function main() {
  const prismaClient = new PrismaClient()

  const charactersDataSeeder = new CharactersDataSeeder(prismaClient)
  const tasksDataSeeder = new TasksDataSeeder(prismaClient)

  try {
    const { characters } = await charactersDataSeeder.seedAllCharacterData()

    await tasksDataSeeder.seedAllTaskData(characters)
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await charactersDataSeeder.disconnect()
    await tasksDataSeeder.disconnect()
  }
})()
