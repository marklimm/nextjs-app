This is a statically-generated NextJS website that displays various types of "Star Wars" data!

The data is retrieved from various data sources:

- The **[Events](/events)** and **[Developer Blog](/devblog)** pages pull their data from local markdown (.md) files
- The **[Characters](/characters)** page pulls data from a local sqlite DB file using the Prisma ORM ([https://www.prisma.io/](https://www.prisma.io/))
- The **[Planets](/planets)** and **[Starships](/starships)** pages pull their data from the Star Wars API ([https://swapi.dev/](https://swapi.dev/))
- The **[Detention Block](/detentionBlock)** and **[Developer Blog](/devblog)** pages display the same piece of site-wide shared state via react context

**Technology stack:**

- NextJS (static site generation framework)
- React (javascript HTML rendering library :)
- Typescript (typing for javascript)
- Sass (CSS extension)
- Tailwind (CSS library)
- Prisma (typescript ORM)
- sqlite (embedded relational DB)
- the Star Wars API (a public API returning Star Wars relational data)

**Additional packages used:**

- date-fns (JS date formatting)
- gray-matter (parsing markdown front matter)
- remark (rendering markdown files as HTML)
- vaadin-date-picker (date picker web component)
