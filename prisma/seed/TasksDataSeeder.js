class TasksDataSeeder {
  constructor(prismaClient) {
    this.prisma = prismaClient
  }

  seedTasks = async (characters) => {
    await this.prisma.task.create({
      data: {
        title: 'Find a fast ship',
        description:
          'We need to find a ship fast enough to get us off this rock',

        tShirtSize: 2,
        assignedTo: {
          connect: { id: characters.luke.id },
        },
      },
    })

    await this.prisma.task.create({
      data: {
        title: 'Find who this Yoda is and ask him to train me',
        description: 'Ben said that I would find Yoda on the Dagobah system',

        tShirtSize: 2,
        assignedTo: {
          connect: { id: characters.luke.id },
        },
      },
    })

    await this.prisma.task.create({
      data: {
        title: 'Repair the Falcon',
        description:
          'Needs repair: the landing gear, escape pod needs to be replaced, numerous scratches and burns',

        tShirtSize: 3,
        assignedTo: {
          connect: { id: characters.han.id },
        },
      },
    })

    await this.prisma.task.create({
      data: {
        title:
          'Quickly find some place where I can stash the stolen data tapes!',
        description: 'Vader is coming, maybe I can stash them in a droid?',

        tShirtSize: 2,
        assignedTo: {
          connect: { id: characters.leia.id },
        },
      },
    })

    await this.prisma.task.create({
      data: {
        title: 'Take Captain Solo to Jabba the Hut',
        description:
          'Now that Captain Solo is frozen in carbonite, I can deliver him to my client',

        tShirtSize: 1,
        assignedTo: {
          connect: { id: characters.boba.id },
        },
      },
    })

    await this.prisma.task.create({
      data: {
        title:
          'Prove that the Death Star design has not been compromised in any way',
        description:
          'I need to do this to clear my name and receive a commendation from the Emperor',

        tShirtSize: 2,
        assignedTo: {
          connect: { id: characters.krennic.id },
        },
      },
    })

    console.log('Tasks have been seeded')
  }

  seedAllTaskData = async (characters) => {
    const tasks = await this.seedTasks(characters)

    return {
      tasks,
    }
  }
}

module.exports = {
  TasksDataSeeder,
}
