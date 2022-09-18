# Blog App backend

In this project I have made a backend for a standard blog app. This blog is ready to be hosted on a server.


## Features

- Sign up and login of a user can be done
- Authentication of the user once logged in.
- Once user is logged in the session will expire only after 2 days
- The user can create, edit or delete the post only when he/she has logged in
- Data of the blogs and the users is managed in a `mongodb` database
- Load balancing is done using `NginX`
- Rest api is built using `Node` and `Express`


## Tech Stack

- Node
- Express
- Express-sessions
- Redis
- Bcrypt
- Mongodb
- Mongoose
- Docker
- Docker-compose
- NginX

## How to use Locally

> **Note**
> You should have docker engine and docker-compose installed on your system.

Clone the project

```bash
  git clone https://link-to-project
```

Install dependencies

```bash
npm install
```

Start the app for development

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

Start the app for production

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

If you add any new npm package

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V  
```

For scaling the app

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=(no. of instances)
```

Stop the app

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```
## Environment Variables

To run this project, you will need to configure the following environment variables to your ./config/config.js and the docker-compose files

`MONGO_IP` - default set to "mongo" i.e. IP address of the mongo container

`MONGO_PORT` - default set to 27017

`REDIS_URL` - default set to "redis" i.e IP address of the redis container

`REDIS_PORT` - default set to 6379

Inside mongo service (inside docker-compose.dev.yml):-

`MONGO_USER` - default set to "Arjun" i.e. my name

`MONGO_PASSWORD` - default set to "admin"

`SESSION_SECRET` - default set to "secret"

Configure the docker-compose.prod.yml file yourself for deploying the app



## Acknowledgements

 - Multiple docs I visited on google
 - [freeCodeCamp Lecture on youtube](https://youtu.be/9zUHg7xjIqQ)
 - [NginX tutorial on youtube](https://youtu.be/7VAI73roXaY)


## Authors

- [@ArjunVarshney](https://github.com/ArjunVarshney)

