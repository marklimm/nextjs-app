import { PrismaClient } from '@prisma/client'
import { CharacterTag, CharacterTerse } from 'lib/types/Character'

/**
 * This class contains the scripts for populating the Character, CharacterTag and CharacterPost prisma DB tables with Star Wars data!
 */
export class CharactersDataSeeder {
  private _prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this._prisma = prismaClient
  }

  disconnect = async (): Promise<void> => {
    await this._prisma.$disconnect()
  }

  private createFriendshipRelation = async (
    characterA: CharacterTerse,
    characterB: CharacterTerse
  ): Promise<void> => {
    //  we define the friendship links.  Friends is a self-relation on the Characters table, this can't be mapped like how the CharacterTags many-to-many relationship was done
    //  we have to map both sides of the friendship

    await this._prisma.character.update({
      where: {
        id: characterA.id,
      },
      data: {
        friends: {
          connect: [{ id: characterB.id }],
        },
      },
    })

    await this._prisma.character.update({
      where: {
        id: characterB.id,
      },
      data: {
        friends: {
          connect: [{ id: characterA.id }],
        },
      },
    })
  }

  /**
   * Populate the database with the Star Wars characters
   */
  private seedCharacters = async (characterTags: {
    [key: string]: CharacterTag
  }): Promise<{ [key: string]: CharacterTerse }> => {
    //  this didn't work for me, conflict with the where: { name: 'Jedi' } and the `name` field not being available
    // const jedi = await this._prisma.characterTag.upsert({
    //   where: { name: 'Jedi' },
    //   update: {},
    //   create: {
    //     name: 'Jedi',
    //     description:
    //       'A Jedi was a devotee to the ways of the Jedi Order, an ancient order of protectors united by their ability to harness the power of the Force. Adhering to a doctrine that favored the light side of the Force, the Jedi aspired to attain a state of inner tranquility through calmness and meditation while avoiding emotions affiliated with the dark side of the Force, such as anger and hatred. Nevertheless, Jedi philosophy did not forbid a Jedi from acting in self-defense or in the defense of others. To that end, the weapon of a Jedi was the lightsaber, a blade composed of pure energy and different colors such as blue, green, purple or yellow.',
    //   },
    // })

    const luke = await this._prisma.character.create({
      data: {
        firstName: 'Luke',
        lastName: 'Skywalker',
        bio: 'Luke Skywalker, a Force-sensitive human male, was a legendary Jedi Master who fought in the Galactic Civil War during the reign of the Galactic Empire. Along with his companions, Princess Leia Organa and General Han Solo, Skywalker served on the side of the Alliance to Restore the Republic???an organization committed to the downfall of the Galactic Empire and the restoration of democracy. Following the war, Skywalker became a living legend, and was remembered as one of the greatest Jedi in galactic history.',
        tags: {
          connect: [{ id: characterTags['Jedi'].id }],
        },
        imageUrl: 'luke.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, running for my life on the Death Star ...',
            },
            {
              body: 'So there I was, knee deep in sand without a soul in sight ...',
            },
            {
              body: 'So there I was, in the middle of a wretched bar trying to pass for a regular ...',
            },
          ],
        },
      },
    })

    const han = await this._prisma.character.create({
      data: {
        firstName: 'Han',
        lastName: 'Solo',
        bio: 'Han Solo, known only as Han until being given the surname Solo by an Imperial recruitment officer, and formerly known as Cadet 124-329 while serving as an Imperial cadet, was a human male smuggler. He became a leader in the Alliance to Restore the Republic and an instrumental figure in the defeat of the Galactic Empire during the Galactic Civil War. He hailed from Corellia and became a smuggler, even completing the Kessel Run in just twelve parsecs with his prized ship, the Millennium Falcon, and coming under the employ of Jabba the Hutt. He was the son-in-law of fallen Jedi Knight Anakin Skywalker and Senator Padm?? Amidala, husband of Princess Leia Organa, brother-in-law of Jedi Master Luke Skywalker, father of Ben Solo, rivals and close friends with fellow smuggler Lando Calrissian, and best friends with the Wookiee Chewbacca, his trusted copilot who swore a life debt to the Corellian smuggler.',
        tags: {
          connect: [{ id: characterTags['Scoundrel'].id }],
        },
        imageUrl: 'han.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, loading up the Falcon and trying to put all this behind me ...',
            },
            {
              body: 'So there I was, waist-high in Imperial garbage and waste ...',
            },
          ],
        },
      },
    })

    const leia = await this._prisma.character.create({
      data: {
        firstName: 'Leia',
        lastName: 'Organa',
        bio: 'Leia Skywalker Organa Solo was a Force-sensitive human female political and military leader who served in the Alliance to Restore the Republic during the Imperial Era and the New Republic and Resistance in the subsequent New Republic Era. Adopted into the House of Organa, the Alderaanian royal family, she was Princess Leia Organa of Alderaan, a planet in the Core Worlds known for its dedication to pacifism. The princess was raised as the daughter of Senator Bail Organa and his wife, Queen Breha Organa, making her the heir to the Alderaanian monarchy. Instilled with the values of her adopted homeworld, Organa devoted her life to the restoration of democracy by opposing authoritarian regimes such as the Galactic Empire and the First Order.',
        tags: {
          connect: [{ id: characterTags['Rebel Alliance'].id }],
        },
        imageUrl: 'leia.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, locked in a 8x12 cell and waiting to be interrogated ...',
            },
          ],
        },
      },
    })

    const chewbecca = await this._prisma.character.create({
      data: {
        firstName: 'Chewbecca',
        lastName: '',
        bio: "Chewbacca, known affectionately to his friends as Chewie, was a Wookiee male warrior, smuggler, mechanic, pilot, and resistance fighter who fought in the Clone Wars, the Galactic Civil War, and the conflict and subsequent war between the First Order and the Resistance. He hailed from the planet Kashyyyk and became a Wookiee military leader. During the Clone Wars, he was captured by Trandoshan slavers and held captive on Wasskah, but he worked with a fellow captive, Jedi Commander Ahsoka Tano, to escape. He later commanded Wookiee forces during the Battle of Kashyyyk alongside the Grand Army of the Republic, led by Jedi Master Yoda. During the battle, one of the last ones of the war, Yoda's clone troopers received Order 66 from Supreme Chancellor Palpatine and, with the help of Chewbacca and his fellow Wookiee Tarfful, Yoda escaped Kashyyyk and the destruction of the Jedi Order.",
        tags: {
          connect: [{ id: characterTags['Wookie'].id }],
        },
        imageUrl: 'chewbecca.jpg',
        posts: {
          create: [
            {
              body: 'Rowr ahragh awf ahraroww rowh rohngr grgrff rf rf ...',
            },
          ],
        },
      },
    })

    const lando = await this._prisma.character.create({
      data: {
        firstName: 'Lando',
        lastName: 'Calrissian',
        bio: 'Lando Calrissian was a Human male professional gambler, entrepreneur, smuggler, and general throughout various points in his life. Born on Socorro, he became a gambler and con man early in his life and acquired his own ship, the Millennium Falcon, in a game of sabacc with a man named Cix Trouvee. He went on to have numerous adventures with the Falcon and its piloting droid, Vuffi Raa, during which he ran afoul of a Sorcerer of Tund named Rokur Gepta, whom Calrissian eventually killed. After a series of events led to him losing the Millennium Falcon to a Corellian named Han Solo on Bespin, Calrissian eventually became the Baron Administrator of Cloud City for a time???a position he once again gained through sabacc.',
        tags: {
          connect: [{ id: characterTags['Scoundrel'].id }],
        },
        imageUrl: 'lando.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, having just made a deal with the Dark Lord and now having to face my old friend ...',
            },
            {
              body: "So there I was, in the middle of Jabba's palace ...",
            },
          ],
        },
      },
    })

    const boba = await this._prisma.character.create({
      data: {
        firstName: 'Boba',
        lastName: 'Fett',
        bio: 'Boba Fett, an unaltered clone of the famous Mandalorian bounty hunter Jango Fett, was a human male bounty hunter whose career spanned decades, from the fall of the Galactic Republic to the rise of the Galactic Empire. Fett emulated his genetic donor, whom he regarded as his father, by wearing a customized suit of Mandalorian armor. His personal starship was the Slave I, a Firespray-31-class patrol and attack craft that once belonged to Jango. Trained in combat and martial skills from a young age, Fett was one of the most feared bounty hunters in the galaxy during the reign of Emperor Palpatine. He became a legend over the course of his career, which included contracts for both the Empire and the extensive criminal underworld',
        tags: {
          connect: [{ id: characterTags['Mandalorian'].id }],
        },
        imageUrl: 'boba-fett.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, Captain Solo in tow and en route to my client ...',
            },
            {
              body: 'So there I was, armorless and about as good as dead in the Tatooine sand ...',
            },
          ],
        },
      },
    })

    const obiWan = await this._prisma.character.create({
      data: {
        firstName: 'Obi-wan',
        lastName: 'Kenobi',
        bio: 'Obi-Wan Kenobi was a Force-sensitive legendary human male Jedi Master who served on the Jedi High Council during the last years of the Republic Era. During the Imperial Era, he adopted the alias Ben Kenobi in order to hide from the regime that drove the Jedi to near extinction. A noble man known for his skills with the Force, Kenobi trained Anakin Skywalker, served as a Jedi General in the Grand Army of the Republic, and became a mentor to Luke Skywalker prior to his death in 0 BBY.',
        tags: {
          connect: [
            { id: characterTags['Jedi'].id },
            { id: characterTags['Clone Wars'].id },
          ],
        },
        imageUrl: 'obi-wan.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, in the midst of the most wretched hive of scum and villainy ...',
            },
          ],
        },
      },
    })

    const vader = await this._prisma.character.create({
      data: {
        firstName: 'Darth',
        lastName: 'Vader',
        bio: 'Darth Vader is a fictional character in the Star Wars franchise. The character is a primary antagonist in the original trilogy and a primary protagonist in the prequel trilogy. Star Wars creator George Lucas has collectively referred to the first six episodic films of the franchise as "the tragedy of Darth Vader".[3]  Originally a slave on Tatooine, Anakin Skywalker is a Jedi prophesied to bring balance to the Force. He is lured to the dark side of the Force by Palpatine and becomes a Sith lord. After a lightsaber battle with his former mentor Obi-Wan Kenobi, in which he is severely injured, Vader is transformed into a cyborg. He then serves the Galactic Empire as its chief enforcer until he ultimately redeems himself by saving his son, Luke Skywalker, and killing Palpatine, sacrificing his own life in the process.[4] He is also the secret husband of Padm?? Amidala, father of Princess Leia, and grandfather of Kylo Ren.',
        tags: {
          connect: [{ id: characterTags['Sith'].id }],
        },
        imageUrl: 'darth.webp',
        posts: {
          create: [
            {
              body: 'So there I was, desperately needing to recover those stolen data tapes ...',
            },
            {
              body: 'So there I was, not sure if the dreams about Padme were true ...',
            },
          ],
        },
      },
    })

    const tarkin = await this._prisma.character.create({
      data: {
        firstName: 'Wilhuff',
        lastName: 'Tarkin',
        bio: "Wilhuff Tarkin was a human male politician, bureaucrat, and military officer whose career spanned the Fall of the Republic and the Age of the Empire. Born on the planet Eriadu in 64 BBY, he was a member of the Tarkin family and the great-nephew of Jova Tarkin. During the Republic Era, Tarkin served in the Galactic Republic's Judicial Department for a time before returning to his homeworld as the Governor of Eriadu. When the Clone Wars began, he renewed his military service, becoming a commissioned officer in the Republic Navy. ",
        tags: {
          connect: [{ id: characterTags['Imperial Officer'].id }],
        },
        imageUrl: 'tarkin.jpg',
        posts: {
          create: [
            {
              body: "So there I was, at my wit's end trying to discover the location of the hidden Rebel base ...",
            },
          ],
        },
      },
    })

    const krennic = await this._prisma.character.create({
      data: {
        firstName: 'Orson',
        lastName: 'Krennic',
        bio: "Orson Callan Krennic was a human male who served as Director of the Imperial Military Department of Advanced Weapons Research, which belonged to Imperial Intelligence and the Imperial Security Bureau during the Imperial Era. Additionally, he was the commander of the DS-1 Death Star Mobile Battle Station up to the beginning of the Galactic Civil War. Born on Lexrul during the Republic Era, fifty-one years before the Battle of Yavin, Krennic began his career as a Lieutenant Commander in the Galactic Republic. Following the Clone Wars he was promoted to commander and later the fleet equivalent of admiral upon the formation of the Galactic Empire. Persistent and ambitious, Krennic was responsible for the development and construction of the Empire's enormous Death Star superweapon. An old friend of crystallographer Galen Erso, Krennic manipulated the brilliant scientist into researching synthetic kyber crystals under the pretext of researching sustainable energy. In reality, Krennic weaponized Erso's crystal research for the battle station's planet-killing superlaser, hoping this would place him above his long-time rival Grand Moff Wilhuff Tarkin and win the favor of Emperor Palpatine. Krennic was also held accountable for security of the project, quelling rumors of the Empire's secret enterprise for the two decades of its assembly. For these many purposes he commanded a squad of death troopers, serving as both a sword and shield when the Director found himself in battle. ",
        tags: {
          connect: [{ id: characterTags['Imperial Officer'].id }],
        },
        imageUrl: 'krennic.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, somehow having been forced to explain myself to Tarkin ...',
            },
          ],
        },
      },
    })

    const quiGon = await this._prisma.character.create({
      data: {
        firstName: 'Qui-Gon',
        lastName: 'Jinn',
        bio: 'Qui-Gon Jinn, a Force-sensitive human male, was a venerable if maverick Jedi Master who lived during the last years of the Republic Era. He was a wise and well-respected member of the Jedi Order, and was offered a seat on the Jedi Council, but chose to reject and follow his own path. Adhering to a philosophy centered around the Living Force, Jinn strove to follow the will of the Force even when his actions conflicted with the wishes of the High Council. After encountering Anakin Skywalker, Jinn brought him to the Jedi Temple on Coruscant, convinced he had found the Chosen One. His dying wish was for Skywalker to become a Jedi and ultimately restore balance to the Force. ',
        tags: {
          connect: [{ id: characterTags['Jedi'].id }],
        },
        imageUrl: 'qui-gon.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, becoming increasingly frustrated with the needless bureaucracy of the Jedi Council ...',
            },
          ],
        },
      },
    })

    const threepio = await this._prisma.character.create({
      data: {
        firstName: 'C-3PO',
        lastName: '',
        bio: 'C-3PO, sometimes spelled See-Threepio and often referred to simply as Threepio, was a 3PO-series protocol droid designed to interact with organics, programmed primarily for etiquette and protocol. He was fluent in over six million forms of communication, and developed a fussy and worry-prone personality throughout his many decades of operation. Along with his counterpart, the astromech droid R2-D2, C-3PO constantly found himself directly involved in pivotal moments of galactic history, and aided in saving the galaxy on many occasions. ',
        tags: {
          connect: [{ id: characterTags['Droid'].id }],
        },
        imageUrl: 'threepio.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, trying to get a hold of Master Luke ...',
            },
          ],
        },
      },
    })

    const r2d2 = await this._prisma.character.create({
      data: {
        firstName: 'R2-D2',
        lastName: '',
        bio: 'R2-D2, pronounced Artoo-Deetoo and often referred to as R2 (Artoo), was an R2-series astromech droid manufactured by Industrial Automaton with masculine programming. A smart, spunky droid who would serve a multitude of masters over his lifetime, R2-D2 was never given a full memory wipe (apart from a partial wipe of select information by Cad Bane during the senate hostage crisis) nor did he ever receive new programming, with these factors resulting in an adventurous and independent attitude. Often finding himself in pivotal moments in galactic history, his bravery and ingenuity saved the galaxy on numerous occasions.',
        tags: {
          connect: [{ id: characterTags['Droid'].id }],
        },
        imageUrl: 'r2d2.jpg',
      },
    })

    const jyn = await this._prisma.character.create({
      data: {
        firstName: 'Jyn',
        lastName: 'Erso',
        bio: 'Jyn Erso, known by the aliases Kestrel Dawn, Jyn Dawn, Liana Hallik, Tanith Ponta, Lyra Rallik, and Nari McVee, was a human female soldier and former criminal who became a pivotal member of the Alliance to Restore the Republic when she led Rogue One in stealing the Death Star plans during the Battle of Scarif. She was the daughter of Lyra Erso, a devout member of the Church of the Force, and scientist Galen Erso, who was forced into helping the Galactic Empire build the Death Star. Erso\'s mother was killed when Director Orson Krennic, the commander of the Death Star project, kidnapped her father???who affectionately referred to his daughter as "Stardust." She was raised by resistance fighter Saw Gerrera and became a child soldier in his army.',
        tags: {
          connect: [{ id: characterTags['Rebel Alliance'].id }],
        },
        imageUrl: 'jyn.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, seeing my father for the first time in years ...',
            },
            {
              body: 'So there I was, with the Alliance deciding not to do anything ...',
            },
          ],
        },
      },
    })

    const maul = await this._prisma.character.create({
      data: {
        firstName: 'Darth',
        lastName: 'Maul',
        bio: 'Maul, once known as Darth Maul, was a Force-sensitive Dathomirian Zabrak male who established himself as a crime lord during the reign of the Galactic Empire. Once, however, he was the Sith apprentice of Darth Sidious, and therefore, a Dark Lord of the Sith. Having trained in the ways of the Force, Maul was a formidable warrior strong with the dark side and deadly skilled in lightsaber combat. In addition, he was a scheming mastermind who plotted his return to power despite losing his place in the ranks of the Sith.',
        tags: {
          connect: [{ id: characterTags['Sith'].id }],
        },
        imageUrl: 'maul.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, scouting the location of the Naboo ship ...',
            },
          ],
        },
      },
    })

    const yoda = await this._prisma.character.create({
      data: {
        firstName: 'Yoda',
        lastName: '',
        bio: 'Yoda, a Force-sensitive male being belonging to a mysterious species, was a legendary Jedi Master who witnessed the rise and fall of the Galactic Republic, followed by the rise of the Galactic Empire. Small in stature but revered for his wisdom and power, Yoda trained generations of Jedi, ultimately serving as the Grand Master of the Jedi Order. Having lived through nine centuries of galactic history, he played integral roles in the Clone Wars, the rebirth of the Jedi through Luke Skywalker, and unlocking the path to immortality. ',
        tags: {
          connect: [{ id: characterTags['Jedi'].id }],
        },
        imageUrl: 'yoda.jpg',
        posts: {
          create: [
            {
              body: 'There was I, being tried by young Skywalker my patience was...',
            },
          ],
        },
      },
    })

    const sidious = await this._prisma.character.create({
      data: {
        firstName: 'Darth',
        lastName: 'Sidious',
        bio: 'Darth Sidious, born Sheev Palpatine and also known simply as the Emperor, was a human male Dark Lord of the Sith and Emperor of the Galactic Empire, ruling from 19 BBY to 4 ABY. Rising to power in the Republic Senate as the senator of Naboo, the secretive Sith Lord cultivated two identities, Sidious and Palpatine, using both to further his political career. He orchestrated the fall of the Galactic Republic and the Jedi Order through the Clone Wars, and then established his reign over the galaxy which lasted until his death at the Battle of Endor. However, the dark side of the Force gave rise to powers which allowed the Emperor to return from the grave.',
        tags: {
          connect: [{ id: characterTags['Sith'].id }],
        },
        imageUrl: 'sidious.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, imploring young Anakin to allow me to help him ...',
            },
          ],
        },
      },
    })

    const qira = await this._prisma.character.create({
      data: {
        firstName: 'Qi-ra',
        lastName: '',
        bio: "Qi'ra was a human female from the planet Corellia who lived during the reign of the Galactic Empire. She grew up on the streets along with Han as part of the White Worms. Though they were at first rivals, the two Scrumrats eventually became lovers. Sometime after Qi'ra was made Head Girl by Lady Proxima, Han and Qi'ra attempted to escape with a vial of coaxium, but were separated at the Coronet Spaceport, with Han getting away, though he promised to return for her.",
        tags: {
          connect: [{ id: characterTags['Crimson Dawn'].id }],
        },
        imageUrl: 'qira.jpg',
        posts: {
          create: [
            {
              body: 'So there I was, confronted by my naive childhood friend ...',
            },
          ],
        },
      },
    })

    const jarjar = await this._prisma.character.create({
      data: {
        firstName: 'Jar Jar',
        lastName: 'Binks',
        bio: "Jar Jar Binks was a Gungan male military commander and politician who played a key role during the Invasion of Naboo and the Clone Wars that culminated in the fall of the Galactic Republic and the rise of the Galactic Empire. Once an outcast from Gungan society due to his clumsy behavior, he regained favor with his people by helping secure an alliance between the Gungan boss Rugor Nass and Queen Padm?? Amidala of Naboo, an alliance vital in ending the Trade Federation's invasion of their shared homeworld. In the years that followed, Binks became a Junior Representative for his people in the Galactic Senate, serving alongside Amidala once she became the planet's senator. ",
        tags: {
          connect: [{ id: characterTags['Gungan'].id }],
        },
        imageUrl: 'jar-jar.jpg',
      },
    })

    console.log('Characters have been seeded')

    await this.createFriendshipRelation(luke, han)
    await this.createFriendshipRelation(luke, leia)
    await this.createFriendshipRelation(han, leia)

    await this.createFriendshipRelation(luke, chewbecca)
    await this.createFriendshipRelation(han, chewbecca)
    await this.createFriendshipRelation(leia, chewbecca)

    await this.createFriendshipRelation(han, lando)
    await this.createFriendshipRelation(chewbecca, lando)

    await this.createFriendshipRelation(obiWan, quiGon)

    await this.createFriendshipRelation(luke, obiWan)

    await this.createFriendshipRelation(vader, tarkin)
    await this.createFriendshipRelation(tarkin, krennic)

    await this.createFriendshipRelation(luke, threepio)
    await this.createFriendshipRelation(luke, r2d2)
    await this.createFriendshipRelation(threepio, r2d2)

    await this.createFriendshipRelation(maul, qira)

    await this.createFriendshipRelation(luke, yoda)
    await this.createFriendshipRelation(obiWan, yoda)
    await this.createFriendshipRelation(quiGon, yoda)

    await this.createFriendshipRelation(vader, sidious)

    await this.createFriendshipRelation(han, qira)

    await this.createFriendshipRelation(quiGon, jarjar)

    console.log('Character friendships have been seeded')

    return {
      luke,
      han,
      leia,
      chewbecca,
      lando,
      boba,
      obiWan,
      vader,
      tarkin,
      krennic,
      quiGon,
      threepio,
      r2d2,
      jyn,
      maul,
      yoda,
      sidious,
      qira,
      jarjar,
    }
  }

  /**
   * Populate the database with all of the CharacterTags
   */
  private seedCharacterTags = async (): Promise<{
    [key: string]: CharacterTag
  }> => {
    const characterTagInsertPromises = [
      this._prisma.characterTag.create({
        data: {
          name: 'Jedi',
          description:
            'A Jedi was a devotee to the ways of the Jedi Order, an ancient order of protectors united by their ability to harness the power of the Force. Adhering to a doctrine that favored the light side of the Force, the Jedi aspired to attain a state of inner tranquility through calmness and meditation while avoiding emotions affiliated with the dark side of the Force, such as anger and hatred. Nevertheless, Jedi philosophy did not forbid a Jedi from acting in self-defense or in the defense of others. To that end, the weapon of a Jedi was the lightsaber, a blade composed of pure energy and different colors such as blue, green, purple or yellow.',
        },
      }),

      this._prisma.characterTag.create({
        data: {
          name: 'Scoundrel',
          description:
            'The term applied to types that lived outside the law by their own, often amoral, set of rules, or fought against the law. Scoundrels would typically employ bravado, trickery or cunning to accomplish tasks and many would not hesitate to lie, steal or cheat if the situation called for it.',
        },
      }),

      this._prisma.characterTag.create({
        data: {
          name: 'Wookie',
          description:
            "Wookiees were a species of tall, hairy humanoids that were native to the planet Kashyyyk. The most notable member of this species was the warrior Chewbacca, Han Solo's best friend and co-pilot, who played a vital role in the Clone Wars during the defense of Kashyyyk, the Galactic Civil War by aiding the Rebel Alliance in their fight against the Galactic Empire, and the war against the First Order. They were quite strong, and were known to rip people's arms out of their sockets when provoked. Though being from a temperate planet better known for its swamps and forests, they were able to be comfortable on icy worlds such as Ilum and Hoth without any protective clothing, including gloves and boots.",
        },
      }),

      this._prisma.characterTag.create({
        data: {
          name: 'Mandalorian',
          description:
            "The Mandalorians were a clan-based cultural group that was composed of members from multiple species all bound by a common culture, creed, and code. They originated on the planet Mandalore in the galaxy's Outer Rim Territories and had a particularly important role in galactic history as legendary warriors against the Jedi. From their homeworld, Mandalorians had flourished across Mandalorian Space and the galaxy at large, colonizing worlds such as Kalevala, Krownest, and Concord Dawn.",
        },
      }),

      this._prisma.characterTag.create({
        data: {
          name: 'Imperial Officer',
          description:
            'Imperial officers were individuals, predominantly human, who held a position of authority and responsibility in the military forces, and some civilian elements, of the Galactic Empire. When the Empire succeeded the Galactic Republic after the end of the Clone Wars, some officers were tasked with leading the stormtroopers, the troops of the new regime.',
        },
      }),

      this._prisma.characterTag.create({
        data: {
          name: 'Sith',
          description:
            "The Sith, also referred to as the Sith Order, was an ancient religious order of Force-wielders devoted to the dark side of the Force. Driven by their emotions, including hate, anger, and greed, the Sith were deceptive and obsessed with gaining power no matter the cost. The order reached the apex of its power under Darth Sidious, the Dark Lord of the Sith who achieved his order's goal of galactic conquest after a millennium of plotting. Within a generation, however, the deaths of Sidious and Darth Vader would mark the end of the order of Sith Lords.",
        },
      }),

      this._prisma.characterTag.create({
        data: {
          name: 'Rebel Alliance',
          description:
            "The Alliance to Restore the Republic (2 BBY???4 ABY), commonly known as the Rebel Alliance, Alliance, the Rebellion, and rarely the Separatists, was a resistance movement formed by Bail Organa and Mon Mothma to oppose the reign of the Galactic Empire. The Alliance was formed from a less organized movement to oppose the Empire that existed, which was secretly led by Organa. This early group came together from a number of rebel cells, including the crew of the Ghost and the Phoenix Cell. The Atrivis Resistance Group was one of the first cells to join what Mothma began calling 'the Alliance' before the formal formation of the Alliance to Restore the Republic. The Alliance was publicly and formally declared with the Declaration of the Rebel Alliance.",
        },
      }),

      this._prisma.characterTag.create({
        data: {
          name: 'Gungan',
          description:
            'Gungans were an amphibious sentient species and the native inhabitants of the planet Naboo. The various different Gungan races could live on both water and land, but often made their home in underwater cities such as Otoh Gunga. Physically, Gungans were tall humanoids with a flexible structure, strong leg muscles, strong bills, muscular tongues, and many other traits designed for living in the waters of Naboo. Gungans were also known to rarely leave Naboo.',
        },
      }),

      this._prisma.characterTag.create({
        data: {
          name: 'Clone Wars',
          description:
            "The Clone Wars (22???19 BBY), was a major, three-year war between the Galactic Republic and the Confederacy of Independent Systems. The war was named after the army of clone troopers used by the Republic against the Confederacy's battle droid army. With both being fielded in enormous numbers by each respective side, the Grand Army of the Republic and the Separatist Droid Army were two of the largest military forces in galactic history, and fighting between them swept through the galaxy upon the outbreak of war in 22 BBY.",
        },
      }),

      this._prisma.characterTag.create({
        data: {
          name: 'Droid',
          description:
            'Droids, less commonly known as robots and automatons, were mechanical beings that possessed artificial intelligence. They were used in a variety of roles and environments, often those considered too menial or too dangerous for other species, but also in fields that required extensive specialization and knowledge.',
        },
      }),

      this._prisma.characterTag.create({
        data: {
          name: 'Crimson Dawn',
          description:
            "Crimson Dawn was a criminal organization led by the former Sith Lord Maul, who employed the gangster Dryden Vos as the public face of the syndicate during the reign of the Galactic Empire. Crimson Dawn was based aboard Vos' yacht First Light. During its existence, Crimson Dawn quickly cemented a reputation for being ruthless. Qi'ra publicly served as Vos' top lieutenant, but later directly worked with Maul after killing Vos. ",
        },
      }),
    ]

    //  set the characterTags on this class so that it can be referenced from seedCharacters()
    const characterTagsArr = await Promise.all(characterTagInsertPromises)

    const characterTags = characterTagsArr.reduce((acc, tag) => {
      acc[tag.name] = tag
      return acc
    }, {})

    return characterTags
  }

  seedAllCharacterData = async (): Promise<{
    characters: { [key: string]: CharacterTerse }
    characterTags: { [key: string]: CharacterTag }
  }> => {
    const characterTags = await this.seedCharacterTags()
    const characters = await this.seedCharacters(characterTags)

    return {
      characters,
      characterTags,
    }
  }
}
