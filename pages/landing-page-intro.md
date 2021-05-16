This is a statically-generated NextJS website that displays various types of "Star Wars" data!

The data is retrieved from various data sources:

- The **[Events](/events)** and **[Developer Blog](/devblog)** pages pull their data from local markdown (.md) files
- The **[Characters](/characters)** and **[Tasks](/tasks)** pages pull data from a local sqlite DB file using the Prisma ORM ([https://www.prisma.io/](https://www.prisma.io/))
- The **[Planets](/planets)** and **[Starships](/starships)** pages pull their data from the Star Wars API ([https://swapi.dev/](https://swapi.dev/)). See the **Pre-build step** below for additional details
- The **[Detention Block](/detentionBlock)** and **[Developer Blog](/devblog)** pages display the same piece of site-wide shared state via react context
- The **[SSR](/ssr)** page retrieves reddit posts from the reddit API

**Technology stack:**

- NextJS (static site generation framework)
- React (javascript HTML rendering library :)
- Typescript (typing for javascript)
- Sass (CSS extension)
- Tailwind (CSS library)
- headless UI (unstyled JS components that integrate with tailwind)
- Prisma (typescript ORM)
- postgresql (relational DB)
- eslint (javascript code linting)
- Prettier (opinionated code style formatting)
- the Star Wars API (a public API returning Star Wars relational data)
- redux (state management library)

**Additional packages used:**

- date-fns (JS date formatting)
- gray-matter (parsing markdown front matter)
- remark (rendering markdown files as HTML)
- ts-node (allows nodeJS to execute typescript files)
- vaadin-date-picker (date picker web component)

**Pre-build step:**

Records in the Star Wars API come with various types of related data. For example, each Planet has an array of "residents/people" and an array of "films" associated with that Planet. As you can imagine, populating this related data for all 60 planets in the SWAPI adds to the build time.

In order to avoid this extra build time, I have a pre-build script (`npm run fetch-swapi-data`) that fetch()-s data from the Star Wars API and writes it out to local JSON files. Then during the build step these JSON files are parsed, instead of having to make 10-15 fetch()-s out to the Star Wars API

**Code Linting:**

Code linting is done with the `eslint:recommended`, react recommended and typescript recommended rules.  Prettier is also used with a few custom rule changes