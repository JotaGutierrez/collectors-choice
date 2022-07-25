# Lotion, the dumb cousin
Example of a TypeScript application following Domain-Driven Design (DDD) principles.

## Getting Started

### Docker
The app is ready to run in docker containers:

```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### CLI

> If you choose to launch the app in a terminal, you need a mongobd instance running a database named "lotion" and update all database connections along the next api controllers (this is not parametrized yet).

First, install dependencies:

```bash
sh ./etc/bash/start-next-ui.sh install
```

Run dev server:

```bash
sh ./etc/bash/start-next-ui.sh dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Arquitecture

The idea behind this repo (and clean arquitectures in general) is to isolate model and bussines rules from the apps that may use them. In this particular case, we have

    - src/Core - contains all the entities in Core context with domain, application and infrastructure directories.
    - src/App/UI/Next - Frontend app made with [Next.js](https://nextjs.org/)

Ideally, this should run as two different apps connected via API, but, given that this is a personal project, this is done through Next internal api:

    - src/App/UI/Next/pages/api - contains all the operations needed to create the frontend, making direct use of application and infrastructure services.

All the rest Next related code is isolated from Core. So, we have:
    - Next <--> api <--> Core
being api the "glue" between front and back.

## Learn More

To learn more about clean arquitectures, DDD and so on, take a look at the following resources:

- [Domain Driven Design](https://www.methodsandtools.com/archive/archive.php?id=97)
- [Uncle Bob's clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - This is just an overview. "Clean Architecture" book is highly recomended
- [SOLID principles](https://en.wikipedia.org/wiki/SOLID) - Also an overview. Uncle Bob's "Clean Code" and "Clean Arquitecture" books are recomended.

UI/Next

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Tests

To run backend tests:

```bash
sh ./etc/bash/run-tests.sh
```

## Deploy

WIP


## Issues

- Currently, snappy is not working at Core level.

## TODO

- Create an API app to mimic what is now doing Next API to isolate Core
- Use DI for infrastructure services
- Fully migrate to TS
- See @TODOs along the code
