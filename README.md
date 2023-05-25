## Motivation
This project is a space for developers looking to level up their skills and create meaningful projects that benefit both themselves and maybe even some users. You can bring your favorite project to life within this Monorepo, using any JS framework you love (all supported by NX). Simplest examples you can build your favorite apps' clone and try to deploy it to Vercel, feel free to build if you have any uniqe ideas.

You'll get to experience a real-world process and workflow, working with a big codebase, gaining valuable insights and making a good project showcase for your portfolio 🚀. 
Members of the repo can / recommended to review each others code to help and share knowledge as well as keep the code base clean.

## Current apps list
- 📓 Full Stack Note Taking App
This project aims to provide a simplified version of popular note-taking applications like Notion and Craft.

## Some Todos
- Implement Angular Frontend app for Rogo-Notes app, the Backend is alredy built with Nestjs.
- Implement MD based Document that could be saved on user machine or a linked remote space like (Google Drive, Dropbox etc.)
- Having media (Audio, Vidoe, Photo) attachments to each Document

## Getting Started
run `npm install` to install all the dependencies.

> Tech stack: NX, Nesjs, Typeorm, Postgres, Angular, React, Docker, Docker-compose and more.

## Development server

Run `docker-compose up` for a dev server, it will run up the Posgress DB.
- Navigate to http://localhost:3333/api to see the Nestjs API.
- Navigate to http://localhost:3000 Auth app in React.
- Navigate to http://localhost:4200/ to see the Angular app the actuall app.

## Understand this workspace

###Project structure:
<pre>
└── root
    ├── apps
    │   ├── api                   &lt;-- nest/node/denojs
    │   └── client                &lt;-- angular/react
└── libs (1)
    ├── api                       &lt;-- grouping folder (dir)
    │   ├── core                  &lt;-- grouping folder (dir)
    │   │   └── feature           &lt;-- nest/node/deno:lib (2)
    │   ├── feature-1             &lt;-- grouping folder (dir)
    │   │   ├── data-access       &lt;-- nest/node/deno:lib, service + entities
    │   │   ├── feature           &lt;-- nest/node/deno:lib, module + controller
    │   │   └── utils             &lt;-- nest/node/deno:lib, things like interceptors, guards, pipes etc...
    │   └── feature-2             &lt;-- grouping folder (dir)
    │       ├── data-access       &lt;-- nest/node/deno:lib, service + entities
    │       ├── feature           &lt;-- nest/node/deno:lib, module + controller
    │       └── utils             &lt;-- nest/node/deno:lib, things like interceptors, guards, pipes etc...
    ├── client                    &lt;-- grouping folder (dir)
    │   ├── shell                 &lt;-- grouping folder (dir) 
    │   │   └── feature           &lt;-- angular/react:lib (3)
    │   ├── feature-1             &lt;-- grouping folder (dir)
    │   │   ├── data-access       &lt;-- angular/react:lib, service, API calls, state management)
    │   │   ├── feature           &lt;-- grouping folder (dir) or lib (4)
    │   │   │   ├── list          &lt;-- angular/react:lib e.g. ProductList
    │   │   │   └── detail        &lt;-- angular/react:lib e.g. ProductDetail
    │   │   └── ui                &lt;-- grouping folder (dir)
    │   │       ├── comp-1        &lt;-- angular/react:lib, SCAM for Component
    │   │       └── pipe-1        &lt;-- angular/react:lib, SCAM for Pipe
    │   └── shared                &lt;-- grouping folder (dir)
    │       ├── data-access       &lt;-- angular/react:lib, any Service or State management to share across the Client app)
    │       ├── ui                &lt;-- grouping folder (dir) (5)
    │       └── utils             &lt;-- angular/react:lib, usually shared Guards, Interceptors, Validators...)
    └── shared                    &lt;-- grouping folder (dir), most libs in here are buildable @nrwl/angular:lib)
        ├── data-access           &lt;-- my shared data-access is usually models, so it is a lib
        ├── ui                    &lt;-- optional grouping folder (dir), if I have multiple client apps
        └── utils                 &lt;-- optional grouping folder (dir), usually validation logic or shared utilities
            ├── util1             &lt;-- lib
            └── util2             &lt;-- lib
</pre>

Run `nx graph` to see a diagram of the dependencies of the projects.

## Further help with NX

Visit the [Nx Documentation](https://nx.dev) to learn more.
