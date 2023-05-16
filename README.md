### Full Stack Note Taking App
This project aims to provide a simplified version of popular note-taking applications like Notion and Craft. It demonstrates a real-world scenario of a large monorepo, showcasing the integration of various frontend and backend technologies. For now it's more about stitching different tools toghether - not a perfect UX.

The user can have an account and create spaces and notes

## Getting Started

run `npm install` to install all the dependencies.

> Tech stack: NX,Typeorm, Postgres, Angular, React, Docker, Docker-compose and more.

## Development server

Run `docker-compose up` for a dev server, it will run up the Posgress DB.
- Navigate to http://localhost:3333/api to see the Nestjs API.
- Navigate to http://localhost:3000 Auth app in React.
- Navigate to http://localhost:4200/ to see the Angular app the actuall app.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Further help with NX

Visit the [Nx Documentation](https://nx.dev) to learn more.
