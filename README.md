# Note taking app with spaces, folders and documents

The user can have an account and create spaces and notes

## For Angular project strucutre have a look at this link:

https://github.com/trungk18/angular-spotify

## Getting Started

run `yarn` to install all the dependencies.

> Tech stack: NX, Nestjs, Typeorm, Postgres, Angular, Docker, Docker-compose and more.

## Development server

Run `docker-compose up` for a dev server, it will run up the Posgress DB. Navigate to http://localhost:3333/api to see the Nestjs API. Navigate to http://localhost:4200/ to see the Angular app. The app will automatically reload if you change any of the source files.

## Data Base

Here is the diagram of the database:
https://drawsql.app/teams/ff-23/diagrams/rogor

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Further help with NX

Visit the [Nx Documentation](https://nx.dev) to learn more.

## Environment variables

# jwt

JWT_SECRET = test
JWT_AUDIENCE = test
JWT_ISSUER = test
JWT_EXPIRES_IN = test
JWT_REFRESH_EXPIRES_IN = test
REDIS_HOST = test

# 2 factor auth

TWO_FACTOR_AUTH = test

# Google

GOOGLE_CLIENT_ID = test
GOOGLE_CLIENT_SECRET = test

# DB

DB_TYPE = test
DB_HOST = test
DB_PORT = test
DB_USERNAME = test
DB_PASSWORD = test
DB_DATABASE = test
