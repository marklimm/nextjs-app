import { PrismaClient } from '@prisma/client'

import { CharactersDataSeeder } from './seed/CharactersDataSeeder'
import { TasksDataSeeder } from './seed/TasksDataSeeder'

//  immediately execute this main() function
;(async function main() {
  const prisma = new PrismaClient()

  const charactersDataSeeder = new CharactersDataSeeder(prisma)
  const tasksDataSeeder = new TasksDataSeeder(prisma)

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
