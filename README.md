### This is a statically-generated NextJS website that demonstrates various NextJS features

The website can be seen at [https://nextjs-app-rust.vercel.app](https://nextjs-app-rust.vercel.app)

Read more about this project on the **[About](https://nextjs-app-rust.vercel.app/about)** page!

Pages on this website include:

- The **[Events](https://nextjs-app-rust.vercel.app/events)** and **[Developer Blog](https://nextjs-app-rust.vercel.app/devblog)** pages that pull their data from local markdown (.md) files
- The **[Characters](https://nextjs-app-rust.vercel.app/characters)** and **[Tasks](https://nextjs-app-rust.vercel.app/tasks)** pages that pull data from a hosted postgres database using the Prisma ORM ([https://www.prisma.io/](https://www.prisma.io/))
- The **[Planets](/https://nextjs-app-rust.vercel.appplanets)** and **[Starships](https://nextjs-app-rust.vercel.app/starships)** pages that pull their data from the Star Wars API ([https://swapi.dev/](https://swapi.dev/)). See the **Pre-build step** below for additional details
- The **[Detention Block](https://nextjs-app-rust.vercel.app/detentionBlock)** and **[Developer Blog](https://nextjs-app-rust.vercel.app/devblog)** pages that display the same piece of site-wide shared state via react context
- The **[SSR](https://nextjs-app-rust.vercel.app/ssr)** page that retrieves reddit posts from the reddit API

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
- reduxjs toolkit (redux state management library)

**Additional packages used:**

- date-fns (JS date formatting)
- gray-matter (parsing markdown front matter)
- react-toastify (toastrs to display messages to the user)
- remark (rendering markdown files as HTML)
- ts-node (allows nodeJS to execute typescript files)
- vaadin-date-picker (date picker web component)

**Pre-build step:**

Records in the Star Wars API come with various types of related data. For example, each Planet has an array of "residents/people" and an array of "films" associated with that Planet. As you can imagine, populating this related data for all 60 planets in the SWAPI adds to the build time.

In order to avoid this extra build time, I have a pre-build script (`npm run fetch-swapi-data`) that fetch()-s data from the Star Wars API and writes it out to local JSON files. Then during the build step these JSON files are parsed, instead of having to make 10-15 fetch()-s out to the Star Wars API

**Code Linting:**

Code linting is done with the `eslint:recommended`, react recommended and typescript recommended rules. Prettier is also used with a few custom rule changes

**Deployment:**

This website is deployed on vercel
