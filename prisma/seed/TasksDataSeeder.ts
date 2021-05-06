import { PrismaClient } from '@prisma/client'
import { CharacterTerse } from 'lib/types/Character'

export class TasksDataSeeder {
  private _prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this._prisma = prismaClient
  }

  disconnect = async (): Promise<void> => {
    await this._prisma.$disconnect()
  }

  seedTasks = async (characters: {
    [key: string]: CharacterTerse
  }): Promise<void> => {
    await this._prisma.task.create({
      data: {
        title: 'Find a fast ship',
        description:
          'We need to find a ship fast enough to get us off this rock',

        tShirtSize: 2,
        isComplete: false,
        assignedTo: {
          connect: { id: characters.luke.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title: 'Find who this Yoda is and ask him to train me',
        description: 'Ben said that I would find Yoda on the Dagobah system',

        tShirtSize: 2,
        isComplete: false,
        assignedTo: {
          connect: { id: characters.luke.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title: 'Repair the Falcon',
        description:
          'Needs repair: the landing gear, escape pod needs to be replaced, numerous scratches and burns',

        tShirtSize: 3,
        isComplete: true,
        assignedTo: {
          connect: { id: characters.han.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title:
          'Quickly find some place where I can stash the stolen data tapes!',
        description: 'Vader is coming, maybe I can stash them in a droid?',

        tShirtSize: 2,
        isComplete: true,
        assignedTo: {
          connect: { id: characters.leia.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title: 'Take Captain Solo to Jabba the Hut',
        description:
          'Now that Captain Solo is frozen in carbonite, I can deliver him to my client',

        tShirtSize: 1,
        isComplete: false,
        assignedTo: {
          connect: { id: characters.boba.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title:
          'Prove that the Death Star design has not been compromised in any way',
        description:
          'I need to do this to clear my name and receive a commendation from the Emperor',

        tShirtSize: 2,
        isComplete: false,
        assignedTo: {
          connect: { id: characters.krennic.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title: 'Win this pod race!',
        description: 'I need to win this pod race to win my freedom!',

        tShirtSize: 2,
        isComplete: true,
        assignedTo: {
          connect: { id: characters.anakin.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title: 'Track the Millennium Falcon',
        description:
          'Track the Falcon to find information leading to retrieving Skywalker',

        tShirtSize: 1,
        isComplete: true,
        assignedTo: {
          connect: { id: characters.boba.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title: 'Recover the stolen data tapes',
        description:
          'The rebels have infiltrated the data installation at Scarif and escaped with the Death Star plans.  Recover them immediately',

        tShirtSize: 3,
        isComplete: false,
        assignedTo: {
          connect: { id: characters.darth.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title:
          'Escort Han and his friends to a dinner where Vader and a garrison of storm troopers are waiting',
        description: 'Try to be as nonchalant and relaxed as possible',

        tShirtSize: 1,
        isComplete: false,
        assignedTo: {
          connect: { id: characters.lando.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title: 'Find a way out of this cell',
        description: "There's gotta be a way out of here ...",

        tShirtSize: 3,
        isComplete: true,
        assignedTo: {
          connect: { id: characters.leia.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title:
          'Recruit my old friend Galen Erso to complete work on the Death Star',
        description: "He'll agree, one way or another ...",

        tShirtSize: 2,
        isComplete: true,
        assignedTo: {
          connect: { id: characters.krennic.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title: 'Find the parts needed for our ship',
        description:
          'The Naboo ship was disable in the battle, find replacement parts',

        tShirtSize: 3,
        isComplete: false,
        assignedTo: {
          connect: { id: characters.quiGon.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title: "Analyze Anakin's midi-chlorian count",
        description: '',

        tShirtSize: 1,
        isComplete: true,

        assignedTo: {
          connect: { id: characters.quiGon.id },
        },
      },
    })

    await this._prisma.task.create({
      data: {
        title: 'Destroy the data installation at Scarif',
        description:
          'The data installation has been compromised, it must be eliminated, along with anyone near it ...',

        tShirtSize: 1,

        isComplete: false,
        assignedTo: {
          connect: { id: characters.tarkin.id },
        },
      },
    })

    console.log('Tasks have been seeded')
  }

  seedAllTaskData = async (characters: {
    [key: string]: CharacterTerse
  }): Promise<void> => {
    await this.seedTasks(characters)
  }
}
