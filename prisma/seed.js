// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CharactersDataSeeder } = require('./seed/CharactersDataSeeder')

//  immediately execute this main() function
;(async function main() {
  const characterDataSeeder = new CharactersDataSeeder()
  try {
    await characterDataSeeder.seedAllCharacterData()
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await characterDataSeeder.disconnect()
  }
})()
